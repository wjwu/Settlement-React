import React, { Component, PropTypes } from 'react';
import { Modal, Form, Input, Button, Select, Radio, Row, Col, InputNumber, DatePicker, Tabs, Spin } from 'antd';
import numeral from 'numeral';
import moment from 'moment';
import { TTable } from '../../../components';
import CreateCost from './CreateCost';
import UpdateCost from './UpdateCost';
import CreateReceived from './CreateReceived';
import UpdateReceived from './UpdateReceived';
import { genCostColumns, genReceivedColumns, genLogColumns } from './columns';
import { disabledTime, disabledDate } from '../../../utils/common';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const createCost = 'createCost';
const updateCost = 'updateCost';
const createReceived = 'createReceived';
const updateReceived = 'updateReceived';

class UpdateSheet extends Component {
	constructor(prop) {
		super(prop);
		this.submit = this.submit.bind(this);
		this.calcUnit = this.calcUnit.bind(this);
		this.calcTax = this.calcTax.bind(this);
		this.state = {
			[createCost]: false,
			[updateCost]: false,
			[createReceived]: false,
			[updateReceived]: false,
			costs: [],
			receiveds: []
		};
	}

	componentDidMount() {
		this.props.getSheet(this.props.id);
	}

	componentWillReceiveProps(nextProps) {
		const next = nextProps.sheet.sheet;
		if (next) {
			this.setState({
				...this.state,
				costs: next.Costs || [],
				receiveds: next.Receiveds || []
			});
		}
	}

	submit(type) {
		if (type === 'pass' || type === 'fail') {
			this.props.updateSheetAuditStatus({
				id: this.props.sheet.sheet.ID,
				pass: type === 'pass'
			});
		} else {
			const {
				validateFields,
				getFieldValue
			} = this.props.form;

			validateFields((errors, values) => {
				if (!errors) {
					let customName = getFieldValue('customName');
					let contacts = getFieldValue('contacts');
					let phone = getFieldValue('phone');
					let qq = getFieldValue('qq');
					let weixin = getFieldValue('weixin');
					let address = getFieldValue('address');
					let source = getFieldValue('source');
					let base = getFieldValue('base');
					let times = getFieldValue('times');
					let timeFrom = times[0].format('YYYY-MM-DD HH:mm:ss');
					let timeTo = times[1].format('YYYY-MM-DD HH:mm:ss');
					let people = getFieldValue('people');
					let total = getFieldValue('total');
					let taxRate = getFieldValue('taxRate');
					let remark = getFieldValue('remark');
					let costs = this.state.costs;
					let receiveds = this.state.receiveds;
					let submit = type === 'submit';
					this.props.updateSheet({
						id: this.props.sheet.sheet.ID,
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
						total,
						remark,
						costs,
						receiveds,
						taxRate,
						submit
					});
				}
			});
		}
	}

	calcUnit() {
		const {
			getFieldValue,
			setFieldsValue
		} = this.props.form;
		let people = getFieldValue('people');
		let total = getFieldValue('total');
		if (people > 0 && total > 0) {
			let unit = total / people;
			setFieldsValue({
				'unit': unit
			});
		}
	}

	calcTax() {
		const {
			getFieldValue,
			setFieldsValue
		} = this.props.form;

		let taxRate = getFieldValue('taxRate');
		let total = getFieldValue('total');
		if (taxRate > 0 && total > 0) {
			let tax = total * taxRate;
			setFieldsValue({
				'tax': tax
			});
		}
	}

	showModal(type) {
		this.setState({
			[type]: true
		});
	}

	hideModal(type, result, action) {
		this.state[type] = false;
		if (result && (type === createCost || type === updateCost)) {
			let costs = this.state.costs || [];
			if (action === 'create') {
				costs.push(result);
			} else if (action === 'update') {
				let idx = costs.indexOf(this.selectedCost);
				costs.splice(idx, 1, result);
			}
			this.state.costs = costs;
		} else if (result && (type === createReceived || type === updateReceived)) {
			let receiveds = this.state.receiveds || [];
			if (action === 'create') {
				receiveds.push(result);
			} else if (action === 'update') {
				let idx = receiveds.indexOf(this.selectedReceived);
				receiveds.splice(idx, 1, result);
			}
			this.state.receiveds = receiveds;
		}
		this.setState({
			...this.state
		});
	}

	print() {
		window.open(`/print?id=${this.props.sheet.sheet.ID}`);
	}

	render() {
		const {
			updating,
			sheet
		} = this.props.sheet;

		if (!sheet) {
			return (
				<Modal title='修改结算表' visible={true} width={800} onCancel={this.props.onCancel}>
					<Spin tip='Loading...'/>
				</Modal>
			);
		}
		const getFieldDecorator = this.props.form.getFieldDecorator;

		const {
			bases,
			sources,
			costs: costTypes
		} = this.props.dictionary;

		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 16
			},
		};

		let costs = this.state.costs;
		let receiveds = this.state.receiveds;
		let cost = 0;
		for (let i = costs.length - 1; i >= 0; i--) {
			cost += costs[i].Total;
		}
		let modal;
		if (this.state[createCost]) {
			modal = <CreateCost onCancel = {this.hideModal.bind(this, createCost)} costs={costTypes.List}/>;
		} else if (this.state[updateCost]) {
			modal = <UpdateCost onCancel = {this.hideModal.bind(this, updateCost)} costs={costTypes.List} cost={this.selectedCost}/>;
		} else if (this.state[createReceived]) {
			modal = <CreateReceived onCancel = {this.hideModal.bind(this, createReceived)}/>;
		} else if (this.state[updateReceived]) {
			modal = <UpdateReceived onCancel = {this.hideModal.bind(this, updateReceived)} received={this.selectedReceived}/>;
		}

		let footer =
			[
				<Button key='cancel' type='ghost' size='large' onClick={this.props.onCancel}>取消</Button>,
				<Button key='print' type='ghost' size='large' onClick={this.print.bind(this)}>打印</Button>
			];
		let btnSave = <Button key='save' type='primary' size='large' loading={updating} onClick={this.submit.bind(this, 'save')}>保存</Button>;
		let btnSubmit = <Button key='submit' type='primary' size='large' loading={updating} onClick={this.submit.bind(this, 'submit')}>保存并提交</Button>;
		let btnPass = <Button key='pass' type='primary' size='large' loading={updating} onClick={this.submit.bind(this, 'pass')}>通过</Button>;
		let btnFail = <Button key='fail' type='primary' size='large' loading={updating} onClick={this.submit.bind(this, 'fail')}>打回</Button>;
		let role = this.props.sys_user.Role;
		let disabled = false;
		let receivedDisabled = false;
		if (role === 'Employee' || role === 'DeptManager') {
			if ((sheet.AuditStatus === 'UnSubmit' || sheet.AuditStatus === 'Fail') && sheet.UserID.toLowerCase() === this.props.sys_user.ID.toLowerCase()) {
				footer.push(btnSave);
				footer.push(btnSubmit);
			} else if (sheet.AuditStatus === 'Auditing') {
				footer.push(btnSave);
			} else {
				if (sheet.UserID.toLowerCase() !== this.props.sys_user.ID.toLowerCase()) {
					receivedDisabled = true;
				} else {
					footer.push(btnSave);
				}
				disabled = true;
			}
		} else if (role === 'Financial') {
			disabled = true;
			receivedDisabled = true;
			if (sheet.AuditStatus === 'Auditing') {
				footer.push(btnFail);
				footer.push(btnPass);
			}
		} else if (role === 'Admin') {
			footer.push(btnSave);
		}

		const costColumns = genCostColumns((raw, action) => {
			this.selectedCost = raw;
			if (action === 'update') {
				this.showModal(updateCost);
			} else {
				let costs = this.state.costs;
				let idx = costs.indexOf(raw);
				costs.splice(idx, 1);
				this.state.costs = costs;
				this.setState({
					...this.state
				});
			}
		}, disabled);
		const receivedColumns = genReceivedColumns((raw, action) => {
			this.selectedReceived = raw;
			if (action === 'update') {
				this.showModal(updateReceived);
			} else {
				let receiveds = this.state.receiveds;
				let idx = receiveds.indexOf(raw);
				receiveds.splice(idx, 1);
				this.state.receiveds = receiveds;
				this.setState({
					...this.state
				});
			}
		}, receivedDisabled);

		return (
			<Modal title='修改结算表' visible={true} width={800} footer={footer} onCancel={this.props.onCancel}>
				<Tabs>
					<TabPane tab='基本信息' key='baseInfo'>
						<Form>
							<Row>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='客户名称'>
										{
											getFieldDecorator('customName', {
												initialValue:sheet.CustomName,
												rules:[{
														required:true,
														whitespace:true,
														message:'客户名称不能为空！'
													}, {
														length:true,
														max:100,
														message:'客户名称最多100个字符！'
													}]
												})(<Input placeholder='请输入客户名称' disabled={disabled}/>)
										}
									</FormItem>
								</Col>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='培训基地'>
									{
										getFieldDecorator('base', {
											initialValue:sheet.Base,
											rules:[{
												required:true,
												message:'请选择培训基地！'
											}]
										})(
											<Select placeholder='请选择培训基地' disabled={disabled}>
											{
												bases.List.map(item => <Option key={item.ID} value={item.ID}>{item.Name}</Option>)
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
											getFieldDecorator('contacts', {
												initialValue:sheet.Contacts,
												rules:[{
														required:true,
														whitespace:true,
														message:'联系人不能为空！'
													}, {
														length:true,
														max:20,
														message:'联系人最多20个字符！'
													}]
												})(<Input placeholder='请输入联系人' disabled={disabled}/>)
										}
									</FormItem>
								</Col>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='培训时间'>
									{
										getFieldDecorator('times', {
											initialValue:[
												moment(sheet.TimeFrom, 'YYYY-MM-DD'),
												moment(sheet.TimeTo, 'YYYY-MM-DD')
											],
											rules:[{
												required:true,
												type:'array',
												message:'请选择培训时间！'
											}]
										})(<RangePicker format='YYYY-MM-DD' disabledDate={disabledDate} disabledTime={disabledTime} disabled={disabled}/>)
									}
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='手机号码'>
										{
											getFieldDecorator('phone', {
												initialValue:sheet.Phone,
												rules:[{
														required:true,
														whitespace:true,
														message:'手机号码不能为空！'
													}, {
														pattern:/^1[34578]\d{9}$/,
														message:'手机号码格式不正确！'
													}]
												})(<Input placeholder='请输入手机号码' disabled={disabled}/>)
										}
									</FormItem>
								</Col>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='培训人数'>
										{
											getFieldDecorator('people', {
												initialValue:sheet.People,
												rules:[{required:true}, {
														range:true,
														min:1,
														type:'integer',
														message:'请输入培训人数！'
													}]
												})(<InputNumber min={0} onChange={this.calcUnit} onBlur={this.calcUnit} disabled={disabled}/>)
										}
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='QQ'>
										{
											getFieldDecorator('qq', {
												initialValue:sheet.QQ,
											})(<Input disabled={disabled}/>)
										}
									</FormItem>
								</Col>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='总成交额'>
										{
											getFieldDecorator('total', {
												initialValue:sheet.Total,
												rules:[{required:true}, {
														range:true,
														min:1,
														type:'number',
														message:'请输入总成交额！'
													}]
												})(<InputNumber min={0} step={0.1} onChange={this.calcUnit} onBlur={this.calcUnit} disabled={disabled}/>)
										}
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='微信'>
										{
											getFieldDecorator('weixin', {
												initialValue:sheet.WeiXin
											})(<Input disabled={disabled}/>)
										}
									</FormItem>
								</Col>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='均价'>
										{
											getFieldDecorator('unit', {
												initialValue:sheet.Unit
											})(<InputNumber disabled min={0}/>)
										}
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='客户地址'>
										{
											getFieldDecorator('address', {
												initialValue:sheet.Address
											})(<Input disabled={disabled}/>)
										}
									</FormItem>
								</Col>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='税率'>
										{
											getFieldDecorator('taxRate', {
												initialValue:sheet.TaxRate,
												rules:[{
													required:true
												}]
											})(<InputNumber disabled={disabled} step={0.01} min={0} onChange={this.calcTax} onBlur={this.calcTax}/>)
										}
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col xs={12}>
								</Col>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='税费'>
										{
											getFieldDecorator('tax', {initialValue:sheet.Tax})(<InputNumber disabled min={0}/>)
										}
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='客户来源'>
										{
											getFieldDecorator('source', {initialValue:sheet.Source.toLowerCase()})(
												<RadioGroup disabled={disabled}>
													{
														sources.List.map(item=><Radio key={item.ID} value={item.ID}>{item.Name}</Radio>)	
													}
												</RadioGroup>
											)
										}
									</FormItem>
								</Col>
								<Col xs={12}>
									<FormItem {...formItemLayout} label='备注'>
										{
											getFieldDecorator('remark', {
												initialValue:sheet.Remark,
											})(<Input type='textarea' rows={4} disabled={disabled}/>)
										}
									</FormItem>
								</Col>
							</Row>
						</Form>
					</TabPane>
					<TabPane tab='结算明细' key='costInfo'>
						<div style={{marginBottom:16, textAlign:'right'}}>
							<span style={{float:'left', margin:'4px 0 0 2px'}}><b>成本总计：{numeral(cost).format('0,0.00')}</b></span>
							<Button type='primary' disabled={disabled} icon='plus-circle-o' onClick={this.showModal.bind(this, createCost)}>新增明细</Button>
							{modal}
						</div>
						<TTable key='cost' scroll={{ y: 300 }} bordered columns={costColumns} total={costs.length} dataSource={costs} pagination={false} onLoad={()=>{}}/>
					</TabPane> 
					<TabPane tab='收款明细' key='receivedInfo'>
						<div style={{marginBottom:16, textAlign:'right'}}>
							<Button type='primary' disabled={receivedDisabled} icon='plus-circle-o' onClick={this.showModal.bind(this, createReceived)}>新增明细</Button>
							{modal}
						</div>
						<TTable key='received' bordered columns={receivedColumns} dataSource={receiveds} pagination={false}/>
					</TabPane> 
					<TabPane tab='操作记录' key='logInfo'>
						<TTable key='log' bordered columns={genLogColumns()} dataSource={sheet.Logs} pagination={false}/>
					</TabPane> 
				</Tabs>
			</Modal>
		);
	}
}

UpdateSheet.propTypes = {
	id: PropTypes.string.isRequired,
	onCancel: PropTypes.func.isRequired
};

export default Form.create()(UpdateSheet);