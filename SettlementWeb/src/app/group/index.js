import React from 'react'
import {
	connect
} from 'react-redux'
import {
	Row,
	Col,
	Card,
	Tree,
	Spin
} from 'antd'
import * as groupActions from './action'

const TreeNode = Tree.TreeNode

class Group extends React.Component {
	componentDidMount() {
		this.props.groupInit()
	}

	onSelect(info) {
		console.log('selected', info)
	}

	render() {
		const {
			loading,
			data
		} = this.props.groupReducer

		let child = <Spin tip='Loading...'/>
		if (!loading && data) {
			const leaf = false
			const loop = data => data.map((item) => {
				if (item.children.length > 0) {
					return <TreeNode title={item.Name} key={item.ID}>{loop(item.children)}</TreeNode>
				}
				return <TreeNode title={item.Name} key={item.ID}/>
			})
			const treeNodes = loop(data)
			child = (
				<Tree onSelect={this.onSelect}>
					{treeNodes}
				</Tree>
			)
		}
		return (
			<div>
				<Row>
					<Card title='部门结构' style={{ width: 300 }}>
						{child}
					</Card>
				</Row>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state
}


export default connect(mapStateToProps, {
	...groupActions
})(Group)