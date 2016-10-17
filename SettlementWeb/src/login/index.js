import React from 'react'
import ReactDOM from 'react-dom'
import {
	createStore,
	combineReducers,
	applyMiddleware
} from 'redux'
import {
	Provider,
	connect
} from 'react-redux'
import thunk from 'redux-thunk'
import {
	Form,
	Input,
	Button,
	Row,
	Col
} from 'antd'

import Captcha from '../components/Captcha'
import refresh from '../components/Captcha/action'

import * as constants from './constants'
import * as actions from './action'

import captchaReducer from '../components/Captcha/reducer'
import loginReducer from './reducer'

const FormItem = Form.Item
const InputGroup = Input.Group
const reducer = combineReducers({
	captchaReducer,
	loginReducer
})
const store = createStore(reducer, applyMiddleware(thunk))

class LoginForm extends React.Component {

	handleSubmit(e) {
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
				let timeSpan = this.props.captchaReducer.timeSpan
				let promise = this.props.login(account, password, captcha, timeSpan)
				promise.then(response => {
					let result = response.json()
					if (response.ok) {
						window.location.href = '/app'
					} else {
						this.props.refresh()
						setFields({
							account: {
								value: account,
								errors: [{
									message: constants.ACCOUNT_ERROR
								}]
							},
							captcha: {
								errors: [{
									message: constants.CAPTCHA_REREQUIRED
								}]
							}
						})
					}
				})
			}
		})
	}

	checkCaptcha(rule, value, callback) {
		if (value) {
			const {
				checkCaptcha,
				captchaReducer
			} = this.props

			let promise = checkCaptcha(value, captchaReducer.timeSpan)
			promise.then(response => {
				if (response.ok) {
					callback()
				} else {
					callback([new Error(constants.CAPTCHA_ERROR)])
				}
			})
		} else {
			callback()
		}
	}

	render() {
		const {
			getFieldDecorator
		} = this.props.form

		const {
			doRefresh,
			timeSpan
		} = this.props.captchaReducer

		const url = `${constants.API_URL}captcha?t=${timeSpan}`

		return (
			<Form>
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
						<Captcha url={url}/>
					</Col>
				</Row>
				<Button type='primary' htmlType='button' onClick={this.handleSubmit.bind(this)}>登录</Button>
			</Form>
		)
	}
}

const mapStateToProps = state => {
	return state
}

const EleLoginForm = connect(mapStateToProps, {
	...actions,
	refresh
})(Form.create()(LoginForm))

ReactDOM.render(
	<Provider store={store}>
		<EleLoginForm />
	</Provider>,
	document.getElementById('root')
)