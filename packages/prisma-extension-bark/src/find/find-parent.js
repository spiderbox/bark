import { Prisma } from '@prisma/client'
import { path_from_depth } from '../utils.js'

/**
 * @template T - Model
 * @template A - Args
 *
 * @this {T}
 * @param {import('$types/find').findParentArgs<T, A>} args
 * @returns {Promise<import('$types/find').findParentResult<T, A>>}
 */
export default async function ({ node, whereNode, ...args }) {
	const ctx = Prisma.getExtensionContext(this)

	/** @type {string} */
	let path
	/** @type {number} */
	let depth

	if (node) {
		path = node.path
		depth = node.depth
	} else if (whereNode) {
		const target = await ctx.findUniqueOrThrow({
			where: whereNode,
			select: {
				path: true,
				depth: true
			}
		})
		path = target.path
		depth = target.depth
	}
	if (depth && path) {
		// depth indicates no parent
		if (depth <= 1) {
			return null
		}

		const parent_path = path_from_depth({ path, depth: depth - 1 })
		return ctx.findUnique({
			where: {
				path: parent_path
			},
			...args
		})
	}
}
