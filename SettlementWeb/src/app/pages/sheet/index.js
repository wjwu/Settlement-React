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
} from '../../../actions/sheet'
import {
	queryBases,
	querySources,
	queryCosts,
} from '../../../actions/dictionary'
import {
	queryGroups
} from '../../../actions/group'

import genColumns from './columns'

const confirm = Modal.confirm
const updateSheet = 'updateSheet'

class Sheet extends Component {
	constructor(prop) {
		super(prop)
		this.query = this.query.bind(this)
		this.onTTableLoad = this.onTTableLoad.bind(this)
		this.request = {
			pageIndex: 1
		}
		this.state = {
			[updateSheet]: false,
			base: {
				data: []
			},
			sheet: {
				data: [],
				totalCount: 0
			}
		}
	}

	componentDidMount() {
		this.query()
	}

	componentDidUpdate() {
		if (this.props.sheet.created || this.props.sheet.updated) {
			this.props.querySheet(this.request)
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.dictionary.result) {
			if (this.state.base.version !== nextProps.dictionary.version) {
				this.setState({
					...this.state,
					base: {
						data: nextProps.dictionary.result.List,
						version: nextProps.dictionary.version
					}
				})
			}
		}
		if (nextProps.sheet.result) {
			if (this.state.sheet.version !== nextProps.sheet.version) {
				this.setState({
					...this.state,
					sheet: {
						data: nextProps.sheet.result.List,
						totalCount: nextProps.sheet.result.TotalCount,
						version: nextProps.sheet.version
					}
				})
			}
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
		this.props.querySheet(this.request)
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
			base,
			updateSheet: updateSheetVisble
		} = this.state

		let {
			queryingSheets,
			updateSheet
		} = this.props

		let empty = {
			List: [],
			TotalCount: 0
		}
		sheets = sheets || empty

		const columns = genColumns((raw, action) => {
			if (action === 'update') {
				this.selectedSheet = raw
				this.showModal(updateSheet)
			} else if (action === 'delete') {
				this.doDeleteSheet(raw.ID)
			}
		})

		let querying = this.props.sheet.querying

		let modal
		if (updateSheetVisble) {
			modal = <UpdateSheet id={this.selectedSheet.ID} onCancel={this.hideModal.bind(this,updateSheet)} bases={base.data}/>
		}

		return (
			<TMainContainer>
				<Row>
					<TCol>
						<TCard>
							<SearchPanel onSearch={this.query} bases={base.data}/>
							{modal}
						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol>
						<TTable key='sheets' bordered columns={columns} total={sheets.TotalCount} dataSource={sheets.List} loading={querying} onLoad={this.onTTableLoad}/>
					</TCol>
				</Row>
			</TMainContainer>
		)
	}
}

export default connect(state => state, {
	querySheet,
	createSheet,
	updateSheet,
	queryBases,
	querySources,
	queryCosts,
	queryGroups
})(TMsgContainer()(Sheet))