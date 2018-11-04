const walkSync = require('./lib/walkSync'),
    readConfigFileSync = require('./lib/readConfigFileSync'),
    mergeConfigs = require('./lib/mergeConfigs'),
    getApp = require('./lib/getApp');

const http = require('http'),
    processenv = require('processenv'),
    flaschenpost = require('flaschenpost'),
    path = require('path');

const logger = flaschenpost.getLogger();

const configDirectory = processenv('CONFIG_DIR') || '.';
const port = processenv('PORT') || 3000;
const environment = processenv('ENVIRONMENT') || 'production';

// first, list all config files
const filelist = walkSync(configDirectory);

//logger.info('files read', filelist.sort().reverse());

const configs = new Map();

filelist.forEach(filename => {
    if (filename.includes(environment) || filename.includes('general')) {
        configs.set(filename.replace(configDirectory, '').replace('general' + path.sep, '').replace(environment + path.sep, '').split('.')[0], readConfigFileSync(filename));
    }
});

mergeConfigs(configs);

logger.info('file contents', Array.from(configs));

// now start the server
const app = getApp(configs);
const server = http.createServer(app);

server.listen(port, () => {
    logger.info('server is listening', { port: port });
});

