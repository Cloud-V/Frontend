import { ActionNames } from "../../constants.js";
import { Map } from "immutable";

import createAPIReducer from "../utils/createAPIReducer";

const initialState = Map({
    data: Map({
        heartbeat: true,
    }),
    status: "",
    error: "",
    statusCode: 0,
});

const reducer = (state = initialState, action) => {
    return createAPIReducer(state, action, {
        actionName: ActionNames.HEARTBEAT,
        parser: (data) =>
            Map({
                heartbeat: data.heartbeat,
            }),
        defaultData: initialState.get("data"),
    });
};
export default reducer;
