"use strict";
exports.__esModule = true;
var http = require("http");
var HOST_NAME = '0.0.0.0';
var PORT = 3000;
var reverseString = function (s) { return s.split('').reverse().join(''); };
var reverseArray = function (arr) {
    return arr.map(function (elem) { return (typeof elem === 'object' ? reverseObj(elem) : elem); });
};
var reverseIfObject = function (obj) {
    return Array.isArray(obj)
        ? reverseArray(obj)
        : typeof obj === 'object' && obj !== null
            ? reverseObj(obj)
            : obj;
};
var reverseObj = function (obj) {
    return Object.fromEntries(Object.entries(obj).map(function (_a) {
        var k = _a[0], v = _a[1];
        return [reverseString(k), reverseIfObject(v)];
    }));
};
var server = http.createServer(function (req, res) {
    console.log("\n".concat(req.method, " ").concat(req.url));
    console.log(req.headers);
    req.on('data', function (chunk) {
        console.log("BODY: ".concat(chunk));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        var revObj = reverseObj(JSON.parse(chunk));
        var response = JSON.stringify(revObj, null, 2);
        console.log("RESPONSE: ".concat(response));
        res.end(response);
    });
});
server.listen(PORT, HOST_NAME, function () { return console.log("Server running at http://localhost:".concat(PORT, "/")); });
