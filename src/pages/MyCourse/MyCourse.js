import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'
import auth from '../../service'
import CourseCardDatailMyCourse from '../../component/CourseCardDetailMyCourse/CourseCardDatailMyCourse'
export default class MyCourse extends Component {
	constructor(props) {
		super(props)
		this.state = { data: [] }
	}
	getData = e => {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		console.log('getting')
		axios.get(`http://localhost:3013/z-api/ofcourse/mycourse/${uId}`).then(res => {
			console.log('DATA MY COURSE = ', res)
			const { data } = res
			this.setState({ data })
		})
	}
	componentDidMount() {
		console.log('did mount')
		this.getData()
	}
	render() {
		return (
			<Container className="mt-5">
				<Row>
					<div className="mt-5">
						<h2>My Course</h2>
					</div>
				</Row>
				<Row>
					{this.state.data.map((course, index) => {
						if (course.pathProfileCourse == '') {
							course.pathProfileCourse = 'upload/image/default_picCourse.jpg'
						}
						return (
							<CourseCardDatailMyCourse
								key={course.course.id}
								id={course.course.id}
								title={course.course.title}
								subtitle={course.course.subtitle}
								path={course.course.pathProfileCourse}
								// fuser={course.course.users.firstname}
								// luser={course.course.users.lastname}
								price={course.course.price}
							/>
						)
					})}
				</Row>
			</Container>
		)
	}
}
