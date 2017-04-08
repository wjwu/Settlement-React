import React, { PropTypes } from 'react'

const Captcha = (props) => {
	const handleClick = (e) => {
		e.preventDefault()
		props.OnRefresh()
	}
	return <img src={props.url} onClick={handleClick} style={{cursor: 'pointer'}} alt='看不清楚？换一张' title='看不清楚？换一张'/>
}

Captcha.propTypes = {
	url: PropTypes.string.isRequired,
	OnRefresh: PropTypes.func.isRequired
}

export default Captcha