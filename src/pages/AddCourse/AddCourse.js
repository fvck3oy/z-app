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
			type: '',
			file: null,
			file_video: null,
			file_sheet: null,
			file_picture: null,
			data: '',
			tags: [],
			ofCourse: [],
			id: '',
			pathProfileCourse: '',
			IdToPathProfileCourse: '',
			editmode: false
		}
		this.fileUpload = this.fileUpload.bind(this)
		this.videoUpload = this.videoUpload.bind(this)
		this.sheetUpload = this.sheetUpload.bind(this)
		this.onChange = this.onChange.bind(this)
		this.sentData = this.sentData.bind(this)
		this.upload = this.upload.bind(this)
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
				id: this.state.id,
				title: this.state.title,
				subtitle: this.state.subtitle,
				detail: this.state.detail,
				about: this.state.about,
				type: this.state.type,
				lesson: this.state.tags.map($objTag => {
					return { name: $objTag.name }
				}),
				userId: uId
			}
			console.log('data  = = =', data)

			await axios.post(`http://159.89.195.144:3013/z-api/course/`, data).then($res => {
				const { data } = $res
				console.log('data newCourse is ', data)
				this.setState({ IdToPathProfileCourse: data.id })
				console.log('id to up : ', this.state.IdToPathProfileCourse)
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
			axios.post(`http://159.89.195.144:3013/z-api/course/SavePathPictureCourse`, dataPic).then($res => {
				const { data } = $res
				console.log('what is the path : ', data)

				// const { data } = $res
				// this.setState({ message: data.message })
			})
		})
		// await this.videoUpload(this.state.file_video).then(response => {
		// 	console.log('res . data : ', response.data)
		// 	const dataPic = {
		// 		id: this.state.IdToPathProfileCourse,
		// 		pathVideoCourse: response.data.file.path
		// 	}
		// 	// const { data } = response.data
		// 	axios.post(`http://159.89.195.144:3013/z-api/course/SavePathVideoCourse`, dataPic).then($res => {
		// 		const { data } = $res
		// 		console.log('what is the path : ', data)

		// 		// const { data } = $res
		// 		// this.setState({ message: data.message })
		// 	})
		// })

		// await this.sheetUpload(this.state.file_sheet).then(response => {
		// 	console.log('res . data : ', response.data)
		// 	const dataPic = {
		// 		id: this.state.IdToPathProfileCourse,
		// 		pathFile: response.data.file.path
		// 	}
		// 	// const { data } = response.data
		// 	axios.post(`http://159.89.195.144:3013/z-api/course/SavePathFileCourse`, dataPic).then($res => {
		// 		const { data } = $res
		// 		console.log('what is the path : ', data)

		// 		// const { data } = $res
		// 		// this.setState({ message: data.message })
		// 	})
		// })
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
	onChangeFile = e => {
		this.setState({ file_sheet: e.target.files[0] })
	}

	fileUpload(file) {
		const url = 'http://159.89.195.144:3013/z-api/course/UploadPictureCourse'
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
		const url = 'http://159.89.195.144:3013/z-api/course/UploadVideoCourse'
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

	sheetUpload(file) {
		const url = 'http://159.89.195.144:3013/z-api/course/UploadFileCourse'
		const formData = new FormData()
		// formData.append('file', file)
		formData.append('fileData', file)
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		return post(url, formData, config)
	}
	
	componentDidMount = () => {
		if (this.props.editmode) {
			this.toggle()
		}
	}

	render() {
		const { tags, suggestions, type, nLesson } = this.state
		const { editmode } = this.props

		return (
			<Container className="con">
				<Row>
					<Col md={12}>
						{editmode === true && (
							<Col md={3} className="TextNewAddCourse">
								Edit Your Course
							</Col>
						)}
						{this.state.editmode === false && (
							<Row md={12} className="mt-2">
								<Col md={12} className="TextNewAddCourse">
									New Your Course
								</Col>
							</Row>
						)}
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
											required
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
											required
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
											required
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
											required
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
										<Input
											type="select"
											name="type"
											value={type}
											// defaultValue='0'
											onChange={this.handleInputChange}
											style={{ width: '160px' }}
											required
										>
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
							{/* <Row className="mt-2">
								{' '}
								<Col md={4} className="TextAddCourse">
									บทเรียน
								</Col>{' '}
								<Col md={8} className="lessonTags">
									<div className="tag-full-w d-flex">
										<ReactTags
											handleDelete={this.handleDelete}
											handleAddition={this.handleAddition}
											delimiters={delimiters}
											className="taginput"
											tags={tags}
											labelField={'name'}
											placeholder="เช่น บทที่ 1 การทำระบบยืนยันตัวตน (กด Enter เพื่อยืนยัน) ได้มากกว่า 1 ข้อ"
										/>
									</div>
								</Col>
							</Row> */}
							<Row className="upPicture">
								<Col md={4} className="TextAddCourse middle">
									เลือกภาพหน้าปกของคอร์ส
								</Col>
								<Col>
									<Input type="file" name="file_picture" id="exampleFile" onChange={this.onChangePicture} />
									<FormText color="muted">เลือกภาพหน้าปกของคอร์สเรียนของคุณ</FormText>
								</Col>
							</Row>
							{/* <Row className="upVideo">
								<Col md={4} className="TextAddCourse">
									เลือกวิดิโอ
								</Col>
								<Col>
									<Input type="file" name="file_video" id="exampleFile2" onChange={this.onChangeVideo} multiple />
									<FormText color="muted">เลือกวิดิโอของคอร์สเรียนของคุณ</FormText>
								</Col>
							</Row>

							<Row className="upVideo">
								<Col md={4} className="TextAddCourse">
									เลือกไฟล์เอกสารของคุณ
								</Col>
								<Col>
									<Input type="file" name="file_sheet" id="exampleFile3" onChange={this.onChangeFile} multiple />
									<FormText color="muted">เลือกเอกสารของคอร์สเรียนของคุณ</FormText>
								</Col>
							</Row> */}
							{/* <FormGroup className="upSheet">
								<Label for="exampleFile">Choose Your Sheet</Label>
								<Input type="file" name="fil_sheet" id="exampleFile" onChange={this.onChangeSheet} />
								<FormText color="muted">เลือกเอกสารของคอร์สเรียนของคุณ</FormText>
							</FormGroup> */}
							<div className="btn-mid">
								<Button className="submitAddCourse" size="lg">
									Confirm
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		)
	}
}
