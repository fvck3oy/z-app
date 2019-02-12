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
import axios from 'axios'
import auth from '../../service/index'
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
	CardSubtitle,
	Progress
} from 'reactstrap'
import './EachLesson.css'
export default class EachLesson extends Component {
	constructor(props, context) {
		super(props, context)

		this.state = {
			playerSource: '',
			inputVideoUrl: 'http://www.w3schools.com/html/mov_bbb.mp4',
			collapse: false,
			currentTime: 0,
			player: '',
			duration: '',
			trackTime: ''
		}
	}
	toggleCollapse = () => {
		this.setState({ collapse: !this.state.collapse })
	}

	componentDidMount() {
		// subscribe state change
		this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this))
	}
	handleStateChange(state, prevState) {
		const trackTime = (state.currentTime * 100) / state.duration

		this.setState({
			player: state,
			currentTime: state.currentTime,
			duration: state.duration,
			trackTime: trackTime //calculate,
		})
		const { idL } = this.props
		const id = String({ idL })
		localStorage.setItem(`video${this.props.idL}`, this.state.currentTime)
	}

	render() {
		const { titleLesson, detailLesson, pathVideo, pathFile, idL, playbackTime } = this.props
		const id = String({ idL })
		const url = 'http://localhost:3013/'
		return (
			<div>
				<hr />
				<div className="d-flex justify-content-between title-lesson" onClick={this.toggleCollapse}>
					<div>
						บทที่ {idL} {titleLesson}
					</div>
					<div className="show-lesson"> V </div>
				</div>
				<Collapse isOpen={this.state.collapse}>
					<Card>
						<CardBody className="d-flex lesson-body">
							<div className="mid">{titleLesson}</div>
							<div className="mid">{detailLesson}</div>
							<div className="lesson-video mt-4">
								<div className="">
									<Player ref="player" startTime={playbackTime} videoId={id}>
										<source src={`${url}${pathVideo}`} />
									</Player>
								</div>
							</div>
							<div className="mid mt-2">
								{' '}
								<div>
									<a href={`${url}${pathFile}`} download>
										ไฟล์ประกอบการเรียน
									</a>
								</div>
								{/* <div>
									<br />
									วินาทีปัจจุบัน : {this.state.player.currentTime}
									<br />
									เวลาทั้งหมด (วินาที) : {this.state.duration}
									<br />
									เปอร์เซ็นต์ที่กำลังดู : {this.state.trackTime}
								</div> */}
							</div>
							<Progress animated value={this.state.trackTime}>
								{this.state.trackTime}{' '}
							</Progress>
						</CardBody>
					</Card>
				</Collapse>
				<hr />
			</div>
		)
	}
}
