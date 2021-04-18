import {
	ActionNames,
	URLs
} from '../../constants.js';
import createAPI from '../utils/createAPI';

export const getUserRepositories = ({
	ownerName
}, page = 0) => createAPI({
	method: 'get',
	type: ActionNames.GET_USER_REPOSITORIES,
	params: [`${URLs.Repositories}/${ownerName}?page=${page}`],
});

export const getSharedRepositories = ({
	ownerName
}, page = 0) => createAPI({
	method: 'get',
	type: ActionNames.GET_SHARED_REPOSITORIES,
	params: [`${URLs.Shared}/${ownerName}?page=${page}`],
});

export const getWatchingRepositories = ({
	ownerName
}, page = 0) => createAPI({
	method: 'get',
	type: ActionNames.GET_WATCHING_REPOSITORIES,
	params: [`${URLs.Watching}/${ownerName}?page=${page}`],
});