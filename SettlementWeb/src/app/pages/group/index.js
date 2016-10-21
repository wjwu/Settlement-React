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

import TTree from '../../../components/TTree'
import TTable from '../../../components/TTable'
import TCard from '../../../components/TCard'
import TMsgContainer from '../../../components/TMsgContainer'
import CreateGroup from './busComponents/CreateGroup'
import CreateUser from './busComponents/CreateUser'

import * as group from '../../actions/group'
import * as user from '../../actions/user'

import columns from './columns'

const EMPTY_GUID = '00000000-0000-0000-0000-000000000000'

class Group extends React.Component {
	constructor(props) {
		super(props)
		this.onTTreeSelect = this.onTTreeSelect.bind(this)
		this.onTTableLoad = this.onTTableLoad.bind(this)
		this.showGroupModal = this.showGroupModal.bind(this)
		this.hideGroupModal = this.hideGroupModal.bind(this)
		this.showUserModal = this.showUserModal.bind(this)
		this.hideUserModal = this.hideUserModal.bind(this)
		this.submitGroup = this.submitGroup.bind(this)
		this.submitUser = this.submitUser.bind(this)
		this.state = {
			groupModalVisible: false,
			userModalVisible: false
		}
	}

	componentDidMount() {
		this.props.groupQuery()
	}

	componentDidUpdate() {
		if (this.props.group.created) {
			this.props.groupQuery()
		}
	}

	onTTreeSelect(nodeId) {
		this.selectedNodeId = nodeId
		this.props.userQuery(nodeId)
	}

	onTTableLoad(pageIndex) {
		this.props.userQuery(this.selectedNodeId, pageIndex)
	}

	showGroupModal() {
		this.setState({
			groupModalVisible: true
		})
	}

	hideGroupModal() {
		this.setState({
			groupModalVisible: false
		})
	}

	showUserModal() {
		this.setState({
			userModalVisible: true
		})
	}

	hideUserModal() {
		this.setState({
			userModalVisible: false
		})
	}

	submitGroup(parentId, name) {
		this.props.groupCreate(parentId, name)
	}

	submitUser(user) {
		this.props.userCreate(user)
	}

	render() {
		let groupProps = this.props.group

		const userProps = this.props.user

		const {
			groupModalVisible,
			userModalVisible
		} = this.state

		let groups = []
		if (groupProps.result && groupProps.result.List) {
			const loop = (parentId) => {
				return groupProps.result.List.filter(item => {
					return item.ParentID === parentId
				}).map(item => {
					let newItem = {
						...item
					}
					newItem.children = loop(item.ID)
					return newItem
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
							<Button type='primary' className='button' onClick={this.showGroupModal}>新增部门</Button>
							<Button type='primary' onClick={this.showUserModal}>新增用户</Button>
							<CreateGroup visible={groupModalVisible} data={groups} onSubmit={this.submitGroup} submitting={groupProps.creating} onCancel={this.hideGroupModal}/>
							<CreateUser visible={userModalVisible} data={groups} onSubmit={this.submitUser} submitting={userProps.creating} onCancel={this.hideUserModal}/>
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
	'groupQuery': group.query,
	'groupCreate': group.create,
	'userQuery': user.query,
	'userCreate': user.create
})(TMsgContainer()(Group))

// todo添加group后 刷新