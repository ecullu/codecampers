import React from 'react'
import ACTIONS from '../actions'
import Header from './header'
import CODERS_STORE from '../store'
import Cities from '../cities'

const EditView = React.createClass({
	getInitialState: function(){
		return CODERS_STORE.getData()
	},

	componentWillMount: function(){
		CODERS_STORE.on('updateContent', () => {
			this.setState(CODERS_STORE.getData())
		})
		ACTIONS.fetchUsers()
	},

	componentWillUnmount: function (){
		CODERS_STORE.off('updateContent')
	},

	render: function(){
		return (
				<div className="register">
					<Header />
					<EditForm currentDbUser={this.state.currentDbUser}/>
				</div>
			)
	}
})

const EditForm = React.createClass({
	_handleUpdate: function(evt){
		evt.preventDefault()
		ACTIONS.updateUserInfo(evt.currentTarget)
	},

	_getCityList: function(){
    	return Cities.map(function(city){
    		return <option key={city.rank} value={city.city}/>
    	})
    },

	render: function(){
		let requiredSymbolStyle = {color: '#c55'}
		return (
			<div id="edit-form">
				<form onSubmit={this._handleUpdate}>
				<h3>Profile</h3>
                    	<div className="form-group">
                    		<label htmlFor="githubUsername"> Github Username <span style={requiredSymbolStyle}>*</span></label>
                    		<input name="githubName" className="form-control" defaultValue={this.props.currentDbUser.get('personal').githubName} required/>
                    	</div>
		                <div className="form-group">
		                	<label htmlFor="campName"> Bootcamp Name <span style={requiredSymbolStyle}>*</span></label>
		                	<input name="campName" className="form-control" type="text" defaultValue={this.props.currentDbUser.get('bootcamp').campName} required/>
		                </div>
	    				<div className="form-group">
	    					<label htmlFor="location">Bootcamp Location <span style={requiredSymbolStyle}>*</span></label>
		                    <input name="location" className="form-control" type="text" list="cities" defaultValue={this.props.currentDbUser.get('bootcamp').location} required/>
		                    <datalist id="cities">
			 					{this._getCityList()}
			                </datalist>
			            </div>
			            <div className="form-group">
			            	<label htmlFor="course">Select your program <span style={requiredSymbolStyle}>*</span></label>
		                    <select name="course" className="form-control" defaultValue={this.props.currentDbUser.get('bootcamp').course} required>
	                    	  <option value="default" disabled ></option>
							  <option value="Ruby On Rails">Ruby On Rails</option> 
							  <option value="JavaScript">JavaScript</option>
							  <option value="iOS">iOS</option>
							</select>
						</div> 
						<div className="form-group">
							<label htmlFor="portfolioUrl"> Enter your portfolio website url</label>
							<input name="portfolioUrl" className="form-control" type="url" defaultValue={this.props.currentDbUser.get('personal').portfolioUrl} />
	                    </div>
	                    <div className="form-group">
		                    <label htmlFor="ratio" >What was your instructor/student ratio?</label>
		                    <textarea className="form-control" rows="6" name="ratio" defaultValue={this.props.currentDbUser.get('review').ratio}/>
		                </div>
		                <div className="form-group">
							<label htmlFor="investment">Bootcamp is a big investment. How can your experience gain you a return on your investment?</label>
							<textarea className="form-control" rows="6" name="investment" defaultValue={this.props.currentDbUser.get('review').investment}/>
		                </div>
		                <div className="form-group">
							<label htmlFor="advantages">Why did you choose in person classes as opposed to online?</label>
							<textarea className="form-control" rows="6" name="advantages" defaultValue={this.props.currentDbUser.get('review').advantages}/>
		                </div>
		                <div className="form-group">
		                    <label htmlFor="instructor">What qualifications and/or teaching qualities did your instructor have that were beneficial?</label>
		                    <textarea className="form-control" rows="6" name="instructor" defaultValue={this.props.currentDbUser.get('review').instructor}/>
	                    </div>
	                    <div className="form-group">
		                    <label htmlFor="recommendation">Would you recommend others attending?</label>
		                    <textarea className="form-control" rows="6" name="recommendation" defaultValue={this.props.currentDbUser.get('review').recommendation}/>
	                    </div>
					<button type="submit" className="btn btn-primary">Save</button>
				</form>
			</div>
			)
	}
})

export default EditView