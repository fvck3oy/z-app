import React, { Component } from 'react'
import axios from 'axios'
import { Form, Modal, ModalHeader, ModalBody, Container, Row, Button } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'
import './EditProfile.css'

class EditProfile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// data: {},
			open: true,
			firstname: '',
			lastname: '',
			tel: '',
			id: '',
			email: '',
			password: ''
		}
	}
	toggle() {
		this.setState({ open: !this.state.open })
		this.props.onClose()
	}

	handleInputChange = e => {
		const { name, value } = e.target
		this.setState({ [name]: value })
		this.setState({ message: '' })
		console.log({ [name]: value })
	}

	editSubmit = e => {
		try {
			e.preventDefault()
			try {
				if (this.state.firstname && this.state.lastname && this.state.email && this.state.tel) {
					const data = {
						id: this.state.id,
						firstname: this.state.firstname,
						lastname: this.state.lastname,
						email: this.state.email,
						tel: this.state.tel,
						password: this.state.password
					}
					axios.put(`http://localhost:3013/z-api/users/update`, data).then($res => {
						const { data } = $res
						this.setState({ message: data.message })
						if (data.message != 'Password Invalid') {
							this.toggle()
						}
					})
				}
			} catch (error) {
				console.log('Error = ', error)
			}
		} catch (error) {
			console.error('Error = ', error)
		}
	}

	async getData() {
		try {
			if (this.props.id) {
			}
			await axios.get(`http://localhost:3013/z-api/users`).then(res => {
				const { data } = res

				data.map(user => {
					if (user.id === this.props.id) {
						this.setState(
							{
								id: user.id,
								firstname: user.firstname,
								lastname: user.lastname,
								email: user.email,
								tel: user.tel
							},
							() => console.log('log ->', data)
						)
					}
				})
			})
		} catch (error) {
			console.log('fail to get data at PersonalProjectSidebar', error)
		}
	}

	componentDidMount() {
		this.getData()
	}
	componentWillReceiveProps(props) {
		// console.log(props)
	}
	render() {
		// const { firstname, lastname, email, tel, password, password2 } = this.props.data
		const { onClose } = this.props
		return (
			<Container>
				<Modal style={{ fontSize: '1rem' }} size="5" isOpen={this.state.open} toggle={onClose}>
					<ModalHeader toggle={onClose}>
						<div className="title">EditProfile</div>
					</ModalHeader>

					<ModalBody>
						<Container>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									textAlign: 'center'
								}}
							>
								<Form onSubmit={this.editSubmit}>
									<div className="ipp">
										<div className="textInput">ชื่อ</div>
										<input
											style={{ fontSize: '8px !important' }}
											name="firstname"
											className="inputform"
											type="text"
											// placeholder={firstname}
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
											// placeholder={lastname}
											onChange={this.handleInputChange}
											value={this.state.lastname}
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
											// placeholder={tel}
											onChange={this.handleInputChange}
											value={this.state.tel}
											// invalid={String(this.state.invalidpassword)}
											required
										/>
									</div>
									<div className="ipp">
										<div className="textInput">รหัสผ่าน</div>
										<input
											className="inputform"
											style={{ fontSize: '8px !important' }}
											name="password"
											type="password"
											// placeholder={password}
											onChange={this.handleInputChange}
											value={this.state.password}
											// invalid={String(this.state.invalidpassword)}
											required
										/>
									</div>

									<div className="err">{this.state.message}</div>
									<Button color="submit" size="lg" block>
										Confirm
									</Button>
								</Form>
							</div>
						</Container>
					</ModalBody>
				</Modal>
			</Container>
		)
	}
}
export default withRouter(EditProfile)
