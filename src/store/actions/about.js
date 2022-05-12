import { ActionNames, URLs } from "../../constants.js";
import createAPI from "../utils/createAPI";

export const getAbout = () =>
    createAPI({
        method: "get",
        type: ActionNames.ABOUT,
        params: [`/${URLs.About}`],
    });
