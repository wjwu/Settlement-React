import React, {
	Component,
	PropTypes
} from 'react'
import {
	Radio
} from 'antd'
import * as apiClient from '../../apiClient'

const RadioGroup = Radio.Group

class RadioDictionary extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}

	componentDidMount() {
		let request = {
			type: this.props.type,
			enabled: true,
			pageIndex: 1,
			pageSize: 999
		}
		let that = this
		apiClient.get('dictionary', request).then(result => {
			that.setState({
				data: result.List || []
			})
		}, error => {
			console.error(error)
		})
	}

	render() {
		let radios = this.state.data.map(item => {
			return <Radio value={item.ID} key={item.ID}>{item.Name}</Radio>
		})
		return (
			<RadioGroup {...this.props}>
				{radios}
			</RadioGroup>
		)
	}
}

RadioDictionary.propTypes = {
	'type': PropTypes.string.isRequired
}
export default RadioDictionary