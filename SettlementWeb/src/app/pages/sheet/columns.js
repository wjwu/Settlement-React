import React from 'react'
import {
	Icon
} from 'antd'
import moment from 'moment'

const genColumns = (editFuc) => {
	return [{
		title: '客户名称',
		dataIndex: 'CustomName',
		key: 'customName',
		width: '15%',
		render: (text, raw) => {
			return <a href='javascript:;' onClick={editFuc.bind(null,raw)}>{text}</a>
		}
	}, {
		title: '培训地点',
		dataIndex: 'Base',
		key: 'base',
		width: '15%',
	}, {
		title: '培训时间',
		dataIndex: 'TimeFrom',
		key: 'timeFrom',
		width: '8%'
	}, {
		title: '项目经理',
		dataIndex: 'ProjectManager',
		key: 'projectManager',
		width: '8.333%'
	}, {
		title: '总成交额',
		dataIndex: 'TotalPrice',
		key: 'totalPrice',
		width: '8%',
		render: (text) => {
			return <b>{`￥${text}`}</b>
		}
	}, {
		title: '总成本',
		dataIndex: 'CostPrice',
		key: 'costPrice',
		width: '8%',
		render: (text) => {
			return <b>{`￥${text}`}</b>
		}
	}, {
		title: '已付',
		dataIndex: 'ReceivedMoney',
		key: 'receivedMoney',
		width: '8%',
		render: (text) => {
			return <b>{`￥${text}`}</b>
		}
	}, {
		title: '待付',
		dataIndex: 'RemainingMoney',
		key: 'remainingMoney',
		width: '8%',
		render: (text) => {
			return <b>{`￥${text}`}</b>
		}
	}, {
		title: '审核状态',
		dataIndex: 'AuditStatus',
		key: 'auditStatus',
		width: '8.333%'
	}, {
		title: '付款状态',
		dataIndex: 'PayStatus',
		key: 'payStatus',
		width: '8.333%'
	}, {
		title: '操作',
		key: 'operation',
		width: '5%',
		render: (text, raw) => {
			return (
				<span>
					<a href='javascript:;' onClick={editFuc.bind(null,raw)}><Icon type='search' /></a>&nbsp;&nbsp;
					<a href='javascript:;' onClick={editFuc.bind(null,raw)}><Icon type='edit' /></a>
				</span>
			)
		}
	}]
}


export default genColumns