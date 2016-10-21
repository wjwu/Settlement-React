import React, {
	Component
} from 'react'
import {
	TreeSelect,
	Tree
} from 'antd'

const TreeNode = Tree.TreeNode

class TTreeSelect extends Component {
	render() {
		const data = this.props.data
		let treeNodes = []

		if (data) {
			const loop = data => data.map(item => {
				if (item.children.length > 0) {
					return <TreeNode value={item.ID} title={item.Name} key={item.ID}>{loop(item.children)}</TreeNode>
				}
				return <TreeNode value={item.ID} title={item.Name} key={item.ID}/>
			})
			treeNodes = loop(data)
		}

		return (
			<TreeSelect {...this.props}>
				{treeNodes}
			</TreeSelect>
		)
	}
}

export default TTreeSelect