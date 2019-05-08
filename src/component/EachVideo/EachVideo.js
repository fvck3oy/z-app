import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
import './EachVideo.css'
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
import { Image } from 'react-bootstrap'
import { Collections } from 'styled-icons/material'
import { FileAlt } from 'styled-icons/fa-regular/FileAlt'
import { PhoneIphone } from 'styled-icons/material/PhoneIphone'
import { Email } from 'styled-icons/material/Email'
import { Check } from 'styled-icons/fa-solid/Check'
import { X } from 'styled-icons/octicons/X'
import axios from 'axios'
import auth from '../../service/index'
import Comment from '../Comment/Comment'
import EachLesson from '../EachLesson/EachLesson'
import StarRatingComponent from 'react-star-rating-component'
import ModalRating from '../ModalRating/ModalRating'
import ToQuiz from '../ToQuiz/ToQuiz'
import { Doughnut, Line } from 'react-chartjs-2'

const FileIcon = FileAlt.extend`
	width: 1.3rem;
	height: 1.3rem;
	color: black;
	display: inline-block;
	cursor: pointer;
	line-height: 84px;
	border-radius: 25%;
	position: relative;
`
const PhoneIcon = PhoneIphone.extend`
	width: 1.3rem;
	height: 1.3rem;
	color: black;
	display: inline-block;
	cursor: pointer;
	line-height: 84px;
	border-radius: 25%;
	position: relative;
`

const EmailIcon = Email.extend`
	width: 1.3rem;
	height: 1.3rem;
	color: black;
	display: inline-block;
	cursor: pointer;
	line-height: 84px;
	border-radius: 25%;
	position: relative;
`
const CheckIcon = Check.extend`
	width: 1.3rem;
	height: 1.3rem;
	color: green;
	display: flex;
	cursor: pointer;
	line-height: 84px;
	border-radius: 25%;
	position: relative;
	flex-direction: row-reverse;
`

const DeleteIcon = X.extend`
	width: 1.5rem;
	height: 1.5rem;
	color: red;
	display: flex;
	cursor: pointer;
	line-height: 84px;
	border-radius: 25%;
	position: relative;
	flex-direction: row-reverse;
`
export default class EachVideo extends Component {
	constructor(props, context) {
		super(props, context)

		this.state = {
			// playerSource: 'https://www.youtube.com/embed/7pvk_zflkwU',
			playerSource: '',
			inputVideoUrl: 'http://www.w3schools.com/html/mov_bbb.mp4',
			iconFile: <FileIcon className="icon" />,
			iconPhone: <PhoneIcon className="icon" />,
			iconEmail: <EmailIcon className="icon" />,
			iconCheck: <DeleteIcon className="icon" />,
			data: null,
			dataLesson: [],
			collapse: false,
			pathVideo: '',
			pathFile: '',
			playbackTime: 0,
			dataTime: [],
			rating: 0,
			editmode: false,
			score: [],
			labels: [],
			datasets: [],

			dataChartjs: {
				labels: [],
				datasets: [
					{
						label: '',
						fill: false,
						lineTension: 0.1,
						backgroundColor: 'rgba(75,192,192,0.4)',
						borderColor: 'rgba(75,192,192,1)',
						borderCapStyle: 'butt',
						borderDash: [],
						borderDashOffset: 0.0,
						borderJoinStyle: 'miter',
						pointBorderColor: 'rgba(75,192,192,1)',
						pointBackgroundColor: '#fff',
						pointBorderWidth: 1,
						pointHoverRadius: 5,
						pointHoverBackgroundColor: 'rgba(75,192,192,1)',
						pointHoverBorderColor: 'rgba(220,220,220,1)',
						pointHoverBorderWidth: 2,
						pointRadius: 1,
						pointHitRadius: 10,
						data: []
					}
				]
			}
		}
		this.handleValueChange = this.handleValueChange.bind(this)
		this.updatePlayerInfo = this.updatePlayerInfo.bind(this)
		this.getEachCourse = this.getEachCourse.bind(this)
		this.onDelete = this.onDelete.bind(this)
		this.getScore = this.getScore.bind(this)
	}

	toggleCollapse = () => {
		this.setState({ collapse: !this.state.collapse })
	}

	async getEachCourse() {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		await axios.get(`http://159.89.195.144:3013/z-api/ofCourse/${this.props.match.params.id}`).then(res => {
			const { data } = res
			this.setState({ data: data[0] })
		})

		await axios.get(`http://159.89.195.144:3013/z-api/lesson/eachlesson/${this.props.match.params.id}`).then(res => {
			const { data } = res
			this.setState({ dataLesson: data })
			console.log('data lesson : ', data)
		})

		await axios.get(`http://159.89.195.144:3013/z-api/rating/${this.props.match.params.id}`).then(res => {
			const { data } = res

			this.setState({ rating: data })
			console.log('data rating : ', this.state.rating)
		})

		// 	await axios.get(`http://159.89.195.144:3013/z-api/eachtimeplayback/eachlesson`,data).then(res => {
		// 		const { data } = res
		// 		this.setState({ dataTime: data })
		// 		console.log('data time : ', data)
		// 	})
	}

	async getScore() {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id

		await axios.get(`	http://159.89.195.144:3013/z-api/score/${this.props.match.params.id}/${uId}`).then(res => {
			const { data } = res
			this.setState({ score: data })
			console.log(' score is : ', data)

			this.state.score.map((e, index) => {
				this.state.datasets.push(e.score)
				this.state.labels.push(`รอบที่ ${index + 1}`)
			})

			let dataNew = {
				labels: this.state.labels,
				datasets: [
					{
						label: 'Score',
						fill: false,
						lineTension: 0.1,
						backgroundColor: 'rgba(70, 176, 247)',
						borderColor: 'rgba(113, 104, 241,1)',
						borderCapStyle: 'butt',
						borderDash: [],
						borderDashOffset: 5.0,
						borderJoinStyle: 'miter',
						pointBorderColor: 'rgba(113, 104, 241,1)',
						pointBackgroundColor: '#fff',
						pointBorderWidth: 5,
						pointHoverRadius: 5,
						pointHoverBackgroundColor: 'rgba(113, 104, 241,1)',
						pointHoverBorderColor: 'rgba(70, 176, 247)',
						pointHoverBorderWidth: 2,
						pointRadius: 1,
						pointHitRadius: 10,
						data: this.state.datasets
					}
				]
			}
			this.setState({ dataChartjs: dataNew })

			console.log(' - - - - - - - datasets : ', this.state.datasets)
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.playerSource != prevState.playerSource) {
			this.refs.player.load()
		}
	}

	handleValueChange(e) {
		var value = e.target.value
		this.setState({
			[e.target.id]: value
		})
	}

	updatePlayerInfo() {
		this.setState({
			playerSource: this.state.inputVideoUrl
		})
	}
	async onDelete(e) {
		const data = {
			id: e,
			isDisable: 1
		}
		await axios.put(`http://159.89.195.144:3013/z-api/course/delete`, data).then($res => {
			const { data } = $res
		})
		this.props.history.push(`/overview`)
	}
	onStarClick(nextValue, prevValue, name) {
		this.setState({ rating: nextValue })
	}
	onStarHover(nextValue, prevValue, name) {
		this.setState({ rating: nextValue })
		console.log('rating : ', nextValue)
	}

	toggleEdit = () => {
		const { editmode } = this.state
		this.setState({ editmode: !editmode })
	}

	componentDidMount() {
		this.getEachCourse()
		this.getScore()
	}
	render() {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		let uRole = userDecoded.role

		const { data, dataLesson, dataTime, rating, editmode, score } = this.state

		if (!data) {
			return <div>Loading</div>
		}

		if (this.state.data.users.pathProfile == '') {
			this.state.data.users.pathProfile = 'upload/image/default_profile.jpg'
		} else {
		}
		const url2 = `http://159.89.195.144:3013/${this.state.data.course.pathFile}`
		// let url = window.URL.createObjectURL(url2)
		//       let aTag = document.createElement('a')
		//       document.body.appendChild(aTag)
		//       aTag.href = url
		//       aTag.download = products_report_$.{moment().format('DD/MM/YYYY')}.xlsx
		//       aTag.click()
		//       window.URL.revokeObjectURL(url)
		//       document.body.removeChild(aTag)

		const url = 'http://159.89.195.144:3013/'
		return (
			<div>
				<Container className="TitleVdi">
					<div className="check">{uRole == 1 && <div onClick={() => this.onDelete(data.course.id)}>{this.state.iconCheck}</div>}</div>
					<Row>
						<Col md={{ size: 6, offset: 3 }} className="desFirstTitle mt-5">
							{data.course.title}
						</Col>
					</Row>
					<Row>
						<Col md={{ size: 6, offset: 3 }} className="desFirstTitle mt-2">
							{data.course.subtitle}
						</Col>
					</Row>
					{/* <Row>
						<Col className="vdi" md={{ size: 6, offset: 3 }}>
							<Player ref="player" videoId="video-1">
								<source src={`${url}${this.state.data.course.pathVideo}`} />
							</Player>
						</Col>
					</Row> */}
					<Row>
						<Col md={{ size: 6, offset: 3 }} className="des">
							{data.course.detail}
						</Col>
					</Row>

					{/* <Row className="ml-2">
						<h2>Lesson</h2>
					</Row> */}
					<Row>
						<Col className="mid mt-2">
							<div className="rating animated infinite flash delay-2s slow" onClick={() => this.toggleEdit(true)}>
								<StarRatingComponent
									name="rate1"
									starCount={5}
									editing={false}
									value={rating}
									// onStarClick={this.onStarClick.bind(this)}
									// onStarHover={this.onStarHover.bind(this)}
								/>
							</div>
						</Col>
					</Row>

					{this.state.dataLesson.map((each, index) => {
						return (
							<div key={each.id}>
								<EachLesson
									idLesson={index + 1}
									idL={each.id}
									uId={uId}
									titleLesson={each.titleLesson}
									detailLesson={each.detailLesson}
									pathVideo={each.pathVideo}
									pathFile={each.pathFile}
									// playbackTime={100}
								/>
							</div>
						)
					})}
					<Row>
						<Col className="desFirstTitle">
							รวมคะแนนการทำแบบทดสอบของคุณ
							<Line data={this.state.dataChartjs} />
						</Col>
					</Row>

					<ToQuiz id={this.props.match.params.id} />

					<Row>
						<Col md={12} className="desFirstTitle mt-3">
							<hr />
							ติดต่อ คุณ {data.users.firstname} {data.users.lastname}
						</Col>
					</Row>

					<Row md={12} className="middle mt-2">
						{/* <Col md={{ size: 10, offset: 2 }} className="mt-2"> */}
						<Image className="ProfileUsersOfCourse" src={`${url}${data.users.pathProfile}`} />
						{/* </Col> */}
					</Row>

					<Row>
						<Col md={{ size: 6, offset: 3 }} className="contact">
							{this.state.iconPhone} โทร : {data.users.tel}
						</Col>
					</Row>

					<Row className="pb-5">
						<Col md={{ size: 6, offset: 3 }} className="contact">
							{this.state.iconEmail} อีเมลล์ : {data.users.email}
						</Col>
					</Row>

					{editmode && <ModalRating id={this.props.match.params.id} onClose={() => this.toggleEdit(false)} />}
				</Container>
				<Comment courseId={data.course.id} />
			</div>
		)
	}
}
