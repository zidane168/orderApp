"use strict";
exports.__esModule = true;
function Log(content) {
    var currentEnv = 'local';
    if ("local" == currentEnv) {
        if (typeof content == 'object') {
            console.log(JSON.stringify(content));
        }
        else if (Array.isArray(content)) {
            console.log(JSON.stringify(content));
        }
        else {
            console.log(content);
        }
    }
}
exports["default"] = Log;
