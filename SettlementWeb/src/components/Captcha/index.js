import React from 'react'
import {
	connect
} from 'react-redux'
import refreshCaptcha from './action'

const createCaptchaId = () => {
	let strRand = Math.random() + ''
	return strRand.substr(2, strRand.length - 2)
}

class Captcha extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			t: createCaptchaId()
		}
	}

	componentDidMount() {
		this.props.onRefresh(this.state.t)
	}

	handleClick(e) {
		e.preventDefault()
		let t = createCaptchaId()
		this.props.onRefresh(t)
		this.setState({
			t: t
		})
	}

	render() {
		const url = `${this.props.url}?t=${this.state.t}`
		const style = {
			cursor: 'pointer'
		}
		return <img src={url} onClick={this.handleClick.bind(this)} style={style} alt='看不清楚？换一张' title='看不清楚？换一张'/>
	}
}

Captcha.propTypes = {
	url: React.PropTypes.string
}

const mapStateToProps = state => {
	return state
}

const mapDispatchToProps = dispatch => {
	return {
		onRefresh: captchaId => {
			dispatch(refreshCaptcha(captchaId))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Captcha)