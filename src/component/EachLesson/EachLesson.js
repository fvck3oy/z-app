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
	Collapse,
	CardSubtitle
} from 'reactstrap'
import './EachLesson.css'
export default class EachLesson extends Component {
	constructor(props, context) {
		super(props, context)

		this.state = {
			// playerSource: 'https://www.youtube.com/embed/7pvk_zflkwU',
			playerSource: '',
			inputVideoUrl: 'http://www.w3schools.com/html/mov_bbb.mp4',
			dataLesson: [],
			collapse: false
		}
	}
	toggleCollapse = () => {
		this.setState({ collapse: !this.state.collapse })
	}

	render() {
		const { titleLesson, detailLesson, pathVideo, pathFile, idL } = this.props
		const url = 'http://localhost:3013/'
		return (
			<div>
				<Button color="primary" onClick={this.toggleCollapse} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
					บทที่ {idL} {titleLesson}
				</Button>
				<Collapse isOpen={this.state.collapse}>
					<Card>
						<CardBody className="d-flex lesson-body">
							<div className="mid">{titleLesson}</div>
							<div className="mid">{detailLesson}</div>
							<div className="lesson-video">
								<div className="">
									<Player ref="player" videoId="video-1">
										<source src={`${url}${pathVideo}`} />
									</Player>
								</div>
							</div>
							<div className="mid mt-2">
								{' '}
								<a href={`${url}${pathFile}`} download>
									ไฟล์ประกอบการเรียน
								</a>
							</div>
						</CardBody>
					</Card>
				</Collapse>
			</div>
		)
	}
}
