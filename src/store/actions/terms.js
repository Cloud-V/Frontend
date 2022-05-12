import { ActionNames, URLs } from "../../constants.js";
import createAPI from "../utils/createAPI";

export const getTerms = () =>
    createAPI({
        method: "get",
        type: ActionNames.TERMS,
        params: [`/${URLs.Terms}`],
    });
