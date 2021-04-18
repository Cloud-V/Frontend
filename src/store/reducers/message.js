import {
	ActionNames
} from '../../constants.js';
import {
	Map,
} from 'immutable';

const initialState = Map({
	id: '',
	data: JSON.stringify({}),
	synced: false,
	type: '',
	status: '',
	error: '',
	statusCode: 0
});


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionNames.MESSAGE:
			return state
				.set('type', action.messageType)
				.set('id', action.messageId)
				.set('status', 'sent')
				.set('data', typeof action.messageContent === 'object' ?
					JSON.stringify(action.messageContent) :
					action.messageContent)
		case ActionNames.MESSAGE_STATUS:
			return state
				.set('status', action.messageStatus)
		case ActionNames.MESSAGE_SYNCED:
			return state
				.set('synced', action.messageSynced)
		default:
			return state;
	}
}
export default reducer;