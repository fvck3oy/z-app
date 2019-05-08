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
import './EachVideoUnPublic.css'
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
import { Image } from 'react-bootstrap'
import { Collections } from 'styled-icons/material'
import { FileAlt } from 'styled-icons/fa-regular/FileAlt'
import { PhoneIphone } from 'styled-icons/material/PhoneIphone'
import { Email } from 'styled-icons/material/Email'
import { Check } from 'styled-icons/fa-solid/Check'
import { X } from 'styled-icons/octicons/X'
import axios from 'axios'
import auth from '../../service/index'
import EachLesson from '../EachLesson/EachLesson'

const FileIcon = FileAlt.extend`
    width : 1.3rem;
    height :1.3rem;
    color : black;

    display: inline-block;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
    position: relative;
`
const PhoneIcon = PhoneIphone.extend`
width : 1.3rem;
height :1.3rem;
color : black;
display: inline-block;
cursor: pointer;
line-height: 84px;
border-radius: 25%
position: relative;
`

const EmailIcon = Email.extend`
width : 1.3rem;
height :1.3rem;
color : black;
display: inline-block;
cursor: pointer;
line-height: 84px;
border-radius: 25%
position: relative;
`
const CheckIcon = Check.extend`
    width : 1.3rem;
    height :1.3rem;
    color : green;
    display: flex;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
		position: relative;
		flex-direction: row-reverse;
`
const DeleteIcon = X.extend`
width : 1.5rem;
height :1.5rem;
color : red;
display: flex;
cursor: pointer;
line-height: 84px;
border-radius: 25%
position: relative;
flex-direction: row-reverse;
`

export default class EachVideoUnPublic extends Component {
	constructor(props, context) {
		super(props, context)

		this.state = {
			// playerSource: 'https://www.youtube.com/embed/7pvk_zflkwU',
			playerSource: '',

			inputVideoUrl: 'http://www.w3schools.com/html/mov_bbb.mp4',
			iconFile: <FileIcon className="icon" />,
			iconPhone: <PhoneIcon className="icon" />,
			iconEmail: <EmailIcon className="icon" />,
			iconCheck: <CheckIcon className="icon" />,
			iconDelete: <DeleteIcon className="icon" />,
			data: null,
			dataLesson:[]
		}
		this.handleValueChange = this.handleValueChange.bind(this)
		this.updatePlayerInfo = this.updatePlayerInfo.bind(this)
		this.getEachCourse = this.getEachCourse.bind(this)
		this.onPublic = this.onPublic.bind(this)
		this.onDelete = this.onDelete.bind(this)
	}

	async getEachCourse() {
		axios.get(`http://159.89.195.144:3013/z-api/ofCourse/${this.props.match.params.id}`).then(res => {
			// console.log('data card : ', res)
			const { data } = res

			// console.log('data0', data[0].title)
			this.setState({ data: data[0] })
		})
		await axios.get(`http://159.89.195.144:3013/z-api/lesson/eachlesson/${this.props.match.params.id}`).then(res => {
			const { data } = res
			this.setState({ dataLesson: data })
			console.log('data lesson : ', data)
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
	async onPublic(e) {
		console.log('kuykuyukyuky', e)
		const data = {
			id: e,
			state: 0
		}
		await axios.put(`http://159.89.195.144:3013/z-api/course/ChangeStateCourse`, data).then($res => {
			const { data } = $res
			// console.log('data after ChangeState : ', data)
		})
		this.props.history.push(`/overview`)
	}
	async onDelete(e) {
		// console.log('DELETE ------ ', e)
		const data = {
			id: e,
			isDisable: 1
		}
		await axios.put(`http://159.89.195.144:3013/z-api/course/delete`,data).then($res => {
			const { data } = $res
			// console.log('data after Delete : ', data)
		})
		this.props.history.push(`/overview`)
	}

	componentDidMount() {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
    let uId = userDecoded.id
    let uRole = userDecoded.role
		console.log('did mount')
    if (uRole != 3) {
			this.getEachCourse()
    } else {
      this.props.history.push(`/overview`)
    }
	}
	render() {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		let uRole = userDecoded.role

		const { data } = this.state

		console.log('Data', data)

		if (!data) {
			return <div>Loading</div>
		}

		if (this.state.data.users.pathProfile == '') {
			console.log('-----', this.state.data.users.pathProfile)
			console.log('dont had pic')
			this.state.data.users.pathProfile = 'upload/image/default_profile.jpg'
			console.log('')
		} else {
			console.log('had pic')
		}
		const url = 'http://159.89.195.144:3013/'

		return (
			<Container className="TitleVdi">
				<div className="check">{uRole == 1 && <div onClick={() => this.onPublic(data.course.id)}>{this.state.iconCheck}</div>}</div><br/>
				<div className="delete">{uRole == 1 && <div onClick={() => this.onDelete(data.course.id)}>{this.state.iconDelete}</div>}</div>
		
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

					{this.state.dataLesson.map((each, index) => {

						
						return (
							<div key={each.id}>
								<EachLesson
									// idL={index + 1}
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
						<Col md={{ size: 6, offset: 2 }} className="desTitle mt-3">
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
			</Container>
		)
	}
}
