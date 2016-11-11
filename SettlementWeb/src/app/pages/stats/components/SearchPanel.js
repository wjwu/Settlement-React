import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
	Select,
	Row,
	Col,
	DatePicker,
	Button
} from 'antd'
import {
	TTreeSelect
} from '../../../../components'

import {
	tree,
	EMPTY_GUID,
	disabledTime,
	disabledDate
} from '../../../common'

const Option = Select.Option
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker

class SearchPanel extends Component {
	constructor(props) {
		super(props)
		this.query = this.query.bind(this)
	}

	query() {
		const {
			validateFields,
			getFieldValue
		} = this.props.form
		validateFields((errors, values) => {
			let group = getFieldValue('group') || ''
			let base = getFieldValue('base')
			let times = getFieldValue('times')
			let timeFrom = ''
			let timeTo = ''
			if (times && times.length === 2) {
				timeFrom = times[0].format('YYYY-MM-DD')
				timeTo = times[1].format('YYYY-MM-DD')
			}
			let customName = getFieldValue('customName') || ''
			let auditStatus = getFieldValue('auditStatus')
			let payStatus = getFieldValue('payStatus')
			let source = getFieldValue('source')
			this.props.onSearch({
				group,
				base,
				timeFrom,
				timeTo,
				customName,
				auditStatus,
				payStatus,
				source
			})
		})
	}

	render() {
		const getFieldDecorator = this.props.form.getFieldDecorator

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

		const {
			groups,
			bases,
			sources
		} = this.props

		return (
			<Form horizontal>
				<Row gutter={24}>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='部门'>
							<TTreeSelect data={groups} dropdownStyle={{maxHeight:400,overflow:'auto'}} treeDefaultExpandAll/>
						</FormItem>
					</Col>
					<Col {...colLayout}>
						<FormItem {...formItemLayout}  label='培训时间'>
						{
							getFieldDecorator('times')(<RangePicker format='YYYY-MM-DD' disabledDate={disabledDate} disabledTime={disabledTime} allowClear/>)
						}
						</FormItem>
					</Col>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='培训基地'>
						{
							getFieldDecorator('base',{initialValue:''})
							(
								<Select>
									{
										bases.map(item=><Option key={item.ID} value={item.ID}>{item.Name}</Option>)
									}
								</Select>
							)
						}
						</FormItem>
					</Col>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='客户来源'>
						{
							getFieldDecorator('source')
							(
								<Select>
									{
										sources.map(item=><Option key={item.ID} value={item.ID}>{item.Name}</Option>)
									}
								</Select>
							)
						}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={24}>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='审核状态'>
						{
							getFieldDecorator('auditStatus',{initialValue:''})
							(
								<Select>
									<Option value=''>全部</Option>
									<Option value='UnSubmit'>未提交</Option>
									<Option value='Auditing'>审核中</Option>
									<Option value='Pass'>通过</Option>
									<Option value='Fail'>未通过</Option>
								</Select>
							)
						}
						</FormItem>
					</Col>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='付款状态'>
							{
								getFieldDecorator('payStatus',{initialValue:''})
								(
									<Select>
										<Option value=''>全部</Option>
										<Option value='Paid'>已付清</Option>
										<Option value='Unpaid'>未付清</Option>
									</Select>
								)
							}
						</FormItem>
					</Col>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='项目经理'>
						{
							getFieldDecorator('projectManager')(<Input />)
						}
						</FormItem>
					</Col>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='客户名称'>
						{
							getFieldDecorator('customName')(<Input />)
						}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col style={{ textAlign: 'right' }}>
						<Button type='primary' icon='search' style={{marginRight:8}} onClick={this.query}>查询</Button>
					</Col>
				</Row>
			</Form>
		)
	}
}

SearchPanel.propTypes = {
	groups: PropTypes.array.isRequired,
	bases: PropTypes.array.isRequired,
	sources: PropTypes.array.isRequired,
	onSearch: PropTypes.func.isRequired
}

export default Form.create()(SearchPanel)