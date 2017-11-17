'use strict';

const webpackConfigs = require('./webpack');
const defaultConfig = 'dev';
const base = ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'classnames', 'babel-polyfill'];
const vendor = ['lodash', 'moment'];
const webpack = require('webpack');
module.exports = (env) => {
	const requestedConfig = env.production ? 'production': env.test ? 'test' : 'dev';
	const platform = env.platform || 'app';
	let LoadedConfig = defaultConfig;
	if (webpackConfigs[requestedConfig] !== undefined) {
		LoadedConfig = webpackConfigs[requestedConfig];
	}

	const loadedInstance = new LoadedConfig(platform);

	let platformDependencies = [];

	loadedInstance.config.entry = {
		base,
		vendor,
		app: `./${platform}/index.js`
	};

	if(platformDependencies.length > 0 ) {
		loadedInstance.config.entry[platform] = platformDependencies;
	}

	loadedInstance.config.plugins.push(new  webpack.DefinePlugin({
		ENV: JSON.stringify(requestedConfig),
		PLATFORM: JSON.stringify(platform),
		'process.env.NODE_ENV': JSON.stringify(requestedConfig)
	}));

	// Set the global environment
	process.env.NODE_ENV = requestedConfig;

	return loadedInstance.config;
};
