import React from 'react'
import {
	Icon,
	Tag
} from 'antd'
import numeral from 'numeral'
import * as colors from '../../colors'

export const sheetColumns = () => {
	return [{
		title: '签单人',
		dataIndex: 'UserName',
		key: 'userName',
		width: '7%'
	}, {
		title: '所在部门',
		dataIndex: 'Department',
		key: 'department',
		width: '7%'
	}, {
		title: '客户名称',
		dataIndex: 'CustomName',
		key: 'customName',
		width: '11.5%'
	}, {
		title: '培训地点',
		dataIndex: 'Base',
		key: 'base',
		width: '11.5%',
	}, {
		title: '培训时间',
		dataIndex: 'TimeFrom',
		key: 'timeFrom',
		width: '7%'
	}, {
		title: '客户来源',
		dataIndex: 'Source',
		key: 'source',
		width: '7%'
	}, {
		title: '总成交额',
		dataIndex: 'Total',
		key: 'total',
		width: '7%',
		render: (text) => {
			return <b>{numeral(text).format('0,0.00')}</b>
		}
	}, {
		title: '总成本',
		dataIndex: 'Cost',
		key: 'cost',
		width: '7%',
		render: (text) => {
			return <b>{numeral(text).format('0,0.00')}</b>
		}
	}, {
		title: '已付',
		dataIndex: 'Received',
		key: 'received',
		width: '7%',
		render: (text) => {
			return <b>{numeral(text).format('0,0.00')}</b>
		}
	}, {
		title: '待付',
		dataIndex: 'Remaining',
		key: 'remaining',
		width: '7%',
		render: (text) => {
			return <b>{numeral(text).format('0,0.00')}</b>
		}
	}, {
		title: '税费',
		dataIndex: 'Tax',
		key: 'tax',
		width: '7%',
		render: (text) => {
			return <b>{numeral(text).format('0,0.00')}</b>
		}
	}, {
		title: '个人提成',
		dataIndex: 'Commission',
		key: 'commission',
		width: '7%',
		render: (text) => {
			return <b>{numeral(text).format('0,0.00')}</b>
		}
	}, {
		title: '付款状态',
		dataIndex: 'PayStatus',
		key: 'payStatus',
		width: '7%',
		render: (text) => {
			if (text === 'Paid') {
				return <Tag color={colors.green}>已付清</Tag>
			} else if (text === 'Unpaid') {
				return <Tag color={colors.red}>未付清</Tag>
			}
		}
	}]
}


export const selfColumns = () => {
	return [{
		title: '姓名',
		dataIndex: 'Name',
		key: 'name',
		width: '12.5%'
	}, {
		title: '所在部门',
		dataIndex: 'Department',
		key: 'department',
		width: '12.5%'
	}, {
		title: '提成比例',
		dataIndex: 'Percent',
		key: 'percent',
		width: '12.5%',
		render: (text) => {
			return <b>{`${text*100}%`}</b>
		}
	}, {
		title: '签单数量',
		dataIndex: 'Amount',
		key: 'amount',
		width: '12.5%',
		sorter: (a, b) => {
			return a.Amount - b.Amount
		},
		render: (text) => {
			return <b>{text}</b>
		}
	}, {
		title: '成交合计',
		dataIndex: 'Total',
		key: 'total',
		width: '12.5%',
		sorter: (a, b) => {
			return a.Total - b.Total
		},
		render: (text) => {
			return <b>{numeral(text).format('0,0.00')}</b>
		}
	}, {
		title: '成本合计',
		dataIndex: 'Cost',
		key: 'cost',
		width: '12.5%',
		sorter: (a, b) => {
			return a.Cost - b.Cost
		},
		render: (text) => {
			return <b>{numeral(text).format('0,0.00')}</b>
		}
	}, {
		title: '个人提成',
		dataIndex: 'Commission',
		key: 'commission',
		width: '12.5%',
		sorter: (a, b) => {
			return a.Commission - b.Commission
		},
		render: (text) => {
			return <b>{numeral(text).format('0,0.00')}</b>
		}
	}, {
		title: '个人业绩',
		dataIndex: 'Achievement',
		key: 'achievement',
		width: '12.5%',
		sorter: (a, b) => {
			return a.Achievement - b.Achievement
		},
		render: (text) => {
			return <b>{numeral(text).format('0,0.00')}</b>
		}
	}]
}

export const deptColumns = () => {
	return [{
		title: '所在部门',
		dataIndex: 'Name',
		key: 'name',
		width: '14.28%'
	}, {
		title: '提成比例',
		dataIndex: 'Percent',
		key: 'percent',
		width: '14.28%',
		render: (text) => {
			return <b>{`${text*100}%`}</b>
		}
	}, {
		title: '签单数量',
		dataIndex: 'Amount',
		key: 'amount',
		width: '14.28%',
		sorter: (a, b) => {
			return a.Amount - b.Amount
		},
		render: (text) => {
			return <b>{`${text}`}</b>
		}
	}, {
		title: '成交合计',
		dataIndex: 'Total',
		key: 'total',
		width: '14.28%',
		sorter: (a, b) => {
			return a.Total - b.Total
		},
		render: (text) => {
			return <b>{numeral(text).format('0,0.00')}</b>
		}
	}, {
		title: '成本合计',
		dataIndex: 'Cost',
		key: 'cost',
		width: '14.28%',
		sorter: (a, b) => {
			return a.Cost - b.Cost
		},
		render: (text) => {
			return <b>{numeral(text).format('0,0.00')}</b>
		}
	}, {
		title: '部门提成',
		dataIndex: 'Commission',
		key: 'commission',
		width: '14.28%',
		sorter: (a, b) => {
			return a.Commission - b.Commission
		},
		render: (text) => {
			return <b>{numeral(text).format('0,0.00')}</b>
		}
	}, {
		title: '部门业绩',
		dataIndex: 'Achievement',
		key: 'achievement',
		width: '14.28%',
		sorter: (a, b) => {
			return a.Achievement - b.Achievement
		},
		render: (text) => {
			return <b>{numeral(text).format('0,0.00')}</b>
		}
	}]
}