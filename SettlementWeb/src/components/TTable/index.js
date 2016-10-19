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
			title,
			columns,
			loading,
			total,
			data,
			onLoad
		} = this.props

		pagination.total = total
		pagination.onChange = current => {
			onLoad(current)
		}

		return (
			<TCard title={title}>
				<Table columns={columns} dataSource={data} pagination={pagination} loading={loading}/>
			</TCard>
		)
	}
}

TTable.defaultProps = {
	columns: [],
	data: []
}

TTable.propTypes = {
	title: PropTypes.string,
	columns: PropTypes.array,
	loading: PropTypes.bool,
	total: PropTypes.number,
	data: PropTypes.array,
	onLoad: PropTypes.func
}

export default TTable