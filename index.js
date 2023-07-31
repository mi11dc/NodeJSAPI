const express = require("express");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const pageRouter = require("./modules/router");

//set up Express app
const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 4000;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//PAGE ROUTES
app.use("/", pageRouter);

//set up server listening
app.listen((host, port), () => {
    console.log(`Listening on http://${host}:${port}`);
});
