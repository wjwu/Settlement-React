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
				selectedKeys.push(path)

				if (path === 'group' || path === 'dic') {
					openKeys.push('sys')
				} else if (path === 'sheet' || path === 'stats') {
					openKeys.push('my')
				}
				let role
				let sys
				if (user.Role === 'Admin') {
					role = '[系统管理员]'
					sys = (
						<SubMenu key='sys' title={<span><Icon type='desktop'/>系统管理</span>}>
						 	<Menu.Item key='group'>
						 		<Link to='/group'>部门与用户</Link>
						 	</Menu.Item>
						 	<Menu.Item key='dic'>
						 		<Link to='/dic'>数据字典</Link>
						 	</Menu.Item>
						</SubMenu>
					)
				} else if (user.Role === 'DeptManager') {
					role = '[部门主管]'
				} else if (user.Role === 'Employee') {
					role = '[普通员工]'
				}
				return (
					<div className='ant-layout-aside'>
						<div className='ant-layout-main'>
							<div className='ant-layout-sider'>
							    <div className='ant-layout-logo'><h2>树虎团建结算系统</h2></div>
				 				<Menu mode='inline' theme='dark' defaultOpenKeys={openKeys} selectedKeys={selectedKeys}>
				 					<SubMenu key='my' title={<span><Icon type='desktop'/>我的结算表</span>}>
							        	<Menu.Item key='sheet'>
							        		<Link to='/sheet'>我的结算表</Link>
							        	</Menu.Item>
							        	<Menu.Item key='stats'>
							        		<Link to='/stats'>统计中心</Link>
							        	</Menu.Item>
				 					</SubMenu>
				 					{sys}
							    </Menu>
							</div>
							<div className='ant-layout-header'>
								<span>{role}</span>
								<span><a href='#'>{user.LoginID}</a></span>
								<span><a className='normal-link'><Icon type='logout'/>&nbsp;退出</a></span>
							</div>
						    <div className='ant-layout-container'>
						      	<div className='ant-layout-content'>
						        	<div>
						          		<Comp {...this.props} sys_user={user}/>
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

// <div className='ant-layout-breadcrumb'>
//   	<Breadcrumb>
//     	<Breadcrumb.Item>首页</Breadcrumb.Item>
//     	<Breadcrumb.Item>应用列表</Breadcrumb.Item>
//     	<Breadcrumb.Item>某应用</Breadcrumb.Item>
//   	</Breadcrumb>
// </div>