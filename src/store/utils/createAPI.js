import _ from "lodash";
import axios from "axios";
import ReactGA from "react-ga";

import contentDisposition from "content-disposition";
import { push } from "connected-react-router/immutable";
import { logout } from "../actions/user";
import Storage from "../../storage";

import { URLs, StorageKeys } from "../../constants.js";

const http = axios.create({
	method: "get",
	baseURL: URLs.Default
});

export const createDownloadAPI = action => dispatch => {
	const { type, params } = action;
	const extras = action.extras || {};
	const method = action.method || "get";

	const inProgressType = generateInProgressActionTypeName(type);

	Promise.resolve(1).then(() =>
		dispatch({
			type: inProgressType,
			extras
		})
	);
	const configIndex =
		["post", "put", "patch"].indexOf(method.toLowerCase()) === -1 ? 1 : 2;
	if (typeof params[configIndex] !== "object") {
		params[configIndex] = {};
	}

	if (params.length < 2) {
		params[configIndex] = {};
	}

	params[configIndex].responseType = "blob";
	params[configIndex].headers = params[1].headers || {};

	let currentUser;
	try {
		currentUser = JSON.parse(Storage.get(StorageKeys.User));
		if (currentUser && currentUser.token) {
			params[configIndex].headers.Authorization = `Bearer ${
				currentUser.token
			}`;
		}
	} catch (e) {}

	return http[method](...params)
		.then(response => {
			const { status } = response;

			let filename = "download.zip";
			if (response.headers && response.headers["content-disposition"]) {
				try {
					filename =
						contentDisposition.parse(
							response.headers["content-disposition"]
						).parameters.filename || filename;
				} catch (err) {
					console.error(err);
				}
			}
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", filename);
			document.body.appendChild(link);
			link.click();
			link.remove();

			const successType = generateSuccessActionTypeName(type);
			ReactGA.event({
				category: "APIDownload",
				action: type
			});
			return dispatch({
				type: successType,
				status,
				extras
			});
		})
		.catch(error => {
			let status = 500;
			if (error.response) {
				status = error.response.status;
			}
			if (
				error.response &&
				error.response.data != null &&
				!_.isEmpty(error.response.data)
			) {
				error = error.response.data;
			}
			if (error.error) {
				error = error.error;
			} else if (error.err) {
				error = error.err;
			} else if (error.message) {
				error = error.message;
			}
			const errorType = generateErrorActionTypeName(type);
			return dispatch({
				type: errorType,
				error,
				status,
				extras
			});
		});
};
const createAPI = action => dispatch => {
	const { method, params, type, noLoginRedirect } = action;
	const extras = action.extras || {};

	const inProgressType = generateInProgressActionTypeName(type);
	const inProgressAction = {
		type: inProgressType,
		extras,
		attach: {}
	};

	Promise.resolve(1).then(() => dispatch(inProgressAction));

	const configIndex =
		["post", "put", "patch"].indexOf(method.toLowerCase()) === -1 ? 1 : 2;
	if (typeof params[configIndex] !== "object") {
		params[configIndex] = {};
	}
	params[configIndex].headers = params[configIndex].headers || {};
	let currentUser, currentTrialUser;
	try {
		currentUser = JSON.parse(Storage.get(StorageKeys.User));
		if (currentUser && currentUser.token) {
			params[configIndex].headers.Authorization = `Bearer ${
				currentUser.token
			}`;
		}
	} catch (e) {}
	if (!currentUser) {
		try {
			currentTrialUser = JSON.parse(Storage.get(StorageKeys.TrialUser));
			if (currentTrialUser && currentTrialUser.token) {
				params[configIndex].headers.Authorization = `Bearer ${
					currentTrialUser.token
				}`;
			}
		} catch (e) {}
	}

	const successType = generateSuccessActionTypeName(type);
	const errorType = generateErrorActionTypeName(type);

	return http[method.toLowerCase()](...params)
		.then(result => {
			const { status } = result;
			
			ReactGA.event({
				category: "API",
				action: type
			});
			return dispatch({
				type: successType,
				result: result.data,
				status,
				extras,
				attach: inProgressAction.attach || {}
			});
		})
		.catch(error => {
			let status = 500;
			if (error.response) {
				status = error.response.status;
			}
			if (
				error.response &&
				error.response.data != null &&
				!_.isEmpty(error.response.data)
			) {
				error = error.response.data;
			}
			if (error.error) {
				error = error.error;
			} else if (error.err) {
				error = error.err;
			} else if (error.message) {
				error = error.message;
			}
			try {
				const parsedError = JSON.parse(error);
				if (parsedError.error) {
					error = parsedError.error;
				}
			} catch (err) {}
			if (status === 401) {
				if (!noLoginRedirect) {
					dispatch(logout())
						.then(action => {
							if (action.error && action.error.length) {
								return;
							}
							dispatch(push("/login"));
						})
						.catch(console.error);
				}
			}

			return dispatch({
				type: errorType,
				error,
				status,
				extras,
				attach: inProgressAction.attach || {}
			});
		});
};

const generateInProgressActionTypeName = basicActionName =>
	`${basicActionName}_IN_PROGRESS`;
const generateSuccessActionTypeName = basicActionName =>
	`${basicActionName}_SUCCESS`;
const generateErrorActionTypeName = basicActionName =>
	`${basicActionName}_ERROR`;

export {
	generateErrorActionTypeName,
	generateInProgressActionTypeName,
	generateSuccessActionTypeName
};
export default createAPI;
