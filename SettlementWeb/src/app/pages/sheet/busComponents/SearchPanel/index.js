import React, {
	Component,
	PropTypes
} from 'react'
import {
	connect
} from 'react-redux'
import {
	Form,
	Input,
	Select,
	Row,
	Col,
	DatePicker,
	Button
} from 'antd'
import TTreeSelect from '../../../../../components/TTreeSelect'

import dictionary from '../../../../actions/Dictionary'
import group from '../../../../actions/Group'

const EMPTY_GUID = '00000000-0000-0000-0000-000000000000'
const Option = Select.Option
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker

class SearchPanel extends Component {
	componentDidMount() {
		this.props.queryDictionary({
			type: 'base',
			enabled: true,
			pageIndex: 1,
			pageSize: 999
		})
		this.props.queryGroup({
			pageIndex: 1
		})
	}

	render() {
		const formItemLayout = {
			labelCol: {
				span: 5
			},
			wrapperCol: {
				span: 19
			},
		}

		const colLayout = {
			xs: 24,
			sm: 12,
			md: 12,
			lg: 6
		}
		let groups = []
		if (this.props.group.results && this.props.group.results.List) {
			const loop = (parentId) => this.props.group.results.List.filter(item => item.ParentID === parentId).map(item => {
				item.children = loop(item.ID)
				return item
			})

			groups = loop(EMPTY_GUID)
		}

		const results = this.props.dictionary.results
		let bases = []
		if (results && results.TotalCount > 0) {
			bases = results.List.map(item => {
				return <Option key={item.ID} value={item.ID}>{item.Name}</Option>
			})
		}

		return (
			<Form horizontal>
				<Row gutter={24}>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='部门'>
							<TTreeSelect data={groups} dropdownStyle={{maxHeight:400,overflow:'auto'}} treeDefaultExpandAll/>
						</FormItem>
					</Col>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='培训基地'>
							<Select>
							{bases}
							</Select>
						</FormItem>
					</Col>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='培训时间'>
							<RangePicker allowClear/>
						</FormItem>
					</Col>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='客户名称'>
							<Input />
						</FormItem>
					</Col>
				</Row>
				<Row gutter={24}>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='审核状态'>
							<Select>
								<Option value='UnSubmit'>未提交</Option>
								<Option value='Auditing'>审核中</Option>
								<Option value='Pass'>通过</Option>
								<Option value='Fail'>未通过</Option>
							</Select>
						</FormItem>
					</Col>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='付款状态'>
							<Select>
								<Option value='Paid'>已付清</Option>
								<Option value='Unpaid'>未付清</Option>
							</Select>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col style={{ textAlign: 'right' }}>
						<Button type='primary' icon='search' className='button' >查询</Button>
						<Button type='primary' icon='plus-circle-o'>新增结算表</Button>
					</Col>
				</Row>
			</Form>
		)
	}
}

export default connect(state => state, {
	'queryDictionary': dictionary.query.bind(dictionary),
	'queryGroup': group.query.bind(group)
})(Form.create()(SearchPanel))