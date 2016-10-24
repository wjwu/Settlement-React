import React, {
	Component
} from 'react'
import {
	Col
} from 'antd'
import styles from './index.scss'

class TCol extends Component {
	render() {
		return (
			<Col className={styles.col} {...this.props}>
				{this.props.children}
			</Col>
		)
	}
}

export default TCol