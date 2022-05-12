import { combineReducers } from "redux-immutable";

import repositories from "./repositories";
import repository from "./repository";
import shared from "./shared";
import watching from "./watching";
import user from "./user";
import files from "./files";
import contributors from "./contributors";
import contributor from "./contributor";
import versions from "./versions";
import version from "./version";
import profile from "./profile";
import reset from "./reset";
import search from "./search";
import explore from "./explore";
import message from "./message";
import tools from "./tools";
import privacy from "./privacy";
import terms from "./terms";
import about from "./about";
import contact from "./contact";
import workspace from "./workspace";
import stats from "./stats";
import library from "./library";

import { reducer as form } from "redux-form/immutable";

const rootReducer = combineReducers({
    repositories,
    repository,
    shared,
    watching,
    user,
    files,
    contributors,
    contributor,
    versions,
    version,
    profile,
    reset,
    search,
    explore,
    message,
    tools,
    privacy,
    terms,
    about,
    contact,
    workspace,
    stats,
    form,
    library,
});

export default rootReducer;
