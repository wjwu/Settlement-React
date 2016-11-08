import React, {
	Component,
	PropTypes
} from 'react'
import {
	Modal,
	Form,
	Input
} from 'antd'

const FormItem = Form.Item

class UpdateGroup extends Component {
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
				let name = getFieldValue('name')
				this.props.onSubmit({
					id: this.props.group.key,
					name
				})
			}
		})
	}

	render() {
		const getFieldDecorator = this.props.form.getFieldDecorator
		const {
			updating,
			group
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
			<Modal title='修改部门' visible={true} width={500} confirmLoading={updating} onOk={this.submit} onCancel={this.props.onCancel}>
				<Form>
					<FormItem hasFeedback {...formItemLayout} label='部门名称'>
					{
						getFieldDecorator('name',{
							initialValue:group.title,
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

UpdateGroup.defaultProps = {
	updating: false
}

UpdateGroup.propTypes = {
	group: PropTypes.object.isRequired,
	updating: PropTypes.bool.isRequired,
	onCancel: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
}

export default Form.create()(UpdateGroup)