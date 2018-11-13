import React, { Component } from 'react'
import { Container, Row, Col, Form, FormText, Label, Button, FormGroup, Input } from 'reactstrap'
import { WithContext as ReactTags } from 'react-tag-input'
import axios, { post } from 'axios'
import auth from '../../service/index'
import './AddCourse.css'

const KeyCodes = {
	// comma: 188,
	enter: 13
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

export default class AddCourse extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			message: '',
			subtitle: '',
			detail: '',
			lesson: '',
			about: '',
			price: '',
			type: '',
			file: null,
			file_video: '',
			data: '',
			// inputs: ['input-0']
			tags: [],
			ofCourse: [],
			id: '',
			pathProfileCourse: '',
			IdToPathProfileCourse: ''
		}
		this.fileUpload = this.fileUpload.bind(this)
		this.videoUpload = this.videoUpload.bind(this)
		this.onChange = this.onChange.bind(this)
		this.sentData = this.sentData.bind(this)
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
				title: this.state.title,
				subtitle: this.state.subtitle,
				detail: this.state.detail,
				about: this.state.about,
				price: this.state.price,
				type: this.state.type,
				lesson: this.state.tags.map($objTag => {
					return { name: $objTag.name }
				}),
				userId: uId
			}
			console.log('data  = = =', data)

			await axios.post(`http://localhost:3013/z-api/course/`, data).then($res => {
				const { data } = $res
				console.log('data newCourse is ', data)
				this.setState({ IdToPathProfileCourse: data.id })
				console.log('id to up : ', this.state.IdToPathProfileCourse)
			})

			console.log('-----------uploading------------')

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
			await this.videoUpload(this.state.file_video).then(response => {
				console.log('res . data : ', response.data)
				const dataPic = {
					id: this.state.IdToPathProfileCourse,
					pathVideoCourse: response.data.file.path
				}
				// const { data } = response.data
				axios.post(`http://localhost:3013/z-api/course/SavePathVideoCourse`, dataPic).then($res => {
					const { data } = $res
					console.log('what is the path : ', data)

					// const { data } = $res
					// this.setState({ message: data.message })
				})
			})

			console.log('-----------uploaded------------')
		} catch (error) {
			console.log('sent error')
		}
	}

	handleInputChange = e => {
		const { name, value } = e.target
		this.setState({ [name]: value })
		this.setState({ message: '' })
		console.log({ [name]: value })
	}

	handleDelete = i => {
		const { tags } = this.state
		this.setState({
			tags: tags.filter((tag, index) => index !== i)
		})
	}

	handleAddition = tag => {
		this.setState(state => ({ tags: [...state.tags, tag] }))
	}

	onChange(e) {
		this.setState({ file: e.target.files[0] })
	}

	onChangePicture = e => {
		this.setState({ file: e.target.files[0] })
	}
	onChangeVideo = e => {
		this.setState({ file_video: e.target.files[0] })
	}
	onChangeSheet = e => {
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

	videoUpload(file) {
		const url = 'http://localhost:3013/z-api/course/UploadVideoCourse'
		const formData = new FormData()
		// formData.append('file', file)
		formData.append('videoData', file)
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		return post(url, formData, config)
	}

	render() {
		const { tags, suggestions, type, nLesson } = this.state
		return (
			<Container className="con">
				<Row md={12}>
					<Col md={12}>
						<Form onSubmit={this.sentData}>
							<Row md={12} className="mt-2">
								<Col md={6} className="">
									Title
								</Col>
								<Col md={6}>
									<div className="d-flex">
										<input
											style={{ fontSize: '8px !important' }}
											name="title"
											className=""
											type="text"
											placeholder=""
											onChange={this.handleInputChange}
											value={this.state.title}
											// invalid={String(this.state.invalidemail)}
											required
										/>
									</div>
								</Col>
							</Row>

							<Row className="mt-2">
								<Col md={6} className="">
									SubTitle
								</Col>

								<Col md={6}>
									<div className="d-flex">
										<input
											style={{ fontSize: '8px !important' }}
											name="subtitle"
											className=""
											type="text"
											placeholder=""
											onChange={this.handleInputChange}
											value={this.state.subtitle}
											// invalid={String(this.state.invalidemail)}
											required
										/>
									</div>
								</Col>
							</Row>

							<Row className="mt-2">
								<Col md={6} className="">
									Detail
								</Col>

								<Col md={6}>
									<div className="d-flex">
										<input
											style={{ fontSize: '8px !important' }}
											name="detail"
											className=""
											type="text"
											placeholder=""
											onChange={this.handleInputChange}
											value={this.state.detail}
											// invalid={String(this.state.invalidemail)}
											required
										/>
									</div>
								</Col>
							</Row>

							{/* <div className="">
								<div className="">
									Lesson
									<input
										style={{ fontSize: '8px !important' }}
										name="lesson"
										className=""
										type="text"
										placeholder="detail"
										onChange={this.handleInputChange}
										value={this.state.lesson}
										// invalid={String(this.state.invalidemail)}
										required
									/>
								</div>
							</div> */}

							<Row className="mt-2">
								<Col md={6} className="">
									About
								</Col>

								<Col md={6}>
									<div className="d-flex">
										<input
											style={{ fontSize: '8px !important' }}
											name="about"
											className=""
											type="text"
											placeholder=""
											onChange={this.handleInputChange}
											value={this.state.about}
											// invalid={String(this.state.invalidemail)}
											required
										/>
									</div>
								</Col>
							</Row>

							<Row className="mt-2">
								<Col md={6} className="">
									Price
								</Col>

								<Col md={6}>
									<div className="d-flex">
										<input
											style={{ fontSize: '8px !important' }}
											name="price"
											className=""
											type="text"
											placeholder=""
											onChange={this.handleInputChange}
											value={this.state.price}
											// invalid={String(this.state.invalidemail)}
											required
										/>
										บาท
									</div>
								</Col>
							</Row>

							<Row className="mt-2">
								<Col md={6} className="">
									Type
								</Col>
								<Col md={6}>
									<FormGroup>
										<Input type="select" name="type" value={type} onChange={this.handleInputChange} required>
											<option value="null">โปรดเลือก</option>
											<option value="1">ภาษา</option>
											<option value="2">คอมพิวเตอร์</option>
											<option value="3">สุขภาพ</option>
											<option value="4">เกมส์</option>
											<option value="5">ทำอาหาร</option>
											<option value="6">กีฬา</option>
											<option value="7">ดนตรี</option>
											<option value="8">อื่น ๆ</option>
										</Input>
									</FormGroup>
								</Col>
							</Row>

							<Row className="lessonTags mt-2">
								<div className="tag-full-w">
									<Col md={12}>Lesson</Col>
									<ReactTags
										handleDelete={this.handleDelete}
										handleAddition={this.handleAddition}
										delimiters={delimiters}
										className="taginput"
										tags={tags}
										labelField={'name'}
										placeholder="เช่น บทที่ 1 การทำระบบยืนยันตัวตน (กด Enter เพื่อยืนยัน)"
									/>
								</div>
							</Row>

							<FormGroup className="upPicture">
								<Label for="exampleFile">Choose Your Picture</Label>
								<Input type="file" name="file_picture" id="exampleFile" onChange={this.onChangePicture} />
								<FormText color="muted">เลือกภาพหน้าปกของคอร์สเรียนของคุณ</FormText>
							</FormGroup>

							<FormGroup className="upVideo">
								<Label for="exampleFile">Choose Your Video</Label>
								<Input type="file" name="file_video" id="exampleFile2" onChange={this.onChangeVideo} />
								<FormText color="muted">เลือกวิดิโอของคอร์สเรียนของคุณ</FormText>
							</FormGroup>

							{/* <FormGroup className="upSheet">
								<Label for="exampleFile">Choose Your Sheet</Label>
								<Input type="file" name="fil_sheet" id="exampleFile" onChange={this.onChangeSheet} />
								<FormText color="muted">เลือกเอกสารของคอร์สเรียนของคุณ</FormText>
							</FormGroup> */}

							<Button color="submit" size="lg" block>
								Confirm
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		)
	}
}
