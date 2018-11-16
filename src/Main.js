import React, { Component } from 'react'
import MainRoute from './routes/MainRoute'
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'

class Main extends Component {
	render() {
		return (
			<div>
				<Header />
				<MainRoute />
				<Footer />
			</div>
		)
	}
}
export default Main
