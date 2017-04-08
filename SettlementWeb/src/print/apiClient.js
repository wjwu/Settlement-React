import 'whatwg-fetch'
import config from './config'

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

export default (url, request) => {
	let requestUrl
	if (request) {
		let query = Object.keys(request)
			.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(request[key]))
			.join('&')
		requestUrl = `${config.apiHost}${url}?${query}`
	} else {
		requestUrl = `${config.apiHost}${url}`
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