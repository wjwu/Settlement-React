import React from 'react'
import {
	Icon,
	Tag
} from 'antd'
import * as colors from '../../colors'

export const sheetColumns = () => {
	return [{
		title: '签单人',
		dataIndex: 'UserName',
		key: 'userName',
		width: '9%'
	}, {
		title: '所在部门',
		dataIndex: 'Department',
		key: 'department',
		width: '9%'
	}, {
		title: '客户名称',
		dataIndex: 'CustomName',
		key: 'customName',
		width: '13%'
	}, {
		title: '培训地点',
		dataIndex: 'Base',
		key: 'base',
		width: '13%',
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
		dataIndex: 'TotalPrice',
		key: 'totalPrice',
		width: '7%',
		render: (text) => {
			return <b>{`￥${text}`}</b>
		}
	}, {
		title: '总成本',
		dataIndex: 'CostPrice',
		key: 'costPrice',
		width: '7%',
		render: (text) => {
			return <b>{`￥${text}`}</b>
		}
	}, {
		title: '已付',
		dataIndex: 'ReceivedMoney',
		key: 'receivedMoney',
		width: '7%',
		render: (text) => {
			return <b>{`￥${text}`}</b>
		}
	}, {
		title: '待付',
		dataIndex: 'RemainingMoney',
		key: 'remainingMoney',
		width: '7%',
		render: (text) => {
			return <b>{`￥${text}`}</b>
		}
	}, {
		title: '个人提成',
		dataIndex: 'Commission',
		key: 'commission',
		width: '7%',
		render: (text) => {
			return <b>{`￥${text}`}</b>
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
		width: '9%'
	}, {
		title: '所在部门',
		dataIndex: 'Department',
		key: 'department',
		width: '9%'
	}, {
		title: '提成比例',
		dataIndex: 'Percent',
		key: 'percent',
		width: '9%'
	}, {
		title: '签单数量',
		dataIndex: 'Amount',
		key: 'amount',
		width: '9%'
	}, {
		title: '成交合计',
		dataIndex: 'Total',
		key: 'total',
		width: '9%'
	}, {
		title: '成本合计',
		dataIndex: 'Cost',
		key: 'cost',
		width: '9%'
	}, {
		title: '个人提成',
		dataIndex: 'Commission',
		key: 'commission',
		width: '9%'
	}]
}

export const deptColumns = () => {
	return [{
		title: '所在部门',
		dataIndex: 'Name',
		key: 'name',
		width: '9%'
	}, {
		title: '提成比例',
		dataIndex: 'Percent',
		key: 'percent',
		width: '9%'
	}, {
		title: '签单数量',
		dataIndex: 'Amount',
		key: 'amount',
		width: '9%'
	}, {
		title: '成交合计',
		dataIndex: 'Total',
		key: 'total',
		width: '9%'
	}, {
		title: '成本合计',
		dataIndex: 'Cost',
		key: 'cost',
		width: '9%'
	}, {
		title: '部门提成',
		dataIndex: 'Commission',
		key: 'commission',
		width: '9%'
	}]
}