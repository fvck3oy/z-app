import React, { Component } from 'react'
import { Table } from 'reactstrap'
import axios from 'axios'
import auth from '../../service/index'
import TableUsers from '../AllUsers/TableUsers'
import ShowUnPublic from '../ShowUnPublic/ShowUnPublic'

export default class ToPublicCourse extends Component {
	constructor(props) {
		super(props)
		this.state = {
			state: '',
			data: []
		}
	}
	getData = e => {
		console.log('get data')
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		axios.get(`http://localhost:3013/z-api/course/`).then(res => {
			console.log('DATA RES = ', res)
			const { data } = res
			this.setState({ data })
		})
	}
	componentDidMount() {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uRole = userDecoded.role
		if (uRole != 3) {
			this.getData()
		} else {
			this.props.history.push(`/overview`)
		}
	}
	render() {
		return (
			<div className="ml-5 mr-5 allUsers">
				<ShowUnPublic />
			</div>
		)
	}
}
