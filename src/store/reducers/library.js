import { ActionNames } from '../../constants.js';
import { Map, List } from "immutable";
import {
	generateErrorActionTypeName,
	generateInProgressActionTypeName,
	generateSuccessActionTypeName
} from "../utils/createAPI";
import Status from "../utils/status";

const initialState = Map({
	data: Map({
		stdcells: List([]),
		boards: List([])
	}),
	status: "",
	error: "",
	statusCode: 0
});

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionNames.GET_STDCELLS:
			return state;
		case generateInProgressActionTypeName(ActionNames.GET_STDCELLS):
			return state.set("status", Status.ActionLoading).set("error", "");
		case generateSuccessActionTypeName(ActionNames.GET_STDCELLS):
			return state
				.set("status", Status.Success)
				.set("statusCode", action.status)
				.set("error", "")
				.setIn(["data", "stdcells"], List(action.result.stdcell));
		case generateErrorActionTypeName(ActionNames.GET_STDCELLS):
			return state
				.set("status", Status.Error)
				.set("statusCode", action.status)
				.set("error", action.error || "Unknown error has occured");
		case generateInProgressActionTypeName(ActionNames.GET_BOARDS):
			return state.set("status", Status.ActionLoading).set("error", "");
		case generateSuccessActionTypeName(ActionNames.GET_BOARDS):
			return state
				.set("status", Status.Success)
				.set("statusCode", action.status)
				.set("error", "")
				.setIn(["data", "boards"], List(action.result.boards));
		case generateErrorActionTypeName(ActionNames.GET_BOARDS):
			return state
				.set("status", Status.Error)
				.set("statusCode", action.status)
				.set("error", action.error || "Unknown error has occured");
		default:
			return state;
	}
};
export default reducer;
