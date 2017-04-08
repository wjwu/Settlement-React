import React from 'react';
import { Icon } from 'antd';

export default (editFuc) => {
	return [{
		title: '名称',
		dataIndex: 'Name',
		key: 'name',
		width: '15%',
		render: (text, raw) => {
			return <a href='javascript:;' onClick={editFuc.bind(null, raw)}>{text}</a>;
		}
	}, {
		title: '顺序',
		dataIndex: 'Rank',
		key: 'rank',
		width: '15%',
	}, {
		title: '使用数',
		dataIndex: 'Count',
		key: 'count',
		width: '15%'
	}, {
		title: '状态',
		dataIndex: 'Enabled',
		key: 'enabled',
		width: '15%',
		render: text => {
			if (text) {
				return '启用';
			} else {
				return '禁用';
			}
		}
	}, {
		title: '创建时间',
		dataIndex: 'CreateTime',
		key: 'createTime',
		width: '30%'
	}, {
		title: '操作',
		key: 'operation',
		width: '10%',
		render: (text, raw) => {
			return <a href='javascript:;' onClick={editFuc.bind(null, raw)}><Icon type='edit' /></a>;
		}
	}];
};