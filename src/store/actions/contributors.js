import { ActionNames, URLs } from "../../constants.js";
import createAPI from "../utils/createAPI";

export const getRepositoryContributors = ({ ownerName, repoName, filter }) =>
    createAPI({
        method: "get",
        type: ActionNames.GET_REPOSITORY_CONTRIBUTORS,
        params: [`/${ownerName}/${repoName}/${URLs.Contributors}`],
    });
