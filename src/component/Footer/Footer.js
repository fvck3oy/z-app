import React, { Component } from 'react'
import { Navbar, NavLink } from 'reactstrap'
import './Footer.css'

export default class Footer extends Component {
	render() {
		return (
			<Navbar
				// fixed="bottom"
				style={{
					paddingBottom: '0',
					paddingTop: '0',
					// paddingLeft: '5px',
					// paddingRight: '5px',
					backgroundColor: 'white',
					marginTop: '20px',
					height: '50px'
				}}
			>
				แหล่งการเรียนรู้ออนไลน์ ความรู้ไร้ขีดจำกัด
				<br />
				เพราะการรู้เรียนไม่ได้มีแค่ในห้องเรียน
				<br />
				เพราะครูที่ดีที่สุดคือการเเบ่งปัน
				<br /> © 2018 Coursehub All rights reserved.
			</Navbar>
		)
	}
}
