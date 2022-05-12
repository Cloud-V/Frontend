import { ActionNames, URLs } from "../../constants.js";
import createAPI, { createDownloadAPI } from "../utils/createAPI";
import Repository from "../../models/repository";

export const createRepository = (repo) =>
    createAPI({
        method: "post",
        type: ActionNames.CREATE_REPOSITORY,
        params: [
            URLs.NewRepo,
            {
                ...repo,
            },
        ],
    });

export const updateRepository = ({ ownerName, repoName }, config) =>
    createAPI({
        method: "post",
        type: ActionNames.UPDATE_REPOSITORY,
        params: [
            `${ownerName}/${repoName}/${URLs.Update}`,
            {
                ...config,
            },
        ],
    });

export const removeRepository = ({ ownerName, repoName }) =>
    createAPI({
        method: "post",
        type: ActionNames.REMOVE_REPOSITORY,
        params: [`${ownerName}/${repoName}/${URLs.Remove}`],
    });

export const cloneRepository = ({ ownerName, repoName }, target) =>
    createAPI({
        method: "post",
        type: ActionNames.CLONE_REPOSITORY,
        params: [
            `${ownerName}/${repoName}/${URLs.Clone}`,
            {
                ...target,
            },
        ],
    });

export const cloneRepositoryVersion = (
    { ownerName, repoName },
    { _id },
    target
) =>
    createAPI({
        method: "post",
        type: ActionNames.CLONE_REPOSITORY_VERSION,
        params: [
            `/${ownerName}/${repoName}/${URLs.CloneVersion}/${_id}`,
            target,
        ],
    });

export const getRepository = ({ ownerName, repoName }) =>
    createAPI({
        method: "get",
        type: ActionNames.GET_REPOSITORY,
        params: [`/${ownerName}/${repoName}`],
    });

export const favoriteRepository = ({ ownerName, repoName }) =>
    createAPI({
        method: "post",
        type: ActionNames.FAVORITE_REPOSITORY,
        params: [`/${ownerName}/${repoName}/${URLs.Favorite}`],
    });

export const watchRepository = ({ ownerName, repoName }) =>
    createAPI({
        method: "post",
        type: ActionNames.WATCH_REPOSITORY,
        params: [`/${ownerName}/${repoName}/${URLs.Watch}`],
    });

export const featureRepository = ({ ownerName, repoName }) =>
    createAPI({
        method: "post",
        type: ActionNames.FEATURE_REPOSITORY,
        params: [`/${ownerName}/${repoName}/${URLs.Feature}`],
    });
export const certifyRepository = ({ ownerName, repoName }) =>
    createAPI({
        method: "post",
        type: ActionNames.CERTIFY_REPOSITORY,
        params: [`/${ownerName}/${repoName}/${URLs.Certify}`],
    });

export const setRepository = (repository = {}) => {
    if (!(repository instanceof Repository)) {
        repository = new Repository(repository);
    }
    return (dispatch) => {
        dispatch({
            type: ActionNames.SET_REPOSITORY,
            repository,
        });
        return Promise.resolve();
    };
};

export const setRepositorySettings = ({ ownerName, repoName, settings }) =>
    createAPI({
        method: "post",
        type: ActionNames.SET_REPOSITORY_SETTINGS,
        params: [
            `/${ownerName}/${repoName}/${URLs.WorkspaceSettings}`,
            Object.assign(settings, { theme: settings.theme || 0 }),
        ],
    });

export const downloadRepository = ({ ownerName, repoName }) =>
    createDownloadAPI({
        type: ActionNames.DOWNLOAD_REPOSITORY,
        params: [`/${ownerName}/${repoName}.zip`],
    });

export const tryRepository = (repo) =>
    createAPI({
        method: "post",
        type: ActionNames.TRY,
        params: [URLs.Try],
    });
