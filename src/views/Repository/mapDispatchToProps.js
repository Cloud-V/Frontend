import {
    getRepository,
    cloneRepositoryVersion,
    cloneRepository,
    watchRepository,
    favoriteRepository,
    downloadRepository,
    updateRepository,
    removeRepository,
    featureRepository,
    certifyRepository,
} from "store/actions/repository";
import { getRepositoryFiles } from "store/actions/files";
import { getRepositoryContributors } from "store/actions/contributors";
import {
    addRepositoryContributor,
    removeRepositoryContributor,
    setContributor,
} from "store/actions/contributor";
import { getRepositoryVersions } from "store/actions/versions";
import {
    addRepositoryVersion,
    removeRepositoryVersion,
    downloadVersion,
    setVersion,
} from "store/actions/version";
import { markRepository } from "store/actions/user";

export default (dispatch) => {
    return {
        repositoryGet: ({ ownerName, repoName }) =>
            dispatch(
                getRepository({
                    ownerName,
                    repoName,
                })
            ),
        repositoryRemove: ({ ownerName, repoName }) =>
            dispatch(
                removeRepository({
                    ownerName,
                    repoName,
                })
            ),
        repositoryUpdate: ({ ownerName, repoName }, updates) =>
            dispatch(
                updateRepository(
                    {
                        ownerName,
                        repoName,
                    },
                    updates
                )
            ),
        repositoryFilesGet: ({ ownerName, repoName }) =>
            dispatch(
                getRepositoryFiles({
                    ownerName,
                    repoName,
                    filter: "",
                })
            ),
        repositoryContributorsGet: ({ ownerName, repoName }) =>
            dispatch(
                getRepositoryContributors({
                    ownerName,
                    repoName,
                })
            ),
        repositoryContributorsAdd: (
            { ownerName, repoName },
            { username, accessLevel }
        ) =>
            dispatch(
                addRepositoryContributor(
                    {
                        ownerName,
                        repoName,
                    },
                    {
                        username,
                        accessLevel,
                    }
                )
            ),
        repositoryContributorsRemove: ({ ownerName, repoName }, { username }) =>
            dispatch(
                removeRepositoryContributor(
                    {
                        ownerName,
                        repoName,
                    },
                    {
                        username,
                    }
                )
            ),
        setContributor: (contributor) => dispatch(setContributor(contributor)),
        repositoryVersionsGet: ({ ownerName, repoName }) =>
            dispatch(
                getRepositoryVersions({
                    ownerName,
                    repoName,
                })
            ),
        repositoryVersionsAdd: ({ ownerName, repoName }, version) =>
            dispatch(
                addRepositoryVersion(
                    {
                        ownerName,
                        repoName,
                    },
                    version
                )
            ),
        repositoryVersionsRemove: ({ ownerName, repoName }, version) =>
            dispatch(
                removeRepositoryVersion(
                    {
                        ownerName,
                        repoName,
                    },
                    version
                )
            ),
        repositoryVersionsClone: ({ ownerName, repoName }, version, target) =>
            dispatch(
                cloneRepositoryVersion(
                    {
                        ownerName,
                        repoName,
                    },
                    version,
                    target
                )
            ),
        setVersion: (version) => dispatch(setVersion(version)),
        downloadVersion: ({ ownerName, repoName }, { _id }) =>
            dispatch(
                downloadVersion(
                    {
                        ownerName,
                        repoName,
                    },
                    {
                        _id,
                    }
                )
            ),
        repositoryClone: (repo, target) =>
            dispatch(cloneRepository(repo, target)),
        repositoryDownload: (repo) => dispatch(downloadRepository(repo)),
        repositoryWatch: (repo) => dispatch(watchRepository(repo)),
        repositoryFavorite: (repo) => dispatch(favoriteRepository(repo)),
        repositoryCertify: (repo) => dispatch(certifyRepository(repo)),
        repositoryFeature: (repo) => dispatch(featureRepository(repo)),
        markRepositoryDone: () => dispatch(markRepository(true)),
    };
};
