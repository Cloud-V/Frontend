import { getRepository, setRepositorySettings } from "store/actions/repository";
import { getStandardCells, getBoards } from "store/actions/library";
import {
	saveEditorTab,
	closeEditorTab,
	createFile,
	copyFiles,
	moveFiles,
	duplicateFiles,
	deleteFiles,
	renameFile,
	setTopModule,
	includeExcludeFiles,
	convertIntoVerilog,
	convertIntoTestbench,
	validate,
	simulate,
	synthesize,
	generateBitstream,
	compileSoftware,
	updateFiles,
	downloadFile,
	openEditorTab,
	parseVerilogModules,
	selectEditorTab
} from "store/actions/files";
import { addLogs, setLogs, setLogTab } from "store/actions/workspace";

export default dispatch => {
	return {
		repositoryGet: ({ ownerName, repoName }) =>
			dispatch(
				getRepository({
					ownerName,
					repoName
				})
			),
		getStandardCells: ({ ownerName, repoName }) =>
			dispatch(
				getStandardCells({
					ownerName,
					repoName
				})
			),
		getBoards: ({ ownerName, repoName }) =>
			dispatch(
				getBoards({
					ownerName,
					repoName
				})
			),
		createFile: ({ ownerName, repoName, node, match }) =>
			dispatch(
				createFile({
					ownerName,
					repoName,
					node,
					match
				})
			),
		deleteFiles: ({ ownerName, repoName, nodeIds }) =>
			dispatch(
				deleteFiles({
					ownerName,
					repoName,
					nodeIds
				})
			),
		copyFiles: ({ ownerName, repoName, nodeIds, target, matches }) =>
			dispatch(
				copyFiles({
					ownerName,
					repoName,
					nodeIds,
					target,
					matches
				})
			),
		moveFiles: ({ ownerName, repoName, nodeIds, target, matches }) =>
			dispatch(
				moveFiles({
					ownerName,
					repoName,
					nodeIds,
					target,
					matches
				})
			),
		duplicateFiles: ({ ownerName, repoName, nodeIds, matches, newName }) =>
			dispatch(
				duplicateFiles({
					ownerName,
					repoName,
					nodeIds,
					matches,
					newName
				})
			),
		renameFile: ({ ownerName, repoName, nodeId, newName, matches }) =>
			dispatch(
				renameFile({
					ownerName,
					repoName,
					nodeId,
					newName,
					matches
				})
			),
		parseVerilogModules: ({ node, topModule, topModuleEntry }) =>
			dispatch(
				parseVerilogModules({
					node,
					topModule,
					topModuleEntry
				})
			),
		closeEditorTab: ({ node }) =>
			dispatch(
				closeEditorTab({
					node
				})
			),
		saveEditorTab: ({ ownerName, repoName, node, content }) =>
			dispatch(
				saveEditorTab({
					ownerName,
					repoName,
					node,
					content
				})
			),
		selectEditorTab: ({ node }) =>
			dispatch(
				selectEditorTab({
					node
				})
			),
		setTopModule: ({ ownerName, repoName, nodeId, module, moduleId }) =>
			dispatch(
				setTopModule({
					ownerName,
					repoName,
					nodeId,
					module,
					moduleId
				})
			),
		includeExcludeFiles: ({ ownerName, repoName, nodeIds, isInclude }) =>
			dispatch(
				includeExcludeFiles({
					ownerName,
					repoName,
					nodeIds,
					isInclude
				})
			),
		convertIntoVerilog: ({ ownerName, repoName, nodeId }) =>
			dispatch(
				convertIntoVerilog({
					ownerName,
					repoName,
					nodeId
				})
			),
		convertIntoTestbench: ({ ownerName, repoName, nodeId }) =>
			dispatch(
				convertIntoTestbench({
					ownerName,
					repoName,
					nodeId
				})
			),
		openEditorTab: ({ ownerName, repoName, node }) =>
			dispatch(
				openEditorTab({
					ownerName,
					repoName,
					node
				})
			),
		addLogs: ({ console, warnings, errors } = {}) =>
			dispatch(
				addLogs({
					console,
					warnings,
					errors
				})
			),
		setLogs: ({ console, warnings, errors } = {}) =>
			dispatch(
				setLogs({
					console,
					warnings,
					errors
				})
			),
		setLogTab: ({ id }) =>
			dispatch(
				setLogTab({
					id
				})
			),
		validate: ({ ownerName, repoName }) =>
			dispatch(
				validate({
					ownerName,
					repoName
				})
			),
		setRepositorySettings: ({ ownerName, repoName, settings }) =>
			dispatch(
				setRepositorySettings({
					ownerName,
					repoName,
					settings
				})
			),
		simulate: ({
			ownerName,
			repoName,
			nodeId,
			level,
			name,
			time,
			matches
		}) =>
			dispatch(
				simulate({
					ownerName,
					repoName,
					nodeId,
					level,
					name,
					time,
					matches
				})
			),
		updateFiles: ({ nodes, upsert }) =>
			dispatch(updateFiles({ nodes, upsert })),
		downloadFile: ({ ownerName, repoName, nodeId }) =>
			dispatch(downloadFile({ ownerName, repoName, nodeId })),
		synthesize: ({
			ownerName,
			repoName,
			stdcell,
			matches,
			synthType,
			name,
			options,
			reportMatches
		}) =>
			dispatch(
				synthesize({
					ownerName,
					repoName,
					stdcell,
					matches,
					synthType,
					name,
					options,
					reportMatches
				})
			),
		generateBitstream: ({ ownerName, repoName, matches, name, pcf }) =>
			dispatch(
				generateBitstream({
					ownerName,
					repoName,
					matches,
					name,
					pcf
				})
			),
		compileSoftware: ({
			ownerName,
			repoName,
			matches,
			name,
			target,
			linker,
			startup,
			listMatches
		}) =>
			dispatch(
				compileSoftware({
					ownerName,
					repoName,
					matches,
					name,
					target,
					linker,
					startup,
					listMatches
				})
			)
	};
};
