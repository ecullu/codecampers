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
					<h6>What is your opinion about instructor/student ratio. Were you able to find someone right away when you had questions ? </h6>
					<p>{this.props.userModel.get('review').ratio}</p>
				 </div>
				)
			break;
			case '2':
			reviewContainer.push(
				<div key="r2">
					<h6>Boot camp is a big investment, where do you think the money goes in TIY? Instructor assistance, lecture, environment, networking opportunities?</h6>
					<p>{this.props.userModel.get('review').investment}</p>
				</div>
				)
			break;
			case '3':
			reviewContainer.push(
				<div key="r3">
					<h6>What were the advantages of TIY compare to online courses ?</h6>
					<p>{this.props.userModel.get('review').advantages}</p>
				</div>
				)
			break;
			case '4':
			reviewContainer.push(
				<div key="r4">
					<h6>How did you like the instructor?</h6>
				    <p>{this.props.userModel.get('review').instructor}</p>
				</div>
				)
		}
		return reviewContainer
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
	},

	handleRepoPagination: function(event){
		let showingPage = event.currentTarget.dataset.id
		// console.log('page', showingPage)
		// console.log('handingling page navigation')
			let repoIndex = (showingPage-1)*4
			console.log('page', showingPage)
			console.log('repo index',repoIndex)
			this.setState({
				showingRepoIndex: repoIndex
			})
	},

	handleReviewPagination: function(event){
		console.log('changing review state')
		this.setState({
			showingReview: event.currentTarget.dataset.id
		})
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
		let repoIndex = this.state.showingRepoIndex
		// console.log('button arr length', this.getPaginationButtons().length)
		console.log('showingRepoIndex',repoIndex)
		let ghClass = 'github',
			reviewClass = 'review-container hidden',
			ghTabClass = 'active-tab github-tab ',
			reviewTabClass = 'review-tab',
			prevButtonClass = '',
			nextButtonClass = ''

		// limit functionality of arrow buttons based on current page
		if(repoIndex < 4){
			// console.log('disabling prev button!!!!!!!!!!!!')
			prevButtonClass = "disabled"
		}
		if(repoIndex >= (this.getPaginationButtons().length * 4) - 4){
			nextButtonClass = "disabled"
		}

		if (this.state.activeTab === 'reviews') {
			console.log('checking active tab')
			reviewClass = 'review-container'
			ghClass = 'hidden github'
			ghTabClass = 'github-tab'
			reviewTabClass = 'active-tab review-tab '
		}

		// console.log('fetch repo',this.state.userRepos)
		return (
				<div className="col-md-6 user-container">
					<div className="row user-info">
						<div className="col-md-4 photo">
							<img src={this.props.userModel.get('pictureUrls').values[0]}/>
						</div>
						<div className="col-md-8 user-details">
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
							<div className={ghTabClass} onClick={this.showGithub}>
								 GitHub 
							</div>
							<div className={reviewTabClass} onClick={this.showReviews}>
								 Bootcamp Review 
							</div>							
						</div>
						<div className={ghClass}>
							<div className="row repo-coll">
								{this.getRepoColl(repoIndex)}
								{/*{this.state.userRepos.map((repo) => <Repo key={repo.cid} repoModel={repo} />)}*/}
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
									 <li data-id={parseInt(this.state.showingReview) - 1} onClick={this.handleReviewPagination}>
								       <a aria-label="Previous">
								         <span aria-hidden="true">&lt;</span>
								       </a>
								    </li>
									    <li data-id="1" onClick={this.handleReviewPagination}><a>1</a></li>
									    <li data-id="2" onClick={this.handleReviewPagination}><a>2</a></li>
									    <li data-id="3" onClick={this.handleReviewPagination}><a>3</a></li>
									    <li data-id="4" onClick={this.handleReviewPagination}><a>4</a></li>
									    <li data-id="5" onClick={this.handleReviewPagination}><a>5</a></li>
									    <li data-id="6" onClick={this.handleReviewPagination}><a>6</a></li>
									<li data-id={parseInt(this.state.showingReview) + 1} onClick={this.handleReviewPagination}>
								      <a aria-label="Next">
								        <span aria-hidden="true">&gt;</span>
								      </a>
									</li>
								</ul>
							</nav>					
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
			sourceUrl = this.props.repoModel.get('html_url').split('//')
		}
		
		return (
			<div className="col-md-6 repo-container">
				<div className="repo-name">{this.props.repoModel.get('name')}</div>
				<p>Description: {this.props.repoModel.get('description')}</p>
				<p>Live Site: <a target="_blank" href={this.props.repoModel.get('homepage')}>{liveUrl[1]}</a></p>
				<p>Source Code: <a target="_blank" href={this.props.repoModel.get('html_url')}> {sourceUrl[1]}</a></p>
			</div>
			)
	}
})

export default Dashboard