const propertiesToObject = (propertiesString, separator) => {
    // create array of the file without commented lines
    const propertiesArray = propertiesString.split('\n').filter((line) => /(#|!)/.test(line.replace(/\s/g, '').slice(0, 1)) ? false : line);

    const propertiesObject = {};

    propertiesArray.forEach(line => {

        const property = line.split(separator);
        if (property.length === 2) {

            // if the key contains "." then we have to create sub-objects if not existing yet
            createPropertyObjectHierarchy(propertiesObject, property[0], property[1]);
        }
    });

    return propertiesObject;
};

const createPropertyObjectHierarchy = (obj, path, val) => {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const lastObj = keys.reduce((obj, key) => obj[key] = obj[key] || {}, obj);
    lastObj[lastKey] = val;
};
module.exports = propertiesToObject;