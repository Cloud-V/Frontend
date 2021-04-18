import {
	ActionNames,
	URLs
} from '../../constants.js';
import createAPI from '../utils/createAPI';
export const getStats = () => createAPI({
	method: 'get',
	type: ActionNames.ADMIN_STATS,
	params: [`${URLs.Admin}`]
});