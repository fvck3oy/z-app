import React, { Component } from 'react'
import { Row, Col, UncontrolledCarousel } from 'reactstrap'
import { Image } from 'react-bootstrap'
import auth from '../../service/index'
import axios from 'axios'
import CourseCardDetail from '../CourseCardDetail/CourseCardDetail'
import styled from 'styled-components'
import './Overview.css'
import Loader from '../../component/Loader'

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	max-width: 100%;
	margin-top: 30px;
	// margin-left:10px;
	margin-right: 10px;
	background-color: white;
	overflow-x: hidden;
`

export default class Overview extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			fillter: '0',
			loader: true,
			items: [],
			items2: []
		}
		this.getBanner = this.getBanner.bind(this)
	}
	async getBanner() {
		await axios.get(`http://localhost:3013/z-api/course/getbanner`).then($res => {
			const { data } = $res

			data.map(e => {
				const url = 'http://localhost:3013/'
				let data2 = {
					src: `${url}${e.pathProfileCourse}`,
					alt: e.pathProfileCourse,
					caption: e.subtitle,
					header: e.title
				}
				this.state.items2.push(data2)
			})
			this.setState({ items: this.state.items2 })

			console.log('new data ', this.state.items)
			// this.setState({items : this.state.items})
		})
	}

	getDataUsers = api => {
		this.setState({
			loader: true
		})
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		this.setState({ fillter: api })
		this.selectURL(api)
	}

	selectURL(api) {
		switch (api) {
			case '1':
				return this.fetchData(`http://localhost:3013/z-api/course/type/${api}`)
			case '2':
				return this.fetchData(`http://localhost:3013/z-api/course/type/${api}`)
			case '3':
				return this.fetchData(`http://localhost:3013/z-api/course/type/${api}`)
			case '4':
				return this.fetchData(`http://localhost:3013/z-api/course/type/${api}`)
			case '5':
				return this.fetchData(`http://localhost:3013/z-api/course/type/${api}`)
			case '6':
				return this.fetchData(`http://localhost:3013/z-api/course/type/${api}`)
			case '7':
				return this.fetchData(`http://localhost:3013/z-api/course/type/${api}`)
			case '8':
				return this.fetchData(`http://localhost:3013/z-api/course/type/${api}`)
			default:
				return this.fetchData(`http://localhost:3013/z-api/course/`)
		}
	}

	async fetchData(url) {
		console.log('fetch', url)
		await axios.get(url).then(res => {
			this.loading()
			const { data } = res
			this.setState({ data })
		})
	}

	loading = e => {
		console.log('loading')
		setTimeout(() => {
			this.setState({
				loader: false
			})
		}, 500)
	}

	logOut = e => {
		auth.clearToken()
		this.props.history.push('/')
	}
	componentDidMount() {
		this.getDataUsers()
		this.getBanner()
	}

	render() {
		if (this.state.loader) {
			return <Loader />
		}

		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)

		let uId = userDecoded.id
		let uFn = userDecoded.firstname
		let uLn = userDecoded.lastname
		let uRole = userDecoded.role
		if (user == null || uId == null || uFn == null || uLn == null || uRole == null) {
			this.props.history.push('/')
		}
		// this.setState({ loginUserId })

		const { data } = this.state

		return (
			<Container>
				<Row className="mr-1 ml-1" />
				<Row className="mt-5 ml-1 mr-1">
					<Col md={3} className=" pb-5">
						<div className="course-list d-flex flex-column">
							<div className="title-list text-center">หมวดหมู่</div>
							<div className="list" onClick={() => this.getDataUsers()}>
								หน้าแรก
							</div>
							<div className="list " onClick={() => this.getDataUsers('1')}>
								ภาษา
							</div>
							<div className="list" onClick={() => this.getDataUsers('2')}>
								คอมพิวเตอร์
							</div>
							<div className="list" onClick={() => this.getDataUsers('3')}>
								สุขภาพ
							</div>
							<div className="list" onClick={() => this.getDataUsers('4')}>
								เกมส์
							</div>
							<div className="list" onClick={() => this.getDataUsers('5')}>
								ทำอาหาร
							</div>
							<div className="list" onClick={() => this.getDataUsers('6')}>
								กีฬา
							</div>
							<div className="list" onClick={() => this.getDataUsers('7')}>
								ดนตรี
							</div>
							<div className="list" onClick={() => this.getDataUsers('8')}>
								อื่น ๆ
							</div>
						</div>
					</Col>
					<Col md={9} className="p-0">
						<Row className="pl-3 pr-3">
							<Col md={{ size: 12, offset: 0 }}>
								{/* md={{ size: 8, offset: 2 }} */}
								<UncontrolledCarousel items={this.state.items} className="" />
							</Col>
						</Row>
					</Col>

					<Row className="">
						<Col md={3} className="">
							{' '}
							<div className="">
								<Image
									className="logo"
									src="https://scontent.fbkk5-4.fna.fbcdn.net/v/t1.0-9/46882025_1929000807187859_437138648945655808_n.jpg?_nc_cat=110&_nc_ht=scontent.fbkk5-4.fna&oh=95558a03adea5dea67e6dd410a67ac09&oe=5CAC8BD0"
								/>
							</div>
							{/* <div className="mid"> */}
							{/* <h4>CourseHub Online</h4> */}
							{/* </div> */}
						</Col>
						<Col md={9} className="pl-4 pr-4">
							<Row>
								{this.state.data.map((course, index) => {
									if (course.pathProfileCourse == '') {
										course.pathProfileCourse = 'upload/image/default_picCourse.jpg'
									}
									return (
										<CourseCardDetail
											key={course.id}
											id={course.id}
											title={course.title}
											subtitle={course.subtitle}
											path={course.pathProfileCourse}
											fuser={course.ofCourse[0].users.firstname}
											luser={course.ofCourse[0].users.lastname}
											price={course.price}
											rating={course.rating}
										/>
									)
								})}
							</Row>
						</Col>
					</Row>
				</Row>
			</Container>
		)
	}
}
