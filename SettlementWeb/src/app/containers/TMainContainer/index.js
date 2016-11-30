import React, {
	Component
} from 'react'
import classNames from 'classnames'
import {
	Link
} from 'react-router'
import {
	message,
	Menu,
	Breadcrumb,
	Icon,
	Modal
} from 'antd'
import {
	signOut
} from '../../auth'
import styles from './index.scss'
import UserPanel from './UserPanel'

const showGlobleMsg = (type, msg) => {
	if (type === 'success') {
		message.success(msg, 5)
	} else if (type === 'error') {
		message.error(msg, 5)
	} else if (type === 'info') {
		message.info(msg, 5)
	} else if (type === 'warning') {
		message.warning(msg, 5)
	} else if (type === 'warn') {
		message.warn(msg, 5)
	}
}


const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const confirm = Modal.confirm

const TMainContainer = () => {
	return Comp => {
		return class extends Component {
			constructor(prop) {
				super(prop)
				this.state = {
					userPanelVisible: false,
					hideMenu: false
				}
			}

			componentDidUpdate() {
				if (this.props.message) {
					const {
						type,
						msg
					} = this.props.message
					if (type && msg) {
						showGlobleMsg(type, msg)
					}
				}
			}

			hide() {
				this.setState({
					userPanelVisible: false
				})
			}

			show() {
				this.setState({
					userPanelVisible: true
				})
			}

			showHideMenu() {
				this.setState({
					hideMenu: !this.state.hideMenu
				})
			}

			doSignOut() {
				confirm({
					title: '退出系统',
					content: '确定要退出结算系统？',
					onOk() {
						return signOut().then(result => {
							sessionStorage.clear()
							showGlobleMsg('success', '退出成功！')
							setTimeout(() => {
								window.location.href = '/'
							}, 1500)
						}, error => {
							showGlobleMsg('error', result.Message)
						})
					},
				})
			}

			render() {
				const user = JSON.parse(sessionStorage.getItem('user'))
				const path = this.props.route.path.substr(1)

				let openKeys = []
				let selectedKeys = []
				let openMenu
				let openSubMenu
				selectedKeys.push(path)

				if (path === 'group' || path === 'dic') {
					openKeys.push('sys')
					openMenu = '系统管理'
					openSubMenu = path === 'group' ? '部门与用户' : '数据字典'
				} else if (path === 'sheet' || path === 'stats') {
					openKeys.push('my')
					openMenu = '我的结算表'
					openSubMenu = path === 'sheet' ? '我的结算表' : '统计中心'
				}
				let sys
				if (user.Role === 'Admin') {
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
				}
				let my = [
					<Menu.Item key='sheet'>
						<Link to='/sheet'>我的结算表</Link>
					</Menu.Item>
				]
				if (user.Role !== 'Employee') {
					my.push(
						<Menu.Item key='stats'>
							<Link to='/stats'>统计中心</Link>
						</Menu.Item>
					)
				}
				let breadcrumbItem = []
				if (path !== 'home') {
					breadcrumbItem = [
						<Breadcrumb.Item key='menu'>{openMenu}</Breadcrumb.Item>,
						<Breadcrumb.Item key='subMenu'>{openSubMenu}</Breadcrumb.Item>
					]
				}

				const userPanelVisible = this.state.userPanelVisible
				let userPanel
				if (userPanelVisible) {
					userPanel = <UserPanel onCancel={this.hide.bind(this)} sys_user={user} showGlobleMsg={showGlobleMsg}/>
				}

				const hideMenu = this.state.hideMenu

				return (
					<div className={styles.layout}>
						<div className={styles.main}>
							<div className={classNames({[styles.sider]:true,[styles.hide]:hideMenu})}>
							    <div className={styles.logo}><h2>树虎团建结算系统</h2></div>
				 				<Menu mode='inline' theme='dark' defaultOpenKeys={openKeys} selectedKeys={selectedKeys}>
				 					<SubMenu key='my' title={<span><Icon type='file'/>我的结算表</span>}>
							        	{my}
				 					</SubMenu>
				 					{sys}
							    </Menu>
							</div>
							<div className={classNames({[styles.header]:true,[styles.expandHF]:hideMenu})}>
								<a className={styles.showMenuIcon} href='javascript:;' onClick={this.showHideMenu.bind(this)}><Icon type={hideMenu?'menu-unfold':'menu-fold'}/></a>
								<span>{user.RoleName}</span>
								<span><a href='javascript:;' onClick={this.show.bind(this)}>{user.LoginID}</a></span>
								{userPanel}
								<span><a className={styles.normal} href='javascript:;' onClick={this.doSignOut.bind(this)}><Icon type='logout'/>&nbsp;退出</a></span>
							</div>
							<div className={classNames({[styles.breadcrumb]:true,[styles.expandBC]:hideMenu})}>
							  	<Breadcrumb>
							    	<Breadcrumb.Item><Link to='/home'>首页</Link></Breadcrumb.Item>
							    	{breadcrumbItem}
							  	</Breadcrumb>
							</div>
						    <div className={classNames({[styles.container]:true,[styles.expandBC]:hideMenu})}>
						      	<div className={styles.content}>
						        	<div>
						          		<Comp {...this.props} sys_user={user} showGlobleMsg={showGlobleMsg}/>
						        	</div>
						      	</div>
						    </div>
						    <div className={classNames({[styles.footer]:true,[styles.expandHF]:hideMenu})}>
						    	<span>树虎团建 版权所有 © 2016 </span>
						    </div>
						</div>
					</div>
				)
			}
		}
	}
}

export default TMainContainer