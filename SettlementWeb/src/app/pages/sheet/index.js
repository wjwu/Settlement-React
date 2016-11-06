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
import UpdateSheet from './bus-components/UpdateSheet'
import SearchPanel from './bus-components/SearchPanel'
import {
	dictionary,
	sheet
} from '../../actions'
import genColumns from './columns'
import {
	getResult
} from '../../common'

const confirm = Modal.confirm
const updateSheet = 'updateSheet'
const querySheet = 'querySheet'
const deleteSheet = 'deleteSheet'
const queryBase = 'queryBase'

class Sheet extends Component {
	constructor(prop) {
		super(prop)
		this.query = this.query.bind(this)
		this.onTTableLoad = this.onTTableLoad.bind(this)
		this.request = {
			pageIndex: 1
		}
		this.state = {
			[updateSheet]: false
		}
	}

	componentDidMount() {
		this[queryBase] = this.props.queryBase({
			type: 'base',
			enabled: true,
			pageIndex: 1,
			pageSize: 999
		})
		this.query()
	}

	componentDidUpdate() {
		if (this.props.sheet.created || this.props.sheet.updated) {
			this.props.querySheet(this.request)
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
		const randomStr = this.props.querySheet(this.request)
		this[querySheet] = randomStr
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

		console.log(id)
	}

	render() {
		const {
			updateSheet: updateSheetVisble
		} = this.state

		const columns = genColumns((raw, action) => {
			if (action === 'update') {
				this.selectedSheet = raw
				this.showModal(updateSheet)
			} else if (action === 'delete') {
				this.doDeleteSheet(raw.ID)
			}
		})

		let querying = this.props.sheet.querying
		let bases = getResult(this[queryBase], this.props.dictionary.results)
		let sheets = getResult(this[querySheet], this.props.sheet.results)

		let modal
		if (updateSheetVisble) {
			modal = <UpdateSheet id={this.selectedSheet.ID} onCancel={this.hideModal.bind(this,updateSheet)} bases={bases.data}/>
		}

		return (
			<TMainContainer>
				<Row>
					<TCol>
						<TCard>
							<SearchPanel onSearch={this.query} bases={bases.data}/>
							{modal}
						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol>
						<TTable key='sheets' bordered columns={columns} total={sheets.totalCount} dataSource={sheets.data} loading={querying} onLoad={this.onTTableLoad}/>
					</TCol>
				</Row>
			</TMainContainer>
		)
	}
}

export default connect(state => state, {
	[querySheet]: sheet.query.bind(sheet),
	[queryBase]: dictionary.query.bind(dictionary),
	[deleteSheet]: sheet.del.bind(sheet)
})(TMsgContainer()(Sheet))