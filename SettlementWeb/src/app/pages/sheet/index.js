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

import TMainContainer from '../../../components/TMainContainer'
import TMsgContainer from '../../../components/TMsgContainer'
import TCol from '../../../components/TCol'
import TCard from '../../../components/TCard'
import TTable from '../../../components/TTable'

import CreateSheet from './busComponents/CreateSheet'

import SheetAction from '../../actions/Sheet'
const sheet = new SheetAction()

import genColumns from './columns'

const createSheet = 'createSheet'
const updateSheet = 'updateSheet'

class Sheet extends Component {
	constructor(prop) {
		super(prop)
		this.request = {
			pageIndex: 1
		}
		this.state = {
			[createSheet]: false,
			[updateSheet]: false
		}
	}

	componentDidMount() {
		this.props.querySheet(this.request)
	}

	onTTableLoad() {

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

	submit(type, data) {
		this.props[type](data)
	}

	render() {
		const {
			createSheet: createSheetVisble,
			updateSheet: updateSheetVisble
		} = this.state

		const columns = genColumns(raw => {
			this.selectedDic = raw
			this.showModal(updateDictionary)
		})

		let {
			creating,
			getting,
			result
		} = this.props.sheet

		let modal
		if (createSheetVisble) {
			modal = <CreateSheet loading={creating} onSubmit={this.submit.bind(this,createSheet)} onCancel={this.hideModal.bind(this,createSheet)}/>
		} else if (updateSheetVisble) {

		}

		let totalCount = 0
		if (result) {
			totalCount = result.TotalCount
		}
		let sheets = totalCount > 0 ? result.List : []

		return (
			<TMainContainer>
				<Row>
					<TCol>
						<TCard>
							<Button type='primary' icon='plus-circle-o' onClick={this.showModal.bind(this,createSheet)}>新增结算表</Button>
							{modal}
						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol>
						<TCard>
							<Button type='primary' icon='search'>查询</Button>
						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol>
						<TCard>
							<TTable key='sheets' title='我的结算表' columns={columns} total={totalCount} data={sheets} loading={getting} onLoad={this.onTTableLoad}/>
						</TCard>
					</TCol>
				</Row>
			</TMainContainer>
		)
	}
}

export default connect(state => state, {
	'querySheet': sheet.query.bind(sheet),
	[createSheet]: sheet.create.bind(sheet)
})(TMsgContainer()(Sheet))