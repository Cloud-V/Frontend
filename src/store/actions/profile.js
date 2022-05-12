import { ActionNames } from "../../constants.js";
import createAPI from "../utils/createAPI";

export const getProfile = ({ ownerName }) =>
    createAPI({
        method: "get",
        type: ActionNames.GET_PROFILE,
        params: [`/${ownerName}`],
    });
