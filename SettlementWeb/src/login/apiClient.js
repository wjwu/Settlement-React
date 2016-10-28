import 'whatwg-fetch'

const API_URL = 'http://localhost:10011/api/'
const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
}

const processResponse = response => response.json()

const processResult = (reject, resolve, result) => result.IsError ? reject(result.Message) : resolve(result)

const processError = (reject, error) => reject(error)

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

export {
	API_URL,
	post,
}