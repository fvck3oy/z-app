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
import axios, { post } from 'axios'
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
	CardSubtitle
} from 'reactstrap'
import ModalEditLesson from '../../component/ModalEditLesson/ModalEditLesson'

export default class EditEachLesson extends Component {
	constructor(props, context) {
		super(props, context)

		this.state = {
			// playerSource: 'https://www.youtube.com/embed/7pvk_zflkwU',
			playerSource: '',
			inputVideoUrl: 'http://www.w3schools.com/html/mov_bbb.mp4',
			dataLesson: [],
			collapse: false,
			editlesson: false
		}
		// this.sentData = this.sentData.bind(this)
		this.getData = this.getData.bind(this)
	}

	async getData(e) {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		await axios.get(`http://localhost:3013/z-api/course/${this.props.match.params.id}`).then(res => {
			const { data } = res
			console.log('DATA MY EACH COURSE = ', data[0])
			this.setState({ data: data[0], dataUser: data[0].ofCourse[0].users })
		})

		await axios.get(`http://localhost:3013/z-api/lesson/eachlesson/${this.props.match.params.id}`).then(res => {
			const { data } = res
			this.setState({ dataLesson: data })
			console.log('data lesson : ', data)
		})
	}
	toggleCollapse = () => {
		this.setState({ collapse: !this.state.collapse })
	}
	toggleEditLesson = () => {
		console.log('click ')
		const { editlesson } = this.state
		this.setState({ editlesson: !editlesson })
	}

	render() {
		const { titleLesson, detailLesson, pathVideo, pathFile, idL ,idC } = this.props
		const { editlesson } = this.state
		const { modal, id } = this.props
		const url = 'http://localhost:3013/'
		return (
			<div>
				<hr />
				<div className="">
					<Button color="primary" onClick={this.toggleCollapse} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
						บทที่ {idL} {titleLesson}
					</Button>
					<Button color="danger" onClick={() => this.toggleEditLesson(true)} className="m-2">
						Edit
					</Button>
				</div>
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
				<hr />
				{editlesson && <ModalEditLesson  idC={idC} id={idL} onClose={() => this.toggleEditLesson(false)} />}
			</div>
		)
	}
}
