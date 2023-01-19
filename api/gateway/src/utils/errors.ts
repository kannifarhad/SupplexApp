import { ApolloError, UserInputError } from "apollo-server-express";

type Extensions = Record<string, any> | undefined;

export const userErrors = {
	FORBIDDEN: "Not enough permissions to view this resource",
	INACTIVE: "Your account is not active",
	MISSING_ACCESS_REQUEST: "Your account has not requested access yet",
	UNAUTHENTICATED: "Not authenticated",
	BAD_USER_INPUT: "Invalid data sent to API",
};

export class UserError extends ApolloError {
	constructor(
		code: keyof typeof userErrors,
		message?: string,
		extensions?: Extensions,
	) {
		super(message || userErrors[code], code, {
			...extensions,
		});
	}
}

export class InputError extends UserInputError {}
