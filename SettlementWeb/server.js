import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.babel';

const app = express();
const compiler = webpack(config);

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '/src/login/index.html'));
});

app.use(express.static(__dirname + '/libs/'));
app.use(express.static(__dirname + '/dist/'));

app.get('/test', function(req, res) {
	res.sendFile(path.join(__dirname, '/src/test.html'));
});

app.get('/print', function(req, res) {
	res.sendFile(path.join(__dirname, '/src/print/index.html'));
});

app.use(webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath,
	noInfo: true,
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, '/src/app/index.html'));
});


var server = app.listen(10010, () => {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Web app listening at http://%s:%s', host, port);
});