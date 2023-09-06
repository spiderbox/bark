import type { XOR } from "./helpers";
import { RequiredKeysInInputNode } from "./prisma";

import type { Prisma } from '@prisma/client'


// findParent
export type findParentArgs<T, A> = XOR<
	{ node: RequiredKeysInInputNode<T, A, 'depth' | 'path'>; },
	{ whereNode: Prisma.Args<T, 'findUniqueOrThrow'>['where'] }
> & Prisma.Args<T, 'findMany'>;
export type findParentResult<T, A> = Prisma.Result<T, A, 'findUnique'> | null | undefined;


// findSiblings
export type findSiblingsArgs<T, A> = XOR<
	{ node: RequiredKeysInInputNode<T, A, 'depth' | 'path'>; },
	{ whereNode: Prisma.Args<T, 'findUniqueOrThrow'>['where'] }
> & Prisma.Args<T, 'findMany'>;
export type findSiblingsResult<T, A> = Prisma.Result<T, A, 'findMany'> | undefined;


// findChildren
export type findChildrenArgs<T, A> = XOR<
	{ node: RequiredKeysInInputNode<T, A, 'depth' | 'path' | 'numchild'>; },
	{ whereNode: Prisma.Args<T, 'findUniqueOrThrow'>['where'] }
> & Prisma.Args<T, 'findMany'>;
export type findChildrenResult<T, A> = Prisma.Result<T, A, 'findMany'> | null;


// findTree
type findTreeParentOfAndWhereArgs<T, A> = XOR<
	{ node: RequiredKeysInInputNode<T, A, 'depth' | 'path' | 'numchild'>; },
	Pick<Prisma.Args<T, 'findUniqueOrThrow'>, 'where'>
>
export type findTreeArgs<T, A> = Omit<Prisma.Args<T, 'findMany'>, 'where'> & { parent?: findTreeParentOfAndWhereArgs<T,A>}
export type findTreeResult<T, A> = Prisma.Result<T, A, 'findMany'>;


// findDescendants
export type findDescendantsArgs<T, A> = XOR<
	{ node: RequiredKeysInInputNode< T, A,'depth' | 'path' | 'numchild' | 'id'>; },
	{ whereNode: Prisma.Args<T, 'findUniqueOrThrow'>['where'] }
> & Prisma.Args<T, 'findMany'>;
export type findDescendantsResult<T, A> = Prisma.Result<T, A, 'findMany'> | null;


// findAncestors
export type findAncestorsArgs<T, A> = XOR<
	{ node: RequiredKeysInInputNode<T, A, 'depth' | 'path'>},
	{ whereNode: Prisma.Args<T, 'findUniqueOrThrow'>['where'] }
> & Prisma.Args<T, 'findMany'>;

export type findAncestorsResult<T, A> = Prisma.Result<T, A, 'findMany'> | null;


// findLastRoot
export type findLastRootNodeArgs<T, A> = Prisma.Exact<A, Omit<Prisma.Args<T, 'findFirst'>, 'where'>> | void;
export type findLastRootNodeResult<T, A> = Prisma.Result<T, A, 'findFirst'>;
