import React, { Component } from 'react'
import { X } from 'styled-icons/octicons/X'

import { Container, Button, Popover, PopoverBody, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const Exit = X.extend`
	color: #a0a0a0;
	width: 1rem;
	height: 1rem;
	&:hover ${Exit} {
		color: red;
	}
`
class DeleteMember extends Component {
	constructor(props) {
		super(props)
		this.state = {
			modalOpen: true
		}
		this.toggleModal = this.toggleModal.bind(this)
		this.deleteUser = this.deleteUser.bind(this)
	}
	toggleModal() {
		this.setState({ modalOpen: !this.state.modalOpen })
		this.props.toggle()
	}
	deleteUser() {
		this.setState({ modalOpen: !this.state.modalOpen })
		this.props.deleteUser()
	}

	componentDidMount() {
		// console.log(this.props.id)
		// this.setState({modalOpen: this.props.isOpen})
	}
	render() {
		return (
			<div>
				{/* <Exit id={`Popover${this.props.id}`} onClick={this.toggleModal} /> */}
				<Modal isOpen={this.state.modalOpen} toggle={this.toggleModal} centered={true}>
					<ModalHeader toggle={this.toggleModal} style={{ color: '#da3849' }}>
						Confirm Delete
					</ModalHeader>
					<ModalBody style={{ display: 'flex' }}>
						Are you sure you want to delete
						<div style={{ color: '#da3849' }}>
							&ensp; id {this.props.id} "{this.props.name}"
						</div>
					</ModalBody>
					<ModalFooter>
						<Button color="grey" onClick={this.toggleModal}>
							Cancel
						</Button>
						<Button color="danger" onClick={this.deleteUser}>
							Confirm
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		)
	}
}

export default DeleteMember
