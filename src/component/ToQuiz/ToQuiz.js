import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import ModalQuizzes from '../ModalQuizzes/ModalQuizzes'
import axios from 'axios'
export default class ToQuiz extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fuck: '',
			editmode: false,
			dataQuestion: ''
		}
		this.getData = this.getData.bind(this)
	}
	toggleEdit = () => {
		const { editmode } = this.state
		this.setState({ editmode: !editmode })
	}
	componentDidMount() {
		this.getData()
	}
	async getData() {
		console.log('getDataQuestion')
		await axios.get(`http://localhost:3013/z-api/question/${this.props.id}`).then(res => {
			const { data } = res
			this.setState({ dataQuestion: data })
			console.log('data question : ', data)
		})
	}
	render() {
		const { editmode, dataQuestion } = this.state
		return (
			<div>
				<Row>
					<Col>
						{dataQuestion.length == 10 && (
							<Button color="success" onClick={() => this.toggleEdit()}>
								Start to Quiz
							</Button>
						)}
					</Col>
				</Row>
				{editmode && <ModalQuizzes id={this.props.id} onClose={() => this.toggleEdit(false)} />}
			</div>
		)
	}
}
