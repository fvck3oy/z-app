import React, { Component } from 'react'
import axios, { post } from 'axios'
import auth from '../../service/index'
import {
	Form,
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
	Collapse,
	CardSubtitle
} from 'reactstrap'
import ModalEditQuiz from '../ModalEditQuiz/ModalEditQuiz';

export default class Quiz extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			coloapse: false,
			editquiz: false
		}
	}
	toggleCollapse = () => {
		this.setState({ collapse: !this.state.collapse })
	}
	toggleEditQuiz = () => {
		const { editquiz } = this.state
		this.setState({ editquiz: !editquiz })
	}

	render() {
    const { no, question, choice1, choice2, choice3, choice4, correct , course ,idQ } = this.props
    const { editquiz } = this.state
		return (
			<div>
				<hr />

				<div className="">
					<Button className="w-100" color="primary" onClick={this.toggleCollapse} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
						ข้อที่ {no} {question} ?
					</Button>
				</div>
				<Collapse isOpen={this.state.collapse}>
					<Card>
						<Button color="danger" onClick={() => this.toggleEditQuiz(true)} className="m-2">
							Edit
						</Button>
						<CardBody className="d-flex mb-5 lesson-body">
							<div>
								คำถาม : {question} ?<br />
								1.{choice1}
								<br />
								2.{choice2}
								<br />
								3.{choice3}
								<br />
								4.{choice4}
								<br />
								คำตอบคือ ข้อ.{correct}
							</div>
						</CardBody>
					</Card>
				</Collapse>
				<hr />
        {editquiz && <ModalEditQuiz id={course} idQ={idQ} onClose={() => this.toggleEditQuiz(false)} />}
		
			</div>
		)
	}
}
