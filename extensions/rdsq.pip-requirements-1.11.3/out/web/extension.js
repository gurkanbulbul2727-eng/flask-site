"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const commands_1 = require("./commands");
function activate(context) {
    context.subscriptions.push(commands_1.browseRow);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map