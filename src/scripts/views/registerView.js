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
				degree: evt.currentTarget.degree.value,
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
				instructor: evt.currentTarget.instructor.value
			}
        })
    },

    _getCityList: function(){
    	return Cities.map(function(city){
    		return <option key={city.rank} value={city.city}/>
    	})
    },
		                    

	render: function(){
		return (
				<div id="register-form">
					<form onSubmit={this._handleRegister}>
                    	<h3>Tell us about your experience</h3>
                    	<div className="form-group">
                    		<label htmlFor="githubUsername"> Github Username (required)</label>
                    		<input name="githubName" className="form-control" placeholder="Enter your GitHub Username" required/>
                    	</div>
                    	<div className="form-group">
                    		<label htmlFor="degree"> Degree (required)</label>
		                    <input name="degree" className="form-control" placeholder="Enter your degree" required/>
		                </div>
		                <div className="form-group">
		                	<label htmlFor="campName"> Bootcamp Name (required) </label>
		                	<input name="campName" className="form-control" type="text" defaultValue="The Iron Yard" placeholder="Enter the name of bootcamp" required/>
		                </div>
	    				<div className="form-group">
	    					<label htmlFor="location">Bootcamp Location (required) </label>
		                    <input name="location" className="form-control" type="text" list="cities" placeholder="Enter bootcamp location" required/>
		                    <datalist id="cities">
			 					{this._getCityList()}
			                </datalist>
			            </div>
			            <div className="form-group">
			            	<label htmlFor="course">Select your program (required)</label>
		                    <select name="course" className="form-control" defaultValue="default" required>
	                    	  <option value="default" disabled ></option>
							  <option value="Ruby On Rails">Ruby On Rails</option> 
							  <option value="JavaScript">JavaScript</option>
							  <option value="iOS">iOS</option>
							</select>
						</div> 
						<div className="form-group">
							<label htmlFor="portfolioUrl"> Enter your portfolio website</label>
							<input name="portfolioUrl" className="form-control" type="url" placeholder="Enter website url" />
	                    </div>
	                    <div className="form-group">
		                    <label htmlFor="ratio" >What is your opinion about instructor/student ratio ? </label>
		                    <textarea className="form-control" rows="6" name="ratio"/>
		                </div>
		                <div className="form-group">
							<label htmlFor="investment">Boot camp is a big investment, where do you think the money goes in bootcamps ? </label>
							<textarea className="form-control" rows="6" name="investment"/>
		                </div>
		                <div className="form-group">
							<label htmlFor="advantages">What are the advantages of bootcamps compare to online courses ? </label>
							<textarea className="form-control" rows="6" name="advantages"/>
		                </div>
		                <div className="form-group">
		                    <label htmlFor="instructor">How did you like the instructor ?</label>
		                    <textarea className="form-control" rows="6" name="instructor"/>
	                    </div>
	                    <button className="btn btn-primary" type="submit">Save</button>
                	</form>
				</div>
			)
	}
})

export default RegisterView