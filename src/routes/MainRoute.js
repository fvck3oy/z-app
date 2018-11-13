import React, { Component } from 'react'
import PrivateRoute from '../component/privateRoute/index'
import Overview from '../component/Overview/Overview'
import Setting from '../pages/Setting/Setting'
import EachVideo from '../component/EachVideo/EachVideo';
import AllUsers from '../component/AllUsers/AllUsers'
import AddCourse from '../pages/AddCourse/AddCourse'

import UploadFile from '../component/Uploadfile/UploadFile'

class MainRoute extends Component {
	render() {
		return (
			<div style={{ position: 'relative' }}>
				<PrivateRoute exact path="/overview" component={Overview} />
				<PrivateRoute exact path="/setting" component={Setting} />
				{/* <PrivateRoute exact path="/video" component={EachVideo} /> */}
				<PrivateRoute exact path="/allusers" component={AllUsers} />
				{/* <PrivateRoute exact path="/uploadfile" component={UploadFile} /> */}
				<PrivateRoute exact path="/addcourse" component={AddCourse} />
				<PrivateRoute path="/video/:id" component={EachVideo} />
			</div>
		)
	}
}
export default MainRoute
