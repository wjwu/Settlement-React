import React, {
	Component,
	PropTypes
} from 'react'
import {
	Table
} from 'antd'
import TCard from '../TCard'

let pagination = {
	showQuickJumper: true
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
		if (this.props.pagination === false) {
			return (
				<Table {...this.props}/>
			)
		}
		return (
			<Table pagination={pagination} {...this.props}/>
		)
	}
}

TTable.propTypes = {
	total: PropTypes.number.isRequired,
	onLoad: PropTypes.func.isRequired
}

export default TTable