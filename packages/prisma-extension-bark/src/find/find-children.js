import { Prisma } from '@prisma/client'
import { default_order_by, max_segment, min_segment } from '../consts.js'

/**
 * @template T - Model
 * @template A - Args
 *
 * @this {T}
 * @param {import('$types/find').findChildrenArgs<T, A>} args
 * @returns {Promise<import('$types/find').findChildrenResult<T, A>>}
 */
export default async function ({ node, whereNode, orderBy = default_order_by, ...args }) {
	const ctx = Prisma.getExtensionContext(this)

	/** @type {string} */
	let path
	/** @type {number} */
	let depth
	/** @type {number} */
	let numchild

	// Get required arguments from instance
	if (node) {
		path = node.path
		depth = node.depth
		numchild = node.numchild
	} else if (whereNode) {
		const target = await ctx.findUniqueOrThrow({ where: whereNode })
		if (target) {
			path = target.path
			depth = target.depth
			numchild = target.numchild
		}
	}


	// forever alone / is leaf
	if (numchild === 0) {
		return null
	}

	const gt_path = path + min_segment
	const lte_path = path + max_segment

	const where = args.where || {}

	return ctx.findMany({
		orderBy,
		...args,
		where: {
			...where,
			depth: depth + 1,
			path: {
				gt: gt_path,
				lte: lte_path,
			},
		}
	})
}
