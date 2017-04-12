import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'moment': 'moment',
		'antd': 'antd',
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
		//'vendor': ['babel-polyfill', 'classnames', 'immutable', 'md5', 'react-redux', 'react-router', 'redux', 'redux-actions', 'redux-saga', 'whatwg-fetch', 'numeral', 'echarts-for-react', 'antd']
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
			exclude: /node_modules/,
			use: ExtractTextPlugin.extract({
				fallback: ['style-loader', 'postcss'],
				use: [{
					loader: 'css-loader',
					options: {
						modules: true,
						localIdentName: '[name]__[local]-[hash:base64:5]'
					}
				}, {
					loader: 'sass-loader'
				}]
			})
		}, {
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				fallback: ['style-loader', 'postcss'],
				use: ['css-loader', 'less-loader']
			})
		}, {
			test: /\.css$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]'
				}
			}]
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
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor',
		// 	filename: 'vendor.js',
		// 	chunks: ['app']
		// }),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin({
			filename: '[name].css',
			disable: false,
			allChunks: true
		}),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./dist/manifest.json'),
		}),
	],
	devtool: 'source-map',
};