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

import sheet from '../../../../actions/Sheet'
import dictionary from '../../../../actions/Dictionary'
import group from '../../../../actions/Group'

const EMPTY_GUID = '00000000-0000-0000-0000-000000000000'
const Option = Select.Option
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker

class SearchPanel extends Component {
	constructor(props) {
		super(props)
		this.query = this.query.bind(this)
		this.change = this.change.bind(this)
		this.showModal = this.showModal.bind(this)
		this.hideModal = this.hideModal.bind(this)
		this.state = {
			showCreate: false
		}
	}

	componentDidMount() {
		this.props.queryDictionary({
			type: 'base',
			enabled: true,
			pageIndex: 1,
			pageSize: 999
		})
		this.props.queryGroup({
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
			this.props.querySheet({
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

	change(value) {
		this.selectedGroup = value
	}

	showModal() {
		this.setState({
			showCreate: true
		})
	}

	hideModal(type) {
		this.setState({
			showCreate: false
		})
	}

	render() {
		const {
			getFieldDecorator,
			getFieldProps
		} = this.props.form

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

		let results = this.props.group.results
		let groups = []
		if (results && results.List) {
			const loop = (parentId) => results.List.filter(item => item.ParentID === parentId).map(item => {
				item.children = loop(item.ID)
				return item
			})

			groups = loop(EMPTY_GUID)
		}

		results = this.props.dictionary.results
		let bases = []
		if (results && results.TotalCount > 0) {
			bases = results.List.map(item => {
				return <Option key={item.ID} value={item.ID}>{item.Name}</Option>
			})
			bases.unshift(<Option key='all' value=''>{`全部`}</Option>)
		}

		let modal
		if (this.state.showCreate) {
			modal = <CreateSheet onCancel={this.hideModal}/>
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
							<RangePicker {...getFieldProps('times')} format='YYYY-MM-DD' allowClear/>
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
						<Button type='primary' icon='search' className='button' onClick={this.query}>查询</Button>
						<Button type='primary' icon='plus-circle-o' onClick={this.showModal}>新增结算表</Button>
						{modal}
					</Col>
				</Row>
			</Form>
		)
	}
}

export default connect(state => state, {
	'queryDictionary': dictionary.query.bind(dictionary),
	'queryGroup': group.query.bind(group),
	'querySheet': sheet.query.bind(sheet)
})(Form.create()(SearchPanel))