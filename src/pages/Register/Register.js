import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Form } from 'reactstrap'
import axios from 'axios'

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
`

export default class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			password2: '',
			tel: '',
			invalidpassword: false,
			invalidemail: false,
			message: ''
		}
	}

	handleInputChange = e => {
		const { name, value } = e.target
		this.setState({ [name]: value })
		this.setState({ message: '' })
		console.log({ [name]: value })
	}

	register = e => {
		e.preventDefault()
		try {
			if (this.state.firstname && this.state.lastname && this.state.email && this.state.password === this.state.password2) {
				if (this.state.password.length > 5 && this.state.password2.length > 5) {
					const data = {
						firstname: this.state.firstname,
						lastname: this.state.lastname,
						email: this.state.email,
						tel: this.state.tel,
						password: this.state.password,
						roles:3
					}

					axios.post(`http://localhost:3013/z-api/users`, data).then($res => {
						const { data } = $res
						this.setState({ message: data.message })
						if (data.message === 'Email is already used.') {
							this.setState({ message: 'Email is already used.' })
						} else {
							this.props.history.push(`/`)
						}
					})
				} else {
					this.setState({ message: 'Please fill password more than 5' })
				}
			} else {
				this.setState({ message: 'Please fill password to same of both' })
			}
		} catch (error) {
			console.log('Error = ', error)
		}
	}

	render() {
		return (
			<Container>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						textAlign: 'center'
					}}
				>
					<div className="iconRealxiz">Register.</div>
					<Form onSubmit={this.register}>
						<div className="ipp">
							<div className="textInput">ชื่อ</div>
							<input
								style={{ fontSize: '8px !important' }}
								name="firstname"
								className="inputform"
								type="text"
								placeholder="Pumin"
								onChange={this.handleInputChange}
								value={this.state.firstname}
								// invalid={String(this.state.invalidemail)}
								required
							/>
							
						</div>
						<div className="ipp">
							<div className="textInput">สกุล</div>
							<input
								className="inputform"
								style={{ fontSize: '8px !important' }}
								name="lastname"
								type="text"
								placeholder="Swangjang"
								onChange={this.handleInputChange}
								value={this.state.lastname}
								// invalid={String(this.state.invalidpassword)}
								required
							/>
						</div>
						<div className="ipp">
							<div className="textInput">อีเมลล์</div>
							<input
								className="inputform"
								style={{ fontSize: '8px !important' }}
								name="email"
								type="email"
								placeholder="pumin@pirsquare.net"
								onChange={this.handleInputChange}
								value={this.state.email}
								// invalid={String(this.state.invalidpassword)}
								required
							/>
						</div>
						<div className="ipp">
							<div className="textInput">เบอร์โทรศัพท์</div>
							<input
								className="inputform"
								style={{ fontSize: '8px !important' }}
								name="tel"
								type="number"
								placeholder="083-17607xx"
								onChange={this.handleInputChange}
								value={this.state.tel}
								// invalid={String(this.state.invalidpassword)}
								required
							/>
						</div>
						<div className="ipp">
							<div className="textInput">ตั้งรหัสผ่าน</div>
							<input
								className="inputform"
								style={{ fontSize: '8px !important' }}
								name="password"
								type="password"
								placeholder="Password"
								onChange={this.handleInputChange}
								value={this.state.password}
								// invalid={String(this.state.invalidpassword)}
								required
							/>
						</div>
						<div className="ipp">
							<div className="textInput">ยิืนยันรหัสผ่าน</div>
							<input
								className="inputform"
								style={{ fontSize: '8px !important' }}
								name="password2"
								type="password"
								placeholder="Password"
								onChange={this.handleInputChange}
								value={this.state.password2}
								// invalid={String(this.state.invalidpassword)}
								required
							/>
						</div>
						<div className="err">{this.state.message}</div>
						<Button color="submit" size="lg" block>
							Confirm
						</Button>
					</Form>
					<Link to={`/`} style={{ textDecoration: 'none' }}>
						Login
					</Link>
				</div>
			</Container>
		)
	}
}
