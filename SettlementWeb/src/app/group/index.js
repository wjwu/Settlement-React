import React from 'react'
import {
	connect
} from 'react-redux'
import {
	Row,
	Col,
	Icon,
	Button,
	Modal,
	Form,
	TreeSelect
} from 'antd'
import {
	getGroups,
	getUsers,
	createGroup
} from './action'

import moment from 'moment'

import TTree from '../../components/TTree'
import TTable from '../../components/TTable'
import TCard from '../../components/TCard'
import CreateGroup from './busComponents/CreateGroup'

const FormItem = Form.Item

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
		return <a href='#'><Icon type='edit' /></a>
	}
}]

class Group extends React.Component {
	constructor(props) {
		super(props)
		this.onTTreeSelect = this.onTTreeSelect.bind(this)
		this.onTTableLoad = this.onTTableLoad.bind(this)
		this.showModal = this.showModal.bind(this)
		this.hideModal = this.hideModal.bind(this)
		this.submitGroup = this.submitGroup.bind(this)
		this.state = {
			groupModalVisible: false,
			userModalVisible: false
		}
	}

	componentDidMount() {
		this.props.getGroups()
	}

	onTTreeSelect(nodeId) {
		this.selectedNodeId = nodeId
		this.props.getUsers(nodeId)
	}

	onTTableLoad(pageIndex) {
		this.props.getUsers(this.selectedNodeId, pageIndex)
	}

	showModal() {
		this.setState({
			groupModalVisible: true
		})
	}

	hideModal() {
		this.setState({
			groupModalVisible: false
		})
	}

	submitGroup(parentId, name) {
		this.props.createGroup(parentId, name)
	}

	render() {
		const {
			groupsLoading,
			groups,
			submittingGroup,
			usersLoading,
			users
		} = this.props.groupReducer

		const {
			groupModalVisible,
			userModalVisible
		} = this.state

		return (
			<div className='main-container'>
				<Row>
					<Col className='col'>
						<TCard>
							<Button type='primary' className='button' onClick={this.showModal}>新增部门</Button>
							<Button type='primary' onClick={this.showModal}>新增用户</Button>
							<CreateGroup visible={groupModalVisible} data={groups} onSubmit={this.submitGroup} submitting={submittingGroup}/>
						</TCard>
					</Col>
				</Row>
				<Row>
					<Col xs={24} sm={7} md={7} lg={6} className='col'>
						<TTree title='部门结构' loading={groupsLoading} data={groups} onSelect={this.onTTreeSelect}/>
					</Col>
					<Col xs={24} sm={17} md={17} lg={18} className='col'>
						<TTable title='用户数据' columns={columns} total={users?users.TotalCount:0} data={users?users.List:[]} loading={usersLoading} onLoad={this.onTTableLoad}/>
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
	getUsers,
	createGroup
})(Group)