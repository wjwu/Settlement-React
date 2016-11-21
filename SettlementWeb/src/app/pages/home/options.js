export const option = () => {
	return {
		title: {
			text: '成交额统计'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['成交额', '签单量']
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
			name: '成交额',
			type: 'line',
			stack: '总量',
			areaStyle: {
				normal: {}
			},
			data: [120, 132, 101, 134, 90, 230, 210]
		}, {
			name: '签单量',
			type: 'line',
			stack: '总量',
			areaStyle: {
				normal: {}
			},
			data: [220, 182, 191, 234, 290, 330, 310]
		}]
	};
}