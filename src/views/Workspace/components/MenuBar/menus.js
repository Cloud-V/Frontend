// import _ from "lodash";
// import { creatableFiles } from "./utils";

export const menuFile = {
	id: "file",
	title: "File",
	visible: true,
	disabled: false,
	children: [
		{
			id: "open",
			title: "Open",
			visible: true,
			disabled: false,
			handler: "open"
		},
		{
			id: "newfile",
			title: "New File",
			visible: true,
			disabled: false,
			handler: "newfile"
		},
		{
			id: "newfolder",
			title: "New Folder",
			visible: true,
			disabled: false,
			handler: "newfolder"
		},
		{
			id: "save",
			title: "Save",
			visible: true,
			disabled: false,
			handler: "save"
		},
		{
			id: "saveall",
			title: "Save All",
			visible: true,
			disabled: false,
			handler: "saveall"
		},
		{
			id: "search",
			title: "Search",
			visible: true,
			disabled: false,
			handler: "search"
		},
		{
			id: "file-divider-1",
			divider: true,
			visible: true
		},
		{
			id: "closetab",
			title: "Close Tab",
			visible: true,
			disabled: false,
			handler: "closeTab"
		},
		{
			id: "workspaceSettings",
			title: "Workspace Settings",
			visible: true,
			disabled: false,
			handler: "workspaceSettings"
		},
		{
			id: "exit",
			title: "Exit Workspace",
			visible: true,
			disabled: false,
			handler: "exitWorkspace"
		}
	]
};

export const menuEdit = {
	id: "edit",
	title: "Edit",
	visible: true,
	disabled: false,
	children: [
		{
			id: "refresh",
			title: "Refresh",
			visible: true,
			disabled: false,
			handler: "refresh"
		},
		{
			id: "edit-divider-1",
			divider: true,
			visible: true
		},
		{
			id: "copy",
			title: "Copy",
			visible: true,
			disabled: false,
			handler: "copy"
		},
		{
			id: "cut",
			title: "Cut",
			visible: true,
			disabled: false,
			handler: "cut"
		},
		{
			id: "paste",
			title: "Paste",
			visible: true,
			disabled: false,
			handler: "paste"
		},
		{
			id: "rename",
			title: "Rename",
			visible: true,
			disabled: false,
			handler: "rename"
		},
		{
			id: "remove",
			title: "Delete",
			visible: true,
			disabled: false,
			handler: "remove"
		},
		{
			id: "edit-divider-2",
			divider: true,
			visible: true
		},
		{
			id: "duplicate",
			title: "Duplicate",
			visible: true,
			disabled: false,
			handler: "duplicate"
		},
		{
			id: "download",
			title: "Download File",
			visible: true,
			disabled: false,
			handler: "download"
		},
		{
			id: "edit-divider-3",
			divider: true,
			visible: true
		},
		{
			id: "undo",
			title: "Undo",
			visible: true,
			disabled: false,
			handler: "undo"
		},
		{
			id: "redo",
			title: "Redo",
			visible: true,
			disabled: false,
			handler: "redo"
		},
		{
			id: "selectall",
			title: "Select All",
			visible: true,
			disabled: false,
			handler: "selectall"
		},
		{
			id: "find",
			title: "Find",
			visible: true,
			disabled: false,
			handler: "find"
		},
		{
			id: "findAndReplace",
			title: "Find and Replace",
			visible: true,
			disabled: false,
			handler: "findAndReplace"
		}
	]
};

export const menuProject = {
	id: "project",
	title: "Actions",
	visible: true,
	disabled: false,
	children: [
		{
			id: "validateProject",
			title: "Validate Project",
			visible: true,
			disabled: false,
			handler: "validateProject"
		},
		{
			id: "synthesize",
			title: "Synthesize",
			visible: true,
			disabled: false,
			handler: "synthesize"
		},
		{
			id: "simulate",
			title: "Simulate",
			visible: true,
			disabled: false,
			handler: "simulate"
		},
		{
			id: "generateBitstream",
			title: "Generate Bitstream",
			visible: true,
			disabled: false,
			handler: "generateBitstream"
		},
		{
			id: "compileSoftware",
			title: "Compile Software Files",
			visible: true,
			disabled: false,
			handler: "compileSoftware"
		}
	]
};

export const menuPostSynthesis = {
	id: "postsynthesis",
	title: "Post-Synthesis",
	visible: true,
	disabled: false,
	children: [
		{
			id: "sta",
			title: "Static Timing Analysis",
			visible: true,
			disabled: true,
			handler: "sta"
		},
		{
			id: "synthesisReport",
			title: "Synthesis Report",
			visible: true,
			disabled: true,
			handler: "synthesisReport"
		}
	]
};
export const menuHelp = {
	id: "help",
	title: "Help",
	visible: true,
	disabled: false,
	children: [
		{
			id: "knowledgebase",
			title: "Knowledgebase",
			visible: true,
			disabled: false,
			handler: "knowledgebase"
		},
		{
			id: "reportBug",
			title: "Report a Bug",
			visible: true,
			disabled: false,
			handler: "reportBug"
		}
	]
};
const menus = [menuFile, menuEdit, menuProject, menuHelp];

export default menus;
