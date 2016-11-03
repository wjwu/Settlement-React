import React, {
	Component,
	PropTypes
} from 'react'
import {
	Modal,
	Form,
	Input,
	Select,
	Radio,
	Button,
	InputNumber
} from 'antd'

const Option = Select.Option
const FormItem = Form.Item
const RadioGroup = Radio.Group

class UpdateCost extends Component {
	constructor(props) {
		super(props)
		this.submit = this.submit.bind(this)
		this.cancel = this.cancel.bind(this)
	}

	submit() {
		const {
			validateFields,
			getFieldValue
		} = this.props.form

		validateFields((errors, values) => {
			if (!errors) {
				const type = getFieldValue('type')
				const selectedCost = this.props.costs.filter(item => {
					return item.ID === type
				})
				const name = selectedCost[0].Name
				const unitPrice = getFieldValue('unitPrice')
				const amount = getFieldValue('amount')
				const status = getFieldValue('status')
				const remark = getFieldValue('remark')
				this.props.onCancel({
					ID: this.props.data.ID,
					Type: type,
					TypeName: name,
					UnitPrice: unitPrice,
					Amount: amount,
					Status: status,
					Remark: remark,
					Total: unitPrice * amount
				}, 'update')
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

		const getFieldDecorator = this.props.form.getFieldDecorator
		const cost = this.props.data
		const costs = this.props.costs.map(item => {
			return <Option key={item.ID} value={item.ID}>{item.Name}</Option>
		})

		return (
			<Modal title='新增结算明细' visible={true} width={460} onOk={this.submit} onCancel={this.cancel}>
				<Form>
					<FormItem {...formItemLayout} label='明细类型'>
					{
						getFieldDecorator('type',{
							initialValue:cost.Type,
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
							initialValue:cost.UnitPrice,
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
							initialValue:cost.Amount,
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
							initialValue:cost.Status,
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
							initialValue:cost.Remark
						})(
							<Input type='textarea' rows={4}/>
						)
					}
					</FormItem>
				</Form>
			</Modal>
		)
	}
}

UpdateCost.propTypes = {
	data: PropTypes.object.isRequired,
	costs: PropTypes.array.isRequired,
	onCancel: PropTypes.func.isRequired
}

export default Form.create()(UpdateCost)