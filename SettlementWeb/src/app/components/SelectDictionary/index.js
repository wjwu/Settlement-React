import React, {
	Component,
	PropTypes
} from 'react'
import {
	Select
} from 'antd'
import * as apiClient from '../../apiClient'

const Option = Select.Option

class SelectDictionary extends Component {
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
		let bases = this.state.data.map(item => {
			return <Option key={item.ID} value={item.ID}>{item.Name}</Option>
		})
		if (bases.length > 0 && this.props.all) {
			bases.unshift(<Option key='all' value=''>{`全部`}</Option>)
		}
		return (
			<Select {...this.props}>
				{bases}
			</Select>
		)
	}
}

SelectDictionary.defaultProps = {
	'all': false
}

SelectDictionary.propTypes = {
	'all': PropTypes.bool,
	'type': PropTypes.string.isRequired
}
export default SelectDictionary