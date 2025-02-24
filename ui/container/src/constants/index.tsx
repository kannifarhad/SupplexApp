export const IS_DEV = import.meta.env.MODE === "development";
export const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
export const CRONUS_DOCS_URL = import.meta.env.VITE_REACT_DOCS_URL || "http://localhost:3001";
export const LOCATION_SKIP_LIST = ["/logout", "/login", "/", "/cronus-auth/callback/oauth", undefined];
export const LAST_LOCATION_KEY = 'LAST_LOCATION';
export const LAST_LOCATION_WAS_LOGGEDIN_KEY = 'LAST_LOCATION_WAS_LOGGEDIN_KEY';