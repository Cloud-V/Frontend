import { ActionNames, URLs } from "../../constants.js";
import createAPI from "../utils/createAPI";

export const getTools = () =>
    createAPI({
        method: "get",
        type: ActionNames.TOOLS,
        params: [`/${URLs.Tools}`],
    });
