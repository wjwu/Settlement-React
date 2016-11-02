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
	Button,
	InputNumber,
	Spin
} from 'antd'

const Option = Select.Option
const FormItem = Form.Item
const RadioGroup = Radio.Group

import dictionary from '../../../../actions/Dictionary'

class UpdateCost extends Component {
	constructor(props) {
		super(props)
		this.submit = this.submit.bind(this)
		this.cancel = this.cancel.bind(this)
	}

	componentDidMount() {
		this.props.queryDictionary({
			type: 'Cost',
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
				const type = getFieldValue('type')
				const selectedCost = this.props.dictionary.results.List.filter(item => {
					return item.ID === type
				})
				const name = selectedCost[0].Name
				const unitPrice = getFieldValue('unitPrice')
				const amount = getFieldValue('amount')
				const status = getFieldValue('status')
				const remark = getFieldValue('remark')
				this.props.onCancel({
					id: this.props.data.id,
					name,
					type,
					unitPrice,
					amount,
					status,
					remark,
					total: unitPrice * amount
				}, 'edit')
			}
		})
	}

	cancel() {
		this.props.onCancel()
	}

	render() {
		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 16
			},
		}

		const {
			getFieldDecorator,
			getFieldProps
		} = this.props.form

		const results = this.props.dictionary.results

		const cost = this.props.data

		let modalBody = <Spin tip='Loading...'/>
		if (results) {
			const costs = results.List.map(item => {
				return <Option key={item.ID} value={item.ID}>{item.Name}</Option>
			})

			modalBody = (
				<Form>
					<FormItem {...formItemLayout} label='明细类型'>
					{
						getFieldDecorator('type',{
							initialValue:cost.type,
							rules:[{
								required:true,
								message:'请选择明细类型！'
							}]
						})(
							<Select placeholder='请选择明细类型'>
								{costs}
							</Select>
						)
					}
					</FormItem>
					<FormItem {...formItemLayout} label='单价'>
					{
						getFieldDecorator('unitPrice',{
							initialValue:cost.unitPrice,
							rules:[{
								required:true
							},{
								range:true,
								min:1,
								type:'integer',
								message:'单价必须大于0！'
							}]
						})(<InputNumber min={0}/>)
					}
					</FormItem>
					<FormItem {...formItemLayout} label='数量'>
					{
						getFieldDecorator('amount',{
							initialValue:cost.amount,
							rules:[{
								required:true
							},{
								range:true,
								min:1,
								type:'integer',
								message:'数量必须大于0！'
							}]
						})(<InputNumber min={0}/>)
					}
					</FormItem>
					<FormItem {...formItemLayout} label='付款状态'>
					{
						getFieldDecorator('status',{
							initialValue:cost.status,
							rules:[{
								required:true,
								message:'请选择付款状态！'
							}]
						})(
							<RadioGroup>
					            <Radio value='Paid'>已付款</Radio>
					            <Radio value='Unpaid'>未付款</Radio>
							</RadioGroup>
						)
					}
					</FormItem>
					<FormItem {...formItemLayout} label='备注'>
					{
						getFieldDecorator('remark',{
							initialValue:cost.remark
						})(
							<Input type='textarea' rows={4}/>
						)
					}
					</FormItem>
				</Form>
			)
		}
		return (
			<Modal title='新增结算明细' visible={true} width={460} onOk={this.submit} onCancel={this.cancel}>
				{modalBody}
			</Modal>
		)
	}
}

UpdateCost.propTypes = {
	data: PropTypes.object.isRequired,
	onCancel: PropTypes.func.isRequired
}

export default connect(state => state, {
	'queryDictionary': dictionary.query.bind(dictionary)
})(Form.create()(UpdateCost))