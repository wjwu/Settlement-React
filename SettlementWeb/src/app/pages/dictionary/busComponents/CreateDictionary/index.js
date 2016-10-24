import React, {
	Component,
	PropTypes
} from 'react'
import {
	Modal,
	Form,
	Input,
	Select,
	InputNumber
} from 'antd'

const Option = Select.Option
const FormItem = Form.Item

class CreateDictionay extends Component {
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
				let name = getFieldValue('name')
				this.props.onSubmit({
					id: this.props.group.key,
					name
				})
			}
		})
	}

	cancel() {
		this.props.onCancel()
	}

	render() {
		const {
			getFieldDecorator,
			getFieldProps
		} = this.props.form

		const {
			visible,
			submitting
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
			<Modal title='新增字典' visible={visible} width={500} confirmLoading={submitting} onOk={this.submit} onCancel={this.cancel}>
				<Form>
					<FormItem {...formItemLayout} label='字典类型'>
			 			<Select placeholder='请选择字典类型' {...getFieldProps('type',{rules:[{required:true,message:'请选择字典类型！'}]})}>
				            <Option value='base'>培训基地</Option>
				            <Option value='source'>客户来源</Option>
			          	</Select>
					</FormItem>
					<FormItem {...formItemLayout} label='字典名称'>
					{
						getFieldDecorator('name',{
							rules:[{
									required:true,
									whitespace:true,
									message:'请输入字典名称！'
								}]
							})(<Input placeholder='请输入字典名称'/>)
					}
					</FormItem>
					<FormItem {...formItemLayout} label='字典顺序'>
						<InputNumber min={0} defaultValue={0}/>
					</FormItem>
				</Form>
			</Modal>
		)
	}
}

CreateDictionay.defaultProps = {
	submitting: false
}

CreateDictionay.propTypes = {
	visible: PropTypes.bool.isRequired,
	submitting: PropTypes.bool,
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired
}

export default Form.create()(CreateDictionay)