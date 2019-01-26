import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
// import PrivateRoute from './component/privateRoute/index'
import Login from './pages/Login/Login'
// import Overview from './component/overview/overview'
import ForgotPass from './pages/Forgot/Forgot'
import Main from './Main'
import Register from './pages/Register/Register'
import ResetPassword from './pages/Resetpass/Resetpass'

class App extends Component {
	constructor() {
		super()
		this.state = {}
	}

	render() {
		return (
			<Router basename={'z-app/build'}>
				<Switch>
					<Route exact path="/" component={withRouter(Login)} />
					<Route exact path="/forgotpass" component={withRouter(ForgotPass)} />
					<Route exact path="/register" component={withRouter(Register)} />
					<Route exact path="/resetpassword/:token" component={withRouter(ResetPassword)} />
					<Main />
				</Switch>
			</Router>
		)
	}
}

export default App
