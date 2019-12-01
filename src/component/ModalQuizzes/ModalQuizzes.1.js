import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, Form, Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'
import axios from 'axios'
import auth from '../../service/index'
export default class ModalQuizzes extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: true,
			dataQuestion: [],
			question0: '',
			question1: '',
			question2: '',
			question3: '',
			question4: '',
			question5: '',
			question6: '',
			question7: '',
			question8: '',
			question9: '',
			ans1: '',
			ans2: '',
			ans3: '',
			ans4: '',
			ans5: '',

			ans6: '',
			ans7: '',
			ans8: '',
			ans9: '',
			ans10: ''
		}
		this.getData = this.getData.bind(this)
		this.sentData = this.sentData.bind(this)
	}
	componentDidMount() {
		this.getData()
	}
	onAddressChanged = e => {
		const { name, value } = e.target
		this.setState({ [name]: value })
		this.setState({ message: '' })
		console.log({ [name]: value })
	}

	async getData() {
		console.log('getDataQuestion')
		await axios.get(`http://localhost/localhost:3013/z-api/question/${this.props.id}`).then(res => {
			const { data } = res
			this.setState({ dataQuestion: data })
			this.setState({ question0: data[0] })
			this.setState({ question1: data[1] })
			this.setState({ question2: data[2] })
			this.setState({ question3: data[3] })
			this.setState({ question4: data[4] })
			this.setState({ question5: data[5] })
			this.setState({ question6: data[6] })
			this.setState({ question7: data[7] })
			this.setState({ question8: data[8] })
			this.setState({ question9: data[9] })
			console.log('data question : ', data[1])
		})
	}

	async sentData() {
		console.log('fuck !')

		if (
			this.state.ans1 == '' ||
			this.state.ans2 == '' ||
			this.state.ans3 == '' ||
			this.state.ans4 == '' ||
			this.state.ans5 == '' ||
			this.state.ans6 == '' ||
			this.state.ans7 == '' ||
			this.state.ans8 == '' ||
			this.state.ans9 == '' ||
			this.state.ans10 == ''
		) {
			console.log(' please fill i sas !! ')
		}

		const data = {
			courseId: this.props.id,

			q1: this.state.question0.id,
			ans1: this.state.ans1,

			q2: this.state.question1.id,
			ans2: this.state.ans2,

			q3: this.state.question2.id,
			ans3: this.state.ans3,

			q4: this.state.question3.id,
			ans4: this.state.ans4,

			q5: this.state.question4.id,
			ans5: this.state.ans5,

			q6: this.state.question5.id,
			ans6: this.state.ans6,

			q7: this.state.question6.id,
			ans7: this.state.ans7,

			q8: this.state.question7.id,
			ans8: this.state.ans8,

			q9: this.state.question8.id,
			ans9: this.state.ans9,

			q10: this.state.question9.id,
			ans10: this.state.ans10
		}
		console.log('data  = = =', data)
		await axios.patch(`http://localhost/localhost:3013/z-api/score/count`, data).then($res => {
			console.log('kuy')

			// const { data } = $res
			// console.log('data newCourse is ', data)
			// this.setState({ IdToPathProfileCourse: data.id })
			// console.log('id to up : ', this.state.IdToPathProfileCourse)
		})
	}

	render() {
		const {
			dataQuestion,
			question0,
			question1,
			question2,
			question3,
			question4,
			question5,
			question6,
			question7,
			question8,
			question9
		} = this.state
		const { onClose, title } = this.props
		return (
			<div>
				<Modal style={{ fontSize: '1rem' }} size="lg" isOpen={this.state.open} toggle={onClose}>
					<ModalHeader toggle={onClose}>
						<div className="title">Quiz</div>
					</ModalHeader>

					<ModalBody>
						<Container>
							<Row>
								<Col className="mt-2">
									<Form>
										<FormGroup tag="fieldset">
											<Label>
												ข้อที่ 1 คำถาม : {question0.question_text}
												<br />
											</Label>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans1" value="1" onChange={this.onAddressChanged} /> {question0.choice1_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans1" value="2" onChange={this.onAddressChanged} /> {question0.choice2_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans1" value="3" onChange={this.onAddressChanged} /> {question0.choice3_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans1" value="4" onChange={this.onAddressChanged} /> {question0.choice4_text}
												</Label>
											</FormGroup>
										</FormGroup>

										{/* -------------------------------------------------------------------------------------------------------------------------- */}
										<hr />
										<FormGroup tag="fieldset">
											<Label>
												ข้อที่ 2 คำถาม : {question1.question_text}
												<br />
											</Label>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans2" value="1" onChange={this.onAddressChanged} /> {question1.choice1_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans2" value="2" onChange={this.onAddressChanged} /> {question1.choice2_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans2" value="3" onChange={this.onAddressChanged} /> {question1.choice3_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans2" value="4" onChange={this.onAddressChanged} /> {question1.choice4_text}
												</Label>
											</FormGroup>
										</FormGroup>

										{/* -------------------------------------------------------------------------------------------------------------------------- */}
										<hr />
										<FormGroup tag="fieldset">
											<Label>
												ข้อที่ 3 คำถาม : {question2.question_text}
												<br />
											</Label>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans3" value="1" onChange={this.onAddressChanged} /> {question2.choice1_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans3" value="2" onChange={this.onAddressChanged} /> {question2.choice2_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans3" value="3" onChange={this.onAddressChanged} /> {question2.choice3_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans3" value="4" onChange={this.onAddressChanged} /> {question2.choice4_text}
												</Label>
											</FormGroup>
										</FormGroup>

										{/* -------------------------------------------------------------------------------------------------------------------------- */}
										<hr />
										<FormGroup tag="fieldset">
											<Label>
												ข้อที่ 4 คำถาม : {question3.question_text}
												<br />
											</Label>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans4" value="1" onChange={this.onAddressChanged} /> {question3.choice1_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans4" value="2" onChange={this.onAddressChanged} /> {question3.choice2_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans4" value="3" onChange={this.onAddressChanged} /> {question3.choice3_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans4" value="4" onChange={this.onAddressChanged} /> {question3.choice4_text}
												</Label>
											</FormGroup>
										</FormGroup>

										{/* -------------------------------------------------------------------------------------------------------------------------- */}
										<hr />
										<FormGroup tag="fieldset">
											<Label>
												ข้อที่ 5 คำถาม : {question4.question_text}
												<br />
											</Label>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans5" value="1" onChange={this.onAddressChanged} /> {question4.choice1_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans5" value="2" onChange={this.onAddressChanged} /> {question4.choice2_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans5" value="3" onChange={this.onAddressChanged} /> {question4.choice3_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans5" value="4" onChange={this.onAddressChanged} /> {question4.choice4_text}
												</Label>
											</FormGroup>
										</FormGroup>

										{/* -------------------------------------------------------------------------------------------------------------------------- */}
										<hr />
										<FormGroup tag="fieldset">
											<Label>
												ข้อที่ 6 คำถาม : {question5.question_text}
												<br />
											</Label>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans6" value="1" onChange={this.onAddressChanged} /> {question5.choice1_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans6" value="2" onChange={this.onAddressChanged} /> {question5.choice2_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans6" value="3" onChange={this.onAddressChanged} /> {question5.choice3_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans6" value="4" onChange={this.onAddressChanged} /> {question5.choice4_text}
												</Label>
											</FormGroup>
										</FormGroup>

										{/* -------------------------------------------------------------------------------------------------------------------------- */}
										<hr />
										<FormGroup tag="fieldset">
											<Label>
												ข้อที่ 7 คำถาม : {question6.question_text}
												<br />
											</Label>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans7" value="1" onChange={this.onAddressChanged} /> {question6.choice1_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans7" value="2" onChange={this.onAddressChanged} /> {question6.choice2_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans7" value="3" onChange={this.onAddressChanged} /> {question6.choice3_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans7" value="4" onChange={this.onAddressChanged} /> {question6.choice4_text}
												</Label>
											</FormGroup>
										</FormGroup>

										{/* -------------------------------------------------------------------------------------------------------------------------- */}
										<hr />
										<FormGroup tag="fieldset">
											<Label>
												ข้อที่ 8 คำถาม : {question7.question_text}
												<br />
											</Label>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans8" value="1" onChange={this.onAddressChanged} /> {question7.choice1_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans8" value="2" onChange={this.onAddressChanged} /> {question7.choice2_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans8" value="3" onChange={this.onAddressChanged} /> {question7.choice3_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans8" value="4" onChange={this.onAddressChanged} /> {question7.choice4_text}
												</Label>
											</FormGroup>
										</FormGroup>

										{/* -------------------------------------------------------------------------------------------------------------------------- */}
										<hr />
										<FormGroup tag="fieldset">
											<Label>
												ข้อที่ 9 คำถาม : {question8.question_text}
												<br />
											</Label>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans9" value="1" onChange={this.onAddressChanged} /> {question8.choice1_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans9" value="2" onChange={this.onAddressChanged} /> {question8.choice2_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans9" value="3" onChange={this.onAddressChanged} /> {question8.choice3_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans9" value="4" onChange={this.onAddressChanged} /> {question8.choice4_text}
												</Label>
											</FormGroup>
										</FormGroup>

										{/* -------------------------------------------------------------------------------------------------------------------------- */}
										<hr />
										<FormGroup tag="fieldset">
											<Label>
												ข้อที่ 10 คำถาม : {question9.question_text}
												<br />
											</Label>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans10" value="1" onChange={this.onAddressChanged} /> {question9.choice1_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans10" value="2" onChange={this.onAddressChanged} /> {question9.choice2_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans10" value="3" onChange={this.onAddressChanged} /> {question9.choice3_text}
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="ans10" value="4" onChange={this.onAddressChanged} /> {question9.choice4_text}
												</Label>
											</FormGroup>
										</FormGroup>

										<Button color="success" size="lg" onClick={() => this.sentData()} block>
											Confirm
										</Button>
									</Form>
									{/* </Form> */}
								</Col>
							</Row>
						</Container>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}
