
const CONFIG_PATH_DELIMITER = '.';

class Workspace {

    constructor({vsWorkspace}) {
        this._vsWorkspace = vsWorkspace;
    }

    getConfig(configPath) {
        const {basePath, leafName} = this._parseConfigPath(configPath);
        return this._vsWorkspace.getConfiguration(basePath).get(leafName);
    }

    _parseConfigPath(configPath) {
        const configPathParts = configPath.split(CONFIG_PATH_DELIMITER);
        return {
            basePath: configPathParts.slice(0, -1).join(CONFIG_PATH_DELIMITER),
            leafName: configPathParts.slice(-1)[0]
        };
    }

    get rootPath() {
        return this._vsWorkspace.rootPath;
    }

}

module.exports = Workspace;
