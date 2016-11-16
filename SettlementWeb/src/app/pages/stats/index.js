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
	TMainContainer
} from '../../containers'
import {
	TCol,
	TCard,
	TTable
} from '../../components'
import ReactEcharts from 'echarts-for-react'
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
import {
	queryStats
} from '../../actions/statistics'

import styles from './index.scss'

import {
	sheetColumns,
	selfColumns,
	deptColumns
} from './columns'
import {
	sourceOption,
	deptOption
} from './options'

const TabPane = Tabs.TabPane

class Stats extends Component {
	constructor(prop) {
		super(prop)
		this.query = this.query.bind(this)
		this.onTTableLoad = this.onTTableLoad.bind(this)
		this.request = {
			pageIndex: 1,
			groups: this.props.sys_user.Path,
			auditStatus: 'pass'
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
		this.props.queryGroups({
			ID: this.props.sys_user.Group,
			ParentID: this.props.sys_user.ParentGroup
		})
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
		this.props.queryStats(this.request)
	}

	render() {
		let {
			querying,
			sheets
		} = this.props.sheet
		let stats = this.props.stats.stats || {}
		let userProfits = stats.UserProfits || []
		let deptProfits = stats.DepartmentProfits || []
		let empty = {
			List: [],
			TotalCount: 0
		}
		sheets = sheets || empty

		return (
			<div>
				<Row>
					<TCol>
						<TCard>
							<SearchPanel onSearch={this.query} {...this.props}/>
						</TCard>
					</TCol>
				</Row>
				<Row gutter={24}>
					<TCol xs={24} sm={24} md={8} lg={8}>
						<TCard title='成交信息'>
							<dl className={styles.stats}>
								<dt><h1>{stats.Amount}</h1></dt>
								<dd>总单数</dd>
							</dl>
							<dl className={styles.stats}>
								<dt><h1>{stats.Total}</h1></dt>
								<dd>总成交额</dd>
							</dl>
							<dl className={styles.stats}>
								<dt><h1>{stats.Cost}</h1></dt>
								<dd>总成本</dd>
							</dl>
						</TCard>
					</TCol>
					<TCol xs={24} sm={24} md={8} lg={8}>
						<TCard title='提成信息'>
							<dl className={styles.stats}>
								<dt><h1>{stats.Profits}</h1></dt>
								<dd>总利润</dd>
							</dl>
							<dl className={styles.stats}>
								<dt><h1>{stats.Commission}</h1></dt>
								<dd>总提成</dd>
							</dl>
							<dl className={styles.stats}>
								<dt><h1>{stats.AfterProfits}</h1></dt>
								<dd>提成后利润</dd>
							</dl>
						</TCard>
					</TCol>
					<TCol xs={24} sm={24} md={8} lg={8}>
						<TCard title='收款信息'>
							<dl className={styles.stats}>
								<dt><h1>{stats.Received}</h1></dt>
								<dd>已收</dd>
							</dl>
							<dl className={styles.stats}>
								<dt><h1>{stats.Remaining}</h1></dt>
								<dd>待收</dd>
							</dl>
						</TCard>
					</TCol>
				</Row>
				<Row gutter={24}>
					<TCol xs={24} sm={24} md={12} lg={12}>
						<TCard>
		                    <ReactEcharts option={sourceOption(stats.Sources)} style={{height: 300}}/>
						</TCard>
					</TCol>
					<TCol xs={24} sm={24} md={12} lg={12}>
						<TCard>
							<ReactEcharts option={deptOption(stats.Departments)} style={{height: 300}}/>
						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol>
						<Tabs>
							<TabPane tab='签单统计' key='amount'>
								<TTable key='tamount' bordered columns={sheetColumns()} total={sheets.TotalCount} dataSource={sheets.List} loading={querying} onLoad={this.onTTableLoad}/>
							</TabPane>
							<TabPane tab='个人提成/业绩' key='self'>
								<TTable key='tself' bordered pagination={false} columns={selfColumns()} total={userProfits.length} dataSource={userProfits} onLoad={()=>{}}/>
							</TabPane>
							<TabPane tab='部门提成/业绩' key='dept'>
								<TTable key='tdept' bordered pagination={false} columns={deptColumns()} total={deptProfits.length} dataSource={deptProfits} onLoad={()=>{}}/>
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
	queryGroups,
	queryStats
})(Stats))