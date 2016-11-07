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
	getResult,
	tree,
	EMPTY_GUID,
	disabledDate,
	disabledTime
}