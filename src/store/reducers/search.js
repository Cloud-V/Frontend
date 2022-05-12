import { ActionNames } from "../../constants.js";
import { Map, List } from "immutable";

import Repository from "../../models/repository";
import User from "../../models/user";
import createAPIReducer from "../utils/createAPIReducer";
import {
    generateErrorActionTypeName,
    generateInProgressActionTypeName,
    generateSuccessActionTypeName,
} from "../utils/createAPI";
import Status from "../utils/status";

const initialState = Map({
    data: Map({
        repositories: Map({
            data: List([]),
            pagination: Map({
                count: 0,
                pageSize: 0,
                pageCount: 0,
            }),
        }),
        users: Map({
            data: List([]),
            pagination: Map({
                count: 0,
                pageSize: 0,
                pageCount: 0,
            }),
        }),
    }),
    query: "",
    status: "",
    error: "",
    statusCode: 0,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionNames.SET_QUERY:
            return state
                .set("query", action.query)
                .set("data", initialState.get("data"))
                .set("status", Status.None)
                .set("error", "")
                .set("statusCode", 0);
        case ActionNames.SEARCH:
        case generateErrorActionTypeName(ActionNames.SEARCH):
        case generateInProgressActionTypeName(ActionNames.SEARCH):
        case generateSuccessActionTypeName(ActionNames.SEARCH):
            return createAPIReducer(state, action, {
                actionName: ActionNames.SEARCH,
                parser: (data) =>
                    Map({
                        repositories: Map({
                            data: Repository.parseList(
                                data.repositories.repositories
                            ),
                            pagination: Map(data.repositories.pageInfo),
                        }),
                        users: Map({
                            data: User.parseList(data.users.users),
                            pagination: Map(data.users.pageInfo),
                        }),
                    }),
                defaultData: initialState.get("data"),
            });
        default:
            return state;
    }
};
export default reducer;
