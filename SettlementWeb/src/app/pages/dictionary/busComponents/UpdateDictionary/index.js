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

class UpdateDictionay extends Component {
	constructor(prop) {
		super(prop)
		this.submit = this.submit.bind(this)
		this.cancel = this.cancel.bind(this)
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
					id: this.props.dictionary.ID,
					type,
					name,
					rank,
					enabled
				})
			}
		})
	}

	cancel() {
		this.props.form.resetFields()
		this.props.onCancel()
	}

	render() {
		const {
			getFieldDecorator,
			getFieldProps
		} = this.props.form

		const {
			visible,
			loading,
			dictionary
		} = this.props

		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 15
			},
		}

		return (
			<Modal title='新增字典' visible={true} width={500} confirmLoading={loading} onOk={this.submit} onCancel={this.cancel}>
				<Form>
					<FormItem {...formItemLayout} label='字典类型'>
			 			<Select placeholder='请选择字典类型' {...getFieldProps('type',{initialValue:dictionary.Type,rules:[{required:true,message:'请选择字典类型！'}]})}>
				            <Option value='Base'>培训基地</Option>
				            <Option value='Source'>客户来源</Option>
				            <Option value='Cost'>结算类型</Option>
			          	</Select>
					</FormItem>
					<FormItem {...formItemLayout} label='字典名称'>
					{
						getFieldDecorator('name',{
							initialValue:dictionary.Name,
							rules:[{
									required:true,
									whitespace:true,
									message:'请输入字典名称！'
								}]
							})(<Input placeholder='请输入字典名称'/>)
					}
					</FormItem>
					<FormItem {...formItemLayout} label='字典顺序'>
					{
						getFieldDecorator('rank',{
							initialValue:dictionary.Rank
						})(<InputNumber min={0}/>)
					}
					</FormItem>
					<FormItem {...formItemLayout} label='状态'>
					{
						getFieldDecorator('enabled',{
							initialValue: dictionary.hasOwnProperty('Enabled')?dictionary.Enabled.toString():dictionary.Enabled
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

UpdateDictionay.defaultProps = {
	loading: false
}

UpdateDictionay.propTypes = {
	dictionary: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired
}

export default Form.create()(UpdateDictionay)