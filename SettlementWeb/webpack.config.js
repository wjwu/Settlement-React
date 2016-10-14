var webpack = require('webpack');
var publicPath = 'http://localhost:10010/';
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var devtool;
var compress;
var mangle;
var entry;
if (process.env.NODE_ENV === "prd") {
	devtool = false;
	compress = false;
	mangle = false;
	entry = {
		'app/app': [
			'./src/app/index.js',
			'whatwg-fetch'
		],
		'login/login': [
			'./src/login/index.js',
			'whatwg-fetch'
		]
	}
} else {
	devtool = 'eval-source-map';
	compress = false;
	mangle = false;
	entry = {
		// 'app/app': [
		// 	'webpack-hot-middleware/client?reload=true',
		// 	'./src/app/index.js',
		// ],
		'login/login': [
			'webpack-hot-middleware/client?reload=true',
			'./src/login/index.js',
			'whatwg-fetch'
		]
	}
}


module.exports = {
	entry: entry,
	output: {
		path: __dirname + '/dist',
		filename: '[name].bundle.js',
		publicPath: publicPath
	},
	resolve: {
		extensions: ['', '.js'],
	},
	module: {
		//noParse: [/moment.js/],
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
			loader: "url?limit=8192"
		}, {
			test: /\.css$/,
			loader: 'file?name=[path][name].[ext]'
		}, {
			test: /\.html$/,
			loader: 'html'
		}]
	},
	devtool: devtool,
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: compress,
			mangle: mangle,
			comments: false
		}),
		new webpack.optimize.CommonsChunkPlugin('common.js', ['app/app', 'login/login']),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('app.css', {
			allChunks: true
		}),
		//new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
		// new webpack.ProvidePlugin({
		// 	$: "jquery",
		// 	jQuery: "jquery",
		// 	"window.jQuery": "jquery"
		// }),
	]
};