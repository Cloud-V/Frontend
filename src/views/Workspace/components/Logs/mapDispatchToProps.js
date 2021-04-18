import { setLogTab, setLogs } from "store/actions/workspace";

export default dispatch => ({
	setLogTab: ({ id }) => dispatch(setLogTab({ id })),
	setLogs: ({ console, warnings, errors } = {}) =>
		dispatch(
			setLogs({
				console,
				warnings,
				errors
			})
		)
});
