import React, {
	Component
} from 'react'
import {
	TreeSelect,
	Tree
} from 'antd'

const TreeNode = Tree.TreeNode
const EMPTY_GUID = '00000000-0000-0000-0000-000000000000'

class TTreeSelect extends Component {
	render() {
		const data = this.props.data
		let treeNodes = []

		if (data) {
			const dataLoop = parentId => data.filter(item => item.ParentID === parentId).map(item => {
				item.children = dataLoop(item.ID)
				return item
			})
			let treeData = dataLoop(EMPTY_GUID)

			const nodeLoop = dt => dt.map(item => {
				if (item.children.length > 0) {
					return <TreeNode value={item.ID} title={item.Name} key={item.ID}>{nodeLoop(item.children)}</TreeNode>
				}
				return <TreeNode value={item.ID} title={item.Name} key={item.ID}/>
			})
			treeNodes = nodeLoop(treeData)
		}

		return (
			<TreeSelect {...this.props}>
				{treeNodes}
			</TreeSelect>
		)
	}
}

export default TTreeSelect