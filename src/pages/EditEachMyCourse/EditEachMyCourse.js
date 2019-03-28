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
	ModalBody,
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import './EditEachMyCourse.css'
import axios, { post } from 'axios'
import auth from '../../service'
import ModalEditCourse from '../../component/ModalEditCourse/ModalEditCourse'
import ModalAddLesson from '../../component/ModalAddLesson/ModalAddLesson'
import EditEachLesson from '../../component/EditEachLesson/EditEachLesson'
import ModalCreateQuestion from '../../component/ModalCreateQuestion/ModalCreateQuestion'
import ModalEditLesson from '../../component/ModalEditLesson/ModalEditLesson'
import Quiz from '../../component/Quiz/Quiz'
export default class EditEachMyCourse extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			dataUser: [],
			editmode: false,
			addmode: false,
			editlesson: false,
			title: '',
			message: '',
			subtitle: '',
			detail: '',
			lesson: '',
			about: '',
			price: '',
			type: '',
			dataLesson: [],
			courseId: '',
			pathProfileCourse: '',
			IdToPathProfileCourse: '',
			file: null,
			file_picture: null,
			activeTab: '1',
			toggleQuiz: false,
			create_question: false,
			dataQuestion:[]
		}
		this.sentData = this.sentData.bind(this)
		this.upload = this.upload.bind(this)
		this.getData = this.getData.bind(this)
		this.fileUpload = this.fileUpload.bind(this)
	}
	async getData(e) {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		await axios.get(`http://localhost:3013/z-api/course/${this.props.match.params.id}`).then(res => {
			const { data } = res
			// console.log('DATA MY EACH COURSE = ', data[0])
			this.setState({ data: data[0], dataUser: data[0].ofCourse[0].users, courseId: data[0].id })
		})

		await axios.get(`http://localhost:3013/z-api/lesson/eachlesson/${this.props.match.params.id}`).then(res => {
			const { data } = res
			this.setState({ dataLesson: data })
			// console.log('data lesson : ', data)
		})

		await axios.get(`http://localhost:3013/z-api/question/${this.props.match.params.id}`).then(res => {
			const { data } = res
			this.setState({ dataQuestion: data })
		console.log('data question : ', data)
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
	async upload() {
		await this.fileUpload(this.state.file).then(response => {
			console.log('res . data : ', response.data)
			const dataPic = {
				id: this.state.IdToPathProfileCourse,
				pathProfileCourse: response.data.file.path
			}
			// const { data } = response.data
			axios.post(`http://localhost:3013/z-api/course/SavePathPictureCourse`, dataPic).then($res => {
				const { data } = $res
				console.log('what is the path : ', data)

				// const { data } = $res
				// this.setState({ message: data.message })
			})
		})
	}
	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			})
		}
	}

	toggleEdit = () => {
		const { editmode } = this.state
		this.setState({ editmode: !editmode })
	}

	toggleAdd = () => {
		const { addmode } = this.state
		this.setState({ addmode: !addmode })
	}

	toggleQuiz = () => {
		const { create_question } = this.state
		this.setState({ create_question: !create_question })
	}

	onChangePicture = e => {
		this.setState({ file: e.target.files[0] })
	}
	fileUpload(file) {
		const url = 'http://localhost:3013/z-api/course/UploadPictureCourse'
		const formData = new FormData()
		// formData.append('file', file)
		formData.append('imageData', file)
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		return post(url, formData, config)
	}

	// toggleEditLesson = () => {
	// 	const { editlesson } = this.state
	// 	this.setState({ editlesson: !editlesson })
	// }

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
		const { data, editmode, type, dataUser, addmode, editlesson, courseId, create_question } = this.state
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
								<Button color="danger" onClick={() => this.toggleEdit(true)} className="w-100">
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
							Price : {data.price} บาท
							<br />
							Rating : {data.rating}
						</div>
					</Col>
				</Row>
				<div>
					<Nav tabs>
						<NavItem className="tab">
							<NavLink
								className={classnames({ active: this.state.activeTab === '1' })}
								onClick={() => {
									this.toggle('1')
								}}
							>
								Lesson
							</NavLink>
						</NavItem>
						<NavItem className="tab">
							<NavLink
								className={classnames({ active: this.state.activeTab === '2' })}
								onClick={() => {
									this.toggle('2')
								}}
							>
								Quiz
							</NavLink>
						</NavItem>
					</Nav>
					<TabContent activeTab={this.state.activeTab}>
						<TabPane tabId="1">
							<Row>
								<Col sm="12">
									<Button color="success mt-4" onClick={() => this.toggleAdd(true)}>
										Add Lessons
									</Button>{' '}
									{this.state.dataLesson.map((each, index) => {
										return (
											<div key={each.id}>
												<EditEachLesson
													idL={index + 1}
													idC={courseId}
													titleLesson={each.titleLesson}
													detailLesson={each.detailLesson}
													pathVideo={each.pathVideo}
													pathFile={each.pathFile}
												/>
											</div>
										)
									})}
								</Col>
							</Row>
						</TabPane>
						<TabPane tabId="2">
							<Row>
								<Col sm="12">
									<Button color="success mt-4" onClick={() => this.toggleQuiz(true)}>
										Create Quiz
									</Button>
									{this.state.dataQuestion.map((each, index) => {
										return (
											<div key={each.id}>
												<Quiz
												idQ={each.id}
													no={index + 1}
													course={each.course.id}
													question={each.question_text}
													choice1={each.choice1_text}
													choice2={each.choice2_text}
													choice3={each.choice3_text}
													choice4={each.choice4_text}
													correct={each.correct}
												/>
											</div>
										)
									})}
								</Col>
							</Row>
						</TabPane>
					</TabContent>
				</div>
				{editmode && <ModalEditCourse id={this.props.match.params.id} onClose={() => this.toggleEdit(false)} />}
				{addmode && <ModalAddLesson id={this.props.match.params.id} onClose={() => this.toggleAdd(false)} />}
				{create_question && <ModalCreateQuestion id={this.props.match.params.id} onClose={() => this.toggleQuiz(false)} />}
				{/* {editlesson && <ModalEditLesson id={this.props.match.params.id} onClose={() => this.toggleEditLesson(false)} />} */}
			</Container>
		)
	}
}
