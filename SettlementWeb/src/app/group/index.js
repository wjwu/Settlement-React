import React from 'react'
import {
	connect
} from 'react-redux'
import {
	Row,
	Col,
	Card,
	Tree,
	Spin,
	Table,
	Icon
} from 'antd'
import {
	getGroups,
	getUsers
} from './action'

import moment from 'moment'

const TreeNode = Tree.TreeNode

const columns = [{
	title: '账号',
	dataIndex: 'LoginID',
	key: 'loginId',
	width: '15%',
	render: text => {
		return <a href='#'>{text}</a>
	}
}, {
	title: '手机',
	dataIndex: 'Phone',
	key: 'phone',
	width: '15%',
}, {
	title: '姓名',
	dataIndex: 'Name',
	key: 'name',
	width: '15%'
}, {
	title: '状态',
	dataIndex: 'Enabled',
	key: 'enabled',
	width: '15%',
	render: text => {
		if (text) {
			return '启用'
		} else {
			return '禁用'
		}
	}
}, {
	title: '创建时间',
	dataIndex: 'CreateTime',
	key: 'createTime',
	width: '30%',
	render: text => moment(text).format('YYYY-MM-DD HH:mm:ss')
}, {
	title: '操作',
	key: 'operation',
	width: '10%',
	render: text => {
		return <a href='#'><Icon type="edit" /></a>
	}
}]

let pagination = {
	showSizeChanger: true,
	onShowSizeChange(current, pageSize) {
		console.log('Current: ', current, '; PageSize: ', pageSize)
	},
	onChange(current) {
		console.log(this)
		console.log('Current: ', current)
	}
}

class Group extends React.Component {
	componentDidMount() {
		this.props.getGroups()
	}

	onSelect(nodeIds) {
		if (nodeIds.length > 0) {
			this.props.getUsers(nodeIds[0])
		}
	}

	render() {
		const {
			loading,
			data,
			users
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
				<Tree onSelect={this.onSelect.bind(this)} defaultExpandAll>
					{treeNodes}
				</Tree>
			)
		}

		let usersData
		if (users && users.TotalCount > 0) {
			usersData = users.List
			pagination.total = users.TotalCount
		}
		return (
			<div className='main-container'>
				<Row>
					<Col xs={24} sm={7} md={7} lg={6} className='test'>
						<Card title='部门结构' bodyStyle={{ padding: 15 }}>
							{child}
						</Card>
					</Col>
					<Col xs={24} sm={17} md={17} lg={18} className='test'>
						<Card title='用户数据' bodyStyle={{ padding: 15 }}>
							<Table columns={columns} dataSource={usersData} pagination={pagination}/>
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state
}


export default connect(mapStateToProps, {
	getGroups,
	getUsers
})(Group)