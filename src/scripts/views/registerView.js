import React from 'react'
import ACTIONS from '../actions'
import Header from './header'
import CODERS_STORE from '../store'
import Cities from '../cities'

const RegisterView = React.createClass({

	render: function(){
		console.log('renderin register view')
		return (
				<div className="register">
					<Header />
					<RegisterForm />
				</div>
			)
	}
})



const RegisterForm = React.createClass({
	_handleRegister: function(evt) {
        evt.preventDefault()
        ACTIONS.registerUser({
        	personal: {
				githubName: evt.currentTarget.githubName.value,
				portfolioUrl: evt.currentTarget.portfolioUrl.value
			},
			bootcamp: {
				campName: evt.currentTarget.campName.value,
				location: evt.currentTarget.location.value,
				course: evt.currentTarget.course.value,
			},
			review: {
				ratio: evt.currentTarget.ratio.value,
				investment: evt.currentTarget.investment.value,
				advantages: evt.currentTarget.advantages.value,
				instructor: evt.currentTarget.instructor.value,
				recommendation: evt.currentTarget.recommendation.value
			}
        })
    },

    _getCityList: function(){
    	return Cities.map(function(city){
    		return <option key={city.rank} value={city.city}/>
    	})
    },
		                    

	render: function(){
		const requiredSymbolStyle = {color: '#c55'}
		return (
				<div id="register-form">
					<form onSubmit={this._handleRegister}>
                    	<h3>Tell us about your experience</h3>
                    	<div className="form-group">
                    		<label htmlFor="githubUsername"> Github Username <span style={requiredSymbolStyle}>*</span></label>
                    		<input name="githubName" className="form-control" placeholder="Please enter your GitHub Username" required/>
                    	</div>
		                <div className="form-group">
		                	<label htmlFor="campName"> Bootcamp Name <span style={requiredSymbolStyle}>*</span> </label>
		                	<input name="campName" className="form-control" type="text" defaultValue="The Iron Yard" placeholder="Please enter the name of bootcamp" required/>
		                </div>
	    				<div className="form-group">
	    					<label htmlFor="location">Bootcamp Location <span style={requiredSymbolStyle}>*</span> </label>
		                    <input name="location" className="form-control" type="text" list="cities" placeholder="Please enter bootcamp location" required/>
		                    <datalist id="cities">
			 					{this._getCityList()}
			                </datalist>
			            </div>
			            <div className="form-group">
			            	<label htmlFor="course">Select your program <span style={requiredSymbolStyle}>*</span></label>
		                    <select name="course" className="form-control" defaultValue="default" required>
	                    	  <option value="default" disabled ></option>
							  <option value="Ruby On Rails">Ruby On Rails</option> 
							  <option value="JavaScript">JavaScript</option>
							  <option value="iOS">iOS</option>
							</select>
						</div> 
						<div className="form-group">
							<label htmlFor="portfolioUrl"> Enter your portfolio website</label>
							<input name="portfolioUrl" className="form-control" type="url" placeholder="Please enter your portfolio url" />
	                    </div>
	                    <div className="form-group">
		                    <label htmlFor="ratio" >What was your instructor/student ratio?</label>
		                    <textarea className="form-control" rows="6" name="ratio"/>
		                </div>
		                <div className="form-group">
							<label htmlFor="investment">Bootcamp is a big investment. How can your experience gain you a return on your investment?</label>
							<textarea className="form-control" rows="6" name="investment"/>
		                </div>
		                <div className="form-group">
							<label htmlFor="advantages">Why did you choose in person classes as opposed to online?</label>
							<textarea className="form-control" rows="6" name="advantages"/>
		                </div>
		                <div className="form-group">
		                    <label htmlFor="instructor">What qualifications and/or teaching qualities did your instructor have that were beneficial?</label>
		                    <textarea className="form-control" rows="6" name="instructor"/>
	                    </div>
	                    <div className="form-group">
		                    <label htmlFor="recommendation">Would you recommend others attending?</label>
		                    <textarea className="form-control" rows="6" name="recommendation"/>
	                    </div>
	                    <button className="btn btn-primary" type="submit">Save</button>
                	</form>
				</div>
			)
	}
})

export default RegisterView