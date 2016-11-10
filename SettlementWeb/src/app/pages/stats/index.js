import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import {
	Row,
	Button,
	Tabs
} from 'antd'
import {
	TMainContainer,
	TMsgContainer,
	TCol,
	TCard,
	TTable
} from '../../../components'
import SearchPanel from './components/SearchPanel'
import {
	querySheets
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

const TabPane = Tabs.TabPane

class Stats extends Component {
	constructor(prop) {
		super(prop)
		this.query = this.query.bind(this)
		this.onTTableLoad = this.onTTableLoad.bind(this)
		this.request = {
			pageIndex: 1
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

	render() {
		let {
			queryingSheets,
			sheets
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

		return (
			<div>
				<Row>
					<TCol>
						<TCard>
							<SearchPanel onSearch={this.query} groups={groups.List} bases={bases.List} sources={sources.List}/>
						</TCard>
					</TCol>
				</Row>
				<Row gutter={24}>
					<TCol xs={24} sm={24} md={6} lg={6}>
						<TCard title='总成交'>

						</TCard>
					</TCol>
					<TCol xs={24} sm={24} md={6} lg={6}>
						<TCard title='总成本'>

						</TCard>
					</TCol>
					<TCol xs={24} sm={24} md={6} lg={6}>
						<TCard title='合计提成'>

						</TCard>
					</TCol>
					<TCol xs={24} sm={24} md={6} lg={6}>
						<TCard title='提成后业绩'>

						</TCard>
					</TCol>
				</Row>
				<Row gutter={24}>
					<TCol xs={24} sm={24} md={12} lg={12}>
						<TCard title='来源统计'>

						</TCard>
					</TCol>
					<TCol xs={24} sm={24} md={12} lg={12}>
						<TCard title='部门占比'>

						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol>
						<Tabs>
							<TabPane tab='签单统计' key='amount'>
								<TTable key='tamount' bordered columns={columns} total={sheets.TotalCount} dataSource={sheets.List} loading={queryingSheets} onLoad={this.onTTableLoad}/>
							</TabPane>
							<TabPane tab='个人提成/业绩' key='self'>
								<TTable key='tself' bordered columns={columns} total={sheets.TotalCount} dataSource={sheets.List} loading={queryingSheets} onLoad={this.onTTableLoad}/>
							</TabPane>
							<TabPane tab='部门提成/业绩' key='dept'>
								<TTable key='tdept' bordered columns={columns} total={sheets.TotalCount} dataSource={sheets.List} loading={queryingSheets} onLoad={this.onTTableLoad}/>
							</TabPane>
						</Tabs>
					</TCol>
				</Row>
			</div>
		)
	}
}

export default TMainContainer()(connect(state => state, {
	querySheets,
	queryBases,
	querySources,
	queryCosts,
	queryGroups
})(TMsgContainer()(Stats)))