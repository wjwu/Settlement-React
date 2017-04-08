import React, { Component, PropTypes } from 'react'
import { Table } from 'antd'
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

		if (this.props.pagination === false) {
			return (
				<Table {...this.props}/>
			)
		}

		pagination.total = total
		pagination.onChange = current => {
			onLoad(current)
		}
		return (
			<Table pagination={pagination} {...this.props}/>
		)
	}
}

TTable.propTypes = {
	total: PropTypes.number,
	onLoad: PropTypes.func
}

export default TTable