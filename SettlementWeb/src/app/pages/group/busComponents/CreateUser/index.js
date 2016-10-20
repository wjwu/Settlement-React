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

const FormItem = Form.Item
const TreeNode = Tree.TreeNode
const RadioGroup = Radio.Group

class CreateUser extends Component {
	constructor(prop) {
		super(prop)
		this.treeSelectChange = this.treeSelectChange.bind(this)
		this.submit = this.submit.bind(this)
	}

	submit() {
		const {
			validateFields,
			getFieldValue,
			setFields
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
				if (onSubmit) {
					onSubmit({
						loginId,
						password,
						phone,
						name,
						enabled,
						group: this.selectedNodeValue
					})
				}
			}
		})
	}

	treeSelectChange(value) {
		this.selectedNodeValue = value
	}

	render() {
		const {
			getFieldDecorator
		} = this.props.form

		const {
			visible,
			data,
			submitting,
			onCancel
		} = this.props

		const loop = data => data.map(item => {
			if (item.children.length > 0) {
				return <TreeNode value={item.ID} title={item.Name} key={item.ID}>{loop(item.children)}</TreeNode>
			}
			return <TreeNode value={item.ID} title={item.Name} key={item.ID}/>
		})
		const treeNodes = loop(data)

		let cancel
		if (submitting) {
			cancel = <Button key='back' type='ghost' size='large' disabled onClick={onCancel}>取消</Button>
		} else {
			cancel = <Button key='back' type='ghost' size='large' onClick={onCancel}>取消</Button>
		}
		let ok = <Button key='submit' type='primary' size='large' loading={submitting} onClick={this.Submit}>提交</Button>

		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 15
			},
		}
		return (
			<Modal key='createUser' title='新增用户' visible={visible} width={500} footer={[cancel,ok]} onCancel={onCancel}>
				<Form horizontal>
					<FormItem {...formItemLayout} label='所属部门'>
						<TreeSelect dropdownStyle={{maxHeight:400,overflow:'auto'}} placeholder='请选择所属部门' treeDefaultExpandAll onChange={this.treeSelectChange}>
							{treeNodes}
						</TreeSelect>
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
	data: [],
	submitting: false
}

CreateUser.propTypes = {
	visible: PropTypes.bool,
	data: PropTypes.array,
	submitting: PropTypes.bool,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func
}

export default Form.create()(CreateUser)