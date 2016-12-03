const BlockFileManager = require('./BlockFileManager');

class BlockFileManagerPlugin {

    constructor() {
        this.minVersion = [2, 0, 0];
    }

    install(less, pluginManager) {
        pluginManager.addFileManager(
            new BlockFileManager()
        );
    }
}

module.exports = BlockFileManagerPlugin;
