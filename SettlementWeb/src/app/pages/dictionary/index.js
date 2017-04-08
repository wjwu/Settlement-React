import React, { Component } from 'react';
import { bindActionCreators } from 'react';
import { connect } from 'react-redux';
import { Row, Tabs, Button } from 'antd';
import { TMainContainer } from '../../containers';
import { TCol, TCard, TTable } from '../../components';
import CreateDictionary from './components/CreateDictionary';
import UpdateDictionary from './components/UpdateDictionary';
import genColumns from './columns';
import dictionaryActions from '../../actions/dictionary';

const TabPane = Tabs.TabPane;

const DICTIONARY_BASE = 'base';
const DICTIONARY_SOURCE = 'source';
const DICTIONARY_COST = 'cost';

class Dictionary extends Component {
	constructor(props) {
		super(props);
		this.onTabChange = this.onTabChange.bind(this);
		this.onTTableLoad = this.onTTableLoad.bind(this);
		this.hideModal = this.hideModal.bind(this);

		this.selectedTab = DICTIONARY_BASE;
		this[DICTIONARY_BASE] = {
			request: {
				pageIndex: 1
			}
		};
		this[DICTIONARY_SOURCE] = {
			request: {
				pageIndex: 1
			},
			queryed: false,
		};
		this[DICTIONARY_COST] = {
			request: {
				pageIndex: 1
			},
			queryed: false,
		};
		this.state = {
			'createDicVisible': false,
			'updateDicVisible': false
		};
	}

	componentDidMount() {
		this.props.queryBases(this.base.request);
	}

	componentDidUpdate() {
		if (this.props.dictionary.createdDic || this.props.dictionary.updatedDic) {
			if (this.selectedTab === DICTIONARY_BASE) {
				this.props.queryBases(this.base.request);
			} else if (this.selectedTab === DICTIONARY_SOURCE) {
				this.props.querySources(this.source.request);
			} else if (this.selectedTab === DICTIONARY_COST) {
				this.props.queryCosts(this.cost.request);
			}
		}
	}

	onTTableLoad(pageIndex) {
		this[this.selectedTab].request.pageIndex = pageIndex;
		if (this.selectedTab === DICTIONARY_BASE) {
			this.props.queryBases(this.base.request);
		} else if (this.selectedTab === DICTIONARY_SOURCE) {
			this.props.querySources(this.source.request);
		} else if (this.selectedTab === DICTIONARY_COST) {
			this.props.queryCosts(this.cost.request);
		}
	}

	onTabChange(activeKey) {
		this.selectedTab = activeKey;
		if (this.selectedTab === DICTIONARY_SOURCE && !this.source.queryed) {
			this.props.querySources(this.source.request);
		} else if (this.selectedTab === DICTIONARY_COST && !this.cost.queryed) {
			this.props.queryCosts(this.cost.request);
		}
		this[this.selectedTab].queryed = true;
	}

	showModal(type) {
		this.setState({
			[type]: true
		});
	}

	hideModal(type) {
		this.setState({
			[type]: false
		});
	}

	render() {
		let {
			queryingBases,
			queryingSources,
			queryingCosts,
			creating,
			updating,
			bases,
			sources,
			costs
		} = this.props.dictionary;

		let empty = {
			List: [],
			TotalCount: 0
		};
		bases = bases || empty;
		sources = sources || empty;
		costs = costs || empty;

		const {
			createDicVisible,
			updateDicVisible
		} = this.state;

		const columns = genColumns(raw => {
			this.selectedDic = raw;
			this.showModal('updateDicVisible');
		});
		const selectedDic = this.selectedDic || {};

		let modal;
		if (createDicVisible) {
			modal = <CreateDictionary onCancel={()=>{this.hideModal('createDicVisible');}} onSubmit={this.props.createDictionary} creating={creating}/>;
		} else if (updateDicVisible) {
			modal = <UpdateDictionary onCancel={()=>{this.hideModal('updateDicVisible');}} onSubmit={this.props.updateDictionary} updating={updating} dictionary={this.selectedDic}/>;
		}
		return (
			<div>
				<Row>
					<TCol>
						<TCard>
							<Button type='primary' onClick={this.showModal.bind(this, 'createDicVisible')}>新增字典</Button>
							{modal}
						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol>
						<TCard>
							<Tabs tabPosition='left' onChange={this.onTabChange}>
								<TabPane tab='培训基地' key={DICTIONARY_BASE}>
									<TTable columns={columns} loading={queryingBases} total={bases.TotalCount} dataSource={bases.List} onLoad={this.onTTableLoad}/>
								</TabPane>
								<TabPane tab='客户来源' key={DICTIONARY_SOURCE}>
									<TTable columns={columns} loading={queryingSources} total={sources.TotalCount} dataSource={sources.List} onLoad={this.onTTableLoad}/>
								</TabPane>
								<TabPane tab='结算类型' key={DICTIONARY_COST}>
									<TTable columns={columns} loading={queryingCosts} total={costs.TotalCount} dataSource={costs.List} onLoad={this.onTTableLoad}/>
								</TabPane>
							</Tabs>
						</TCard>
					</TCol>
				</Row>
			</div>
		);
	}
}

const mapDispatchToProps = (disptch) => bindActionCreators(dictionaryActions, disptch);

module.exports = connect(state => state, mapDispatchToProps)(TMainContainer()(Dictionary));