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
	TCard,
	TTable
} from '../../../components'
import UpdateSheet from './components/UpdateSheet'
import SearchPanel from './components/SearchPanel'
import {
	querySheets,
	createSheet,
	updateSheet
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
			pageIndex: 1
		}
		this.state = {
			updateSheetVisble: false
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
		this.props.queryGroups(request)
	}

	componentDidUpdate() {
		if (this.props.sheet.created || this.props.sheet.updated) {
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

	showModal() {
		this.setState({
			updateSheetVisble: true
		})
	}

	hideModal(type) {
		this.setState({
			updateSheetVisble: false
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
			updateSheetVisble
		} = this.state

		let {
			queryingSheets,
			sheets,
			creating,
			updating
		} = this.props.sheet

		let {
			bases,
			sources,
			costs
		} = this.props.dictionary

		let groups = this.props.group.groups

		let empty = {
			List: [],
			TotalCount: 0
		}
		sheets = sheets || empty
		bases = bases || empty
		sources = sources || empty
		costs = costs || empty
		groups = groups || empty

		const columns = genColumns((raw, action) => {
			if (action === 'update') {
				this.selectedSheet = raw
				this.showModal()
			} else if (action === 'delete') {
				this.doDeleteSheet(raw.ID)
			}
		})

		let modal
		if (updateSheetVisble) {
			modal = <UpdateSheet id={this.selectedSheet.ID} onCancel={this.hideModal.bind(this)} groups={groups.List} bases={bases.List} sources={sources.List} costs={costs.List} updating={updating} onSubmit={this.props.updateSheet}/>
		}

		return (
			<TMainContainer>
				<Row>
					<TCol>
						<TCard>
							<SearchPanel onSearch={this.query} groups={groups.List} bases={bases.List} sources={sources.List} costs={costs.List} creating={creating} onSubmit={this.props.createSheet}/>
							{modal}
						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol>
						<TTable key='sheets' bordered columns={columns} total={sheets.TotalCount} dataSource={sheets.List} loading={queryingSheets} onLoad={this.onTTableLoad}/>
					</TCol>
				</Row>
			</TMainContainer>
		)
	}
}

export default connect(state => state, {
	querySheets,
	createSheet,
	updateSheet,
	queryBases,
	querySources,
	queryCosts,
	queryGroups
})(TMsgContainer()(Sheet))