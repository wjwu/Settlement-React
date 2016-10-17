import React from 'react'
import {
	connect
} from 'react-redux'
import refresh from './action'

class Captcha extends React.Component {
	handleClick(e) {
		e.preventDefault()
		this.props.refresh()
	}

	render() {
		const style = {
			cursor: 'pointer'
		}
		return <img src={this.props.url} onClick={this.handleClick.bind(this)} style={style} alt='看不清楚？换一张' title='看不清楚？换一张'/>
	}
}

Captcha.propTypes = {
	url: React.PropTypes.string
}

const mapStateToProps = state => {
	return state
}

export default connect(mapStateToProps, {
	refresh
})(Captcha)