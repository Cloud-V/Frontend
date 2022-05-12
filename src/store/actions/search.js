import { ActionNames, URLs } from "../../constants.js";
import createAPI from "../utils/createAPI";

export const search = ({ query }, { repositories, users }) =>
    createAPI({
        method: "get",
        type: ActionNames.SEARCH,
        params: [
            `/${URLs.Search}?q=${encodeURIComponent(
                query
            )}&rp=${repositories}&up=${users}`,
        ],
    });

export const setQuery = (query = "") => {
    return (dispatch) => {
        dispatch({
            type: ActionNames.SET_QUERY,
            query,
        });
        return Promise.resolve();
    };
};
