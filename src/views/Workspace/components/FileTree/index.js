import React, { Component } from "react";
import PropTypes from "prop-types";

import _ from "lodash";

import { Alert } from "reactstrap";
import { connect } from "react-redux";
import {
    ContextMenu,
    MenuItem as ContextMenuItem,
    ContextMenuTrigger,
} from "react-contextmenu";

import mapDispatchToProps from "./mapDispatchToProps";
import mapStateToProps from "./mapStateToProps";
import SquareSpinner from "partials/SquareSpinner";
import Status from "store/utils/status";
import "modules/rc-tree/assets/index.css";

import Tree from "modules/rc-tree";
import {
    generateFilesTree,
    // eslint-disable-next-line
    folderTypes,
    fileTypes,
} from "./utils";

const CONTEXT_KEY = "file-tree-context";

const Icon = function (node, onDoubleClick) {
    const nodeType = node.type;
    const file = this.props.files.get("data").find((el) => el.id === node.id);
    let isLoading = false;
    if (file) {
        isLoading = file.get("status") === "loading";
    }
    const iconClassName =
        (
            fileTypes[nodeType] || {
                icon: "blank",
            }
        ).icon || "blank";
    return (
        <span
            className={`rc-tree-item-custom-icon file-icon ${
                isLoading ? "loading" : iconClassName
            }`}
            onDoubleClick={(e) =>
                onDoubleClick ? onDoubleClick(e, node) : null
            }
        />
    );
};

const wrapIconDoubleClick = function (onDoubleClick) {
    return function (node) {
        return Icon.bind(this)(node, onDoubleClick);
    }.bind(this);
};
Icon.propTypes = {
    selected: PropTypes.bool,
};

class FileTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedContextKeys: [],
            currentTreeSelection: [],
            expandedKeys: [],
            renameNode: "",
            renameNodeTitle: "",
            clipboard: { type: "none" },
        };
        this.renderConexteMenu = this.renderConexteMenu.bind(this);
        this.onRightClick = this.onRightClick.bind(this);
        this.onNodeSelect = this.onNodeSelect.bind(this);
        this.onNodeDoubleClick = this.onNodeDoubleClick.bind(this);
        this.onNodeRename = this.onNodeRename.bind(this);
        this.selectTreeNode = this.selectTreeNode.bind(this);
        this.renameNode = this.renameNode.bind(this);
        this.copyPath = this.copyPath.bind(this);
        this.contextMenuRef = React.createRef();
        this.treeRef = React.createRef();

        this.treeData = [];
    }
    onNodeRename(nodeKey, newName, oldName) {
        this.setState({
            renameNode: "",
            renameNodeTitle: "",
        });
        newName = (newName || "").trim();
        if (newName.length && newName !== oldName) {
            this.props.onRename(nodeKey, newName, oldName);
        }
    }

    copyPath(nodes) {
        if (nodes.length) {
            this.props.onCopyPath(nodes[0]);
        }
    }
    renameNode(nodes) {
        if (nodes.length) {
            const renameNodeTitle = this.props.files
                .get("data")
                .find((el) => el.get("id") === nodes[0])
                .get("text");
            this.setState({
                renameNode: nodes[0],
                renameNodeTitle,
            });
        }
    }
    selectTreeNode({ id }, nativeEvent) {
        if (this.state.currentTreeSelection.includes(id)) {
            return;
        }
        this.treeRef.current.onNodeSelect(
            {
                nativeEvent: nativeEvent || {
                    ctrlKey: false,
                    shiftKey: false,
                },
            },
            {
                props: {
                    selected: false,
                    eventKey: id,
                },
            }
        );
    }

    expandNode(key) {
        if (!this.state.expandedKeys.includes(key))
            this.setState({ expandedKeys: [...this.state.expandedKeys, key] });
    }
    async componentDidMount() {
        const { repository } = this.props;
        const ownerName = repository.get("data").get("ownerName");
        const repoName = repository.get("data").get("repoName");
        const action = await this.props.getRepositoryFiles({
            ownerName,
            repoName,
        });
        if (action.error && action.error.length) {
            return;
        }
        this.setState({
            expandedKeys: [
                ...(Array.isArray(this.treeData) && this.treeData.length
                    ? [this.treeData[0].key]
                    : []),
            ],
        });

        return Promise.resolve();
    }
    onRightClick = (info) => {
        info.event.persist();
        const alreadySelected = this.state.selectedContextKeys.includes(
            info.node.props.eventKey
        );
        this.setState(
            {
                selectedContextKeys: [info.node.props.eventKey],
            },
            () => {
                this.selectTreeNode(
                    { id: info.node.props.eventKey },
                    Object.assign(
                        {},
                        info.event.nativeEvent,
                        alreadySelected ? { ctrlKey: true } : {}
                    )
                );
                this.contextMenuRef.current.handleShow({
                    detail: {
                        id: "file-tree-context",
                        position: {
                            x: info.event.pageX,
                            y: info.event.pageY,
                        },
                    },
                });
            }
        );
    };
    onNodeSelect(selectedKeys, evt, cb) {
        this.setState(
            {
                selectedContextKeys: selectedKeys,
                currentTreeSelection: selectedKeys,
            },
            cb
        );
        if (this.props.onNodeSelect) {
            this.props.onNodeSelect(selectedKeys);
        }
    }
    onNodeDoubleClick(e, node) {
        const { repository, files } = this.props;
        const nodeProps = node.props;
        const nodeId = nodeProps.id;
        const nodeType = nodeProps.type;
        const fileTypeData = fileTypes[nodeType];
        const repoName = this.props.repository.get("data").get("repoName");
        const ownerName = this.props.repository.get("data").get("ownerName");
        const topModule = repository.get("data").get("topModule") || "";
        const topModuleEntry =
            repository.get("data").get("topModuleEntry") || "";
        const fileNode = files
            .get("data")
            .find((el) => el.id === nodeId)
            .toJS();
        if (fileNode.status === "loading") {
            return;
        }
        if (fileTypeData && fileTypeData.folder) {
            return this.expandNode(nodeId);
        }
        if (fileTypeData && fileTypeData.readable) {
            const tabs = files.get("data").filter((el) => !el.closed);
            const tab = tabs.find((tab) => tab.get("id") === nodeId);
            if (tab) {
                const rv = this.props.selectEditorTab({
                    node: tab,
                });
                if (this.props.onTabChange) {
                    this.props.onTabChange({
                        id: nodeId,
                    });
                }
                return rv;
            } else {
                if (fileTypeData.editor === "ace") {
                    const rv = this.props
                        .openEditorTab({
                            ownerName,
                            repoName,
                            node: nodeProps,
                        })
                        .then((action) => {
                            if (!action || action.error) {
                                return this.props.toastError(action.error);
                            }
                            const newTab = this.props.files
                                .get("data")
                                .filter((el) => !el.closed)
                                .find((tab) => tab.get("id") === nodeId)
                                .toJS();
                            if (newTab.type === "verilog") {
                                this.expandNode(nodeId);
                                return this.props.parseVerilogModules({
                                    node: newTab,
                                    topModule,
                                    topModuleEntry,
                                });
                            }
                            return Promise.resolve(action);
                        })
                        .then((action) => {
                            if (this.props.onTabChange) {
                                this.props.onTabChange({
                                    id: nodeId,
                                });
                            }
                        });
                    return rv;
                }
            }
        }
        return Promise.resolve(false);
    }

    render() {
        const { files } = this.props;
        this.treeData = generateFilesTree(files.get("data").toJS());
        if (files.get("status") === "error") {
            return (
                <Alert color="danger">{files.get("error").toString()}</Alert>
            );
        } else if (
            files.get("status") === Status.Loading ||
            files.get("status") === Status.None ||
            !this.treeData.length
        ) {
            return <SquareSpinner />;
        }

        return (
            <div className="files-tree-wrapper">
                <ContextMenuTrigger id={CONTEXT_KEY}>
                    <Tree
                        treeData={this.treeData}
                        autoExpandParent={true}
                        multiple={true}
                        draggable={true}
                        showLine={false}
                        ref={this.treeRef}
                        onRightClick={this.onRightClick}
                        renameNode={this.state.renameNode}
                        renameNodeTitle={this.state.renameNodeTitle}
                        onNodeRename={this.onNodeRename}
                        onNodeRenameChange={(e) =>
                            this.setState({ renameNodeTitle: e.target.value })
                        }
                        onExpand={(expandedKeys) => {
                            this.setState({ expandedKeys });
                        }}
                        expandedKeys={this.state.expandedKeys}
                        onSelect={this.onNodeSelect}
                        onDoubleClick={(e, node) =>
                            this.props.onOpenFile(node.props)
                        }
                        onNodeDoubleClick={(e, node) =>
                            this.props.onOpenFile(node.props)
                        }
                        icon={wrapIconDoubleClick.bind(this)((e, node) =>
                            this.props.onOpenFile(node.props)
                        )}
                        focusable={true}
                        onKeyPress={(evt) => {
                            if (evt.key === "Delete") {
                                this.props.onDelete(
                                    this.state.currentTreeSelection
                                );
                            }
                        }}
                    />
                </ContextMenuTrigger>
                {this.renderConexteMenu()}
            </div>
        );
    }

    renderConexteMenu() {
        const { currentTreeSelection } = this.state;
        const isEntrySelected = !!currentTreeSelection.length;
        const isOneSelected = currentTreeSelection.length === 1;
        const isMultipleSelected = currentTreeSelection.length > 1;
        const filesMap = _.keyBy(this.props.files.get("data").toJS(), "id");
        let hasModule = false;
        let hasBuildFolder = false;
        let hasSWFolder = false;
        let hasSWHexFolder = false;
        let hasTestbench = false;
        let hasRoot = false;
        let hasIncluded = false;
        let hasExcluded = false;
        let hasNoIncludeExclude = false;
        const selectionMap = _.reduce(
            currentTreeSelection,
            (result, value, key) => {
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
                    hasIncluded = true;
                } else if (
                    ["exC", "exH", "exverilog", "exfolder"].includes(
                        filesMap[value].type
                    )
                ) {
                    hasExcluded = true;
                } else {
                    hasNoIncludeExclude = true;
                }
                result[value] = true;
                return result;
            },
            {}
        );
        //const workspace = this.props.workspace.get("data").toJS();
        const repository = this.props.repository.get("data").toJS();
        const { buildDir, swDir, swHexDir } = repository;
        const isBuildFolder = isOneSelected && selectionMap[buildDir];
        const isSWFolder = isOneSelected && selectionMap[swDir];
        const isSWHexFolder = isOneSelected && selectionMap[swHexDir];
        // const isFolder = isOneSelected;
        let targetNode = false;
        let isFolder = false;
        let isModule = false;
        let isTopModule = false;
        //let typeData = false;
        if (isOneSelected) {
            targetNode = filesMap[currentTreeSelection[0]];
            //typeData = fileTypes[targetNode.type];
        }
        const isRoot = isOneSelected && targetNode.type === "root";
        isFolder =
            isOneSelected &&
            (targetNode.type === "folder" ||
                targetNode.type === "root" ||
                targetNode.type === "exfolder");
        isModule =
            isOneSelected &&
            (targetNode.type === "module" || targetNode.type === "topmodule");
        isTopModule = isOneSelected && targetNode.type === "topmodule";

        const isIncludedVerilog =
            isOneSelected && targetNode.type === "verilog";
        const isExcludedVerilog =
            isOneSelected && targetNode.type === "exverilog";
        const isVerilog = isIncludedVerilog || isExcludedVerilog;
        const isTestbench = isOneSelected && targetNode.type === "testbench";
        const isNetlist = isOneSelected && targetNode.type === "netlist";
        const isVCD = isOneSelected && targetNode.type === "vcd";
        const isBinary = isOneSelected && targetNode.type === "bin";
        const isReport = isOneSelected && targetNode.type === "srpt";
        const isReadonly = isNetlist || isVCD || isBinary || isReport;
        // const isIncludedC = isOneSelected && targetNode.type === "c";
        // const isExcludedC = isOneSelected && targetNode.type === "exC";
        // const isIncludedH = isOneSelected && targetNode.type === "h";
        // const isExcludedH = isOneSelected && targetNode.type === "exH";
        //const isAnchorFolder = isBuildFolder || isSWFolder || isSWHexFolder;

        return (
            <ContextMenu
                id={CONTEXT_KEY}
                ref={this.contextMenuRef}
                onHide={() =>
                    this.setState({
                        currentTreeSelection: currentTreeSelection,
                    })
                }
                className="files-tree-context"
            >
                {isOneSelected && !isFolder && !isRoot && !isModule && (
                    <ContextMenuItem
                        data={{ actionId: "open" }}
                        onClick={(e) => {
                            if (currentTreeSelection.length) {
                                this.props.onOpenFile(
                                    filesMap[currentTreeSelection[0]]
                                );
                            }
                            // this.props.onSimulate(currentTreeSelection[0], e)
                        }}
                    >
                        Open
                    </ContextMenuItem>
                )}
                {isOneSelected && hasTestbench && (
                    <ContextMenuItem
                        data={{ actionId: "simulate" }}
                        onClick={(e) =>
                            this.props.onSimulate(currentTreeSelection[0], e)
                        }
                    >
                        Simulate
                    </ContextMenuItem>
                )}

                {!hasModule &&
                    !isMultipleSelected &&
                    !isBuildFolder &&
                    !isSWHexFolder &&
                    !isReadonly && (
                        <ContextMenuItem
                            data={{ actionId: "newfile" }}
                            onClick={(e) =>
                                this.props.onNewFile(currentTreeSelection, e)
                            }
                        >
                            New File
                        </ContextMenuItem>
                    )}
                {!hasModule &&
                    !isMultipleSelected &&
                    !isBuildFolder &&
                    !isSWHexFolder &&
                    !isReadonly && (
                        <ContextMenuItem
                            data={{ actionId: "newfolder" }}
                            onClick={(e) =>
                                this.props.onNewFolder(currentTreeSelection, e)
                            }
                        >
                            New Folder
                        </ContextMenuItem>
                    )}
                {isOneSelected &&
                    !hasModule &&
                    !isBuildFolder &&
                    !isSWHexFolder &&
                    !isSWFolder &&
                    !isReadonly && <ContextMenuItem divider />}
                {isEntrySelected &&
                    !hasModule &&
                    !hasRoot &&
                    !hasBuildFolder &&
                    !hasSWHexFolder &&
                    !hasSWFolder &&
                    !isReadonly && (
                        <ContextMenuItem
                            data={{ actionId: "copy" }}
                            onClick={(e) =>
                                this.props.copyFiles(currentTreeSelection)
                            }
                        >
                            Copy
                        </ContextMenuItem>
                    )}
                {isEntrySelected &&
                    !hasModule &&
                    !hasRoot &&
                    !hasBuildFolder &&
                    !hasSWHexFolder &&
                    !hasSWFolder &&
                    !isReadonly && (
                        <ContextMenuItem
                            data={{ actionId: "cut" }}
                            onClick={(e) =>
                                this.props.cutFiles(currentTreeSelection)
                            }
                        >
                            Cut
                        </ContextMenuItem>
                    )}
                {isEntrySelected && isFolder && !isReadonly && (
                    <ContextMenuItem
                        data={{ actionId: "paste" }}
                        disabled={!this.props.canPaste()}
                        onClick={(e) =>
                            this.props.pasteFiles(currentTreeSelection)
                        }
                    >
                        Paste
                    </ContextMenuItem>
                )}
                {isEntrySelected &&
                    !isModule &&
                    !isBuildFolder &&
                    !isRoot &&
                    !isSWHexFolder &&
                    !isSWFolder &&
                    isOneSelected && (
                        <ContextMenuItem
                            data={{ actionId: "rename" }}
                            onClick={(e) =>
                                this.renameNode(currentTreeSelection)
                            }
                        >
                            Rename
                        </ContextMenuItem>
                    )}
                {isEntrySelected &&
                    !hasModule &&
                    !hasBuildFolder &&
                    !hasSWFolder &&
                    !hasSWHexFolder &&
                    !hasRoot && (
                        <ContextMenuItem
                            data={{ actionId: "delete" }}
                            onClick={(e) =>
                                this.props.onDelete(currentTreeSelection)
                            }
                        >
                            Delete
                        </ContextMenuItem>
                    )}
                {isOneSelected &&
                    !isBuildFolder &&
                    !isSWHexFolder &&
                    !hasModule && <ContextMenuItem divider />}
                {isEntrySelected &&
                    !isModule &&
                    !isFolder &&
                    !isBuildFolder &&
                    !isRoot &&
                    !isSWHexFolder &&
                    !isSWFolder &&
                    isOneSelected &&
                    !isReadonly && (
                        <ContextMenuItem
                            data={{ actionId: "duplicate" }}
                            onClick={(e) =>
                                this.props.onDuplicate(currentTreeSelection)
                            }
                        >
                            Duplicate
                        </ContextMenuItem>
                    )}
                {isEntrySelected &&
                    !isBuildFolder &&
                    !isRoot &&
                    !isSWHexFolder &&
                    !isSWFolder &&
                    !isModule &&
                    !isFolder &&
                    isOneSelected && (
                        <ContextMenuItem
                            data={{ actionId: "download" }}
                            onClick={(e) =>
                                currentTreeSelection.length
                                    ? this.props.onDownload(
                                          currentTreeSelection[0],
                                          e
                                      )
                                    : null
                            }
                        >
                            Download
                        </ContextMenuItem>
                    )}
                {isOneSelected && !isModule && (
                    <ContextMenuItem
                        data={{ actionId: "copypath" }}
                        onClick={(e) => this.copyPath(currentTreeSelection, e)}
                    >
                        Copy Relative Path
                    </ContextMenuItem>
                )}
                {isOneSelected &&
                    !isBuildFolder &&
                    !isSWHexFolder &&
                    !isSWFolder &&
                    !hasModule &&
                    !isFolder && <ContextMenuItem divider />}
                {isEntrySelected && hasExcluded && !hasNoIncludeExclude && (
                    <ContextMenuItem
                        data={{ actionId: "include" }}
                        onClick={(e) =>
                            currentTreeSelection.length
                                ? this.props.onIncludeExclude(
                                      true,
                                      currentTreeSelection,
                                      e
                                  )
                                : null
                        }
                    >
                        Include in Build
                    </ContextMenuItem>
                )}
                {isEntrySelected && hasIncluded && !hasNoIncludeExclude && (
                    <ContextMenuItem
                        data={{ actionId: "exclude" }}
                        onClick={(e) =>
                            currentTreeSelection.length
                                ? this.props.onIncludeExclude(
                                      false,
                                      currentTreeSelection,
                                      e
                                  )
                                : null
                        }
                    >
                        Exclude from Build
                    </ContextMenuItem>
                )}
                {isEntrySelected && isVerilog && (
                    <ContextMenuItem
                        data={{ actionId: "totb" }}
                        onClick={(e) =>
                            currentTreeSelection.length
                                ? this.props.onConvertToTestbench(
                                      currentTreeSelection[0],
                                      e
                                  )
                                : null
                        }
                    >
                        Convert into Testbench
                    </ContextMenuItem>
                )}
                {isEntrySelected && isTestbench && (
                    <ContextMenuItem
                        data={{ actionId: "toverilog" }}
                        onClick={(e) =>
                            currentTreeSelection.length
                                ? this.props.onConvertToVerilog(
                                      currentTreeSelection[0],
                                      e
                                  )
                                : null
                        }
                    >
                        Convert into Verilog
                    </ContextMenuItem>
                )}
                {isEntrySelected && isModule && !isTopModule && (
                    <ContextMenuItem
                        data={{ actionId: "settop" }}
                        onClick={(e) =>
                            currentTreeSelection.length
                                ? this.props.onSetTopModule(
                                      currentTreeSelection[0],
                                      e
                                  )
                                : null
                        }
                    >
                        Set As Top Module
                    </ContextMenuItem>
                )}
                {isOneSelected &&
                    !isBuildFolder &&
                    !isSWHexFolder &&
                    !isSWFolder &&
                    !hasModule &&
                    !isFolder && (
                        <ContextMenuItem
                            data={{ actionId: "close" }}
                            onClick={(e) =>
                                currentTreeSelection.length
                                    ? this.props.onClose(
                                          currentTreeSelection[0],
                                          e
                                      )
                                    : null
                            }
                        >
                            Close
                        </ContextMenuItem>
                    )}
            </ContextMenu>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
    withRef: true,
})(FileTree);
