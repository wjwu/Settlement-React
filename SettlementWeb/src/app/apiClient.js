import 'whatwg-fetch'

const API_URL = 'http://localhost:10011/api/'
const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
	'x-token': sessionStorage.getItem('token')
}

const processResponse = response => response.json()

const processResult = (reject, resolve, result) => result.IsError ? reject(result.Message) : resolve(result)

const processError = (reject, error) => {
	if (typeof error === 'string' && error.constructor === String) {
		reject(error)
	} else {
		reject(error.message)
	}
}

const get = (url, request) => {
	let requestUrl
	if (request) {
		let query = Object.keys(request)
			.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(request[key]))
			.join('&')
		requestUrl = `${API_URL}${url}?${query}`
	} else {
		requestUrl = `${API_URL}${url}`
	}

	return new Promise((resolve, reject) => {
		fetch(requestUrl, {
				method: 'GET',
				headers: headers
			}).then(processResponse)
			.then(processResult.bind(null, reject, resolve))
			.catch(processError.bind(null, reject))
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
			.catch(processError.bind(null, reject))
	})
}

const del = (url) => {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}${url}`, {
				method: 'DELETE',
				headers: headers,
			}).then(processResponse)
			.then(processResult.bind(null, reject, resolve))
			.catch(processError.bind(null, reject))
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
			.catch(processError.bind(null, reject))
	})
}

export {
	get,
	post,
	del,
	put
}