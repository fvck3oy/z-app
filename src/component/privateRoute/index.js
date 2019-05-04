import React, { Component } from 'react'
import auth from '../../service/index'
import { Route, Redirect, withRouter } from 'react-router-dom'

export class PrivateRoute extends Component {
	isAuthen = () => {
		let token = auth.getToken()
		let user = auth.decodeToken(token)

		if (auth.isExpiredToken(token)) {
			user = null
		}

		return !!(token && user)
	}
	render() {
		const isAuthenticated = this.isAuthen()
		const { component: InnerComponent, ...rest } = this.props
		const { location } = this.props

		return (
			<Route
				{...rest}
				render={props => (isAuthenticated ? <InnerComponent {...props} /> : <Redirect to={{ pathname: '/', state: { from: location } }} />)}
			/>
		)
	}
}

export default withRouter(PrivateRoute)
