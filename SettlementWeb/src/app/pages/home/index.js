import React from 'react'
import {
	Row,
	Tabs,
	Icon
} from 'antd'
import ReactEcharts from 'echarts-for-react'
import {
	TMainContainer,
	TCol,
	TCard
} from '../../../components'
import styles from './index.scss'

const TabPane = Tabs.TabPane

const getOtion = () => {
	const option = {
		title: {
			text: '成交额统计'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['邮件营销', '联盟广告', '视频广告']
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: '邮件营销',
			type: 'line',
			stack: '总量',
			areaStyle: {
				normal: {}
			},
			data: [120, 132, 101, 134, 90, 230, 210]
		}, {
			name: '联盟广告',
			type: 'line',
			stack: '总量',
			areaStyle: {
				normal: {}
			},
			data: [220, 182, 191, 234, 290, 330, 310]
		}, {
			name: '视频广告',
			type: 'line',
			stack: '总量',
			areaStyle: {
				normal: {}
			},
			data: [150, 232, 201, 154, 190, 330, 410]
		}]
	};
	return option
}
class Home extends React.Component {
	render() {
		return (
			<div>
				<Row gutter={24}>
					<TCol xs={24} sm={24} md={8} lg={8}>
						<TCard title='成交额'>
							<dl className={styles.stats}>
								<dt>
									<h1>151,515.00</h1>
								</dt>
								<dd>
									<span>总成交额</span>
								</dd>
							</dl>
							<dl>
								<dt>
									<h2>51,515.00</h2>
								</dt>
								<dd >
									<span>本月</span>
									<span className={styles.compare}>5%<Icon type='arrow-up'/></span>
								</dd>
							</dl>
						</TCard>
					</TCol>
					<TCol xs={24} sm={24} md={8} lg={8}>
						<TCard title='提成'>
							<dl className={styles.stats}>
								<dt>
									<h1>151,515.00</h1>
								</dt>
								<dd>
									<span>总提成</span>
								</dd>
							</dl>
							<dl>
								<dt>
									<h2>51,515.00</h2>
								</dt>
								<dd>
									<span>本月</span>
									<span className={styles.compare}>5%<Icon type='arrow-up'/></span>
								</dd>
							</dl>
						</TCard>
					</TCol>
					<TCol xs={24} sm={24} md={8} lg={8}>
						<TCard title='业绩'>
							<dl className={styles.stats}>
								<dt>
									<h1>151,515.00</h1>
								</dt>
								<dd>
									<span>总业绩</span>
								</dd>
							</dl>
							<dl>
								<dt>
									<h2>51,515.00</h2>
								</dt>
								<dd>
									<span>本月</span>
									<span className={styles.compare}>5%<Icon type='arrow-up'/></span>
								</dd>
							</dl>
						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol>
						<TCard>
		                    <ReactEcharts option={getOtion()}  style={{height: '350px', width: '100%'}}  />
						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol>
						<TCard>
							<ReactEcharts option={getOtion()}  style={{height: '350px', width: '100%'}}  />
						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol xs={24} sm={24} md={8} lg={8}>
						<TCard title='排行榜'>
							<Tabs tabPosition='left'>
								 <TabPane tab='成交额' key='total'>
								 	<dl className={styles.rank}>
								 		<dt className={styles.rank_title}>
								 			任翼
								 		</dt>
								 		<dd className={styles.rank_cnt}>
								 			36,891.00
								 		</dd>
								 	</dl>
								 	<dl className={styles.rank}>
								 		<dt className={styles.rank_title}>
								 			任翼
								 		</dt>
								 		<dd className={styles.rank_cnt}>
								 			36,891.00
								 		</dd>
								 	</dl>
								 	<dl className={styles.rank}>
								 		<dt className={styles.rank_title}>
								 			任翼
								 		</dt>
								 		<dd className={styles.rank_cnt}>
								 			36,891.00
								 		</dd>
								 	</dl>
								 	<dl className={styles.rank}>
								 		<dt className={styles.rank_title}>
								 			任翼
								 		</dt>
								 		<dd className={styles.rank_cnt}>
								 			36,891.00
								 		</dd>
								 	</dl>
								 </TabPane>
								 <TabPane tab='签单量' key='amount'>Content of Tab 1</TabPane>
							</Tabs>
						</TCard>
					</TCol>
				</Row>
			</div>
		)
	}
}

export default TMainContainer()(Home)