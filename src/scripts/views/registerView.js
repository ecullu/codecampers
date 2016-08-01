import React from 'react'
import ACTIONS from '../actions'
import Header from './header'
import CODERS_STORE from '../store'
import Cities from '../cities'

const RegisterView = React.createClass({

	getInitialState: function(){
		return CODERS_STORE.getData()
	},

	componentWillMount: function(){
		CODERS_STORE.on('updateContent', () => {
			this.setState(CODERS_STORE.getData())
		})
	},

	render: function(){
		console.log('renderin register view')
		return (
				<div className="register">
					
					<RegisterForm showGithub={this.state.dataReady}/>
				</div>
			)
	}
})



const RegisterForm = React.createClass({
	_handleRegister: function(evt) {
        evt.preventDefault()
        ACTIONS.registerUser({githubName:evt.currentTarget.githubName.value})
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
                    	<h5>This will help prospect students</h5>
	                    <input name="githubName" placeholder="Enter your GitHub Username" /><br/>
	                    <input name="bootcamp" type="text" defaultValue="The Iron Yard" placeholder="Enter the name of bootcamp" />
	                    <h4>Enter the location of bootcamp</h4>
	                    <input name="location" type="text" list="cities"/><br/>
	                    <datalist id="cities">
		 					{this._getCityList()}
		                </datalist>    
	                    <select name="program" defaultValue="default">
                    	  <option value="default" disabled >Select your program</option>
						  <option value="backend">Ruby On Rails</option> 
						  <option value="frontend">JavaScript</option>
						  <option value="mobile">iOS</option>
						</select><br/>
	                    <input name="portfolio" type="url" placeholder="Enter the url of your portfolio" />
	                    <h4>What is your opinion about instructor/student ratio. Were you able to find someone right away when you had questions ? </h4>
	                    <textarea rows="6" cols="75" name="ratio"/>
	                    <h4>Boot camp is a big investment, where do you think the money goes in TIY? Instructor assistance, lecture, environment, networking opportunities?</h4>
	                    <textarea rows="6" cols="75" name="investment"/>
	                    <h4>What were the advantages of TIY compare to online courses ?</h4>
	                    <textarea rows="6" cols="75" name="advantages"/>
	                    <h4>How did you like the instructor?</h4>
	                    <textarea rows="6" cols="75"name="instructor"/>



	                    <br/><button type="submit">Save</button>
                	</form>
				</div>
			)
	}
})

export default RegisterView