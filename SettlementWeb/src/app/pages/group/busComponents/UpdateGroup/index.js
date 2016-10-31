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
	Input
} from 'antd'
import group from '../../../../actions/Group'

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
				this.props.submit({
					id: this.props.data.key,
					name
				})
			}
		})
	}

	cancel() {
		this.props.onCancel()
	}

	render() {
		const getFieldDecorator = this.props.form.getFieldDecorator
		const updating = this.props.group.updating

		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 15
			},
		}

		return (
			<Modal title='修改部门' visible={true} width={500} confirmLoading={updating} onOk={this.submit} onCancel={this.cancel}>
				<Form>
					<FormItem hasFeedback {...formItemLayout} label='部门名称'>
					{
						getFieldDecorator('name',{
							initialValue:this.props.data.title,
							rules:[{
								required:true,
								whitespace:true,
								message:'请输入部门名称！'
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


UpdateGroup.propTypes = {
	data: PropTypes.object.isRequired,
	onCancel: PropTypes.func.isRequired
}

export default connect(state => state, {
	'submit': group.update.bind(group)
})(Form.create()(UpdateGroup))