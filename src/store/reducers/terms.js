import {
	ActionNames
} from '../../constants.js';
import {
	Map
} from 'immutable';

import createAPIReducer from '../utils/createAPIReducer';


const initialState = Map({
	data: Map({
		terms: ''
	}),
	status: '',
	error: '',
	statusCode: 0
});


const reducer = (state = initialState, action) => {
	return createAPIReducer(state, action, {
		actionName: ActionNames.TERMS,
		parser: (data) => Map({
			terms: data.terms
		}),
		defaultData: initialState.get('data')
	});
}
export default reducer;