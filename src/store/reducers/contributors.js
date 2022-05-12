import { ActionNames } from "../../constants.js";
import { Map, List } from "immutable";

import Contributor from "../../models/contributor";
import createAPIReducer from "../utils/createAPIReducer";

const initialState = Map({
    data: List([]),
    status: "",
    error: "",
    statusCode: 0,
});

const reducer = (state = initialState, action) => {
    return createAPIReducer(state, action, {
        actionName: ActionNames.GET_REPOSITORY_CONTRIBUTORS,
        parser: (data) => Contributor.parseList(data),
        defaultData: List([]),
    });
};
export default reducer;
