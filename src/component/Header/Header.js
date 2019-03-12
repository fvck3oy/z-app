import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Navbar, NavLink } from 'reactstrap'
import { Image } from 'react-bootstrap'
import { Folder } from 'styled-icons/fa-regular/Folder'
import { FolderOpen } from 'styled-icons/fa-solid/FolderOpen'
import { PersonOutline } from 'styled-icons/material/PersonOutline'
import { Person } from 'styled-icons/material/Person'
import { Settings } from 'styled-icons/feather/Settings'
import { Gear } from 'styled-icons/octicons/Gear'
import { ListAlt } from 'styled-icons/fa-regular/ListAlt'
import { ListAlt as ListSolid } from 'styled-icons/fa-solid/ListAlt'
import { Delete } from 'styled-icons/material/Delete'
import { DeleteForever } from 'styled-icons/material/DeleteForever'
import { Public } from 'styled-icons/material/Public'
import { AddToPhotos } from 'styled-icons/material/AddToPhotos'
import { ExitToApp } from 'styled-icons/material/ExitToApp'
// import { Bin } from 'styled-icons/icomoon/Bin'
import { withRouter } from 'react-router-dom'
import './Header.css'
import auth from '../../service/index'
import axios from 'axios'

const FolderClose = Folder.extend`
    width : 1.3rem;
    height :1.3rem;
    color : white;
    &:hover ${FolderClose} {
        
        position : relative;
        top : -1px
    }
    display: inline-block;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
    position: relative;
`
const FolderSolid = FolderOpen.extend`
    width : 1.3rem;
    height : 1.3rem;
    color : white;
    display: inline-block;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
    position: relative;
}
`

const PersonReg = PersonOutline.extend`
	width: 1.3rem;
	height: 1.3rem;
	color: white;
	cursor: pointer;
	&:hover ${PersonReg} {
		transition-duration: 300ms;
		position: relative;
		top: -1px;
	}
	display: inline-block;
	border-radius: 25%;
	margin-top: 0px;
`

const PersonSolid = Person.extend`
	width: 1.3rem;
	height: 1.3rem;
	color: white;
	cursor: pointer;
	display: inline-block;
	border-radius: 25%;
	margin-top: 0px;
`
const SettingReg = Settings.extend`
	width: 1.3rem;
	height: 1.3rem;
	color: white;
	&:hover ${SettingReg} {
		transition-duration: 300ms;
		position: relative;
		top: -1px;
	}
	display: inline-block;
	cursor: pointer;
	border-radius: 25%;
`
const SettingSolid = Gear.extend`
    width : 1.3rem;
    height : 1.3rem;
    color : white;
    display: inline-block;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
    position: relative;
    
`

const ListAltReg = ListAlt.extend`
    width : 1.3rem;
    height : 1.3rem;
    color : white;
    &:hover ${ListAltReg} {
      transition-duration: 300ms;
      top: -1px;
    }
    display: inline-block;
    cursor: pointer;
		border-radius: 25%
		line-height: 84px;
		position: relative;
		margin-top:6px;

`

const ListAltSolidz = ListSolid.extend`
    width : 1.3rem;
    height : 1.3rem;
    color : white;
    display: inline-block;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
		position: relative;
		margin-top 6px;


`
const AddReg = AddToPhotos.extend`
    width : 1.3rem;
    height : 1.3rem;
    color : white;
    &:hover ${AddReg} {
      transition-duration: 300ms;
      top: -1px;
    }
    display: inline-block;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
		position: relative;
		margin-top: 0px;
`
const AddRegSolidz = AddToPhotos.extend`
width : 1.3rem;
height : 1.3rem;
color : white;
display: inline-block;
cursor: pointer;
line-height: 84px;
border-radius: 25%
position: relative;
`

// const Binz = Bin.extend`
//     width : 1.3rem;
//     height : 1.3rem;
//     color : white;
//     &:hover ${Binz} {
//       transition-duration: 300ms;
//       top: -1px;
//     }
//     display: inline-block;
//     cursor: pointer;
//     line-height: 84px;
//     border-radius: 25%
// 		position: relative;
// 		margin-top: -5px;
// `
// const BinSolidz = Bin.extend`
// width : 1.3rem;
// height : 1.3rem;
// color : white;
// display: inline-block;
// cursor: pointer;
// line-height: 84px;
// border-radius: 25%
// position: relative;
// `

const Bin = Delete.extend`
    width : 1.5rem;
    height : 1.5rem;
    color : white;
    &:hover ${Bin} {
      transition-duration: 300ms;
      top: -1px;
    }
    display: inline-block;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
		position: relative;
		margin-top: 0px;
`
const BinSolidz = DeleteForever.extend`
width : 1.5rem;
height : 1.5rem;
color : white;
display: inline-block;
&:hover ${BinSolidz} {
	transition-duration: 300ms;
	top: -1px;
}
cursor: pointer;
line-height: 84px;
border-radius: 25%
position: relative;
`

const UnPublic = Public.extend`
    width : 1.3rem;
    height : 1.3rem;
    color : white;
    &:hover ${UnPublic} {
      transition-duration: 300ms;
      top: -1px;
    }
    display: inline-block;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
		position: relative;
		margin-top: 0px;
`
const UnPublicSolidz = Public.extend`
width : 1.3rem;
height : 1.3rem;
color : white;
display: inline-block;
&:hover ${UnPublicSolidz} {
	transition-duration: 300ms;
	top: -1px;
}
cursor: pointer;
line-height: 84px;
border-radius: 25%
position: relative;
`

const LogOut = ExitToApp.extend`
    width : 1.3rem;
    height : 1.3rem;
    color : white;
    &:hover ${LogOut} {
      transition-duration: 300ms;
      top: -1px;
    } 
    display: inline-block;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
    position: relative;

`

class Header extends Component {
	constructor(props) {
		super(props)
		this.state = {
			folder: <FolderClose className="icon" />,
			person: <PersonReg className="icon" />,
			setting: <SettingReg className="icon" />,
			list: <ListAltReg className="icon" />,
			add: <AddReg className="icon" />,
			logout: <LogOut className="icon" />,
			bin: <Bin className="icon" />,
			unpublic: <UnPublic className="icon" />,
			icondefault: {
				folder: <FolderClose className="icon" />,
				person: <PersonReg className="icon" />,
				setting: <SettingReg className="icon" />,
				list: <ListAltReg className="icon" />,
				add: <AddReg className="icon" />,
				logout: <LogOut className="icon" />,
				bin: <Bin className="icon" />,
				unpublic: <UnPublic className="icon" />
			},
			toggleAddModal: false,
			toggleLogOut: false,
			data: ''
		}
		this.toggleLogOut = this.toggleLogOut.bind(this)
		this.logOut = this.logOut.bind(this)
	}

	changeFolderIcon() {
		this.clear()
		this.setState({ folder: <AddRegSolidz className="icon" /> })
		this.props.history.push('/addcourse')
	}

	changePersonIcon() {
		this.clear()
		this.setState({ person: <PersonSolid className="icon" /> })
		this.props.history.push('/allusers')
	}
	changeSettingIcon() {
		this.clear()
		this.setState({ setting: <SettingSolid className="icon" /> })
		this.props.history.push('/setting')
	}
	changeListIcon() {
		this.clear()
		this.setState({ list: <ListAltSolidz className="icon" /> })
		this.props.history.push('/overview')
	}
	toPublic() {
		this.clear()
		this.setState({ unpublic: <UnPublicSolidz className="icon" /> })
		this.props.history.push('/unpublic')
	}
	coursedeleted() {
		this.clear()
		this.setState({ bin: <BinSolidz className="icon" /> })
		this.props.history.push('/coursedeleted')
	}
	clear() {
		let def = this.state.icondefault
		this.setState({
			folder: def.folder,
			person: def.person,
			setting: def.setting,
			list: def.list,
			add: def.add,
			bin: def.bin,
			unpublic: def.unpublic
		})
	}
	toggleAddModal = state => {
		this.setState({
			toggleAddModal: state
		})
		if (!state) {
			this.clear()
		}
	}

	toggleLogOut() {
		this.setState({ toggleLogOut: !this.state.toggleLogOut })
	}
	update() {
		this.clear()
		if (window.location.pathname === '/z-app/build/allusers') this.setState({ person: <PersonSolid className="icon" /> })
		if (window.location.pathname === '/z-app/build/addcourse') this.setState({ folder: <AddRegSolidz className="icon" /> })
		if (window.location.pathname === '/z-app/build/setting') this.setState({ setting: <SettingSolid className="icon" /> })
		if (window.location.pathname === '/z-app/build/overview') this.setState({ list: <ListAltSolidz className="icon" /> })
		if (window.location.pathname === '/z-app/build/overview') this.setState({ bin: <BinSolidz className="icon" /> })
		if (window.location.pathname === '/z-app/build/allusers') this.setState({ bin: <BinSolidz className="icon" /> })
		if (window.location.pathname === '/z-app/build/unpublic') this.setState({ bin: <BinSolidz className="icon" /> })
		if (window.location.pathname === '/z-app/build/addcourse') this.setState({ bin: <BinSolidz className="icon" /> })
		if (window.location.pathname === '/z-app/build/mycourse') this.setState({ bin: <BinSolidz className="icon" /> })
		if (window.location.pathname === '/z-app/build/setting') this.setState({ bin: <BinSolidz className="icon" /> })

		if (window.location.pathname === '/z-app/build/overview') this.setState({ unpublic: <UnPublicSolidz className="icon" /> })
		if (window.location.pathname === '/z-app/build/allusers') this.setState({ unpublic: <UnPublicSolidz className="icon" /> })
		if (window.location.pathname === '/z-app/build/addcourse') this.setState({ unpublic: <UnPublicSolidz className="icon" /> })
		if (window.location.pathname === '/z-app/build/mycourse') this.setState({ unpublic: <UnPublicSolidz className="icon" /> })
		if (window.location.pathname === '/z-app/build/setting') this.setState({ unpublic: <UnPublicSolidz className="icon" /> })
	}
	logOut() {
		auth.clearToken()
		this.props.history.push('/')
	}

	myCourse = e => {
		this.props.history.push('/mycourse')
	}
	componentWillReceiveProps() {
		this.update()
	}
	async getData() {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		let uId = userDecoded.id
		await axios.get(`http://localhost:3013/z-api/users/${uId}`).then(res => {
			const { data } = res
			this.setState({ data })
		})
	}

	componentDidMount() {
		try {
			this.update()
			this.getData()
		} catch (error) {}
	}
	render() {
		let user = auth.getToken()
		let userDecoded = auth.decodeToken(user)
		// let uId = userDecoded.id
		let uFn = userDecoded.firstname
		let uLn = userDecoded.lastname
		let uRole = userDecoded.role
		const url = 'http://localhost:3013/'
		const { data } = this.state

		if (this.state.data.pathProfile === '') {
			this.state.data.pathProfile = 'upload/image/default_profile.jpg'
		} else {
		}

		return (
			<div>
				<Navbar
					fixed="top"
					className="color-header"
					style={{
						paddingBottom: '0',
						paddingTop: '0',
						paddingLeft: '5px',
						paddingRight: '5px'
						// backgroundColor: '#5bc2e1'
						// background-image:linear-gradient(270deg,rgb(113, 104, 241),rgb(70, 176, 247));
					}}
				>
					<NavLink
						onClick={() => {
							this.changeListIcon()
						}}
					>
						{this.state.list}
					</NavLink>
					{/* <NavLink
						onClick={() => {
							this.changeFolderIcon()
						}}
					>
						{this.state.folder}
					</NavLink>

					*/}

					{uRole === 1 && (
						<NavLink
							onClick={() => {
								this.changePersonIcon()
							}}
						>
							{this.state.person}
						</NavLink>
					)}

					{uRole === 1 && (
						<NavLink
							onClick={() => {
								this.toPublic()
							}}
							style={{ cursor: 'pointer' }}
						>
							{this.state.unpublic}
						</NavLink>
					)}

					{uRole === 1 && (
						<NavLink
							onClick={() => {
								this.coursedeleted()
							}}
							style={{ cursor: 'pointer' }}
						>
							{this.state.bin}
						</NavLink>
					)}

					<NavLink
						onClick={() => {
							this.changeFolderIcon()
						}}
					>
						{this.state.add}
					</NavLink>

					<Navbar className="ml-auto" style={{ paddingRight: '0' }}>
						{/* <NavLink onClick={e => this.toggleAddModal(true)}>{this.state.add}</NavLink> */}
						<div className="headerName">
							สวัสดีคุณ {uFn} {uLn}
						</div>

						<Image
							className="ProfilePicHeader"
							onClick={() => {
								this.myCourse()
							}}
							src={`${url}${data.pathProfile}`}
						/>

						<NavLink
							onClick={() => {
								this.changeSettingIcon()
							}}
						>
							{this.state.setting}
						</NavLink>

						<NavLink onClick={this.toggleLogOut}>{this.state.logout}</NavLink>
					</Navbar>
				</Navbar>

				{this.state.toggleLogOut && (
					<Modal isOpen={this.state.toggleLogOut} toggle={this.toggleLogOut} centered={true}>
						<ModalHeader toggle={this.toggleLogOut} style={{ color: '#da3849' }} className="modalheader">
							Confirm Log Out
						</ModalHeader>
						<ModalBody style={{ display: 'flex' }} className="modalbody">
							Are you sure you want to logout?
						</ModalBody>
						<ModalFooter>
							<Button color="secondary" onClick={this.toggleLogOut}>
								Cancel
							</Button>
							<Button color="danger" onClick={(this.toggleLogOut, this.logOut)}>
								Confirm
							</Button>
						</ModalFooter>
					</Modal>
				)}
			</div>
		)
	}
}
export default withRouter(Header)
