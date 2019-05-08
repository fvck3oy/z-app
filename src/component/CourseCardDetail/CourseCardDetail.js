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
import './CourseCardDetail.css'
import StarRatingComponent from 'react-star-rating-component'
import axios from 'axios'
import auth from '../../service/index'

export default class CourseCardDetail extends Component {
	constructor(props) {
		super(props)
		this.state = { rating:0 }
	}
	handleSubmit = e => {
		try {
			console.log('go go .... ')

			this.props.history.push(`/overview`)

			e.preventDefault()
		} catch (error) {
			console.error('on error ->', error)
		}
	}
	componentDidMount() {
		// console.log('ofCourse : : :  : ',this.props.ofCourseId);
		axios.get(`http://159.89.195.144:3013/z-api/rating/${this.props.id}`).then(res => {
			const { data } = res
			this.setState({ rating: data })
			console.log('data rating : ', this.state.rating)
		})
	}

	render() {
		const { rating } = this.state
		const { id, title, subtitle, path, fuser, luser, price } = this.props

		const url2 = '/video/'
		const url = 'http://159.89.195.144:3013/'
		return (
			<Col md={4}>
				<Card className="fullCard">
					<CardImg top width="100%" src={`${url}${path}`} alt="Card image cap" />
					<CardBody>
						<CardTitle>{title}</CardTitle>
						<CardSubtitle className="animated infinite flash delay-2s slow">{subtitle}</CardSubtitle>
						<CardText>
							by {fuser} {luser}
						</CardText>
						<StarRatingComponent name="rate1" starCount={5} value={this.state.rating} className="animated infinite flash delay-2s slow" editing={false}/>
						{/* <CardText> ราคา {price} บาท</CardText> */}
						<Link to={`${url2}${id}`}>
							<Button className="btn-vdi w-100">คลิกเพื่อเข้าชม</Button>
						</Link>
					</CardBody>
				</Card>
			</Col>
		)
	}
}
