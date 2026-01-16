"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseRow = exports.createRequirements = exports.installRow = exports.freezeCmd = exports.installCmd = void 0;
const vscode = __importStar(require("vscode"));
const templates_1 = require("./templates");
const general_1 = require("./general");
const path = __importStar(require("path"));
const fs_1 = require("fs");
exports.installCmd = vscode.commands.registerCommand(`${general_1.extName}.install`, (event) => {
    (0, templates_1.focusTemplate)(event, 'install -r');
});
exports.freezeCmd = vscode.commands.registerCommand(`${general_1.extName}.freeze`, (event) => {
    (0, templates_1.focusTemplate)(event, 'freeze >');
});
exports.installRow = vscode.commands.registerCommand(`${general_1.extName}.install-row`, () => {
    (0, templates_1.contextTemplate)((parsed) => {
        let query = parsed.name;
        if (parsed.version !== null) {
            query += `==${parsed.version}`;
        }
        const terminal = (0, templates_1.getExtensionTerminal)();
        terminal.sendText(`python -m pip install ${query}`);
        terminal.show();
    });
});
exports.createRequirements = vscode.commands.registerCommand(`${general_1.extName}.create-requirements`, () => {
    const workspaces = vscode.workspace.workspaceFolders;
    if (!workspaces) {
        vscode.window.showErrorMessage('No workspaces open');
        return;
    }
    const workspaceUri = workspaces[0].uri;
    const filePath = path.join(workspaceUri.fsPath, "requirements.txt");
    (0, fs_1.writeFileSync)(filePath, '');
    (0, templates_1.runPipCommand)(filePath, 'freeze >');
});
// reexport commands with web support
var commands_1 = require("./web/commands");
Object.defineProperty(exports, "browseRow", { enumerable: true, get: function () { return commands_1.browseRow; } });
//# sourceMappingURL=commands.js.map