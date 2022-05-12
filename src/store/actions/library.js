import { ActionNames, URLs } from "../../constants.js";

import createAPI from "../utils/createAPI";

export const getStandardCells = ({ ownerName, repoName }) =>
    createAPI({
        method: "get",
        type: ActionNames.GET_STDCELLS,
        params: [`/${ownerName}/${repoName}/${URLs.Stdcell}`],
    });
export const getBoards = ({ ownerName, repoName }) =>
    createAPI({
        method: "get",
        type: ActionNames.GET_BOARDS,
        params: [`/${ownerName}/${repoName}/${URLs.Boards}`],
    });
