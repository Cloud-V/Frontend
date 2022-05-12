import { ActionNames } from "../../constants.js";
import { Map } from "immutable";

import Version from "../../models/version";
import createAPIReducer from "../utils/createAPIReducer";
import {
    generateErrorActionTypeName,
    generateInProgressActionTypeName,
    generateSuccessActionTypeName,
} from "../utils/createAPI";
import Status from "../utils/status";

const initialState = Map({
    data: new Version({}),
    status: "",
    error: "",
    statusCode: 0,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionNames.SET_VERSION:
            return state
                .set("data", action.version)
                .set("status", Status.None)
                .set("error", "")
                .set("statusCode", 0);
        case ActionNames.ADD_REPOSITORY_VERSION:
        case generateErrorActionTypeName(ActionNames.ADD_REPOSITORY_VERSION):
        case generateInProgressActionTypeName(
            ActionNames.ADD_REPOSITORY_VERSION
        ):
        case generateSuccessActionTypeName(ActionNames.ADD_REPOSITORY_VERSION):
            return createAPIReducer(state, action, {
                actionName: ActionNames.ADD_REPOSITORY_VERSION,
                parser: (data) => Version.parse(data),
                defaultData: new Version({}),
            });
        case ActionNames.REMOVE_REPOSITORY_VERSION:
        case generateErrorActionTypeName(ActionNames.REMOVE_REPOSITORY_VERSION):
        case generateInProgressActionTypeName(
            ActionNames.REMOVE_REPOSITORY_VERSION
        ):
        case generateSuccessActionTypeName(
            ActionNames.REMOVE_REPOSITORY_VERSION
        ):
            return createAPIReducer(state, action, {
                actionName: ActionNames.REMOVE_REPOSITORY_VERSION,
                parser: (data) => Version.parse(data),
                defaultData: new Version({}),
            });
        default:
            return state;
    }
};
export default reducer;
