import { ActionNames } from '../../constants.js';
import { Map, List } from "immutable";

// import Status from "../utils/status";

const initialState = Map({
	data: Map({
		logs: Map({
			console: List([
				// {
				// 	message:
				// 		"abc.v:8: Module abc was already declared here: src/abc.v:6",
				// 	file: "5c1f7ba80813885fce373be5",
				// 	line: 8,
				// 	fileName: "abc.v"
				// }
			]),
			warnings: List([]),
			errors: List([])
		}),
		activeLogTab: "console"
	}),
	status: "",
	error: "",
	statusCode: 0
});

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionNames.WORKSPACE_SET_LOGS: {
			return state.set(
				"data",
				state.get("data").set("logs", Map(action.logs))
			);
		}
		case ActionNames.WORKSPACE_ADD_LOGS: {
			const logs = state.get("data").get("logs");
			return state.set(
				"data",
				state.get("data").set(
					"logs",
					logs
						.set(
							"console",
							logs.get("console").push(...action.logs.console)
						)
						.set(
							"warnings",
							logs.get("warnings").push(...action.logs.warnings)
						)
						.set(
							"errors",
							logs.get("errors").push(...action.logs.errors)
						)
				)
			);
		}
		case ActionNames.WORKSPACE_SET_LOG_TAB: {
			return state.set(
				"data",
				state.get("data").set("activeLogTab", action.id)
			);
		}
		default:
			return state;
	}
};
export default reducer;
