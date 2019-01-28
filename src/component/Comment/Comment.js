import React, { Component } from 'react'
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
import axios from 'axios'
import auth from '../../service/index'

export default class Comment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dataComment: '',
			data: []
		}
	}
	getData = e => {
		const data = {
			id: this.props.courseId
		}

		axios.get(`http://localhost:3013/z-api/comment/eachcourse/${data.id}`, data).then(res => {
			const { data } = res
			// console.log('data Comment kuy : ', data)
			this.setState({ data: data })
		})
	}

	componentDidMount() {
		this.getData()
	}
	render() {
		const { data } = this.state
		// console.log('data', data)

		const { courseId } = this.props
		return (
			<div>
				{/* <Row>
					<Col md={{ size: 6, offset: 3 }} className="contact mt-5 mb-5">
						Hee{courseId}
					</Col>
                    
                </Row> */}
				<ul>
					{this.state.data.map((comment, index) => (
						<li key={index}>
							{comment.id} {comment.text}
						</li>
					))}
				</ul>
			</div>
		)
	}
}
