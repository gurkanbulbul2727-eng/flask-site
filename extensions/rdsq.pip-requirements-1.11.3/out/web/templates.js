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
exports.contextTemplate = contextTemplate;
const vscode = __importStar(require("vscode"));
const parser_1 = require("../parser");
function contextTemplate(action) {
    const editor = vscode.window.activeTextEditor;
    // Check if the action was triggered from a text editor
    if (editor) {
        const line = editor.selection.isEmpty ? editor.selection.active : editor.selection.start;
        const text = editor.document.lineAt(line).text;
        const parsed = (0, parser_1.parseLine)(text);
        if (parsed === null) {
            vscode.window.showErrorMessage('Pip package was not found on that line');
        }
        else {
            action(parsed);
        }
    }
    else {
        vscode.window.showErrorMessage('You are not focused on any text editor');
    }
}
//# sourceMappingURL=templates.js.map