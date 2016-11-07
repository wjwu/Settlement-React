import React, {
	Component,
	PropTypes
} from 'react'
import {
	Modal,
	Form,
	Input,
	Radio,
	Button,
	InputNumber
} from 'antd'
import {
	SelectDictionary
} from '../../../components'
import {
	random
} from '../../../common'

const FormItem = Form.Item
const RadioGroup = Radio.Group

class CreateCost extends Component {
	constructor(props) {
		super(props)
		this.submit = this.submit.bind(this)
		this.cancel = this.cancel.bind(this)
		this.select = this.select.bind(this)
	}

	submit() {
		const {
			validateFields,
			getFieldValue
		} = this.props.form

		validateFields((errors, values) => {
			if (!errors) {
				const type = getFieldValue('type')
				const name = this.selectName
				const unitPrice = getFieldValue('unitPrice')
				const amount = getFieldValue('amount')
				const status = getFieldValue('status')
				const remark = getFieldValue('remark')
				this.props.onCancel({
					ID: random(),
					Type: type,
					TypeName: name,
					UnitPrice: unitPrice,
					Amount: amount,
					Status: status,
					Remark: remark,
					Total: unitPrice * amount
				}, 'create')
			}
		})
	}

	cancel() {
		this.props.onCancel()
	}

	select(value, option) {
		this.selectName = option.props.children
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

		return (
			<Modal title='新增结算明细' visible={true} width={460} onOk={this.submit} onCancel={this.cancel}>
				<Form>
					<FormItem {...formItemLayout} label='明细类型'>
					{
						getFieldDecorator('type',{
							rules:[{
								required:true,
								message:'请选择明细类型！'
							}]
						})(
							<SelectDictionary type='cost' placeholder='请选择明细类型' onSelect={this.select}/>
						)
					}
					</FormItem>
					<FormItem {...formItemLayout} label='单价'>
					{
						getFieldDecorator('unitPrice',{
							initialValue:0,
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
							initialValue:0,
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
						getFieldDecorator('remark')(
							<Input type='textarea' rows={4}/>
						)
					}
					</FormItem>
				</Form>
			</Modal>
		)
	}
}

CreateCost.propTypes = {
	onCancel: PropTypes.func.isRequired
}

export default Form.create()(CreateCost)