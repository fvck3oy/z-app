import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import axios from 'axios'
import auth from '../../service'
import styled from 'styled-components'
import CourseCardDeleted from '../../component/CourseCardDeleted/CourseCardDeleted'

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	max-width: 100%;
	margin-top: 100px;
	// margin-left:10px;
	margin-right: 10px;
	background-color: white;
	overflow-x: hidden;
`

export default class CourseDeleted extends Component {
	constructor(props) {
		super(props)
		this.state = { data: [] }
	}
	getData = e => {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		console.log('getting')
		axios.get(`http://localhost:3013/z-api/course/alldeleted/`).then(res => {
			console.log('DATA MY COURSE = ', res)
			const { data } = res
			this.setState({ data })
		})
	}
	componentDidMount() {
    let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
    let uId = userDecoded.id
    let uRole = userDecoded.role
		console.log('did mount')
    if (uRole != 3) {
      this.getData()
    } else {
      this.props.history.push(`/overview`)
    }
  }
 
	render() {
		return (
			<Container><div className="mr-5 ml-5">
				{' '}
				<h2>Show All Course Deleted</h2>
				<Row className="ml-1 mr-1">
					<Col md={12} className="mt-3">
						<Row>
							{this.state.data.map((course, index) => {
								if (course.pathProfileCourse == '') {
									course.pathProfileCourse = 'upload/image/default_picCourse.jpg'
								}
								return (
									<CourseCardDeleted
										key={course.id}
										id={course.id}
										title={course.title}
										subtitle={course.subtitle}
										path={course.pathProfileCourse}
										fuser={course.ofCourse[0].users.firstname}
										luser={course.ofCourse[0].users.lastname}
										price={course.price}
									/>
								)
							})}
						</Row>
					</Col>
				</Row>
        </div>
			</Container>
		)
	}
}
