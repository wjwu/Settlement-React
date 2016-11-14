const EMPTY_GUID = '00000000-0000-0000-0000-000000000000'

const random = () => {
	let strRand = Math.random() + ''
	return strRand.substr(2, strRand.length - 2)
}

const tree = (data, root) => {
	if (Array.isArray(data)) {
		const loop = (parentId) => data.filter(item => item.ParentID === parentId).map(item => {
			item.children = loop(item.ID)
			return item
		})
		return loop(root)
	}
}

const getGroup = (data, root) => {
	//todo 引用问题
	if (Array.isArray(data)) {
		if (!root) {
			return data.map(item => item.ID)
		}
		let groups = []
		const loop = (parentId) => data.filter(item => item.ParentID === parentId).map(item => {
			groups.push(item.ID)
			if (item.children.length > 1) {
				loop(item.ID)
			}
		})
		loop(root)
		for (let item of data) {
			if (item.ID === root) {
				groups.push(item.ID)
			}
		}
		return groups
	}
}

const disabledDate = current => {
	return current && current.valueOf() > Date.now()
}

const disabledTime = (time, type) => {
	if (type === 'start') {
		return {
			disabledHours() {
				return newArray(0, 60).splice(4, 20)
			},
			disabledMinutes() {
				return newArray(30, 60)
			},
			disabledSeconds() {
				return [55, 56]
			},
		}
	}
	return {
		disabledHours() {
			return newArray(0, 60).splice(20, 4)
		},
		disabledMinutes() {
			return newArray(0, 31)
		},
		disabledSeconds() {
			return [55, 56]
		},
	}
}
export {
	random,
	tree,
	getGroup,
	EMPTY_GUID,
	disabledDate,
	disabledTime
}