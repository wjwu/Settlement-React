import React, { Component, PropTypes } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker } from 'antd';
import { random } from '../../../utils/common';

const FormItem = Form.Item;

class CreateReceived extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
	}

	submit() {
		const {
			validateFields,
			getFieldValue
		} = this.props.form;

		validateFields((errors, values) => {
			if (!errors) {
				const money = getFieldValue('money');
				const time = getFieldValue('time').format('YYYY-MM-DD');
				const remark = getFieldValue('remark');
				this.props.onCancel({
					ID: random(),
					Money: money,
					Time: time,
					Remark: remark
				}, 'create');
			}
		});
	}

	render() {
		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 16
			},
		};

		const getFieldDecorator = this.props.form.getFieldDecorator;

		return (
			<Modal title='新增收款明细' visible={true} width={460} onOk={this.submit} onCancel={this.props.onCancel}>
				<Form>
					<FormItem {...formItemLayout} label='收款金额'>
					{
						getFieldDecorator('money', {
							initialValue:0,
							rules:[{
								required:true
							}, {
								range:true,
								min:1,
								type:'integer',
								message:'收款金额必须大于0！'
							}]
						})(<InputNumber min={0}/>)
					}
					</FormItem>
					<FormItem {...formItemLayout} label='收款时间'>
					{
						getFieldDecorator('time', {
							rules:[{
								required:true,
								type:'object',
								message:'请选择收款时间！'
							}]
						})(
							<DatePicker format='YYYY-MM-DD' />
						)
					}
					</FormItem>
					<FormItem {...formItemLayout} label='备注'>
					{
						getFieldDecorator('remark')(
							<Input type='textarea' rows={4}/>
						)
					}
					</FormItem>
				</Form>
			</Modal>
		);
	}
}

CreateReceived.propTypes = {
	onCancel: PropTypes.func.isRequired
};

export default Form.create()(CreateReceived);