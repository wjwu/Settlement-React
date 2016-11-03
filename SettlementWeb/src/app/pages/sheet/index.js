import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import {
	Row,
	Button
} from 'antd'

import TMainContainer from '../../../components/TMainContainer'
import TMsgContainer from '../../../components/TMsgContainer'
import TCol from '../../../components/TCol'
import TCard from '../../../components/TCard'
import TTable from '../../../components/TTable'

import UpdateSheet from './busComponents/UpdateSheet'
import SearchPanel from './busComponents/SearchPanel'

import sheet from '../../actions/Sheet'
import dictionary from '../../actions/Dictionary'

import genColumns from './columns'
import {
	getResult
} from '../../common'

const updateSheet = 'updateSheet'
const querySheet = 'querySheet'
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

	render() {
		const {
			updateSheet: updateSheetVisble
		} = this.state

		const columns = genColumns(raw => {
			this.selectedSheet = raw
			this.showModal(updateSheet)
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
	[queryBase]: dictionary.query.bind(dictionary)
})(TMsgContainer()(Sheet))