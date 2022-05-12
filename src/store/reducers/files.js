import { ActionNames } from "../../constants.js";
import { Map, List } from "immutable";

import RepositoryEntry from "../../models/repositoryEntry";
import createAPIReducer from "../utils/createAPIReducer";

import {
    generateErrorActionTypeName,
    generateInProgressActionTypeName,
    generateSuccessActionTypeName,
} from "../utils/createAPI";

import { generateFilesTree } from "../../views/Workspace/components/FileTree/utils";
import { removeExtension } from "../../constants.js";

import Short from "short-uuid";

import _ from "lodash";

import Parser from "../utils/parser";

const initialState = Map({
    data: List([]),
    status: "",
    error: "",
    statusCode: 0,
    isSetTopModule: false,
});

const updateNodes = (state, updater) => {
    return state.updateIn(["data"], (el) => el.map(updater));
};
const updateNode = (state, node, updater) => {
    return updateNodes(state, (el, key, iter) =>
        el.get("id") !== node.id ? el : updater(el, key, iter)
    );
};

const getBuildNode = (state) => {
    return state.get("data").find((el) => el.get("type") === "buildFolder");
};
const getSoftwareBuildNode = (state) => {
    return state.get("data").find((el) => el.get("type") === "swHexFolder");
};

const getAffected = (state, nodeIds) => {
    const nodeMap = _.keyBy(nodeIds);
    const fileTree = generateFilesTree(state.get("data").toJS());
    const treeChildrenMap = {};
    const traverse = (nodes) => {
        nodes.forEach((node) => {
            treeChildrenMap[node.id] = node.children || [];
            traverse(node.children || []);
        });
    };
    traverse(fileTree);

    const affected = _.clone(nodeMap);

    const addDesc = (children) => {
        if (!children || !children.length) {
            return;
        }
        children.forEach((child) => {
            affected[child.id] = child.id;
            addDesc(treeChildrenMap[child.id] || []);
        });
    };
    _.forEach(affected, (id) => addDesc(treeChildrenMap[id]));
    return affected;
};
const getAffectedNodes = (state, nodeIds) => {
    const fileTree = generateFilesTree(state.get("data").toJS());
    const treeChildrenMap = {};
    const fileMap = {};
    const traverse = (nodes) => {
        nodes.forEach((node) => {
            fileMap[node.id] = node;
            treeChildrenMap[node.id] = node.children || [];
            traverse(node.children || []);
        });
    };
    traverse(fileTree);

    const affected = _.reduce(
        nodeIds,
        (result, val) => {
            result[val] = fileMap[val];
            return result;
        },
        {}
    );

    const addDesc = (children) => {
        if (!children || !children.length) {
            return;
        }
        children.forEach((child) => {
            affected[child.id] = child;
            addDesc(treeChildrenMap[child.id] || []);
        });
    };
    _.forEach(affected, (val, id) => addDesc(treeChildrenMap[id]));
    return affected;
};

const removeNodes = (state, nodeIds) => {
    const affected = getAffected(state, nodeIds);

    return state.set(
        "data",
        state.get("data").filter((el) => !affected[el.get("id")])
    );
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionNames.GET_REPOSITORY_FILES:
        case generateSuccessActionTypeName(ActionNames.GET_REPOSITORY_FILES):
        case generateErrorActionTypeName(ActionNames.GET_REPOSITORY_FILES):
        case generateInProgressActionTypeName(ActionNames.GET_REPOSITORY_FILES):
            return createAPIReducer(state, action, {
                actionName: ActionNames.GET_REPOSITORY_FILES,
                parser: (data) =>
                    RepositoryEntry.parseList(
                        data.files.map((file) =>
                            Object.assign(file, { title: file.text })
                        )
                    ),
                defaultData: List([]),
            });
        case ActionNames.SELECT_EDITOR_TAB: {
            const node = action.extras;
            if (!node || node.status !== "loaded") {
                return state;
            }
            return updateNodes(state, (el) =>
                el.get("id") !== node.id
                    ? el.set("active", false)
                    : el.set("active", true)
            );
        }

        case ActionNames.UPDATE_SETISTOPMODULE: {
            return state.set("isSetTopModule", true);
        }

        case generateInProgressActionTypeName(ActionNames.LOAD_FILE): {
            return updateNode(state, action.extras.node, (el) =>
                el.set("status", "loading")
            );
        }
        case generateSuccessActionTypeName(ActionNames.LOAD_FILE): {
            const { node, topModule, topModuleEntry } = action.extras;
            const content = action.result.content || "";

            let modules = [];
            let newState = updateNode(state, node, (el) =>
                el.set("status", el.get("closed") ? "" : "loaded")
            );
            if (node.type === "verilog") {
                modules = Parser.extractModules(content);
                newState = newState.set(
                    "data",
                    newState
                        .get("data")
                        .filter((el) => el.get("parent") !== node.id)
                );
                let index = newState
                    .get("data")
                    .findIndex((el) => el.id === node.id);
                newState = newState.set(
                    "data",
                    newState.get("data").splice(
                        index + 1,
                        0,
                        ...modules.map(
                            (module) =>
                                new RepositoryEntry({
                                    id: Short.generate(),
                                    title: module,
                                    text: module,
                                    type:
                                        node.id === topModuleEntry &&
                                        module === topModule
                                            ? "topmodule"
                                            : "module",
                                    parent: node.id,
                                })
                        )
                    )
                );
            }

            return newState;
        }
        case generateErrorActionTypeName(ActionNames.LOAD_FILE): {
            const { node } = action.extras;

            return updateNode(state, node, (el) =>
                el.set("status", el.get("closed") ? "" : "loaded")
            );
        }
        case generateInProgressActionTypeName(ActionNames.OPEN_EDITOR_TAB): {
            let index = state
                .get("data")
                .findIndex((el) => el.id === action.extras.id);
            if (index < 0) {
                return state;
            }
            let newState = updateNode(state, action.extras, (el) =>
                el
                    .set("status", "loading")
                    .set("closed", false)
                    .set("dirty", false)
            );
            return newState.updateIn(["data"], (data) =>
                data.push(data.get(index)).remove(index)
            );
        }
        case generateSuccessActionTypeName(ActionNames.OPEN_EDITOR_TAB): {
            return updateNodes(state, (el) =>
                el.get("id") !== action.extras.id
                    ? el.set("active", false)
                    : el
                          .set("status", "loaded")
                          .set("closed", false)
                          .set("dirty", false)
                          .set("content", action.result.content)
                          .set("active", true)
            );
        }
        case generateErrorActionTypeName(ActionNames.OPEN_EDITOR_TAB): {
            const node = action.extras;
            const isActive = node.active;
            let newActiveId = "--";
            const tabs = state.get("data").filter((file) => !file.closed);
            if (isActive && tabs.size > 1) {
                let ind = tabs.findIndex((el) => el.id === node.id);
                if (ind === tabs.size() - 1) {
                    newActiveId = tabs.get(ind - 1).get("id");
                } else {
                    newActiveId = tabs.get(ind + 1).get("id");
                }
            }
            return updateNodes(state, (el, index, files) =>
                el.get("id") === newActiveId
                    ? el.set("active", true)
                    : el.get("id") !== node.id
                    ? el
                    : el
                          .set("status", "error")
                          .set("closed", true)
                          .set("active", false)
            );
        }
        case ActionNames.PARSE_VERILOG_MODULES: {
            const { topModule, topModuleEntry, node } = action.extras;
            const data = state
                .get("data")
                .filter((el) => el.get("parent") !== node.id);
            const content = node.content || "";
            const modules = Parser.extractModules(content);
            const index = data.findIndex((el) => el.id === node.id);
            return state.set(
                "data",
                data.splice(
                    index + 1,
                    0,
                    ...modules.map(
                        (module) =>
                            new RepositoryEntry({
                                id: Short.generate(),
                                title: module,
                                text: module,
                                type:
                                    node.id === topModuleEntry &&
                                    module === topModule
                                        ? "topmodule"
                                        : "module",
                                parent: node.id,
                            })
                    )
                )
            );
        }
        case ActionNames.CLOSE_EDITOR_TAB: {
            const node = action.extras;
            const isActive = node.active;
            let newActiveId = "--";
            const tabs = state.get("data").filter((file) => !file.closed);
            if (isActive && tabs.size > 1) {
                let ind = tabs.findIndex((el) => el.id === node.id);
                if (ind === tabs.size - 1) {
                    newActiveId = tabs.get(ind - 1).get("id");
                } else {
                    newActiveId = tabs.get(ind + 1).get("id");
                }
            }
            return updateNodes(state, (el, index, files) =>
                el.get("id") === newActiveId
                    ? el.set("active", true)
                    : el.get("id") !== node.id
                    ? el
                    : el
                          .set("status", "")
                          .set("content", "")
                          .set("closed", true)
                          .set("active", false)
            );
        }
        case ActionNames.UPDATE_EDITOR_TAB: {
            return updateNode(state, action.extras.node, (el) =>
                el
                    .set("content", action.extras.updates.content)
                    .set(
                        "dirty",
                        typeof action.extras.updates.dirty === "undefined"
                            ? true
                            : action.extras.updates.dirty
                    )
            );
        }
        case generateInProgressActionTypeName(ActionNames.SAVE_EDITOR_TAB): {
            return updateNode(state, action.extras, (el) =>
                el.set("status", "loading")
            );
        }
        case generateSuccessActionTypeName(ActionNames.SAVE_EDITOR_TAB): {
            return updateNode(state, action.extras, (el) =>
                el.set("status", "loaded").set("dirty", false)
            );
        }
        case generateErrorActionTypeName(ActionNames.SAVE_EDITOR_TAB): {
            return updateNode(state, action.extras, (el) =>
                el.set("status", "loaded")
            );
        }
        case generateInProgressActionTypeName(ActionNames.CREATE_FILE): {
            const { node } = action.extras;
            return state.set(
                "data",
                state.get("data").push(
                    new RepositoryEntry({
                        ...node,
                        title: node.name,
                        text: node.name,
                        closed: true,
                        status: "loading",
                        content: "",
                        active: false,
                        dirty: false,
                    })
                )
            );
        }
        case generateSuccessActionTypeName(ActionNames.CREATE_FILE): {
            const { node, match } = action.extras;
            const overwrite = node.overwrite;
            const { content } = action.result;
            const id = action.result.fileId;
            let modules = [];
            const isFolder = action.result.fileType === "folder";
            let updatedState = updateNodes(state, (el) =>
                el.get("id") !== node.id
                    ? el.set("active", false)
                    : el
                          .set("id", id)
                          .set("content", content || "")
                          .set("status", isFolder ? "" : "loaded")
                          .set("active", !isFolder)
                          .set("closed", isFolder)
            );
            if (overwrite) {
                updatedState = updatedState.set(
                    "data",
                    updatedState
                        .get("data")
                        .filter(
                            (el) =>
                                el.get("id") !== match.id &&
                                el.get("parent") !== match.id
                        )
                );
            }
            if (node.type === "verilog") {
                modules = Parser.extractModules(content);
                const index = updatedState
                    .get("data")
                    .findIndex((el) => el.id === id);
                updatedState = updatedState.set(
                    "data",
                    updatedState.get("data").splice(
                        index + 1,
                        0,
                        ...modules.map(
                            (module) =>
                                new RepositoryEntry({
                                    id: Short.generate(),
                                    title: module,
                                    text: module,
                                    type: "module",
                                    parent: id,
                                })
                        )
                    )
                );
            }
            return updatedState;
        }
        case generateErrorActionTypeName(ActionNames.CREATE_FILE): {
            let targetId = action.extras.node.id;
            return removeNodes(state, [targetId]);
        }
        case generateInProgressActionTypeName(ActionNames.DELETE_FILES): {
            const nodeIds = action.extras;
            const nodeMap = _.keyBy(nodeIds);
            return updateNodes(state, (el) =>
                nodeMap[el.get("id")] ? el.set("status", "loading") : el
            );
        }
        case generateSuccessActionTypeName(ActionNames.DELETE_FILES): {
            return removeNodes(state, _.map(action.result.files, "fileId"));
        }
        case generateErrorActionTypeName(ActionNames.DELETE_FILES): {
            const nodeIds = action.extras;
            const nodeMap = _.keyBy(nodeIds);
            return updateNodes(state, (el) =>
                nodeMap[el.get("id")]
                    ? el.set("status", el.get("closed") ? "" : "loaded")
                    : el
            );
        }
        case generateInProgressActionTypeName(ActionNames.COPY_FILES): {
            const affected = getAffectedNodes(state, action.extras.nodeIds);
            const newIds = _.reduce(
                affected,
                (result, val) => {
                    result[val.id] = Short.generate();
                    return result;
                },
                {}
            );
            action.attach.newIds = newIds;
            const newNodes = _.map(
                affected,
                (node, id) =>
                    new RepositoryEntry({
                        ...node,
                        text: node.title || node.text || "",
                        id: newIds[id],
                        status: "loading",
                        closed: true,
                        dirty: false,
                        active: false,
                        parent: newIds[node.parent] || action.extras.target,
                    })
            );

            return state.set("data", state.get("data").push(...newNodes));
        }
        case generateSuccessActionTypeName(ActionNames.COPY_FILES): {
            const { matches } = action.extras;
            const newIds = _.invert(action.attach.newIds);
            let newState = state;
            if (matches && matches.length) {
                newState = removeNodes(newState, _.map(matches, "id"));
            }
            newState = newState.set(
                "data",
                newState.get("data").filter((el) => !newIds[el.get("id")])
            );

            return newState.set(
                "data",
                newState.get("data").push(
                    ..._.map(
                        action.result.files,
                        (file) =>
                            new RepositoryEntry({
                                id: file.fileId,
                                type: file.fileType,
                                parent: file.parentId,
                                text: file.fileName,
                                title: file.fileName,
                            })
                    )
                )
            );
        }
        case generateErrorActionTypeName(ActionNames.COPY_FILES): {
            const newIds = _.invert(action.attach.newIds);
            return state.set(
                "data",
                state.get("data").filter((el) => !newIds[el.get("id")])
            );
        }
        case generateInProgressActionTypeName(ActionNames.MOVE_FILES): {
            const affected = getAffectedNodes(state, action.extras.nodeIds);
            const newIds = _.reduce(
                affected,
                (result, val) => {
                    result[val.id] = Short.generate();
                    return result;
                },
                {}
            );
            action.attach.newIds = newIds;
            const newNodes = _.map(
                affected,
                (node, id) =>
                    new RepositoryEntry({
                        ...node,
                        text: node.title || node.text || "",
                        id: newIds[id],
                        status: "loading",
                        closed: true,
                        dirty: false,
                        active: false,
                        parent: newIds[node.parent] || action.extras.target,
                    })
            );

            return state.set("data", state.get("data").push(...newNodes));
        }
        case generateSuccessActionTypeName(ActionNames.MOVE_FILES): {
            const { matches } = action.extras;
            const newIds = _.invert(action.attach.newIds);
            let newState = state;
            if (matches && matches.length) {
                newState = removeNodes(newState, _.map(matches, "id"));
            }
            newState = newState.set(
                "data",
                newState.get("data").filter((el) => !newIds[el.get("id")])
            );

            const resultIds = _.keyBy(action.result.files, "fileId");

            return updateNodes(newState, (el) =>
                resultIds[el.get("id")]
                    ? el.set("parent", resultIds[el.get("id")].parentId)
                    : el
            );
        }
        case generateErrorActionTypeName(ActionNames.MOVE_FILES): {
            const newIds = _.invert(action.attach.newIds);
            return state.set(
                "data",
                state.get("data").filter((el) => !newIds[el.get("id")])
            );
        }
        case generateInProgressActionTypeName(ActionNames.RENAME_FILE): {
            const { nodeId, newName } = action.extras;
            const file = state
                .get("data")
                .find((el) => el.get("id") === nodeId);
            if (!file) {
                return state;
            }
            action.attach.oldName = file.title || file.text;
            return updateNode(state, { id: nodeId }, (el) =>
                el
                    .set("title", newName)
                    .set("text", newName)
                    .set("status", "loading")
            );
        }
        case generateSuccessActionTypeName(ActionNames.RENAME_FILE): {
            const { matches, nodeId } = action.extras;
            let newState = state;
            if (matches && matches.length) {
                newState = removeNodes(newState, _.map(matches, "id"));
            }
            return updateNode(newState, { id: nodeId }, (el) =>
                el.set("status", el.get("closed") ? "" : "loaded")
            );
        }
        case generateErrorActionTypeName(ActionNames.RENAME_FILE): {
            const oldName = action.attach.oldName;
            const { nodeId } = action.extras;
            if (!oldName) {
                return state;
            }

            return updateNode(state, { id: nodeId }, (el) =>
                el
                    .set("title", oldName)
                    .set("text", oldName)
                    .set("status", el.get("closed") ? "" : "loaded")
            );
        }
        case generateInProgressActionTypeName(ActionNames.SET_TOP_MODULE): {
            const { moduleId } = action.extras;
            const file = state
                .get("data")
                .find((el) => el.get("id") === moduleId);
            if (!file) {
                return state;
            }
            return updateNode(state, { id: moduleId }, (el) =>
                el.set("status", "loading")
            );
        }
        case generateSuccessActionTypeName(ActionNames.SET_TOP_MODULE): {
            const { moduleId } = action.extras;
            const file = state
                .get("data")
                .find((el) => el.get("id") === moduleId);
            if (!file) {
                return state;
            }
            const parentFile = state
                .get("data")
                .find((el) => el.get("id") === file.get("parent"));
            return updateNodes(state, (el) => {
                if (
                    el.get("type") !== "module" &&
                    el.get("type") !== "topmodule"
                ) {
                    return el;
                }
                const parent = state
                    .get("data")
                    .find((e) => e.get("id") === el.get("parent"));
                if (!parent) {
                    return el;
                }
                if (parent.get("type") !== parentFile.get("type")) {
                    return el;
                }
                if (el.get("id") === moduleId) {
                    return el.set("type", "topmodule").set("status", "");
                }
                return el.set("type", "module");
            });
        }
        case generateErrorActionTypeName(ActionNames.SET_TOP_MODULE): {
            const { moduleId } = action.extras;
            return updateNode(state, { id: moduleId }, (el) =>
                el.set("status", "")
            );
        }
        case generateInProgressActionTypeName(
            ActionNames.INCLUDE_EXCLUDE_IN_BUILD
        ): {
            const { nodeIds, isInclude } = action.extras;
            const idMap = _.keyBy(nodeIds);

            if (isInclude) {
                return updateNodes(state, (el) =>
                    !idMap[el.get("id")]
                        ? el
                        : ["exverilog", "exC", "exH", "exfolder"].includes(
                              el.get("type")
                          )
                        ? el.set("status", "loading")
                        : el
                );
            }
            return updateNodes(state, (el) =>
                !idMap[el.get("id")]
                    ? el
                    : ["verilog", "c", "h", "folder"].includes(el.get("type"))
                    ? el.set("status", "loading")
                    : el
            );
        }
        case generateSuccessActionTypeName(
            ActionNames.INCLUDE_EXCLUDE_IN_BUILD
        ): {
            const { nodeIds, isInclude } = action.extras;
            const idMap = _.keyBy(nodeIds);
            let newState;
            if (isInclude) {
                newState = updateNodes(state, (el) =>
                    !idMap[el.get("id")]
                        ? el
                        : ["exverilog", "exC", "exH", "exfolder"].includes(
                              el.get("type")
                          )
                        ? el.set("status", el.get("closed") ? "" : "loaded")
                        : el
                );
            } else {
                newState = updateNodes(state, (el) =>
                    !idMap[el.get("id")]
                        ? el
                        : ["verilog", "c", "h", "folder"].includes(
                              el.get("type")
                          )
                        ? el.set("status", el.get("closed") ? "" : "loaded")
                        : el
                );
            }
            const affected = _.keyBy(action.result.affected, "fileId");
            return updateNodes(newState, (el) =>
                affected[el.get("id")]
                    ? el.set("type", affected[el.get("id")].fileType)
                    : el
            );
        }
        case generateErrorActionTypeName(
            ActionNames.INCLUDE_EXCLUDE_IN_BUILD
        ): {
            const { nodeIds, isInclude } = action.extras;
            const idMap = _.keyBy(nodeIds);

            if (isInclude) {
                return updateNodes(state, (el) =>
                    !idMap[el.get("id")]
                        ? el
                        : ["exverilog", "exC", "exH", "exfolder"].includes(
                              el.get("type")
                          )
                        ? el.set("status", el.get("closed") ? "" : "loaded")
                        : el
                );
            }
            return updateNodes(state, (el) =>
                !idMap[el.get("id")]
                    ? el
                    : ["verilog", "c", "h", "folder"].includes(el.get("type"))
                    ? el.set("status", el.get("closed") ? "" : "loaded")
                    : el
            );
        }

        case generateInProgressActionTypeName(ActionNames.DUPLICATE_FILES): {
            const { nodeIds, newName } = action.extras;
            const affected = getAffectedNodes(state, nodeIds);
            const newIds = _.reduce(
                affected,
                (result, val) => {
                    result[val.id] = Short.generate();
                    return result;
                },
                {}
            );
            action.attach.newIds = newIds;

            const newNodes = _.map(
                affected,
                (node, id) =>
                    new RepositoryEntry({
                        ...node,
                        title: newIds[node.parent]
                            ? node.title || node.text
                            : newName,
                        text: newIds[node.parent]
                            ? node.title || node.text
                            : newName,
                        id: newIds[id],
                        key: newIds[id],
                        status: "loading",
                        closed: true,
                        dirty: false,
                        active: false,
                        parent: newIds[node.parent] || node.parent,
                    })
            );

            return state.set("data", state.get("data").push(...newNodes));
        }
        case generateSuccessActionTypeName(ActionNames.DUPLICATE_FILES): {
            const { matches } = action.extras;
            const newIds = _.invert(action.attach.newIds);
            let newState = state;
            if (matches && matches.length) {
                newState = removeNodes(newState, _.map(matches, "id"));
            }
            newState = newState.set(
                "data",
                newState.get("data").filter((el) => !newIds[el.get("id")])
            );

            return newState.set(
                "data",
                newState.get("data").push(
                    ..._.map(
                        [action.result],
                        (file) =>
                            new RepositoryEntry({
                                id: file.fileId,
                                key: file.fileId,
                                type: file.fileType,
                                parent: file.parentId,
                                text: file.fileName,
                                title: file.fileName,
                            })
                    )
                )
            );
        }

        case generateErrorActionTypeName(ActionNames.DUPLICATE_FILES): {
            const newIds = _.invert(action.attach.newIds);
            return state.set(
                "data",
                state.get("data").filter((el) => !newIds[el.get("id")])
            );
        }
        case generateInProgressActionTypeName(
            ActionNames.CONVERT_INTO_VERILOG_MODULE
        ):
        case generateInProgressActionTypeName(
            ActionNames.CONVERT_INTO_TESTBENCH
        ): {
            const { nodeId } = action.extras;
            return updateNode(state, { id: nodeId }, (el) =>
                el.set("status", "loading")
            );
        }
        case generateSuccessActionTypeName(
            ActionNames.CONVERT_INTO_VERILOG_MODULE
        ):
        case generateSuccessActionTypeName(
            ActionNames.CONVERT_INTO_TESTBENCH
        ): {
            return updateNode(state, { id: action.result.fileId }, (el) =>
                el
                    .set("status", el.get("closed") ? "" : "loaded")
                    .set("type", action.result.fileType)
            );
        }
        case generateErrorActionTypeName(
            ActionNames.CONVERT_INTO_VERILOG_MODULE
        ):
        case generateErrorActionTypeName(ActionNames.CONVERT_INTO_TESTBENCH): {
            const { nodeId } = action.extras;
            return updateNode(state, { id: nodeId }, (el) =>
                el.set("status", el.get("closed") ? "" : "loaded")
            );
        }
        case generateInProgressActionTypeName(ActionNames.SIMULATE): {
            const { name } = action.extras;
            const newId = Short.generate();
            action.attach.newId = newId;
            const buildNode = getBuildNode(state);
            return state.set(
                "data",
                state.get("data").push(
                    new RepositoryEntry({
                        id: newId,
                        title: name,
                        text: name,
                        type: "vcd",
                        parent: buildNode.get("id"),
                        status: "loading",
                    })
                )
            );
        }
        case generateSuccessActionTypeName(ActionNames.SIMULATE): {
            const { matches } = action.extras;
            const { newId } = action.attach;
            let newState = state;
            newState = newState.set(
                "data",
                newState.get("data").filter((el) => el.get("id") !== newId)
            );
            if (action.result.errors.length) {
                return newState;
            }
            if (matches && matches.length) {
                newState = removeNodes(newState, _.map(matches, "id"));
            }
            return newState.set(
                "data",
                newState.get("data").push(
                    new RepositoryEntry({
                        id: action.result.fileId,
                        title: action.result.fileName,
                        text: action.result.fileName,
                        type: action.result.fileType,
                        parent: action.result.parentId,
                    })
                )
            );
        }
        case generateErrorActionTypeName(ActionNames.SIMULATE): {
            const { newId } = action.attach;
            return state.set(
                "data",
                state.get("data").filter((el) => el.get("id") !== newId)
            );
        }
        case generateInProgressActionTypeName(ActionNames.GENERATE_BITSTREAM): {
            const { name } = action.extras;
            const newId = Short.generate();
            action.attach.newId = newId;
            const buildNode = getBuildNode(state);
            return state.set(
                "data",
                state.get("data").push(
                    new RepositoryEntry({
                        id: newId,
                        title: name,
                        text: name,
                        type: "pcf",
                        parent: buildNode.get("id"),
                        status: "loading",
                    })
                )
            );
        }
        case generateSuccessActionTypeName(ActionNames.GENERATE_BITSTREAM): {
            const { matches } = action.extras;

            const { newId } = action.attach;
            let newState = state;
            newState = newState.set(
                "data",
                newState.get("data").filter((el) => el.get("id") !== newId)
            );
            if (action.result.log.errors.length) {
                return newState;
            }
            if (matches && matches.length) {
                newState = removeNodes(newState, _.map(matches, "id"));
            }
            return newState.set(
                "data",
                newState.get("data").push(
                    new RepositoryEntry({
                        id: action.result.fileId,
                        title: action.result.fileName,
                        text: action.result.fileName,
                        type: action.result.fileType,
                        parent: action.result.parentId,
                    })
                )
            );
        }
        case generateErrorActionTypeName(ActionNames.GENERATE_BITSTREAM): {
            const { newId } = action.attach;
            console.log("wipsssee");

            return state.set(
                "data",
                state.get("data").filter((el) => el.get("id") !== newId)
            );
        }
        case generateInProgressActionTypeName(ActionNames.SYNTHESIZE): {
            const { name } = action.extras;
            const newId = Short.generate();
            const reportId = Short.generate();
            const reportName = removeExtension(name, ".v") + ".rpt.txt";
            action.attach.newId = newId;
            action.attach.reportId = reportId;
            const buildNode = getBuildNode(state);
            return state.set(
                "data",
                state.get("data").push(
                    new RepositoryEntry({
                        id: newId,
                        title: name,
                        text: name,
                        type: "netlist",
                        parent: buildNode.get("id"),
                        status: "loading",
                    }),
                    new RepositoryEntry({
                        id: reportId,
                        title: reportName,
                        text: reportName,
                        type: "srpt",
                        parent: buildNode.get("id"),
                        status: "loading",
                    })
                )
            );
        }
        case generateSuccessActionTypeName(ActionNames.SYNTHESIZE): {
            const { matches, reportMatches, synthType } = action.extras;
            const { newId, reportId } = action.attach;
            const isAsync = synthType === "async";
            let newState = state;
            if (matches && matches.length) {
                newState = removeNodes(newState, _.map(matches, "id"));
            }
            newState = newState.set(
                "data",
                newState
                    .get("data")
                    .filter(
                        (el) =>
                            el.get("id") !== newId && el.get("id") !== reportId
                    )
            );
            if ((action.result.log || { errors: [] }).errors.length) {
                return newState;
            }
            if (matches && matches.length) {
                newState = removeNodes(newState, _.map(reportMatches, "id"));
            }
            newState = newState.set(
                "data",
                newState.get("data").push(
                    new RepositoryEntry({
                        id: action.result.fileId,
                        title: action.result.fileName,
                        text: action.result.fileName,
                        type: action.result.fileType,
                        parent: action.result.parentId,
                        content: action.result.content,
                    })
                )
            );
            if (action.result.synthesisReport) {
                newState = newState.set(
                    "data",
                    newState.get("data").push(
                        new RepositoryEntry({
                            id: action.result.synthesisReport._id,
                            title: action.result.synthesisReport.title,
                            text: action.result.synthesisReport.title,
                            type: action.result.synthesisReport.type || "srpt",
                            parent: action.result.synthesisReport.parent,
                            content: (action.result.log || { report: "" })
                                .report,
                        })
                    )
                );
            }

            if (action.result.fileType && !isAsync) {
                return updateNodes(newState, (el) =>
                    el.get("id") === action.result.fileId
                        ? el.set("active", true).set("closed", false)
                        : el.set("active", false)
                );
            }
            return newState;
        }
        case generateErrorActionTypeName(ActionNames.SYNTHESIZE): {
            const { newId, reportId } = action.attach;
            return state.set(
                "data",
                state
                    .get("data")
                    .filter(
                        (el) =>
                            el.get("id") !== newId && el.get("id") !== reportId
                    )
            );
        }
        case generateInProgressActionTypeName(ActionNames.COMPILE_SOFTWARE): {
            const { name } = action.extras;
            const newId = Short.generate();
            const listId = Short.generate();
            const listName = name + ".lst";
            action.attach.newId = newId;
            action.attach.listId = listId;
            const buildNode = getSoftwareBuildNode(state);
            return state.set(
                "data",
                state.get("data").push(
                    new RepositoryEntry({
                        id: newId,
                        title: name,
                        text: name,
                        type: "text",
                        parent: buildNode.get("id"),
                        status: "loading",
                    }),
                    new RepositoryEntry({
                        id: listId,
                        title: listName,
                        text: listName,
                        type: "text",
                        parent: buildNode.get("id"),
                        status: "loading",
                    })
                )
            );
        }
        case generateSuccessActionTypeName(ActionNames.COMPILE_SOFTWARE): {
            const { matches, listMatches } = action.extras;
            const { newId, listId } = action.attach;
            let newState = state;
            if (matches && matches.length) {
                newState = removeNodes(newState, _.map(matches, "id"));
            }
            newState = newState.set(
                "data",
                newState
                    .get("data")
                    .filter(
                        (el) =>
                            el.get("id") !== newId && el.get("id") !== listId
                    )
            );
            if ((action.result.log || { errors: [] }).errors.length) {
                return newState;
            }
            if (matches && matches.length) {
                newState = removeNodes(newState, _.map(listMatches, "id"));
            }
            newState = newState.set(
                "data",
                newState.get("data").push(
                    new RepositoryEntry({
                        id: action.result.fileId,
                        title: action.result.fileName,
                        text: action.result.fileName,
                        type: action.result.fileType,
                        parent: action.result.parentId,
                        content: action.result.content,
                    })
                )
            );
            if (action.result.list) {
                newState = newState.set(
                    "data",
                    newState.get("data").push(
                        new RepositoryEntry({
                            id: action.result.list.fileId,
                            title: action.result.list.fileName,
                            text: action.result.list.fileName,
                            type: action.result.list.fileType,
                            parent: action.result.list.parentId,
                            content: (action.result.list || { content: "" })
                                .content,
                        })
                    )
                );
            }

            return updateNodes(newState, (el) =>
                el.get("id") === action.result.fileId
                    ? el.set("active", true).set("closed", false)
                    : el.set("active", false)
            );
        }
        case generateErrorActionTypeName(ActionNames.COMPILE_SOFTWARE): {
            const { newId, listId } = action.attach;
            return state.set(
                "data",
                state
                    .get("data")
                    .filter(
                        (el) =>
                            el.get("id") !== newId && el.get("id") !== listId
                    )
            );
        }
        case ActionNames.UPDATE_FILES: {
            let { nodes } = action.extras;
            const upsert = !!action.extras.upsert;
            const indices = {};
            const newNodes = [];
            let hasActive = false;
            nodes = nodes.map((node) => {
                node.id = node._id =
                    node.id || node._id || node.fileId || Short.generate();
                node.text =
                    node.title =
                    node.name =
                    node.fileName =
                        node.text || node.title || node.name || node.fileName;
                node.type = node.type || node.fileType || "";
                node.parent = node.parent || node.parentId;
                node.content = node.content || "";
                if (typeof node.active !== "undefined") {
                    hasActive = true;
                }
                return _.pick(node, [
                    "id",
                    "text",
                    "title",
                    "type",
                    "parent",
                    "content",
                    "active",
                    "closed",
                ]);
            });
            (nodes || []).forEach((node) => {
                const index = state
                    .get("data")
                    .findIndex((el) => el.get("id") === node.id);
                if (index === -1) {
                    if (upsert) {
                        newNodes.push(node);
                    }
                } else {
                    indices[index] = node;
                }
            });
            let newState = updateNodes(state, (el, index) =>
                indices[index]
                    ? el.merge(indices[index])
                    : hasActive
                    ? el.set("active", false)
                    : el
            );
            return newState.set(
                "data",
                newState
                    .get("data")
                    .push(...newNodes.map((node) => new RepositoryEntry(node)))
            );
        }
        default:
            return state;
    }
};
export default reducer;
