import { PrismaClient } from "@prisma/client";

export function generateList<T>(
	length: number,
	mapFn: (value: T, index: number) => T
): T[] {
	return new Array(length).fill({}).map(mapFn);
}

export type SeedContext = {
	prisma: PrismaClient;
	defaults: {
		createdAt: Date;
	};
};
