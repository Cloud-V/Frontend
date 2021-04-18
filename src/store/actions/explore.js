import {
	ActionNames,
	URLs
} from '../../constants.js';
import createAPI from '../utils/createAPI';

export const explore = ({
	featured,
	popular,
	latest
}) => createAPI({
	method: 'get',
	type: ActionNames.EXPLORE,
	params: [`/${URLs.Explore}?fp=${featured}&pp=${popular}&lp=${latest}`]
});