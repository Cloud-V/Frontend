import { ActionNames, StorageKeys } from "../../constants.js";
import { Map } from "immutable";

import {
    generateErrorActionTypeName,
    generateInProgressActionTypeName,
    generateSuccessActionTypeName,
} from "../utils/createAPI";
import Status from "../utils/status";

import Storage from "../../storage";

import Repository from "../../models/repository";

const initialState = Map({
    data: new Repository(),
    isWriter: false,
    isOwner: false,
    watched: false,
    favorited: false,
    accessLevel: 0,
    status: "",
    error: "",
    statusCode: 0,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionNames.CREATE_REPOSITORY:
            return state
                .set("status", Status.None)
                .set("statusCode", 0)
                .set("error", "")
                .set("data", new Repository())
                .set("isWriter", false)
                .set("isOwner", false)
                .set("watched", false)
                .set("favorited", false)
                .set("accessLevel", 0);
        case generateInProgressActionTypeName(ActionNames.CREATE_REPOSITORY):
            return state
                .set("status", Status.Loading)
                .set("error", "")
                .set("data", new Repository())
                .set("isWriter", false)
                .set("isOwner", false)
                .set("watched", false)
                .set("favorited", false)
                .set("accessLevel", 0);
        case generateSuccessActionTypeName(ActionNames.CREATE_REPOSITORY):
            return state
                .set("status", Status.Success)
                .set("statusCode", action.status)
                .set("error", "")
                .set("data", Repository.parse(action.result))
                .set("isWriter", true)
                .set("isOwner", true)
                .set("watched", false)
                .set("favorited", false)
                .set("accessLevel", 0);
        case generateErrorActionTypeName(ActionNames.CREATE_REPOSITORY):
            return state
                .set("status", Status.Error)
                .set("statusCode", action.status)
                .set("error", action.error || "Unknown error has occured")
                .set("data", new Repository())
                .set("isWriter", false)
                .set("isOwner", false)
                .set("watched", false)
                .set("favorited", false)
                .set("accessLevel", 0);
        case ActionNames.CLONE_REPOSITORY:
            return state
                .set("status", Status.None)
                .set("statusCode", 0)
                .set("error", "");
        case generateInProgressActionTypeName(ActionNames.CLONE_REPOSITORY):
            return state.set("status", Status.Loading).set("error", "");
        case generateSuccessActionTypeName(ActionNames.CLONE_REPOSITORY):
            return state
                .set("status", Status.Success)
                .set("statusCode", action.status)
                .set("error", "")
                .set("data", Repository.parse(action.result));
        case generateErrorActionTypeName(ActionNames.CLONE_REPOSITORY):
            return state
                .set("status", Status.Error)
                .set("statusCode", action.status)
                .set("error", action.error || "Unknown error has occured");

        case ActionNames.UPDATE_REPOSITORY:
            return state
                .set("status", Status.None)
                .set("statusCode", 0)
                .set("error", "");
        case generateInProgressActionTypeName(ActionNames.UPDATE_REPOSITORY):
            return state.set("status", Status.ActionLoading).set("error", "");
        case generateSuccessActionTypeName(ActionNames.UPDATE_REPOSITORY):
            return state
                .set("status", Status.ActionSuccess)
                .set("statusCode", action.status)
                .set("error", "")
                .set("data", Repository.parse(action.result));
        case generateErrorActionTypeName(ActionNames.UPDATE_REPOSITORY):
            return state
                .set("status", Status.ActionError)
                .set("statusCode", action.status)
                .set("error", action.error || "Unknown error has occured");

        case ActionNames.REMOVE_REPOSITORY:
            return state
                .set("status", Status.None)
                .set("statusCode", 0)
                .set("error", "");
        case generateInProgressActionTypeName(ActionNames.REMOVE_REPOSITORY):
            return state.set("status", Status.ActionLoading).set("error", "");
        case generateSuccessActionTypeName(ActionNames.REMOVE_REPOSITORY):
            return state
                .set("status", Status.Success)
                .set("statusCode", action.status)
                .set("error", "")
                .set("data", new Repository({}));
        case generateErrorActionTypeName(ActionNames.REMOVE_REPOSITORY):
            return state
                .set("status", Status.ActionError)
                .set("statusCode", action.status)
                .set("error", action.error || "Unknown error has occured");

        case ActionNames.CLONE_REPOSITORY_VERSION:
            return state
                .set("status", Status.None)
                .set("statusCode", 0)
                .set("error", "");
        case generateInProgressActionTypeName(
            ActionNames.CLONE_REPOSITORY_VERSION
        ):
            return state.set("status", Status.Loading).set("error", "");
        case generateSuccessActionTypeName(
            ActionNames.CLONE_REPOSITORY_VERSION
        ):
            return state
                .set("status", Status.Success)
                .set("statusCode", action.status)
                .set("error", "")
                .set("data", Repository.parse(action.result));
        case generateErrorActionTypeName(ActionNames.CLONE_REPOSITORY_VERSION):
            return state
                .set("status", Status.Error)
                .set("statusCode", action.status)
                .set("error", action.error || "Unknown error has occured");

        case ActionNames.GET_REPOSITORY:
            return state
                .set("status", Status.None)
                .set("statusCode", 0)
                .set("error", "")
                .set("data", new Repository())
                .set("isWriter", false)
                .set("isOwner", false)
                .set("watched", false)
                .set("favorited", false)
                .set("accessLevel", 0);
        case generateInProgressActionTypeName(ActionNames.GET_REPOSITORY):
            return state
                .set("status", Status.Loading)
                .set("error", "")
                .set("data", new Repository())
                .set("isWriter", false)
                .set("isOwner", false)
                .set("watched", false)
                .set("favorited", false)
                .set("accessLevel", 0);
        case generateSuccessActionTypeName(ActionNames.GET_REPOSITORY):
            return state
                .set("status", Status.None)
                .set("statusCode", action.status)
                .set("error", "")
                .set("data", Repository.parse(action.result.repository))
                .set("isWriter", action.result.isWriter || false)
                .set("isOwner", action.result.isOwner || false)
                .set("watched", action.result.watched || false)
                .set("favorited", action.result.favorited || false)
                .set("accessLevel", action.result.accessLevel || 0);
        case generateErrorActionTypeName(ActionNames.GET_REPOSITORY):
            return state
                .set("status", Status.Error)
                .set("statusCode", action.status)
                .set("error", action.error || "Unknown error has occured")
                .set("data", new Repository())
                .set("isWriter", false)
                .set("isOwner", false)
                .set("watched", false)
                .set("favorited", false)
                .set("accessLevel", 0);

        case generateInProgressActionTypeName(ActionNames.FAVORITE_REPOSITORY):
            return state.set("status", Status.ActionLoading).set("error", "");
        case generateSuccessActionTypeName(ActionNames.FAVORITE_REPOSITORY):
            return state
                .set("status", Status.ActionSuccess)
                .set("statusCode", action.status)
                .set("error", "")
                .set("data", Repository.parse(action.result.repository))
                .set("favorited", action.result.favorited || false);
        case generateErrorActionTypeName(ActionNames.FAVORITE_REPOSITORY):
            return state
                .set("status", Status.ActionError)
                .set("statusCode", action.status)
                .set("error", action.error || "Unknown error has occured");
        case generateInProgressActionTypeName(
            ActionNames.SET_REPOSITORY_SETTINGS
        ):
            return state.set("status", Status.ActionLoading).set("error", "");
        case generateSuccessActionTypeName(ActionNames.SET_REPOSITORY_SETTINGS):
            return state
                .set("status", Status.ActionSuccess)
                .set("statusCode", action.status)
                .set("error", "")
                .set(
                    "data",
                    state
                        .get("data")
                        .set("settings", Map(action.result.repository.settings))
                );
        case generateErrorActionTypeName(ActionNames.SET_REPOSITORY_SETTINGS):
            return state
                .set("status", Status.ActionError)
                .set("statusCode", action.status)
                .set("error", action.error || "Unknown error has occured");

        case generateInProgressActionTypeName(ActionNames.WATCH_REPOSITORY):
            return state.set("status", Status.Loading).set("error", "");
        case generateSuccessActionTypeName(ActionNames.WATCH_REPOSITORY):
            return state
                .set("status", Status.ActionSuccess)
                .set("statusCode", action.status)
                .set("error", "")
                .set("data", Repository.parse(action.result.repository))
                .set("watched", action.result.watched || false);
        case generateErrorActionTypeName(ActionNames.WATCH_REPOSITORY):
            return state
                .set("status", Status.Error)
                .set("statusCode", action.status)
                .set("error", action.error || "Unknown error has occured");

        case generateInProgressActionTypeName(ActionNames.FEATURE_REPOSITORY):
            return state.set("status", Status.Loading).set("error", "");
        case generateSuccessActionTypeName(ActionNames.FEATURE_REPOSITORY):
            return state
                .set("status", Status.ActionSuccess)
                .set("statusCode", action.status)
                .set("error", "")
                .set("data", Repository.parse(action.result));
        case generateErrorActionTypeName(ActionNames.FEATURE_REPOSITORY):
            return state
                .set("status", Status.ActionError)
                .set("statusCode", action.status)
                .set("error", action.error || "Unknown error has occured");

        case generateInProgressActionTypeName(ActionNames.CERTIFY_REPOSITORY):
            return state.set("status", Status.Loading).set("error", "");
        case generateSuccessActionTypeName(ActionNames.CERTIFY_REPOSITORY):
            return state
                .set("status", Status.ActionSuccess)
                .set("statusCode", action.status)
                .set("error", "")
                .set("data", Repository.parse(action.result));
        case generateErrorActionTypeName(ActionNames.CERTIFY_REPOSITORY):
            return state
                .set("status", Status.ActionError)
                .set("statusCode", action.status)
                .set("error", action.error || "Unknown error has occured");

        case ActionNames.SET_REPOSITORY:
            return state
                .set("data", action.repository)
                .set("status", Status.None)
                .set("error", "")
                .set("statusCode", 0);
        case ActionNames.TRY:
            return state
                .set("status", Status.None)
                .set("statusCode", 0)
                .set("error", "")
                .set("data", new Repository())
                .set("isWriter", false)
                .set("isOwner", false)
                .set("watched", false)
                .set("favorited", false)
                .set("accessLevel", 0);
        case generateInProgressActionTypeName(ActionNames.TRY):
            return state
                .set("status", Status.Loading)
                .set("error", "")
                .set("data", new Repository())
                .set("isWriter", false)
                .set("isOwner", false)
                .set("watched", false)
                .set("favorited", false)
                .set("accessLevel", 0);
        case generateSuccessActionTypeName(ActionNames.TRY):
            Storage.set(
                StorageKeys.TrialUser,
                JSON.stringify(action.result.user),
                "1h"
            );
            Storage.set(
                StorageKeys.TrialRepository,
                JSON.stringify(action.result.repository),
                "1h"
            );
            return state
                .set("status", Status.Success)
                .set("statusCode", action.status)
                .set("error", "")
                .set("data", Repository.parse(action.result.repository))
                .set("isWriter", true)
                .set("isOwner", true)
                .set("watched", false)
                .set("favorited", false)
                .set("accessLevel", 0);
        case generateErrorActionTypeName(ActionNames.TRY):
            return state
                .set("status", Status.Error)
                .set("statusCode", action.status)
                .set("error", action.error || "Unknown error has occured")
                .set("data", new Repository())
                .set("isWriter", false)
                .set("isOwner", false)
                .set("watched", false)
                .set("favorited", false)
                .set("accessLevel", 0);
        default:
            return state;
    }
};
export default reducer;
