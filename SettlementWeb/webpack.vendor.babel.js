import webpack from 'webpack';

const vendors = [
  'classnames',
  'echarts-for-react',
  'immutable',
  'md5',
  'numeral',
  'react-redux',
  'react-router',
  'redux',
  'redux-actions',
  'redux-saga',
  'whatwg-fetch'
];

export default {
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'moment': 'moment',
    'antd': 'antd',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: '[name]'
  },
  entry: {
    vendor: vendors,
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.DllPlugin({
      path: __dirname + '/dist/manifest.json',
      name: '[name]',
    }),
  ],
};