import { ActionNames } from "../../constants.js";
import { List } from "immutable";
export const setLogs =
    ({ console = List([]), warnings = List([]), errors = List([]) } = {}) =>
    (dispatch) => {
        dispatch({
            type: ActionNames.WORKSPACE_SET_LOGS,
            logs: {
                console: Array.isArray(console) ? List(console) : console,
                warnings: Array.isArray(warnings) ? List(warnings) : warnings,
                errors: Array.isArray(errors) ? List(errors) : errors,
            },
        });
        return Promise.resolve();
    };
export const addLogs =
    ({ console = [], warnings = [], errors = [] } = {}) =>
    (dispatch) => {
        dispatch({
            type: ActionNames.WORKSPACE_ADD_LOGS,
            logs: { console, warnings, errors },
        });
        return Promise.resolve();
    };
export const setLogTab =
    ({ id } = {}) =>
    (dispatch) => {
        dispatch({
            type: ActionNames.WORKSPACE_SET_LOG_TAB,
            id,
        });
        return Promise.resolve();
    };
