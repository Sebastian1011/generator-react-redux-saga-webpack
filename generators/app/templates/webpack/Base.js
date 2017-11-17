'use strict';
const fs = require('fs');
const path = require('path');
const npmBase = path.join(__dirname, '../node_modules');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const mockServerIP = '127.0.0.1';
const mockServerPort = 3000;
const realServerIP = '127.0.0.1';
const realServerPort = 8008;
const webpack = require('webpack');
class WebpackBaseConfig {
	constructor() {
		this._config = {};
	}

	get includedPackages() {
		return [].map(pkg => fs.realpathSync(path.join(npmBase, pkg)));
	}

	set config(data) {
		this._config = Object.assign({}, this.defaultSettings, data);
		return this._config;
	}

	get config() {
		return this._config;
	}

	get env() {
		return 'dev';
	}

	get srcPathAbsolute() {
		return path.resolve('./src');
	}

	get testPathAbsolute() {
		return path.resolve('./test');
	}

	get defaultSettings() {
		const cssModulesQuery = {
			modules: true,
			importLoaders: 1,
			localIdentName: '[name]-[local]-[hash:base64:5]'
		};

		return {
			context: this.srcPathAbsolute,
			devServer: {
				contentBase: './build',
				historyApiFallback: true,
				hotOnly: true,
				// inline: true,
				port: 9997,
				proxy: {
                    "/login": {
                        target: `http://${realServerIP}:${realServerPort}`,
                        changeOrigin: true
                    },
                    "/logout": {
                        target: `http://${realServerIP}:${realServerPort}`,
                        changeOrigin: true
					},
					"/checkUsername": {
                        target: `http://${realServerIP}:${realServerPort}`,
                        changeOrigin: true
					},
					"/checkInviteCode": {
                        target: `http://${realServerIP}:${realServerPort}`,
                        changeOrigin: true
					},
					"/register": {
                        target: `http://${realServerIP}:${realServerPort}`,
                        changeOrigin: true
					},
                    "/api": {
                        target: `http://${realServerIP}:${realServerPort}`,
                        changeOrigin: true
                    }
				}
			},
			module: {
				rules: [
					{
						enforce: 'pre',
						test: /\.js?$/,
						include: this.srcPathAbsolute,
						loader: 'babel-loader',
						query: {presets: ["latest", "react", "stage-0", "es2017"]}
					},
					{
						test: /\.js$/,
						exclude: [/node_modules/, /\.html$/],
						loaders: ['react-hot-loader']
					},
					{
						test: /^.((?!cssmodule).)*\.css$/,
						loaders: [
							{loader: 'style-loader'},
							{loader: 'css-loader'},
						]
					},
					{
						test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2)$/,
						loader: 'file-loader'
					},
					{
						test: /^.((?!cssmodule).)*\.(sass|scss)$/,
						loaders: [
							{loader: 'style-loader'},
							{loader: 'css-loader'},
							{loader: 'sass-loader'}
						]
					},
					{
						test: /^.((?!cssmodule).)*\.less$/,
						loaders: [
							{loader: 'style-loader'},
							{loader: 'css-loader'},
							{loader: 'less-loader'}
						]
					},
					{
						test: /^.((?!cssmodule).)*\.styl$/,
						loaders: [
							{loader: 'style-loader'},
							{loader: 'css-loader'},
							{loader: 'stylus-loader'}
						]
					},
					{
						test: /\.json$/,
						loader: 'json-loader'
					},
					{
						test: /\.(js|jsx)$/,
						include: [].concat(this.includedPackages, [this.srcPathAbsolute]),
						loaders: [{loader: 'babel-loader'}]
					},
					{
						test: /\.cssmodule\.(sass|scss)$/,
						loaders: [
							{loader: 'style-loader'},
							{
								loader: 'css-loader',
								query: cssModulesQuery
							},
							{loader: 'sass-loader'}
						]
					},
					{
						test: /\.cssmodule\.css$/,
						loaders: [
							{loader: 'style-loader'},
							{
								loader: 'css-loader',
								query: cssModulesQuery
							},
						]
					},
					{
						test: /\.cssmodule\.less$/,
						loaders: [
							{loader: 'style-loader'},
							{
								loader: 'css-loader',
								query: cssModulesQuery
							},
							{loader: 'less-loader'}
						]
					},
					{
						test: /\.cssmodule\.styl$/,
						loaders: [
							{loader: 'style-loader'},
							{
								loader: 'css-loader',
								query: cssModulesQuery
							},
							{loader: 'stylus-loader'}
						]
					}
				]
			},
			output: {
				path: path.join(__dirname, '../build'),
				filename: '[name].[hash].js',
			},
			plugins: [
				new HtmlWebpackPlugin({
					template: path.join(__dirname, '../src/index.html'),
					filename: 'index.html',
					inject: 'body'
				}),
				new CleanWebpackPlugin(['build']),
				new CopyWebpackPlugin([{
					from: './configs.js',
					to: './configs.js'
				}, {
					from: './assets/images',
					to: './images'
				}, {
                    from: './assets/fonts',
                    to: './fonts'
                }]),
				new webpack.optimize.CommonsChunkPlugin({
					name: ['base', 'vendor'],
					minChunks: Infinity,
					filename: '[name].[hash].js'
				}),
				new BundleAnalyzerPlugin()
			],
			resolve: {
				alias: {
					actions: `${ this.srcPathAbsolute }/actions/`,
					components: `${ this.srcPathAbsolute }/components/`,
					images: `${ this.srcPathAbsolute }/assets/images/`,
					media: `${ this.srcPathAbsolute }/assets/media/`,
					stores: `${ this.srcPathAbsolute }/stores/`,
					styles: `${ this.srcPathAbsolute }/styles/`
				},
				extensions: [
					'.js',
					'.jsx'
				],
				modules: [
					this.srcPathAbsolute,
					'node_modules'	
				]
			}
		};
	}
}
module.exports = WebpackBaseConfig;
