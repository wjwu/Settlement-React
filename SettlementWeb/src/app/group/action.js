import {
	get,
	post
} from '../serviceWrapper'

export const BEGIN_GET_GROUPS = 'BEGIN_GET_GROUPS'
export const END_GET_GROUPS = 'END_GET_GROUPS'
export const BEGIN_GET_USERS = 'BEGIN_GET_USERS'
export const END_GET_USERS = 'END_GET_USERS'
export const BEGIN_CREATE_GROUP = 'BEGIN_CREATE_GROUP'
export const END_CREATE_GROUP = 'END_CREATE_GROUP'

const emptyGuid = '00000000-0000-0000-0000-000000000000'

export const getGroups = () => {
	return dispatch => {
		dispatch({
			type: BEGIN_GET_GROUPS
		})
		get('group', {
			pageIndex: 1
		}).then(result => {
			if (result.List) {
				const loop = (parentId) => {
					return result.List.filter(item => {
						return item.ParentID === parentId
					}).map(item => {
						let newItem = {
							...item
						}
						newItem.children = loop(item.ID)
						return newItem
					})
				}
				const groups = loop(emptyGuid)
				dispatch({
					type: END_GET_GROUPS,
					groups: groups
				})
			}
		})
	}
}

export const getUsers = (groupId, pageIndex = 1, pageSize = 10) => {
	return dispatch => {
		dispatch({
			type: BEGIN_GET_USERS
		})
		get('user', {
			pageIndex: pageIndex,
			pageSize: pageSize,
			group: groupId
		}).then(result => {
			dispatch({
				type: END_GET_USERS,
				users: result
			})
		})
	}
}

export const createGroup = (parentId, name) => {
	return dispatch => {
		dispatch({
			type: BEGIN_CREATE_GROUP
		})
		post('group', {
			parentId,
			name
		}).then(result => {
			dispatch({
				type: END_CREATE_GROUP
			})
		})
	}
}