import {
	ActionNames,
} from '../../constants.js';
import generateId from '../utils/generateId';

export const setMessage = ({
	messageId = generateId(),
	messageType,
	messageContent
}) => {
	return dispatch => {
		dispatch({
			type: ActionNames.MESSAGE,
			messageId,
			messageType,
			messageContent
		});
		return Promise.resolve();
	}
}
export const setStatus = ({
	messageStatus,
}) => {
	return dispatch => {
		dispatch({
			type: ActionNames.MESSAGE_STATUS,
			messageStatus
		});
		return Promise.resolve();
	}
}
export const setSynced = ({
	messageSynced,
}) => {
	return dispatch => {
		dispatch({
			type: ActionNames.MESSAGE_SYNCED,
			messageSynced
		});
		return Promise.resolve();
	}
}