import React from 'react'
import ACTIONS from '../actions'

const Header = React.createClass({

	render: function (){
		console.log('rendering header')
		let logoutClass = 'hidden'
		let loginClass = ''
		if(IN.User.isAuthorized()){
			console.log('hiding logout button')
			loginClass = 'hidden'
			logoutClass = ''
		}

		
		return (
				<div id="header">
					<h5>Code Campers</h5>
					<a href="#home"> Home </a>
					<a href="#edit">Edit Review</a>
					<button className={logoutClass} onClick={ACTIONS.logUserOut} name="logout"> Log Out </button>
					<button className={loginClass} onClick={ACTIONS.signInUser} name="signin"> Sign In</button>

				</div>
			)
	}
})

export default Header