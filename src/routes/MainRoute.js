import React, { Component } from 'react'
import PrivateRoute from '../component/privateRoute/index'
import Overview from '../component/Overview/Overview'
import Setting from '../pages/Setting/Setting'
import EachVideo from '../component/EachVideo/EachVideo'
import AllUsers from '../component/AllUsers/AllUsers'
import AddCourse from '../pages/AddCourse/AddCourse'
import MyCourse from '../pages/MyCourse/MyCourse'
import CourseDeleted from '../pages/CourseDeleted/CourseDeleted'

import UploadFile from '../component/Uploadfile/UploadFile'
import ToPublicCourse from '../component/ToPublicCourse/ToPublicCourse'
import EachVideoUnPublic from '../component/EachVideoUnPublic/EachVideoUnPublic';
import EachVideoDeleted from '../component/EachVideoDeleted/EachVideoDeleted';
class MainRoute extends Component {
	render() {
		return (
			<div style={{ position: 'relative', overflow: 'hidden' }}>
				<PrivateRoute exact path="/overview" component={Overview} />
				<PrivateRoute exact path="/setting" component={Setting} />
				{/* <PrivateRoute exact path="/video" component={EachVideo} /> */}
				<PrivateRoute exact path="/allusers" component={AllUsers} />
				{/* <PrivateRoute exact path="/uploadfile" component={UploadFile} /> */}
				<PrivateRoute exact path="/addcourse" component={AddCourse} />
				<PrivateRoute path="/video/:id" component={EachVideo} />
				<PrivateRoute path="/videounpublic/:id" component={EachVideoUnPublic} />
				<PrivateRoute exact path="/unpublic" component={ToPublicCourse} />
				<PrivateRoute exact path="/mycourse" component={MyCourse} />
				<PrivateRoute exact path="/coursedeleted" component={CourseDeleted} />
				<PrivateRoute path="/coursedeleted/:id" component={EachVideoDeleted} />
				
			</div>
		)
	}
}
export default MainRoute
