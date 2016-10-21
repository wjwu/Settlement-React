import 'whatwg-fetch'

const API_URL = 'http://localhost:10011/api/'
const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
}

const get = (url, request) => {
	let query = Object.keys(request)
		.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(request[key]))
		.join('&')
	return fetch(`${API_URL}${url}?${query}`, {
		method: 'GET',
		headers: headers
	}).then(response => {
		if (response.status === 204) {
			return {}
		}
		return response.json()
	})
}

const post = (url, request) => {
	return fetch(`${API_URL}${url}`, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(request)
	}).then(response => {
		if (response.status === 204) {
			return {}
		}
		return response.json()
	})
}

export {
	get,
	post
}