import React, { Component } from 'react'
import DeleteMember from './DeleteMember'
import axios from 'axios'
import auth from '../../service/index'
import { Table, DropdownItem, DropdownMenu, DropdownToggle, ButtonDropdown, Card, CardTitle, Col } from 'reactstrap'
import './AllUsers.css'
export default class TableUsers extends Component {
	constructor(props) {
		super(props)

		this.state = {
			data: [],
			modalDeleteOpen: false,
			dropdownOpen: false,
			btnDropright: false
		}
		this.toggleModalDelete = this.toggleModalDelete.bind(this)
	}

	async deleteDataUsers() {
		axios.delete(`http://localhost:3013/z-api/users/${this.props.users.id}`).then(res => {
			console.log('กำลังลบ .... ', res.data)

			console.log('กำลังดึงใหม่ .... ')

			this.props.getDataUser()
		})
	}

	// toggle() {
	// 	this.setState({
	// 		dropdownOpen: !this.state.dropdownOpen
	// 	})
	// }

	async toggleModalDelete() {
		this.setState({ modalDeleteOpen: !this.state.modalDeleteOpen })
	}
	render() {
		const { users } = this.props
		return (
			<tr style={{ textAlign: 'center' }}>
				<th scope="row">{users.id}</th>
				<td>{users.firstname}</td>
				<td>{users.lastname}</td>
				<td>{users.email}</td>
				<td>{users.tel}</td>

				<td className="delX" onClick={this.toggleModalDelete}>
					X
				</td>

				{this.state.modalDeleteOpen && (
					<DeleteMember
						toggle={this.toggleModalDelete}
						getDataUser={this.props.getDataUser}
						deleteUser={() => this.deleteDataUsers()}
						id={users.id}
						name={users.firstname}
					/>
				)}
			</tr>
		)
	}
}
