import React, {
	Component,
	PropTypes
} from 'react'
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

		const {
			onSubmit
		} = this.props

		validateFields((errors, values) => {
			if (!errors) {
				let loginId = getFieldValue('loginId')
				let password = getFieldValue('password')
				let phone = getFieldValue('phone')
				let name = getFieldValue('name')
				let enabled = getFieldValue('enabled')
				onSubmit({
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
		const {
			getFieldDecorator
		} = this.props.form

		const {
			visible,
			groups,
			loading
		} = this.props

		let reset = <Button key='reset' type='ghost' size='large' onClick={this.reset}>重置</Button>
		let cancel = <Button key='cancel' type='ghost' size='large' onClick={this.cancel}>取消</Button>
		let ok = <Button key='submit' type='primary' size='large' loading={loading} onClick={this.submit}>确定</Button>

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
								message:'请输入账号！'
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
								message:'请输入初始密码！'
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
								message:'请输入手机号码！'
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
								message:'请输入姓名！'
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
	loading: false
}

CreateUser.propTypes = {
	groups: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired
}

export default Form.create()(CreateUser)