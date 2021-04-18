import {
	ActionNames,
	URLs
} from '../../constants.js';
import createAPI, {
	createDownloadAPI
} from '../utils/createAPI';
import Version from '../../models/version';


export const addRepositoryVersion = ({
	ownerName,
	repoName,
}, version) => createAPI({
	method: 'post',
	type: ActionNames.ADD_REPOSITORY_VERSION,
	params: [`/${ownerName}/${repoName}/${URLs.NewVersion}`, version]
});
export const removeRepositoryVersion = ({
	ownerName,
	repoName,
}, {
	_id
}) => createAPI({
	method: 'post',
	type: ActionNames.REMOVE_REPOSITORY_VERSION,
	params: [`/${ownerName}/${repoName}/${URLs.DeleteVersion}/${_id}`]
});

export const setVersion = (version = {}) => {
	if (!(version instanceof Version)) {
		version = new Version(version);
	}
	return dispatch => {
		dispatch({
			type: ActionNames.SET_VERSION,
			version
		});
		return Promise.resolve();
	}
}

export const downloadVersion = ({
	ownerName,
	repoName,
}, {
	_id
}) => createDownloadAPI({
	type: ActionNames.DOWNLOAD_VERSION,
	params: [`/${ownerName}/${repoName}/versions/download/${_id}`]
});