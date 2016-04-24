'use strict';

import * as express from "express";
import { Request, Response } from "express";
import * as routes from "./routes/index";
import * as http from "http";
import * as path from "path";
import * as stylus from "stylus";
import * as favicon from "serve-favicon";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";

var app = express();

// view engine setup
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(stylus.middleware(path.join(__dirname, "public")));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
if (app.get("env") === "development") {
	app.use(logger("dev"));
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", routes.index);
app.get("/about", routes.about);
app.get("/contact", routes.contact);

// error handlers

//catch 404 and forward to error handler
app.use((req: Request, res: Response, next: Function) => {
	var err = new Error("Not Found");
	err["status"] = 404;
	next(err);
});

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
	app.use((err: any, req: Request, res: Response, next: Function) => {
		err.status = err.status || 500
		res.status(err.status);
		res.render("error", {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: Request, res: Response, next: Function) => {
	try {
		err.status = err.status || 500
		res.status(err.status);
		res.render("error", {
			message: "Internal Error",
			error: { status: err.status }
		});
	}
	catch (e) {
	}
});

http.createServer(app).listen(app.get("port"), () => {
	console.log("Express server listening on port " + app.get("port"));
});
