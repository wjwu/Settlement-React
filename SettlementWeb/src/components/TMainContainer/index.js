import React, {
	Component
} from 'react'
import {
	Link
} from 'react-router'
import {
	Menu,
	Breadcrumb,
	Icon
} from 'antd'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const TMainContainer = () => {
	return Comp => {
		return class extends Component {
			render() {
				let user = JSON.parse(sessionStorage.getItem('user'))
				let path = this.props.route.path.substr(1)
				let openKeys = []
				let selectedKeys = []
				if (path === 'group' || path === 'dic') {
					selectedKeys.push(path)
					openKeys.push('sys')
				} else if (path === 'sheet' || path === 'chart') {
					selectedKeys.push(path)
				}
				return (
					<div className='ant-layout-aside'>
						<aside className='ant-layout-sider'>
						    <div className='ant-layout-logo'><h2>树虎团建结算系统</h2></div>
			 				<Menu mode='inline' theme='dark' defaultOpenKeys={openKeys} selectedKeys={selectedKeys}>
			 					<Menu.Item key='chart' >
			 					{
			 						<span><Icon type='pie-chart'/>统计中心</span>
			 					}
			 					</Menu.Item>
								<Menu.Item key='sheet' >
								{
									<span><Link to='/sheet'><Icon type='calculator'/>我的结算表</Link></span>
								}
								</Menu.Item>
						      	<SubMenu key='sys' title={<span><Icon type='desktop'/>系统管理</span>}>
						        	<Menu.Item key='group'>
						        		<Link to='/group'>部门与用户</Link>
						        	</Menu.Item>
						        	<Menu.Item key='dic'>
						        		<Link to='/dic'>数据字典</Link>
						        	</Menu.Item>
						      	</SubMenu>
						    </Menu>
						</aside>
						<div className='ant-layout-main'>
						    <div className='ant-layout-header'>
						    	<span>{user.Role}</span>
						    	<span><a href='#'>{user.LoginID}</a></span>
						    	<span>退出</span>
						    </div>
						    <div className='ant-layout-breadcrumb'>
						      	<Breadcrumb>
						        	<Breadcrumb.Item>首页</Breadcrumb.Item>
						        	<Breadcrumb.Item>应用列表</Breadcrumb.Item>
						        	<Breadcrumb.Item>某应用</Breadcrumb.Item>
						      	</Breadcrumb>
						    </div>
						    <div className='ant-layout-container'>
						      	<div className='ant-layout-content'>
						        	<div>
						          		<Comp {...this.props}/>
						        	</div>
						      	</div>
						    </div>
						    <div className='ant-layout-footer'>
						    树虎团建 版权所有 © 2016 
						    </div>
						</div>
					</div>
				)
			}
		}
	}
}

export default TMainContainer