import React, { Component } from 'react'
import axios from 'axios'
import auth from '../../service/index'
import { Table, DropdownItem, DropdownMenu, DropdownToggle, ButtonDropdown, Card, CardTitle, Col } from 'reactstrap'
import DeleteMember from './DeleteMember'
import TableUsers from './TableUsers'
import index from '../Loader'

export default class AllUsers extends Component {
	constructor(props) {
		super(props)

		this.state = {
			data: []
			// modalDeleteOpen: false,
			// dropdownOpen: false,
			// btnDropright: false
		}
		// this.toggleModalDelete = this.toggleModalDelete.bind(this)
		this.getDataUsers = this.getDataUsers.bind(this)
	}

	async getDataUsers() {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		await axios.get(`http://159.89.195.144:3013/z-api/users/allusers`).then(res => {
			// console.log('DATA RES = ', res)
			const { data } = res
			this.setState({ data })
		})
	}

	// async deleteDataUsers() {
	// 	// axios.delete(`http://159.89.195.144:3013/z-api/users/${this.datas.id}`).then(res => {
	// 	// 	console.log(res)
	// 	// 	console.log(res.data)
	// 	// })
	// }

	// toggle() {
	// 	this.setState({
	// 		dropdownOpen: !this.state.dropdownOpen
	// 	})
	// }

	// async toggleModalDelete() {
	// 	this.setState({ modalDeleteOpen: !this.state.modalDeleteOpen })
	// }

	componentDidMount() {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uRole = userDecoded.role
		if (uRole != 3) {
			this.getDataUsers()
		} else {
			this.props.history.push(`/overview`)
		}
	}

	render() {
		return (
			<div className="ml-5 mr-5 allUsers">
				{' '}
				<div style={{ textAlign: 'center', margin: '10px 0px 10px 0px', fontSize: '20px' }}>Dashboard AllUsers</div>
				<Table hover>
					<thead style={{ textAlign: 'center' }}>
						<tr style={{ textAlign: 'center' }}>
							<th>ID</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Tel</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{this.state.data.map((users, index) => {
							return <TableUsers key={users.id} id={users.id} getDataUser={() => this.getDataUsers()} users={users} />
						})}
					</tbody>
				</Table>
			</div>
		)
	}
}
