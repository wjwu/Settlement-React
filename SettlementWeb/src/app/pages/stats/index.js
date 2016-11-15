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

import genColumns from './columns'

const TabPane = Tabs.TabPane

const getOtion = () => {
	const option = {
		title: {
			text: '客户来源统计',
			x: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b} : {c} ({d}%)'
		},
		legend: {
			orient: 'vertical',
			left: 'left',
			data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
		},
		series: [{
			name: '客户来源',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: [{
				value: 335,
				name: '直接访问'
			}, {
				value: 310,
				name: '邮件营销'
			}, {
				value: 234,
				name: '联盟广告'
			}, {
				value: 135,
				name: '视频广告'
			}, {
				value: 1548,
				name: '搜索引擎'
			}],
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	};
	return option
}

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

		let empty = {
			List: [],
			TotalCount: 0
		}
		sheets = sheets || empty

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
		                    <ReactEcharts option={getOtion()} style={{height: 300}}/>
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
								<TTable key='tamount' bordered columns={columns} total={sheets.TotalCount} dataSource={sheets.List} loading={querying} onLoad={this.onTTableLoad}/>
							</TabPane>
							<TabPane tab='个人提成/业绩' key='self'>
								<TTable key='tself' bordered columns={columns} total={sheets.TotalCount} dataSource={sheets.List} loading={querying} onLoad={this.onTTableLoad}/>
							</TabPane>
							<TabPane tab='部门提成/业绩' key='dept'>
								<TTable key='tdept' bordered columns={columns} total={sheets.TotalCount} dataSource={sheets.List} loading={querying} onLoad={this.onTTableLoad}/>
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
})(TMsgContainer()(Stats)))