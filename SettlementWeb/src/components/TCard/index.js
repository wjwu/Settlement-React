import React, {
	Component,
	PropTypes
} from 'react'
import {
	Card
} from 'antd'

class TCard extends Component {
	render() {

		return (
			<Card title={this.props.title} bodyStyle={{ padding: 15 }}>
				{this.props.children}
			</Card>
		)
	}
}

TCard.propTypes = {
	title: PropTypes.string
}

export default TCard