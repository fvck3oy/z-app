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
import './EditCourseLink.css'
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

export default class EditCourseLink extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount() {}

	render() {
		const { id, title, subtitle, path, fuser, luser, price } = this.props
		const url2 = '/mycourse/edit/'
		const url = 'http://localhost:3013/'
		return (
			<Col md={3} className="mb-4">
				<Card className="fullCardMyCourse">
					<CardImg top width="100%" src={`${url}${path}`} alt="Card image cap" />
					<CardBody>
						<CardTitle>{title}</CardTitle>
						<CardSubtitle>
							by {fuser} {luser}{' '}
						</CardSubtitle>
						<CardText>{subtitle}</CardText>
						{/* <CardText> ราคา {price}</CardText> */}
						<Link to={`${url2}${id}`}>
							<Button className="btn-vdiMyCourse w-100">คลิกเพื่อแก้ไข</Button>
						</Link>
					</CardBody>
				</Card>
			</Col>
		)
	}
}
