import 'whatwg-fetch'

const post = (url, request) => {
	return fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(request)
	})
}

export {
	post
}