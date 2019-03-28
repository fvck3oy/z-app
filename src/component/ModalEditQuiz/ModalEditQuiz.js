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

export default class ModalEditQuiz extends Component {
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
			data2: '',
			id: ''
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

	getData = () => {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id


		axios.get(`http://localhost:3013/z-api/question/idq/${this.props.idQ}`).then(res => {
			const { data } = res

			this.setState({ data: data[0] })
			data.map(question => {
				if (question) {
					this.setState(
						{
							question: question.question_text,
							choice1: question.choice1_text,
							choice2: question.choice2_text,
							choice3: question.choice3_text,
							choice4: question.choice4_text,
							correct: question.correct
						},
						// () => console.log(' question log -> ', data)
					)
				}
			})
		})
	}

	async sentData(e) {

		e.preventDefault()
		let user = auth.getToken()
		let userDecode = auth.decodeToken(user)
		let uId = userDecode.id
		let uEmail = userDecode.email
		try {
			const data = {
				id: this.state.id,
				question: this.state.question,
				choice1: this.state.choice1,
				choice2: this.state.choice2,
				choice3: this.state.choice3,
				choice4: this.state.choice4,
				correct: this.state.correct,
        courseId: this.props.id,
        idQ:this.props.idQ
			}


			await axios
				.patch(`http://localhost:3013/z-api/question/`, data)
				.then($res => {
					const { data } = $res

				})
				.then(this.toggle())
		} catch (error) {
			// console.log('sent error')
		}
	}
	componentDidMount = () => {

		this.getData()
	}

	render() {
		const { onClose, id } = this.props
		return (
			<div>
				<Modal style={{ fontSize: '1rem' }} size="lg" isOpen={this.state.open} toggle={onClose}>
					<ModalHeader toggle={onClose}>
						<div className="title">Edit Question</div>
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
											Confirm
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
