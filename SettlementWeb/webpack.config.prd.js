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
		],
		'vendor': ['babel-polyfill', 'react-redux', 'antd', 'numeral', 'echarts-for-react']
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].[hash].js',
		publicPath: '/',
		chunkFilename: '[name].chunk.[hash].js'
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
			test: /\.(jpg|gif)$/,
			use: 'url-loader?limit=8192'
		}, {
			test: /\.css$/,
			use: 'file-loader?name=[path][name].[ext]'
		}, {
			test: /\.html$/,
			use: 'html-loader'
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
			chunks: ['login']
		}),
		new HtmlWebpackPlugin({
			filename: __dirname + '/dist/index.html',
			template: __dirname + '/src/app/index.tpl.html',
			minify: false,
			inject: 'body',
			hash: false,
			chunks: ['app', 'vendor']
		}),
		new HtmlWebpackPlugin({
			filename: __dirname + '/dist/print.html',
			template: __dirname + '/src/print/index.tpl.html',
			minify: false,
			inject: 'body',
			hash: false,
			chunks: ['print']
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			mangle: {
				except: ['$', 'exports', 'require']
			},
			comments: false
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.js',
			chunks: ['app']
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin({
			filename: '[name].[hash].css',
			disable: false,
			allChunks: true
		}),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(config)
		})
	]
};