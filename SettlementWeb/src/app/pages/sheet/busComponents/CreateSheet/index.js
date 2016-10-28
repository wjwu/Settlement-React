import React, {
	Component,
	PropTypes
} from 'react'
import {
	connect
} from 'react-redux'
import {
	Modal,
	Form,
	Input,
	Select,
	Radio,
	Row,
	Col,
	InputNumber,
	DatePicker
} from 'antd'

const Option = Select.Option
const FormItem = Form.Item
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker

import DictionaryAction from '../../../../actions/Dictionary'
const dictionary = new DictionaryAction()

const disabledDate = current => {
	return current && current.valueOf() > Date.now()
}

const disabledTime = (time, type) => {
	if (type === 'start') {
		return {
			disabledHours() {
				return newArray(0, 60).splice(4, 20)
			},
			disabledMinutes() {
				return newArray(30, 60)
			},
			disabledSeconds() {
				return [55, 56]
			},
		}
	}
	return {
		disabledHours() {
			return newArray(0, 60).splice(20, 4)
		},
		disabledMinutes() {
			return newArray(0, 31)
		},
		disabledSeconds() {
			return [55, 56]
		},
	}
}

class CreateSheet extends Component {
	constructor(prop) {
		super(prop)
		this.submit = this.submit.bind(this)
		this.cancel = this.cancel.bind(this)
		this.calcUnitPrice = this.calcUnitPrice.bind(this)
	}

	componentDidMount() {
		this.props.queryDictionary({
			type: 'base',
			pageIndex: 1,
			pageSize: 999
		})
	}

	submit() {
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
				let costPrice = getFieldValue('costPrice')
				let remark = getFieldValue('remark')
				this.props.onSubmit({
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
					costPrice,
					remark
				})
			}
		})
	}

	cancel() {
		this.props.onCancel()
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

	render() {
		const {
			getFieldDecorator,
			getFieldProps
		} = this.props.form
		const {
			loading
		} = this.props

		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 16
			},
		}
		const result = this.props.dictionary.result
		let bases = []
		if (result && result.TotalCount > 0) {
			bases = result.List.map(item => {
				return <Option key={item.ID} value={item.ID}>{item.Name}</Option>
			})
		}
		return (
			<Modal title='新增结算表' visible={true} width={800} confirmLoading={loading} onOk={this.submit} onCancel={this.cancel}>
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
					 			<Select placeholder='请选择培训基地' {...getFieldProps('base',{rules:[{required:true,message:'请选择培训基地！'}]})}>
						            {bases}
					          	</Select>
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
								<RangePicker {...getFieldProps('times',{rules:[{required:true,type:'array',message:'请选择培训时间！'}]})} format='YYYY-MM-DD' disabledDate={disabledDate} disabledTime={disabledTime}/>
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
						<Col xs={12}>
							<FormItem {...formItemLayout} label='总成本'>
								{
									getFieldDecorator('costPrice',{
										initialValue:0,
										rules:[{required:true},{
												range:true,
												min:1,
												type:'number',
												message:'请输入总成本！'
											}]
										})(<InputNumber min={0}/>)
								}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<FormItem {...formItemLayout} label='客户来源'>
								{
									getFieldDecorator('source',{initialValue:'EC95F7AA-2448-472E-A429-7EAD93360226'})
									(
										<RadioGroup>
									        <Radio value='EC95F7AA-2448-472E-A429-7EAD93360226'>电话开发</Radio>
									        <Radio value='E0C97EE9-4980-45D5-AD3D-FDC080072E1A'>百度咨询</Radio>
									        <Radio value='DFC79585-F391-46A0-B8FA-83E01A51A8D8'>客户介绍</Radio>
									        <Radio value='3D9217B0-2350-4886-989C-30CCF33B2ED9'>老客户</Radio>
									        <Radio value='763DA71B-4CBA-4217-8644-388C8031006B'>渠道</Radio>
									        <Radio value='446BA72D-4D23-4274-89E1-0D9E5291ECFF'>其他</Radio>
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
			</Modal>
		)
	}
}

CreateSheet.defaultProps = {
	loading: false
}

CreateSheet.propTypes = {
	loading: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired
}

export default connect(state => state, {
	'queryDictionary': dictionary.query.bind(dictionary)
})(Form.create()(CreateSheet))