import React from 'react'
import {
	Icon,
	Tag
} from 'antd'
import moment from 'moment'

const columns = (editFuc) => {
	return [{
		title: '客户名称',
		dataIndex: 'CustomName',
		key: 'customName',
		width: '12.5%',
		render: (text, raw) => {
			return <a href='javascript:;' onClick={editFuc.bind(null,raw)}>{text}</a>
		}
	}, {
		title: '培训地点',
		dataIndex: 'Base',
		key: 'base',
		width: '12.5%',
	}, {
		title: '培训时间',
		dataIndex: 'TimeFrom',
		key: 'timeFrom',
		width: '7%'
	}, {
		title: '签单人',
		dataIndex: 'ProjectManager',
		key: 'projectManager',
		width: '7%'
	}, {
		title: '所在部门',
		dataIndex: 'Department',
		key: 'department',
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
		title: '审核状态',
		dataIndex: 'AuditStatus',
		key: 'auditStatus',
		width: '7%',
		render: (text) => {
			if (text === '未提交') {
				return <Tag color='blue'>{text}</Tag>
			} else if (text === '审核中') {
				return <Tag color='yellow'>{text}</Tag>
			} else if (text === '通过') {
				return <Tag color='green'>{text}</Tag>
			} else if (text === '未通过') {
				return <Tag color='red'>{text}</Tag>
			}
		}
	}, {
		title: '付款状态',
		dataIndex: 'PayStatus',
		key: 'payStatus',
		width: '7%',
		render: (text) => {
			if (text === '已付清') {
				return <Tag color='green'>{text}</Tag>
			} else if (text === '未付清') {
				return <Tag color='red'>{text}</Tag>
			}
		}
	}, {
		title: '操作',
		key: 'operation',
		width: '5%',
		render: (text, raw) => {
			return (
				<span>
					<a href='javascript:;' onClick={editFuc.bind(null,raw,'update')}><Icon type='edit' /></a>&nbsp;&nbsp;
					<a href='javascript:;' onClick={editFuc.bind(null,raw,'delete')}><Icon type='delete' /></a>
				</span>
			)
		}
	}]
}


export default columns