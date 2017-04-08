import { createActions } from 'redux-actions';

export const GET_GROUP = 'GET_GROUP';
export const REQUEST_GET_GROUP = 'REQUEST_GET_GROUP';
export const SUCCESS_GET_GROUP = 'SUCCESS_GET_GROUP';
export const FAILURE_GET_GROUP = 'FAILURE_GET_GROUP';

export const QUERY_GROUPS = 'QUERY_GROUPS';
export const REQUEST_QUERY_GROUPS = 'REQUEST_QUERY_GROUPS';
export const SUCCESS_QUERY_GROUPS = 'SUCCESS_QUERY_GROUPS';
export const FAILURE_QUERY_GROUPS = 'FAILURE_QUERY_GROUPS';

export const CREATE_GROUP = 'CREATE_GROUP';
export const REQUEST_CREATE_GROUP = 'REQUEST_CREATE_GROUP';
export const SUCCESS_CREATE_GROUP = 'SUCCESS_CREATE_GROUP';
export const FAILURE_CREATE_GROUP = 'FAILURE_CREATE_GROUP';

export const UPDATE_GROUP = 'UPDATE_GROUP';
export const REQUEST_UPDATE_GROUP = 'REQUEST_UPDATE_GROUP';
export const SUCCESS_UPDATE_GROUP = 'SUCCESS_UPDATE_GROUP';
export const FAILURE_UPDATE_GROUP = 'FAILURE_UPDATE_GROUP';


// export const deleteGroup = (id) => {
// 	return () => {
// 		return apiClient.del(`group/${id}`)
// 	}
// }

export default createActions(
	GET_GROUP,
	REQUEST_GET_GROUP,
	SUCCESS_GET_GROUP,
	FAILURE_GET_GROUP,
	QUERY_GROUPS,
	REQUEST_QUERY_GROUPS,
	SUCCESS_QUERY_GROUPS,
	FAILURE_QUERY_GROUPS,
	CREATE_GROUP,
	REQUEST_CREATE_GROUP,
	SUCCESS_CREATE_GROUP,
	FAILURE_CREATE_GROUP,
	UPDATE_GROUP,
	REQUEST_UPDATE_GROUP,
	SUCCESS_UPDATE_GROUP,
	FAILURE_UPDATE_GROUP
);