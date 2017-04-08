import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Row, Button, Tabs } from 'antd'
import { TMainContainer } from '../../containers'
import { TCol, TCard, TTable } from '../../components'
import ReactEcharts from 'echarts-for-react'
import SearchPanel from './components/SearchPanel'
import { querySheets } from '../../actions/sheet'
import { queryBases, querySources, queryCosts, } from '../../actions/dictionary'
import { queryGroups } from '../../actions/group'
import { queryStats } from '../../actions/statistics'
import styles from './index.scss'
import { sheetColumns, selfColumns, deptColumns } from './columns'
import { sourceOption, deptOption } from './options'


const TabPane = Tabs.TabPane

class Stats extends Component {
	constructor(prop) {
		super(prop)
		this.query = this.query.bind(this)
		this.onTTableLoad = this.onTTableLoad.bind(this)
		this.request = {
			pageIndex: 1,
			groups: this.props.sys_user.Path,
			auditStatus: 'pass',
			timeFrom: moment().set('date', 1).format('YYYY-MM-DD')
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
		let userProfit = stats.UserProfit || []
		let deptProfit = stats.DepartmentProfit || []
		let empty = {
			List: [],
			TotalCount: 0
		}
		sheets = sheets || empty

		let expandedRowRender = record => {
			return (
				<p>
					<span style={{marginRight:20}}>{`所在部门：${record.Department}`}</span>
					<span style={{marginRight:20}}>{`客户来源：${record.Source}`}</span>
					<span>{`培训地点：${record.Base}`}</span>
				</p>
			)
		}

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
					<TCol xs={24} sm={24} md={24} lg={8}>
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
					<TCol xs={24} sm={24} md={24} lg={8}>
						<TCard title='提成信息'>
							<dl className={styles.stats}>
								<dt><h1>{stats.Profit}</h1></dt>
								<dd>总利润</dd>
							</dl>
							<dl className={styles.stats}>
								<dt><h1>{stats.Commission}</h1></dt>
								<dd>总提成</dd>
							</dl>
							<dl className={styles.stats}>
								<dt><h1>{stats.AfterProfit}</h1></dt>
								<dd>提成后利润</dd>
							</dl>
						</TCard>
					</TCol>
					<TCol xs={24} sm={24} md={24} lg={8}>
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
							<ReactEcharts option={sourceOption(stats.Source)} style={{height: 300}}/>
						</TCard>
					</TCol>
					<TCol xs={24} sm={24} md={12} lg={12}>
						<TCard>
							<ReactEcharts option={deptOption(stats.Department)} style={{height: 300}}/>
						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol>
						<Tabs>
							<TabPane tab='签单统计' key='amount'>
								<TTable key='tamount' rowKey={record => record.ID} expandedRowRender={expandedRowRender} bordered columns={sheetColumns()} total={sheets.TotalCount} dataSource={sheets.List} loading={querying} onLoad={this.onTTableLoad}/>
							</TabPane>
							<TabPane tab='个人提成/业绩' key='self'>
								<TTable key='tself' bordered pagination={false} columns={selfColumns()} dataSource={userProfit}/>
							</TabPane>
							<TabPane tab='部门提成/业绩' key='dept'>
								<TTable key='tdept' bordered pagination={false} columns={deptColumns()} dataSource={deptProfit}/>
							</TabPane>
						</Tabs>
					</TCol>
				</Row>
			</div>
		)
	}
}

module.exports = connect(state => state, {
	querySheets,
	queryBases,
	querySources,
	queryCosts,
	queryGroups,
	queryStats
})(TMainContainer()(Stats))