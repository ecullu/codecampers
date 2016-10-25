import Backbone from 'backbone'
import CODERS_STORE from './store'
import {User, UserCollection} from './models/models'
import Header from './views/header'
import toastr from 'toastr'

const ACTIONS = {

	onLinkedInLoad: function() {
		console.log('linkedInLoaded in APPLICATION -- app.js')
		IN.Event.on(IN, "auth", ACTIONS.getProfileData)
		IN.Event.on(IN, "logout", ACTIONS.redirectHome)		
	},

	getProfileData: function(){
		let query = 'people/~:(id,first-name,last-name,headline,picture-url,picture-urls::(original),email-address,positions:(id,title,summary,company:(name)),api-standard-profile-request,specialties,summary)'
		IN.API.Raw(query).method('GET').result(function(resData){
			console.log('Linked in API Response: ', resData)
			CODERS_STORE.set('dataReady', true)
			CODERS_STORE.set('authorizedUser',resData)
			CODERS_STORE.addLinkedInId()
			CODERS_STORE.data.collection.fetch().then(function(){
				let userColl = CODERS_STORE.data.collection
				var currentUser = userColl.where({linkedInId: resData.linkedInId})
				if(currentUser.length === 0){
					console.log('changing hash')
					location.hash = "register"
				}
				else{
					location.hash = "home"
				}
			})
			ACTIONS.getCurrentUser()
		})
	},

	getCurrentUser: function(){
		console.log('invoking get current user')
		CODERS_STORE.data.collection.fetch().then(function(){
			let userColl = CODERS_STORE.data.collection
			let user = CODERS_STORE.data.collection.where({linkedInId: CODERS_STORE.data.authorizedUser.linkedInId})
			CODERS_STORE.set('currentDbUser', user[0])
			console.log('coder store', CODERS_STORE.data.currentDbUser)
		})

	},

	signInUser: function(){
		IN.User.authorize()
	},

	logUserOut: function (){
		IN.User.logout(()=>{
			console.log('logging outtt!!')
			location.hash = "logout"
		})
	},

	redirectHome: function(){
		location.hash = "home"
	},

	fetchUsers: function(){
		return CODERS_STORE.data.collection.fetch()
	},

	registerUser: function(extraUserDataObj) {
		let userData = Object.assign({},CODERS_STORE.get('authorizedUser'),extraUserDataObj)
		let user = new User(userData)
		console.log(user)
		toastr.options = {
		  "positionClass": "toast-bottom-center",
		  "timeOut": "2000"
		}
		console.log('registering usr')
		user.save().then(
            (responseData) => {
                toastr.success("Thanks for your feedback", "You have registered successfully!")
                console.log(responseData)
                ACTIONS.fetchUsers()
            },
            (error) => {
                toastr.error('error while saving user')
                console.log(error)
            }
        )
	},

	updateUserInfo: function(evtData){
		console.log(evtData)
		toastr.options = {
		  "positionClass": "toast-bottom-center",
		  "timeOut": "2000"
		}
		let user = CODERS_STORE.data.currentDbUser
		user.set({
			personal: {
				githubName: evtData.githubName.value,
				portfolioUrl: evtData.portfolioUrl.value,
			},
			bootcamp: {
				campName: evtData.campName.value,
				location: evtData.location.value,
				course: evtData.course.value,
			},
			review: {
				ratio: evtData.ratio.value,
				investment: evtData.investment.value,
				advantages: evtData.advantages.value,
				instructor: evtData.instructor.value,
				recommendation: evtData.recommendation.value
			}
		})
		user.save().then(function(success){
			if(success){ toastr.success('Profile updated successfully!') }
		},
		function(error){
			if(error){ toastr.error(error) }
		})
	},
}

export default ACTIONS

window.onLinkedInLoad = ACTIONS.onLinkedInLoad