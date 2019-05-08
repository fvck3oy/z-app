import React, { Component } from 'react'
import { Navbar, NavLink } from 'reactstrap'
import './Footer.css'
import { Image } from 'react-bootstrap'
import LogoCourseHub22 from '../../../src/LogoCourseHub22.png'

export default class Footer extends Component {
	render() {
		return (
			<div className="footer">
				<div className="d-flex">
					{/* แหล่งการเรียนรู้ออนไลน์ ความรู้ไร้ขีดจำกัด
					<br />
					เพราะการรู้เรียนไม่ได้มีแค่ในห้องเรียน
					<br />
					เพราะครูที่ดีที่สุดคือการเเบ่งปัน
					<br />  */}
					© 2019 Coursehub All rights reserved. <Image className="footer-logo" src={LogoCourseHub22} />
				</div>
			</div>
		)
	}
}
