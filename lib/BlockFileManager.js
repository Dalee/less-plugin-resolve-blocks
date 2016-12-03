const less = require('less');
const path = require('path');
const fs = require('fs');

class BlockFileManager extends less.FileManager {

    supports(filename, currentDirectory, options, environment) {
        return /^block:[a-z0-9\-]+$/.test(filename);
    }

    supportsSync(filename, currentDirectory, options, environment) {
        return this.supports(filename, currentDirectory, options, environment);
    }

    resolve(filename, currentDirectory) {
        const cleanFilename = filename.substring(filename.indexOf(':') + 1);
        const folder = cleanFilename.replace('.less', '');
        let upFolder = path.join(currentDirectory, '..');
        let target;

        while (true) {
            target = path.join(upFolder, folder, cleanFilename);

            const stat = fs.statSync(target);
            if (stat.isFile()) {
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

    loadFile(filename, currentDirectory, options, environment, callback) {
        const importPath = this.resolve(filename, currentDirectory);
        return super.loadFile(importPath, '', options, environment, callback);
    }

    loadFileSync(filename, currentDirectory, options, environment, encoding) {
        const importPath = this.resolve(filename, currentDirectory);
        return super.loadFileSync(importPath, '', options, environment, encoding);
    }

}

module.exports = BlockFileManager;
