import 'whatwg-fetch';
import config from './config';

const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	'x-token': sessionStorage.getItem('token')
};

const processResponse = response => response.json();

const processResult = (reject, resolve, result) =>
	(result.IsError ? reject(result.Message) : resolve(result));

const processError = (reject, error) => {
	if (typeof error === 'string' && error.constructor === String) {
		reject(error);
	} else {
		reject(error.message);
	}
};

export const get = (url, request) => {
	let requestUrl;
	if (request) {
		const query = Object.keys(request)
			.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(request[key])}`)
			.join('&');
		requestUrl = `${config.apiHost}${url}?${query}`;
	} else {
		requestUrl = `${config.apiHost}${url}`;
	}

	return new Promise((resolve, reject) => {
		fetch(requestUrl, { method: 'GET', headers }).then(processResponse)
			.then(processResult.bind(null, reject, resolve))
			.catch(processError.bind(null, reject));
	});
};

export const post = (url, request) => {
	return new Promise((resolve, reject) => {
		fetch(`${config.apiHost}${url}`, {
				method: 'POST',
				headers,
				body: JSON.stringify(request)
			}).then(processResponse)
			.then(processResult.bind(null, reject, resolve))
			.catch(processError.bind(null, reject));
	});
};

export const del = (url) => {
	return new Promise((resolve, reject) => {
		fetch(`${config.apiHost}${url}`, {
				method: 'DELETE',
				headers: headers,
			}).then(processResponse)
			.then(processResult.bind(null, reject, resolve))
			.catch(processError.bind(null, reject));
	});
};

export const put = (url, request) => {
	return new Promise((resolve, reject) => {
		fetch(`${config.apiHost}${url}`, {
				method: 'PUT',
				headers,
				body: JSON.stringify(request)
			}).then(processResponse)
			.then(processResult.bind(null, reject, resolve))
			.catch(processError.bind(null, reject));
	});
};

export const patch = (url, request) => {
	return new Promise((resolve, reject) => {
		fetch(`${config.apiHost}${url}`, {
				method: 'patch',
				headers,
				body: JSON.stringify(request)
			}).then(processResponse)
			.then(processResult.bind(null, reject, resolve))
			.catch(processError.bind(null, reject));
	});
};