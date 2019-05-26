const express = require("express");
const app = express();
const routeConfig = require("./config/route-config.js");
const appConfig = require("./config/main-config.js");

module.exports = app;

appConfig.init();
routeConfig.init(app);