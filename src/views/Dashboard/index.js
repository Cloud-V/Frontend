import React, {
	Component
} from 'react';

import {
	Alert
} from 'reactstrap';


import Tabs, {
	TabPane
} from 'modules/rc-tabs';

import ScrollableInkTabBar from 'modules/rc-tabs/lib/ScrollableInkTabBar';
import TabContentLayout from './TabContentLayout';
import Repositories from 'partials/Repositories';
import SquareSpinner from 'partials/SquareSpinner';
import queryString from 'query-string';

import {
	getUserRepositories,
	getSharedRepositories,
	getWatchingRepositories,
} from 'store/actions/repositories';
import {
	createRepository,
	cloneRepository,
	setRepository,
	downloadRepository
} from 'store/actions/repository';
import {
	getProfile
} from 'store/actions/profile';
import {
	markDashboard
} from 'store/actions/user';

import {
	connect
} from "react-redux";

import Joyride from 'react-joyride';
import joyrideConfig from './joyride';
import {
	Page404
} from 'pages';


const mapStateToProps = state => {
	return {
		repositories: state.get('repositories'),
		shared: state.get('shared'),
		watching: state.get('watching'),
		repository: state.get('repository'),
		user: state.get('user'),
		profile: state.get('profile'),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		markDashboardDone: () => dispatch(markDashboard(true)),
		repositoriesGet: ({
			ownerName
		}, page = 0) => dispatch(getUserRepositories({
			ownerName
		}, page)),
		sharedGet: ({
			ownerName
		}, page = 0) => dispatch(getSharedRepositories({
			ownerName
		}, page)),
		watchingGet: ({
			ownerName
		}, page = 0) => dispatch(getWatchingRepositories({
			ownerName
		}, page)),
		profileGet: ({
			ownerName
		}) => dispatch(getProfile({
			ownerName
		})),
		createRepository: (repo) => dispatch(createRepository(repo)),
		setRepository: (repo) => dispatch(setRepository(repo)),
		cloneRepository: (repo, target) => dispatch(cloneRepository(repo, target)),
		downloadRepository: (repo) => dispatch(downloadRepository(repo))
	};
};


class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.onTabChange = this.onTabChange.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);
		this.refreshPage = this.refreshPage.bind(this);
		this.state = {
			repositoriesPage: 0,
			viewsPage: 0,
			sharedPage: 0,
			activeTab: 'repositories',
			...joyrideConfig
		};
		const paramsOwnerName = (props.match.params.ownerName || '').toLowerCase();
		const currentUserName = this.props.user.get('data').get('username');
		this.isMe = !paramsOwnerName || (currentUserName === paramsOwnerName);
		this.ownerName = this.isMe ? currentUserName : paramsOwnerName;
		this.tourHandler = this.tourHandler.bind(this);
	}
	handlePageClick(tab, selectedPage, offset) {
		const {
			ownerName
		} = this;
		this.setState({
			[`${tab}Page`]: selectedPage
		}, () => {
			this.props[`${tab}Get`]({
				ownerName
			}, selectedPage);
		});
	}

	refreshPage(tab, page) {
		const {
			ownerName
		} = this;
		if (!page) {
			const urlQuery = queryString.parse(this.props.location.search);
			page = Math.max((parseInt(urlQuery.p, 10) || 0) - 1, 0)
		}
		this.setState({
			[`${tab}Page`]: page
		}, () => {
			this.props[`${tab}Get`]({
				ownerName
			}, page);
		});
	}

	onTabChange(activeTab) {
		this.setState({
			activeTab
		});
	}
	async componentDidMount() {
		const {
			ownerName
		} = this;
		await Promise.all([
			this.props.profileGet({
				ownerName
			}),
			this.props.repositoriesGet({
				ownerName
			}, this.state.repositoriesPage),
			this.props.sharedGet({
				ownerName
			}, this.state.sharedPage),
			this.props.watchingGet({
				ownerName
			}, this.state.watchingPage)
		]);
		const {
			user
		} = this.props;
		if (this.isMe && user.get('data').get('dashboardTour') === false) {
			// this.setState({
			// 	run: true
			// });
		}
	}
	tourHandler(data) {
		const {
			action,
			index,
			lifecycle,
			status
		} = data;
		if (action === 'next' && index === 3 && lifecycle === 'complete') {
			this.setState({
				activeTab: 'repositories'
			});
		}
		if (action === 'close') {
			Promise.resolve(1).then(() => {
				this.setState({
					run: false
				});
			});
		}
		if (['close', 'skip', 'stop'].indexOf(action) !== -1 || (action === 'next' && index === 4 && status === 'finished')) {
			this.props.markDashboardDone();
		}
	}
	render() {
		const {
			profile
		} = this.props;
		if (this.props.repositories.get('statusCode') === 404) {
			return <Page404 />
		}
		if (profile.get('status') === 'action-loading' || profile.get('status') === '') {
			return <SquareSpinner />
		} else if (profile.get('status') === 'action-error') {
			return <Alert color="danger">{profile.get('error').toString()}</Alert>
		}
		const profileData = profile.get('data').toJS();
		const {
			steps,
			run,
		} = this.state;
		return (
			<div className="h-100">
			<Joyride
					steps={steps}
					run={run && (this.props.user.get('data').get('dashboardTour') === false)}
					callback={this.tourHandler}
					continuous={true}
					disableBeacon={true}
					disableCloseOnEsc={true}
					disableScrolling={true}
					showSkipButton={true}
					spotlightClicks={false}
					disableOverlayClose={true}
					locale={{last: 'Got It!'}}
					styles={{
						options: {
							primaryColor: '#287E96'
						}
					}}
				/>
				<Tabs
					prefixCls="dashboard-tabs"
					activeKey={this.state.activeTab}
					onChange={this.onTabChange}
					renderTabBar={()=><ScrollableInkTabBar />}
					renderTabContent={()=><TabContentLayout profile={profileData} isMe={this.isMe} />}>
					<TabPane className="h-100" tab="Repositories" key="repositories">
						<Repositories
								title="Repositories"
								hasCreateButton={this.isMe}
								repositories={this.props.repositories}
								enablePagination={true}
								handlePageClick={(page, offset) => this.handlePageClick('repositories', page, offset)}
								page={this.state.repositoriesPage}
								refreshPage={page => this.refreshPage('repositories', page)}
								onRepositorySubmit={repo => this.props.createRepository(repo.toJS())}
								onRepositoryClone={(repo, target) => this.props.cloneRepository(repo.toJS(), target.toJS())}
								setRepository={this.props.setRepository}
								onRepositoryDownload={this.props.downloadRepository}
								repository={this.props.repository}
								status={this.props.repository.get('status')}
								error={this.props.repository.get('error')}
								onOpenDialog={opened => opened? this.setState({run: false}): null}
								/>
					</TabPane>
					<TabPane className="h-100" tab="Shared" key="shared">
						<Repositories
								title="Shared"
								hasCreateButton={false}
								repository={this.props.repository}
								repositories={this.props.shared}
								enablePagination={true}
								handlePageClick={(page, offset) => this.handlePageClick('shared', page, offset)}
								page={this.state.sharedPage}
								refreshPage={page => this.refreshPage('shared', page)}
								onRepositoryClone={(repo, target) => this.props.cloneRepository(repo.toJS(), target.toJS())}
								setRepository={this.props.setRepository}
								onRepositoryDownload={this.props.downloadRepository}
								status={this.props.repository.get('status')}
								error={this.props.repository.get('error')}
								/>
					</TabPane>
					<TabPane className="h-100" tab="Watching" key="watching">
						<Repositories
								title="Watching"
								hasCreateButton={false}
								repository={this.props.repository}
								repositories={this.props.watching}
								enablePagination={true}
								handlePageClick={(page, offset) => this.handlePageClick('watching', page, offset)}
								page={this.state.watchingPage}
								refreshPage={page => this.refreshPage('watching', page)}
								onRepositoryClone={(repo, target) => this.props.cloneRepository(repo.toJS(), target.toJS())}
								setRepository={this.props.setRepository}
								onRepositoryDownload={this.props.downloadRepository}
								status={this.props.repository.get('status')}
								error={this.props.repository.get('error')}
								/>
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);