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
			trackTime: '',
			currentCount: 0,
			dataTime: []
		}
		this.timer = this.timer.bind(this)
		this.getTimer = this.getTimer.bind(this)
	}
	toggleCollapse = () => {
		this.setState({ collapse: !this.state.collapse })
	}

	// saveTimePlayBack = (e, c) => {
	// 	const timer = setInterval(function() {
	// 		let user = auth.getToken()
	// 		let userDecoded = auth.decodeToken(user)
	// 		let uId = userDecoded.id
	// 		const data = {
	// 			time: c,
	// 			userId: uId,
	// 			lessonId: e.idL
	// 		}
	// 		// axios.patch(`http://localhost:3013/z-api/timeplayback/update`, data).then($res => {
	// 		// 	const { data } = $res

	// 		// })
	// 		console.log('save time', data)
	// 	}, 5000)
	// }

	componentDidMount() {
		// subscribe state change

		this.getTimer()
		this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this))
		// this.saveTimePlayBack(this.props)
		var intervalId = setInterval(this.timer, 5000)
		// store intervalId in the state so it can be accessed later:
		this.setState({ intervalId: intervalId })
	}

	componentWillUnmount = () => {
		// use intervalId from the state to clear the interval
		clearInterval(this.state.intervalId)
	}

	async getTimer() {
		console.log('get timer');
		
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		const data = {
			userId: uId,
			lessonId: this.props.idL
		}
		await axios.post(`http://localhost:3013/z-api/eachtimeplayback/eachlesson`, data).then(res => {
			const { data } = res
			this.setState({ dataTime: data })
			console.log('data time : ', data)
		})
	}

	async timer() {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		const data = {
			time: this.state.currentTime,
			userId: uId,
			lessonId: this.props.idL
		}
		console.log('data', data)

		// await axios.patch(`http://localhost:3013/z-api/eachtimeplayback/update`, data).then($res => {
		// 	console.log('saved timer !')
		// })

		this.setState({ currentCount: this.state.currentCount + 1 })
	}

	handleStateChange(state, prevState) {
		const trackTime = (state.currentTime * 100) / state.duration
		this.setState({
			player: state,
			currentTime: state.currentTime,
			duration: state.duration,
			trackTime: parseInt(trackTime) //calculate,
		})

		console.log('currentTime : ', state.currentTime, '---', this.props.idL)

		// this.saveTimePlayBack(this.props,state.currentTime)
		// const { idL } = this.props
		// const id = String({ idL })
		// localStorage.setItem(`video${this.props.idL}`, this.state.currentTime)
	}

	render() {
		const { titleLesson, detailLesson, pathVideo, pathFile, idL, playbackTime, uId } = this.props
		const id = String({ idL })
		const url = 'http://localhost:3013/'
		return (
			<div>
				<hr />
				<div className="d-flex justify-content-between title-lesson" onClick={this.toggleCollapse}>
					<div>
						{/* {this.state.currentCount} */}
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
									<Player ref="player" startTime={this.state.dataTime.time} videoId={id}>
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
								{this.state.trackTime} %
							</Progress>
						</CardBody>
					</Card>
				</Collapse>
				<hr />
			</div>
		)
	}
}
