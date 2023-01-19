const DEBUG = "*,-express:*,-prisma:client,-follow-redirects,-body-parser:*";
process.env["DEBUG"] = process.env.DEBUG || DEBUG;
import "./sentry";
import { startServer } from "./server";
import { startFederationGateway } from "./gateway";

// Workaround for self-signed certificate error
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

// Start server
startServer(4001).then(() => startFederationGateway(4000));