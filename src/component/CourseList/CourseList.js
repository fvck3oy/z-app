import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Home } from 'styled-icons/material/Home'
import './CourseList.css'
const ListHome = Home.extend`
  color: #44c0e2;

	display: inline-block;
  border-radius: 10px;
  hover: #fff;
  &:hover ${ListHome} {
    color: white;
  }
`

class CourseList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			HomeIcon: <ListHome className="usernameIcon" />
		}
	}
	render() {
		return (
			<div className="course-list d-flex flex-column">
				<div className="p-2 list">หน้าแรก</div>
				<div className="p-2 list">ภาษา</div>
				<div className="p-2 list">คอมพิวเตอร์</div>
				<div className="p-2 list">สุขภาพ</div>
				<div className="p-2 list">เกมส์</div>
				<div className="p-2 list">ทำอาหาร</div>
				<div className="p-2 list">กีฬา</div>
				<div className="p-2 list">ดนตรี</div>
				<div className="p-2 list">อื่น ๆ</div>
			</div>
		)
	}
}
export default withRouter(CourseList)
