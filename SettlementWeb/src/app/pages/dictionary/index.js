import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import {
	Row,
	Tabs,
	Button,
	Modal
} from 'antd'

import TMainContainer from '../../../components/TMainContainer'
import TMsgContainer from '../../../components/TMsgContainer'
import TCol from '../../../components/TCol'
import TCard from '../../../components/TCard'
import TTable from '../../../components/TTable'

import CreateDictionary from './busComponents/CreateDictionary'
import UpdateDictionary from './busComponents/UpdateDictionary'

import DictionaryAction from '../../actions/Dictionary'
const dictionary = new DictionaryAction()

import genColumns from './columns'

const TabPane = Tabs.TabPane

const createDictionary = 'createDictionary'
const updateDictionary = 'updateDictionary'

const DICTIONARY_BASE = 'base'
const DICTIONARY_SOURCE = 'source'
const DICTIONARY_COST = 'cost'

class Dictionary extends Component {
	constructor(props) {
		super(props)
		this.selectedTab = DICTIONARY_BASE
		this.loadedSource = false
		this[DICTIONARY_BASE] = {
			request: {
				type: DICTIONARY_BASE,
				pageIndex: 1
			},
			getting: false,
			totalCount: 0,
			data: []
		}
		this[DICTIONARY_SOURCE] = {
			request: {
				type: DICTIONARY_SOURCE,
				pageIndex: 1
			},
			getting: false,
			totalCount: 0,
			data: []
		}
		this[DICTIONARY_COST] = {
			request: {
				type: DICTIONARY_COST,
				pageIndex: 1
			},
			getting: false,
			totalCount: 0,
			data: []
		}
		this.state = {
			[createDictionary]: false
		}
	}

	componentDidMount() {
		this.props.queryDictionary(this.base.request)
	}

	componentDidUpdate() {
		if (this.props.dictionary.updated) {
			this.props.queryDictionary(this[this.selectedTab].request)
		}
	}

	onTTableLoad(pageIndex) {
		this[this.selectedTab].request.pageIndex = pageIndex
		this.props.queryDictionary(this[this.selectedTab].request)
	}

	onTabChange(activeKey) {
		this.selectedTab = activeKey.substr(2)
		this.props.queryDictionary(this[this.selectedTab].request)
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
			getting,
			creating,
			updating,
			result
		} = this.props.dictionary
		const {
			createDictionary: createDicVisible,
			updateDictionary: updateDicVisible
		} = this.state

		const columns = genColumns(raw => {
			this.selectedDic = raw
			this.showModal(updateDictionary)
		})
		const selectedDic = this.selectedDic || {}

		let data = []
		let totalCount = 0
		if (result && result.TotalCount > 0) {
			totalCount = result.TotalCount
			data = result.List
		}

		this[this.selectedTab].data = data
		this[this.selectedTab].totalCount = totalCount
		this[this.selectedTab].getting = getting

		let modal
		if (createDicVisible) {
			modal = <CreateDictionary loading={creating} onSubmit={this.submit.bind(this,createDictionary)} onCancel={this.hideModal.bind(this,createDictionary)}/>
		} else if (updateDicVisible) {
			modal = <UpdateDictionary loading={updating} onSubmit={this.submit.bind(this,updateDictionary)} onCancel={this.hideModal.bind(this,updateDictionary)} dictionary={this.selectedDic}/>
		}
		return (
			<TMainContainer>
				<Row>
					<TCol>
						<TCard>
							<Button type='primary' onClick={this.showModal.bind(this,createDictionary)}>新增字典</Button>
							{modal}
						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol>
						<TCard>
					        <Tabs tabPosition='left' onChange={this.onTabChange.bind(this)}>
					          <TabPane tab='培训基地' key={DICTIONARY_BASE}>
					          	<TTable title='培训基地' columns={columns} loading={this[DICTIONARY_BASE].getting} total={this[DICTIONARY_BASE].totalCount} data={this[DICTIONARY_BASE].data} onLoad={this.onTTableLoad.bind(this)}/>
					          </TabPane>
					          <TabPane tab='客户来源' key={DICTIONARY_SOURCE}>
					          	<TTable title='客户来源' columns={columns} loading={this[DICTIONARY_SOURCE].getting} total={this[DICTIONARY_SOURCE].totalCount} data={this[DICTIONARY_SOURCE].data} onLoad={this.onTTableLoad.bind(this)}/>
					          </TabPane>
					          <TabPane tab='结算类型' key={DICTIONARY_COST}>
					          	<TTable title='结算类型' columns={columns} loading={this[DICTIONARY_COST].getting} total={this[DICTIONARY_COST].totalCount} data={this[DICTIONARY_COST].data} onLoad={this.onTTableLoad.bind(this)}/>
					          </TabPane>
					        </Tabs>
						</TCard>
					</TCol>
				</Row>
			</TMainContainer>
		)
	}
}

export default connect(state => state, {
	'queryDictionary': dictionary.query.bind(dictionary),
	[createDictionary]: dictionary.create.bind(dictionary),
	[updateDictionary]: dictionary.update.bind(dictionary)
})(TMsgContainer()(Dictionary))