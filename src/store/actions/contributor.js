import {
	ActionNames,
	URLs
} from '../../constants.js';
import createAPI from '../utils/createAPI';
import Contributor from '../../models/contributor';


export const addRepositoryContributor = ({
	ownerName,
	repoName,
}, {
	username,
	accessLevel
}) => createAPI({
	method: 'post',
	type: ActionNames.ADD_REPOSITORY_CONTRIBUTOR,
	params: [`/${ownerName}/${repoName}/${URLs.Authorize}`, {
		username,
		accessLevel
	}]
});
export const removeRepositoryContributor = ({
	ownerName,
	repoName,
}, {
	username
}) => createAPI({
	method: 'post',
	type: ActionNames.REMOVE_REPOSITORY_CONTRIBUTOR,
	params: [`/${ownerName}/${repoName}/${URLs.Deauthorize}`, {
		username
	}]
});

export const setContributor = (contributor = {}) => {
	if (!(contributor instanceof Contributor)) {
		contributor = new Contributor(contributor);
	}
	return dispatch => {
		dispatch({
			type: ActionNames.SET_CONTRIBUTOR,
			contributor
		});
		return Promise.resolve();
	}
}