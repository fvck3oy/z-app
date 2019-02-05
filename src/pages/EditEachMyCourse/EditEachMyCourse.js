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
import { Link } from 'react-router-dom'
import './EditEachMyCourse.css'
import axios from 'axios'
import auth from '../../service'
import ModalEditCourse from '../../component/ModalEditCourse/ModalEditCourse'
import ModalAddLesson from '../../component/ModalAddLesson/ModalAddLesson'
export default class EditEachMyCourse extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			dataUser: [],
			editmode: false,
			addmode: false,
			title: '',
			message: '',
			subtitle: '',
			detail: '',
			lesson: '',
			about: '',
			price: '',
			type: ''
		}
		this.sentData = this.sentData.bind(this)
	}
	getData = e => {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		axios.get(`http://localhost:3013/z-api/course/${this.props.match.params.id}`).then(res => {
			const { data } = res
			console.log('DATA MY EACH COURSE = ', data[0])
			this.setState({ data: data[0], dataUser: data[0].ofCourse[0].users })
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
				id: this.props.match.params.id,
				title: this.state.title,
				subtitle: this.state.subtitle,
				detail: this.state.detail,
				about: this.state.about,
				price: this.state.price,
				type: this.state.type
			}

			await axios.put(`http://localhost:3013/z-api/course/update`, data).then($res => {
				const { data } = $res
				this.setState({ data })
			})

			console.log('-----------uploading------------')
			await this.upload().then(this.props.history.push(`/overview`))
			console.log('-----------uploaded------------')
		} catch (error) {
			console.log('sent error')
		}
	}
	toggleEdit = () => {
		const { editmode } = this.state
		this.setState({ editmode: !editmode })
	}

	toggleAdd = () => {
		console.log('kuy');
		const { addmode } = this.state
		this.setState({ addmode: !addmode })
	}

	handleInputChange = e => {
		const { name, value } = e.target
		this.setState({ [name]: value })
		this.setState({ message: '' })
		console.log({ [name]: value })
	}

	componentDidMount() {
		this.getData()
	}

	render() {
		const url = 'http://localhost:3013/'
		const { data, editmode, type, dataUser, addmode } = this.state
		const { modal, id } = this.props

		return (
			<Container className="con-edit-course">
				<h2>EditEachMyCourse</h2>
				<Row>
					<Col md={3} className="mb-4">
						<Card className="fullCardMyCourse">
							<CardImg top width="100%" src={`${url}${data.pathProfileCourse}`} alt="Card image cap" />
							<CardBody>
								<CardTitle>{data.title}</CardTitle>
								<CardSubtitle>
									by {dataUser.firstname} {dataUser.lastname}{' '}
								</CardSubtitle>
								<CardText>{data.subtitle}</CardText>{' '}
								<Button color="danger" onClick={() => this.toggleEdit(true)}>
									Edit
								</Button>
							</CardBody>
						</Card>
					</Col>
					<Col md={9} className="course-detail">
						<div>
							Title : {data.title}
							<br />
							Subtitle : {data.subtitle}
							<br />
							Detail : {data.detail}
							<br />
							About : {data.about}
							<br />
							Price : {data.price}
							<br />
							Rating : {data.rating}
						</div>
					</Col>
				</Row>

				<Row>
					<Col md={3} className="">
						<div>
							<Button color="success" className="btn-add-lesson" onClick={() => this.toggleAdd(true)}>
								Add Lesson
							</Button>{' '}
						</div>
					</Col>
				</Row>
				{editmode && <ModalEditCourse id={this.props.match.params.id} onClose={() => this.toggleEdit(false)} />}
				{addmode && <ModalAddLesson id={this.props.match.params.id} onClose={() => this.toggleAdd(false)} />}
			</Container>
		)
	}
}
