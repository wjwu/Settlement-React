import React, {
	Component,
	PropTypes
} from 'react'

class Captcha extends Component {
	constructor(props) {
		super(props)
		this.click = this.click.bind(this)
	}

	click(e) {
		e.preventDefault()
		this.props.OnRefresh()
	}

	render() {
		const style = {
			cursor: 'pointer'
		}

		const {
			url
		} = this.props

		return <img src={url} onClick={this.click} style={style} alt='看不清楚？换一张' title='看不清楚？换一张'/>
	}
}

Captcha.propTypes = {
	url: PropTypes.string.isRequired,
	OnRefresh: PropTypes.func.isRequired
}

export default Captcha