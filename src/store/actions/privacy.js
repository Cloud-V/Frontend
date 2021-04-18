import {
	ActionNames,
	URLs
} from '../../constants.js';
import createAPI from '../utils/createAPI';

export const getPrivacy = () => createAPI({
	method: 'get',
	type: ActionNames.PRIVACY,
	params: [`/${URLs.Privacy}`]
});