import * as apiClient from './apiClient';

export const expired = () => apiClient.get('sign/expired');
export const signOut = () => apiClient.get('sign/out');