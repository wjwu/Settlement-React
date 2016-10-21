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
	Button
} from 'antd'
import TTreeSelect from '../../../../../components/TTreeSelect'

const FormItem = Form.Item
const TreeNode = Tree.TreeNode

class CreateGroup extends Component {
	constructor(prop) {
		super(prop)
		this.submit = this.submit.bind(this)
		this.cancel = this.cancel.bind(this)
		this.treeSelectChange = this.treeSelectChange.bind(this)
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
				let name = getFieldValue('name')
				if (onSubmit) {
					let parentId = this.selectedNodeValue
					onSubmit({
						parentId,
						name
					})
				}
			}
		})
	}

	cancel() {
		this.props.form.resetFields(['name'])
		this.props.onCancel()
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
			groups,
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
			<Modal title='新增部门' visible={visible} width={500} confirmLoading={submitting} onOk={this.submit} onCancel={this.cancel}>
				<Form>
					<FormItem {...formItemLayout} label='上级部门'>
						<TTreeSelect data={groups} dropdownStyle={{maxHeight:400,overflow:'auto'}} placeholder='请选择上级部门' treeDefaultExpandAll onChange={this.treeSelectChange}/>
					</FormItem>
					<FormItem hasFeedback {...formItemLayout} label='部门名称'>
					{
						getFieldDecorator('name',{
							rules:[{
								required:true,
								whitespace:true,
								message:'请输入部门名称！'
							}]
						})(
							<Input placeholder='请输入部门名称'/>
						)
					}
					</FormItem>
				</Form>
			</Modal>
		)
	}
}

CreateGroup.defaultProps = {
	groups: [],
	submitting: false
}

CreateGroup.propTypes = {
	visible: PropTypes.bool,
	groups: PropTypes.array,
	submitting: PropTypes.bool,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func
}

export default Form.create()(CreateGroup)

//{...getFieldDecorator('treeSelect',{rules:[{required:true,type:'string',message:'请选择部门！'}]})}