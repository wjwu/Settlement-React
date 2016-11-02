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
	Input,
	Button,
	Tree,
	Radio
} from 'antd'

import TTreeSelect from '../../../../../components/TTreeSelect'
import user from '../../../../actions/User'

const FormItem = Form.Item
const TreeNode = Tree.TreeNode
const RadioGroup = Radio.Group

class UpdateUser extends Component {
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
				let phone = getFieldValue('phone')
				let name = getFieldValue('name')
				let enabled = getFieldValue('enabled')
				this.props.submit({
					id: this.props.data.ID,
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
		const updating = this.props.user.updating
		const {
			groups,
			data
		} = this.props

		this.selectedGroup = data.Group

		let reset = <Button key='reset' type='ghost' size='large' onClick={this.reset}>重置</Button>
		let cancel = <Button key='cancel' type='ghost' size='large' onClick={this.cancel}>取消</Button>
		let ok = <Button key='submit' type='primary' size='large' loading={updating} onClick={this.submit}>确定</Button>

		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 15
			},
		}
		return (
			<Modal title='修改用户' visible={true} width={500} footer={[cancel,reset,ok]} onCancel={this.cancel}>
				<Form>
					<FormItem {...formItemLayout} label='所属部门'>
						<TTreeSelect value={data.Group} data={groups} dropdownStyle={{maxHeight:400,overflow:'auto'}} placeholder='请选择所属部门' treeDefaultExpandAll onChange={this.change}/>
					</FormItem>
					<FormItem {...formItemLayout} label='账号'>
						<Input value={data.LoginID} disabled/>
					</FormItem>
					<FormItem hasFeedback {...formItemLayout} label='手机号码'>
					{
						getFieldDecorator('phone',{
							initialValue:data.Phone,
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
							initialValue:data.Name,
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
							initialValue: data.hasOwnProperty('Enabled')?data.Enabled.toString():data.Enabled
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


UpdateUser.propTypes = {
	data: PropTypes.object.isRequired,
	groups: PropTypes.array.isRequired,
	onCancel: PropTypes.func.isRequired
}


export default connect(state => state, {
	'submit': user.update.bind(user)
})(Form.create()(UpdateUser))