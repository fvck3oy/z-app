import React, { Component } from 'react'

import './style.css'

export default class index extends Component {
	render() {
		return (
			<div
				id="loader"
				style={{
					background: '#fff',
					justifyContent: 'center',
					display: 'flex',
					alignItems: 'center',
					height: '100vh',
					fontSize: '24px'
				}}
			>
				Loading ... 
			</div>
		)
	}
}
