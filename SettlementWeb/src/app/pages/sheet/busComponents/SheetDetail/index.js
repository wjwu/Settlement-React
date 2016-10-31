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
	DatePicker,
	Spin
} from 'antd'

class SheetDetail extends Component {
	cancel() {
		this.props.onCancel()
	}

	render() {
		return (
			<Modal title='结算表详情' visible={true} width={800} onCancel={this.cancel}>
				<Form>
					<Row>
						<Col xs={12}>
							<FormItem {...formItemLayout} label='客户名称'>
								<Input disabled value={result.CustomName}/>
							</FormItem>
						</Col>
						<Col xs={12}>
							<FormItem {...formItemLayout} label='培训基地'>
					 			<Input disabled value={result.Base}/>
				          	</FormItem>
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<FormItem {...formItemLayout} label='联系人'>
								<Input disabled value={result.Contacts}/>
							</FormItem>
						</Col>
						<Col xs={12}>
							<FormItem {...formItemLayout} label='培训时间'>
								<RangePicker {...getFieldProps('times',{initialValue:[moment(result.TimeFrom, 'YYYY-MM-DD'),moment(result.TimeTo, 'YYYY-MM-DD')]})} format='YYYY-MM-DD' disabled/>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<FormItem {...formItemLayout} label='手机号码'>
								<Input disabled value={result.Phone}/>
							</FormItem>
						</Col>
						<Col xs={12}>
							<FormItem {...formItemLayout} label='培训人数'>
								<InputNumber value={result.People}/>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<FormItem {...formItemLayout} label='QQ'>
								<Input disabled value={result.QQ}/>
							</FormItem>
						</Col>
						<Col xs={12}>
							<FormItem {...formItemLayout} label='总成交额'>
								<Input disabled value={result.TotalPrice}/>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<FormItem {...formItemLayout} label='微信'>
								<Input disabled value={result.WeiXin}/>
							</FormItem>
						</Col>
						<Col xs={12}>
							<FormItem {...formItemLayout} label='均价'>
								<InputNumber disabled value={result.UnitPrice}/>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<FormItem {...formItemLayout} label='客户地址'>
								<InputNumber disabled value={result.Address}/>
							</FormItem>
						</Col>
						<Col xs={12}>
							<FormItem {...formItemLayout} label='总成本'>
								<InputNumber disabled value={result.CostPrice}/>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<FormItem {...formItemLayout} label='客户来源'>
								<Input disabled value={result.Source}/>
							</FormItem>
						</Col>
						<Col xs={12}>
							<FormItem {...formItemLayout} label='备注'>
								<Input disabled type='textarea' rows={4} value={result.Remark}/>
							</FormItem>
						</Col>
					</Row>
				</Form>
			</Modal>
		)
	}
}

SheetDetail.propTypes = {
	id: PropTypes.string.isRequired,
	onCancel: PropTypes.func.isRequired
}

export default SheetDetail