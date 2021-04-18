import React from 'react';
import Loadable from 'react-loadable'
import SquareSpinner from './partials/SquareSpinner'

function Loading() {
	return <SquareSpinner />;
}

const LandingPage = Loadable({
	loader: () =>
		import ('./views/LandingPage/LandingPage'),
	loading: Loading,
});

const Dashboard = Loadable({
	loader: () =>
		import ('./views/Dashboard/Dashboard'),
	loading: Loading,
});

const Repository = Loadable({
	loader: () =>
		import ('./views/Repository/Repository'),
	loading: Loading,
});

const ComingSoon = Loadable({
	loader: () =>
		import ('./views/ComingSoon/ComingSoon'),
	loading: Loading,
});


const routes = [{
		path: '/home',
		name: 'Landing Page',
		component: LandingPage,
		exact: true
	},
	{
		path: '/',
		name: 'Landing Page',
		component: LandingPage,
		exact: true
	},
	{
		path: '/blog',
		name: 'Blog',
		component: ComingSoon,
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Dashboard,
		requireLogin: true,
		exact: true
	},
	{
		path: '/:ownerName/:repoName/publish',
		name: 'Repository',
		component: ComingSoon,
		requireLogin: true,
		exact: true
	},
	{
		path: '/:ownerName/:repoName',
		name: 'Repository',
		component: Repository,
		requireLogin: true,
		exact: true
	}
];

export default routes;