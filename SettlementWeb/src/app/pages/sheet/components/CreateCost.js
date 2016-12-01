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
	InputNumber
} from 'antd'
import {
	random
} from '../../../common'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option

class CreateCost extends Component {
	constructor(props) {
		super(props)
		this.submit = this.submit.bind(this)
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
				const unit = getFieldValue('unit')
				const amount = getFieldValue('amount')
				const status = getFieldValue('status')
				const remark = getFieldValue('remark')
				this.props.onCancel({
					ID: random(),
					Type: type,
					TypeName: name,
					Unit: unit,
					Amount: amount,
					Status: status,
					Remark: remark,
					Total: unit * amount
				}, 'create')
			}
		})
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
		const {
			costs,
			onCancel
		} = this.props

		return (
			<Modal title='新增结算明细' visible={true} width={460} onOk={this.submit} onCancel={onCancel}>
				<Form>
					<FormItem {...formItemLayout} label='明细类型'>
					{
						getFieldDecorator('type',{
							rules:[{
								required:true,
								message:'明细类型不能为空！'
							}]
						})(
							<Select placeholder='请选择明细类型' onSelect={this.select}>
								{
									costs.map(item => <Option key={item.ID} value={item.ID}>{item.Name}</Option>)
								}
							</Select>
						)
					}
					</FormItem>
					<FormItem {...formItemLayout} label='单价'>
					{
						getFieldDecorator('unit',{
							initialValue:0,
							rules:[{
								required:true
							},{
								range:true,
								min:1,
								type:'number',
								message:'单价必须大于0！'
							}]
						})(<InputNumber min={0} step={0.1}/>)
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
	costs: PropTypes.array.isRequired,
	onCancel: PropTypes.func.isRequired
}

export default Form.create()(CreateCost)