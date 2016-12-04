const BlockFileManager = require('./BlockFileManager');

/**
 * Class BlockFileManagerPlugin
 */
class BlockFileManagerPlugin {

    /**
     * Constructor.
     */
    constructor() {
        this.minVersion = [2, 0, 0];
    }

    /**
     * Manages installation process of plugin.
     *
     * @param less
     * @param pluginManager
     */
    install(less, pluginManager) {
        pluginManager.addFileManager(
            new BlockFileManager()
        );
    }
}

module.exports = BlockFileManagerPlugin;
