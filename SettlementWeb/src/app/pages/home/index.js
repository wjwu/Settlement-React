import React from 'react'
import {
	connect
} from 'react-redux'
import {
	Row,
	Tabs,
	Icon,
	Spin
} from 'antd'
import ReactEcharts from 'echarts-for-react'
import {
	TMainContainer
} from '../../containers'
import {
	TCol,
	TCard
} from '../../components'
import {
	queryUserStats
} from '../../actions/statistics'
import {
	option
} from './options'
import styles from './index.scss'

const TabPane = Tabs.TabPane

class Home extends React.Component {
	componentDidMount() {
		this.props.queryUserStats()
	}

	render() {
		const stats = this.props.stats.stats || {}
		let chart
		if (stats.Date) {
			chart = <ReactEcharts option={option(stats.Date,stats.ChartTotal)}  style={{height: '350px', width: '100%'}}  />
		} else {
			chart = <Spin tip='Loading...'/>
		}

		let totalPercent
		if (stats.TotalPercent === 0) {
			totalPercent = <span className={styles.compare}>{stats.TotalPercent}%</span>
		} else if (stats.TotalPercent > 0) {
			totalPercent = <span className={styles.compare_up}>{stats.TotalPercent}%<Icon type='arrow-up'/></span>
		} else {
			totalPercent = <span className={styles.compare_down}>{stats.TotalPercent}%<Icon type='arrow-down'/></span>
		}

		let commissionPercent
		if (stats.CommissionPercent === 0) {
			commissionPercent = <span className={styles.compare}>{stats.CommissionPercent}%</span>
		} else if (stats.CommissionPercent > 0) {
			commissionPercent = <span className={styles.compare_up}>{stats.CommissionPercent}%<Icon type='arrow-up'/></span>
		} else {
			commissionPercent = <span className={styles.compare_down}>{stats.CommissionPercent}%<Icon type='arrow-down'/></span>
		}
		let achievementPercent
		if (stats.AchievementPercent === 0) {
			achievementPercent = <span className={styles.compare}>{stats.AchievementPercent}%</span>
		} else if (stats.AchievementPercent > 0) {
			achievementPercent = <span className={styles.compare_up}>{stats.AchievementPercent}%<Icon type='arrow-up'/></span>
		} else {
			achievementPercent = <span className={styles.compare_down}>{stats.AchievementPercent}%<Icon type='arrow-down'/></span>
		}
		return (
			<div>
				<Row gutter={24}>
					<TCol xs={24} sm={24} md={8} lg={8}>
						<TCard title='成交额'>
							<dl className={styles.stats}>
								<dt>
									<h1>{stats.Total}</h1>
								</dt>
								<dd>
									<span>总成交额</span>
								</dd>
							</dl>
							<dl>
								<dt>
									<h2>{stats.MonthTotal}</h2>
								</dt>
								<dd >
									<span>本月</span>
									{totalPercent}
								</dd>
							</dl>
						</TCard>
					</TCol>
					<TCol xs={24} sm={24} md={8} lg={8}>
						<TCard title='提成'>
							<dl className={styles.stats}>
								<dt>
									<h1>{stats.Commission}</h1>
								</dt>
								<dd>
									<span>总提成</span>
								</dd>
							</dl>
							<dl>
								<dt>
									<h2>{stats.MonthCommission}</h2>
								</dt>
								<dd>
									<span>本月</span>
									{commissionPercent}
								</dd>
							</dl>
						</TCard>
					</TCol>
					<TCol xs={24} sm={24} md={8} lg={8}>
						<TCard title='业绩'>
							<dl className={styles.stats}>
								<dt>
									<h1>{stats.Achievement}</h1>
								</dt>
								<dd>
									<span>总业绩</span>
								</dd>
							</dl>
							<dl>
								<dt>
									<h2>{stats.MonthAchievement}</h2>
								</dt>
								<dd>
									<span>本月</span>
									{achievementPercent}
								</dd>
							</dl>
						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol>
						<TCard>
		                    {chart}
						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol xs={24} sm={24} md={8} lg={8}>
						<TCard title='排行榜'>
							<Tabs tabPosition='left'>
								 <TabPane tab='成交额' key='total'>
								 {
								 	!stats.RankTotal?[]:stats.RankTotal.map(item=>{
								 		return (
										 	<dl className={styles.rank} key={`${item.Name}${item.Total}`}>
										 		<dt className={styles.rank_title}>
										 			{item.Name}
										 		</dt>
										 		<dd className={styles.rank_cnt}>
										 			<b>{item.Total}</b>
										 		</dd>
										 	</dl>
								 		)
								 	})
								 }
								 </TabPane>
								 <TabPane tab='签单量' key='amount'>
								 {
								 	!stats.RankAmount?[]:stats.RankAmount.map(item=>{
								 		return (
										 	<dl className={styles.rank} key={`${item.Name}${item.Amount}`}>
										 		<dt className={styles.rank_title}>
										 			{item.Name}
										 		</dt>
										 		<dd className={styles.rank_cnt}>
										 			<b>{item.Amount}</b>
										 		</dd>
										 	</dl>
								 		)
								 	})
								 }
								 </TabPane>
							</Tabs>
						</TCard>
					</TCol>
				</Row>
			</div>
		)
	}
}

export default connect(state => state, {
	queryUserStats
})(TMainContainer()(Home))