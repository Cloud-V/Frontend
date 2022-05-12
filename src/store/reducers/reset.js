import { ActionNames } from "../../constants.js";
import { Map } from "immutable";
import createAPIReducer from "../utils/createAPIReducer";
import {
    generateErrorActionTypeName,
    generateInProgressActionTypeName,
    generateSuccessActionTypeName,
} from "../utils/createAPI";
const initialState = Map({
    data: false,
    status: "",
    error: "",
    statusCode: 0,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionNames.FORGOT_PASSWORD:
        case generateSuccessActionTypeName(ActionNames.FORGOT_PASSWORD):
        case generateErrorActionTypeName(ActionNames.FORGOT_PASSWORD):
        case generateInProgressActionTypeName(ActionNames.FORGOT_PASSWORD):
            return createAPIReducer(state, action, {
                actionName: ActionNames.FORGOT_PASSWORD,
                parser: (data) => data.success,
                defaultData: false,
                isAction: true,
            });
        case ActionNames.INIT_FORGOT_PASSWORD:
            return state
                .set("data", false)
                .set("status", "")
                .set("error", "")
                .set("statusCode", 0);
        default:
            return state;
    }
};
export default reducer;
