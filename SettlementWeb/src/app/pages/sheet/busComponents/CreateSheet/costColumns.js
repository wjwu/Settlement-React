import React from 'react'
import {
	Icon,
	Tag
} from 'antd'

const genCostColumns = (editFuc) => {
	return [{
		title: '名目',
		dataIndex: 'name',
		key: 'name',
		width: '20%'
	}, {
		title: '单价',
		dataIndex: 'unitPrice',
		key: 'unitPrice',
		width: '10%',
	}, {
		title: '数量',
		dataIndex: 'amount',
		key: 'amount',
		width: '10%'
	}, {
		title: '小计',
		dataIndex: 'total',
		key: 'total',
		width: '15%',
		render: (text) => {
			return <b>{`￥${text}`}</b>
		}
	}, {
		title: '付款状态',
		dataIndex: 'status',
		key: 'status',
		width: '15%',
		render: (text) => {
			if (text === 'Paid') {
				return <Tag color='green'>已付款</Tag>
			} else if (text === 'Unpaid') {
				return <Tag color='red'>未付款</Tag>
			}
		}
	}, {
		title: '备注',
		dataIndex: 'remark',
		key: 'remark',
		width: '20%'
	}, {
		title: '操作',
		key: 'operation',
		width: '10%',
		render: (text, raw) => {
			return (
				<span>
					<a href='javascript:;' onClick={editFuc.bind(null,raw,'edit')}><Icon type='edit' /></a>&nbsp;&nbsp;
					<a href='javascript:;' onClick={editFuc.bind(null,raw,'delete')}><Icon type='delete' /></a>
				</span>
			)
		}
	}]
}


export default genCostColumns