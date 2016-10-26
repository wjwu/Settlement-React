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
const updateDictionary = 'Dictionary'

class Dictionary extends Component {
	constructor(props) {
		super(props)
		this.selectedTab = 'base'
		this.loadedSource = false
		this.base = {
			request: {
				type: 'base',
				pageIndex: 1
			},
			getting: false,
			totalCount: 0,
			data: []
		}
		this.source = {
			request: {
				type: 'base',
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
		if (this.props.dictionary.created || this.props.dictionary.updated) {
			// this.selectedTab = this.props.dictionary.dicType
			// this.props.queryDictionary(this.props.dictionary.dicType)
		}
	}

	onTTableLoad(pageIndex) {
		this.queryDicRequest.pageIndex = pageIndex
		this.props.queryDictionary(this.queryDicRequest)
	}

	onTabChange(activeKey) {
		this.selectedTab = activeKey.substr(2)
		if (this.selectedTab === 'source' && !this.loadedSource) {
			this.loadedSource = true
			this.queryDicRequest.pageIndex = 1
			this.queryDicRequest.type = this.selectedTab
			this.props.queryDictionary(this.queryDicRequest)
		}
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

		const columns = genColumns(() => {})

		let data = []
		let totalCount = 0
		if (result && result.TotalCount > 0) {
			totalCount = result.TotalCount
			data = result.List
		}

		if (this.selectedTab === 'base') {
			this.base.data = data
			this.base.totalCount = totalCount
			this.base.getting = getting
		} else if (this.selectedTab === 'source') {
			this.source.data = data
			this.source.totalCount = totalCount
			this.source.getting = getting
		}

		let modal
		if (createDicVisible) {
			modal = <CreateDictionary loading={creating} onSubmit={this.submit.bind(this,createDictionary)} onCancel={this.hideModal.bind(this,createDictionary)}/>
		} else if (updateDicVisible) {
			modal = <UpdateDictionary loading={updating} onSubmit={this.submit.bind(this,updateDictionary)} onCancel={this.hideModal.bind(this,updateDictionary)}/>
		}
		return (
			<TMainContainer>
				<Row>
					<TCol>
						<TCard>
							<Button type='primary' className='button' onClick={this.showModal.bind(this,createDictionary)}>新增字典</Button>
							{modal}
						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol>
						<TCard>
					        <Tabs tabPosition='left' onChange={this.onTabChange.bind(this)}>
					          <TabPane tab='培训基地' key='base'>
					          	<TTable title='培训基地' columns={columns} loading={this.base.getting} total={this.base.totalCount} data={this.base.data} onLoad={this.onTTableLoad.bind(this)}/>
					          </TabPane>
					          <TabPane tab='客户来源' key='source'>
					          	<TTable title='客户来源' columns={columns} loading={this.source.getting} total={this.source.totalCount} data={this.source.data} onLoad={this.onTTableLoad.bind(this)}/>
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
	[createDictionary]: dictionary.create.bind(dictionary),
	'queryDictionary': dictionary.query.bind(dictionary)
})(TMsgContainer()(Dictionary))