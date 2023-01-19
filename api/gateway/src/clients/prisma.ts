import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
	log: [
		{
			emit: "event",
			level: "info",
		},
		{
			emit: "event",
			level: "error",
		},
	],
	errorFormat: "pretty",
});

// Projects delete middleware
prisma.$use(async (params, next) => {
	// Check incoming query type

	return next(params);
});

// Custom error logs
prisma.$on("info", (e) => {
	console.info("Prisma:", e.message);
});

prisma.$on("error", (e) => {
	console.error("Prisma:", e.message);
});
