import React, {
	Component,
	PropTypes
} from 'react'
import {
	Modal,
	Form,
	Input
} from 'antd'
import {
	TTreeSelect
} from '../../../../components'

const FormItem = Form.Item

class CreateGroup extends Component {
	constructor(prop) {
		super(prop)
		this.submit = this.submit.bind(this)
	}

	submit() {
		const {
			validateFields,
			getFieldValue
		} = this.props.form

		validateFields((errors, values) => {
			if (!errors) {
				let parentId = getFieldValue('parent')
				let name = getFieldValue('name')
				this.props.onSubmit({
					parentId,
					name
				})
			}
		})
	}

	render() {
		const getFieldDecorator = this.props.form.getFieldDecorator
		const {
			groups,
			creating
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
			<Modal title='新增部门' visible={true} width={500} confirmLoading={creating} onOk={this.submit} onCancel={this.props.onCancel}>
				<Form>
					<FormItem {...formItemLayout} label='上级部门'>{
						getFieldDecorator('parent',{
							rules:[{
								required:true,
								message:'上级部门不能为空！'
							}]
						})(
							<TTreeSelect data={groups} dropdownStyle={{maxHeight:400,overflow:'auto'}} placeholder='请选择上级部门' treeDefaultExpandAll/>
						)
					}
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

CreateGroup.defaultProps = {
	creating: false
}

CreateGroup.propTypes = {
	creating: PropTypes.bool.isRequired,
	groups: PropTypes.array.isRequired,
	onCancel: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
}

export default Form.create()(CreateGroup)