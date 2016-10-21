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
					onSubmit(this.selectedNodeValue, name)
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
			data,
			submitting
		} = this.props

		let cancel = <Button key='cancel' type='ghost' size='large' onClick={this.cancel}>取消</Button>
		let ok = <Button key='ok' type='primary' size='large' loading={submitting} onClick={this.submit}>提交</Button>

		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 15
			},
		}

		return (
			<Modal key='createGroup' title='新增部门' visible={visible} width={500} footer={[cancel,ok]} onCancel={this.cancel}>
				<Form>
					<FormItem {...formItemLayout} label='上级部门'>
						<TTreeSelect data={data} dropdownStyle={{maxHeight:400,overflow:'auto'}} placeholder='请选择上级部门' treeDefaultExpandAll onChange={this.treeSelectChange}/>
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
	data: [],
	submitting: false
}

CreateGroup.propTypes = {
	visible: PropTypes.bool,
	data: PropTypes.array,
	submitting: PropTypes.bool,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func
}

export default Form.create()(CreateGroup)

//{...getFieldDecorator('treeSelect',{rules:[{required:true,type:'string',message:'请选择部门！'}]})}