import 'whatwg-fetch'

const API_URL = 'http://localhost:10011/api/'
const API_SERVER_ERROR = 'Api server error.'
const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
}

const processResponse = response => response.status === 204 ? {} : response.json()

const processResult = (reject, resolve, result) => result.Message ? reject(result.Message) : resolve(result)

const processError = (reject, error) => reject(API_SERVER_ERROR)

const get = (url, request) => {
	let query = Object.keys(request)
		.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(request[key]))
		.join('&')

	return new Promise((resolve, reject) => {
		fetch(`${API_URL}${url}?${query}`, {
				method: 'GET',
				headers: headers
			}).then(processResponse)
			.then(processResult.bind(null, reject, resolve))
			.catch(processError)
	})
}

const post = (url, request) => {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}${url}`, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(request)
			}).then(processResponse)
			.then(processResult.bind(null, reject, resolve))
			.catch(processError)
	})
}

const del = (url) => {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}${url}`, {
				method: 'DELETE'
			}).then(processResponse)
			.then(processResult.bind(null, reject, resolve))
			.catch(processError)
	})
}

const put = (url, request) => {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}${url}`, {
				method: 'PUT',
				headers: headers,
				body: JSON.stringify(request)
			}).then(processResponse)
			.then(processResult.bind(null, reject, resolve))
			.catch(processError)
	})
}

export {
	get,
	post,
	del,
	put
}