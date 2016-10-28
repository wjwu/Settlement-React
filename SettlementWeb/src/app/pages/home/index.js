import React from 'react'

class Home extends React.Component {
	componentWillMount() {
		console.log('componentWillMount')
	}
	render() {
		return (<h1>home</h1>)
	}
}

export default Home