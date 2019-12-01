import React, { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { FormText, Input, Form, Modal, ModalHeader, ModalBody, Container, Row, Button, Col } from 'reactstrap'
import axios, { post } from 'axios'
import auth from '../../service'
export default class ModalRating extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: true,
			rating: 0
		}
		this.sendData = this.sendData.bind(this)
	}

	onStarClick(nextValue, prevValue, name) {
		this.setState({ rating: nextValue })
		this.sendData()
	}
	onStarHover(nextValue, prevValue, name) {
		this.setState({ rating: nextValue })
		console.log('rating : ', nextValue)
	}

	async sendData() {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		const data = {
			value: this.state.rating,
			userId: uId,
			courseId: this.props.id
		}
		await axios.patch(`http://localhost:3013/z-api/rating/`, data).then($res => {
			const { data } = $res
			console.log('rating : ', data)
		})
	}

	render() {
		const { onClose } = this.props
		return (
			<div>
				<Modal style={{ fontSize: '1rem' }} size="lg" isOpen={this.state.open} toggle={onClose}>
					<ModalHeader toggle={onClose}>
						<div className="title">Rating of you</div>
					</ModalHeader>

					<ModalBody>
						<Container className="">
							<Row>
								<Col className="mid mt-2">
									<div className="" onClick={() => this.toggleEdit(true)}>
										<StarRatingComponent
											name="rate1"
											starCount={5}
											value={this.state.rating}
											onStarHover={this.onStarHover.bind(this)}
											onStarClick={this.onStarClick.bind(this)}
										/>
									</div>
								</Col>
							</Row>
						</Container>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}
