import {
	ActionNames
} from '../../constants.js';
import {
	Map,
	List
} from 'immutable';

import createAPIReducer from '../utils/createAPIReducer';


const initialState = Map({
	data: Map({
		hardware: List([]),
		web: List([]),
	}),
	status: '',
	error: '',
	statusCode: 0
});


const reducer = (state = initialState, action) => {
	return createAPIReducer(state, action, {
		actionName: ActionNames.TOOLS,
		parser: (data) => Map({
			hardware: List(data.hardware),
			web: List(data.web),
		}),
		defaultData: initialState.get('data')
	});
}
export default reducer;