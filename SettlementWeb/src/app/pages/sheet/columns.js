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
		width: '15%'
	}, {
		title: '培训地点',
		dataIndex: 'Rank',
		key: 'rank',
		width: '15%',
	}, {
		title: '培训时间',
		dataIndex: 'Count',
		key: 'count',
		width: '15%'
	}, {
		title: '项目经理',
		dataIndex: 'Count',
		key: 'count',
		width: '15%'
	}, {
		title: '总成交额',
		dataIndex: 'Count',
		key: 'count',
		width: '15%'
	}, {
		title: '总成本',
		dataIndex: 'Count',
		key: 'count',
		width: '15%'
	}, {
		title: '已付',
		dataIndex: 'Count',
		key: 'count',
		width: '15%'
	}, {
		title: '待付',
		dataIndex: 'Count',
		key: 'count',
		width: '15%'
	}, {
		title: '审核状态',
		dataIndex: 'Count',
		key: 'count',
		width: '15%'
	}, {
		title: '付款状态',
		dataIndex: 'Count',
		key: 'count',
		width: '15%'
	}, {
		title: '创建时间',
		dataIndex: 'CreateTime',
		key: 'createTime',
		width: '30%',
		render: text => moment(text).format('YYYY-MM-DD HH:mm:ss')
	}, {
		title: '操作',
		key: 'operation',
		width: '10%',
		render: (text, raw) => {
			return <a href='javascript:;' onClick={editFuc.bind(null,raw)}><Icon type='edit' /></a>
		}
	}]
}


export default genColumns