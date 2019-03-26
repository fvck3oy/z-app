import React, { Component } from 'react'
import { Navbar, NavLink } from 'reactstrap'
import './Footer.css'
import { Image } from 'react-bootstrap'



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
					© 2019 Coursehub All rights reserved.{' '}
					<Image
						className="footer-logo"
						src="https://scontent.fbkk5-4.fna.fbcdn.net/v/t1.0-9/46882025_1929000807187859_437138648945655808_n.jpg?_nc_cat=110&_nc_ht=scontent.fbkk5-4.fna&oh=95558a03adea5dea67e6dd410a67ac09&oe=5CAC8BD0"
					/>
				</div>
			</div>
		)
	}
}
