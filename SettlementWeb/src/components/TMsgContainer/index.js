import React, {
	Component
} from 'react'
import {
	message
} from 'antd'

const TMsgContainer = () => {
	return Comp => {
		return class extends Component {
			componentDidUpdate() {
				const {
					msgType,
					msg
				} = this.props.message

				if (msgType === 'success') {
					message.success(msg, 5)
				} else if (msgType === 'error') {
					message.error(msg, 10)
				} else if (msgType === 'info') {
					message.info(msg, 10)
				} else if (msgType === 'warning') {
					message.warning(msg, 10)
				} else if (msgType === 'warn') {
					message.warn(msg, 10)
				}
			}
			render() {
				return (<Comp {...this.props}/>)
			}
		}
	}
}

export default TMsgContainer