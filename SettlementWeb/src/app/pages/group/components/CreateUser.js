import React, {
	Component,
	PropTypes
} from 'react'
import {
	Modal,
	Form,
	Input,
	Button,
	Radio
} from 'antd'
import {
	TTreeSelect
} from '../../../../components'

const FormItem = Form.Item
const RadioGroup = Radio.Group

class CreateUser extends Component {
	constructor(prop) {
		super(prop)
		this.submit = this.submit.bind(this)
		this.reset = this.reset.bind(this)
	}

	submit() {
		const {
			validateFields,
			getFieldValue
		} = this.props.form

		validateFields((errors, values) => {
			if (!errors) {
				let group = getFieldValue('group')
				let loginId = getFieldValue('loginId')
				let password = getFieldValue('password')
				let phone = getFieldValue('phone')
				let name = getFieldValue('name')
				let enabled = getFieldValue('enabled')
				this.props.onSubmit({
					loginId,
					password,
					phone,
					name,
					enabled,
					group
				})
			}
		})
	}

	reset() {
		this.props.form.resetFields()
	}

	render() {
		const getFieldDecorator = this.props.form.getFieldDecorator
		const {
			groups,
			creating
		} = this.props

		let reset = <Button key='reset' type='ghost' size='large' onClick={this.reset}>重置</Button>
		let cancel = <Button key='cancel' type='ghost' size='large' onClick={this.props.onCancel}>取消</Button>
		let ok = <Button key='submit' type='primary' size='large' loading={creating} onClick={this.submit}>确定</Button>

		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 15
			},
		}
		return (
			<Modal title='新增用户' visible={true} width={500} footer={[cancel,reset,ok]} onCancel={this.props.onCancel}>
				<Form>
					<FormItem {...formItemLayout} label='所属部门'>
					{
						getFieldDecorator('group',{
							rules:[{
								required:true,
								message:'所属部门不能为空！'
							}]
						})(
							<TTreeSelect data={groups} dropdownStyle={{maxHeight:400,overflow:'auto'}} placeholder='请选择所属部门' treeDefaultExpandAll/>
						)
					}
					</FormItem>
					<FormItem hasFeedback {...formItemLayout} label='账号'>
					{
						getFieldDecorator('loginId',{
							rules:[{
								required:true,
								whitespace:true,
								message:'账号不能为空！'
							},{
								length:true,
								max:50,
								message:'账号最多50个字符！'
							}]
						})(
							<Input placeholder='请输入账号'/>
						)
					}
					</FormItem>
					<FormItem hasFeedback {...formItemLayout} label='初始密码'>
					{
						getFieldDecorator('password',{
							rules:[{
								required:true,
								whitespace:true,
								message:'初始密码不能为空！'
							},{
								length:true,
								max:20,
								message:'密码长度不能超过20个字符！'
							}]
						})(
							<Input type='password' placeholder='请输入初始密码'/>
						)
					}
					</FormItem>
					<FormItem hasFeedback {...formItemLayout} label='手机号码'>
					{
						getFieldDecorator('phone',{
							rules:[{
								required:true,
								whitespace:true,
								message:'手机号码不能为空！'
							},{
								pattern:/^1[34578]\d{9}$/,
								message:'手机号码格式不正确！'
							}]
						})(
							<Input placeholder='请输入手机号码'/>
						)
					}
					</FormItem>
					<FormItem hasFeedback {...formItemLayout} label='姓名'>
					{
						getFieldDecorator('name',{
							rules:[{
								required:true,
								whitespace:true,
								message:'姓名不能为空！'
							},{
								length:true,
								max:10,
								message:'姓名最多10个字符！'
							}]
						})(
							<Input placeholder='请输入姓名'/>
						)
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

CreateUser.defaultProps = {
	creating: false
}

CreateUser.propTypes = {
	groups: PropTypes.array.isRequired,
	creating: PropTypes.bool.isRequired,
	onCancel: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
}

export default Form.create()(CreateUser)