import { ActionNames, URLs } from "../../constants.js";
import createAPI from "../utils/createAPI";
import { setMessage } from "./message";

const wrapMessage = (action) => (dispatch) => {
    const result = createAPI(action)(dispatch)
        .then((action) => {
            if (action.status === 200) {
                dispatch(
                    setMessage({
                        messageType: "user-update",
                        messageContent: action.result,
                    })
                );
            }
            return Promise.resolve(action);
        })
        .catch(Promise.reject);
    return result;
};

export const login = (data) =>
    wrapMessage({
        method: "post",
        type: ActionNames.LOGIN,
        params: [
            URLs.Login,
            {
                ...data,
            },
        ],
    });

export const signup = (data) =>
    wrapMessage({
        method: "post",
        type: ActionNames.SIGNUP,
        params: [
            URLs.Signup,
            {
                ...data,
            },
        ],
    });
export const logout = () =>
    wrapMessage({
        method: "get",
        type: ActionNames.LOGOUT,
        params: [URLs.Logout],
    });

export const updateUser = (updates = {}) =>
    wrapMessage({
        method: "post",
        type: ActionNames.UPDATE_USER,
        params: [
            `/${URLs.Edit}`,
            updates,
            {
                headers: {},
            },
        ],
    });
export const updatePassword = ({ currentPassword, password }) =>
    wrapMessage({
        method: "post",
        type: ActionNames.UPDATE_PASSWORD,
        params: [
            `/${URLs.EditPassword}`,
            {
                currentPassword,
                password,
            },
        ],
    });
export const markDashboard = (done) =>
    wrapMessage({
        method: "post",
        type: ActionNames.MARK_TOUR_DASHBOARD,
        params: [
            `/${URLs.Edit}?nonull=1`,
            {
                dashboardTour: !!done,
            },
        ],
    });
export const markRepository = (done) =>
    wrapMessage({
        method: "post",
        type: ActionNames.MARK_TOUR_REPOSITORY,
        params: [
            `/${URLs.Edit}?nonull=1`,
            {
                repositoryTour: !!done,
            },
        ],
    });
export const markWorkspace = (done) =>
    wrapMessage({
        method: "post",
        type: ActionNames.MARK_TOUR_WORKSPACE,
        params: [
            `/${URLs.Edit}?nonull=1`,
            {
                workspaceTour: !!done,
            },
        ],
    });

export const resetPassword = ({ username, resetToken, password }) =>
    wrapMessage({
        method: "post",
        type: ActionNames.RESET_PASSWORD,
        params: [
            URLs.Reset,
            {
                username,
                resetToken,
                password,
            },
        ],
    });
export const sendGitHubCode = ({ code }) =>
    wrapMessage({
        method: "post",
        type: ActionNames.GITHUB,
        params: [
            `/${URLs.GitHubCallback}`,
            {
                code,
            },
        ],
    });
export const sendGoogleCode = ({ code }) =>
    wrapMessage({
        method: "post",
        type: ActionNames.GOOGLE,
        params: [
            `/${URLs.GoogleCallback}`,
            {
                code,
            },
        ],
    });
export const completeSignup = ({ username }) =>
    wrapMessage({
        method: "post",
        type: ActionNames.COMPLETE_SIGNUP,
        params: [
            `/${URLs.CompleteSignup}`,
            {
                username,
            },
        ],
    });
