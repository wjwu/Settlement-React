import React, {
	Component,
	PropTypes
} from 'react'
import {
	Modal,
	Form,
	Input,
	Select,
	Radio,
	InputNumber
} from 'antd'

const Option = Select.Option
const FormItem = Form.Item
const RadioGroup = Radio.Group

class CreateDictionay extends Component {
	constructor(prop) {
		super(prop)
		this.submit = this.submit.bind(this)
	}

	submit() {
		const {
			validateFields,
			getFieldValue
		} = this.props.form

		validateFields((errors, values) => {
			if (!errors) {
				let type = getFieldValue('type')
				let name = getFieldValue('name')
				let rank = getFieldValue('rank')
				let enabled = getFieldValue('enabled')
				this.props.onSubmit({
					type,
					name,
					rank,
					enabled
				})
			}
		})
	}

	render() {
		const getFieldDecorator = this.props.form.getFieldDecorator

		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 15
			},
		}

		return (
			<Modal title='新增字典' visible={true} width={500} confirmLoading={this.props.creating} onOk={this.submit} onCancel={this.props.onCancel}>
				<Form>
					<FormItem {...formItemLayout} label='字典类型'>
					{
						getFieldDecorator('type',{
							rules:[{
								required:true,
								message:'请选择字典类型！'
							}]
						})(
				 			<Select placeholder='请选择字典类型'>
					            <Option value='Base'>培训基地</Option>
					            <Option value='Source'>客户来源</Option>
					            <Option value='Cost'>结算类型</Option>
				          	</Select>
						)
					}
					</FormItem>
					<FormItem {...formItemLayout} label='字典名称'>
					{
						getFieldDecorator('name',{
							rules:[{
									required:true,
									whitespace:true,
									message:'字典名称不能为空！'
								},{
									length:true,
									max:100,
									message:'字典名称最多100个字符！'
								}]
							})(<Input placeholder='请输入字典名称'/>)
					}
					</FormItem>
					<FormItem {...formItemLayout} label='字典顺序'>
					{
						getFieldDecorator('rank',{
							initialValue:0
						})(<InputNumber min={0}/>)
					}
					</FormItem>
					<FormItem {...formItemLayout} label='状态'>
					{
						getFieldDecorator('enabled',{
							initialValue: 'true'
						})(
				            <RadioGroup>
				              <Radio value='true'>启用</Radio>
				              <Radio value='false'>禁用</Radio>
				            </RadioGroup>
						)
					}
					</FormItem>
				</Form>
			</Modal>
		)
	}
}

CreateDictionay.defaultProps = {
	creating: false
}

CreateDictionay.propTypes = {
	onCancel: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	creating: PropTypes.bool
}

export default Form.create()(CreateDictionay)