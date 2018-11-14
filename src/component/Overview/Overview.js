import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import auth from '../../service/index'
import axios from 'axios'
import CourseList from '../CourseList/CourseList'
import CourseCardDetail from '../CourseCardDetail/CourseCardDetail'
import styled from 'styled-components'
import './Overview.css'

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	max-width: 100%;
	margin-top: 20px;
	// margin-left:10px;
	margin-right: 10px;
	background-color: white;
	overflow-x: hidden;
`

export default class Overview extends Component {
	constructor(props) {
		super(props)
		this.state = { data: [], fillter: '0' }
	}

	getDataUsers = api => {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		this.setState({ fillter: api })
		this.selectURL(api)

		// axios.get(`http://localhost:3013/z-api/course/type/${api}`).then(res => {
		// 	console.log('data card : ', res)

		// 	const { data } = res
		// 	this.setState({ data })
		// })
	}

	selectURL(api) {
		switch (api) {
			case '1':
				return this.fetchData(`http://localhost:3013/z-api/course/type/${api}`)
			case '2':
				return this.fetchData(`http://localhost:3013/z-api/course/type/${api}`)
			case '3':
				return this.fetchData(`http://localhost:3013/z-api/course/type/${api}`)
			case '4':
				return this.fetchData(`http://localhost:3013/z-api/course/type/${api}`)
			case '5':
				return this.fetchData(`http://localhost:3013/z-api/course/type/${api}`)
			case '6':
				return this.fetchData(`http://localhost:3013/z-api/course/type/${api}`)
			case '7':
				return this.fetchData(`http://localhost:3013/z-api/course/type/${api}`)
			case '8':
				return this.fetchData(`http://localhost:3013/z-api/course/type/${api}`)
			default:
				return this.fetchData(`http://localhost:3013/z-api/course/`)
		}
	}

	async fetchData(url) {
		console.log('fetch', url)

		await axios.get(url).then(res => {
			console.log('data card : ', res)
			const { data } = res
			this.setState({ data })
		})
	}

	logOut = e => {
		auth.clearToken()
		this.props.history.push('/')
	}
	componentDidMount() {
		this.getDataUsers()
	}

	render() {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		console.log(userDecoded)
		let uId = userDecoded.id
		let uFn = userDecoded.firstname
		let uLn = userDecoded.lastname
		let uRole = userDecoded.role
		// this.setState({ loginUserId })
		console.log('id is : ', uId, uFn, uLn)
		console.log('role is : ', uRole)

		const { data } = this.state

		return (
			<Container>
				<Row className="mt-5 ml-1 mr-1">
					<Col md={3}>
						<div className="course-list d-flex flex-column">
							<div className="p-2 list" onClick={() => this.getDataUsers()}>
								หน้าแรก
							</div>
							<div className="p-2 list " onClick={() => this.getDataUsers('1')}>
								ภาษา
							</div>
							<div className="p-2 list" onClick={() => this.getDataUsers('2')}>
								คอมพิวเตอร์
							</div>
							<div className="p-2 list" onClick={() => this.getDataUsers('3')}>
								สุขภาพ
							</div>
							<div className="p-2 list" onClick={() => this.getDataUsers('4')}>
								เกมส์
							</div>
							<div className="p-2 list" onClick={() => this.getDataUsers('5')}>
								ทำอาหาร
							</div>
							<div className="p-2 list" onClick={() => this.getDataUsers('6')}>
								กีฬา
							</div>
							<div className="p-2 list" onClick={() => this.getDataUsers('7')}>
								ดนตรี
							</div>
							<div className="p-2 list" onClick={() => this.getDataUsers('8')}>
								อื่น ๆ
							</div>
						</div>
					</Col>

					<Col md={9}>
						<Row>
							{this.state.data.map((course, index) => {
								if (course.pathProfileCourse == '') {
									course.pathProfileCourse = 'upload/image/default_picCourse.jpg'
								}
								return (
									<CourseCardDetail
										key={course.id}
										id={course.id}
										title={course.title}
										subtitle={course.subtitle}
										path={course.pathProfileCourse}
										fuser={course.ofCourse[0].users.firstname}
										luser={course.ofCourse[0].users.lastname}
										price={course.price}
										// ofCourseId={course.ofCourse.id}
									/>
								)
							})}
							{/* <CourseCard /> */}
						</Row>
					</Col>
				</Row>

			</Container>
		)
	}
}
