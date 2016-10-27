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

import genColumns from './columns'

const createSheet = 'createSheet'
const updateSheet = 'updateSheet'

class Sheet extends Component {
	constructor(prop) {
		super(prop)
		this.state = {
			[createSheet]: false,
			[updateSheet]: false
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
		const data = []
		let modal
		if (createSheetVisble) {
			modal = <CreateSheet loading={false} onSubmit={this.submit.bind(this,createSheet)} onCancel={this.hideModal.bind(this,createSheet)}/>
		} else if (updateSheetVisble) {

		}
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
							
						</TCard>
					</TCol>
				</Row>
			</TMainContainer>
		)
	}
}

export default connect(state => state, {})(TMsgContainer()(Sheet))