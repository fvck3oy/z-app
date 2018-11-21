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
	Form,
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
	CardSubtitle
} from 'reactstrap'
import './CourseCardDetailUnPublic.css'
import EachVideo from '../EachVideo/EachVideo'

export default class CourseCardDetailUnPublic extends Component {
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
		const { id, title, subtitle, path ,fuser , luser ,price} = this.props
		const url2 = '/videounpublic/'
		const url = 'http://localhost:3013/'
		return (
			<Col md={3}>
				<Card className="fullCardUnPublic">
					<CardImg top width="100%" src={`${url}${path}`} alt="Card image cap" />
					<CardBody>
						<CardTitle>{title}</CardTitle>
						<CardSubtitle>by {fuser} {luser} </CardSubtitle>
						<CardText>{subtitle}</CardText>
						{/* <CardText> ราคา {price}</CardText> */}
						<Link to={`${url2}${id}`}>
							<Button className="btn-vdiUnPublic">คลิกเพื่อเข้าชม</Button>
						</Link>
					</CardBody>
				</Card>
			</Col>
		)
	}
}
