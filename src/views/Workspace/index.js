import React, { Component } from "react";

import { Alert } from "reactstrap";

import _ from "lodash";

import { Page404 } from "pages";

import Status from "store/utils/status";

import { connect } from "react-redux";

import { ToastContainer, Flip, toast } from "react-toastify";

import SquareSpinner from "partials/SquareSpinner";

// import Layout from './components/Layout';
import SplitPane from "react-split-pane";
import MenuBar from "views/Workspace/components/MenuBar";
import EditorTabs from "views/Workspace/components/EditorTabs";
import FileTree from "views/Workspace/components/FileTree";
import Logs from "views/Workspace/components/Logs";
import NewFileDialog from "./components/Dialogs/NewFileDialog";
import PromptDialog from "./components/Dialogs/PromptDialog";
import NewEntryDialog from "views/Workspace/components/Dialogs/NewEntryDialog.js";
import SimulationDialog from "views/Workspace/components/Dialogs/SimulationDialog.js";
import SynthesisDialog from "views/Workspace/components/Dialogs/SynthesisDialog.js";
import BitstreamDialog from "views/Workspace/components/Dialogs/BitstreamDialog.js";
import CompileSoftwareDialog from "views/Workspace/components/Dialogs/CompileSoftwareDialog.js";
import WorkspaceSettingsDialog from "views/Workspace/components/Dialogs/WorkspaceSettingsDialog.js";
import Short from "short-uuid";
import copy from "copy-to-clipboard";
import io from "socket.io-client";
import Storage from "storage";
import { URLs, StorageKeys } from '../../constants.js';

import {
	writeableFolders,
	// readonlyFolders,
	fileTypes,
	allFolderTypes,
	getRelativePath
} from "./components/FileTree/utils";

import { adjustExtension, removeExtension } from '../../constants.js';

import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";

const modalNames = {
	newVerilog: "NewVerilog",
	newFile: "NewFile",
	newEntry: "NewEntry",
	prompt: "Prompt",
	simulation: "Simulation",
	synthesis: "Synthesis",
	bitstream: "BitStream",
	compileSoftware: "CompileSoftware",
	workspaceSettings: "WorkspaceSettings"
};

class Workspace extends Component {
	constructor(props) {
		super(props);
		this.location = props.location;
		this.state = {
			repoName: this.props.match.params.repoName,
			ownerName: this.props.match.params.ownerName,
			rowHeight: 20,
			selectedKeys: [],
			theme: "light",
			promptTitle: "",
			promptBody: "",
			promptCallback: () => null,
			newEntryTitle: "",
			newEntryFieldName: "",
			newEntryDefaultFileName: "",
			newEntryType: "",
			newEntryCallback: () => null,
			..._.reduce(
				modalNames,
				(result, value, key) => {
					result[`modal${value}`] = false;
					return result;
				},
				{}
			),
			socketStatus: "pending",
			targetNode: null,
			newFileStep: 0,
			clipboard: { type: "none" },
			isValidating: false,
			isSimulating: false,
			isSynthesizing: false,
			isBitstreaming: false,
			isCompiling: false
		};
		this.toastError = this.toastError.bind(this);
		this.toastInfo = this.toastInfo.bind(this);
		this.toastSuccess = this.toastSuccess.bind(this);
		this.toastWarning = this.toastWarning.bind(this);
		this.toastMessage = this.toastMessage.bind(this);
		this.toggle = this.toggle.bind(this);
		this.onTabChange = this.onTabChange.bind(this);
		this.onDragFinished = this.onDragFinished.bind(this);
		this.showPrompt = this.showPrompt.bind(this);
		this.showNewEntryDialog = this.showNewEntryDialog.bind(this);
		this.openDialog = this.openDialog.bind(this);
		this.onNewFile = this.onNewFile.bind(this);
		this.onNewFolder = this.onNewFolder.bind(this);
		this.onCopy = this.onCopy.bind(this);
		this.onMove = this.onMove.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onRename = this.onRename.bind(this);
		this.copyFiles = this.copyFiles.bind(this);
		this.cutFiles = this.cutFiles.bind(this);
		this.canPaste = this.canPaste.bind(this);
		this.pasteFiles = this.pasteFiles.bind(this);
		this.renameFile = this.renameFile.bind(this);
		this.onDuplicate = this.onDuplicate.bind(this);
		this.duplicateFile = this.duplicateFile.bind(this);
		this.onCopyPath = this.onCopyPath.bind(this);
		this.onIncludeExclude = this.onIncludeExclude.bind(this);
		this.onSetTopModule = this.onSetTopModule.bind(this);
		this.onConvertToVerilog = this.onConvertToVerilog.bind(this);
		this.onConvertToTestbench = this.onConvertToTestbench.bind(this);
		this.onDownload = this.onDownload.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onSave = this.onSave.bind(this);
		this.saveAll = this.saveAll.bind(this);
		this.onNodeSelect = this.onNodeSelect.bind(this);
		this.onValidate = this.onValidate.bind(this);
		this.onSimulate = this.onSimulate.bind(this);
		this.onSynthesize = this.onSynthesize.bind(this);
		this.onBitstream = this.onBitstream.bind(this);
		this.onCompileSoftware = this.onCompileSoftware.bind(this);
		this.onOpenWorkspaceSettings = this.onOpenWorkspaceSettings.bind(this);
		this.simulationCallback = this.simulationCallback.bind(this);
		this.synthesisCallback = this.synthesisCallback.bind(this);
		this.workspaceSettingsCallback = this.workspaceSettingsCallback.bind(
			this
		);
		this.bitstreamCallback = this.bitstreamCallback.bind(this);
		this.compileSoftwareCallback = this.compileSoftwareCallback.bind(this);
		this.createEntry = this.createEntry.bind(this);
		this.renderDialogs = this.renderDialogs.bind(this);
		this.closeFile = this.closeFile.bind(this);
		this.checkFileConflict = this.checkFileConflict.bind(this);
		this.copyText = this.copyText.bind(this);
		this.connectSockets = this.connectSockets.bind(this);
		this.onSocketResult = this.onSocketResult.bind(this);
		this.onBatchSynthesisResult = this.onBatchSynthesisResult.bind(this);
		this.onOpenFile = this.onOpenFile.bind(this);
		this.getActiveEditor = this.getActiveEditor.bind(this);
		this.gotoLine = this.gotoLine.bind(this);
		this.setStateAsync = this.setStateAsync.bind(this);

		this.tabsRef = React.createRef();
		this.treeRef = React.createRef();
	}
	setStateAsync(updates) {
		return new Promise(resolve => {
			this.setState(updates, resolve);
		});
	}
	getActiveEditor() {
		return this.tabsRef.current.getWrappedInstance().tabRef.current;
	}
	gotoLine({ line, file }) {
		let tabRef = this.tabsRef.current.getWrappedInstance();
		if (!tabRef) {
			return;
		}
		if (!line) {
			return;
		}
		const editorRef = tabRef.editorRefs[file];
		if (!editorRef) {
			return;
		}
		const editor = (editorRef.editorRef.current || {}).editor;
		if (!editor) {
			return;
		}
		editor.gotoLine(line);
	}
	copyFiles(nodeIds) {
		this.setState({
			clipboard: {
				type: "copy",
				nodes: nodeIds
			}
		});
	}
	cutFiles(nodeIds) {
		this.setState({
			clipboard: {
				type: "cut",
				nodes: nodeIds
			}
		});
	}
	renameFile(nodes) {
		this.treeRef.current.getWrappedInstance().renameNode(nodes);
	}
	canPaste() {
		return (
			this.state.clipboard.type !== "none" &&
			this.state.clipboard.nodes &&
			this.state.clipboard.nodes.length
		);
	}
	pasteFiles(nodeIds) {
		if (this.canPaste() && nodeIds.length) {
			if (this.state.clipboard.type === "copy") {
				this.onCopy({
					source: this.state.clipboard.nodes,
					target: nodeIds[0]
				});
			} else if (this.state.clipboard.type === "cut") {
				this.onMove({
					source: this.state.clipboard.nodes,
					target: nodeIds[0]
				});
			}
		}
	}
	onNewFolder(selectedNodes, evt) {
		const files = this.props.files.get("data");
		const rootDir = files.find(file => file.type === "root");

		const filesMap = _.keyBy(this.props.files.get("data").toJS(), "id");
		if (selectedNodes.length === 0) {
			selectedNodes = [rootDir.id];
		} else if (selectedNodes.length > 1) {
			return console.warn("Cannot create entry under multiple parents");
		}
		let targetNode = _.map(selectedNodes, nodeId => filesMap[nodeId])[0];
		while (targetNode && !allFolderTypes.includes(targetNode.type)) {
			targetNode = filesMap[targetNode.parent];
		}
		if (!targetNode && !writeableFolders.includes(targetNode.type)) {
			return console.warn(
				"Cannot create entry under read-only directory"
			);
		}
		this.setState({ targetNode }, () => {
			return this.showNewEntryDialog({
				title: "New Folder",
				fieldName: "Folder Name:",
				callback: this.createEntry,
				type: "folder"
			});
		});
	}
	onCopy({ source, target }) {
		if (!source.length || !target) {
			return;
		}

		const { repository, copyFiles, files } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");
		const filesMap = _.keyBy(files.get("data").toJS(), "id");
		const selectedNodes = _.map(source, node => filesMap[node]);
		const matches = [];
		const names = {};
		selectedNodes.reduce((result, node) => {
			return result;
		}, []);
		for (let i = 0; i < selectedNodes.length; i++) {
			const node = selectedNodes[i];
			if (names[node.title]) {
				return this.toastError(
					`Cannot copy two items with the same name ${node.title}`
				);
			}
			names[node.title] = 1;
			const match = this.checkFileConflict(node, target);
			if (match) {
				if (match.status === "loading") {
					return this.toastError(
						"Cannot overwrite an entry while loading."
					);
				}
				matches.push(match);
			}
			if (node.parent === target) {
				return this.toastError(
					"Cannot copy a file to the same folder."
				);
			}
		}
		const _copy = async answer => {
			if (answer !== "yes") {
				return;
			}
			const action = await copyFiles({
				ownerName,
				repoName,
				nodeIds: source,
				target,
				matches
			});
			if (action.error && action.error.length) {
				return this.toastError(action.error);
			}
		};
		if (matches.length) {
			const entriesTitle =
				matches.length === 1
					? matches[0].title
					: `${matches.length} entries`;
			return this.showPrompt({
				title: `Overwrite ${entriesTitle}`,
				body: (
					<React.Fragment>
						{matches.length > 1
							? `${
									matches.length
							  } entries with the same name already exist. Would you like to overwrite?`
							: `An entry with the same name "${
									matches[0].title
							  }" already exists. Would you like to overwrite?`}
					</React.Fragment>
				),
				callback: _copy.bind(this)
			});
		}
		return _copy("yes");
	}
	onMove({ source, target }) {
		if (!source.length || !target) {
			return;
		}

		const { repository, moveFiles, files } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");
		const filesMap = _.keyBy(files.get("data").toJS(), "id");
		const selectedNodes = _.map(source, node => filesMap[node]);
		const matches = [];
		const names = {};
		selectedNodes.reduce((result, node) => {
			return result;
		}, []);
		for (let i = 0; i < selectedNodes.length; i++) {
			const node = selectedNodes[i];
			if (names[node.title]) {
				return this.toastError(
					`Cannot move two items with the same name ${node.title}.`
				);
			}
			names[node.title] = 1;

			const match = this.checkFileConflict(node, target);

			if (match) {
				if (match.status === "loading") {
					return this.toastError(
						"Cannot overwrite an entry while loading."
					);
				}
				matches.push(match);
			}
			if (node.parent === target) {
				return this.toastError(
					"Cannot move a file to the same folder."
				);
			}
		}
		const _move = async answer => {
			if (answer !== "yes") {
				return;
			}
			const action = await moveFiles({
				ownerName,
				repoName,
				nodeIds: source,
				target,
				matches
			});
			if (action.error && action.error.length) {
				return this.toastError(action.error);
			}
		};
		if (matches.length) {
			const entriesTitle =
				matches.length === 1
					? matches[0].title
					: `${matches.length} entries`;
			return this.showPrompt({
				title: `Overwrite ${entriesTitle}`,
				body: (
					<React.Fragment>
						{matches.length > 1
							? `${
									matches.length
							  } entries with the same name already exist. Would you like to overwrite?`
							: `An entry with the same name "${
									matches[0].title
							  }" already exists. Would you like to overwrite?`}
					</React.Fragment>
				),
				callback: _move.bind(this)
			});
		}
		return _move("yes");
	}
	onDelete(selectTreeNodes, evt) {
		if (!selectTreeNodes.length) {
			return;
		}

		const { repository, deleteFiles, files } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");
		const filesMap = _.keyBy(files.get("data").toJS(), "id");
		const selectedNodes = _.map(selectTreeNodes, node => filesMap[node]);
		return this.showPrompt({
			title: `Delete ${
				selectedNodes.length > 1
					? `${selectedNodes.length} entries`
					: selectedNodes[0].title
			}`,
			body: (
				<React.Fragment>
					Are you sure you want to delete{" "}
					<b>
						{selectedNodes.length > 1
							? `${selectedNodes.length} entries`
							: selectedNodes[0].title}
					</b>
				</React.Fragment>
			),
			callback: answer => {
				if (answer !== "yes") {
					return;
				}
				this.treeRef.current
					.getWrappedInstance()
					.onNodeSelect([], null, () =>
						deleteFiles({
							ownerName,
							repoName,
							nodeIds: selectTreeNodes
						})
					);
			}
		});
	}
	onRename(selectedTreeNode, newName, oldName) {
		const { repository, files, renameFile } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");

		const file = (
			files.get("data").find(el => el.id === selectedTreeNode) || {
				toJS: () => null
			}
		).toJS();
		if (!file) {
			return;
		}
		if (file.status === "loading") {
			return this.toastError("Cannot rename a file while loading");
		}
		const fileTypeData = fileTypes[file.type];
		if (!fileTypeData) {
			return;
		}
		const extension = fileTypeData.extension || "";
		newName = adjustExtension(newName, extension);
		if (newName === oldName || newName.length === extension.length) {
			return;
		}
		const matches = [];
		const match = this.checkFileConflict(
			Object.assign({}, file, { title: newName, text: newName }),
			file.parent
		);
		if (match) {
			if (match.status === "loading") {
				return this.toastError(
					"Cannot overwrite a file while it is loading."
				);
			}
			matches.push(match);
		}
		const _rename = async answer => {
			if (answer !== "yes") {
				return;
			}
			const action = await renameFile({
				ownerName,
				repoName,
				nodeId: selectedTreeNode,
				newName,
				matches
			});
			if (action.error && action.error.length) {
				return this.toastError(action.error);
			}
		};
		if (matches.length) {
			/*return this.showPrompt({
				title: `Overwrite ${newName}`,
				body: (
					<React.Fragment>
						An entry with the same name {newName} already exsists,
						do you want to overwrite?
					</React.Fragment>
				),
				callback: _rename.bind(this)
			});*/
			return this.toastError(
				`A file with the same name "${newName}" already exists.`
			);
		}
		return _rename("yes");
	}
	onDuplicate(selectedTreeNodes, evt) {
		if (!selectedTreeNodes.length) {
			return;
		}
		const targetNode = this.props.files
			.get("data")
			.find(el => el.get("id") === selectedTreeNodes[0])
			.toJS();
		if (!targetNode) {
			return;
		}
		const fileTypeData = fileTypes[targetNode.type];
		if (!fileTypeData) {
			return;
		}
		const extension = fileTypeData.extension || "";
		let fileNameWithoutExt = removeExtension(
			targetNode.title || targetNode.text,
			extension
		);
		let index = 2;
		const currentIndexMatches = /_(\d+)$/.exec(fileNameWithoutExt);
		if (currentIndexMatches) {
			index = parseInt(currentIndexMatches[1], 10) || 2;
			index++;
			fileNameWithoutExt = fileNameWithoutExt.substr(
				0,
				fileNameWithoutExt.length - 1 - currentIndexMatches[1].length
			);
		}
		let newName = fileNameWithoutExt + "_" + index + extension;
		const found = el => (el.get("title") || el.get("text")) === newName;
		while (this.props.files.get("data").find(found)) {
			index++;
			newName = fileNameWithoutExt + "_" + index + extension;
		}
		this.setState({ targetNode }, () => {
			return this.showNewEntryDialog({
				title: "Duplicate file",
				fieldName: "New file name:",
				callback: this.duplicateFile,
				type: targetNode.type,
				defaultFileName: newName
			});
		});
	}
	async duplicateFile(fileData, done) {
		const { repository } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");

		const { targetNode } = this.state;
		const fileTypeData = fileTypes[targetNode.type];
		if (!fileTypeData) {
			return;
		}
		const extension = fileTypeData.extension || "";
		const newName = adjustExtension(fileData.fileName, extension);
		const matches = [];
		const match = this.checkFileConflict(
			Object.assign({}, targetNode, { title: newName, text: newName }),
			targetNode.parent
		);
		if (match) {
			matches.push(match);
			return this.toastError(
				`An entry with the same name ${newName} already exists.`
			);
		}
		done();
		const action = await this.props.duplicateFiles({
			ownerName,
			repoName,
			nodeIds: [targetNode.id],
			matches,
			newName
		});
		if (action.error && action.error.length) {
			return this.toastError(action.error);
		}
	}
	onCopyPath(selectedTreeNode, evt) {
		const file = this.props.files
			.get("data")
			.find(el => el.get("id") === selectedTreeNode);
		if (!file) {
			return;
		}
		this.copyText(
			getRelativePath(file.toJS(), this.props.files.get("data").toJS())
		);
	}
	async onIncludeExclude(isInclude, selectedTreeNodes, evt) {
		if (!selectedTreeNodes.length) {
			return;
		}
		const { files, repository } = this.props;
		const selectionMap = _.keyBy(selectedTreeNodes);
		const targetNodes = files
			.get("data")
			.filter(el => selectionMap[el.get("id")])
			.toJS();
		if (_.some(targetNodes, el => el.status === "loading")) {
			return this.toastError("Cannot update a file while loading.");
		}
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");

		const action = await this.props.includeExcludeFiles({
			ownerName,
			repoName,
			nodeIds: selectedTreeNodes,
			isInclude
		});
		if (action.error && action.error.length) {
			return this.toastError(action.error);
		}
	}
	async onSetTopModule(selectedTreeNode, evt) {
		const { repository, files } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");

		const file = (
			files.get("data").find(el => el.id === selectedTreeNode) || {
				toJS: () => null
			}
		).toJS();
		if (!file) {
			return;
		}
		if (file.status === "loading") {
			return this.toastError("Cannot update a module while loading.");
		}
		const topModuleFile = (
			files.get("data").find(el => el.id === file.parent) || {
				toJS: () => null
			}
		).toJS();
		if (!topModuleFile) {
			return;
		}
		const action = await this.props.setTopModule({
			ownerName,
			repoName,
			nodeId: topModuleFile.id,
			module: file.title || file.text,
			moduleId: file.id
		});
		if (action.error && action.error.length) {
			return this.toastError(action.error);
		}
	}
	async onConvertToVerilog(selectedTreeNode, evt) {
		const { files, repository } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");

		const file = files
			.get("data")
			.find(el => el.get("id") === selectedTreeNode);
		if (!file) {
			return;
		}
		if (file.get("status") === "loading") {
			return this.toastError("Cannot update a file while loading.");
		}
		const action = await this.props.convertIntoVerilog({
			ownerName,
			repoName,
			nodeId: selectedTreeNode
		});
		if (action.error && action.error.length) {
			return this.toastError(action.error);
		}
	}
	async onConvertToTestbench(selectedTreeNode, evt) {
		const { files, repository } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");

		const file = files
			.get("data")
			.find(el => el.get("id") === selectedTreeNode);
		if (!file) {
			return;
		}
		if (file.get("status") === "loading") {
			return this.toastError("Cannot update a file while loading.");
		}
		const action = await this.props.convertIntoTestbench({
			ownerName,
			repoName,
			nodeId: selectedTreeNode
		});
		if (action.error && action.error.length) {
			return this.toastError(action.error);
		}
	}
	async onDownload(selectedTreeNode, evt) {
		const { files, repository } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");
		const file = (
			files.get("data").find(el => el.id === selectedTreeNode) || {
				toJS: () => null
			}
		).toJS();
		if (!file) {
			return;
		}
		if (file.status === "loading") {
			return this.toastError("Cannot download a file while loading.");
		}
		const action = await this.props.downloadFile({
			ownerName,
			repoName,
			nodeId: selectedTreeNode
		});
		if (action.error && action.error.length) {
			return this.toastError(action.error);
		}
	}
	onClose(selectedTreeNode, evt) {
		const file = (
			this.props.files
				.get("data")
				.find(el => el.id === selectedTreeNode) || { toJS: () => null }
		).toJS();
		if (file) {
			return this.closeFile(file);
		}
	}
	async onSave(tab) {
		const { repository } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");
		const topModule = repository.get("data").get("topModule") || "";

		const topModuleEntry =
			repository.get("data").get("topModuleEntry") || "";

		if (tab.dirty) {
			const action = await this.props.saveEditorTab({
				ownerName,
				repoName,
				node: tab,
				content: tab.content
			});
			if (!action || action.error) {
				return this.toastError(action.error);
			}
			if (tab.type === "verilog") {
				return this.props.parseVerilogModules({
					node: tab,
					topModule,
					topModuleEntry
				});
			}
		}
	}
	async saveAll() {
		const dirty = this.props.files.get(
			"data"
		).toJS().filter(tab=> tab.dirty);
		for (let tab of dirty) {
			await this.onSave(tab);
		}
	}
	closeFile(tab) {
		const { repository } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");
		if (!tab || tab.closed) {
			return;
		}

		if (tab.dirty) {
			this.showPrompt({
				title: (
					<React.Fragment>
						Close <b>{tab.title}</b>
					</React.Fragment>
				),
				body: (
					<React.Fragment>
						Do you want to save the changes you made to{" "}
						<b>{tab.title}</b>?
					</React.Fragment>
				),
				callback: async response => {
					if (response === "yes") {
						const action = await this.props.saveEditorTab({
							ownerName,
							repoName,
							node: tab,
							content: tab.content
						});
						if (!action || action.error) {
							return this.toastError(action.error);
						}
						return this.props.closeEditorTab({ node: tab });
					} else if (response === "no") {
						this.props.closeEditorTab({
							node: tab
						});
					}
				}
			});
		} else {
			this.props.closeEditorTab({ node: tab });
		}
	}

	copyText(text) {
		return copy(text, {
			debug: false,
			message: "Press Ctrl/CMD + C to copy"
		});
	}

	checkFileConflict(node, parentId) {
		const { files, repository } = this.props;
		parentId =
			parentId || node.parent || repository.get("data").get("buildDir");
		const parentNode = files
			.get("data")
			.find(el => el.id === parentId)
			.toJS();
		const childrenMap = files.get("data").reduce((result, el) => {
			if (el.parent === parentNode.id) {
				result[el.title] = el.toJS();
			}
			return result;
		}, {});
		return (
			childrenMap[
				node.fileName || node.title || node.text || node.text
			] || null
		);
	}

	createEntry(fileData, done = () => null) {
		const { repository, files } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");
		const _create = async (match = {}, answer) => {
			const { matchNode } = match || {};
			if (answer !== "yes") {
				return;
			}
			if (matchNode) {
				if (matchNode.status === "loading") {
					return this.toastError(
						"Cannot overwrite a file while it is loading."
					);
				}
				if (
					matchNode.type === "folder" &&
					files
						.get("data")
						.count(el => el.get("parent") === matchNode.id)
				) {
					return this.toastError(
						"Cannot overwrite a non-empty folder"
					);
				}
			}
			let overwrite = !!matchNode;
			fileData.overwrite = overwrite;
			fileData.name = fileData.fileName;
			fileData.id = Short.generate();
			done();
			const action = await this.props.createFile({
				ownerName,
				repoName,
				node: fileData,
				match: matchNode
			});
			if (action.error && action.error.length) {
				return this.toastError(action.error);
			}
			const id = action.result.fileId;
			if (action.result.fileType === "verilog") {
				this.treeRef.current.getWrappedInstance().expandNode(id);
			}
			this.onTabChange({ id });
		};

		let matchNode = this.checkFileConflict(
			fileData,
			fileData.parent || null
		);

		if (matchNode) {
			return this.showPrompt({
				title: `Overwrite ${fileData.fileName}`,
				body: (
					<React.Fragment>
						<b>{fileData.fileName}</b> already exists, do you want
						to overwrite it?
					</React.Fragment>
				),
				callback: _create.bind(this, { matchNode })
			});
		}
		return _create(null, "yes");
	}

	onNodeSelect(selectedKeys) {
		this.setState({ selectedKeys });
	}

	async onSimulate(targetNode) {
		await this.saveAll();
		if (targetNode) {
			const filesMap = _.keyBy(this.props.files.get("data").toJS(), "id");
			targetNode = filesMap[targetNode];
			this.setState({ targetNode }, () =>
				this.openDialog(modalNames.simulation)
			);
		}
	}
	onBitstream(targetNode) {
		this.setState({ targetNode }, () =>
			this.openDialog(modalNames.bitstream)
		);
	}
	onCompileSoftware(targetNode) {
		this.setState({ targetNode }, () =>
			this.openDialog(modalNames.compileSoftware)
		);
	}
	onOpenWorkspaceSettings() {
		this.openDialog(modalNames.workspaceSettings);
	}

	async onSynthesize() {
		await this.saveAll();
		this.openDialog(modalNames.synthesis);
	}

	async onValidate() {
		await this.saveAll();

		const { repository } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");
		if (this.state.isValidating) {
			return;
		}

		await this.setStateAsync({ isValidating: true });
		const startingLogs = [
			{
				message: `=== Validation started at ${new Date()}`,
				noCount: true
			}
		];
		await this.props.setLogs({
			console: startingLogs,
			errors: [],
			warnings: []
		});
		const action = await this.props.validate({ ownerName, repoName });
		await this.setStateAsync({ isValidating: false });

		if (action.error && action.error.length) {
			return this.toastError(action.error);
		}
		let logsTab = "console";
		const logs = action.result.logs || [];
		const errors = action.result.errors || [];
		const warnings = action.result.warnings || [];

		if (warnings.length) {
			logsTab = "warnings";
		}
		if (errors.length) {
			logsTab = "errors";
			this.toastError("The repository did not pass the validation.");
		} else if (warnings.length) {
			this.toastWarning(
				"The repository passed the validation with warning(s)."
			);
		} else {
			this.toastSuccess(
				"The repository passed the validation successfully."
			);
		}
		const endingLogs = [
			{
				message: `=== Validation ended at ${new Date()}`,
				noCount: true
			}
		];

		await this.props.setLogTab({ id: logsTab });
		await this.props.addLogs({ console: logs, errors, warnings });
		await this.props.addLogs({
			console: endingLogs,
			errors: [],
			warnings: []
		});
	}

	simulationCallback({ level, simulationTime, fileName }, done) {
		const { targetNode } = this.state;
		const { repository } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");

		if (this.state.isSimulating) {
			return;
		}

		if (!targetNode) {
			return;
		}
		if (targetNode.status === "loading") {
			return this.toastError("Cannot start a new simulation while one is already loading.");
		}
		fileName = adjustExtension(fileName, ".vcd");
		const matches = [];
		const match = this.checkFileConflict({ fileName });
		if (match) {
			if (match.status === "loading") {
				return this.toastError(
					"Cannot overwrite a file while it is loading."
				);
			}
			matches.push(match);
		}
		const _simulate = async answer => {
			if (answer !== "yes") {
				return;
			}
			done();

			await this.setStateAsync({ isSimulating: true });

			const startingLogs = [
				{
					message: `=== Simulation started at ${new Date()}`,
					noCount: true
				}
			];
			await this.props.setLogs({
				console: startingLogs,
				errors: [],
				warnings: []
			});
			const action = await this.props.simulate({
				ownerName,
				repoName,
				nodeId: targetNode.id,
				name: fileName,
				level,
				time: simulationTime,
				matches
			});

			await this.setStateAsync({ isSimulating: false });

			if (action.error && action.error.length) {
				return this.toastError(action.error);
			}

			let logsTab = "console";
			const { log: logs, errors, warnings } =
				action.result || action.error;

			if (warnings.length) {
				logsTab = "warnings";
			}
			if (errors.length) {
				logsTab = "errors";
			}
			const endingLogs = [
				{
					message: `=== Simulation ended at ${new Date()}`,
					noCount: true
				}
			];
			if (!errors.length) {
				this.onOpenFile(
					this.props.files
						.get("data")
						.find(el => el.get("id") === action.result.fileId)
						.toJS()
				);

				await this.props.setLogTab({ id: logsTab });
			} else {
				await this.props.setLogTab({ id: "errors" });
			}
			await this.props.addLogs({
				console: logs,
				errors,
				warnings
			});
			await this.props.addLogs({
				console: endingLogs,
				errors: [],
				warnings: []
			});
		};
		if (matches.length) {
			return this.showPrompt({
				title: `Overwrite ${fileName}`,
				body: (
					<React.Fragment>
						<b>{fileName}</b> already exists. Would you like to
						overwrite it?
					</React.Fragment>
				),
				callback: _simulate.bind(this)
			});
		}

		return _simulate("yes");
	}

	compileSoftwareCallback({ linker, startup, target, fileName }, done) {
		const { repository } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");
		if (this.state.isCompiling) {
			return;
		}
		fileName = adjustExtension(fileName, ".hex");
		const swHexFolder = this.props.files
			.get("data")
			.find(el => el.get("type") === "swHexFolder");
		if (!swHexFolder) {
			done();
			return this.toastError(
				`Project appears to be corrupt: Unable to find the software build folder.`
			);
		}
		const matches = [];
		const match = this.checkFileConflict(
			{
				title: fileName,
				text: fileName
			},
			swHexFolder.get("id")
		);
		if (match) {
			if (match.status === "loading") {
				return this.toastError(
					"Cannot overwrite a file while it is loading."
				);
			}
			matches.push(match);
		}
		const listName = fileName + ".lst";

		const listMatches = [];
		const reportMatch = this.checkFileConflict(
			{
				title: listName,
				text: listName
			},
			swHexFolder.get("id")
		);
		if (reportMatch) {
			listMatches.push(reportMatch);
		}
		const _compile = async answer => {
			if (answer !== "yes") {
				return;
			}
			done();

			await this.setStateAsync({ isCompiling: true });
			const startingLogs = [
				{
					message: `=== Software compilation started at ${new Date()}`,
					noCount: true
				}
			];
			await this.props.setLogs({
				console: startingLogs,
				errors: [],
				warnings: []
			});
			const action = await this.props.compileSoftware({
				ownerName,
				repoName,
				name: fileName,
				target,
				linker,
				startup,
				matches,
				listMatches
			});
			await this.setStateAsync({ isCompiling: false });
			if (action.error) {
				if (action.error.length) {
					return this.toastError(action.error);
				}
				console.error(action.error);
				return this.toastError("An unknown error has occurred. Please contact support.");
			}
			const { log } = action.result;
			const logs = [
				...(action.result.log.report || "")
					.split("\n")
					.filter(el => el.trim() !== "")
					.map(message => ({ message })),
				...(log.logs || [])
			];
			const { errors, warnings } = log;

			let logsTab = "console";

			if (warnings.length) {
				logsTab = "warnings";
			}
			if (errors.length) {
				logsTab = "errors";
			}
			const endingLogs = [
				{
					message: `=== Software compilation ended at ${new Date()}`,
					noCount: true
				}
			];
			await this.props.setLogTab({ id: logsTab });
			await this.props.addLogs({
				console: logs.map(message =>
					typeof message === "string" ? { message } : message
				),
				errors: errors.map(message =>
					typeof message === "string" ? { message } : message
				),
				warnings: warnings.map(message =>
					typeof message === "string" ? { message } : message
				)
			});
			await this.props.addLogs({
				console: endingLogs,
				errors: [],
				warnings: []
			});
			if (!errors.length) {
				this.toastSuccess(
					"Software compilation completed successfully."
				);
			} else {
				this.toastError("Software compilation failed.");
			}
		};
		if (matches.length) {
			return this.showPrompt({
				title: `Overwrite ${fileName}`,
				body: (
					<React.Fragment>
						<b>{fileName}</b> already exists. Would you like to
						overwrite it?
					</React.Fragment>
				),
				callback: _compile.bind(this)
			});
		}
		_compile("yes");
	}
	bitstreamCallback({ pcf, fileName }, done) {
		const { repository } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");
		if (this.state.isBitstreaming) {
			return;
		}
		fileName = adjustExtension(fileName, ".bin");
		const matches = [];
		const match = this.checkFileConflict({
			title: fileName,
			text: fileName
		});
		if (match) {
			if (match.status === "loading") {
				return this.toastError(
					"Cannot overwrite a file while it is loading."
				);
			}
			matches.push(match);
		}

		const _bitstream = async answer => {
			if (answer !== "yes") {
				return;
			}
			done();

			await this.setStateAsync({ isBitstreaming: true });
			const startingLogs = [
				{
					message: `=== Bitstream generation started at ${new Date()}`,
					noCount: true
				}
			];
			await this.props.setLogs({
				console: startingLogs,
				errors: [],
				warnings: []
			});
			const action = await this.props.generateBitstream({
				ownerName,
				repoName,
				name: fileName,
				pcf,
				matches
			});
			await this.setStateAsync({ isBitstreaming: false });
			if (action.error && action.error.length) {
				return this.toastError(action.error);
			}
			const { log } = action.result;
			const logs = [
				...(action.result.log.report || "")
					.split("\n")
					.filter(el => el.trim() !== "")
					.map(message => ({ message })),
				...(log.logs || [])
			];
			const { errors, warnings } = log;

			let logsTab = "console";

			if (warnings.length) {
				logsTab = "warnings";
			}
			if (errors.length) {
				logsTab = "errors";
			}
			const endingLogs = [
				{
					message: `=== Bitstream generation ended at ${new Date()}`,
					noCount: true
				}
			];
			await this.props.setLogTab({ id: logsTab });
			await this.props.addLogs({
				console: logs.map(message =>
					typeof message === "string" ? { message } : message
				),
				errors: errors.map(message =>
					typeof message === "string" ? { message } : message
				),
				warnings: warnings.map(message =>
					typeof message === "string" ? { message } : message
				)
			});
			await this.props.addLogs({
				console: endingLogs,
				errors: [],
				warnings: []
			});
			if (!errors.length) {
				this.toastSuccess(
					"Bitstream generation completed successfully."
				);
			} else {
				this.toastError("Bitstream generation failed.");
			}
		};
		if (matches.length) {
			return this.showPrompt({
				title: `Overwrite ${fileName}`,
				body: (
					<React.Fragment>
						<b>{fileName}</b> already exists. Would you like to
						overwrite it?
					</React.Fragment>
				),
				callback: _bitstream.bind(this)
			});
		}
		_bitstream("yes");
	}

	async workspaceSettingsCallback(settings, done) {
		const { repository } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");
		const action = await this.props.setRepositorySettings({
			ownerName,
			repoName,
			settings
		});
		if (action.error && action.error.length) {
			return this.toastError(action.error);
		}
		return done();
	}
	synthesisCallback(snythData, done) {
		const { repository } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");
		if (this.state.isSynthesizing) {
			return;
		}
		let {
			buffering,
			stdcell,
			fileName,
			dcf: constraintsFile,
			timing: timingReport,
			explore,
			strategy,
			constraints,
			schematic,
			synthType,
			sizing
		} = snythData;
		const isAsync = synthType === "async";
		fileName = adjustExtension(fileName, ".v");
		const reportName = removeExtension(fileName, ".v") + ".rpt.txt";
		const matches = [];
		const match = this.checkFileConflict({
			title: fileName,
			text: fileName
		});
		if (match) {
			if (match.status === "loading") {
				return this.toastError(
					"Cannot overwrite a file while it is loading."
				);
			}
			matches.push(match);
		}
		const reportMatches = [];
		const reportMatch = this.checkFileConflict({
			title: reportName,
			text: reportName
		});
		if (reportMatch) {
			reportMatches.push(reportMatch);
		}
		const _synthesize = async answer => {
			if (answer !== "yes") {
				return;
			}
			done();

			await this.setStateAsync({ isSynthesizing: true });
			const startingLogs = isAsync
				? []
				: [
						{
							message: `=== Synthesis started at ${new Date()}`,
							noCount: true
						}
				  ];
			await this.props.setLogs({
				console: startingLogs,
				errors: [],
				warnings: []
			});
			const action = await this.props.synthesize({
				ownerName,
				repoName,
				stdcell,
				matches,
				synthType,
				name: fileName,
				options: {
					explore,
					strategy,
					constraints,
					sizing,
					buffering,
					timingReport,
					schematic,
					constraintsFile
				},
				reportMatches
			});
			await this.setStateAsync({ isSynthesizing: false });
			if (action.error && action.error.length) {
				return this.toastError(action.error);
			}
			if (isAsync) {
				await this.props.setLogTab({ id: "console" });
				return await this.props.addLogs({
					console: [
						{
							message: `Asynchronous Synthesis job submitted at ${new Date()}`,
							noCount: true
						}
					]
				});
			}
			const { log } = action.result;
			const logs = [
				...(action.result.log.report || "")
					.split("\n")
					.filter(el => el.trim() !== "")
					.map(message => ({ message })),
				...(log.logs || [])
			];
			const { errors, warnings } = log;

			let logsTab = "console";

			if (warnings.length) {
				logsTab = "warnings";
			}
			if (errors.length) {
				logsTab = "errors";
			}
			const endingLogs = [
				{
					message: `=== Synthesis ended at ${new Date()}`,
					noCount: true
				}
			];
			await this.props.setLogTab({ id: logsTab });
			await this.props.addLogs({
				console: logs.map(message =>
					typeof message === "string" ? { message } : message
				),
				errors: errors.map(message =>
					typeof message === "string" ? { message } : message
				),
				warnings: warnings.map(message =>
					typeof message === "string" ? { message } : message
				)
			});
			await this.props.addLogs({
				console: endingLogs,
				errors: [],
				warnings: []
			});
		};
		if (matches.length) {
			return this.showPrompt({
				title: `Overwrite ${fileName}`,
				body: (
					<React.Fragment>
						<b>{fileName}</b> already exists. Would you like to
						overwrite it?
					</React.Fragment>
				),
				callback: _synthesize.bind(this)
			});
		}
		_synthesize("yes");
	}
	onNewFile(selectedNodes, evt) {
		const files = this.props.files.get("data");
		const rootDir = files.find(file => file.type === "root");

		const filesMap = _.keyBy(this.props.files.get("data").toJS(), "id");
		if (selectedNodes.length === 0) {
			selectedNodes = [rootDir.id];
		} else if (selectedNodes.length > 1) {
			return console.warn(
				"Cannot create an entry under multiple parents."
			);
		}
		let targetNode = _.map(selectedNodes, nodeId => filesMap[nodeId])[0];
		while (targetNode && !allFolderTypes.includes(targetNode.type)) {
			targetNode = filesMap[targetNode.parent];
		}
		if (!targetNode && !writeableFolders.includes(targetNode.type)) {
			return console.warn(
				"Cannot create an entry under a read-only directory."
			);
		}
		this.setState({ targetNode: targetNode, newFileStep: 0 }, () => {
			this.openDialog(modalNames.newFile);
		});
	}

	showNewEntryDialog({ title, fieldName, type, defaultFileName, callback }) {
		this.setState(
			{
				newEntryTitle: title,
				newEntryFieldName: fieldName,
				newEntryCallback: callback,
				newEntryType: type,
				newEntryDefaultFileName: defaultFileName || ""
			},
			() => {
				this.openDialog(modalNames.newEntry);
			}
		);
	}

	onTabChange({ id }) {
		this.treeRef.current.getWrappedInstance().selectTreeNode({
			id
		});
	}
	showPrompt({ title, body, callback }) {
		this.setState(
			{
				promptTitle: title,
				promptBody: body,
				promptCallback: callback
			},
			() => {
				this.openDialog(modalNames.prompt);
			}
		);
	}
	onDragFinished(e) {
		if (this.tabsRef.current) {
			this.tabsRef.current.getWrappedInstance().refreshEditors();
		}
	}
	openDialog(modalName, cb) {
		const modalKey = `modal${modalName}`;
		this.setState(
			{
				[modalKey]: true
			},
			cb
		);
	}
	toggle(modalName) {
		const modalKey = `modal${modalName}`;
		return () => {
			this.setState(prevState => ({
				[modalKey]: !prevState[modalKey]
			}));
		};
	}
	async componentDidMount() {
		const { ownerName, repoName } = this.state;

		await this.props.repositoryGet({
			ownerName,
			repoName
		});
		await this.props.getStandardCells({
			ownerName,
			repoName
		});
		await this.props.getBoards({
			ownerName,
			repoName
		});
		this.connectSockets();

		const { repository } = this.props;

		if (repository.get("data").get("isTrial")) {
			this.toastInfo(
				"Thanks for trying Cloud V! This is a playground that will be accessible for 1 hour from creation. Want permanent projects? Sign up! It's free!",
				10000
			);
			document.title = `Temporary Playground - Cloud V`;
		} else {
			document.title = `${ownerName}/${repoName} - Cloud V`;
		}
	}
	connectSockets() {
		const { repository } = this.props;
		const ownerName = repository.get("data").get("ownerName");
		const repoName = repository.get("data").get("repoName");
		const socket = (this.socket = io(URLs.Default, {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax: 5000,
			reconnectionAttempts: 10,
			query: {
				ownerName,
				repoName
			}
		}));
		// let retryId;
		// let retryCount = 1;
		socket.on("authenticated", data => null);
		socket.on("unauthorized", err => {
			console.error("Unauthorized", err);
			this.toastError("There was an error with the authentication");
		});
		socket.on("connect", () => {
			this.setState({ socketStatus: "online" });
			const { user } = this.props;
			let token = user.get("data").get("token");
			if (!token) {
				try {
					token = JSON.parse(Storage.get(StorageKeys.TrialUser))
						.token;
					if (!token) {
						return this.toastError(
							"Socket authentication failed, try refreshing the page."
						);
					}
				} catch (err) {
					console.error(err);
					return this.toastError(
						"Socket authentication failed, try refreshing the page."
					);
				}
			}
			socket.emit("authentication", {
				token
			});
		});
		socket.on("result", this.onSocketResult);
		socket.on("disconnect", reason => {
			this.setState({ socketStatus: "offline" }, () => {
				if (reason === "io server disconnect") {
					return socket.connect();
				}
				console.error(reason);
			});
		});
	}
	onSocketResult(data) {
		if (data && data.type === "synthesis") {
			return this.onBatchSynthesisResult(data);
		}
	}
	async onOpenFile(node) {
		const { repository, files } = this.props;

		const nodeId = node.id;
		const nodeType = node.type;
		const fileTypeData = fileTypes[nodeType];
		const repoName = this.props.repository.get("data").get("repoName");
		const ownerName = this.props.repository.get("data").get("ownerName");
		const topModule = repository.get("data").get("topModule") || "";
		const topModuleEntry =
			repository.get("data").get("topModuleEntry") || "";
		const fileNode = files
			.get("data")
			.find(el => el.id === nodeId)
			.toJS();
		if (fileNode.status === "loading") {
			return;
		}
		if (fileTypeData && fileTypeData.folder) {
			return this.treeRef.current.getWrappedInstance().expandNode(nodeId);
		}
		if (fileTypeData && fileTypeData.readable) {
			const tabs = files.get("data").filter(el => !el.closed);
			const tab = tabs.find(tab => tab.get("id") === nodeId);
			if (tab) {
				await this.props.selectEditorTab({
					node: tab
				});
				if (this.props.onTabChange) {
					this.props.onTabChange({
						id: nodeId
					});
				}
				return Promise.resolve(true);
			} else {
				if (
					!["ace", "waveform", "dcf", "pcf"].includes(
						fileTypeData.editor
					)
				) {
					return;
				}
				const action = await this.props.openEditorTab({
					ownerName,
					repoName,
					node
				});
				if (!action || action.error) {
					return this.toastError(action.error);
				}
				const newTab = this.props.files
					.get("data")
					.filter(el => !el.closed)
					.find(tab => tab.get("id") === nodeId)
					.toJS();
				if (newTab.type === "verilog") {
					this.treeRef.current
						.getWrappedInstance()
						.expandNode(nodeId);
					await this.props.parseVerilogModules({
						node: newTab,
						topModule,
						topModuleEntry
					});
				}
				this.treeRef.current
					.getWrappedInstance()
					.selectTreeNode(newTab);
				if (this.props.onTabChange) {
					await this.props.onTabChange({
						id: nodeId
					});
				}
				return Promise.resolve(true);
			}
		}
		return Promise.resolve(false);
	}
	async onBatchSynthesisResult(data) {
		const { synthLog } = data;
		const { errors, warnings } = synthLog;
		const logs = (synthLog.report || "")
			.split("\n")
			.filter(el => el.trim() !== "")
			.map(message => ({ message }))
			.concat(synthLog.logs || []);
		const { entry: netlistEntry, reportEntry, repoId } = data;
		if (this.props.repository.get("data").get("_id") !== repoId) {
			return;
		}

		const isSuccess = !errors.length;

		let logsTab = "console";

		if (warnings.length) {
			logsTab = "warnings";
		}
		if (errors.length) {
			logsTab = "errors";
		}
		const date = new Date();
		const completedStartMessage = {
			message: `=== Asynchronous Synthesis job ${
				isSuccess ? "completed" : "failed"
			} at ${date}`,
			noCount: true
		};
		const completedEndMessage = {
			message: `=== Asynchronous Synthesis job ${
				isSuccess ? "completed" : "failed"
			} at ${date} end of logs`,
			noCount: true
		};
		if (isSuccess) {
			this.toastSuccess(
				`Asynchronous Synthesis job completed successfully.`
			);
		} else {
			this.toastError(`Asynchronous Synthesis job failed.`);
		}
		await this.props.updateFiles({
			nodes: [
				Object.assign(
					netlistEntry,
					isSuccess ? { active: true, closed: false } : {}
				)
			].concat(reportEntry ? [reportEntry] : []),
			upsert: true
		});
		await this.props.setLogTab({ id: logsTab });
		await this.props.addLogs({
			console: [completedStartMessage]
				.concat(logs)
				.concat(completedEndMessage),
			warnings: [].concat(warnings).concat([]),
			errors: [].concat(errors).concat([])
		});
	}
	toastError(msg, autoClose) {
		return this.toastMessage(
			<div className="d-flex align-items-center">
				<i
					className="fa fa-2x fa-times-circle mr-3"
					aria-hidden="true"
				/>
				{msg}
			</div>,
			toast.TYPE.ERROR,
			autoClose
		);
	}
	toastWarning(msg, autoClose) {
		return this.toastMessage(
			<div className="d-flex align-items-center">
				<i
					className="fa fa-2x fa-exclamation-circle mr-3"
					aria-hidden="true"
				/>
				{msg}
			</div>,
			toast.TYPE.WARNING,
			autoClose
		);
	}
	toastInfo(msg, autoClose) {
		return this.toastMessage(
			<div className="d-flex align-items-center">
				<i
					className="fa fa-2x fa-info-circle mr-3"
					aria-hidden="true"
				/>
				{msg}
			</div>,
			toast.TYPE.INFO,
			autoClose
		);
	}
	toastSuccess(msg, autoClose) {
		return this.toastMessage(
			<div className="d-flex align-items-center">
				<i
					className="fa fa-2x fa-check-circle mr-3"
					aria-hidden="true"
				/>
				{msg}
			</div>,
			toast.TYPE.SUCCESS,
			autoClose
		);
	}
	toastMessage(msg, type = toast.TYPE.DEFAULT, autoClose = 5000) {
		return (this.toastId = toast(msg, {
			type,
			transition: Flip,
			position: toast.POSITION.TOP_RIGHT,
			autoClose,
			closeButton: false
		}));
	}

	render() {
		const { repository, library } = this.props;
		if (repository.get("statusCode") === 404) {
			return <Page404 />;
		} else if (
			repository.get("status") === "error" ||
			library.get("status") === "error"
		) {
			return (
				<Alert color="danger">
					{repository.get("error").toString()}
					{library.get("error").toString()}
				</Alert>
			);
		} else if (
			repository.get("status") === Status.Loading ||
			repository.get("data").get("_id") === "" ||
			library.get("status") === Status.Loading
		) {
			return (
				<div className="flex-1 h-100 mt-15 d-flex justify-content-center align-items-center">
					<SquareSpinner />
				</div>
			);
		}
		const topModule = repository.get("data").get("topModule") || "";
		// const topModuleEntry = repository.get('data').get('topModuleEntry');
		return (
			<div
				className={`workspace theme-wrapper theme-${this.state.theme}`}
			>
				<MenuBar
					className="d-flex flex-1"
					theme={this.state.theme}
					selectedKeys={this.state.selectedKeys}
					topModule={topModule}
					onNewFile={this.onNewFile}
					onNewFolder={this.onNewFolder}
					onCopy={this.onCopy}
					onMove={this.onMove}
					onDelete={this.onDelete}
					onRename={this.onRename}
					onDuplicate={this.onDuplicate}
					onCopyPath={this.onCopyPath}
					onIncludeExclude={this.onIncludeExclude}
					onSetTopModule={this.onSetTopModule}
					onConvertToVerilog={this.onConvertToVerilog}
					onConvertToTestbench={this.onConvertToTestbench}
					onDownload={this.onDownload}
					onClose={this.onClose}
					onNodeSelect={this.onNodeSelect}
					onSimulate={this.onSimulate}
					onBitstream={this.onBitstream}
					onSynthesize={this.onSynthesize}
					onValidate={this.onValidate}
					onCompileSoftware={this.onCompileSoftware}
					socketStatus={this.state.socketStatus}
					onOpenFile={this.onOpenFile}
					onSave={this.onSave}
					saveAll={this.saveAll}
					copyFiles={this.copyFiles}
					cutFiles={this.cutFiles}
					pasteFiles={this.pasteFiles}
					canPaste={this.canPaste}
					isSimulating={this.state.isSimulating}
					isSynthesizing={this.state.isSynthesizing}
					isValidating={this.state.isValidating}
					onOpenWorkspaceSettings={this.onOpenWorkspaceSettings}
				/>
				<ToastContainer />
				{this.renderDialogs()}
				<div className="splitters-container">
					<SplitPane
						split="vertical"
						className="w-100 h-100"
						minSize={window.screen.width / 15}
						defaultSize={window.screen.width / 5}
						onDragFinished={this.onDragFinished}
					>
						<div
							className="layout-wrapper files-tree-layout-wrapper"
							key="file-tree"
						>
							<FileTree
								ref={this.treeRef}
								onTabChange={this.onTabChange}
								toastError={this.toastError}
								onNewFile={this.onNewFile}
								onNewFolder={this.onNewFolder}
								copyFiles={this.copyFiles}
								cutFiles={this.cutFiles}
								pasteFiles={this.pasteFiles}
								canPaste={this.canPaste}
								onMove={this.onMove}
								onDelete={this.onDelete}
								onRename={this.onRename}
								onDuplicate={this.onDuplicate}
								onCopyPath={this.onCopyPath}
								onIncludeExclude={this.onIncludeExclude}
								onSetTopModule={this.onSetTopModule}
								onConvertToVerilog={this.onConvertToVerilog}
								onConvertToTestbench={this.onConvertToTestbench}
								onDownload={this.onDownload}
								onClose={this.onClose}
								onNodeSelect={this.onNodeSelect}
								onSimulate={this.onSimulate}
								onBitstream={this.onBitstream}
								onCompileSoftware={this.onCompileSoftware}
								onOpenFile={this.onOpenFile}
							/>
						</div>
						<SplitPane
							split="horizontal"
							className="w-100 h-100 editor-logs-splitter"
							minSize={window.screen.height / 5}
							defaultSize={window.screen.height / 2}
							onDragFinished={this.onDragFinished}
						>
							<div
								className="layout-wrapper editors-layout-wrapper"
								key="editors"
							>
								<EditorTabs
									ref={this.tabsRef}
									showPrompt={this.showPrompt}
									onTabChange={this.onTabChange}
									toastError={this.toastError}
									onNewFile={() => {
										this.onNewFile(this.state.selectedKeys);
									}}
									onSave={this.onSave}
									selectedKeys={this.state.selectedKeys}
									closeFile={this.closeFile}
									theme={this.state.theme}
								/>
							</div>
							<div
								className="layout-wrapper logs-layout-wrapper"
								key="logs"
							>
								<Logs
									onOpenFile={this.onOpenFile}
									gotoLine={this.gotoLine}
									copyText={this.copyText}
								/>
							</div>
						</SplitPane>
					</SplitPane>
				</div>
			</div>
		);
	}

	renderDialogs() {
		const { repository } = this.props;

		const topModule = repository.get("data").get("topModule") || "";

		return (
			<React.Fragment>
				<NewFileDialog
					modal={this.state[`modal${modalNames.newFile}`]}
					toastError={this.toastError}
					toggle={this.toggle(modalNames.newFile)}
					theme={this.state.theme}
					targetNode={this.state.targetNode}
					newFileStep={this.state.newFileStep}
					onNext={() => {
						this.setState(prevState => ({
							newFileStep: prevState.newFileStep + 1
						}));
					}}
					onCreate={fileData =>
						this.createEntry(
							fileData,
							this.toggle(modalNames.newFile)
						)
					}
				/>
				<PromptDialog
					modal={this.state[`modal${modalNames.prompt}`]}
					toggle={this.toggle(modalNames.prompt)}
					title={this.state.promptTitle}
					body={this.state.promptBody}
					callback={this.state.promptCallback}
					theme={this.state.theme}
				/>
				<NewEntryDialog
					modal={this.state[`modal${modalNames.newEntry}`]}
					toggle={this.toggle(modalNames.newEntry)}
					title={this.state.newEntryTitle}
					fieldName={this.state.newEntryFieldName}
					callback={fileData =>
						this.state.newEntryCallback(
							fileData,
							this.toggle(modalNames.newEntry)
						)
					}
					theme={this.state.theme}
					targetNode={this.state.targetNode}
					type={this.state.newEntryType}
					defaultFileName={this.state.newEntryDefaultFileName}
				/>
				<SimulationDialog
					modal={this.state[`modal${modalNames.simulation}`]}
					toggle={this.toggle(modalNames.simulation)}
					callback={fileData =>
						this.simulationCallback(
							fileData,
							this.toggle(modalNames.simulation)
						)
					}
					theme={this.state.theme}
					targetNode={this.state.targetNode}
				/>
				<SynthesisDialog
					modal={this.state[`modal${modalNames.synthesis}`]}
					toggle={this.toggle(modalNames.synthesis)}
					callback={fileData =>
						this.synthesisCallback(
							fileData,
							this.toggle(modalNames.synthesis)
						)
					}
					theme={this.state.theme}
					topModule={topModule}
				/>
				<WorkspaceSettingsDialog
					modal={this.state[`modal${modalNames.workspaceSettings}`]}
					toggle={this.toggle(modalNames.workspaceSettings)}
					callback={wsData =>
						this.workspaceSettingsCallback(
							wsData,
							this.toggle(modalNames.workspaceSettings)
						)
					}
					theme={this.state.theme}
					topModule={topModule}
				/>
				<BitstreamDialog
					modal={this.state[`modal${modalNames.bitstream}`]}
					toggle={this.toggle(modalNames.bitstream)}
					callback={fileData =>
						this.bitstreamCallback(
							fileData,
							this.toggle(modalNames.bitstream)
						)
					}
					theme={this.state.theme}
					topModule={topModule}
				/>
				<CompileSoftwareDialog
					modal={this.state[`modal${modalNames.compileSoftware}`]}
					toggle={this.toggle(modalNames.compileSoftware)}
					callback={fileData =>
						this.compileSoftwareCallback(
							fileData,
							this.toggle(modalNames.compileSoftware)
						)
					}
					theme={this.state.theme}
					topModule={topModule}
				/>
			</React.Fragment>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Workspace);
