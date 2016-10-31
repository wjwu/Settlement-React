import React, {
	Component,
	PropTypes
} from 'react'
import {
	Table
} from 'antd'
import TCard from '../TCard'

let pagination = {
	showQuickJumper: true,
	onChange(current) {
		getUsers(that.selectedNodeId, current)
	}
}

class TTable extends Component {
	render() {
		const {
			total,
			onLoad
		} = this.props

		pagination.total = total
		pagination.onChange = current => {
			onLoad(current)
		}

		return (
			<Table {...this.props}/>
		)
	}
}

TTable.propTypes = {
	total: PropTypes.number.isRequired,
	onLoad: PropTypes.func.isRequired
}

export default TTable