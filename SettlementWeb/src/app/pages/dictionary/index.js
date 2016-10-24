import React, {
	Component
} from 'react'
import {
	Row,
	Tabs,
	Button,
	Modal
} from 'antd'

import TMainContainer from '../../../components/TMainContainer'
import TCol from '../../../components/TCol'
import TCard from '../../../components/TCard'
import TTable from '../../../components/TTable'

import CreateDictionary from './busComponents/CreateDictionary'

const TabPane = Tabs.TabPane

const createDictionary = 'createDictionary'

class Dictionary extends Component {
	constructor(props) {
		super(props)
		this.state = {
			[createDictionary]: false
		}
	}

	showModal(type) {
		this.setState({
			[type]: true
		})
	}

	hideModal(type) {
		this.setState({
			[type]: false
		})
	}

	render() {
		const {
			createDictionary: createDicVisible
		} = this.state

		return (
			<TMainContainer>
				<Row>
					<TCol>
						<TCard>
							<Button type='primary' className='button' onClick={this.showModal.bind(this,createDictionary)}>新增字典</Button>
							<CreateDictionary visible={createDicVisible} onSubmit={()=>{}} onCancel={this.hideModal.bind(this,createDictionary)}/>
						</TCard>
					</TCol>
				</Row>
				<Row>
					<TCol>
						<TCard>
					        <Tabs tabPosition='left'>
					          <TabPane tab='培训基地' key='base'>
					          	<TTable/>
					          </TabPane>
					          <TabPane tab='客户来源' key='source'>客户来源</TabPane>
					        </Tabs>
						</TCard>
					</TCol>
				</Row>
			</TMainContainer>
		)
	}
}

export default Dictionary