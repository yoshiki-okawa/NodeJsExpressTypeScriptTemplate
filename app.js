'use strict';
var express = require("express");
var routes = require("./routes/index");
var http = require("http");
var path = require("path");
var stylus = require("stylus");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
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
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err["status"] = 404;
    next(err);
});
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function (err, req, res, next) {
        err.status = err.status || 500;
        res.status(err.status);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    try {
        err.status = err.status || 500;
        res.status(err.status);
        res.render("error", {
            message: "Internal Error",
            error: { status: err.status }
        });
    }
    catch (e) {
    }
});
http.createServer(app).listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
});
//# sourceMappingURL=app.js.map