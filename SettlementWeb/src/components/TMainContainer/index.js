import React, {
	Component
} from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.scss'

class TMainContainer extends Component {
	render() {
		return (
			<div styleName='main-container'>
				{this.props.children}
			</div>
		)
	}
}

export default CSSModules(TMainContainer, styles)