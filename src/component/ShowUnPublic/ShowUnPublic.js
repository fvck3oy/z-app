import React, { Component } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'reactstrap'
import axios from 'axios'
import auth from '../../service/index'
import CourseCardDetailUnPublic from '../CourseCardDetailUnPublic/CourseCardDetailUnPublic'

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	max-width: 100%;
	margin-top: 30px;
	// margin-left:10px;
	margin-right: 10px;
	background-color: white;
	overflow-x: hidden;
`

export default class ShowUnPublic extends Component {
	constructor(props) {
		super(props)
    this.state = { data: [] }
    this.getData = this.getData.bind(this)
	}
	async getData () {
		await axios.get(`http://159.89.195.144:3013/z-api/course/findUnpublic`).then(res => {
			console.log('DATA UnPub = ', res)
			const { data } = res
			this.setState({ data })
		})
	}

	componentDidMount() {

			this.getData()
	
	}
	render() {
		return (
			<Container>
				{' '}
				<h2>Show All Course UnPublic</h2>

				<Row className="ml-1 mr-1">
					<Col md={12} className="mt-3">
						<Row>
							{this.state.data.map((course, index) => {
								if (course.pathProfileCourse == '') {
									course.pathProfileCourse = 'upload/image/default_picCourse.jpg'
								}
								return (
									<CourseCardDetailUnPublic
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
			</Container>
		)
	}
}
