import React from 'react'
import {
	Icon,
	Tag
} from 'antd'
import * as colors from '../../../colors'

const genCostColumns = (editFuc) => {
	return [{
		title: '名目',
		dataIndex: 'TypeName',
		key: 'name',
		width: '20%'
	}, {
		title: '单价',
		dataIndex: 'UnitPrice',
		key: 'unitPrice',
		width: '10%',
	}, {
		title: '数量',
		dataIndex: 'Amount',
		key: 'amount',
		width: '10%'
	}, {
		title: '小计',
		dataIndex: 'Total',
		key: 'total',
		width: '15%',
		render: (text) => {
			return <b>{`￥${text}`}</b>
		}
	}, {
		title: '付款状态',
		dataIndex: 'Status',
		key: 'status',
		width: '15%',
		render: (text) => {
			if (text === 'Paid') {
				return <Tag color={colors.green}>已付款</Tag>
			} else if (text === 'Unpaid') {
				return <Tag color={colors.red}>未付款</Tag>
			}
		}
	}, {
		title: '备注',
		dataIndex: 'Remark',
		key: 'remark',
		width: '20%'
	}, {
		title: '操作',
		key: 'operation',
		width: '10%',
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

const genReceivedColumns = (editFuc) => {
	return [{
		title: '收款金额',
		dataIndex: 'Money',
		key: 'money',
		width: '25%'
	}, {
		title: '收款时间',
		dataIndex: 'Time',
		key: 'time',
		width: '25%'
	}, {
		title: '备注',
		dataIndex: 'Remark',
		key: 'remark',
		width: '40%'
	}, {
		title: '操作',
		key: 'operation',
		width: '10%',
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

export {
	genCostColumns,
	genReceivedColumns
}