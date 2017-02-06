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
		],
		'vendor': ['babel-polyfill', 'react-redux', 'numeral', 'echarts-for-react']
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].js',
		publicPath: 'http://localhost:10010/',
		chunkFilename: '[name].chunk.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: 'babel-loader'
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader!postcss',
				use: 'css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]!sass-loader'
			})
		}, {
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader!postcss',
				use: 'css-loader!less-loader'
			})
		}, {
			test: /\.css$/,
			use: 'file-loader?name=[path][name].[ext]'
		}, {
			test: /\.html$/,
			use: 'html-loader'
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: false,
			mangle: false,
			comments: false,
			sourceMap: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.js',
			chunks: ['app']
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin({
			filename: '[name].css',
			disable: false,
			allChunks: true
		})
	],
	devtool: 'source-map',
};