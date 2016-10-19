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

class TTree extends Component {
	constructor(prop) {
		super(prop)
		this.onSelect = this.onSelect.bind(this)
	}

	onSelect(nodeIds) {
		if (nodeIds.length > 0 && this.props.onSelect) {
			this.props.onSelect(nodeIds[0])
		}
	}

	render() {
		const {
			title,
			loading,
			data
		} = this.props

		if (loading) {
			return (<Spin tip='Loading...'/>)
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

TTree.defaultProps = {
	data: []
}

TTree.propTypes = {
	title: PropTypes.string,
	loading: PropTypes.bool,
	data: PropTypes.array,
	onSelect: PropTypes.func
}

export default TTree