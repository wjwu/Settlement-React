import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import {
	Row,
	Col,
	Button,
	Modal
} from 'antd'
import {
	TMainContainer,
	TMsgContainer,
	TCol,
	TCard,
	TTable
} from '../../../components'
import UpdateSheet from './components/UpdateSheet'
import CreateSheet from './components/CreateSheet'
import SearchPanel from './components/SearchPanel'
import {
	getSheet,
	querySheets,
	createSheet,
	updateSheet,
	updateSheetAuditStatus
} from '../../actions/sheet'
import {
	queryBases,
	querySources,
	queryCosts,
} from '../../actions/dictionary'
import {
	queryGroups
} from '../../actions/group'

import genColumns from './columns'

const confirm = Modal.confirm

class Sheet extends Component {
	constructor(prop) {
		super(prop)
		this.query = this.query.bind(this)
		this.onTTableLoad = this.onTTableLoad.bind(this)

		this.request = {
			pageIndex: 1,
			groups: this.props.sys_user.Path
		}
		this.state = {
			updateSheetVisble: false,
			createSheetVisble: false
		}
	}

	componentDidMount() {
		this.query()
		let request = {
			pageIndex: 1,
			pageSize: 999,
			enabled: true
		}
		this.props.queryBases(request)
		this.props.querySources(request)
		this.props.queryCosts(request)
		this.props.queryGroups({
			ID: this.props.sys_user.Group,
			ParentID: this.props.sys_user.ParentGroup
		})
	}

	componentDidUpdate() {
		if (this.props.sheet.created) {
			this.hideModal('createSheetVisble')
			this.props.querySheets(this.request)
		} else if (this.props.sheet.updated) {
			this.hideModal('updateSheetVisble')
			this.props.querySheets(this.request)
		}
	}

	onTTableLoad(pageIndex) {
		this.request.pageIndex = pageIndex
		this.query()
	}

	query(request) {
		if (request) {
			this.request = Object.assign(this.request, request)
		}
		this.props.querySheets(this.request)
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

	doDeleteSheet(id) {
		const {
			deleteSheet,
			showGlobleMsg
		} = this.props
		let that = this
		confirm({
			title: '删除结算表',
			content: '确定要删除选中结算表？',
			onOk() {
				return deleteSheet(id).then(result => {
					showGlobleMsg('success', '删除成功！')
					that.query()
				}, error => {
					showGlobleMsg('error', result.Message)
				})
			},
		})
	}

	render() {
		let {
			updateSheetVisble,
			createSheetVisble
		} = this.state

		let {
			querying,
			sheets
		} = this.props.sheet


		let empty = {
			List: [],
			TotalCount: 0
		}
		sheets = sheets || empty

		const columns = genColumns((raw, action) => {
			if (action === 'update') {
				this.selectedSheet = raw
				this.showModal('updateSheetVisble')
			} else if (action === 'delete') {
				this.doDeleteSheet(raw.ID)
			}
		})

		let modal
		if (createSheetVisble) {
			modal = <CreateSheet onCancel={this.hideModal.bind(this,'createSheetVisble')} {...this.props}/>
		} else if (updateSheetVisble) {
			modal = <UpdateSheet id={this.selectedSheet.ID} onCancel={this.hideModal.bind(this,'updateSheetVisble')} {...this.props}/>
		}

		let role = this.props.sys_user.Role
		let title
		if (role !== 'Admin' && role !== 'Financial') {
			title = () => {
				return (
					<div style={{textAlign:'right'}}>
					<Button type='primary' icon='plus-circle-o' onClick={this.showModal.bind(this,'createSheetVisble')}>新增结算表</Button>
				</div>
				)
			}
		}

		return (
			<div>
				<Row>
					<TCol>
						<TCard>
							<SearchPanel onSearch={this.query} {...this.props}/>
						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol>
						<TTable title={title} key='sheets' bordered columns={columns} total={sheets.TotalCount} dataSource={sheets.List} loading={querying} onLoad={this.onTTableLoad}/>
					</TCol>
				</Row>
				{modal}
			</div>
		)
	}
}

export default TMainContainer()(connect(state => state, {
	getSheet,
	querySheets,
	createSheet,
	updateSheet,
	updateSheetAuditStatus,
	queryBases,
	querySources,
	queryCosts,
	queryGroups
})(TMsgContainer()(Sheet)))