'use strict';

/**
 * Default dev server configuration.
 */
const webpack = require('webpack');
const path = require('path');
const WebpackBaseConfig = require('./Base');
class WebpackDevConfig extends WebpackBaseConfig {
	constructor(platform) {
		super();
		this.config = {
			devtool: 'cheap-module-source-map'
		};
		this.config.plugins = this.config.plugins.concat([
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin()
		]);
	}
}

module.exports = WebpackDevConfig;
