import React, { Component } from 'react'
import {
	Form,
	FormGroup,
	Label,
	Input,
	InputGroup,
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
import axios from 'axios'
import auth from '../../service/index'
import './Comment.css'
import Moment from 'react-moment'

export default class Comment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dataComment: '',
			data: [],
			textComment: '',
			comment: '',
			message: ''
		}
		this.sentComment = this.sentComment.bind(this)
	}
	getData = e => {
		const data = {
			id: this.props.courseId
		}

		axios.get(`http://localhost:3013/z-api/comment/eachcourse/${data.id}`, data).then(res => {
			const { data } = res
			this.setState({ data: data })
			console.log('data comment : ', data)
		})
	}

	sentComment = e => {
		e.preventDefault()
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		const dataComment = {
			text: this.state.comment,
			user: uId,
			course: this.props.courseId
		}
		console.log('coming : ', dataComment)
		axios.post(`http://localhost:3013/z-api/comment`, dataComment).then($res => {
			const { data } = $res
			console.log('comment is : ', data)
			// console.log(' date => ' , data.created);
			// const { data } = $res
			// this.setState({ message: data.message })
			this.getData()
		})
		this.setState({ comment: '' })
	}

	handleInputChange = e => {
		const { name, value } = e.target
		this.setState({ [name]: value })
		this.setState({ message: '' })
		console.log({ [name]: value })
	}

	componentDidMount() {
		this.getData()
	}
	render() {
		const { data } = this.state

		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		let uFn = userDecoded.firstname
		let uLn = userDecoded.lastname
		let uRole = userDecoded.role
		let uPath = userDecoded.pathProfile
		// console.log('data', data)

		const { courseId } = this.props
		const url = 'http://localhost:3013/'
		return (
			<Container className="con-comment pl-0 pr-0">
				{/* onSubmit={this.sentComment({ courseId })} */}
				<Form onSubmit={this.sentComment} className="mt-3 mb-3">
					<Row className="d-flex m-auto user-comment">
						<div>
							<Image className="profile-comment" src={`${url}${uPath}`} />
						</div>
						<div className="input-comment">
							<Input
								placeholder="แสดงความคิดเห็นของคุณ"
								name="comment"
								type="text"
								value={this.state.comment}
								onChange={this.handleInputChange}
							/>
						</div>
						<div>
							<Button className="sent-comment-btn ml-3" size="" color="success">
								Confirm
							</Button>
						</div>
					</Row>
				</Form>
				<div className="all-comment">
					{this.state.data.map((comment, index) => (
						<Row key={index} className="block-comment mt-2 b-2">
							<Image className="profile-comment" src={`${url}${comment.users.pathProfile}`} />
							<div className="username-comment">{comment.users.firstname}</div>
							<div className="text-comment">
								{' '}
								{comment.text}
								<Moment fromNow className="time-comment">
									{comment.created}
								</Moment>
							</div>
						</Row>
					))}
				</div>
			</Container>
		)
	}
}
