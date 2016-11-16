import * as apiClient from './apiClient'

export const expired = () => {
	return apiClient.get('sign/expired')
}

export const signOut = () => {
	return apiClient.get('sign/out')
}