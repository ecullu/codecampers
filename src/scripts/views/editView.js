import React from 'react'
import ACTIONS from '../actions'
import Header from './header'
import CODERS_STORE from '../store'

const EditView = React.createClass({
	getInitialState: function(){
		return CODERS_STORE.getData()
	},

	componentWillMount: function(){
		CODERS_STORE.on('updateContent', () => {
			this.setState(CODERS_STORE.getData())
		})
		ACTIONS.fetchUsers()
		// ACTIONS.getCurrentUser()
	},

	componentWillUnmount: function (){
		CODERS_STORE.off('updateContent')
	},

	render: function(){
		// console.log('renderin edit view')
		return (
				<div className="register">
					<Header />
					<EditForm currentUser={this.state.currentDbUser}/>
				</div>
			)
	}
})

const EditForm = React.createClass({
	_handleUpdate: function(evt){
		evt.preventDefault()
		// ACTIONS.updateUserInfo({
		// 	githubName: evt.currentTarget.githubName.value
		// })
		ACTIONS.updateUserInfo(evt.currentTarget)
	},

	render: function(){
		console.log('props in edit form',this.props.currentUser.get('githubName'))
		return (
			<div className="edit">
				<form onSubmit={this._handleUpdate}>
					<input name="githubName" defaultValue={this.props.currentUser.get('githubName')}/>
					<button type="submit">Save</button>
				</form>
			</div>
			)
	}
})

export default EditView