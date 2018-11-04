const fs = require('fs');

const propertiesToObject = require('./propertiesToObject');

const flaschenpost = require('flaschenpost');
const logger = flaschenpost.getLogger();

const readConfigFileSync = function(filename) {

    let fileContent = undefined;

    if (filename.endsWith('.json')) {
        logger.info('reading ' + filename);
        fileContent = JSON.parse(fs.readFileSync(filename, 'utf8'));
    } else if (filename.endsWith('.properties')) {
        fileContent = propertiesToObject(fs.readFileSync(filename, 'utf8'), '=');
    } else {
        throw new Error('no valid config file');
    }

    return fileContent;
};

module.exports = readConfigFileSync;