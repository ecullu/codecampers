import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import $ from 'jquery'
import init from './init'
import ACTIONS from './actions'
import Dashboard from './views/dashboard'
import RegisterView from './views/registerView'
import EditView from './views/editView'


const app = function() {

	var AppRouter = Backbone.Router.extend ({
        routes: {
            'home': 'goHome',
            'login': 'handleLogin',
            'register': 'handleRegister',
            'edit': 'handleEdit',
            '*catchall': 'redirectHome'
        },

        goHome: function() {
        	console.log('going to dashboard')
            ReactDOM.render(<Dashboard />, document.querySelector('.container')) //don't need to pass anything onto props because we will be doing that in the store
        },

        handleLogin: function() {
            ReactDOM.render(<LoginView />, document.querySelector('.container'))
        },

        handleRegister: function() {
        	console.log('going to register')
            ReactDOM.render(<RegisterView />, document.querySelector('.container'))
        },

        handleEdit: function() {
            console.log('going to edit view')
            ReactDOM.render(<EditView />, document.querySelector('.container'))
        },

        redirectHome: function() {
            location.hash = 'home'
        },

        initialize: function() {
            Backbone.history.start()
        }
    })
    new AppRouter()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
IN.Event.on(IN, "systemReady", app)
// app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..