import {
	get,
	post
} from '../serviceWrapper'

export const BEGIN_GET_GROUPS = 'BEGIN_GET_GROUPS'
export const END_GET_GROUPS = 'END_GET_GROUPS'
export const BEGIN_GET_USERS = 'BEGIN_GET_USERS'
export const END_GET_USERS = 'END_GET_USERS'

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
				const data = loop(emptyGuid)
				dispatch({
					type: END_GET_GROUPS,
					data: data
				})
			}
		})
	}
}

export const getUsers = (groupId) => {
	return dispatch => {
		dispatch({
			type: BEGIN_GET_USERS
		})
		get('user', {
			pageIndex: 1,
			group: groupId
		}).then(result => {
			dispatch({
				type: END_GET_USERS,
				users: result
			})
		})
	}
}