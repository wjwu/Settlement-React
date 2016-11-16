import React, {
	Component,
	PropTypes
} from 'react'
import {
	Tree,
	Spin
} from 'antd'
import TCard from '../TCard'

const TreeNode = Tree.TreeNode
const EMPTY_GUID = '00000000-0000-0000-0000-000000000000'

class TTree extends Component {
	constructor(prop) {
		super(prop)
		this.onSelect = this.onSelect.bind(this)
	}

	onSelect(selectedKeys, e) {
		if (e.selected) {
			this.props.onSelect({
				title: e.node.props.title,
				key: e.node.props.eventKey
			})
		}
	}

	render() {
		const {
			title,
			loading,
			data
		} = this.props

		if (loading) {
			return (
				<TCard title={title}>
					<Spin tip='Loading...'/>
				</TCard>
			)
		}
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
			<TCard title={title}>
				<Tree onSelect={this.onSelect} defaultExpandAll>
					{treeNodes}
				</Tree>
			</TCard>
		)
	}
}

TTree.defaultProps = {
	loading: false
}

TTree.propTypes = {
	title: PropTypes.string,
	loading: PropTypes.bool,
	data: PropTypes.array.isRequired,
	onSelect: PropTypes.func.isRequired
}

export default TTree