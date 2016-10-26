import React from 'react'
import {
	connect
} from 'react-redux'
import {
	Row,
	Button,
	Modal
} from 'antd'

const confirm = Modal.confirm
import TMainContainer from '../../../components/TMainContainer'
import TMsgContainer from '../../../components/TMsgContainer'
import TCol from '../../../components/TCol'
import TTree from '../../../components/TTree'
import TTable from '../../../components/TTable'
import TCard from '../../../components/TCard'

import CreateGroup from './busComponents/CreateGroup'
import UpdateGroup from './busComponents/UpdateGroup'
import CreateUser from './busComponents/CreateUser'
import UpdateUser from './busComponents/UpdateUser'

import GroupAction from '../../actions/Group'
const group = new GroupAction()
import UserAction from '../../actions/User'
const user = new UserAction()

import genColumns from './columns'

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
		this.queryGroupRequest = {
			pageIndex: 1
		}
		this.queryUserRequset = {
			pageIndex: 1
		}
		this.state = {
			[createGroup]: false,
			[createUser]: false,
			[updateGroup]: false,
			[updateUser]: false
		}
	}

	componentDidMount() {
		this.props.queryGroup(this.queryGroupRequest)
	}

	componentDidUpdate() {
		if (this.props.group.created || this.props.group.updated) {
			this.props.queryGroup(this.queryGroupRequest)
		}
		if ((this.props.user.created || this.props.user.updated) && this.queryUserRequset.group) {
			this.props.queryUser(this.queryUserRequset)
		}
	}

	onTTreeSelect(node) {
		this.selectedNode = node
		this.queryUserRequset.group = node.key
		this.queryUserRequset.pageIndex = 1
		this.props.queryUser(this.queryUserRequset)
	}

	onTTableLoad(pageIndex) {
		this.queryUserRequset.pageIndex = pageIndex
		this.props.queryUser(this.queryUserRequset)
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
		let group = this.queryUserRequset.group
		if (!group) {
			this.props.showGlobleMsg('error', '请选择一个部门！')
		} else {
			const {
				delGroup,
				showGlobleMsg,
				queryGroup,
				queryUser
			} = this.props
			let that = this
			confirm({
				title: '删除部门',
				content: '确定要删除选中部门？',
				onOk() {
					return delGroup(group).then(result => {
						showGlobleMsg('success', '删除成功！')
						that.queryUserRequset.group = null
						queryGroup(that.queryGroupRequest)
					}, error => {
						showGlobleMsg('error', result.Message)
					})
				},
			})
		}
	}

	doUpdateGroup(type) {
		if (!this.queryUserRequset.group) {
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
			const loop = (parentId) => groupProps.result.List.filter(item => item.ParentID === parentId).map(item => {
				item.children = loop(item.ID)
				return item
			})

			groups = loop(EMPTY_GUID)
		}

		let totalCount = 0
		if (userProps.result) {
			totalCount = userProps.result.TotalCount
		}
		let users = totalCount > 0 ? userProps.result.List : []

		const columns = genColumns(raw => {
			this.selectedUser = raw
			this.showModal(updateUser)
		})
		const selectedUser = this.selectedUser || {}

		let modal
		if (createGroupVisible) {
			modal = <CreateGroup onSubmit={this.submit.bind(this,createGroup)} loading={groupProps.creating} onCancel={this.hideModal.bind(this,createGroup)} groups={groups}/>
		} else if (createUserVisible) {
			modal = <CreateUser onSubmit={this.submit.bind(this,createUser)} loading={userProps.creating} onCancel={this.hideModal.bind(this,createUser)} groups={groups} />
		} else if (updateGroupVisible) {
			modal = <UpdateGroup onSubmit={this.submit.bind(this,updateGroup)} loading={groupProps.updating} onCancel={this.hideModal.bind(this,updateGroup)} group={this.selectedNode||{}} />
		} else if (updateUserVisible) {
			modal = <UpdateUser onSubmit={this.submit.bind(this,updateUser)} loading={userProps.updating} onCancel={this.hideModal.bind(this,updateUser)} groups={groups} user={selectedUser}/>
		}
		return (
			<TMainContainer>
				<Row>
					<TCol>
						<TCard>
							<Button type='primary' className='button' onClick={this.showModal.bind(this,createGroup)}>新增部门</Button>
							<Button type='primary' className='button' onClick={this.showModal.bind(this,createUser)}>新增用户</Button>
							<Button type='ghost' className='button' onClick={this.doUpdateGroup.bind(this,updateGroup)}>修改部门</Button>
							<Button type='ghost' onClick={this.doDeleteGroup.bind(this)}>删除部门</Button>
							{modal}
						</TCard>
					</TCol>
				</Row>
				<Row gutter={24}>
					<TCol xs={24} sm={7} md={7} lg={6}>
						<TTree title='部门结构' loading={groupProps.getting} data={groups} onSelect={this.onTTreeSelect}/>
					</TCol>
					<TCol xs={24} sm={17} md={17} lg={18}>
						<TTable title='用户数据' columns={columns} total={totalCount} data={users} loading={userProps.getting} onLoad={this.onTTableLoad}/>
					</TCol>
				</Row>
			</TMainContainer>
		)
	}
}

export default connect(state => state, {
	'queryGroup': group.query.bind(group),
	[createGroup]: group.create.bind(group),
	[updateGroup]: group.update.bind(group),
	'delGroup': group.del.bind(group),
	'queryUser': user.query.bind(user),
	[createUser]: user.create.bind(user),
	[updateUser]: user.update.bind(user)
})(TMsgContainer()(Group))