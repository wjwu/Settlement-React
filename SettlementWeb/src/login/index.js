import React from 'react'
import ReactDOM from 'react-dom'
import {
	Form,
	Input,
	Button,
	Row,
	Col
} from 'antd'

import Captcha from './Captcha'

import * as constants from './constants'
import * as actions from './action'

import {
	API_URL
} from './apiClient'

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
								message: constants.CAPTCHA_REREQUIRED
							}]
						}
					})
				})
			}
		})
	}

	checkCaptcha(rule, value, callback) {
		if (value) {
			const timeSpan = this.state.timeSpan
			actions.checkCaptcha(value, timeSpan).then(() => callback(), error => callback([new Error(error)]))
		} else {
			callback()
		}
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

		const url = `${API_URL}captcha?t=${timeSpan}`

		return (
			<Form onSubmit={this.submit.bind(this)}>
				<FormItem>
					<h1>结算系统</h1>
				</FormItem>
				<FormItem hasFeedback>
				{
					getFieldDecorator('account',{
						rules:[{
							required:true,
							whitespace:true,
							message:constants.ACCOUNT_REQUIRED
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
							message:constants.PASSWORD_REQUIRED
						}]
					})(
						<Input type='password' placeholder='密码' />
					)
				}
				</FormItem>
				<Row>
					<Col span='15'>
						<FormItem hasFeedback>
						{
							getFieldDecorator('captcha',{
								rules:[{
									required:true,
									whitespace:true,
									message:constants.CAPTCHA_REQUIRED
								},{
									validator:this.checkCaptcha.bind(this)
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
				<Button type='primary' size='large' htmlType='submit'>登录</Button>
			</Form>
		)
	}
}

const EleLoginForm = Form.create()(LoginForm)

ReactDOM.render(
	<EleLoginForm />,
	document.getElementById('root')
)