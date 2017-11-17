'use strict';
const path = require('path');
const baseName = path.basename(process.cwd());

const getBaseName = () => baseName;

const getAppName = appName => (appName? appName: getBaseName());

module.exports = {
    getBaseName,
    getAppName
}
