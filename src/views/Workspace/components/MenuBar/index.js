import React, { Component } from "react";

import {} from "reactstrap";
import { connect } from "react-redux";
import Menu, { SubMenu, MenuItem, Divider } from "rc-menu";
import _ from "lodash";
import mapDispatchToProps from "./mapDispatchToProps";
import mapStateToProps from "./mapStateToProps";
import menus from "./menus";

class MenuBar extends Component {
	constructor(props) {
		super(props);
		this.renderMenu = this.renderMenu.bind(this);
		this.isMenuEnabled = this.isMenuEnabled.bind(this);
		this.onMenuClicked = this.onMenuClicked.bind(this);
		this.renderSpinner = this.renderSpinner.bind(this);
	}
	renderSpinner() {
		return (
			<div className="sk-circle menu-spinner">
				<div className="sk-circle1 sk-child" />
				<div className="sk-circle2 sk-child" />
				<div className="sk-circle3 sk-child" />
				<div className="sk-circle4 sk-child" />
				<div className="sk-circle5 sk-child" />
				<div className="sk-circle6 sk-child" />
				<div className="sk-circle7 sk-child" />
				<div className="sk-circle8 sk-child" />
				<div className="sk-circle9 sk-child" />
				<div className="sk-circle10 sk-child" />
				<div className="sk-circle11 sk-child" />
				<div className="sk-circle12 sk-child" />
			</div>
		);
	}
	isMenuEnabled(key) {
		let hasModule = false;
		let hasBuildFolder = false;
		let hasSWFolder = false;
		let hasSWHexFolder = false;
		let hasTestbench = false;
		let hasRoot = false;

		const { files, selectedKeys: currentTreeSelection } = this.props;
		const isEntrySelected = !!currentTreeSelection.length;
		const isOneSelected = currentTreeSelection.length === 1;
		const isMultipleSelected = currentTreeSelection.length > 1;
		const filesMap = _.keyBy(files.get("data").toJS(), "id");

		const selectionMap = _.reduce(
			currentTreeSelection,
			(result, value, key) => {
				if (!filesMap[value]) {
					return result;
				}
				if (
					filesMap[value].type === "module" ||
					filesMap[value].type === "topmodule"
				) {
					hasModule = true;
				} else if (filesMap[value].type === "swFolder") {
					hasSWFolder = true;
				} else if (filesMap[value].type === "buildFolder") {
					hasBuildFolder = true;
				} else if (filesMap[value].type === "swHexFolder") {
					hasSWHexFolder = true;
				} else if (filesMap[value].type === "root") {
					hasRoot = true;
				} else if (filesMap[value].type === "testbench") {
					hasTestbench = true;
				}
				if (
					["c", "h", "verilog", "folder"].includes(
						filesMap[value].type
					)
				) {
					// hasIncluded = true;
				} else if (
					["exC", "exH", "exverilog", "exfolder"].includes(
						filesMap[value].type
					)
				) {
					// hasExcluded = true;
				} else {
					// hasNoIncludeExclude = true;
				}
				result[value] = true;
				return result;
			},
			{}
		);

		const repository = this.props.repository.get("data").toJS();
		const { buildDir, swDir, swHexDir } = repository;
		const isBuildFolder = isOneSelected && selectionMap[buildDir];
		const isSWFolder = isOneSelected && selectionMap[swDir];
		const isSWHexFolder = isOneSelected && selectionMap[swHexDir];

		let targetNode = false;
		if (isOneSelected) {
			targetNode = filesMap[currentTreeSelection[0]];
		}
		
		const isRoot =
			isOneSelected && targetNode && targetNode.type === "root";
		const isFolder =
			isOneSelected &&
			targetNode &&
			(targetNode.type === "folder" ||
				targetNode.type === "root" ||
				targetNode.type === "exfolder");
		const isModule =
			isOneSelected &&
			targetNode &&
			(targetNode.type === "module" || targetNode.type === "topmodule");

		const isNetlist =
			isOneSelected && targetNode && targetNode.type === "netlist";
		const isVCD = isOneSelected && targetNode && targetNode.type === "vcd";
		const isBinary =
			isOneSelected && targetNode && targetNode.type === "bin";
		const isReport =
			isOneSelected && targetNode && targetNode.type === "srpt";
		const isReadonly = isNetlist || isVCD || isBinary || isReport;

		switch (key) {
			case "open": {
				return isOneSelected && !isFolder && !isRoot && !isModule;
			}
			case "newfile": {
				return (
					!hasModule &&
					!isMultipleSelected &&
					!isBuildFolder &&
					!isSWHexFolder &&
					!isReadonly
				);
			}
			case "newfolder": {
				return (
					!hasModule &&
					!isMultipleSelected &&
					!isBuildFolder &&
					!isSWHexFolder &&
					!isReadonly
				);
			}
			case "save": {
				return (
					files
						.get("data")
						.findIndex(el => el.get("active") && el.get("dirty")) >
						-1 && filesMap[currentTreeSelection[0]]
				); //To-Fix
			}
			case "saveAll": {
				return true;
			}
			case "search": {
				return false;
			}
			case "closetab": {
				return (
					isOneSelected &&
					!isBuildFolder &&
					!isSWHexFolder &&
					!isSWFolder &&
					!hasModule &&
					!isFolder
				);
			}
			case "exit": {
				return true;
			}
			case "refresh": {
				return false;
			}
			case "copy": {
				return (
					isEntrySelected &&
					!hasModule &&
					!hasRoot &&
					!hasBuildFolder &&
					!hasSWHexFolder &&
					!hasSWFolder &&
					!isReadonly
				);
			}
			case "cut": {
				return (
					isEntrySelected &&
					!hasModule &&
					!hasRoot &&
					!hasBuildFolder &&
					!hasSWHexFolder &&
					!hasSWFolder &&
					!isReadonly
				);
			}
			case "paste": {
				return (
					isEntrySelected &&
					isFolder &&
					!isReadonly &&
					this.props.canPaste()
				); //To-Fix
			}
			case "rename": {
				return (
					isEntrySelected &&
					!isModule &&
					!isBuildFolder &&
					!isRoot &&
					!isSWHexFolder &&
					!isSWFolder &&
					isOneSelected
				);
			}
			case "delete":
			case "remove": {
				return (
					isEntrySelected &&
					!hasModule &&
					!hasBuildFolder &&
					!hasSWFolder &&
					!hasSWHexFolder &&
					!hasRoot
				);
			}
			case "duplicate": {
				return (
					isEntrySelected &&
					!isModule &&
					!isFolder &&
					!isBuildFolder &&
					!isRoot &&
					!isSWHexFolder &&
					!isSWFolder &&
					isOneSelected &&
					!isReadonly
				);
			}
			case "download": {
				return (
					isEntrySelected &&
					!isBuildFolder &&
					!isRoot &&
					!isSWHexFolder &&
					!isSWFolder &&
					!isModule &&
					!isFolder &&
					isOneSelected
				);
			}
			case "undo": {
				return false; //To-Fix
			}
			case "redo": {
				return false; //To-Fix
			}
			case "selectall": {
				return false;
			}
			case "find": {
				return false; //To-Fix
			}
			case "findAndReplace": {
				return false; //To-Fix
			}
			case "validateProject": {
				return true;
			}
			case "synthesize": {
				return repository.topModule && repository.topModule.length;
			}
			case "simulate": {
				return isOneSelected && hasTestbench;
			}
			case "generateBitstream": {
				return (
					this.props.files
						.get("data")
						.find(el => el.get("type") === "pcf") &&
					repository.topModule
				);
			}
			case "compileSoftware": {
				return (
					this.props.files
						.get("data")
						.find(el => el.get("type") === "linker") &&
					this.props.files
						.get("data")
						.find(el => el.get("type") === "startup")
				);
			}
			case "workspaceSettings": {
				return true;
			}
			case "sta": {
				return false;
			}
			case "synthesisReport": {
				return false;
			}
			case "knowledgebase": {
				return true;
			}
			case "reportBug": {
				return true;
			}
			default: {
				return true;
			}
		}
	}
	onMenuClicked({ key }) {
		const { files, selectedKeys: currentTreeSelection } = this.props;
		const filesMap = _.keyBy(files.get("data").toJS(), "id");
		switch (key) {
			case "open": {
				return this.props.onOpenFile(filesMap[currentTreeSelection[0]]);
			}
			case "newfile": {
				return this.props.onNewFile(currentTreeSelection);
			}
			case "newfolder": {
				return this.props.onNewFolder(currentTreeSelection);
			}
			case "save": {
				return this.props.onSave(filesMap[currentTreeSelection[0]]);
			}
			case "saveall": {
				return this.props.saveAll();
			}
			case "search": {
				return false;
			}
			case "closetab": {
				return currentTreeSelection.length
					? this.props.onClose(currentTreeSelection[0])
					: false;
			}
			case "exit": {
				window.location.href = '/';
				return true;
			}
			case "refresh": {
				return false;
			}
			case "copy": {
				return this.props.copyFiles(currentTreeSelection);
			}
			case "cut": {
				return this.props.cutFiles(currentTreeSelection);
			}
			case "paste": {
				return this.props.pasteFiles(currentTreeSelection);
			}
			case "rename": {
				return this.props.renameFile(currentTreeSelection);
			}
			case "delete":
			case "remove": {
				return this.props.onDelete(currentTreeSelection);
			}
			case "duplicate": {
				return this.props.onDuplicate(currentTreeSelection);
			}
			case "download": {
				return currentTreeSelection.length
					? this.props.onDownload(currentTreeSelection[0])
					: null;
			}
			case "undo": {
				return false; //To-Fix
			}
			case "redo": {
				return false; //To-Fix
			}
			case "selectall": {
				return false;
			}
			case "find": {
				return false; //To-Fix
			}
			case "findAndReplace": {
				return false; //To-Fix
			}
			case "validateProject":
			case "validate": {
				return this.props.onValidate();
			}
			case "synthesize": {
				return this.props.onSynthesize();
			}
			case "simulate": {
				return this.props.onSimulate(currentTreeSelection[0]);
			}
			case "generateBitstream": {
				return this.props.onBitstream();
			}
			case "compileSoftware": {
				return this.props.onCompileSoftware();
			}
			case "workspaceSettings": {
				return this.props.onOpenWorkspaceSettings();
			}
			case "sta": {
				return false;
			}
			case "synthesisReport": {
				return false;
			}
			case "about": {
				return false;
			}
			case "knowledgebase": {
				return window.open("https://github.com/Cloud-V/Documentation/wiki");
			}
			case "reportBug": {
				return window.open("https://github.com/Cloud-V/Issues/issues/new");
			}
			default: {
				return true;
			}
		}
	}
	renderMenu(menu) {
		const menuItemClass = "menubar-item";
		const submenuClass = `menubar-submenu menubar-submenu-primary theme-${this
			.props.theme || "light"}`;
		const popupOffset = [0, 0];
		if (menu.divider) {
			return menu.visible && <Divider key={menu.id} />;
		}

		if (menu.children) {
			return (
				menu.visible && (
					<SubMenu
						className={submenuClass}
						popupOffset={popupOffset}
						title={menu.title}
						key={menu.id}
					>
						{_.map(menu.children, this.renderMenu)}
					</SubMenu>
				)
			);
		}
		return (
			menu.visible && (
				<MenuItem
					className={menuItemClass}
					key={menu.id}
					disabled={!this.isMenuEnabled(menu.id)}
				>
					{menu.title}
				</MenuItem>
			)
		);
	}
	render() {
		const files = this.props.files.get("data").toJS();
		const { selectedKeys } = this.props;
		let selectionMap = _.keyBy(selectedKeys);
		const selection = files.filter(file => selectionMap[file.id]);
		selectionMap = _.keyBy(selection, "id");
		return (
			<div className="menubar">
				<Menu
					className="menubar-core"
					onClick={this.onMenuClicked}
					mode="horizontal"
					openAnimation="slide-up"
					getPopupContainer={() =>
						document.querySelector("#root .workspace")
					}
				>
					{_.map(menus, this.renderMenu)}
					<MenuItem
						key="status"
						className={
							"pull-right menubar-item menubar-action-item menubar-status"
						}
					>
						{this.props.socketStatus === "online" ? (
							<span
								title="Online"
								className="menubar-status-indicator online"
							/>
						) : this.props.socketStatus === "offline" ? (
							<span
								title="Offline"
								className="menubar-status-indicator offline"
							/>
						) : (
							<span
								title="Connecting"
								className="menubar-status-indicator pending"
							/>
						)}
						&nbsp;
					</MenuItem>
					<MenuItem
						key="simulate"
						title={
							!(
								selection.length === 1 &&
								selection[0].type === "testbench"
							)
								? "You need to select a testbench file"
								: this.props.isSimulating
								? "Simulation is in progress.."
								: ""
						}
						disabled={
							!(
								selection.length === 1 &&
								selection[0].type === "testbench"
							) || this.props.isSimulating
						}
						className={
							"pull-right menubar-item menubar-action-item"
						}
					>
						{this.props.isSimulating ? (
							this.renderSpinner()
						) : (
							<i className="far fa-hourglass mr-2" />
						)}
						Simulate
					</MenuItem>
					<MenuItem
						key="synthesize"
						disabled={
							!this.props.topModule.length ||
							this.props.isSynthesizing
						}
						title={
							!this.props.topModule.length
								? "You need to set a top-module first"
								: this.props.isSynthesizing
								? "Synthesis is in progress.."
								: ""
						}
						className={
							"pull-right menubar-item menubar-action-item"
						}
					>
						{this.props.isSynthesizing ? (
							this.renderSpinner()
						) : (
							<i className="fa fa-bolt mr-2" />
						)}
						Synthesize
					</MenuItem>
					<MenuItem
						key="validate"
						disabled={this.props.isValidating}
						title={
							this.props.isValidating
								? "Validation is in progress"
								: ""
						}
						className={
							"pull-right menubar-item menubar-action-item"
						}
					>
						{this.props.isValidating ? (
							this.renderSpinner()
						) : (
							<i className="icomoon icon-validate mr-2" />
						)}
						Validate
					</MenuItem>
				</Menu>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuBar);
