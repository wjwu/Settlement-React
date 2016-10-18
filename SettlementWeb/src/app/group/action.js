import {
	GROUP_INIT,
	GROUP_END_INIT
} from './constants'
import {
	get,
	post
} from '../serviceWrapper'

const emptyGuid = '00000000-0000-0000-0000-000000000000'

export const groupInit = () => {
	return dispatch => {
		dispatch({
			type: GROUP_INIT
		})
		get('group', {
			pageIndex: 1
		}).then(response => {
			if (response.ok) {
				return response.json()
			}
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
					type: GROUP_END_INIT,
					data: data
				})
			}
		})
	}
}