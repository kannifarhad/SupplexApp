import constants from "../constants";

const { IS_DEV } = constants;
const apolloUrl = "https://studio.apollographql.com";
const localOrigins = [/^http:\/\/localhost:\d{4}$/, apolloUrl];
const prodOrigins = [/^https:\/\/.*\.jnj\.com$/, apolloUrl];

export const corsConfig = {
	origin: IS_DEV ? localOrigins : prodOrigins,
	credentials: true,
};
