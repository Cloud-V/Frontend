import { ActionNames } from "../../constants.js";
import { Map } from "immutable";

import createAPIReducer from "../utils/createAPIReducer";

const initialState = Map({
    data: Map({
        privacy: "",
    }),
    status: "",
    error: "",
    statusCode: 0,
});

const reducer = (state = initialState, action) => {
    return createAPIReducer(state, action, {
        actionName: ActionNames.PRIVACY,
        parser: (data) =>
            Map({
                privacy: data.privacy,
            }),
        defaultData: initialState.get("data"),
    });
};
export default reducer;
