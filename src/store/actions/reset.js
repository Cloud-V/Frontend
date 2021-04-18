import {
	ActionNames,
	URLs
} from '../../constants.js';
import createAPI from '../utils/createAPI';

export const forgotPassword = ({
	username
}) => createAPI({
	method: 'post',
	type: ActionNames.FORGOT_PASSWORD,
	params: [URLs.Forgot, {
		username
	}]
});

export const initForgotPassword = () => {
	return dispatch => {
		dispatch({
			type: ActionNames.INIT_FORGOT_PASSWORD,
		});
		return Promise.resolve();
	}
}