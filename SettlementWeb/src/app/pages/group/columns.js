import React from 'react'
import {
	Icon
} from 'antd'

const genColumns = (editFuc) => {
	return [{
		title: '账号',
		dataIndex: 'LoginID',
		key: 'loginId',
		width: '15%',
		render: (text, raw) => {
			return <a href='javascript:;' onClick={editFuc.bind(null,raw)}>{text}</a>
		}
	}, {
		title: '手机',
		dataIndex: 'Phone',
		key: 'phone',
		width: '15%',
	}, {
		title: '姓名',
		dataIndex: 'Name',
		key: 'name',
		width: '15%'
	}, {
		title: '状态',
		dataIndex: 'Enabled',
		key: 'enabled',
		width: '15%',
		render: text => {
			if (text) {
				return '启用'
			} else {
				return '禁用'
			}
		}
	}, {
		title: '角色',
		dataIndex: 'Role',
		key: 'role',
		width: '15%',
		render: text => {
			if (text.toLowerCase() === 'admin') {
				return '系统管理员'
			} else if (text.toLowerCase() === 'deptmanager') {
				return '部门主管'
			} else if (text.toLowerCase() === 'employee') {
				return '普通员工'
			} else if (text.toLowerCase() === 'financial') {
				return '财务'
			}
		}
	}, {
		title: '创建时间',
		dataIndex: 'CreateTime',
		key: 'createTime',
		width: '15%'
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