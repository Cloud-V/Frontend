import {
	ActionNames,
	URLs
} from '../../constants.js';
import createAPI from '../utils/createAPI';

export const contactUs = ({
	name,
	email,
	type,
	subject,
	content
}) => createAPI({
	method: 'post',
	type: ActionNames.CONTACT_US,
	params: [URLs.Contact, {
		name,
		email,
		type,
		subject,
		content
	}]
});

export const initContactUs = () => {
	return dispatch => {
		dispatch({
			type: ActionNames.INIT_CONTACT_US,
		});
		return Promise.resolve();
	}
}