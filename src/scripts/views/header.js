import React from 'react'
import ACTIONS from '../actions'

const Header = React.createClass({

	render: function (){
		console.log('rendering header')
		let buttonClass = 'hide'
		if(IN.User.isAuthorized()){
			console.log('hiding logout button')
			buttonClass = 'show'
		}

		
		return (
				<div id="header">
					<a href="#home"> Home </a>
					<a href="#edit">Edit Review</a>
					<button className={buttonClass} onClick={ACTIONS.logUserOut} name="logout"> Log Out </button>
					<button onClick={ACTIONS.signInUser} name="signin"> Sign In</button>

				</div>
			)
	}
})

export default Header