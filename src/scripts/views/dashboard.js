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
	getUserCollArray: function(){
		let userCollArr = []
		console.log('user coll length',this.props.userColl)
		let i = 0;
		while( i < this.props.userColl.length){
			let user = this.props.userColl.models[i]
			console.log('user 1', user)
			let user2 = this.props.userColl.models[i+1]
			console.log('user 2', user2)
			if(!user2){
				userCollArr.push(
				<div className="row" key={i}>
					<User userModel={user} key={user.id} />
				</div>
				)
			}
			else{
				userCollArr.push(
				<div className="row" key={i}>
					<User userModel={user} key={user.id} />
					<User userModel={user2} key={user2.id} />
				</div>
				)
			}
			// userCollArr.push(
			// 	<div className="row" key={i}>
			// 		<User userModel={user} key={user.id} />
			// 		<User userModel={user2} key={user2.id} />
			// 	</div>
			// )
			i=i+2
		}
		// console.log('user coll array',userCollArr)
		return userCollArr
	},
	// {this.props.userColl.map((user)=> <User userModel={user} key={user.id} />)}

	render: function(){
		// console.log('users in container', this.props.userColl)
		// console.log('user coll length',this.props.userColl.length)
		this.getUserCollArray()
		return (
				<div className="row UsersContainer">
					{this.getUserCollArray()}
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
			showingRepoIndex: '0',
			showingReview: '1',
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

	getReview: function(index){
		let reviewContainer = []
		switch(index){
			case '1':
			reviewContainer.push(
				<div key="r1">
					<h6>What was your instructor/student ratio?</h6>
					<p>{this.props.userModel.get('review').ratio}</p>
				 </div>
				)
			break;
			case '2':
			reviewContainer.push(
				<div key="r2">
					<h6>Bootcamp is a big investment. How can your experience gain you a return on your investment?</h6>
					<p>{this.props.userModel.get('review').investment}</p>
				</div>
				)
			break;
			case '3':
			reviewContainer.push(
				<div key="r3">
					<h6>Why did you choose in person classes as opposed to online?</h6>
					<p>{this.props.userModel.get('review').advantages}</p>
				</div>
				)
			break;
			case '4':
			reviewContainer.push(
				<div key="r4">
					<h6>What qualifications and/or teaching qualities did your instructor have that were beneficial?</h6>
				    <p>{this.props.userModel.get('review').instructor}</p>
				</div>
				)
			break;
			case '5':
			reviewContainer.push(
				<div key="r5">
					<h6>Would you recommend others attending?</h6>
				    <p>{this.props.userModel.get('review').recommendation}</p>
				</div>
				)
		}
		return reviewContainer
	},

	getRepoColl: function(startIndex){
		let repoLength = this.state.userRepos.length
		let repoColl = this.state.userRepos.map((repo) => <Repo key={repo.cid} repoModel={repo} />)
		let displayedRepos = []
		for (let i = startIndex; i < (startIndex+2); i++){
			displayedRepos.push(repoColl[i]) 
		}
		// console.log('repo length', this.state.userRepos.length)
		// console.log('repo collection',repoColl)
		// console.log('displayed repos', displayedRepos)
		return displayedRepos
	},

	handleRepoPagination: function(event){
		let showingPage = event.currentTarget.dataset.id
		// console.log('page', showingPage)
		// console.log('handingling page navigation')
			let repoIndex = (showingPage-1)*4
			// console.log('page', showingPage)
			// console.log('repo index',repoIndex)
			this.setState({
				showingRepoIndex: repoIndex
			})
	},

	handleReviewPagination: function(event){
		// console.log('changing review state')
		this.setState({
			showingReview: event.currentTarget.dataset.id
		})
	},

	getReviewPaginationButtons: function (){
		let reviewNavButtonClass = ""
		let reviewNavButtonArr = []
		// console.log('showing review',this.state.showingReview)
		for (let i = 1; i <= 5; i++){
			if(parseInt(this.state.showingReview) === i){
				reviewNavButtonClass = "active"
			}
			else{
				reviewNavButtonClass = ""
			}
			reviewNavButtonArr.push( <li className={reviewNavButtonClass} data-id={i} key={i} onClick={this.handleReviewPagination}><a>{i}</a></li>)
		}
		return reviewNavButtonArr
	},

	getPaginationButtons: function(){
		let totalPages = 0
		let navButtonArr = []
		let navButtonClass = "navOne"
		let currentPage = (this.state.showingRepoIndex + 4)/4
		if(this.state.userRepos.length%4 === 0){
			totalPages = (this.state.userRepos.length)/4
		}
		else{
			totalPages = Math.ceil(this.state.userRepos.length/4)
		}
		// console.log(totalPages)
		for(let i = 1; i <= totalPages; i ++){
			// highlights the active button
			if(currentPage === i){
				navButtonClass = "active navOne"
			}
			else{
				navButtonClass = "navOne"
			}
			navButtonArr.push( <li data-id={i} key={i} className={navButtonClass} onClick={this.handleRepoPagination}><a>{i}</a></li>)
		}
		// console.log('nav button arr',navButtonArr)
		return navButtonArr
	},

	render: function(){
		let userCollIndex = this.props.userModel.cid.substr(1)
		let repoIndex = this.state.showingRepoIndex
		// console.log('button arr length', this.getPaginationButtons().length)
		// console.log('showingRepoIndex',repoIndex)
		// console.log('showing review', this.state.showingReview)
		let ghClass = 'github',
			reviewClass = 'review-container hidden',
			ghTabClass = 'active active-tab',
			reviewTabClass = 'review-tab',
			prevButtonClass = '',
			nextButtonClass = '',
			reviewPrevButtonClass = '',
			reviewNextButtonClass = '',
			userClass = 'col-md-6',
			companyStr = '',
			titleStr = ''

		// limits functionality of arrow buttons based on current page
		if(this.state.showingReview === "1"){
			reviewPrevButtonClass = "disabled"
		}
		if(this.state.showingReview === "4"){
			reviewNextButtonClass = "disabled"
		}
		if(repoIndex < 4){
			// console.log('disabling prev button!!!!!!!!!!!!')
			prevButtonClass = "disabled"
		}
		if(repoIndex >= (this.getPaginationButtons().length * 4) - 4){
			nextButtonClass = "disabled"
		}

		if (this.state.activeTab === 'reviews') {
			// console.log('checking active tab')
			reviewClass = 'review-container'
			ghClass = 'github hidden'
			ghTabClass = ''
			reviewTabClass = 'active active-tab'
		}
		// adds offset only user on the right
		if(userCollIndex%2 === 0){
			userClass = "col-md-6"
		}

		// checks if user has a current company
		
		if(this.props.userModel.get('positions').values.length === 0){
			companyStr = "TIY Academy",
			titleStr = "Web Developer"
		}
		else{
			companyStr = this.props.userModel.get('positions').values[0].company.name
			titleStr = this.props.userModel.get('positions').values[0].title
		}
		// console.log('user props', this.props.userModel)
		// console.log('fetch repo',this.state.userRepos)
		return (
				<div className={userClass}>
					<div className="user-container">
						<div className="col-md-12 username">
								<h3>{this.props.userModel.get('firstName')} {this.props.userModel.get('lastName')}</h3>
						</div>
						<div className="row user-info">
							<div className="col-md-4 col-sm-4 col-xs-4 photo">
								<img src={this.props.userModel.get('pictureUrls').values[0]}/>
							</div>
							<div className="col-md-8 col-sm-8 col-xs-8 user-details">
								<p>Bootcamp: {this.props.userModel.get('bootcamp').campName}</p>
								<p>Campus Location: {this.props.userModel.get('bootcamp').location}</p>
								<p>Course: {this.props.userModel.get('bootcamp').course}</p>
								<hr/>
								<p>Portfolio: <a href={this.props.userModel.get('personal').portfolioUrl}>{this.props.userModel.get('personal').portfolioUrl}</a></p>
								<p>Company: {companyStr}</p>
								<p>Title: {titleStr}</p>
								<p>Contact: {this.props.userModel.get('emailAddress')}</p>

							</div>
						</div>
						<div className="user-slider">
							<div className="tabs">
								<ul className="nav nav-tabs">
									<li role="presentation" className={ghTabClass}><a onClick={this.showGithub}>GitHub </a></li>
									<li role="presentation" className={reviewTabClass}><a onClick={this.showReviews}> Bootcamp Review</a></li>
								</ul>
								{/*
								<div className={ghTabClass} onClick={this.showGithub}>
									 GitHub 
								</div>
								<div className={reviewTabClass} onClick={this.showReviews}>
									 Bootcamp Review 
								</div>	
								*/}						
							</div>
							<div className={ghClass}>
								<div className="repo-container">
									<div className="row repo-coll">
										{this.getRepoColl(repoIndex)}
										{/*{this.state.userRepos.map((repo) => <Repo key={repo.cid} repoModel={repo} />)}*/}
									</div>
									<div className="row repo-coll">
										{this.getRepoColl(parseInt(repoIndex) + 2)}
									</div>
								</div>
								<nav aria-label="...">
									<ul className="pagination">
										 <li className={prevButtonClass} data-id={Math.ceil((parseInt(this.state.showingRepoIndex)+ 4)/4) - 1} onClick={this.handleRepoPagination}>
									       <a aria-label="Previous">
									         <span aria-hidden="true">&lt;</span>
									       </a>
									    </li>
										{this.getPaginationButtons()}
										<li className={nextButtonClass} data-id={Math.ceil((parseInt(this.state.showingRepoIndex) + 4)/4) + 1} onClick={this.handleRepoPagination}>
									      <a aria-label="Next">
									        <span aria-hidden="true">&gt;</span>
									      </a>
										</li>
									</ul>
								</nav>
							</div>
							<div className={reviewClass}>
								<div className="review">
									{this.getReview(this.state.showingReview)}
								</div>
								<nav aria-label="...">
									<ul className="pagination">
										 <li className={reviewPrevButtonClass} data-id={parseInt(this.state.showingReview) - 1} onClick={this.handleReviewPagination}>
									       <a aria-label="Previous">
									         <span aria-hidden="true">&lt;</span>
									       </a>
									    </li>
									    	{this.getReviewPaginationButtons()}
										<li className={reviewNextButtonClass} data-id={parseInt(this.state.showingReview) + 1} onClick={this.handleReviewPagination}>
									      <a aria-label="Next">
									        <span aria-hidden="true">&gt;</span>
									      </a>
										</li>
									</ul>
								</nav>					
							</div>
						</div>
					</div>
				</div>
			)
	}
})

const Repo = React.createClass({
	render: function(){
		let liveUrl = ""
		let sourceUrl = ""
		if(this.props.repoModel.get('homepage')){ //splits url after data is fetched
			liveUrl = this.props.repoModel.get('homepage').split('//')
			// sourceUrl = this.props.repoModel.get('html_url').split('//')
		}
		if(this.props.repoModel.get('html_url')){
			sourceUrl = this.props.repoModel.get('html_url').split('//')
		}
		
		return (
			<div className="col-md-6 col-sm-6 col-xs-6 repo-container">
				<div className="repo-name">{this.props.repoModel.get('name')}</div>
				<p>Description: <span>{this.props.repoModel.get('description')}</span></p>
				<p>Live Site: <a target="_blank" href={this.props.repoModel.get('homepage')}>{liveUrl[1]}</a></p>
				<p>Source Code: <a target="_blank" href={this.props.repoModel.get('html_url')}> {sourceUrl[1]}</a></p>
			</div>
			)
	}
})

export default Dashboard