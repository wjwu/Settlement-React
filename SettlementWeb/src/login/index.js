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
import {
	API_URL,
	BEGIN_CHECK_CAPTCHA,
	CHECK_CAPTCHA_SUCCESS,
	CHECK_CAPTCHA_FAIL
} from './constants'
import captchActionCreator from './actions/captcha'
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
		this.props.form.validateFields((errors, values) => {
			if (!errors) {
				console.log('success')
			}
		})
	}

	checkCaptcha(rule, value, callback) {
		if (value) {
			this.props.checkCaptcha(value, this.props.captchaReducer.timeSpan)
		}
		callback()
	}

	render() {
		const {
			getFieldDecorator
		} = this.props.form
		const checkStatus = this.props.loginReducer.checkStatus
		let validateStatus
		let help = '请输入验证码！'
		if (checkStatus === BEGIN_CHECK_CAPTCHA) {
			validateStatus = 'validating'
		} else if (checkStatus === CHECK_CAPTCHA_SUCCESS) {
			validateStatus = 'success'
		} else if (checkStatus === CHECK_CAPTCHA_FAIL) {
			validateStatus = 'error'
			help = '验证码错误！'
		}
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
							message:'请输入用户名！'
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
							message:'请输入密码！'
						}]
					})(
						<Input type='password' placeholder='密码' />
					)
				}
				</FormItem>
				<Row>
					<Col span='15'>
						<FormItem hasFeedback validateStatus={validateStatus}>
						{
							getFieldDecorator('captcha',{
								rules:[{
									required:true,
									whitespace:true,
									message:'请输入验证码！'
								},{
									validator:this.checkCaptcha.bind(this),
									message:'请输入验ssss证码！'
								}]
							})(
								<Input placeholder='验证码'/>
							)
						}
						</FormItem>
					</Col>
					<Col span='9'>
						<Captcha url={`${API_URL}captcha`}/>
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

// const mapDispatchToProps = dispatch => {
// 	return {
// 		checkCaptcha: (captcha, timespan) => {
// 			return captchActionCreator.check(captcha, timespan)
// 		}
// 	}
// }

const EleLoginForm = connect(mapStateToProps, {
	checkCaptcha: captchActionCreator.check
})(Form.create()(LoginForm))

ReactDOM.render(
	<Provider store={store}>
		<EleLoginForm />
	</Provider>,
	document.getElementById('root')
)