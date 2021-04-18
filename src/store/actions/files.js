import { ActionNames, URLs } from "../../constants.js";
import createAPI, { createDownloadAPI } from "../utils/createAPI";

export const getRepositoryFiles = ({ ownerName, repoName, filter }) =>
	createAPI({
		method: "get",
		type: ActionNames.GET_REPOSITORY_FILES,
		params: [
			`/${ownerName}/${repoName}/${URLs.Files}?filter=${filter || ""}`
		]
	});

export const parseVerilogModules = ({ node, topModule, topModuleEntry }) => {
	return dispatch => {
		dispatch({
			type: ActionNames.PARSE_VERILOG_MODULES,
			extras: { node, topModule, topModuleEntry }
		});
		return Promise.resolve();
	};
};
export const closeEditorTab = ({ node }) => {
	return dispatch => {
		dispatch({
			type: ActionNames.CLOSE_EDITOR_TAB,
			extras: node
		});
		return Promise.resolve();
	};
};

export const selectEditorTab = ({ node }) => {
	return dispatch => {
		dispatch({
			type: ActionNames.SELECT_EDITOR_TAB,
			extras: node
		});
		return Promise.resolve();
	};
};

export const openEditorTab = ({ ownerName, repoName, node }) =>
	createAPI({
		method: "get",
		type: ActionNames.OPEN_EDITOR_TAB,
		params: [`${ownerName}/${repoName}/${URLs.GetFile}/${node.id}`],
		extras: node
	});

export const loadFile = ({
	ownerName,
	repoName,
	node,
	topModule,
	topModuleEntry
}) =>
	createAPI({
		method: "get",
		type: ActionNames.LOAD_FILE,
		params: [`${ownerName}/${repoName}/${URLs.GetFile}/${node.id}`],
		extras: { node, topModule, topModuleEntry }
	});

export const saveEditorTab = ({ ownerName, repoName, node, content }) =>
	createAPI({
		method: "post",
		type: ActionNames.SAVE_EDITOR_TAB,
		params: [
			`${ownerName}/${repoName}/${URLs.Ajax}`,
			{
				action: "save",
				item: node.id,
				content
			}
		],
		extras: node
	});

export const updateEditorTab = ({ node, updates }) => {
	return dispatch => {
		dispatch({
			type: ActionNames.UPDATE_EDITOR_TAB,
			extras: { node, updates }
		});
		return Promise.resolve();
	};
};
export const updateFiles = ({ nodes, upsert }) => {
	return dispatch => {
		dispatch({
			type: ActionNames.UPDATE_FILES,
			extras: { nodes, upsert }
		});
		return Promise.resolve();
	};
};

export const createFile = ({ ownerName, repoName, node, match }) =>
	createAPI({
		method: "post",
		type: ActionNames.CREATE_FILE,
		params: [
			`${ownerName}/${repoName}/${URLs.Ajax}`,
			{
				action: "create",
				...node
			}
		],
		extras: { node, match }
	});
export const renameFile = ({ ownerName, repoName, nodeId, newName, matches }) =>
	createAPI({
		method: "post",
		type: ActionNames.RENAME_FILE,
		params: [
			`${ownerName}/${repoName}/${URLs.Ajax}`,
			{
				action: "rename",
				item: nodeId,
				overwrite: matches && matches.length,
				newname: newName
			}
		],
		extras: { nodeId, newName, matches }
	});
export const deleteFiles = ({ ownerName, repoName, nodeIds }) =>
	createAPI({
		method: "post",
		type: ActionNames.DELETE_FILES,
		params: [
			`${ownerName}/${repoName}/${URLs.Ajax}`,
			{
				action: "delete",
				item: nodeIds
			}
		],
		extras: nodeIds
	});
export const copyFiles = ({ ownerName, repoName, nodeIds, target, matches }) =>
	createAPI({
		method: "post",
		type: ActionNames.COPY_FILES,
		params: [
			`${ownerName}/${repoName}/${URLs.Ajax}`,
			{
				action: "copy",
				item: nodeIds,
				target,
				overwrite: matches && matches.length
			}
		],
		extras: { nodeIds, target, matches }
	});
export const moveFiles = ({ ownerName, repoName, nodeIds, target, matches }) =>
	createAPI({
		method: "post",
		type: ActionNames.MOVE_FILES,
		params: [
			`${ownerName}/${repoName}/${URLs.Ajax}`,
			{
				action: "move",
				item: nodeIds,
				target,
				overwrite: matches && matches.length
			}
		],
		extras: { nodeIds, target, matches }
	});

export const duplicateFiles = ({
	ownerName,
	repoName,
	nodeIds,
	newName,
	matches
}) =>
	createAPI({
		method: "post",
		type: ActionNames.DUPLICATE_FILES,
		params: [
			`${ownerName}/${repoName}/${URLs.Ajax}`,
			{
				action: "duplicate",
				item: nodeIds[0],
				overwrite: matches && matches.length,
				newname: newName
			}
		],
		extras: { nodeIds, newName, matches }
	});

export const setTopModule = ({
	ownerName,
	repoName,
	nodeId,
	module,
	moduleId
}) =>
	createAPI({
		method: "post",
		type: ActionNames.SET_TOP_MODULE,
		params: [
			`${ownerName}/${repoName}/${URLs.Ajax}`,
			{
				action: "settop",
				item: nodeId,
				module
			}
		],
		extras: { nodeId, module, moduleId }
	});

export const includeExcludeFiles = ({
	ownerName,
	repoName,
	nodeIds,
	isInclude
}) =>
	createAPI({
		method: "post",
		type: ActionNames.INCLUDE_EXCLUDE_IN_BUILD,
		params: [
			`${ownerName}/${repoName}/${URLs.Ajax}`,
			{
				action: isInclude ? "include" : "exclude",
				item: nodeIds
			}
		],
		extras: { nodeIds, isInclude }
	});

export const convertIntoVerilog = ({ ownerName, repoName, nodeId }) =>
	createAPI({
		method: "post",
		type: ActionNames.CONVERT_INTO_VERILOG_MODULE,
		params: [
			`${ownerName}/${repoName}/${URLs.Ajax}`,
			{
				action: "tbtoverilog",
				item: nodeId
			}
		],
		extras: { nodeId }
	});

export const convertIntoTestbench = ({ ownerName, repoName, nodeId }) =>
	createAPI({
		method: "post",
		type: ActionNames.CONVERT_INTO_TESTBENCH,
		params: [
			`${ownerName}/${repoName}/${URLs.Ajax}`,
			{
				action: "verilogtotb",
				item: nodeId
			}
		],
		extras: { nodeId }
	});

export const validate = ({ ownerName, repoName }) =>
	createAPI({
		method: "post",
		type: ActionNames.VALIDATE,
		params: [
			`${ownerName}/${repoName}/${URLs.Compile}`,
			{
				action: "validate"
			}
		]
	});
export const simulate = ({
	ownerName,
	repoName,
	nodeId,
	level,
	name,
	time,
	matches
}) =>
	createAPI({
		method: "post",
		type: ActionNames.SIMULATE,
		params: [
			`${ownerName}/${repoName}/${URLs.Ajax}`,
			{
				action: "simulate",
				item: nodeId,
				name,
				time,
				level,
				overwrite: matches && matches.length
			}
		],
		extras: { nodeId, matches, name }
	});
export const synthesize = ({
	ownerName,
	repoName,
	stdcell,
	matches,
	synthType,
	name,
	options,
	reportMatches
}) =>
	createAPI({
		method: "post",
		type: ActionNames.SYNTHESIZE,
		params: [
			`${ownerName}/${repoName}/${URLs.Compile}`,
			{
				action: "synthesize",
				name,
				synthType,
				overwrite: matches && matches.length,
				stdcell,
				options
			}
		],
		extras: { name, matches, synthType, reportMatches }
	});

export const compileSoftware = ({
	ownerName,
	repoName,
	matches,
	name,
	linker,
	startup,
	target,
	listMatches
}) =>
	createAPI({
		method: "post",
		type: ActionNames.COMPILE_SOFTWARE,
		params: [
			`${ownerName}/${repoName}/${URLs.Compile}`,
			{
				action: "sw",
				name,
				linker,
				overwrite: matches && matches.length,
				startup,
				target
			}
		],
		extras: { name, matches, listMatches }
	});

export const generateBitstream = ({
	ownerName,
	repoName,
	matches,
	name,
	pcf
}) =>
	createAPI({
		method: "post",
		type: ActionNames.GENERATE_BITSTREAM,
		params: [
			`${ownerName}/${repoName}/${URLs.Compile}`,
			{
				action: "bitstream",
				name,
				pcf,
				overwrite: matches && matches.length
			}
		],
		extras: { name, matches, pcf }
	});

export const downloadFile = ({ ownerName, repoName, nodeId }) =>
	createDownloadAPI({
		type: ActionNames.DOWNLOAD_FILE,
		method: "post",
		params: [`/${ownerName}/${repoName}/${URLs.Download}/${nodeId}`, {}]
	});
