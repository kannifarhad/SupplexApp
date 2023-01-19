import { allow, and, shield } from "graphql-shield";
import { Context } from "../context";
import { UserError } from "../utils";
import * as rules from "./rules";

export const permissions = shield<any, Context>(
	{
		Query: {
			"*": rules.isAuthenticated,
			_service: allow,
			// feedBackConnection: rules.isAdmin,
			// systemAlertConnection: rules.isAuthenticated
		},
		Mutation: {
			"*": and(rules.isAuthenticated, rules.isDown),
			// createSystemAlert: rules.isAdmin,
			login: allow,
			logout: allow,
			refreshToken: allow
		}
	},
	{
		allowExternalErrors: true,
		fallbackError: new UserError("FORBIDDEN"),
	}
);
