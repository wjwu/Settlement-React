import React, {
	Component,
	PropTypes
} from 'react'
import {
	connect
} from 'react-redux'
import {
	Form,
	Input,
	Select,
	Row,
	Col,
	DatePicker,
	Button
} from 'antd'
import TTreeSelect from '../../../../../components/TTreeSelect'
import CreateSheet from '../CreateSheet'

import group from '../../../../actions/Group'

import {
	getResult,
	tree,
	EMPTY_GUID,
	disabledTime,
	disabledDate
} from '../../../../common'

const Option = Select.Option
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker

const queryGroup = 'queryGroup'

class SearchPanel extends Component {
	constructor(props) {
		super(props)
		this.query = this.query.bind(this)
		this.change = this.change.bind(this)
		this.search = this.search.bind(this)
		this.showModal = this.showModal.bind(this)
		this.hideModal = this.hideModal.bind(this)
		this.state = {
			showCreate: false
		}
	}

	componentDidMount() {
		this[queryGroup] = this.props.queryGroup({
			pageIndex: 1
		})
	}

	query() {
		const {
			validateFields,
			getFieldValue
		} = this.props.form
		validateFields((errors, values) => {
			let group = this.selectedGroup || ''
			let base = getFieldValue('base')
			let times = getFieldValue('times')
			let timeFrom = ''
			let timeTo = ''
			if (times && times.length === 2) {
				timeFrom = times[0].format('YYYY-MM-DD')
				timeTo = times[1].format('YYYY-MM-DD')
			}
			let customName = getFieldValue('customName') || ''
			let auditStatus = getFieldValue('auditStatus')
			let payStatus = getFieldValue('payStatus')
			this.props.onSearch({
				group,
				base,
				timeFrom,
				timeTo,
				customName,
				auditStatus,
				payStatus
			})
		})
	}
	search() {
		this.props.onSearch()
	}

	change(value) {
		this.selectedGroup = value
	}

	showModal() {
		this.setState({
			showCreate: true
		})
	}

	hideModal() {
		this.setState({
			showCreate: false
		})
	}

	render() {
		const getFieldDecorator = this.props.form.getFieldDecorator

		const formItemLayout = {
			labelCol: {
				span: 5
			},
			wrapperCol: {
				span: 19
			},
		}

		const colLayout = {
			xs: 24,
			sm: 12,
			md: 12,
			lg: 6
		}

		let result = getResult(this[queryGroup], this.props.group.results)
		let groups = tree(result.data, EMPTY_GUID)

		let bases = this.props.bases.map(item => {
			return <Option key={item.ID} value={item.ID}>{item.Name}</Option>
		})
		bases.unshift(<Option key='all' value=''>{`全部`}</Option>)

		let modal
		if (this.state.showCreate) {
			modal = <CreateSheet onCancel={this.hideModal} bases={this.props.bases}/>
		}

		return (
			<Form horizontal>
				<Row gutter={24}>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='部门'>
							<TTreeSelect data={groups} dropdownStyle={{maxHeight:400,overflow:'auto'}} treeDefaultExpandAll onChange={this.change}/>
						</FormItem>
					</Col>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='培训基地'>
						{
							getFieldDecorator('base',{initialValue:''})
							(
								<Select>
								{bases}
								</Select>
							)
						}
						</FormItem>
					</Col>
					<Col {...colLayout}>
						<FormItem {...formItemLayout}  label='培训时间'>
						{
							getFieldDecorator('times')(<RangePicker format='YYYY-MM-DD' disabledDate={disabledDate} disabledTime={disabledTime} allowClear/>)
						}
						</FormItem>
					</Col>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='客户名称'>
						{
							getFieldDecorator('customName')(<Input />)
						}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={24}>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='审核状态'>
						{
							getFieldDecorator('auditStatus',{initialValue:''})
							(
								<Select>
									<Option value=''>全部</Option>
									<Option value='UnSubmit'>未提交</Option>
									<Option value='Auditing'>审核中</Option>
									<Option value='Pass'>通过</Option>
									<Option value='Fail'>未通过</Option>
								</Select>
							)
						}
						</FormItem>
					</Col>
					<Col {...colLayout}>
						<FormItem {...formItemLayout} label='付款状态'>
							{
								getFieldDecorator('payStatus',{initialValue:''})
								(
									<Select>
										<Option value=''>全部</Option>
										<Option value='Paid'>已付清</Option>
										<Option value='Unpaid'>未付清</Option>
									</Select>
								)
							}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col style={{ textAlign: 'right' }}>
						<Button type='primary' icon='reload' className='button' onClick={this.search}>刷新</Button>
						<Button type='primary' icon='search' className='button' onClick={this.query}>查询</Button>
						<Button type='primary' icon='plus-circle-o' onClick={this.showModal}>新增结算表</Button>
						{modal}
					</Col>
				</Row>
			</Form>
		)
	}
}

SearchPanel.propTypes = {
	bases: PropTypes.array.isRequired,
	onSearch: PropTypes.func.isRequired
}

export default connect(state => state, {
	'queryGroup': group.query.bind(group)
})(Form.create()(SearchPanel))