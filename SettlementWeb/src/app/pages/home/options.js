export default (days = [], amount = []) => {
	return {
		title: {
			text: '成交额统计'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['成交额']
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
			data: days
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
			data: amount
		}]
	};
};