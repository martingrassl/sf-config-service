const express = require('express'),
    flaschenpost = require('flaschenpost'),
    path = require('path');

const logger = flaschenpost.getLogger();

const getApp = (configs) => {
    const app = express();

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.use(express.static(path.join(__dirname, '..', 'static')));

    app.get('/configs/channels/:channel/brands/:brand/countries/:country/languages/:language/:type', (req, res) => { 
        const configKey = req.params.channel + path.sep + req.params.brand + path.sep + req.params.country + path.sep + req.params.language + path.sep + req.params.type;
        logger.info ('configkey: ' + configKey);

        if (configs.has(configKey)) {
            res.send(configs.get(configKey));
        } else {
            res.status(404).end();
        }
    });

    return app;
};

module.exports = getApp;