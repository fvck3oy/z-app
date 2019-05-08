import React, { Component } from 'react'
import axios, { post } from 'axios'
import auth from '../../service/index'
import './UploadFile.css'


export default class UploadFile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			file: null,
			data: ''
		}
		this.onFormSubmit = this.onFormSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
		this.fileUpload = this.fileUpload.bind(this)
	}
	onFormSubmit(e) {
		e.preventDefault() // Stop form submit
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		console.log(userDecoded)
		let uId = userDecoded.id
		let uEmail = userDecoded.email

		this.fileUpload(this.state.file).then(response => {
			console.log('res . data : ', response.data)
			const data = {
				email: uEmail,
				path: response.data.file.path
			}
			// const { data } = response.data
			axios.put(`http://159.89.195.144:3013/z-api/users/SavePathProfile`, data).then($res => {
				const { data } = $res
				console.log('what is the path : ', data)

				// const { data } = $res
				// this.setState({ message: data.message })
			})
		})
	}
	onChange(e) {
		this.setState({ file: e.target.files[0] })
	}
	fileUpload(file) {
		const url = 'http://159.89.195.144:3013/z-api/users/uploadImage'
		const formData = new FormData()
		// formData.append('file', file)
		formData.append('imageData', file)
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		return post(url, formData, config)
	}

	render() {
		return (
			<form onSubmit={this.onFormSubmit}>
				{/* <h1>File Upload</h1> */}
				<div className="css">
					<input className="" type="file" onChange={this.onChange} multiple />
				</div>
				<button className="btn-submit" type="submit">
					Upload
				</button>
			</form>
		)
	}
}
