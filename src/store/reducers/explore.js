import { ActionNames } from "../../constants.js";
import { Map, List } from "immutable";

import Repository from "../../models/repository";
import createAPIReducer from "../utils/createAPIReducer";

const initialState = Map({
    data: Map({
        featured: Map({
            data: List([]),
            pagination: Map({
                count: 0,
                pageSize: 0,
                pageCount: 0,
            }),
        }),
        popular: Map({
            data: List([]),
            pagination: Map({
                count: 0,
                pageSize: 0,
                pageCount: 0,
            }),
        }),
        latest: Map({
            data: List([]),
            pagination: Map({
                count: 0,
                pageSize: 0,
                pageCount: 0,
            }),
        }),
    }),
    status: "",
    error: "",
    statusCode: 0,
});

const reducer = (state = initialState, action) => {
    return createAPIReducer(state, action, {
        actionName: ActionNames.EXPLORE,
        parser: (data) =>
            Map({
                featured: Map({
                    data: Repository.parseList(data.featured.repositories),
                    pagination: Map(data.featured.pageInfo),
                }),
                popular: Map({
                    data: Repository.parseList(data.popular.repositories),
                    pagination: Map(data.popular.pageInfo),
                }),
                latest: Map({
                    data: Repository.parseList(data.latest.repositories),
                    pagination: Map(data.latest.pageInfo),
                }),
            }),
        defaultData: initialState.get("data"),
    });
};
export default reducer;
