import React, { PropTypes } from 'react'
import { Card } from 'antd'

const TCard = (props) => {
	return (
		<Card title={props.title} bodyStyle={{ padding: 15 }}>
			{props.children}
		</Card>
	)
}

TCard.propTypes = {
	title: PropTypes.string
}

export default TCard