import { Express } from "express";

export function applyHeaders(app: Express) {
	console.info("Setting up headers...")
	
	app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    });
}