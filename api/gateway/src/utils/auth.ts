import { User } from "@prisma/client";
import { AuthenticationError } from "apollo-server-errors";
import { addMilliseconds } from "date-fns";
import { CookieOptions, Request } from "express";
import { sign, verify } from "jsonwebtoken";
import ms from "ms";
import constants from "../constants";
import { Context } from "../context";

export type JwtPayload = (
	Omit<User, 'password'| 'updatedAt' | 'createdAt'> & 
	{
		// Optional field for personal access token (PAT)
		patId?: string;
		runId?: string;
	}
);
export type JwtPayloadSigned = (JwtPayload & {iat: number, exp:number});

type AuthContext = {
	request: Request;
	connection?: any;
};

export const createJWT = (
	payload: JwtPayload,
	type: "access" | "refresh",
	expiration?: string
) => {
	const defaults = {
		access: {
			secret: constants.JWT_ACCESS_SECRET,
			expiration: constants.JWT_ACCESS_EXPIRATION,
		},
		refresh: {
			secret: constants.JWT_REFRESH_SECRET,
			expiration: constants.JWT_REFRESH_EXPIRATION,
		},
	};
	const defaultConfig = defaults[type];
	return sign(payload, defaultConfig.secret, {
		expiresIn: expiration || defaultConfig.expiration,
	});
};

export const createRefreshCookie = (
	jwt: string
): [string, string, CookieOptions] => {
	const isProd = process.env.NODE_ENV === "production";
	const cookieOptions: CookieOptions = {
		secure: isProd ? true : false,
		httpOnly: true,
		expires: addMilliseconds(Date.now(), ms(constants.JWT_REFRESH_EXPIRATION)),
		// Same site if frontend and backend are not separate
		// sameSite: true
	};

	return ["refresh", jwt, cookieOptions];
};

export const removeRefreshCookie = (context: any) => {
	context.response.cookie("refresh", "", { expires: new Date() });
};

export const createTokens = async (payload: JwtPayload, context?: Context) => {
	const accessToken = createJWT(payload, "access");
	const refreshToken = createJWT(payload, "refresh");

	if (!!context) {
		// Set cookie if main service
		// const refreshCookie = createRefreshCookie(refreshToken);
		// context.response.cookie(...refreshCookie);

		// Or Set cookie on headers if microservice
		context.response.setHeader("refreshToken", refreshToken);
	}

	return {
		accessToken,
		refreshToken,
	};
};

export function getAuthorization(authcontext: AuthContext): string {
	const { request, connection } = authcontext;
	const Authorization = connection
		? connection.context.Authorization
		: request?.get("Authorization");
	return Authorization;
}

export function getJWTPayload(ctx: AuthContext, throwError?: boolean): JwtPayloadSigned | null {
	const Authorization = getAuthorization(ctx);
	if (Authorization) {
		try {
			// Handle SUPPLEX jwt for using CMS user id
			const token = Authorization.replace("Bearer ", "");
			const verifiedToken = verify(
				token,
				constants.JWT_ACCESS_SECRET
			) as JwtPayloadSigned;
			if (!verifiedToken) {
				throw new AuthenticationError("You are not logged in");
			}
			return verifiedToken;
		} catch (error) {
			if (throwError) {
				throw error;
			}
			return null;
		}
	}
	return null;
}

export function decodeJWT(token:string): JwtPayloadSigned | null {
	try {
		const cleanedToken = token.replace("Bearer ", "");
		// Handle SUPPLEX jwt for using CMS user id
		const verifiedToken = verify(
			cleanedToken,
			constants.JWT_ACCESS_SECRET
		) as JwtPayloadSigned;
		if (!verifiedToken) {
			return null;
		}
		return verifiedToken;
	} catch (error) {
		return null;
	}
}

export function getRefreshCookie({ request }: Pick<AuthContext, "request">) {
	const refreshToken = request.cookies["refresh"];
	if (refreshToken) {
		const jwtContent = verify(
			refreshToken,
			constants.JWT_REFRESH_SECRET
		) as JwtPayload;
		return jwtContent;
	}
	return undefined;
}

export function getRequestClient(ctx: Context) {
	const { request } = ctx;
	const clientName = request?.headers["apollographql-client-name"];
	const clientVersion = request?.headers["apollographql-client-version"];
	return {
		name: typeof clientName === "string" ? clientName : "",
		version: typeof clientVersion === "string" ? clientVersion : "",
	};
}
