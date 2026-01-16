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
exports.contextTemplate = void 0;
exports.getExtensionTerminal = getExtensionTerminal;
exports.runPipCommand = runPipCommand;
exports.focusTemplate = focusTemplate;
const vscode = __importStar(require("vscode"));
const general_1 = require("./general");
const extensionTerminalName = 'pip requirements';
function getExtensionTerminal() {
    for (const terminal of vscode.window.terminals) {
        if (terminal.name === extensionTerminalName) {
            return terminal;
        }
    }
    return vscode.window.createTerminal({
        name: extensionTerminalName,
    });
}
function runPipCommand(path, command) {
    const terminal = getExtensionTerminal();
    terminal.sendText(`python -m pip ${command} "${path}"`);
    terminal.show();
}
function focusTemplate(event, command) {
    const runThat = (path) => runPipCommand(path, command);
    if (event) {
        runThat(event.fsPath);
    }
    else {
        const editor = vscode.window.activeTextEditor;
        if (editor !== undefined) {
            runThat(editor.document.uri.fsPath);
        }
        else {
            runCommandManually(command);
        }
    }
}
async function runCommandManually(command) {
    const ignoreFocusOutSetting = vscode.workspace.getConfiguration('pip-requirements').get('ignoreFocusOut') || false;
    let pathResponse = await vscode.window.showInputBox({
        title: 'Path to the requirements.txt file',
        value: general_1.defaultPath,
        placeHolder: general_1.defaultPath,
        ignoreFocusOut: ignoreFocusOutSetting
    });
    if (pathResponse !== undefined) {
        if (pathResponse === '') {
            pathResponse = general_1.defaultPath;
        }
        runPipCommand(pathResponse, command);
    }
}
// reexport templates with web support
var templates_1 = require("./web/templates");
Object.defineProperty(exports, "contextTemplate", { enumerable: true, get: function () { return templates_1.contextTemplate; } });
//# sourceMappingURL=templates.js.map