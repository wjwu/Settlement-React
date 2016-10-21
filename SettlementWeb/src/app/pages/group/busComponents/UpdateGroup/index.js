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
		this.cancel = this.cancel.bind(this)
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

	cancel() {
		this.props.onCancel()
	}

	render() {
		const {
			getFieldDecorator
		} = this.props.form

		const {
			visible,
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
			<Modal title='修改部门' visible={visible} width={500} confirmLoading={submitting} onOk={this.submit} onCancel={this.cancel}>
				<Form>
					<FormItem hasFeedback {...formItemLayout} label='部门名称'>
					{
						getFieldDecorator('name',{
							initialValue:this.props.group.title,
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

UpdateGroup.defaultProps = {
	submitting: false
}

UpdateGroup.propTypes = {
	visible: PropTypes.bool.isRequired,
	submitting: PropTypes.bool,
	group: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired
}

export default Form.create()(UpdateGroup)