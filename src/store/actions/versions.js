import { ActionNames, URLs } from "../../constants.js";
import createAPI from "../utils/createAPI";

export const getRepositoryVersions = ({ ownerName, repoName }) =>
    createAPI({
        method: "get",
        type: ActionNames.GET_REPOSITORY_VERSIONS,
        params: [`/${ownerName}/${repoName}/${URLs.Versions}`],
    });
