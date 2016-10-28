import * as apiClient from './apiClient'

const auth = () => {
	return apiClient.get('sign/expired')
}

export default auth