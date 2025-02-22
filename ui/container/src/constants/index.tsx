export const IS_DEV = process.env.NODE_ENV == "development";
export const CRONUS_API_URL = process.env.CRONUS_API_URL || "http://localhost:4000";
export const CRONUS_DOCS_URL =process.env.REACT_DOCS_URL || "http://localhost:3001";
export const LOCATION_SKIP_LIST = ["/logout", "/login", "/", "/cronus-auth/callback/oauth", undefined];
export const LAST_LOCATION_KEY = 'LAST_LOCATION';
export const LAST_LOCATION_WAS_LOGGEDIN_KEY = 'LAST_LOCATION_WAS_LOGGEDIN_KEY';

export const SENTRY_DSN = process.env.REACT_SENTRY_DSN;
export const SENTRY_RELEASE = process.env.REACT_SENTRY_RELEASE;
export const SENTRY_ENVIRONMENT = process.env.REACT_SENTRY_ENVIRONMENT;