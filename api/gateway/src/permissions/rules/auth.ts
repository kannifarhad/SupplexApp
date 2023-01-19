import { rule } from "graphql-shield";
import { Context } from "../../context";
import { createJWT, getJWTPayload } from "../../utils";
import { UserError } from "../../utils/errors";
import { checkDownTimeAlerts } from '../utils';

export const isAuthenticated = rule({ cache: "contextual" })(
	async (_parent, _args, ctx: Context) => {
		if (ctx.user && ctx.user.status !== "ACTIVE") {
			return new UserError("INACTIVE");
		}
		const jwtData = getJWTPayload(ctx);
		if (!ctx.user) {
			return new UserError("UNAUTHENTICATED");
		}
		return true;
	}
);

export const isAdmin = rule({ cache: "contextual" })(
	async (_parent, _args, ctx: Context) => {
		const criteria = ctx.user?.role === "ADMIN";
		return criteria || "You don´t have admin rights";
	}
);

export const isUser = rule({ cache: "contextual" })(
	async (_parent, _args, ctx: Context) => {
		return !!ctx.user;
	}
);

export const isDown = rule({ cache: "contextual" })(
	async (_parent, _args, ctx: Context) => {
		const findDisablingAlert = await checkDownTimeAlerts(ctx);
		const isDown = findDisablingAlert ? ctx.user?.role === "ADMIN" : true;
		if(!isDown){
			return new UserError("FORBIDDEN", findDisablingAlert?.title);
		}
		return true;
	}
);