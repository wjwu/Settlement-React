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

import CreateGroup from './components/CreateGroup'
import UpdateGroup from './components/UpdateGroup'
import CreateUser from './components/CreateUser'
import UpdateUser from './components/UpdateUser'

import {
	queryGroups,
	createGroup,
	updateGroup,
	deleteGroup
} from '../../../actions/group'
import {
	queryUsers,
	createUser,
	updateUser
} from '../../../actions/user'

import genColumns from './columns'
import {
	tree,
	EMPTY_GUID
} from '../../common'
const confirm = Modal.confirm

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
			createGroupVisible: false,
			createUserVisible: false,
			updateGroupVisible: false,
			updateUserVisible: false
		}
	}

	componentDidMount() {
		this.props.queryGroups(this.queryGroupRequest)
	}

	componentDidUpdate() {
		if (this.props.group.createdGroup || this.props.group.updatedGroup) {
			this.props.queryGroups(this.queryGroupRequest)
		}
		if ((this.props.group.createdUser || this.props.group.updatedUser) && this.queryUserRequset.group) {
			this.props.queryUsers(this.queryUserRequset)
		}
	}

	onTTreeSelect(node) {
		this.selectedNode = node
		this.queryUserRequset.group = node.key
		this.queryUserRequset.pageIndex = 1
		this.props.queryUsers(this.queryUserRequset)
	}

	onTTableLoad(pageIndex) {
		this.queryUserRequset.pageIndex = pageIndex
		this.props.queryUsers(this.queryUserRequset)
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
				deleteGroup,
				showGlobleMsg,
				queryGroups,
				queryUsers
			} = this.props
			let that = this
			confirm({
				title: '删除部门',
				content: '确定要删除选中部门？',
				onOk() {
					return deleteGroup(group).then(result => {
						showGlobleMsg('success', '删除成功！')
						that.queryUserRequset.group = '00000000-0000-0000-0000-000000000000'
						queryGroups(that.queryGroupRequest)
						queryUsers(that.queryUserRequset)
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
		let {
			groups,
			users,
			queryingGroups,
			queryingUsers,
			creatingGroup,
			updatingGroup,
			creatingUser,
			updatingUser
		} = this.props.group
		let empty = {
			List: [],
			TotalCount: 0
		}
		groups = groups || empty
		users = users || empty
		groups = tree(groups.List, EMPTY_GUID)

		const {
			createGroupVisible,
			createUserVisible,
			updateGroupVisible,
			updateUserVisible,
		} = this.state

		const columns = genColumns(raw => {
			this.selectedUser = raw
			this.showModal('updateUserVisible')
		})
		const selectedUser = this.selectedUser || {}

		let modal
		if (createGroupVisible) {
			modal = <CreateGroup onCancel={this.hideModal.bind(this,'createGroupVisible')} onSubmit={this.props.createGroup} groups={groups} creating={creatingGroup}/>
		} else if (createUserVisible) {
			modal = <CreateUser onCancel={this.hideModal.bind(this,'createUserVisible')} onSubmit={this.props.createUser} groups={groups} creating={creatingUser}/>
		} else if (updateGroupVisible) {
			modal = <UpdateGroup onCancel={this.hideModal.bind(this,'updateGroupVisible')} onSubmit={this.props.updateGroup} group={this.selectedNode} updating={updatingGroup}/>
		} else if (updateUserVisible) {
			modal = <UpdateUser onCancel={this.hideModal.bind(this,'updateUserVisible')} onSubmit={this.props.updateUser} groups={groups} user={selectedUser} updating={updatingUser}/>
		}
		return (
			<TMainContainer>
				<Row>
					<TCol>
						<TCard>
							<Button type='primary' className='button' onClick={this.showModal.bind(this,'createGroupVisible')}>新增部门</Button>
							<Button type='primary' className='button' onClick={this.showModal.bind(this,'createUserVisible')}>新增用户</Button>
							<Button type='ghost' className='button' onClick={this.doUpdateGroup.bind(this,'updateGroupVisible')}>修改部门</Button>
							<Button type='ghost' onClick={this.doDeleteGroup.bind(this)}>删除部门</Button>
							{modal}
						</TCard>
					</TCol>
				</Row>
				<Row gutter={24}>
					<TCol xs={24} sm={7} md={7} lg={6}>
						<TTree title='部门结构' loading={queryingGroups} data={groups} onSelect={this.onTTreeSelect}/>
					</TCol>
					<TCol xs={24} sm={17} md={17} lg={18}>
						<TCard title='用户数据'>
							<TTable columns={columns} total={users.TotalCount} dataSource={users.List} loading={queryingUsers} onLoad={this.onTTableLoad}/>
						</TCard>
					</TCol>
				</Row>
			</TMainContainer>
		)
	}
}

export default connect(state => state, {
	queryGroups,
	createGroup,
	updateGroup,
	deleteGroup,
	queryUsers,
	createUser,
	updateUser
})(TMsgContainer()(Group))