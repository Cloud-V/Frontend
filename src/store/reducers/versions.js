import { ActionNames } from "../../constants.js";
import { Map, List } from "immutable";

import Version from "../../models/version";
import createAPIReducer from "../utils/createAPIReducer";

const initialState = Map({
    data: List([]),
    status: "",
    error: "",
    statusCode: 0,
});

const reducer = (state = initialState, action) => {
    return createAPIReducer(state, action, {
        actionName: ActionNames.GET_REPOSITORY_VERSIONS,
        parser: (data) => Version.parseList(data),
        defaultData: List([]),
    });
};
export default reducer;
