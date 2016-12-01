import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import numeral from 'numeral'
import * as apiClient from './apiClient'
import styles from './index.scss'


const getQueryString = (name) => {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
	var r = window.location.search.substr(1).match(reg)
	if (r != null) return unescape(r[2])
	return null
}

class Print extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sheet: null
		}
	}

	componentDidMount() {
		apiClient.get(`sheet/${getQueryString('id')}`).then(result => {
			this.setState({
				sheet: result
			})
		}, error => {
			alert(error)
		})
	}

	componentDidUpdate() {
		if (this.state) {
			window.print()
		}
	}

	render() {
		const sheet = this.state.sheet
		if (!sheet) {
			return (<h2 className={styles.title}>加载中...</h2>)
		}
		return (
			<div>
			    <h2 className={styles.title}>{sheet.CustomName}</h2>
			    <table>
			        <colgroup>
			            <col style={{width:'15%'}} />
			            <col style={{width:'35%'}} />
			            <col style={{width:'15%'}} />
			            <col style={{width:'35%'}} />
			        </colgroup>
			        <tbody>
			            <tr>
			                <td>项目经理：</td>
			                <td>{sheet.UserName}</td>
			                <td>培训地点：</td>
			                <td>{sheet.BaseName}</td>
			            </tr>
			            <tr>
			                <td>客户名称：</td>
			                <td>{sheet.CustomName}</td>
			                <td>培训人数：</td>
			                <td>{sheet.People}</td>
			            </tr>
			            <tr>
			                <td>客户联系人：</td>
			                <td>{sheet.Contacts}</td>
			                <td>培训时间</td>
			                <td>{`${sheet.TimeFrom}-${sheet.TimeTo}`}</td>
			            </tr>
			            <tr>
			                <td>联系电话：</td>
			                <td>{sheet.Phone}</td>
			                <td>客户来源：</td>
			                <td>{sheet.SourceName}</td>
			            </tr>
			            <tr>
			                <td>总成交额：</td>
			                <td>{`￥${numeral(sheet.Total).format('0,0.00')}`}</td>
			                <td>税率：</td>
			                <td>{sheet.TaxRate}</td>
			            </tr>
			            <tr>
			                <td>总成本：</td>
			                <td>{`￥${numeral(sheet.Cost).format('0,0.00')}`}</td>
			                <td>税费：</td>
			                <td>{`￥${numeral(sheet.Tax).format('0,0.00')}`}</td>
			            </tr>
			            <tr>
			                <td>利润：</td>
			                <td>{`￥${numeral(sheet.Achievement).format('0,0.00')}`}</td>
			                <td>单价：</td>
			                <td>{`￥${numeral(sheet.Unit).format('0,0.00')}`}</td>
			            </tr>
			            <tr>
			                <td>已付金额：</td>
			                <td>{`￥${numeral(sheet.Received).format('0,0.00')}`}</td>
			                <td>未付金额：</td>
			                <td>{`￥${numeral(sheet.Remaining).format('0,0.00')}`}</td>
			            </tr>
			            <tr>
			                <td>备注：</td>
			                <td colSpan='3'>{sheet.Remark}</td>
			            </tr>
			        </tbody>
			    </table>
			    <h3>结算明细：</h3>
			    <table>
			        <colgroup>
			            <col style={{width:'20%'}} />
			            <col style={{width:'15%'}} />
			            <col style={{width:'15%'}} />
			            <col style={{width:'15%'}} />
			            <col style={{width:'15%'}} />
			            <col style={{width:'20%'}} />
			        </colgroup>
			        <thead>
			            <tr>
			                <th>名称</th>
			                <th>数量</th>
			                <th>单价</th>
			                <th>合计</th>
			                <th>付款状态</th>
			                <th>备注</th>
			            </tr>
			        </thead>
			        <tbody>
			        	{
			        		sheet.Costs.map(cost=>{
			        			return (
						            <tr>
						                <td>{cost.TypeName}</td>
						                <td>{cost.Amount}</td>
						                <td>{`￥${numeral(cost.Unit).format('0,0.00')}`}</td>
						                <td>{`￥${numeral(cost.Total).format('0,0.00')}`}</td>
						                <td>{cost.Status==='Paid'?'已付款':'未付款'}</td>
						                <td>{cost.Remark}</td>
						            </tr>
			        			)
			        		})
			        	}
			        </tbody>
			    </table>
			</div>
		)
	}
}

ReactDOM.render(
	<Print/>,
	document.getElementById('root')
)