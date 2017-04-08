import React, { Component, PropTypes } from 'react'
import { TreeSelect, Tree } from 'antd'

const TreeNode = Tree.TreeNode

class TTreeSelect extends Component {
	render() {
		let treeNodes = []
		if (this.props.data) {
			let data = this.props.data
			const dataLoop = parentId => {
				return data.filter(item => item.ParentID === parentId).map(item => {
					item.children = dataLoop(item.ID)
					return item
				})
			}
			let treeData = dataLoop(this.props.root)

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

TTreeSelect.defaultProps = {
	root: '00000000-0000-0000-0000-000000000000'
}

TTreeSelect.propTypes = {
	root: PropTypes.string
}

export default TTreeSelect