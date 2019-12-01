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

export default class ForgotPassword extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			message: ''
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
			const data = { email: this.state.email }

			if (this.state.email) {
				axios.post('http://localhost:3013/z-api/users/forgotpass', data).then($res => {
					const { data } = $res
					this.setState({ message: data.message })
					if (data.message !== 'Email not found!') {
						this.props.history.push('/')
					}
				})
			} else {
				console.log('cant sent email')
			}
			e.preventDefault()
		} catch (error) {}
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
					<Form onSubmit={this.handleSubmit}>
					<div className="textForgot">
					We just need your registered email address
					<br />
					to send you password reset.
				</div>
						<div className="ipp">
							<input
								style={{ fontSize: '8px !important' }}
								name="email"
								className="inputform"
								type="email"
								placeholder="Example@pirsquare.net"
								onChange={this.handleInputChange}
								value={this.state.email}
								invalid={String(this.state.invalidemail)}
								required
							/>
						</div>
						<Button color="submit" size="lg" block>
							Sent
						</Button>
						<Link to={`/`} style={{ textDecoration: 'none' }}>
							Login
						</Link>
						<div className="err">{this.state.message}</div>
					</Form>
				</div>
			</Container>
		)
	}
}
