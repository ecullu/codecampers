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
		console.log('renderin edit view')
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
		ACTIONS.updateUserInfo(evt.currentTarget)
	},

	render: function(){
		console.log('props in edit form',this.props.currentUser.get('personal').githubName)
		return (
			<div className="edit">
				<form onSubmit={this._handleUpdate}>
					<input name="githubName" defaultValue={this.props.currentUser.get('personal').githubName}/>
					<input name="degree" defaultValue={this.props.currentUser.get('personal').degree}/>
					<input name="portfolioUrl" defaultValue={this.props.currentUser.get('personal').portfolioUrl}/>
					<br/>
					<input name="campName" defaultValue={this.props.currentUser.get('bootcamp').campName}/>
					<input name="location" defaultValue={this.props.currentUser.get('bootcamp').locaiton}/>
					<input name="course" defaultValue={this.props.currentUser.get('bootcamp').course}/>
					<br/>
                    <h4>What is your opinion about instructor/student ratio. Were you able to find someone right away when you had questions ? </h4>
                    <textarea rows="6" cols="75" name="ratio" defaultValue={this.props.currentUser.get('review').ratio}/>
                    <h4>Boot camp is a big investment, where do you think the money goes in TIY? Instructor assistance, lecture, environment, networking opportunities?</h4>
                    <textarea rows="6" cols="75" name="investment" defaultValue={this.props.currentUser.get('review').investment}/>
                    <h4>What were the advantages of TIY compare to online courses ?</h4>
                    <textarea rows="6" cols="75" name="advantages" defaultValue={this.props.currentUser.get('review').advantages}/>
                    <h4>How did you like the instructor?</h4>                    
                    <textarea rows="6" cols="75" name="instructor" defaultValue={this.props.currentUser.get('review').instructor}/>
                    <br/>
					<button type="submit">Save</button>
				</form>
			</div>
			)
	}
})

export default EditView