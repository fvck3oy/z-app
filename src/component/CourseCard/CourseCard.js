import React, { Component } from 'react'
import { Button } from 'reactstrap'
import CourseCardDetail from '../CourseCardDetail/CourseCardDetail'
import styled from 'styled-components'
const Container = styled.div`
	background-color: white;
`

export default class CourseCard extends Component {
	render() {
		return (
			<Container>
				{/* Con */}
				<CourseCardDetail />
			</Container>
		)
	}
}
