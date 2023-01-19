import { addMinutes, startOfYear } from "date-fns";
import { parse } from "pg-connection-string";
import { prisma } from "../src/clients";
import { SeedContext } from "./utils/common";
import { seedUsers } from "./utils/users";

const config = parse(process.env.DATABASE_URL || "");
console.log(`Seeding ${config.database} on ${config.host}`);

async function main() {
	const createdAt = startOfYear(new Date())
	const ctx: SeedContext = {
		prisma,
		defaults: {
			createdAt,
		},
	};
	await seedUsers(ctx, 48);
}

main()
	.catch((error) => console.log(error))
	.finally(async () => {
		await prisma.$disconnect();
	});
