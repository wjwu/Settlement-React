import React, {
	Component
} from 'react'
import {
	TreeSelect,
	Tree
} from 'antd'
import * as apiClient from '../../apiClient'

const TreeNode = Tree.TreeNode
const EMPTY_GUID = '00000000-0000-0000-0000-000000000000'

const tree = (data, root) => {
	if (Array.isArray(data)) {
		const loop = (parentId) => data.filter(item => item.ParentID === parentId).map(item => {
			item.children = loop(item.ID)
			return item
		})
		return loop(root)
	}
	return []
}

class TreeSelectGroup extends Component {
	constructor(props) {
		super(props)
		this.state = {
			groups: []
		}
	}

	componentDidMount() {
		let request = {
			pageIndex: 1
		}
		let that = this
		apiClient.get('group', request).then(result => {
			that.setState({
				groups: tree(result.List, EMPTY_GUID)
			})
		}, error => {
			console.error(error)
		})
	}

	render() {
		let treeNodes = []

		const loop = data => data.map(item => {
			if (item.children.length > 0) {
				return <TreeNode value={item.ID} title={item.Name} key={item.ID}>{loop(item.children)}</TreeNode>
			}
			return <TreeNode value={item.ID} title={item.Name} key={item.ID}/>
		})
		treeNodes = loop(this.state.groups)

		return (
			<TreeSelect {...this.props}>
				{treeNodes}
			</TreeSelect>
		)
	}
}

export default TreeSelectGroup