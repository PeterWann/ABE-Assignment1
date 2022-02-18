"use strict";
exports.__esModule = true;
var https_1 = require("https");
var express_1 = require("express");
var fs_1 = require("fs");
var path_1 = require("path");
var helmet_1 = require("helmet");
var app = (0, express_1["default"])();
var port = 3000;
var options = {
    key: fs_1["default"].readFileSync(path_1["default"].join(__dirname, '../key.pem')),
    cert: fs_1["default"].readFileSync(path_1["default"].join(__dirname, '../cert.pem'))
};
app.use((0, helmet_1["default"])());
app.get('', function (req, res) {
    res.json({
        "message": "Hello, HTTPS! 👋"
    });
});
https_1["default"].createServer(options, app).listen(port, function () {
    console.log("Running 'secure-http' on ".concat(port));
});
