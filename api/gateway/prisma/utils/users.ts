import { Prisma } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { addMinutes, addWeeks } from "date-fns";
import { generateList, SeedContext } from "./common";

export async function seedUsers(ctx: SeedContext, amount: number = 10) {
	const { prisma, defaults } = ctx;
	const input = generateList<Prisma.UserCreateInput & { id: string }>(
		amount,
		(_, idx) => {
			const createdAt = addWeeks(defaults.createdAt, idx);
			return {
				id: `test-user-${idx}`,
				email: `user${idx}@supplex.io`,
				firstname: `user`,
				lastname: `${idx} test`,
				password: hashSync("password", 10),
				role: "ADMIN",
				status: "ACTIVE",
				updatedAt: addMinutes(createdAt, 10),
				createdAt,
			};
		}
	);
	const userBatch = input.map((data) => prisma.user.create({ data }));
	return await prisma.$transaction(userBatch);
}
