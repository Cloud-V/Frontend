import {
	ActionNames
} from '../../constants.js';
import {
	Map
} from 'immutable';
import createAPIReducer from '../utils/createAPIReducer';
import {
	generateErrorActionTypeName,
	generateInProgressActionTypeName,
	generateSuccessActionTypeName
} from '../utils/createAPI';
const initialState = Map({
	data: false,
	status: '',
	error: '',
	statusCode: 0
});


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionNames.CONTACT_US:
		case generateSuccessActionTypeName(ActionNames.CONTACT_US):
		case generateErrorActionTypeName(ActionNames.CONTACT_US):
		case generateInProgressActionTypeName(ActionNames.CONTACT_US):
			return createAPIReducer(state, action, {
				actionName: ActionNames.CONTACT_US,
				parser: (data) => data.success,
				defaultData: false,
				isAction: true
			});
		case ActionNames.INIT_CONTACT_US:
			return state.set('data', false)
				.set('status', '')
				.set('error', '')
				.set('statusCode', 0);
		default:
			return state;
	}

}
export default reducer;