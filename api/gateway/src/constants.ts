import bytes from "bytes";

function getVar(name: string, defaultValue: string = "") {
	let value = process.env[name];
	return value || defaultValue;
}

export default {
	ENV_NAME: getVar("ENV_NAME", "development"),
	DEBUG: getVar("DEBUG_MODE") === "true",
	IS_DEV: getVar("NODE_ENV") === "development",
	// Authentication
	JWT_ACCESS_SECRET: getVar("JWT_ACCESS_SECRET"),
	JWT_REFRESH_SECRET: getVar("JWT_REFRESH_SECRET"),
	JWT_ACCESS_EXPIRATION: getVar("JWT_ACCESS_EXPIRATION", "1 hour"),
	JWT_REFRESH_EXPIRATION: getVar("JWT_REFRESH_EXPIRATION", "1 day"),
	// AWS
	S3_ACCESS_KEY_ID: getVar("S3_ACCESS_KEY_ID"),
	S3_ACCESS_SECRET: getVar("S3_ACCESS_SECRET"),
	S3_BUCKETNAME: getVar("S3_BUCKETNAME"),
	S3_ENDPOINT: getVar("S3_ENDPOINT"),
	S3_REGION: getVar("S3_REGION"),
	// Mailer
	MAIL_HOST: getVar("MAIL_HOST", "smtp.supplex.io"),
	MAIL_PORT: Number(getVar("MAIL_PORT", "25")),
	MAIL_ONBOARD_BCC: (getVar("MAIL_ONBOARD_BCC", "info@.supplex.io")).split(","),
	MAIL_ONBOARD_REPLY: getVar("MAIL_ONBOARD_REPLY", "info@supplex.io"),
	MAIL_ONBOARD_FROM: getVar("MAIL_ONBOARD_FROM", "info@jsupplex.io"),

	// Gateway microservices
	MAIN_API_URL: getVar("MAIN_API_URL", "http://localhost:4001/graphql"),
	SUPPLEX_URL: new URL(getVar("SUPPLEX", "https://supplex.io")).toString(),
	SUPPLEX_API_URL: new URL(getVar("SUPPLEX_API_URL", "https://api.supplex.io")).toString(),


	//Limits on request body 
	MAX_REQUEST_BODY_SIZE: bytes("10MB"),

	// File Uploads
	MAX_FILE_SIZE: bytes("100MB")
};
