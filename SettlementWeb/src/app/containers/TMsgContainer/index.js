import React, {
	Component
} from 'react'
import {
	message
} from 'antd'

const showGlobleMsg = (type, msg) => {
	if (type === 'success') {
		message.success(msg, 5)
	} else if (type === 'error') {
		message.error(msg, 5)
	} else if (type === 'info') {
		message.info(msg, 5)
	} else if (type === 'warning') {
		message.warning(msg, 5)
	} else if (type === 'warn') {
		message.warn(msg, 5)
	}
}

const TMsgContainer = () => {
	return Comp => {
		return class extends Component {
			componentDidUpdate() {
				const {
					type,
					msg
				} = this.props.message

				showGlobleMsg(type, msg)
			}
			render() {
				return (<Comp {...this.props} showGlobleMsg={showGlobleMsg}/>)
			}
		}
	}
}

export default TMsgContainer