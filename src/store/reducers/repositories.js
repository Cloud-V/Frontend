import {
	ActionNames
} from '../../constants.js';
import {
	Map,
	List
} from 'immutable';

import {
	generateErrorActionTypeName,
	generateInProgressActionTypeName,
	generateSuccessActionTypeName
} from '../utils/createAPI';
import Status from '../utils/status';

import Repository from '../../models/repository';

const initialState = Map({
	data: List([]),
	status: '',
	error: '',
	pagination: Map({
		"count": 0,
		"pageSize": 0,
		"pageCount": 0
	}),
	statusCode: 0
});


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionNames.GET_USER_REPOSITORIES:
			return state
				.set('status', Status.None)
				.set('statusCode', 0)
				.set('error', '')
				.set('data', List([]))
				.set('pagination', Map({
					"count": 0,
					"pageSize": 0,
					"pageCount": 0
				}));
		case generateInProgressActionTypeName(ActionNames.GET_USER_REPOSITORIES):
			return state
				.set('status', Status.Loading)
				.set('error', '')
				.set('data', List([]))
				.set('pagination', Map({
					"count": 0,
					"pageSize": 0,
					"pageCount": 0
				}));
		case generateSuccessActionTypeName(ActionNames.GET_USER_REPOSITORIES):
			return state
				.set('status', Status.Success)
				.set('statusCode', action.status)
				.set('error', '')
				.set('data', Repository.parseList(action.result.repositories))
				.set('pagination', Map(action.result.pageInfo));
		case generateErrorActionTypeName(ActionNames.GET_USER_REPOSITORIES):
			return state
				.set('status', Status.Error)
				.set('statusCode', action.status)
				.set('error', action.error || 'Unknown error has occured')
				.set('data', List([]))
				.set('pagination', Map({
					"count": 0,
					"pageSize": 0,
					"pageCount": 0
				}));
		default:
			return state;
	}
}
export default reducer;