import { ActionNames, StorageKeys } from "../../constants.js";
import { Map } from "immutable";

import {
    generateErrorActionTypeName,
    generateInProgressActionTypeName,
    generateSuccessActionTypeName,
} from "../utils/createAPI";
import createAPIReducer from "../utils/createAPIReducer";

import Status from "../utils/status";

import User from "../../models/user";
import Storage from "../../storage";

let currentUser;

function refreshUser() {
    try {
        currentUser = JSON.parse(Storage.get(StorageKeys.User));
    } catch (e) {}
    if (currentUser) {
        currentUser = User.parse(currentUser);
    }
}

refreshUser();

const initialState = Map({
    data: currentUser ? currentUser : Map({}),
    status: "",
    error: "",
    statusCode: 0,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionNames.LOGOUT:
            return state
                .set("status", Status.None)
                .set("statusCode", 0)
                .set("error", "");
        case generateInProgressActionTypeName(ActionNames.LOGOUT):
            return state
                .set("status", Status.Loading)
                .set("statusCode", 0)
                .set("error", "");
        case generateSuccessActionTypeName(ActionNames.LOGOUT):
        case generateErrorActionTypeName(ActionNames.LOGOUT):
            Storage.remove(StorageKeys.User);
            return state
                .set("status", Status.None)
                .set("statusCode", 0)
                .set("error", "")
                .set("data", Map({}));
        case ActionNames.LOGIN:
            return state
                .set("status", Status.None)
                .set("statusCode", 0)
                .set("error", "")
                .set("data", Map({}));
        case generateInProgressActionTypeName(ActionNames.LOGIN):
            return state
                .set("status", Status.Loading)
                .set("error", "")
                .set("data", Map({}));
        case generateSuccessActionTypeName(ActionNames.LOGIN):
            Storage.set(StorageKeys.User, JSON.stringify(action.result));
            return state
                .set("status", Status.Success)
                .set("statusCode", action.status)
                .set("error", "")
                .set("data", User.parse(action.result));
        case generateErrorActionTypeName(ActionNames.LOGIN):
            return state
                .set("status", Status.Error)
                .set("statusCode", action.status)
                .set("error", action.error || "Unknown error has occured")
                .set("data", Map({}));

        case ActionNames.SIGNUP:
            return state
                .set("status", Status.None)
                .set("statusCode", 0)
                .set("error", "")
                .set("data", Map({}));
        case generateInProgressActionTypeName(ActionNames.SIGNUP):
            return state
                .set("status", Status.Loading)
                .set("error", "")
                .set("data", Map({}));
        case generateSuccessActionTypeName(ActionNames.SIGNUP):
            Storage.set(StorageKeys.User, JSON.stringify(action.result));
            return state
                .set("status", Status.Success)
                .set("statusCode", action.status)
                .set("error", "")
                .set("data", User.parse(action.result));
        case generateErrorActionTypeName(ActionNames.SIGNUP):
            return state
                .set("status", Status.Error)
                .set("statusCode", action.status)
                .set("error", action.error || "Unknown error has occured")
                .set("data", Map({}));
        case ActionNames.UPDATE_USER:
        case generateSuccessActionTypeName(ActionNames.UPDATE_USER):
        case generateErrorActionTypeName(ActionNames.UPDATE_USER):
        case generateInProgressActionTypeName(ActionNames.UPDATE_USER):
            if (
                action.type ===
                generateSuccessActionTypeName(ActionNames.UPDATE_USER)
            ) {
                Storage.set(StorageKeys.User, JSON.stringify(action.result));
            }
            return createAPIReducer(state, action, {
                actionName: ActionNames.UPDATE_USER,
                parser: (data) => User.parse(data),
                defaultData: new User({}),
                isAction: true,
                noResetOnStart: true,
                noResetOnFail: true,
                clearStatusOnSuccess: true,
            });
        case ActionNames.MARK_TOUR_DASHBOARD:
        case generateSuccessActionTypeName(ActionNames.MARK_TOUR_DASHBOARD):
        case generateErrorActionTypeName(ActionNames.MARK_TOUR_DASHBOARD):
        case generateInProgressActionTypeName(ActionNames.MARK_TOUR_DASHBOARD):
            if (
                action.type ===
                generateSuccessActionTypeName(ActionNames.MARK_TOUR_DASHBOARD)
            ) {
                Storage.set(StorageKeys.User, JSON.stringify(action.result));
            }
            return createAPIReducer(state, action, {
                actionName: ActionNames.MARK_TOUR_DASHBOARD,
                parser: (data) => User.parse(data),
                defaultData: new User({}),
                isAction: true,
                noResetOnStart: true,
                noLoading: true,
                noError: true,
                noResetOnFail: true,
                clearStatusOnSuccess: true,
            });
        case ActionNames.MARK_TOUR_REPOSITORY:
        case generateSuccessActionTypeName(ActionNames.MARK_TOUR_REPOSITORY):
        case generateErrorActionTypeName(ActionNames.MARK_TOUR_REPOSITORY):
        case generateInProgressActionTypeName(ActionNames.MARK_TOUR_REPOSITORY):
            if (
                action.type ===
                generateSuccessActionTypeName(ActionNames.MARK_TOUR_REPOSITORY)
            ) {
                Storage.set(StorageKeys.User, JSON.stringify(action.result));
            }
            return createAPIReducer(state, action, {
                actionName: ActionNames.MARK_TOUR_REPOSITORY,
                parser: (data) => User.parse(data),
                defaultData: new User({}),
                isAction: true,
                noResetOnStart: true,
                noLoading: true,
                noError: true,
                noResetOnFail: true,
                clearStatusOnSuccess: true,
            });
        case ActionNames.MARK_TOUR_WORKSPACE:
        case generateSuccessActionTypeName(ActionNames.MARK_TOUR_WORKSPACE):
        case generateErrorActionTypeName(ActionNames.MARK_TOUR_WORKSPACE):
        case generateInProgressActionTypeName(ActionNames.MARK_TOUR_WORKSPACE):
            if (
                action.type ===
                generateSuccessActionTypeName(ActionNames.RESET_PASSWORD)
            ) {
                Storage.set(StorageKeys.User, JSON.stringify(action.result));
            }
            return createAPIReducer(state, action, {
                actionName: ActionNames.MARK_TOUR_REPOSITORY,
                parser: (data) => User.parse(data),
                defaultData: new User({}),
                isAction: true,
                noResetOnStart: true,
                noResetOnFail: true,
                noLoading: true,
                clearStatusOnSuccess: true,
                noError: true,
            });
        case ActionNames.UPDATE_PASSWORD:
        case generateSuccessActionTypeName(ActionNames.UPDATE_PASSWORD):
        case generateErrorActionTypeName(ActionNames.UPDATE_PASSWORD):
        case generateInProgressActionTypeName(ActionNames.UPDATE_PASSWORD):
            if (
                action.type ===
                generateSuccessActionTypeName(ActionNames.RESET_PASSWORD)
            ) {
                Storage.set(StorageKeys.User, JSON.stringify(action.result));
            }
            return createAPIReducer(state, action, {
                actionName: ActionNames.UPDATE_PASSWORD,
                parser: (data) => User.parse(data),
                defaultData: new User({}),
                isAction: true,
                noResetOnStart: true,
                noResetOnFail: true,
            });
        case ActionNames.RESET_PASSWORD:
        case generateSuccessActionTypeName(ActionNames.RESET_PASSWORD):
        case generateErrorActionTypeName(ActionNames.RESET_PASSWORD):
        case generateInProgressActionTypeName(ActionNames.RESET_PASSWORD):
            if (
                action.type ===
                generateSuccessActionTypeName(ActionNames.RESET_PASSWORD)
            ) {
                Storage.set(StorageKeys.User, JSON.stringify(action.result));
            }
            return createAPIReducer(state, action, {
                actionName: ActionNames.RESET_PASSWORD,
                parser: (data) => User.parse(data),
                defaultData: new User({}),
                isAction: true,
            });
        case ActionNames.GITHUB:
        case generateSuccessActionTypeName(ActionNames.GITHUB):
        case generateErrorActionTypeName(ActionNames.GITHUB):
        case generateInProgressActionTypeName(ActionNames.GITHUB):
            if (
                action.type ===
                generateSuccessActionTypeName(ActionNames.GITHUB)
            ) {
                Storage.set(StorageKeys.User, JSON.stringify(action.result));
            }
            return createAPIReducer(state, action, {
                actionName: ActionNames.GITHUB,
                parser: (data) => User.parse(data),
                defaultData: Map({}),
                isAction: true,
                clearStatusOnSuccess: true,
            });
        case ActionNames.GOOGLE:
        case generateSuccessActionTypeName(ActionNames.GOOGLE):
        case generateErrorActionTypeName(ActionNames.GOOGLE):
        case generateInProgressActionTypeName(ActionNames.GOOGLE):
            if (
                action.type ===
                generateSuccessActionTypeName(ActionNames.GOOGLE)
            ) {
                Storage.set(StorageKeys.User, JSON.stringify(action.result));
            }
            return createAPIReducer(state, action, {
                actionName: ActionNames.GOOGLE,
                parser: (data) => User.parse(data),
                defaultData: Map({}),
                isAction: true,
                clearStatusOnSuccess: true,
            });
        case ActionNames.COMPLETE_SIGNUP:
        case generateSuccessActionTypeName(ActionNames.COMPLETE_SIGNUP):
        case generateErrorActionTypeName(ActionNames.COMPLETE_SIGNUP):
        case generateInProgressActionTypeName(ActionNames.COMPLETE_SIGNUP):
            if (
                action.type ===
                generateSuccessActionTypeName(ActionNames.COMPLETE_SIGNUP)
            ) {
                Storage.set(StorageKeys.User, JSON.stringify(action.result));
            }
            return createAPIReducer(state, action, {
                actionName: ActionNames.COMPLETE_SIGNUP,
                parser: (data) => User.parse(data),
                defaultData: Map({}),
                isAction: true,
            });
        default:
            return state;
    }
};
export default reducer;
