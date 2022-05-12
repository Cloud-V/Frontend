import { ActionNames } from "../../constants.js";
import { Map } from "immutable";

import Contributor from "../../models/contributor";
import createAPIReducer from "../utils/createAPIReducer";
import {
    generateErrorActionTypeName,
    generateInProgressActionTypeName,
    generateSuccessActionTypeName,
} from "../utils/createAPI";
import Status from "../utils/status";

const initialState = Map({
    data: new Contributor({}),
    status: "",
    error: "",
    statusCode: 0,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionNames.SET_CONTRIBUTOR:
            return state
                .set("data", action.contributor)
                .set("status", Status.None)
                .set("error", "")
                .set("statusCode", 0);
        case ActionNames.ADD_REPOSITORY_CONTRIBUTOR:
        case generateErrorActionTypeName(
            ActionNames.ADD_REPOSITORY_CONTRIBUTOR
        ):
        case generateInProgressActionTypeName(
            ActionNames.ADD_REPOSITORY_CONTRIBUTOR
        ):
        case generateSuccessActionTypeName(
            ActionNames.ADD_REPOSITORY_CONTRIBUTOR
        ):
            return createAPIReducer(state, action, {
                actionName: ActionNames.ADD_REPOSITORY_CONTRIBUTOR,
                parser: ({ user, role, level }) =>
                    Contributor.parse({
                        _id: role._id,
                        accessLevel: role.accessLevel,
                        createdAt: role.createdAt,
                        updatedAt: role.updatedAt,
                        user: user,
                        role: level,
                    }),
                defaultData: new Contributor({}),
            });
        case ActionNames.REMOVE_REPOSITORY_CONTRIBUTOR:
        case generateErrorActionTypeName(
            ActionNames.REMOVE_REPOSITORY_CONTRIBUTOR
        ):
        case generateInProgressActionTypeName(
            ActionNames.REMOVE_REPOSITORY_CONTRIBUTOR
        ):
        case generateSuccessActionTypeName(
            ActionNames.REMOVE_REPOSITORY_CONTRIBUTOR
        ):
            return createAPIReducer(state, action, {
                actionName: ActionNames.REMOVE_REPOSITORY_CONTRIBUTOR,
                parser: (data) => new Contributor({}),
                defaultData: new Contributor({}),
            });
        default:
            return state;
    }
};
export default reducer;
