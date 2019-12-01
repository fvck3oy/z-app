import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Form } from 'reactstrap'
import { Image } from 'react-bootstrap'
import './Login.css'
import axios from 'axios'
import auth from '../../service/index'
import { User } from 'styled-icons/fa-solid/User'
import { Key } from 'styled-icons/fa-solid/Key'
import LogoCourseHub22 from'../../../src/LogoCourseHub22.png'
import logoCoursehub from './logoCoursehub.jpg'
const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
`
const IconUser = User.extend`
	color: #44c0e2;
	display: inline-block;
	border-radius: 10px;
`
const IconPass = Key.extend`
	color: #44c0e2;
	display: inline-block;
	border-radius: 10px;
`

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			email: '',
			password: '',
			invalidpassword: false,
			invalidemail: false,
			message: '',
			usernameIcon: <IconUser className="usernameIcon" />,
			passwordIcon: <IconPass className="usernameIcon" />
		}
	}

	handleInputChange = e => {
		const { name, value } = e.target
		this.setState({ [name]: value })
		this.setState({ message: '' })
		console.log({ [name]: value })
	}
	handleSubmit = e => {
		try {
			e.preventDefault()
			const data = {
				email: this.state.email,
				password: this.state.password
			}

			if (this.state.email && this.state.password) {
				axios.post('http://localhost:3013/z-api/users/login', data).then($res => {
					const { data } = $res
					this.setState({ message: data.message })
					if (data.message !== 'Email or Password Invalid' && data.message !== 'Invalid password' && data.message !== 'Email not found') {
						localStorage.setItem('token', data.token)
						this.props.history.push(`/overview`)
					}
				})
			} else {
				console.log('cant login.')
			}

		} catch (error) {
			console.error('on error ->', error)
		}
	}

	// componentDidMount() {
	// 	try {
	// 		const user = auth.getToken()
	// 		const userDecoded = auth.decodeToken(user)
	// 		if (userDecoded) {
	// 			this.props.history.push(`/overview`)
	// 		}
	// 	} catch (error) { }
	// }

	render() {
		const { email, password } = this.state
		return (
			<Container>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						textAlign: 'center'
					}}
				>
					<div className="mid d-flex ">
						<Image className="Logo responsive " src={LogoCourseHub22} />
					</div>

					<div className="iconRealxiz">เว็บไซต์แหล่งรวบรวมความรู้ออนไลน์</div>
					<Form onSubmit={this.handleSubmit}>
						<div className="ipp">
							{this.state.usernameIcon}
							<input
								style={{ fontSize: '8px !important' }}
								name="email"
								className="inputform"
								type="email"
								placeholder="Example@pirsquare.net"
								onChange={this.handleInputChange}
								value={email}
								// invalid={String(this.state.invalidemail)}
								required
							/>
						</div>
						<div className="ipp">
							{this.state.passwordIcon}
							<input
								className="inputform"
								style={{ fontSize: '8px !important' }}
								name="password"
								type="password"
								placeholder="Password"
								onChange={this.handleInputChange}
								value={password}
								// invalid={String(this.state.invalidpassword)}
								required
							/>
						</div>
						<Button color="submit" size="lg" block>
							Sign In
						</Button>
					</Form>

				
					<Link to={`/forgotpass`} style={{ textDecoration: 'none' , fontSize:'22px',marginTop:'5px' }}>
						Forgot password?
					</Link>
					<Link to={`/register`} style={{ textDecoration: 'none', fontSize:'22px' }}>
						Register!
					</Link>
					<div className="err">{this.state.message}</div>
				</div>
			</Container>
		)
	}
}
export default Login
