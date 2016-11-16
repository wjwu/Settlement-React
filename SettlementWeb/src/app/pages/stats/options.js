export const sourceOption = (data) => {
	let legendData = []
	let seriesData = []
	for (let name in data) {
		legendData.push(name)
		seriesData.push({
			name: name,
			value: data[name]
		})
	}
	return {
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
			data: legendData
		},
		series: [{
			name: '客户来源',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: seriesData,
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	}
}

export const deptOption = (data) => {
	let legendData = []
	let seriesData = []
	for (let name in data) {
		legendData.push(name)
		seriesData.push({
			name: name,
			value: data[name]
		})
	}
	return {
		title: {
			text: '部门成交额占比',
			x: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b} : {c} ({d}%)'
		},
		legend: {
			orient: 'vertical',
			left: 'left',
			data: legendData
		},
		series: [{
			name: '成交额占比',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: seriesData,
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	}
}