import React, {
	Component,
	PropTypes
} from 'react'
import {
	Modal,
	Form,
	Input,
	Select,
	Button,
	Radio
} from 'antd'
import {
	TTreeSelect
} from '../../../components'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option

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
				let role = getFieldValue('role')
				let loginId = getFieldValue('loginId')
				let password = getFieldValue('password')
				let phone = getFieldValue('phone')
				let name = getFieldValue('name')
				let enabled = getFieldValue('enabled')
				this.props.createUser({
					loginId,
					password,
					phone,
					name,
					enabled,
					group,
					role
				})
			}
		})
	}

	reset() {
		this.props.form.resetFields()
	}

	render() {
		const getFieldDecorator = this.props.form.getFieldDecorator
		const groups = this.props.group.groups
		const creating = this.props.user.creating

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
					<FormItem {...formItemLayout} label='角色'>
					{
						getFieldDecorator('role',{
							rules:[{
								required:true,
								message:'角色不能为空！'
							}]
						})
						(
							<Select placeholder='请选择角色'>
								<Option key='admin' value='admin'>系统管理员</Option>
								<Option key='deptmanager' value='deptmanager'>部门主管</Option>
								<Option key='employee' value='employee'>普通员工</Option>
								<Option key='financial' value='financial'>财务</Option>
							</Select>
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
							},{
								length:true,
								min:8,
								message:'密码长度最少8个字符！'
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

CreateUser.propTypes = {
	onCancel: PropTypes.func.isRequired
}

export default Form.create()(CreateUser)