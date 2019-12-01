import React, { Component } from 'react'
import { FormText, Input, Form, Modal, ModalHeader, ModalBody, Container, Row, Button, Col } from 'reactstrap'
import axios, { post } from 'axios'
import auth from '../../service'

export default class ModalEditCourse extends Component {
	constructor(props) {
		super(props)

		this.state = {
			open: true,
			editmode: false,
			title: '',
			message: '',
			subtitle: '',
			detail: '',
			about: '',

			type: '',
			data: '',
			pathProfileCourse: '',
			IdToPathProfileCourse: '',
			file: null,
			file_picture: null
		}
		this.sentData = this.sentData.bind(this)
		this.upload = this.upload.bind(this)
		this.getData = this.getData.bind(this)
		this.fileUpload = this.fileUpload.bind(this)
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
	getData = () => {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		console.log('course id : ', this.props.id)

		axios.get(`http://localhost:3013/z-api/course/${this.props.id}`).then(res => {
			const { data } = res
			console.log('DATA MY EACH COURSE = ', data)
			this.setState({ data: data[0] })
			data.map(course => {
				if (course) {
					this.setState(
						{
							title: course.title,
							subtitle: course.subtitle,
							detail: course.detail,
							about: course.about,
							type: course.type
						},
						() => console.log('log ->', data)
					)
				}
			})
		})
	}
	async sentData(e) {
		console.log(' add ! ')
		e.preventDefault()
		console.log('try')

		try {
			const data = {
				id: this.props.id,
				title: this.state.title,
				subtitle: this.state.subtitle,
				detail: this.state.detail,
				about: this.state.about,

				type: this.state.type
			}
			console.log('data  = = = ', data)
			await axios.put(`http://localhost:3013/z-api/course/update`, data).then($res => {
				const { data } = $res
				console.log('data Edited Course is ', data)
				this.setState({ data })
				this.toggle()
				// .then(this.props.history.push(`/mycourse/edit/${data.id}`))
			})
			console.log('-----------uploading------------')
			await this.upload()
			console.log('-----------uploaded------------')
		} catch (error) {
			console.log('sent error')
		}
	}
	async upload() {
		await this.fileUpload(this.state.file).then(response => {
			console.log('res . data : ', response.data)
			const dataPic = {
				id: this.props.id,
				pathProfileCourse: response.data.file.path
			}
			console.log('dataPic' , dataPic);
			
			// const { data } = response.data
			axios.post(`http://localhost:3013/z-api/course/UpdatePathPictureCourse`, dataPic).then($res => {
				const { data } = $res
				console.log('what is the path : ', data)

				// const { data } = $res
				// this.setState({ message: data.message })
			})
		})
	}

	componentDidMount() {
		console.log('prop id ', this.props.id)
		this.getData(this.props.id)
	}

	render() {
		const { onClose, id, getData } = this.props
		const { type } = this.state
		return (
			<div>
				<Modal style={{ fontSize: '1rem' }} size="lg" isOpen={this.state.open} toggle={onClose}>
					<ModalHeader toggle={onClose}>
						<div className="title">EditProfile</div>
					</ModalHeader>

					<ModalBody>
						<Container className="">
							{/* <Row> */}
							<Col md={12}>
								<Col md={12} className="TextNewAddCourse">
									Edit Your Course
								</Col>

								<Form onSubmit={this.sentData}>
									<Row md={12} className="mt-2">
										<Col md={4} className="TextAddCourse">
											หัวข้อ
										</Col>
										<Col md={8}>
											<div className="d-flex">
												<input
													style={{ fontSize: '8px !important' }}
													name="title"
													className="InputAddCourse"
													type="text"
													placeholder="สอนการทำเว็บด้วย React"
													onChange={this.handleInputChange}
													value={this.state.title}
													// invalid={String(this.state.invalidemail)}
												/>
											</div>
										</Col>
									</Row>
									<Row className="mt-2">
										<Col md={4} className="TextAddCourse">
											คำเชิญชวน
										</Col>

										<Col md={8}>
											<div className="d-flex">
												<input
													style={{ fontSize: '8px !important' }}
													name="subtitle"
													className="InputAddCourse"
													type="text"
													placeholder="React ดีอย่างไร คลิก !"
													onChange={this.handleInputChange}
													value={this.state.subtitle}
													// invalid={String(this.state.invalidemail)}
												/>
											</div>
										</Col>
									</Row>
									<Row className="mt-2">
										<Col md={4} className="TextAddCourse">
											รายละเอียด
										</Col>

										<Col md={8}>
											<div className="d-flex">
												<textarea
													style={{ fontSize: '8px !important' }}
													name="detail"
													className="InputAddCourse"
													style={{ height: '150px' }}
													type="text"
													placeholder="เป็นคอร์สสอนการพัฒนาเว็บไซต์ด้วย React Framework"
													onChange={this.handleInputChange}
													value={this.state.detail}
													// invalid={String(this.state.invalidemail)}
												/>
											</div>
										</Col>
									</Row>
									<Row className="mt-2">
										<Col md={4} className="TextAddCourse">
											เกี่ยวกับผู้สอน
										</Col>

										<Col md={8}>
											<div className="d-flex">
												<textarea
													style={{ fontSize: '8px !important', height: '150px' }}
													name="about"
													className="InputAddCourse"
													type="text"
													placeholder="สอนโดย Pumin มีประสบการณ์เป็น Web Developer มามากกว่า 3ปี !"
													onChange={this.handleInputChange}
													value={this.state.about}
													// invalid={String(this.state.invalidemail)}
												/>
											</div>
										</Col>
									</Row>
									
									<Row className="mt-2">
										<Col md={4} className="TextAddCourse">
											Type
										</Col>
										<Col md={8}>
											<div>
												<Input type="select" name="type" value={type} onChange={this.handleInputChange} style={{ width: '160px' }}>
													<option value="0">โปรดเลือก</option>
													<option value="1">ภาษา</option>
													<option value="2">คอมพิวเตอร์</option>
													<option value="3">สุขภาพ</option>
													<option value="4">เกมส์</option>
													<option value="5">ทำอาหาร</option>
													<option value="6">กีฬา</option>
													<option value="7">ดนตรี</option>
													<option value="8">อื่น ๆ</option>
												</Input>
											</div>
										</Col>
									</Row>

									<Row className="upPicture">
										<Col md={4} className="TextAddCourse middle">
											เลือกภาพหน้าปกของคอร์ส
										</Col>
										<Col>
											<Input type="file" name="file_picture" id="exampleFile" onChange={this.onChangePicture} />
											<FormText color="muted">เลือกภาพหน้าปกของคอร์สเรียนของคุณ</FormText>
										</Col>
									</Row>

									<div className="btn-mid">
										<Button className="submitAddCourse" size="lg">
											Confirm
										</Button>
									</div>
								</Form>
							</Col>
							{/* </Row> */}
						</Container>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}
