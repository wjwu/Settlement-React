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

import CreateSheet from './busComponents/CreateSheet'
import UpdateSheet from './busComponents/UpdateSheet'
import SearchPanel from './busComponents/SearchPanel'

import sheet from '../../actions/Sheet'

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

	componentDidUpdate() {
		if (this.props.sheet.created || this.props.sheet.updated) {
			this.props.querySheet(this.request)
		}
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

	render() {
		const {
			createSheet: createSheetVisble,
			updateSheet: updateSheetVisble
		} = this.state

		const columns = genColumns(raw => {
			this.selectedSheet = raw
			this.showModal(updateSheet)
		})

		let {
			querying,
			results
		} = this.props.sheet

		let modal
		if (createSheetVisble) {
			modal = <CreateSheet onCancel={this.hideModal.bind(this,createSheet)}/>
		} else if (updateSheetVisble) {
			modal = <UpdateSheet id={this.selectedSheet.ID} onCancel={this.hideModal.bind(this,updateSheet)}/>
		}

		let totalCount = 0
		if (results) {
			totalCount = results.TotalCount
		}
		let sheets = totalCount > 0 ? results.List : []

		return (
			<TMainContainer>
				<Row>
					<TCol>
						<TCard>
							<SearchPanel/>
							{modal}
						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol>
						<TTable key='sheets' bordered columns={columns} total={totalCount} dataSource={sheets} loading={querying} onLoad={this.onTTableLoad}/>
					</TCol>
				</Row>
			</TMainContainer>
		)
	}
}

export default connect(state => state, {
	'querySheet': sheet.query.bind(sheet)
})(TMsgContainer()(Sheet))