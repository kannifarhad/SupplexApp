import * as Sentry from "@sentry/node";
// import pkgDetails from "../package.json";
import "@sentry/tracing";

// Sentry.init({
//     tracesSampleRate: 1.0,
// 	integrations: [
// 		// enable HTTP calls tracing
// 		new Sentry.Integrations.Http({ tracing: true }),
// 	],
// });