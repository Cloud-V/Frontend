import { ActionNames, URLs } from "../../constants.js";
import createAPI from "../utils/createAPI";

export const getHeartbeat = () =>
    createAPI({
        method: "get",
        type: ActionNames.HEARTBEAT,
        params: [`/${URLs.Heartbeat}`],
    });
