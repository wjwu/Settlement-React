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

import DictionaryAction from '../../actions/Dictionary'
const dictionary = new DictionaryAction()

import genColumns from './columns'

const TabPane = Tabs.TabPane

const createDictionary = 'createDictionary'

class Dictionary extends Component {
	constructor(props) {
		super(props)
		this.selectedTab = 'base'
		this.loadedSource = false
		this.base = {
			getting: false,
			totalCount: 0,
			data: []
		}
		this.source = {
			getting: false,
			totalCount: 0,
			data: []
		}
		this.state = {
			[createDictionary]: false
		}
	}

	componentDidMount() {
		this.props.queryDictionary(this.selectedTab)
	}

	componentDidUpdate() {
		if (this.props.dictionary.created || this.props.dictionary.updated) {
			// this.selectedTab = this.props.dictionary.dicType
			// this.props.queryDictionary(this.props.dictionary.dicType)
		}
	}

	onTTableLoad(pageIndex) {
		this.props.queryDictionary(this.selectedTab, pageIndex)
	}

	onTabChange(activeKey) {
		this.selectedTab = activeKey.substr(2)
		if (this.selectedTab === 'source' && !this.loadedSource) {
			this.loadedSource = true
			this.props.queryDictionary(this.selectedTab)
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
			result
		} = this.props.dictionary
		const {
			createDictionary: createDicVisible
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
		return (
			<TMainContainer>
				<Row>
					<TCol>
						<TCard>
							<Button type='primary' className='button' onClick={this.showModal.bind(this,createDictionary)}>新增字典</Button>
							<CreateDictionary visible={createDicVisible} submitting={creating} onSubmit={this.submit.bind(this,createDictionary)} onCancel={this.hideModal.bind(this,createDictionary)}/>
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