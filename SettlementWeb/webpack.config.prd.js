var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
	'API_HOST': 'http://120.24.244.98:9001/api/',
	'NODE_ENV': process.env.NODE_ENV
}

module.exports = {
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'moment': 'moment'
	},
	entry: {
		'app': [
			'./src/app/index.js',
			'whatwg-fetch'
		],
		'login': [
			'./src/login/index.js',
			'whatwg-fetch'
		],
		'print': [
			'./src/print/index.js',
			'whatwg-fetch'
		]
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].[hash].js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['', '.js'],
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel'
		}, {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('style!postcss', 'css?modules&localIdentName=[name]__[local]-[hash:base64:5]!sass')
		}, {
			test: /\.less$/,
			loader: ExtractTextPlugin.extract('style!postcss', 'css!less')
		}, {
			test: /\.(jpg|gif)$/,
			loader: 'url?limit=8192'
		}, {
			test: /\.css$/,
			loader: 'file?name=[path][name].[ext]'
		}, {
			test: /\.html$/,
			loader: 'html'
		}]
	},
	devtool: false,
	plugins: [
		new HtmlWebpackPlugin({
			filename: __dirname + '/dist/login.html',
			template: __dirname + '/src/login/index.tpl.html',
			minify: false,
			inject: 'body',
			hash: false,
			chunks: ['login', 'common']
		}),
		new HtmlWebpackPlugin({
			filename: __dirname + '/dist/index.html',
			template: __dirname + '/src/app/index.tpl.html',
			minify: false,
			inject: 'body',
			hash: false,
			chunks: ['app', 'common']
		}),
		new HtmlWebpackPlugin({
			filename: __dirname + '/dist/print.html',
			template: __dirname + '/src/print/index.tpl.html',
			minify: false,
			inject: 'body',
			hash: false,
			chunks: ['print', 'common']
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: true,
			mangle: {
				except: ['$', 'exports', 'require']
			},
			comments: false
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: '[name].[hash].js',
			chunks: ['app', 'login', 'print']
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('[name].[hash].css', {
			allChunks: true
		}),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(config)
		})
	]
};