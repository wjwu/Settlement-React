import React, { Component, PropTypes } from 'react';
import { Modal, Form, Input, InputNumber, Spin } from 'antd';

const FormItem = Form.Item;

class UpdateGroup extends Component {
	constructor(prop) {
		super(prop);
		this.submit = this.submit.bind(this);
	}

	componentDidMount() {
		this.props.getGroup(this.props.id);
	}


	submit() {
		const {
			validateFields,
			getFieldValue
		} = this.props.form;

		validateFields((errors, values) => {
			if (!errors) {
				let name = getFieldValue('name');
				let percent = getFieldValue('percent');
				this.props.updateGroup({
					id: this.props.group.group.ID,
					name,
					percent
				});
			}
		});
	}

	render() {
		const getFieldDecorator = this.props.form.getFieldDecorator;
		const {
			updating,
			group
		} = this.props.group;

		if (!group) {
			return (
				<Modal title='修改部门' visible={true} width={500} onCancel={this.props.onCancel}>
					<Spin tip='Loading...'/>
				</Modal>
			);
		}

		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 15
			},
		};

		return (
			<Modal title='修改部门' visible={true} width={500} confirmLoading={updating} onOk={this.submit} onCancel={this.props.onCancel}>
				<Form>
					<FormItem hasFeedback {...formItemLayout} label='部门名称'>
					{
						getFieldDecorator('name', {
							initialValue:group.Name,
							rules:[{
								required:true,
								whitespace:true,
								message:'部门名称不能为空！'
							}, {
								length:true,
								max:50,
								message:'部门名称最多50个字符！'
							}]
						})(
							<Input placeholder='请输入部门名称'/>
						)
					}
					</FormItem>
					<FormItem {...formItemLayout} label='提成比例'>
					{
						getFieldDecorator('percent', {
							initialValue:group.Percent,
							rules:[{
								required:true
							}, {
								range:true,
								min:0,
								type:'number',
								message:'提成比例必须大于等于0！'
							}]
						})(<InputNumber min={0} step={0.01}/>)
					}
					</FormItem>
				</Form>
			</Modal>
		);
	}
}


UpdateGroup.propTypes = {
	id: PropTypes.string.isRequired,
	onCancel: PropTypes.func.isRequired
};

export default Form.create()(UpdateGroup);