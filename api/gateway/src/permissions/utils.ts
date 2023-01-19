import { PrismaClient } from "@prisma/client";
import { Context } from "../context";
import { UserError } from "../utils";	

export async function checkDownTimeAlerts(ctx: Context) {
	if (!ctx.user) throw new UserError("UNAUTHENTICATED");
	return await ctx.prisma.systemAlerts.findFirst({
		where: {
			disableLogin: true,
			startDate: {
				lt: new Date().toISOString(),
			},
			endDate: {
				gt: new Date().toISOString(),
			},
		},
	});
}
