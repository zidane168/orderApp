"use strict";
exports.__esModule = true;
function Log(_a) {
    var content = _a.content;
    console.log("env: ", process.env.ENV);
    // if ("local" == process.env.ENV) {
    if (typeof content == 'object') {
        console.log(JSON.stringify(content));
    }
    else if (Array.isArray(content)) {
        console.log(JSON.stringify(content));
    }
    else {
        console.log(content);
    }
    // }
}
exports["default"] = Log;
