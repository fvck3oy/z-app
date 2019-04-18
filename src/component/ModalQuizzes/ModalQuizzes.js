import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, Form, Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'
import axios from 'axios'
import auth from '../../service/index'
export default class ModalQuizzes extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: true,
			questions: [],
			answers: []
		}
		this.getData = this.getData.bind(this)
		this.sentData = this.sentData.bind(this)
	}
	componentDidMount() {
		this.getData()
	}

	onSelectChoice = e => {
		let { answers } = this.state
		const { name, value } = e.target

		answers = answers.map(answer => {
			if (answer.qid === +name) {
				return {
					...answer,
					answer: +value
				}
			}
			return answer
		})

		this.setState({
			answers
		})

		console.log(answers)
	}

	 shuffle=(a)=> {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

	async getData() {
		console.log('getDataQuestion')

		await axios.get(`http://localhost:3013/z-api/question/${this.props.id}`).then(res => {
			const { data } = res
			const answers = data.map(q => ({ qid: q.id, answer: null }))
			this.setState({ questions: this.shuffle(data), answers })
			console.log(data, answers)
		})
	}

	async sentData() {
		let user = auth.getToken()
		let userDecode = auth.decodeToken(user)
		let uId = userDecode.id
		const { answers } = this.state
		const { id } = this.props
		console.log('fuck teacher!')

		if (answers.filter(answer => answer.answer === null).length !== 0) {
			console.log(' please fill i sas !! ')
		}
		await axios.patch(`http://localhost:3013/z-api/score/count`, { cid: id, answers, uId }).then(res => {
			console.log('kuy')
			console.log(res)
			this.toggle()
		})
	}

	toggle = () => {
		this.setState({ open: !this.state.open })
		this.props.onClose()
	}

	render() {
		const { questions, answers } = this.state
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
										{questions.map((question, index) => (
											<div key={index + 1}>
												<FormGroup tag="fieldset">
													<Label>
														ข้อที่ {index + 1} คำถาม : {question.question_text}
														<br />
													</Label>
													<FormGroup check>
														<Label check>
															<Input
																type="radio"
																name={question.id}
																value="1"
																checked={answers.find(answer => answer.qid === question.id).answer === 1}
																onChange={this.onSelectChoice}
															/>{' '}
															{question.choice1_text}
														</Label>
													</FormGroup>
													<FormGroup check>
														<Label check>
															<Input
																type="radio"
																name={question.id}
																value="2"
																checked={answers.find(answer => answer.qid === question.id).answer === 2}
																onChange={this.onSelectChoice}
															/>{' '}
															{question.choice2_text}
														</Label>
													</FormGroup>
													<FormGroup check>
														<Label check>
															<Input
																type="radio"
																name={question.id}
																value="3"
																checked={answers.find(answer => answer.qid === question.id).answer === 3}
																onChange={this.onSelectChoice}
															/>{' '}
															{question.choice3_text}
														</Label>
													</FormGroup>
													<FormGroup check>
														<Label check>
															<Input
																type="radio"
																name={question.id}
																value="4"
																checked={answers.find(answer => answer.qid === question.id).answer === 4}
																onChange={this.onSelectChoice}
															/>{' '}
															{question.choice4_text}
														</Label>
													</FormGroup>
												</FormGroup>
												<hr/>
											</div>
										))}

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
