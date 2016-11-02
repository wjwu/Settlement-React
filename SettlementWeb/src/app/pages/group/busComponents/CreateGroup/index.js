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
	Input
} from 'antd'
import TTreeSelect from '../../../../../components/TTreeSelect'
import group from '../../../../actions/Group'

const FormItem = Form.Item
const TreeNode = Tree.TreeNode

class CreateGroup extends Component {
	constructor(prop) {
		super(prop)
		this.submit = this.submit.bind(this)
		this.cancel = this.cancel.bind(this)
		this.change = this.change.bind(this)
	}

	submit() {
		const {
			validateFields,
			getFieldValue
		} = this.props.form

		validateFields((errors, values) => {
			let parentId = this.selectedGroup
			if (!errors && parentId) {
				let name = getFieldValue('name')
				this.props.submit({
					parentId,
					name
				})
			}
		})
	}

	cancel() {
		this.props.form.resetFields(['name'])
		this.props.onCancel()
	}

	change(value) {
		this.selectedGroup = value
	}

	render() {
		const getFieldDecorator = this.props.form.getFieldDecorator
		const groups = this.props.groups
		const creating = this.props.group.creating

		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 15
			},
		}

		return (
			<Modal title='新增部门' visible={true} width={500} confirmLoading={creating} onOk={this.submit} onCancel={this.cancel}>
				<Form>
					<FormItem {...formItemLayout} label='上级部门'>
						<TTreeSelect data={groups} dropdownStyle={{maxHeight:400,overflow:'auto'}} placeholder='请选择上级部门' treeDefaultExpandAll onChange={this.change}/>
					</FormItem>
					<FormItem hasFeedback {...formItemLayout} label='部门名称'>
					{
						getFieldDecorator('name',{
							rules:[{
								required:true,
								whitespace:true,
								message:'部门名称不能为空！'
							},{
								length:true,
								max:50,
								message:'部门名称最多50个字符！'
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

CreateGroup.propTypes = {
	groups: PropTypes.array.isRequired,
	onCancel: PropTypes.func.isRequired
}

export default connect(state => state, {
	'submit': group.create.bind(group)
})(Form.create()(CreateGroup))