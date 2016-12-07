var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'moment': 'moment'
	},
	entry: {
		'app': [
			'webpack-hot-middleware/client?reload=true',
			'./src/app/index.js',
			'whatwg-fetch'
		],
		'login': [
			'webpack-hot-middleware/client?reload=true',
			'./src/login/index.js',
			'whatwg-fetch'
		],
		'print': [
			'webpack-hot-middleware/client?reload=true',
			'./src/print/index.js',
			'whatwg-fetch'
		]
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].js',
		publicPath: 'http://localhost:10010/',
		chunkFilename: '[name].chunk.js'
	},
	resolve: {
		extensions: ['', '.js'],
		// alias: {
		// 	numeral: 'numeral/min/numeral-with-locales.min.js'
		// }
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
	devtool: 'eval-source-map',
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: false,
			mangle: false,
			comments: false
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: '[name].js',
			chunks: ['app', 'login', 'print']
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('[name].css', {
			allChunks: true
		})
	]
};