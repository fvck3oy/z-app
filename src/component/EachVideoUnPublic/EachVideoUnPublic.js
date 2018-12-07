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
import axios from 'axios'
import auth from '../../service/index'

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
			data: null
		}
		this.handleValueChange = this.handleValueChange.bind(this)
		this.updatePlayerInfo = this.updatePlayerInfo.bind(this)
		this.getEachCourse = this.getEachCourse.bind(this)
		this.onPublic = this.onPublic.bind(this)
	}

	async getEachCourse() {
		axios.get(`http://localhost:3013/z-api/ofCourse/${this.props.match.params.id}`).then(res => {
			console.log('data card : ', res)
			const { data } = res

			// console.log('data0', data[0].title)
			this.setState({ data: data[0] })
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
		await axios.put(`http://localhost:3013/z-api/course/ChangeStateCourse`, data).then($res => {
			const { data } = $res
			console.log('data after ChangeState : ', data)
		})
		this.props.history.push(`/overview`)
	}

	componentDidMount() {
		console.log('ei ')

		this.getEachCourse()
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
		const url = 'http://localhost:3013/'

		return (
			<Container className="TitleVdi">
				<div className="check">{uRole == 1 && <div onClick={() => this.onPublic(data.course.id)}>{this.state.iconCheck}</div>}</div>
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
				<Row>
					<Col className="vdi" md={{ size: 6, offset: 3 }}>
						<Player ref="player" videoId="video-1">
							<source src={`${url}${this.state.data.course.pathVideo}`} />
						</Player>
					</Col>
				</Row>
				<Row>
					<Col md={{ size: 6, offset: 3 }} className="des">
						{data.course.detail}
					</Col>
				</Row>

				<Row>
					<Col md={{ size: 6, offset: 2 }} className="desTitle mt-4">
						เรียนรู้ในเนื้อหาตามบทเรียน ดังนี้
					</Col>
				</Row>

				<Row>
					<Col md={{ size: 7, offset: 3 }} className="contact mt-2">
						{data.course.lesson.map((lesson, index) => (
							<li key={index}>{lesson.name}</li>
						))}
					</Col>
				</Row>

				<Row>
					<Col md={{ size: 6, offset: 2 }} className="desTitle mt-4">
						เกี่ยวกับผู้สอน
					</Col>
				</Row>

				<Row>
					<Col md={{ size: 7, offset: 3 }} className="contact">
						{data.course.about}
					</Col>
				</Row>

				<Row>
					<Col md={{ size: 8, offset: 2 }} className="desTitle mt-4">
						เอกสารประกอบการเรียน
					</Col>
				</Row>

				<Row>
					<Col md={{ size: 8, offset: 3 }} className="desFile mt-2">
						1. {this.state.iconFile} CH1.pdf
					</Col>
				</Row>

				<Row>
					<Col md={{ size: 8, offset: 3 }} className="desFile">
						2. {this.state.iconFile} CH2.pdf
					</Col>
				</Row>

				<Row>
					<Col md={{ size: 8, offset: 3 }} className="desFile">
						3. {this.state.iconFile} CH3.pdf
					</Col>
				</Row>

				<Row>
					<Col md={{ size: 8, offset: 3 }} className="desFile">
						4. {this.state.iconFile} CH4.pdf
					</Col>
				</Row>
				<Row />

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
				<Row>
					<Col md={{ size: 6, offset: 3 }} className="contact">
						{this.state.iconEmail} อีเมลล์ : {data.users.email}
					</Col>
				</Row>
				<Row>
					<Col className="mb-5" />
				</Row>
			</Container>
		)
	}
}
