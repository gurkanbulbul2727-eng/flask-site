"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLine = parseLine;
function parseLine(line) {
    const commentPosition = line.indexOf('#');
    if (commentPosition !== -1) {
        line = line.slice(0, commentPosition);
    }
    if (line.trim() !== '') {
        const splited = line.split('==');
        const packageName = splited[0].trim();
        let packageVersion = null;
        if (splited.length > 1) {
            packageVersion = splited[1].trim();
        }
        return {
            name: packageName,
            version: packageVersion
        };
    }
    return null;
}
//# sourceMappingURL=parser.js.map