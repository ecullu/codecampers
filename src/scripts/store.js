import Backbone from 'backbone'
import _ from 'underscore'
import {UserCollection, User} from './models/models'

const CODERS_STORE = _.extend(Backbone.Events, {
	data: {
		collection: new UserCollection(),
		authorizedUser: {},
		currentDbUser: {},
		dataReady: false
	},

	emitChange: function(){
		this.trigger('updateContent')
	},

	getData: function(){
		return _.clone(this.data)
	},

	get: function(key) {
		return this.data[key]
	},

	set: function(key,val) {
		this.data[key] = val
		this.emitChange()
	},

	addLinkedInId: function(){
		this.data.authorizedUser['linkedInId'] = this.data.authorizedUser.id
		console.log('auth user in store',this.data.authorizedUser)
	},

	initialize: function (){
		this.data.collection.on('sync update', this.emitChange.bind(this))

	}
})
CODERS_STORE.initialize()
export default CODERS_STORE
