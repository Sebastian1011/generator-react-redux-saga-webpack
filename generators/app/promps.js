'use strict';
const utils = require('./utils');

module.exports = [
    {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: utils.getAppName()
    },
    {
        type: 'input',
        name: 'version',
        message: 'Your project version',
        default: '0.0.1'
    },
    {
        type: 'input',
        name: 'author',
        message: 'Your project author',
        default: ''
    },
    {
        type: 'input',
        name: 'repository',
        message: 'Your project repository',
        default: ''
    },
    {
        type: 'input',
        name: 'keywords',
        message: 'Your keywords, split with comma',
        default: 'react, redux, saga, webpack'
    },
    {
        type: 'confirm',
        name: 'saga',
        message: 'Using saga?',
        default: true
    },
];
