import {
	ActionNames
} from '../../constants.js';
import {
	Map
} from 'immutable';
import {
	generateErrorActionTypeName,
	generateInProgressActionTypeName,
	generateSuccessActionTypeName
} from '../utils/createAPI';
import User from '../../models/user';
import createAPIReducer from '../utils/createAPIReducer';

const initialState = Map({
	data: new User({}),
	status: '',
	error: '',
	statusCode: 0
});


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionNames.GET_PROFILE:
		case generateSuccessActionTypeName(ActionNames.GET_PROFILE):
		case generateErrorActionTypeName(ActionNames.GET_PROFILE):
		case generateInProgressActionTypeName(ActionNames.GET_PROFILE):
			return createAPIReducer(state, action, {
				actionName: ActionNames.GET_PROFILE,
				parser: (data) => User.parse(data),
				defaultData: new User({}),
				isAction: true
			});
		default:
			return state;

	}
}
export default reducer;