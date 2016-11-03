import React from 'react'
import {
	Icon,
	Tag
} from 'antd'

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


export default genReceivedColumns