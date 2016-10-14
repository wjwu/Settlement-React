import React from 'react'
import ReactDOM from 'react-dom'
import {
	createStore,
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
import captchaReducer from '../components/Captcha/reducer'

const FormItem = Form.Item
const InputGroup = Input.Group
const CAPTCHA_URL = 'http://localhost:10011/api/captcha'
const store = createStore(captchaReducer, applyMiddleware(thunk))

class LoginForm extends React.Component {
	handleSubmit(e) {
		e.preventDefault()
		this.props.form.validateFields((errors, values) => {
			if (!errors) {
				console.log('success')
			}
		})
	}

	render() {
		const {
			getFieldDecorator
		} = this.props.form

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
						<FormItem>
						{
							getFieldDecorator('captcha',{
								rules:[{
									required:true,
									whitespace:true,
									message:'请输入验证码！'
								}]
							})(
								<Input placeholder='验证码'/>
							)
						}
						</FormItem>
					</Col>
					<Col span='9'>
						<Captcha url={CAPTCHA_URL}/>
					</Col>
				</Row>
				<Button type='primary' htmlType='button' onClick={this.handleSubmit.bind(this)}>登录</Button>
			</Form>
		)
	}
}

const mapStateToProps = (state) => {
	return state
}

const mapDispatchToProps = (dispatch, props) => {
	return props
}

const EleLoginForm = connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginForm))

ReactDOM.render(
	<Provider store={store}>
		<EleLoginForm />
	</Provider>,
	document.getElementById('root')
)