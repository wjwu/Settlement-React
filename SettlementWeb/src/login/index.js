import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {
	Form,
	Input,
	Button,
	Row,
	Col,
	Alert
} from 'antd'
import config from './config'
import Captcha from './Captcha'
import * as actions from './action'

const FormItem = Form.Item

const createTimeSpan = () => {
	let strRand = Math.random() + ''
	return strRand.substr(2, strRand.length - 2)
}

class LoginForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			timeSpan: createTimeSpan()
		}
	}

	submit(e) {
		e.preventDefault()
		const {
			validateFields,
			getFieldValue,
			setFields
		} = this.props.form
		validateFields((errors, values) => {
			if (!errors) {
				let account = getFieldValue('account')
				let password = getFieldValue('password')
				let captcha = getFieldValue('captcha')
				let timeSpan = this.state.timeSpan
				actions.login(account, password, captcha, timeSpan).then(result => {
					sessionStorage.setItem('token', result.Token)
					sessionStorage.setItem('user', JSON.stringify(result.User))
					window.location.href = '/home'
				}, error => {
					this.refreshCaptcha()
					setFields({
						account: {
							value: account,
							errors: [{
								message: error
							}]
						},
						captcha: {
							errors: [{
								message: '请重新输入验证码！'
							}]
						}
					})
				})
			}
		})
	}

	refreshCaptcha() {
		this.setState({
			timeSpan: createTimeSpan()
		})
	}

	render() {
		const {
			getFieldDecorator
		} = this.props.form

		const timeSpan = this.state.timeSpan

		const url = `${config.apiHost}captcha?t=${timeSpan}`

		return (
			<Form onSubmit={this.submit.bind(this)}>
				<FormItem>
					<h1>树虎团建结算系统</h1>
				</FormItem>
				<FormItem hasFeedback>
				{
					getFieldDecorator('account',{
						rules:[{
							required:true,
							whitespace:true,
							message:'用户名不能为空！'
						}]
					})(
						<Input placeholder='用户名'/>
					)
				}
				</FormItem>
				<FormItem hasFeedback>
				{
					getFieldDecorator('password',{
						rules:[{
							required:true,
							whitespace:true,
							message:'密码不能为空！'
						}]
					})(
						<Input type='password' placeholder='密码' />
					)
				}
				</FormItem>
				<Row>
					<Col span='15'>
						<FormItem>
						{
							getFieldDecorator('captcha',{
								rules:[{
									required:true,
									whitespace:true,
									message:'验证码不能为空！'
								},{
									length:true,
									max:4,
									message:'验证码长度不超过4位！'
								}]
							})(
								<Input placeholder='验证码'/>
							)
						}
						</FormItem>
					</Col>
					<Col span='9'>
						<Captcha url={url} OnRefresh={this.refreshCaptcha.bind(this)}/>
					</Col>
				</Row>
				<Row>
					<FormItem>
						<Button type='primary' size='large' htmlType='submit'>登录</Button>
					</FormItem>
				</Row>
				<Alert message='请使用谷歌、火狐浏览器，或极速模式的浏览器' type='info'/>
			</Form>
		)
	}
}

const EleLoginForm = Form.create()(LoginForm)

ReactDOM.render(
	<EleLoginForm />,
	document.getElementById('root')
)