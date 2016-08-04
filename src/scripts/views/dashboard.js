import React from 'react'
import ACTIONS from '../actions'
import Header from './header'
import CODERS_STORE from '../store'
import {RepoCollection} from '../models/models'
import {GITHUB_TOKEN} from '../../../config/secrets'

const Dashboard = React.createClass({
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
				<div className="dashboard">
					<Header />
					<UserContainer userColl={this.state.collection}/>
				</div>
			)
	}
})

const UserContainer = React.createClass({
	render: function(){
		console.log('users in container', this.props.userColl)
		return (
				<div className="UsersContainer">
					{this.props.userColl.map((user)=> <User userModel={user} key={user.id} />)}
				</div>
			)
	}
})

							// {this.fetchGithubRepo().map((repo) => <Repo repoModel={repo} />)}


const User = React.createClass({
	getInitialState: function(){
		return {
			userRepos: new RepoCollection(this.props.userModel.get('personal').githubName),
			activeTab: 'gh',
			showingIndex: '0'
		}
	},

	componentWillMount: function(){
		this.state.userRepos.fetch({
			data:{
				key: GITHUB_TOKEN
			}
		}).then(() => {
			this.setState({
			userRepos: this.state.userRepos
			})
		})
	},
	// fetchGithubRepo: function(){
	// 	let userRepos = new RepoCollection(this.props.userModel.get('personal').githubName)
	// 	// userRepos.initialize(this.props.userModel.get('personal').githubName)
	// 	let repoColl = userRepos.fetch({
	// 		data:{
	// 			key: GITHUB_TOKEN
	// 		}
	// 	}).then(function(){
	// 		console.log('repo', userRepos.models)
	// 		return userRepos.models
	// 	})
	// },
	showGithub: function(){
		this.setState({
			activeTab: 'gh'
		})
		
	},

	showReviews: function(){
		this.setState({
			activeTab: 'reviews'
		})
		
	},

	getRepoColl: function(startIndex){
		let repoLength = this.state.userRepos.length
		let repoColl = this.state.userRepos.map((repo) => <Repo key={repo.cid} repoModel={repo} />)
		let displayedRepos = []
		for (let i = startIndex; i < (startIndex+4); i++){
			displayedRepos.push(repoColl[i]) 
		}
		console.log('repo length', this.state.userRepos.length)
		console.log('repo collection',repoColl)
		console.log('displayed repos', displayedRepos)
		return displayedRepos
		// map((repo) => <Repo key={repo.cid} repoModel={repo} />)		
		// let repoColl = this.state.userRepos.map((repo) => <Repo key={repo.cid} repoModel={repo} />)
	},

	handlePagination: function(event){
		let showingPage = event.currentTarget.dataset.id
		let repoIndex = (showingPage-1)*4
		console.log('page', showingPage)
		console.log('repo index',repoIndex)
		this.setState({
			showingIndex: repoIndex
		})
		
	},

	getPaginationButtons: function(){
		let totalPages = 0
		let navButtonArr = []
		if(this.state.userRepos.length%4 === 0){
			totalPages = (this.state.userRepos.length)/4
		}
		else{
			totalPages = Math.ceil(this.state.userRepos.length/4)
		}
		console.log(totalPages)
		for(let i = 1; i <= totalPages; i ++){
			navButtonArr.push( <li data-id={i} key={i} className="navOne" onClick={this.handlePagination}>&nbsp;</li>)
		}
		console.log('nav button arr',navButtonArr)
		return navButtonArr
	},

	render: function(){
		let repoIndex = this.state.showingIndex
		let ghClass = 'github',
			reviewClass = 'review hidden'

		if (this.state.activeTab === 'reviews') {
			console.log('checking active tab')
			reviewClass = 'review'
			ghClass = 'hidden github'
		}

		// console.log('fetch repo',this.state.userRepos)
		return (
				<div className="user-container">
					<div className="user-info">
						<div className="photo">
							<img src={this.props.userModel.get('pictureUrls').values[0]}/>
						</div>
						<div className="user-details">
							<p>{this.props.userModel.get('firstName')} {this.props.userModel.get('lastName')}</p>
							<p>Bootcamp: {this.props.userModel.get('bootcamp').campName}</p>
							<p>Campus Location: {this.props.userModel.get('bootcamp').location}</p>
							<p>Course: {this.props.userModel.get('bootcamp').course}</p>
							<hr/>
							<p>Portfolio: <a href={this.props.userModel.get('personal').portfolioUrl}>{this.props.userModel.get('personal').portfolioUrl}</a></p>
							<p>Degree: {this.props.userModel.get('personal').degree}</p>
							<p>Company: {this.props.userModel.get('positions').values[0].company.name}</p>
							<p>Title: {this.props.userModel.get('positions').values[0].title}</p>

						</div>
					</div>
					<div className="user-slider">
						<div className="tabs">
							<div className="github-tab">
								<button onClick={this.showGithub}> GitHub </button>
							</div>
							<div className="reviews-tab">
								<button onClick={this.showReviews}> Reviews </button>
							</div>							
						</div>
						<div className={ghClass}>
							<div className="repo-coll">
								{this.getRepoColl(repoIndex)}
								{/*{this.state.userRepos.map((repo) => <Repo key={repo.cid} repoModel={repo} />)}*/}
							</div>
							<div className="repo-nav">
								<ul>
									{this.getPaginationButtons()}
								</ul>
							</div>
						</div>
						<div className={reviewClass}>					
			                <h6>What is your opinion about instructor/student ratio. Were you able to find someone right away when you had questions ? </h6>
			                <p>{this.props.userModel.get('review').ratio}</p>
		                    <h6>Boot camp is a big investment, where do you think the money goes in TIY? Instructor assistance, lecture, environment, networking opportunities?</h6>
			                <p>{this.props.userModel.get('review').investment}</p>
		                    <h6>What were the advantages of TIY compare to online courses ?</h6>
			                <p>{this.props.userModel.get('review').advantages}</p>
		                    <h6>How did you like the instructor?</h6>
			                <p>{this.props.userModel.get('review').instructor}</p>
						</div>
					</div>
				</div>
			)
	}
})

const Repo = React.createClass({
	render: function(){
		// console.log('gh repo', this.props.repoModel)
		// if(this.props.repoModel.get('homepage')){}
		return (
			<div className="repo-container">
				<p className="repo-name">{this.props.repoModel.get('name')}</p>
				<p>Description: {this.props.repoModel.get('description')}</p>
				<p>Live Site: <a target="_blank" href={this.props.repoModel.get('homepage')}>{this.props.repoModel.get('homepage')}</a></p>
				<p>Source Code: <a target="_blank" href={this.props.repoModel.get('html_url')}> {this.props.repoModel.get('html_url')}</a></p>
			</div>
			)
	}
})

export default Dashboard