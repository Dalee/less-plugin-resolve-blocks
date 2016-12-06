const less = require('less');
const path = require('path');
const fs = require('fs');

/**
 * Class BlockFileManager.
 */
class BlockFileManager extends less.FileManager {

    /**
     * Async checker whether file is to be processed by plugin.
     *
     * @param {string} filename
     * @param {string} currentDirectory
     * @param {object} options
     * @param environment
     * @returns {boolean}
     */
    supports(filename, currentDirectory, options, environment) {
        return /^block:[a-z0-9\-]+$/.test(filename);
    }

    /**
     * Sync checker whether file is to be processed by plugin.
     *
     * @param {string} filename
     * @param {string} currentDirectory
     * @param {object} options
     * @param environment
     * @returns {boolean}
     */
    supportsSync(filename, currentDirectory, options, environment) {
        return this.supports(filename, currentDirectory, options, environment);
    }

    /**
     * Tries to find the corresponding less file based on block's name.
     *
     * @param {string} filename
     * @param {string} currentDirectory
     * @returns {undefined|string}
     */
    resolve(filename, currentDirectory) {
        const cleanFilename = filename.substring(filename.indexOf(':') + 1);
        const folder = cleanFilename.replace('.less', '');
        let upFolder = path.join(currentDirectory, '..');
        let target;

        while (true) {
            let stat;
            target = path.join(upFolder, folder, cleanFilename);

            try {
                stat = fs.statSync(target);
            } catch (e) {
                stat = null;
            }

            if (stat && stat.isFile()) {
                break;
            }

            const nextUpFolder = path.join(upFolder, '..');
            if (nextUpFolder === upFolder) {
                break;
            }

            upFolder = nextUpFolder;
        }

        return target;
    }

    /**
     * Loads file asynchronously.
     *
     * @param {string} filename
     * @param {string} currentDirectory
     * @param options
     * @param environment
     * @param callback
     * @returns {*|Promise}
     */
    loadFile(filename, currentDirectory, options, environment, callback) {
        const importPath = this.resolve(filename, currentDirectory);
        return super.loadFile(importPath, '', options, environment, callback);
    }

    /**
     * Loads file synchronously.
     *
     * @param {string} filename
     * @param {string} currentDirectory
     * @param options
     * @param environment
     * @param encoding
     * @returns {*|Object}
     */
    loadFileSync(filename, currentDirectory, options, environment, encoding) {
        const importPath = this.resolve(filename, currentDirectory);
        return super.loadFileSync(importPath, '', options, environment, encoding);
    }

}

module.exports = BlockFileManager;
