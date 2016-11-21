import React, {
	Component,
	PropTypes
} from 'react'
import {
	connect
} from 'react-redux'
import {
	Tabs,
	Button,
	Modal,
	Row,
	Col,
	Form,
	Input
} from 'antd'
import {
	updateUserPwd
} from '../../actions/user'

const TabPane = Tabs.TabPane
const FormItem = Form.Item

class UserPanel extends Component {
	changePwd() {
		const {
			validateFields,
			getFieldValue,
			resetFields
		} = this.props.form

		validateFields((errors, values) => {
			if (!errors) {
				let oldPwd = getFieldValue('oldPwd')
				let newPwd = getFieldValue('newPwd')
				this.props.updateUserPwd({
					oldPassword: oldPwd,
					newPassword: newPwd
				}, () => {
					resetFields()
					this.props.showGlobleMsg('success', '修改成功！')
				}, (error) => {
					this.props.showGlobleMsg('error', error)
				})
			}
		})
	}

	checkRePwd(rule, value, callback) {
		if (value) {
			const getFieldValue = this.props.form.getFieldValue
			let newPwd = getFieldValue('newPwd')
			if (newPwd && value.toLowerCase() !== newPwd.toLowerCase()) {
				callback('重复密码与新密码不一致！')
			}
		}
		callback()
	}

	render() {
		const footer = [
			<Button key='close' type='ghost' size='large' onClick={this.props.onCancel}>关闭</Button>
		]
		const titleRight = {
			textAlign: 'right'
		}
		const rowStyle = {
			marginBottom: 16
		}

		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 15
			},
		}
		const getFieldDecorator = this.props.form.getFieldDecorator
		const user = this.props.sys_user

		return (
			<Modal title='个人信息' visible={true} footer={footer} onCancel={this.props.onCancel}>
				<Tabs defaultActiveKey='self'>
				    <TabPane tab='个人信息' key='self'>
				    	<Row style={rowStyle}>
				    		<Col xs={5} style={titleRight}>所属部门：</Col>
				    		<Col offset={1} xs={15}>{user.GroupName}</Col>
				    	</Row>
				    	<Row style={rowStyle}>
					    	<Col xs={5} style={titleRight}>角色：</Col>
				    		<Col offset={1} xs={15}>{user.RoleName}</Col>
				    	</Row>
				    	<Row style={rowStyle}>
				    		<Col xs={5} style={titleRight}>账号：</Col>
				    		<Col offset={1} xs={15}>{user.LoginID}</Col>
				    	</Row>
				    	<Row style={rowStyle}>
				    		<Col xs={5} style={titleRight}>姓名：</Col>
				    		<Col offset={1} xs={15}>{user.Name}</Col>
				    	</Row>
				    	<Row style={rowStyle}>
				    		<Col xs={5} style={titleRight}>手机：</Col>
				    		<Col offset={1} xs={15}>{user.Phone}</Col>
				    	</Row>
					    <Row style={rowStyle}>
				    		<Col xs={5} style={titleRight}>上次登录时间：</Col>
				    		<Col offset={1} xs={15}>{user.LastLoginTime}</Col>
				    	</Row>
				    	<Row style={rowStyle}>
				    		<Col xs={5} style={titleRight}>上次登录IP：</Col>
				    		<Col offset={1} xs={15}>{user.LastLoginIP}</Col>
				    	</Row>
				    </TabPane>
				    <TabPane tab='修改密码' key='password'>
				    	<Form>
				    		<FormItem hasFeedback {...formItemLayout} label='原始密码'>
				    		{
				    			getFieldDecorator('oldPwd',{
									rules:[{
										required:true,
										whitespace:true,
										message:'原始密码不能为空！'
									},{
										length:true,
										min:8,
										message:'原始密码最少8个字符！'
									}]
								})(
									<Input type='password' placeholder='请输入原始密码'/>
								)
				    		}
				    		</FormItem>
				    		<FormItem hasFeedback {...formItemLayout} label='新密码'>
				    		{
				    			getFieldDecorator('newPwd',{
									rules:[{
										required:true,
										whitespace:true,
										message:'新密码不能为空！'
									},{
										length:true,
										min:8,
										message:'新密码最少8个字符！'
									}]
								})(
									<Input type='password' placeholder='请输入新密码'/>
								)
				    		}
				    		</FormItem>
				    		<FormItem hasFeedback {...formItemLayout} label='重复密码'>
				    		{
				    			getFieldDecorator('rePwd',{
									rules:[{
										required:true,
										whitespace:true,
										message:'重复密码不能为空！'
									},{
										validator:this.checkRePwd.bind(this)
									}]
								})(
									<Input type='password' placeholder='请输入重复密码'/>
								)
				    		}
				    		</FormItem>
				    		<Row>
				    			<Col offset={18}>
				    				<Button key='save' loading={this.props.user.updatingPwd} type='primary' size='large' onClick={this.changePwd.bind(this)} >保存</Button>
				    			</Col>
				    		</Row>
				    	</Form>
				    </TabPane>
				    <TabPane tab='升级日志' key='log'></TabPane>
				</Tabs>
			</Modal>
		)
	}
}

UserPanel.PropTypes = {
	onCancel: PropTypes.func.isRequired
}

export default connect(state => state, {
	updateUserPwd
})(Form.create()(UserPanel))