import {
    generateErrorActionTypeName,
    generateInProgressActionTypeName,
    generateSuccessActionTypeName,
} from "./createAPI";
import Status from "./status";

export default (
    state,
    action,
    {
        actionName,
        parser,
        defaultData,
        isAction,
        noResetOnStart,
        noResetOnFail,
        noLoading,
        noError,
        clearStatusOnSuccess,
    }
) => {
    switch (action.type) {
        case actionName:
            return state
                .set("status", Status.None)
                .set("statusCode", 0)
                .set("error", "")
                .set("data", noResetOnStart ? state.get("data") : defaultData);
        case generateInProgressActionTypeName(actionName):
            return state
                .set(
                    "status",
                    noLoading
                        ? state.get("status")
                        : isAction
                        ? Status.ActionLoading
                        : Status.Loading
                )
                .set("error", "")
                .set("data", noResetOnStart ? state.get("data") : defaultData);
        case generateSuccessActionTypeName(actionName):
            return state
                .set(
                    "status",
                    clearStatusOnSuccess
                        ? Status.None
                        : isAction
                        ? Status.ActionSuccess
                        : Status.Success
                )
                .set("statusCode", action.status)
                .set("error", "")
                .set("data", parser(action.result));
        case generateErrorActionTypeName(actionName):
            return state
                .set(
                    "status",
                    noError
                        ? state.get("status")
                        : isAction
                        ? Status.ActionError
                        : Status.Error
                )
                .set("statusCode", action.status)
                .set("error", action.error || "Unknown error has occured")
                .set("data", noResetOnFail ? state.get("data") : defaultData);
        default:
            return state;
    }
};
