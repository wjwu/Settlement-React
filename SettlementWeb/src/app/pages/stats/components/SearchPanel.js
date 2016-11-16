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
} from '../../../components'

import {
	getGroup,
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
			let group = getFieldValue('group')
			let groups = getGroup(this.props.group.groups, group)
			let base = getFieldValue('base')
			let times = getFieldValue('times')
			let timeFrom = ''
			let timeTo = ''
			if (times && times.length === 2) {
				timeFrom = times[0].format('YYYY-MM-DD')
				timeTo = times[1].format('YYYY-MM-DD')
			}
			let payStatus = getFieldValue('payStatus')
			let source = getFieldValue('source')
			let projectManager = getFieldValue('projectManager') || ''
			this.props.onSearch({
				groups,
				base,
				timeFrom,
				timeTo,
				payStatus,
				source,
				projectManager
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
			}
		}

		const colLayout = {
			xs: 24,
			sm: 12,
			md: 12,
			lg: 6
		}

		const {
			bases,
			sources
		} = this.props.dictionary

		let groups = this.props.group.groups

		let basesOptions = bases ? bases.map(item => <Option key={item.ID} value={item.ID}>{item.Name}</Option>) : []
		basesOptions.unshift(<Option key='all' value=''>全部</Option>)

		let sourcesOptions = sources ? sources.map(item => <Option key={item.ID} value={item.ID}>{item.Name}</Option>) : []
		sourcesOptions.unshift(<Option key='all' value=''>全部</Option>)

		let parentGroup = this.props.sys_user.ParentGroup
		let group = this.props.sys_user.Group

		return (
			<Form horizontal>
				<Row gutter={24}>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='部门'>
						{
							getFieldDecorator('group',{initialValue:group})(
								<TTreeSelect root={parentGroup} data={groups} dropdownStyle={{maxHeight:400,overflow:'auto'}} treeDefaultExpandAll/>
							)
						}
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
										basesOptions
									}
								</Select>
							)
						}
						</FormItem>
					</Col>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='客户来源'>
						{
							getFieldDecorator('source',{initialValue:''})
							(
								<Select>
									{
										sourcesOptions
									}
								</Select>
							)
						}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={24}>
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
						<FormItem {...formItemLayout} label='签单人'>
						{
							getFieldDecorator('projectManager')(<Input />)
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
	onSearch: PropTypes.func.isRequired
}

export default Form.create()(SearchPanel)