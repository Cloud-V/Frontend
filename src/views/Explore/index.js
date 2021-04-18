import React, {
	Component
} from 'react';

import {
	Alert,
	Button,
	Col,
	Container,
	Row,
	TabContent,
	TabPane,
} from 'reactstrap';
import _ from 'lodash';

import Repository from './Repository';

import {
	connect
} from "react-redux";

import {
	explore as exploreRepositories
} from 'store/actions/explore';

import SquareSpinner from 'partials/SquareSpinner';
import Pagination from 'partials/Pagination';
import Navbar from 'partials/Navbar';
import Footer from 'partials/Footer';

import {
	Pagination as PaginationData
} from '../../constants.js';

import classnames from 'classnames';


const mapStateToProps = state => {
	return {
		explore: state.get('explore')
	};
};

const mapDispatchToProps = dispatch => {
	return {
		exploreRepositories: ({
			featured,
			popular,
			latest
		}) => dispatch(exploreRepositories({
			featured,
			popular,
			latest
		}))
	}
};



class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 'featured',
			featuredPage: 0,
			popularPage: 0,
			latestPage: 0,
		}
		this.location = props.location;
		this.handlePageClick = this.handlePageClick.bind(this);
		this.fetchResults = this.fetchResults.bind(this);
	}
	fetchResults() {
		const featured = this.state.featuredPage;
		const popular = this.state.popularPage;
		const latest = this.state.latestPage;
		this.props.exploreRepositories({
			featured,
			popular,
			latest
		});
	}
	async componentDidMount() {
		this.fetchResults();
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}
	handlePageClick(tab, selectedPage, offset) {
		this.setState({
			[`${tab}Page`]: selectedPage
		}, () => {
			this.fetchResults();
		})
	}

	handleUsersPageClick(selectedPage, offset) {
		this.setState({
			usersPage: selectedPage
		}, () => {
			this.fetchResults();
		})
	}

	render() {
		const {
			explore
		} = this.props;

		if (explore.get('status') === 'loading' || (explore.get('status') === '')) {
			return (<div className="app">
				<Navbar location={this.location}/>
				<div className="h-100 d-flex flex-1 justify-content-center align-items-center">
					<SquareSpinner />
				</div>
				<Footer />
			</div>);
		} else if (explore.get('status') === 'error') {
			return (<div className="app">
					<Navbar location={this.location}/>
					<div className="flex-1 w-100 d-flex">
						<Alert className="h-10 flex-1" color="danger">{explore.get('error')}</Alert>
					</div>
					<Footer />
				</div>);
		}

		const featuredWrapper = explore.get('data').get('featured');
		const featured = featuredWrapper.get('data');
		const featuredCount = featuredWrapper.get('pagination').get('count') || 0;
		const popularWrapper = explore.get('data').get('popular');
		const popular = popularWrapper.get('data');
		const popularCount = popularWrapper.get('pagination').get('count') || 0;
		const latestWrapper = explore.get('data').get('latest');
		const latest = latestWrapper.get('data');
		const latestCount = latestWrapper.get('pagination').get('count') || 0;

		return (
			<div className="app">
				<Navbar location={this.location}/>
				<Container className="search-explore flex-1 w-100 h-100 pl-0 pr-0" fluid>
					<Row className="mr-0">
						<Col xl="2" lg="3" className="search-explore-tabs pt-2 pl-4 pr-1">
							<Row className="search-explore-tab">
								<Button
									className={classnames({
										active: this.state.activeTab === 'featured'
									})}
									onClick={() => this.toggle('featured')}>
										Featured
									<div className="search-explore-tab-count">
										{featuredCount}
									</div>
								</Button>
							</Row>
							<Row className="search-explore-tab">
								<Button
									className={classnames({
										active: this.state.activeTab === 'popular'
									})}
									onClick={() => this.toggle('popular')}>
										Popular
									<span className="search-explore-tab-count">
										{popularCount}
									</span>
								</Button>
							</Row>
							<Row className="search-explore-tab">
								<Button
									className={classnames({
										active: this.state.activeTab === 'latest'
									})}
									onClick={() => this.toggle('latest')}>
										Latest
									<span className="search-explore-tab-count">
										{latestCount}
									</span>
								</Button>
							</Row>
						</Col>
						<Col xl="10" lg="9" className="pr-0">
							<TabContent activeTab={this.state.activeTab} className="search-explore-tab-content">
								<TabPane tabId="featured" className="search-explore-tab-pane">
									<Row className="mr-0">
										{_.chunk(featured.toArray(), 3).map((repos, index) => (<React.Fragment key={index}>
											{repos.map(repo => <Repository key={repo.get_id()} repository={repo}/>)}
										</React.Fragment>))}
										<div className="w-100 d-flex justify-content-center mr-md-6 mr-sm-0">
											<Pagination
													className=""
													size={Math.ceil(featuredCount / PaginationData.ReposPerPage)}
													handlePageClick={this.handlePageClick.bind(this, 'featured')}
													page={this.state.featuredPage}
													pageLink={`explore`} />
										</div>
									</Row>
								</TabPane>
								<TabPane tabId="popular">
									<Row className="mr-0">
										{_.chunk(popular.toArray(), 3).map((repos, index) => (<React.Fragment key={index}>
											{repos.map(repo => <Repository key={repo.get_id()} repository={repo}/>)}
										</React.Fragment>))}
										<div className="w-100 d-flex justify-content-center mr-md-6 mr-sm-0">
											<Pagination
													className=""
													size={Math.ceil(popularCount / PaginationData.ReposPerPage)}
													handlePageClick={this.handlePageClick.bind(this, 'popular')}
													page={this.state.popularPage}
													pageLink={`explore`} />
										</div>
									</Row>
								</TabPane>
								<TabPane tabId="latest">
									<Row className="mr-0">
										{_.chunk(latest.toArray(), 3).map((repos, index) => (<React.Fragment key={index}>
											{repos.map(repo => <Repository key={repo.get_id()} repository={repo}/>)}
										</React.Fragment>))}
										<div className="w-100 d-flex justify-content-center mr-md-6 mr-sm-0">
											<Pagination
													className=""
													size={Math.ceil(latestCount / PaginationData.ReposPerPage)}
													handlePageClick={this.handlePageClick.bind(this, 'latest')}
													page={this.state.latestPage}
													pageLink={`explore`} />
										</div>
									</Row>
								</TabPane>
							</TabContent>
						</Col>
					</Row>
				</Container>
				<Footer />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);