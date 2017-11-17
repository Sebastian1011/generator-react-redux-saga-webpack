'use strict';

/**
 * Dist configuration. Used to build the
 * final output when running npm run dist.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');

class WebpackDistConfig extends WebpackBaseConfig {

	constructor(platform) {
		super();
		let platformDependencies = [];
		if(platform === 'mobile')  {
			platformDependencies = [];
		} else {
			platformDependencies = ['../libs/adaptive/adaptive.js'];
		}
		this.config = {
			cache: false,
			devtool: 'source-map',
			// entry: platformDependencies.concat([`./${platform}/index.js`])
		};

		this.config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
		// Deactivate hot-reloading if we run dist build on the dev server
		this.config.devServer.hot = false;
	}

	/**
	 * Get the environment name
	 * @return {String} The current environment
	 */
	get env() {
		return 'build';
	}
}

module.exports = WebpackDistConfig;
