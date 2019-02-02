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
	CardSubtitle,

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
			dataComment: ''
		}
		this.handleValueChange = this.handleValueChange.bind(this)
		this.updatePlayerInfo = this.updatePlayerInfo.bind(this)
		this.getEachCourse = this.getEachCourse.bind(this)
		this.onDelete = this.onDelete.bind(this)
	}

	async getEachCourse() {
		await axios.get(`http://localhost:3013/z-api/ofCourse/${this.props.match.params.id}`).then(res => {
			const { data } = res
			this.setState({ data: data[0] })
			// console.log('kuy kuy kuy kuy ', data)
		})

		// await axios.get(`http://localhost:3013/z-api/comment/eachcourse/${this.props.match.params.id}`).then(res => {
		// 	const { data } = res
		// 	this.setState({ dataComment: data })
		// 	console.log('data comment ', data)
		// })
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
		await axios.put(`http://localhost:3013/z-api/course/delete`, data).then($res => {
			const { data } = $res
		})
		this.props.history.push(`/overview`)
	}

	componentDidMount() {
		this.getEachCourse()
	}
	render() {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		let uRole = userDecoded.role

		const { data, dataComment } = this.state

		if (!data) {
			return <div>Loading</div>
		}

		if (this.state.data.users.pathProfile == '') {
			this.state.data.users.pathProfile = 'upload/image/default_profile.jpg'
		} else {
		}
		const url2 = `http://localhost:3013/${this.state.data.course.pathFile}`
		// let url = window.URL.createObjectURL(url2)
		//       let aTag = document.createElement('a')
		//       document.body.appendChild(aTag)
		//       aTag.href = url
		//       aTag.download = products_report_$.{moment().format('DD/MM/YYYY')}.xlsx
		//       aTag.click()
		//       window.URL.revokeObjectURL(url)
		//       document.body.removeChild(aTag)

		const url = 'http://localhost:3013/'
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
						1. {this.state.iconFile}{' '}
						<a href={url2} download>
							CH1.pdf
						</a>
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
				<Row className="pb-5">
					<Col md={{ size: 6, offset: 3 }} className="contact">
						{this.state.iconEmail} อีเมลล์ : {data.users.email}
					</Col>

				</Row>

				{/* {this.state.dataComment.map(comment => {
					return <Comment key={comment.id} text={comment.text} />
				})} */}
			</Container>
				<Comment courseId={data.course.id} />
				</div>
		)
	}
}
