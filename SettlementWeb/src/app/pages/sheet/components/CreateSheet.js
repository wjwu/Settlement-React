import React, {
	Component,
	PropTypes
} from 'react'
import {
	Modal,
	Form,
	Input,
	Button,
	Select,
	Radio,
	Row,
	Col,
	InputNumber,
	DatePicker,
	Tabs
} from 'antd'
import {
	TTable
} from '../../../../components'
import CreateCost from './CreateCost'
import UpdateCost from './UpdateCost'
import CreateReceived from './CreateReceived'
import UpdateReceived from './UpdateReceived'
import {
	genCostColumns,
	genReceivedColumns
} from './columns'
import {
	disabledTime,
	disabledDate
} from '../../../common'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const Option = Select.Option
const TabPane = Tabs.TabPane
const RadioGroup = Radio.Group

const createCost = 'createCost'
const updateCost = 'updateCost'
const createReceived = 'createReceived'
const updateReceived = 'updateReceived'

class CreateSheet extends Component {
	constructor(prop) {
		super(prop)
		this.calcUnitPrice = this.calcUnitPrice.bind(this)
		this.state = {
			[createCost]: false,
			[updateCost]: false,
			[createReceived]: false,
			[updateReceived]: false,
			costs: [],
			receiveds: []
		}
	}

	submit(type) {
		const {
			validateFields,
			getFieldValue
		} = this.props.form

		validateFields((errors, values) => {
			if (!errors) {
				let customName = getFieldValue('customName')
				let contacts = getFieldValue('contacts')
				let phone = getFieldValue('phone')
				let qq = getFieldValue('qq')
				let weixin = getFieldValue('weixin')
				let address = getFieldValue('address')
				let source = getFieldValue('source')
				let base = getFieldValue('base')
				let times = getFieldValue('times')
				let timeFrom = times[0].format('YYYY-MM-DD HH:mm:ss')
				let timeTo = times[1].format('YYYY-MM-DD HH:mm:ss')
				let people = getFieldValue('people')
				let totalPrice = getFieldValue('totalPrice')
				let remark = getFieldValue('remark')
				let costs = this.state.costs
				let receiveds = this.state.receiveds
				let submit = type === 'submit'
				this.props.createSheet({
					customName,
					contacts,
					phone,
					qq,
					weixin,
					address,
					source,
					base,
					timeFrom,
					timeTo,
					people,
					totalPrice,
					remark,
					costs,
					receiveds,
					submit
				})
			}
		})
	}

	calcUnitPrice() {
		const {
			getFieldValue,
			setFieldsValue
		} = this.props.form

		let people = getFieldValue('people')
		let totalPrice = getFieldValue('totalPrice')
		if (people > 0 && totalPrice > 0) {
			let unitPrice = totalPrice / people
			setFieldsValue({
				'unitPrice': unitPrice
			})
		}
	}

	showModal(type) {
		this.setState({
			[type]: true
		})
	}

	hideModal(type, result, action) {
		this.state[type] = false
		if (result && (type === createCost || type === updateCost)) {
			let costs = this.state.costs
			if (action === 'create') {
				costs.push(result)
			} else if (action === 'update') {
				let idx = costs.indexOf(this.selectedCost)
				costs.splice(idx, 1, result)
			}
			this.state.costs = costs
		} else if (result && (type === createReceived || type === updateReceived)) {
			let receiveds = this.state.receiveds
			if (action === 'create') {
				receiveds.push(result)
			} else if (action === 'update') {
				let idx = receiveds.indexOf(this.selectedReceived)
				receiveds.splice(idx, 1, result)
			}
			this.state.receiveds = receiveds
		}
		this.setState({
			...this.state
		})
	}

	render() {
		const getFieldDecorator = this.props.form.getFieldDecorator
		const creating = this.props.sheet.creating
		const {
			bases,
			sources,
			costs: costTypes
		} = this.props.dictionary

		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 16
			},
		}

		const costColumns = genCostColumns((raw, action) => {
			this.selectedCost = raw
			if (action === 'update') {
				this.showModal(updateCost)
			} else {
				let costs = this.state.costs
				let idx = costs.indexOf(raw)
				costs.splice(idx, 1)
				this.state.costs = costs
				this.setState({
					...this.state
				})
			}
		})
		const receivedColumns = genReceivedColumns((raw, action) => {
			this.selectedReceived = raw
			if (action === 'update') {
				this.showModal(updateReceived)
			} else {
				let receiveds = this.state.receiveds
				let idx = receiveds.indexOf(raw)
				receiveds.splice(idx, 1)
				this.state.receiveds = receiveds
				this.setState({
					...this.state
				})
			}
		})
		let costs = this.state.costs
		let receiveds = this.state.receiveds
		let modal
		if (this.state[createCost]) {
			modal = <CreateCost onCancel = {this.hideModal.bind(this,createCost)} costs={costTypes}/>
		} else if (this.state[updateCost]) {
			modal = <UpdateCost onCancel = {this.hideModal.bind(this,updateCost)} costs={costTypes} cost={this.selectedCost}/>
		} else if (this.state[createReceived]) {
			modal = <CreateReceived onCancel = {this.hideModal.bind(this,createReceived)}/>
		} else if (this.state[updateReceived]) {
			modal = <UpdateReceived onCancel = {this.hideModal.bind(this,updateReceived)} received={this.selectedReceived}/>
		}

		let footer =
			[
				<Button key='cancel' type='ghost' size='large' onClick={this.props.onCancel}>取消</Button>,
				<Button key='save' type='primary' size='large' loading={creating} onClick={this.submit.bind(this,'save')}>保存</Button>,
				<Button key='submit' type='primary' size='large' loading={creating} onClick={this.submit.bind(this,'submit')}>保存并提交</Button>
			]

		return (
			<Modal title='新增结算表' visible={true} width={900} footer={footer} onCancel={this.props.onCancel}>
				<Tabs tabPosition='left'>
					<TabPane tab='基本信息' key='baseInfo'> 
						<Form>
							<Row>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='客户名称'>
										{
											getFieldDecorator('customName',{
												rules:[{
														required:true,
														whitespace:true,
														message:'客户名称不能为空！'
													},{
														length:true,
														max:100,
														message:'客户名称最多100个字符！'
													}]
												})(<Input placeholder='请输入客户名称'/>)
										}
									</FormItem>
								</Col>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='培训基地'>
									{
										getFieldDecorator('base',{
											rules:[{
												required:true,
												message:'请选择培训基地！'
											}]
										})(
								 			<Select placeholder='请选择培训基地'>
								 			{
								 				bases.map(item => <Option key={item.ID} value={item.ID}>{item.Name}</Option>)
								 			}
								 			</Select>
							          	)
							        }
						          	</FormItem>
								</Col>
							</Row>
							<Row>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='联系人'>
										{
											getFieldDecorator('contacts',{
												rules:[{
														required:true,
														whitespace:true,
														message:'联系人不能为空！'
													},{
														length:true,
														max:20,
														message:'联系人最多20个字符！'
													}]
												})(<Input placeholder='请输入联系人'/>)
										}
									</FormItem>
								</Col>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='培训时间'>
									{
										getFieldDecorator('times',{
											rules:[{
												required:true,
												type:'array',
												message:'请选择培训时间！'
											}]
										})(<RangePicker format='YYYY-MM-DD' disabledDate={disabledDate} disabledTime={disabledTime}/>)
									}
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='手机号码'>
										{
											getFieldDecorator('phone',{
												rules:[{
														required:true,
														whitespace:true,
														message:'手机号码不能为空！'
													},{
														pattern:/^1[34578]\d{9}$/,
														message:'手机号码格式不正确！'
													}]
												})(<Input placeholder='请输入手机号码'/>)
										}
									</FormItem>
								</Col>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='培训人数'>
										{
											getFieldDecorator('people',{
												initialValue:0,
												rules:[{required:true},{
														range:true,
														min:1,
														type:'integer',
														message:'请输入培训人数！'
													}]
												})(<InputNumber min={0} onChange={this.calcUnitPrice} onBlur={this.calcUnitPrice}/>)
										}
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='QQ'>
										{
											getFieldDecorator('qq')(<Input/>)
										}
									</FormItem>
								</Col>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='总成交额'>
										{
											getFieldDecorator('totalPrice',{
												initialValue:0,
												rules:[{required:true},{
														range:true,
														min:1,
														type:'number',
														message:'请输入总成交额！'
													}]
												})(<InputNumber min={0} onChange={this.calcUnitPrice} onBlur={this.calcUnitPrice}/>)
										}
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='微信'>
										{
											getFieldDecorator('weixin')(<Input/>)
										}
									</FormItem>
								</Col>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='均价'>
										{
											getFieldDecorator('unitPrice',{initialValue:0})(<InputNumber disabled min={0}/>)
										}
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='客户地址'>
										{
											getFieldDecorator('address')(<Input/>)
										}
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='客户来源'>
										{
											getFieldDecorator('source',{
												rules:[{
													required:true,
													message:'请选择客户来源！'
												}]
											})
											(
												<RadioGroup>
													{
														sources.map(item=><Radio key={item.ID} value={item.ID}>{item.Name}</Radio>)	
													}
												</RadioGroup>
											)
										}
									</FormItem>
								</Col>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='备注'>
										{
											getFieldDecorator('remark')(<Input type='textarea' rows={4}/>)
										}
									</FormItem>
								</Col>
							</Row>
						</Form>
					</TabPane> 
					<TabPane tab='结算明细' key='costInfo'>
						<div style={{marginBottom:16,textAlign:'right'}}>
							<Button type='primary' icon='plus-circle-o' onClick={this.showModal.bind(this,createCost)}>新增明细</Button>
							{modal}
						</div>
						<TTable key='cost' bordered columns={costColumns} total={costs.length} dataSource={costs} pagination={false} onLoad={()=>{}}/>
					</TabPane> 
					<TabPane tab='收款明细' key='receivedInfo'>
						<div style={{marginBottom:16,textAlign:'right'}}>
							<Button type='primary' icon='plus-circle-o' onClick={this.showModal.bind(this,createReceived)}>新增明细</Button>
							{modal}
						</div>
						<TTable key='received' bordered columns={receivedColumns} total={receiveds.length} dataSource={receiveds} pagination={false} onLoad={()=>{}}/>
					</TabPane> 
				</Tabs>
			</Modal>
		)
	}
}

CreateSheet.propTypes = {
	onCancel: PropTypes.func.isRequired
}

export default Form.create()(CreateSheet)