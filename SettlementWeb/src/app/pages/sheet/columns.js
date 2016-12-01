import React from 'react'
import {
	Icon,
	Tag
} from 'antd'
import numeral from 'numeral'
import * as colors from '../../colors'

const columns = (editFuc) => {
	return [{
		title: '客户名称',
		dataIndex: 'CustomName',
		key: 'customName',
		width: '11%',
		render: (text, raw) => {
			return <a href='javascript:;' onClick={editFuc.bind(null,raw,'update')}>{text}</a>
		}
	}, {
		title: '培训时间',
		dataIndex: 'TimeFrom',
		key: 'timeFrom',
		width: '7%'
	}, {
		title: '签单人',
		dataIndex: 'UserName',
		key: 'userName',
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
		title: '税率',
		dataIndex: 'TaxRate',
		key: 'taxRate',
		width: '7%',
		render: (text) => {
			return <b>{`${text*100}%`}</b>
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
		title: '个人提成',
		dataIndex: 'Commission',
		key: 'commission',
		width: '7%',
		render: (text) => {
			return <b>{numeral(text).format('0,0.00')}</b>
		}
	}, {
		title: '业绩',
		dataIndex: 'Achievement',
		key: 'achievement',
		width: '7%',
		render: (text) => {
			return <b>{numeral(text).format('0,0.00')}</b>
		}
	}, {
		title: '审核状态',
		dataIndex: 'AuditStatus',
		key: 'auditStatus',
		width: '7%',
		render: (text) => {
			if (text === 'UnSubmit') {
				return <Tag color={colors.blue}>未提交</Tag>
			} else if (text === 'Auditing') {
				return <Tag color={colors.yellow}>审核中</Tag>
			} else if (text === 'Pass') {
				return <Tag color={colors.green}>通过</Tag>
			} else if (text === 'Fail') {
				return <Tag color={colors.red}>未通过</Tag>
			}
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