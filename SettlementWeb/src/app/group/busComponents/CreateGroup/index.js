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

const FormItem = Form.Item
const TreeNode = Tree.TreeNode

class CreateGroup extends Component {
	constructor(prop) {
		super(prop)
		this.onChange = this.onChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit() {
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
				let name = getFieldValue('name')
				if (onSubmit) {
					onSubmit(this.selectedNodeValue, name)
				}
			}
		})
	}

	onChange(value) {
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

		const loop = data => data.map(item => {
			if (item.children.length > 0) {
				return <TreeNode value={item.ID} title={item.Name} key={item.ID}>{loop(item.children)}</TreeNode>
			}
			return <TreeNode value={item.ID} title={item.Name} key={item.ID}/>
		})
		const treeNodes = loop(data)

		let cancel = <Button key='back' type='ghost' size='large'>取消</Button>
		let ok = <Button key='submit' type='primary' size='large' loading={submitting} onClick={this.handleSubmit}>提交</Button>

		return (
			<Modal title='新增部门' visible={visible} width={400} footer={[cancel,ok]}>
				<Form>
					<FormItem>
						<TreeSelect dropdownStyle={{maxHeight:400,overflow:'auto'}} placeholder='请选择上级部门' treeDefaultExpandAll onChange={this.onChange}>
							{treeNodes}
						</TreeSelect>
					</FormItem>
					<FormItem hasFeedback>
					{
						getFieldDecorator('name',{
							rules:[{
								required:true,
								whitespace:true,
								message:'请输入部门名称！'
							}]
						})(
							<Input placeholder='部门名称'/>
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
	onSubmit: PropTypes.func
}

export default Form.create()(CreateGroup)

//							{...getFieldDecorator('treeSelect',{rules:[{required:true,type:'string',message:'请选择部门！'}]})}