const path = require('path');
const merge = require('deepmerge');

const flaschenpost = require('flaschenpost');
const logger = flaschenpost.getLogger();

const mergeConfigs = (configs) => {
    // for each config split the key to the parts and then merge the configs
    for (let configkey of configs.keys()) {
        const configkeyParts = configkey.split(path.sep);
        logger.debug('config key parts: ', configkeyParts);

        let configkeyReduced = configkey;
        // the last part is the type of the config (settings, labels,...), hence the relevant part has index length -2
        // files with no path or only one part don't need to be merged
        for (let i = (configkeyParts.length - 2); i >= 0; i--) {
            configkeyReduced = configkeyReduced.replace(configkeyParts[i] + path.sep, '');
            logger.debug('configToMerge' + configkey + ' -> ' + configkeyReduced);

            if (configs.has(configkeyReduced)) {
                logger.debug ('-> merging!');
                configs.set(configkey, merge(configs.get(configkeyReduced), configs.get(configkey)));
            }
        }
    }
};

module.exports = mergeConfigs;