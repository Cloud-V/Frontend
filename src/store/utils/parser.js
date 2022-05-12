export default class Parser {
    static extractModules(content) {
        content = content
            .replace(this.getCommentsRegEx(), "")
            .replace(this.getMultiCommentsRegEx(), "");
        const moduleRegEx = this.getModuleRegEx();
        const modules = [];
        let moduleMatches = moduleRegEx.exec(content);
        while (moduleMatches != null) {
            let moduleName = moduleMatches[1];
            if (!modules.includes(moduleName)) {
                modules.push(moduleName.trim());
            }
            moduleMatches = moduleRegEx.exec(content);
        }
        return modules;
    }
    static getCommentsRegEx() {
        return new RegExp("\\/\\/.*$", "gm");
    }
    static getMultiCommentsRegEx() {
        return new RegExp("\\/\\*(.|[\\r\\n])*?\\*\\/", "gm");
    }
    static getValidModuleRegEx() {
        return new RegExp("^[\\w\\.]+$", "g");
    }
    static getModuleRegEx() {
        return new RegExp(
            "^\\s*module\\s+(.+?)\\s*(#\\s*\\(([\\s\\S]+?)\\)\\s*)??\\s*((\\([\\s\\S]*?\\))?\\s*;)([\\s\\S]*?)endmodule",
            "gm"
        );
    }
}
