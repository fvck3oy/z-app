import React, { Component } from 'react'
import {
	Form,
	FormText,
	FormGroup,
	Label,
	Input,
	Col,
	Row,
	Container,
	Button,
	Card,
	CardImg,
	CardText,
	CardBody,
	CardLink,
	CardTitle,
	CardSubtitle,
	Modal,
	ModalHeader,
	ModalBody
} from 'reactstrap'
import axios, { post } from 'axios'
import auth from '../../service/index'
import { PowerInputDimensions } from 'styled-icons/material/PowerInput'

export default class ModalCreateQuestion extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: true,
			correct: '1',
			question: '',
			choice1: '',
			choice2: '',
			choice3: '',
			choice4: '',
      data: '',

		}
		this.sentData = this.sentData.bind(this)
		this.toggle = this.toggle.bind(this)
	}
	handleInputChange = e => {
		const { name, value } = e.target
		this.setState({ [name]: value })
		this.setState({ message: '' })
		console.log({ [name]: value })
	}

	toggle() {
		this.setState({ open: !this.state.open })
		this.props.onClose()
	}

	async sentData(e) {
		console.log(' add ! ')
		e.preventDefault()
		let user = auth.getToken()
		let userDecode = auth.decodeToken(user)
		let uId = userDecode.id
		let uEmail = userDecode.email
		try {
			const data = {
				// id: this.state.id,
				question: this.state.question,
				choice1: this.state.choice1,
				choice2: this.state.choice2,
				choice3: this.state.choice3,
				choice4: this.state.choice4,
				correct: this.state.correct,
				courseId: this.props.id
			}
			console.log('data  = = =', data)

			await axios
				.post(`http://localhost:3013/z-api/question/`, data)
				.then($res => {
					const { data } = $res
					console.log('data question is ', data)

				})
				.then(this.toggle())
		} catch (error) {
			console.log('sent error')
		}
	}

	render() {
		const { correct, question, choice1, choice2, choice3, choice4 } = this.state
		const { onClose, id } = this.props
		return (
			<div>
				<Modal style={{ fontSize: '1rem' }} size="lg" isOpen={this.state.open} toggle={onClose}>
					<ModalHeader toggle={onClose}>
						<div className="title">New Question</div>
					</ModalHeader>

					<ModalBody>
						<Container className="">
							{/* <Row> */}
							<Col md={12}>
								<Form onSubmit={this.sentData}>
									<Row>
										<Col>
											<div className="mt-2 mb-2">
												<Label for="exampleText">Question</Label>
												<Input type="textarea" name="question" value={this.state.question} onChange={this.handleInputChange} required />
											</div>
										</Col>
									</Row>
									<Row>
										<Col>
											<div className="mt-2 mb-2">
												<Label for="exampleText">Choice 1</Label>
												<Input type="text" name="choice1" value={this.state.choice1} onChange={this.handleInputChange} required />
											</div>
										</Col>
									</Row>
									<Row>
										<Col>
											<div className="mt-2 mb-2">
												<Label for="exampleText">Choice 2</Label>
												<Input type="text" name="choice2" value={this.state.choice2} onChange={this.handleInputChange} required />
											</div>
										</Col>
									</Row>
									<Row>
										<Col>
											<div className="mt-2 mb-2">
												<Label for="exampleText">Choice 3</Label>
												<Input type="text" name="choice3" value={this.state.choice3} onChange={this.handleInputChange} required />
											</div>
										</Col>
									</Row>
									<Row>
										<Col>
											<div className="mt-2 mb-2">
												<Label for="exampleText">Choice 4</Label>
												<Input type="text" name="choice4" value={this.state.choice4} onChange={this.handleInputChange} required />
											</div>
										</Col>
									</Row>
									<Row>
										<Col>
											<div>
												<Label for="exampleSelect">Select Choice in Correct !</Label>
												<Input type="select" name="correct" value={this.state.correct} onChange={this.handleInputChange} required>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
												</Input>
											</div>
										</Col>
									</Row>

									<div className="btn-mid mt-3 mb-3">
										<Button color="success" size="lg" block>
											Create
										</Button>
									</div>
								</Form>
							</Col>
						</Container>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}
