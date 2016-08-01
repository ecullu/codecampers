import Backbone from 'backbone'
import CODERS_STORE from './store'
import {User, UserCollection} from './models/models'
import Header from './views/header'

const ACTIONS = {

	onLinkedInLoad: function() {
		console.log('linkedInLoaded in APPLICATION -- app.js')
		IN.Event.on(IN, "auth", ACTIONS.getProfileData)
		IN.Event.on(IN, "logout", ACTIONS.redirectHome)
		// ACTIONS.fetchLinkedInPeople('people/~:(id,first-name,last-name,maiden-name,email-address,positions:(id,title,summary),educations:(id,school-name,field-of-study))')
		
	},

	getProfileData: function(){
		let query = 'people/~:(id,first-name,last-name,headline,picture-url,picture-urls::(original),email-address,positions:(id,title,summary,company:(name)),educations:(id,school-name,field-of-study))'
		IN.API.Raw(query).method('GET').result(function(resData){
			console.log('Linked in API Response: ', resData)
			CODERS_STORE.set('dataReady', true)
			CODERS_STORE.set('authorizedUser',resData)
			CODERS_STORE.addLinkedInId()
			CODERS_STORE.data.collection.fetch().then(function(){
				let userColl = CODERS_STORE.data.collection
				var currentUser = userColl.where({linkedInId: resData.linkedInId})
				if(currentUser.length === 0){
					console.log('changin hash')
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
			// console.log('user in get current user', user[0])
			CODERS_STORE.set('currentDbUser', user[0])
			// console.log('coder store', CODERS_STORE.data.currentDbUser)
		})

	},

	signInUser: function(){
		IN.User.authorize()
	},

	logUserOut: function (){
		IN.User.logout(()=>{console.log('logging outtt!!')})
	},

	redirectHome: function(){
		location.hash = "home"
	},

	fetchUsers: function(){
		return CODERS_STORE.data.collection.fetch()
	},

	registerUser: function(extraUserDataObj) {
		let userData = Object.assign({},CODERS_STORE.get('authorizedUser'),extraUserDataObj)
		// console.log('register user data', userData)
		/// now wrap it in a backbone model and save it!
		let user = new User(userData)

		// user.attributes = ....^^
		// console.log('new user created', user)
		user.save().then(
            (responseData) => {
                alert('user is saved')
                console.log(responseData)
                location.hash = "home"
            },
            (error) => {
                alert('error while saving user')
                console.log(error)
            }
        )
	},

	updateUserInfo: function(evtData){
		console.log(evtData)
		let user = CODERS_STORE.data.currentDbUser
		user.set({
			// githubName: userData.githubName
			githubName: evtData.githubName.value
		})
		user.save()
	},
}

export default ACTIONS

window.onLinkedInLoad = ACTIONS.onLinkedInLoad