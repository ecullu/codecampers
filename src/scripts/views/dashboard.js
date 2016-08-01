import React from 'react'
import ACTIONS from '../actions'
import Header from './header'
import CODERS_STORE from '../store'

const Dashboard = React.createClass({
	getInitialState: function(){
		return CODERS_STORE.getData()
	},

	componentWillMount: function(){
		CODERS_STORE.on('updateContent', () => {
			this.setState(CODERS_STORE.getData())
		})
	},

	render: function(){
		return (
				<div className="dashboard">
					<Header />
					<UserContainer userColl={this.state.collection}/>
				</div>
			)
	}
})

const UserContainer = React.createClass({
	render: function(){
		console.log('users in container', this.props.userColl)
		return (
				<div className="UsersContainer">
					{this.props.userColl.map((user)=> <User userModel={user} key={user.id} />)}
				</div>
			)
	}
})

const User = React.createClass({
	render: function(){
		return (
				<div>
					<h4>{this.props.userModel.get('firstName')}</h4>
				</div>
			)
	}
})

export default Dashboard