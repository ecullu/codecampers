import React from 'react'
import ACTIONS from '../actions'

const Header = React.createClass({

	render: function (){
		// console.log('rendering header')
		let logoutClass = 'hidden',
			loginClass = '',
			profileClass = 'hidden'

		if(IN.User.isAuthorized()){
			console.log('hiding logout button')
			loginClass = 'hidden'
			logoutClass = ''
			profileClass = ''
		}

		
		return (
				<div className="container-fluid" id="header">
					<div className="col-md-8 logo">
						<h5>&lt; code Campers /&gt;</h5>
					</div>
					<div className="col-md-4 nav-bar">
						<a href="#home"> Home </a>
						<a className={profileClass} href="#edit">Profile</a>
						<a className={logoutClass} onClick={ACTIONS.logUserOut} name="logout"> Log Out </a>
						<a className={loginClass} onClick={ACTIONS.signInUser} name="signin"> Sign In</a>
					</div>
				</div>
			)
	}
})

export default Header