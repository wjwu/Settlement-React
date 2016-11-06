import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import {
	Row,
	Button,
	Modal
} from 'antd'
import {
	TMainContainer,
	TMsgContainer,
	TCol,
	TTree,
	TTable,
	TCard
} from '../../../components'

import CreateGroup from './bus-components/CreateGroup'
import UpdateGroup from './bus-components/UpdateGroup'
import CreateUser from './bus-components/CreateUser'
import UpdateUser from './bus-components/UpdateUser'

import {
	group,
	user
} from '../../actions'

import genColumns from './columns'
import {
	tree,
	getResult,
	EMPTY_GUID
} from '../../common'
const confirm = Modal.confirm

const queryGroup = 'queryGroup'
const queryUser = 'queryUser'
const createGroup = 'createGroup'
const createUser = 'createUser'
const updateGroup = 'updateGroup'
const updateUser = 'updateUser'

class Group extends Component {
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
		this[queryGroup] = this.props.queryGroup(this.queryGroupRequest)
	}

	componentDidUpdate() {
		if (this.props.group.created || this.props.group.updated) {
			this[queryGroup] = this.props.queryGroup(this.queryGroupRequest)
		}
		if ((this.props.user.created || this.props.user.updated) && this.queryUserRequset.group) {
			this[queryUser] = this.props.queryUser(this.queryUserRequset)
		}
	}

	onTTreeSelect(node) {
		this.selectedNode = node
		this.queryUserRequset.group = node.key
		this.queryUserRequset.pageIndex = 1
		this[queryUser] = this.props.queryUser(this.queryUserRequset)
	}

	onTTableLoad(pageIndex) {
		this.queryUserRequset.pageIndex = pageIndex
		this[queryUser] = this.props.queryUser(this.queryUserRequset)
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
						that['queryGroup'] = queryGroup(that.queryGroupRequest)
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

	render() {
		let groupProps = this.props.group
		let userProps = this.props.user

		const {
			createGroup: createGroupVisible,
			createUser: createUserVisible,
			updateGroup: updateGroupVisible,
			updateUser: updateUserVisible,
		} = this.state

		let result = getResult(this[queryGroup], groupProps.results)
		let groups = tree(result.data, EMPTY_GUID)

		result = getResult(this[queryUser], userProps.results)
		let users = result.data
		let totalCount = result.totalCount

		const columns = genColumns(raw => {
			this.selectedUser = raw
			this.showModal(updateUser)
		})
		const selectedUser = this.selectedUser || {}

		let modal
		if (createGroupVisible) {
			modal = <CreateGroup onCancel={this.hideModal.bind(this,createGroup)} groups={groups}/>
		} else if (createUserVisible) {
			modal = <CreateUser onCancel={this.hideModal.bind(this,createUser)} groups={groups} />
		} else if (updateGroupVisible) {
			modal = <UpdateGroup onCancel={this.hideModal.bind(this,updateGroup)} data={this.selectedNode||{}} />
		} else if (updateUserVisible) {
			modal = <UpdateUser onCancel={this.hideModal.bind(this,updateUser)} groups={groups} data={selectedUser}/>
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
						<TTree title='部门结构' loading={groupProps.querying} data={groups} onSelect={this.onTTreeSelect}/>
					</TCol>
					<TCol xs={24} sm={17} md={17} lg={18}>
						<TCard title='用户数据'>
							<TTable columns={columns} total={totalCount} dataSource={users} loading={userProps.querying} onLoad={this.onTTableLoad}/>
						</TCard>
					</TCol>
				</Row>
			</TMainContainer>
		)
	}
}

export default connect(state => state, {
	[queryGroup]: group.query.bind(group),
	'delGroup': group.del.bind(group),
	[queryUser]: user.query.bind(user),
})(TMsgContainer()(Group))