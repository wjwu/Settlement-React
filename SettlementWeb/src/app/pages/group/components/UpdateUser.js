import React, { Component, PropTypes } from 'react';
import { Modal, Form, Input, Button, Select, Radio } from 'antd';
import { TTreeSelect } from '../../../components';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class UpdateUser extends Component {
	constructor(prop) {
		super(prop);
		this.submit = this.submit.bind(this);
		this.reset = this.reset.bind(this);
	}

	submit() {
		const {
			validateFields,
			getFieldValue
		} = this.props.form;
		validateFields((errors, values) => {
			if (!errors) {
				let group = getFieldValue('group');
				let role = getFieldValue('role');
				let phone = getFieldValue('phone');
				let name = getFieldValue('name');
				let enabled = getFieldValue('enabled');
				this.props.updateUser({
					id: this.props.data.ID,
					phone,
					name,
					enabled,
					group,
					role
				});
			}
		});
	}

	reset() {
		this.props.form.resetFields();
	}

	render() {
		const getFieldDecorator = this.props.form.getFieldDecorator;
		const groups = this.props.group.groups;
		const updating = this.props.user.updating;
		const user = this.props.data;

		let reset = <Button key='reset' type='ghost' size='large' onClick={this.reset}>重置</Button>;
		let cancel = <Button key='cancel' type='ghost' size='large' onClick={this.props.onCancel}>取消</Button>;
		let ok = <Button key='submit' type='primary' size='large' loading={updating} onClick={this.submit}>确定</Button>;

		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 15
			},
		};

		return (
			<Modal title='修改用户' visible={true} width={500} footer={[cancel, reset, ok]} onCancel={this.props.onCancel}>
				<Form>
					<FormItem {...formItemLayout} label='所属部门'>
					{
						getFieldDecorator('group', {
							initialValue:user.Group
						})(
							<TTreeSelect data={groups} dropdownStyle={{maxHeight:400, overflow:'auto'}} placeholder='请选择所属部门' treeDefaultExpandAll/>
						)
					}
					</FormItem>
					<FormItem {...formItemLayout} label='角色'>
					{
						getFieldDecorator('role', {
							initialValue:user.Role.toLowerCase()
						})(
							<Select>
								<Option key='admin' value='admin'>系统管理员</Option>
								<Option key='deptmanager' value='deptmanager'>部门主管</Option>
								<Option key='employee' value='employee'>普通员工</Option>
								<Option key='financial' value='financial'>财务</Option>
							</Select>
						)
					}
					</FormItem>
					<FormItem {...formItemLayout} label='账号'>
						<Input value={user.LoginID} disabled/>
					</FormItem>
					<FormItem hasFeedback {...formItemLayout} label='手机号码'>
					{
						getFieldDecorator('phone', {
							initialValue:user.Phone,
							rules:[{
								required:true,
								whitespace:true,
								message:'手机号码不能为空！'
							}, {
								pattern:/^1[34578]\d{9}$/,
								message:'手机号码格式不正确！'
							}]
						})(
							<Input placeholder='请输入手机号码'/>
						)
					}
					</FormItem>
					<FormItem hasFeedback {...formItemLayout} label='姓名'>
					{
						getFieldDecorator('name', {
							initialValue:user.Name,
							rules:[{
								required:true,
								whitespace:true,
								message:'姓名不能为空！'
							}, {
								length:true,
								max:10,
								message:'姓名最多10个字符！'
							}]
						})(
							<Input placeholder='请输入姓名'/>
						)
					}
					</FormItem>
					<FormItem {...formItemLayout} label='状态'>
					{
						getFieldDecorator('enabled', {
							initialValue: user.hasOwnProperty('Enabled')?user.Enabled.toString():user.Enabled
						})(
							<RadioGroup>
								<Radio value='true'>启用</Radio>
								<Radio value='false'>禁用</Radio>
							</RadioGroup>
						)
					}
					</FormItem>
				</Form>
			</Modal>
		);
	}
}

UpdateUser.propTypes = {
	data: PropTypes.object.isRequired,
	onCancel: PropTypes.func.isRequired
};

export default Form.create()(UpdateUser);