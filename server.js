// Tomohiro Iwasa, Avaya Japan, 2017-2022
// Updated: 20220828

"use strict";

import http from "http";
import express from "express";
import bodyParser from "body-parser";

import { _stdout, _stdout_log, _stdout_table } from "./lib/stdout.js";
const INFO = true;
const DEBUG = true;

const PORT = 80;

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("port", process.env.PORT || PORT);
app.set("view engine", "ejs");
app.set('trust proxy', true);

http.createServer(app).listen(PORT,
	() => {
		_stdout(`Server listening on port ${PORT}`);
	});


process.once("beforeExit", () => {
	if (INFO | DEBUG) _stdout("beforeExit");
});

// GKE health check
app.get('/', (req, resp) => {
	//if (DEBUG) _stdout(`/GKE health check`);
	return resp.sendStatus(200);
});
