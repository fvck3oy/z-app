import React, { Component } from 'react'
import {
	Player,
	ControlBar,
	ReplayControl,
	ForwardControl,
	CurrentTimeDisplay,
	TimeDivider,
	PlaybackRateMenuButton,
	VolumeMenuButton
} from 'video-react'
import { Link } from 'react-router-dom'

import 'video-react/dist/video-react.css'

import {
	
	Col,
	Button,
	Card,
	CardImg,
	CardText,
	CardBody,

	CardTitle,
	CardSubtitle
} from 'reactstrap'
import './CourseCardDeleted.css'


export default class CourseCardDeleted extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	// handleSubmit = e => {
	// 	try {
	// 		console.log('go go .... ')

	// 		this.props.history.push(`/overview`)

	// 		e.preventDefault()
	// 	} catch (error) {
	// 		console.error('on error ->', error)
	// 	}
	// }
	componentDidMount() {
		// console.log('ofCourse : : :  : ',this.props.ofCourseId);
	}

	render() {
		const { id, title, subtitle, path ,fuser , luser } = this.props
		const url2 = '/coursedeleted/'
		const url = 'http://locahlost:3013/'
		return (
			<Col md={3} className="mb-4">
				<Card className="fullCardDeleted">
					<CardImg top width="100%" src={`${url}${path}`} alt="Card image cap" />
					<CardBody>
						<CardTitle>{title}</CardTitle>
						<CardSubtitle>by {fuser} {luser} </CardSubtitle>
						<CardText>{subtitle}</CardText>

						<Link to={`${url2}${id}`}>
							<Button className="btn-vdiDeleted w-100">คลิกเพื่อเข้าชม</Button>
						</Link>
					</CardBody>
				</Card>
			</Col>
		)
	}
}
