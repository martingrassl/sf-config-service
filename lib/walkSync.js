const fs = require('fs');
const path = require('path');

const walkSync = function (dir, filelist) {
    const files = fs.readdirSync(dir);
    filelist = filelist || [];

    files.forEach(file => {
        const filename = path.join(dir, file);
        if (fs.statSync(filename).isDirectory()) {
            filelist = walkSync(filename, filelist);
        }
        else {
            filelist.push(filename);
        }
    });
    return filelist;
};

module.exports = walkSync;