import 'whatwg-fetch'

const API_URL = 'http://localhost:10011/api/'

const get = (url, request) => {
	let query = Object.keys(request)
		.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(request[key]))
		.join('&')
	return fetch(`${API_URL}${url}?${query}`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	}).then(response => {
		if (response.ok) {
			return response.json()
		} else {
			//todo
		}
	})
}

const post = (url, request) => {
	return fetch(`${API_URL}${url}`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(request)
	}).then(response => {
		if (response.ok) {
			if (response.status === 204) {
				return null
			} else {
				return response.json()
			}
		} else {
			//todo
		}
	})
}

export {
	get,
	post
}