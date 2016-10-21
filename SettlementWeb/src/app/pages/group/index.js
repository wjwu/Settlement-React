import React from 'react'
import {
	connect
} from 'react-redux'
import {
	Row,
	Col,
	Button,
	Modal
} from 'antd'
const confirm = Modal.confirm

import TTree from '../../../components/TTree'
import TTable from '../../../components/TTable'
import TCard from '../../../components/TCard'
import TMsgContainer from '../../../components/TMsgContainer'
import CreateGroup from './busComponents/CreateGroup'
import UpdateGroup from './busComponents/UpdateGroup'
import CreateUser from './busComponents/CreateUser'
import UpdateUser from './busComponents/UpdateUser'

import * as group from '../../actions/group'
import * as user from '../../actions/user'

import columns from './columns'

const EMPTY_GUID = '00000000-0000-0000-0000-000000000000'
const createGroup = 'createGroup'
const createUser = 'createUser'
const updateGroup = 'updateGroup'
const updateUser = 'updateUser'

class Group extends React.Component {
	constructor(props) {
		super(props)
		this.onTTreeSelect = this.onTTreeSelect.bind(this)
		this.onTTableLoad = this.onTTableLoad.bind(this)
		this.state = {
			[createGroup]: false,
			[createUser]: false,
			[updateGroup]: false,
			[updateUser]: false
		}
	}

	componentDidMount() {
		this.props.queryGroup()
	}

	componentDidUpdate() {
		if (this.props.group.created || this.props.group.updated) {
			this.props.queryGroup()
		}
		if (this.props.user.created && this.selectedNode) {
			this.props.queryUser(this.selectedNode.key)
		}
	}

	onTTreeSelect(node) {
		this.selectedNode = node
		this.props.queryUser(node.key)
	}

	onTTableLoad(pageIndex) {
		this.props.queryUser(this.selectedNode.key, pageIndex)
	}

	showModal(type) {
		this.setState({
			[type]: true
		})
	}

	hideModal(type) {
		this.setState({
			[type]: false
		})
	}

	doDeleteGroup() {
		let node = this.selectedNode
		if (!node) {
			this.props.showGlobleMsg('error', '请选择一个部门！')
		} else {
			const {
				deleteGroup,
				showGlobleMsg,
				queryGroup,
				queryUser
			} = this.props
			let that = this
			confirm({
				title: '删除部门',
				content: '确定要删除选中部门？',
				onOk() {
					return deleteGroup(node.key).then(result => {
						if (result.Message) {
							showGlobleMsg('error', result.Message)
						} else {
							that.selectedNode = null
							queryGroup()
							queryUser(node.key)
						}
					})
				},
			})
		}
	}

	doUpdateGroup(type) {
		let node = this.selectedNode
		if (!node) {
			this.props.showGlobleMsg('error', '请选择一个部门！')
		} else {
			this.setState({
				[type]: true
			})
		}
	}

	submit(type, data) {
		this.props[type](data)
	}

	render() {
		let groupProps = this.props.group
		let userProps = this.props.user

		const {
			createGroup: createGroupVisible,
			createUser: createUserVisible,
			updateGroup: updateGroupVisible,
			updateUser: updateUserVisible,
		} = this.state

		let groups = []
		if (groupProps.result && groupProps.result.List) {
			const loop = (parentId) => {
				return groupProps.result.List.filter(item => item.ParentID === parentId).map(item => {
					item.children = loop(item.ID)
					return item
				})
			}
			groups = loop(EMPTY_GUID)
		}

		let totalCount = 0
		if (userProps.result) {
			totalCount = userProps.result.TotalCount
		}
		let users = totalCount > 0 ? userProps.result.List : []

		return (
			<div className='main-container'>
				<Row gutter={24}>
					<Col className='col'>
						<TCard>
							<Button type='primary' className='button' onClick={this.showModal.bind(this,createGroup)}>新增部门</Button>
							<Button type='primary' className='button' onClick={this.showModal.bind(this,createUser)}>新增用户</Button>
							<Button type='ghost' className='button' onClick={this.doUpdateGroup.bind(this,updateGroup)}>修改部门</Button>
							<Button type='ghost' onClick={this.doDeleteGroup.bind(this)}>删除部门</Button>
							<CreateGroup visible={createGroupVisible} onSubmit={this.submit.bind(this,createGroup)} submitting={groupProps.creating} onCancel={this.hideModal.bind(this,createGroup)} groups={groups}/>
							<CreateUser visible={createUserVisible} onSubmit={this.submit.bind(this,createUser)} submitting={userProps.creating} onCancel={this.hideModal.bind(this,createUser)} groups={groups} />
							<UpdateGroup visible={updateGroupVisible} onSubmit={this.submit.bind(this,updateGroup)} submitting={groupProps.updating} onCancel={this.hideModal.bind(this,updateGroup)} group={this.selectedNode||{}} />
							<UpdateUser visible={updateUserVisible} onSubmit={this.submit.bind(this,updateUser)} submitting={userProps.updating} onCancel={this.hideModal.bind(this,updateUser)} groups={groups} />
						</TCard>
					</Col>
				</Row>
				<Row gutter={24}>
					<Col xs={24} sm={7} md={7} lg={6} className='col'>
						<TTree title='部门结构' loading={groupProps.getting} data={groups} onSelect={this.onTTreeSelect}/>
					</Col>
					<Col xs={24} sm={17} md={17} lg={18} className='col'>
						<TTable title='用户数据' columns={columns} total={totalCount} data={users} loading={userProps.getting} onLoad={this.onTTableLoad}/>
					</Col>
				</Row>
			</div>
		)
	}
}

export default connect(state => state, {
	'queryGroup': group.query,
	[createGroup]: group.create,
	[updateGroup]: group.update,
	'deleteGroup': group.del,
	'queryUser': user.query,
	[createUser]: user.create,
	[updateUser]: user.update
})(TMsgContainer()(Group))