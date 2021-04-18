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
		content: '',
		team: List([])
	}),
	status: '',
	error: '',
	statusCode: 0
});


const reducer = (state = initialState, action) => {
	return createAPIReducer(state, action, {
		actionName: ActionNames.ABOUT,
		parser: (data) => Map({
			content: data.content,
			team: List(data.team)
		}),
		defaultData: initialState.get('data')
	});
}
export default reducer;