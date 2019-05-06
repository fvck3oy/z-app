import React, { Component } from 'react'
import { Container, Row, Col, NavLink } from 'reactstrap'
import { Image } from 'react-bootstrap'
import './Setting.css'
import axios from 'axios'
import auth from '../../service/index'
import { Edit as EditIcon } from 'styled-icons/material/Edit'
import { PencilAlt } from 'styled-icons/fa-solid/PencilAlt'

import EditProfile from '../../component/EditProfile/EditProfile'
import EditPictureProfile from '../../component/EditPictureProfile/EditPictureProfile'
import Loader from '../../component/Loader'
// import UploadFile from '../../component/Uploadfile/UploadFile'

const Edit = EditIcon.extend`
	position: relative;
	color: #d9d9d9;
	:hover ${Edit} {
		color: #5bc2e1;
	}
`
const IconAdd = PencilAlt.extend`
	width: 25px;
	height: 25px;
	color: black;
	display: inline-block;
	padding: 5px;
	cursor: pointer !important;
	margin-left: 2px;

	:hover ${IconAdd} {
		color: red;
	}
`

export default class Setting extends Component {
	constructor(props) {
		super(props)

		this.state = {
			data: '',
			isedited: false,
			firstname: '',
			toggleAddModal: false,
			toggleAddModal2: false,
			add: <IconAdd className="iconadd" />,
			hidden: true,
			loader: true,
			editmember: false,
			pathProfile: ''
		}
		this.getData = this.getData.bind(this)
	}
	async getData() {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		await axios.get(`http://localhost:3013/z-api/users/${uId}`).then(res => {
			console.log('DATA RES = ', res)
			const { data } = res
			this.setState({ data })
		})
	}

	toggleAddModal = state => {
		this.setState({
			toggleAddModal: state
		})
		this.getData()
	}

	toggleAddModal2 = state => {
		this.setState({
			toggleAddModal2: state
		})
		this.getData()
	}

	componentDidMount() {
		try {
			this.getData()
		} catch (error) {
			console.log('cant get data at setting page', error)
		}
	}

	toggleEditMember(state) {
		this.setState({
			toggleAddModal: state
		})
	}

	toggleEditMember2(state) {
		this.setState({
			toggleAddModal2: state
		})
	}

	componentWillMount() {
		setTimeout(() => {
			this.setState({
				loader: false
			})
		}, 500)
	}

	render() {
		if (this.state.loader) {
			return <Loader />
		}

		const { data } = this.state
		const { toggleAddModal, toggleAddModal2 } = this.state
		const url = 'http://localhost:3013/'

		if (this.state.data.pathProfile === '') {
			this.state.data.pathProfile = 'upload/image/default_profile.jpg'
		} else {
		}

		return (
			<div id="setting" className="MgTopSetting">
				{/* <div id="loader" className="loader" /> */}
				<Container className="bdSetting">
					<Row>
						<Col className="Middle mt-4 mb-4">Profile Setting</Col>
					</Row>
					<Row>
						<Col md={12} className="Middle">
							<Image className="ProfileSetting" src={`${url}${data.pathProfile}`} />
						</Col>
					</Row>
					<Row>
						<Col>
							{' '}
							<NavLink className="nav-link-addicon" onClick={() => this.toggleEditMember2(true)}>
								<div className="editmembericon Middle">
									<u>Edit Pic</u>
								</div>
							</NavLink>
						</Col>
					</Row>
					<Row className="Middle">
						<NavLink className="nav-link-addicon" onClick={() => this.toggleEditMember(true)}>
							{/* onClick={e => this.toggleAddModal(true)}> */}

							<div className="editmembericon Middle">
								<u>Edit Profile</u> {this.state.add}
							</div>
						</NavLink>
					</Row>
					<Row className="Middle">
						<Col md={6} className="fr">
							Firstname :
						</Col>
						<Col md={6} className="fl">
							{data.firstname}
						</Col>
					</Row>
					<Row className="Middle">
						<Col md={6} className="fr">
							Lastname :
						</Col>
						<Col md={6}>{data.lastname}</Col>
					</Row>
					<Row className="Middle">
						<Col md={6} className="fr">
							Email :
						</Col>

						<Col md={6}>{data.email}</Col>
					</Row>
					<Row className="Middle">
						<Col md={6} className="fr">
							Tel :
						</Col>

						<Col md={6}>{data.tel}</Col>
					</Row>
					{toggleAddModal && (
						<EditProfile getData={() => this.getData(this.state.data)} id={this.state.data.id} onClose={() => this.toggleAddModal(false)} />
					)}
					{toggleAddModal2 && (
						<EditPictureProfile
							getData={() => this.getData(this.state.data)}
							id={this.state.data.id}
							onClose={() => this.toggleAddModal2(false)}
						/>
					)}
				</Container>
			</div>
		)
	}
}
