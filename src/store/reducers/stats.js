import {
	ActionNames
} from '../../constants.js';
import {
	Map
} from 'immutable';

import createAPIReducer from '../utils/createAPIReducer';


const initialState = Map({
	data: Map({
		users: 0,
		repositories: 0,
		repoEntries: 0,
		verilogEntries: 0,
		netlistEntries: 0,
		testbenchEntries: 0,
		simulationEntries: 0
	}),
	status: '',
	error: '',
	statusCode: 0
});


const reducer = (state = initialState, action) => {
	return createAPIReducer(state, action, {
		actionName: ActionNames.ADMIN_STATS,
		parser: (data) => Map(data),
		defaultData: initialState.get('data')
	});
}
export default reducer;