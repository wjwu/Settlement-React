import 'whatwg-fetch'
import config from './config'

const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
}

const processResponse = response => response.json()

const processResult = (reject, resolve, result) => result.IsError ? reject(result.Message) : resolve(result)

const processError = (reject, error) => reject(error)

export const post = (url, request) => {
	return new Promise((resolve, reject) => {
		fetch(`${config.apiHost}${url}`, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(request)
			}).then(processResponse)
			.then(processResult.bind(null, reject, resolve))
			.catch(processError.bind(null, reject))
	})
}