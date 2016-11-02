import React, {
	Component,
	PropTypes
} from 'react'
import {
	connect
} from 'react-redux'
import {
	Modal,
	Form,
	Tree,
	TreeSelect,
	Input,
	Button,
	Radio,
	Row,
	Col
} from 'antd'
import TTreeSelect from '../../../../../components/TTreeSelect'
import user from '../../../../actions/User'

const FormItem = Form.Item
const TreeNode = Tree.TreeNode
const RadioGroup = Radio.Group

class CreateUser extends Component {
	constructor(prop) {
		super(prop)
		this.change = this.change.bind(this)
		this.submit = this.submit.bind(this)
		this.cancel = this.cancel.bind(this)
		this.reset = this.reset.bind(this)
	}

	submit() {
		const {
			validateFields,
			getFieldValue
		} = this.props.form

		validateFields((errors, values) => {
			if (!errors) {
				let loginId = getFieldValue('loginId')
				let password = getFieldValue('password')
				let phone = getFieldValue('phone')
				let name = getFieldValue('name')
				let enabled = getFieldValue('enabled')
				this.props.submit({
					loginId,
					password,
					phone,
					name,
					enabled,
					group: this.selectedGroup
				})
			}
		})
	}

	cancel() {
		this.props.form.resetFields()
		this.props.onCancel()
	}

	reset() {
		this.props.form.resetFields()
	}

	change(value) {
		this.selectedGroup = value
	}

	render() {
		const getFieldDecorator = this.props.form.getFieldDecorator
		const groups = this.props.groups
		const creating = this.props.user.creating

		let reset = <Button key='reset' type='ghost' size='large' onClick={this.reset}>重置</Button>
		let cancel = <Button key='cancel' type='ghost' size='large' onClick={this.cancel}>取消</Button>
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
			<Modal title='新增用户' visible={true} width={500} footer={[cancel,reset,ok]} onCancel={this.cancel}>
				<Form>
					<FormItem {...formItemLayout} label='所属部门'>
						<TTreeSelect data={groups} dropdownStyle={{maxHeight:400,overflow:'auto'}} placeholder='请选择所属部门' treeDefaultExpandAll onChange={this.change}/>
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

CreateUser.propTypes = {
	groups: PropTypes.array.isRequired,
	onCancel: PropTypes.func.isRequired
}

export default connect(state => state, {
	'submit': user.create.bind(user)
})(Form.create()(CreateUser))