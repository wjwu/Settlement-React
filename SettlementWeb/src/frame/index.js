import React, {
	Component
} from 'react'
import ReactDOM from 'react-dom'
import {
	Button
} from 'antd'
import Header from './components/Header'

class App extends Component {
	render() {
		return (<Header/>)
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('root')
)