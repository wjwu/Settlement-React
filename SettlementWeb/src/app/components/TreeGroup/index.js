import React, {
	Component,
	PropTypes
} from 'react'
import {
	Tree,
	Spin
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

class TreeGroup extends Component {
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
		let groups = this.state.groups

		if (!groups) {
			return <Spin tip='Loading...'/>
		}

		const loop = data => data.map(item => {
			if (item.children && item.children.length > 0) {
				return <TreeNode title={item.Name} key={item.ID}>{loop(item.children)}</TreeNode>
			}
			return <TreeNode title={item.Name} key={item.ID}/>
		})
		const treeNodes = loop(data)
		return (
			<TCard title={title}>
				<Tree onSelect={this.onSelect} defaultExpandAll>
					{treeNodes}
				</Tree>
			</TCard>
		)
	}
}

export default TreeGroup