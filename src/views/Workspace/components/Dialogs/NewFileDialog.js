import React, { Component } from "react";

import { Modal, ModalBody, Button } from "reactstrap";

import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Row,
    Col,
} from "reactstrap";
import _ from "lodash";

import NewVerilogForm from "./Forms/NewVerilogForm";
import NewFileForm from "./Forms/NewFileForm";
import FileAndOptionsForm from "./Forms/FileAndOptionsForm";
import TestbenchWizard from "./TestbenchWizard";
import { adjustExtension } from "../../../../constants.js";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    stdcells: state.get("library").get("data").get("stdcells"),
    boards: state.get("library").get("data").get("boards"),
});

const createFileForm =
    ({ fieldName, fileType, fileExtension }) =>
    (props) =>
        (
            <NewFileForm
                {...props}
                fileNameField={fieldName}
                onSubmit={(fileData) =>
                    props.onSubmit(
                        fileData
                            .set("type", fileType)
                            .set(
                                "fileName",
                                adjustExtension(
                                    fileData.get("fileName"),
                                    "." + fileExtension
                                )
                            )
                            .set("parent", props.targetNode.id)
                            .toJS()
                    )
                }
                onCancel={props.onCancel}
            />
        );

const targets = [
    {
        id: "riscv",
        title: "Risc-V",
    },
    // {
    // 	id: "arm",
    // 	title: "ARM"
    // }
    // ,
    {
        id: "blank",
        title: "Blank Script",
    },
];

const defaultValidParents = ["root", "folder"];

const fileCategories = [
    {
        id: "verilog",
        name: "Verilog",
        types: [
            {
                id: "verilog-module",
                name: "Verilog Module",
                icon: "verilog",
                component: function (props) {
                    return (
                        <NewVerilogForm
                            {...props}
                            onSubmit={(moduleData) => {
                                const newData = moduleData
                                    .set(
                                        "sequential",
                                        moduleData.get("sequential") || false
                                    )
                                    .set(
                                        "fileName",
                                        adjustExtension(
                                            moduleData.get("fileName"),
                                            ".v"
                                        )
                                    )
                                    .set("type", "verilog")
                                    .set("parent", props.targetNode.id);
                                return props.onSubmit(newData.toJS());
                            }}
                            onCancel={props.onCancel}
                        />
                    );
                },
            },
            {
                id: "verilog-testbench",
                name: "Verilog Testbench",
                icon: "testbench",
                component: function (props) {
                    return (
                        <TestbenchWizard
                            {...props}
                            onSubmit={(moduleData) => {
                                const newData = moduleData
                                    .set(
                                        "blank",
                                        moduleData.get("blank") || false
                                    )
                                    .set(
                                        "fileName",
                                        adjustExtension(
                                            moduleData.get("fileName"),
                                            ".v"
                                        )
                                    )
                                    .set("type", "testbench")
                                    .set("parent", props.targetNode.id);
                                console.error(new Error().stack);
                                return props.onSubmit(newData.toJS());
                            }}
                            onCancel={props.onCancel}
                        />
                    );
                },
            },
            // {
            //     id: "dcf",
            //     name: "Design Constraints File",
            //     icon: "dcf",
            //     component: function (props) {
            //         return (
            //             <FileAndOptionsForm
            //                 {...props}
            //                 targets={props.stdcells}
            //                 defaultFilename="constraints.dcf"
            //                 titleField={"text"}
            //                 onSubmit={(fileData) => {
            //                     return props.onSubmit(
            //                         fileData
            //                             .set("type", "dcf")
            //                             .set(
            //                                 "fileName",
            //                                 adjustExtension(
            //                                     fileData.get("fileName"),
            //                                     ".dcf"
            //                                 )
            //                             )
            //                             .set("content", {
            //                                 stdcell: fileData.get("target"),
            //                             })
            //                             .set("parent", props.targetNode.id)
            //                             .toJS()
            //                     );
            //                 }}
            //                 onCancel={props.onCancel}
            //             />
            //         );
            //     },
            // },
        ],
    },
    {
        id: "software",
        name: "Software",
        types: [
            {
                id: "c",
                name: "C Source File",
                icon: "c",
                validParents: ["swFolder"],
                component: createFileForm({
                    fieldName: "Name:",
                    fileType: "c",
                    fileExtension: "c",
                }),
            },
            {
                id: "h",
                name: "C Header File",
                icon: "h",
                validParents: ["swFolder"],
                component: createFileForm({
                    fieldName: "Name:",
                    fileType: "h",
                    fileExtension: "h",
                }),
            },
            {
                id: "linker",
                name: "Linker Script",
                icon: "linker",
                validParents: ["swFolder"],
                component: function (props) {
                    return (
                        <FileAndOptionsForm
                            {...props}
                            targets={targets}
                            onSubmit={(fileData) => {
                                return props.onSubmit(
                                    fileData
                                        .set("type", "linker")
                                        .set(
                                            "fileName",
                                            adjustExtension(
                                                fileData.get("fileName"),
                                                ".ld"
                                            )
                                        )
                                        .set("parent", props.targetNode.id)
                                        .toJS()
                                );
                            }}
                            onCancel={props.onCancel}
                        />
                    );
                },
            },
            {
                id: "startup",
                name: "Start-up Script",
                icon: "startup",
                validParents: ["swFolder"],
                component: function (props) {
                    return (
                        <FileAndOptionsForm
                            {...props}
                            targets={targets}
                            onSubmit={(fileData) => {
                                return props.onSubmit(
                                    fileData
                                        .set("type", "startup")
                                        .set(
                                            "fileName",
                                            adjustExtension(
                                                fileData.get("fileName"),
                                                ".s"
                                            )
                                        )
                                        .set("parent", props.targetNode.id)
                                        .toJS()
                                );
                            }}
                            onCancel={props.onCancel}
                        />
                    );
                },
            },
        ],
    },
    {
        id: "fpga",
        name: "FPGA",
        types: [
            {
                id: "pcf",
                name: "Pin Constraints File",
                icon: "pcf",
                component: function (props) {
                    return (
                        <FileAndOptionsForm
                            {...props}
                            targets={props.boards}
                            defaultFilename="constraints.pcf"
                            titleField={"model"}
                            onSubmit={(fileData) => {
                                const board = _.find(
                                    props.boards,
                                    (b) => fileData.get("target") === b.id
                                );
                                if (!board) {
                                    return;
                                }
                                return props.onSubmit(
                                    fileData
                                        .set("type", "pcf")
                                        .set("boardId", board.id)
                                        .set("boardName", board.model)
                                        .set(
                                            "fileName",
                                            adjustExtension(
                                                fileData.get("fileName"),
                                                ".pcf"
                                            )
                                        )
                                        .set("parent", props.targetNode.id)
                                        .toJS()
                                );
                            }}
                            onCancel={props.onCancel}
                        />
                    );
                },
            },
        ],
    },
    {
        id: "system",
        name: "System",
        types: [
            {
                id: "soc",
                name: "System on Chip (SoC)",
                icon: "soc",
                disabled: true,
                tooltip: "Not supported yet.",
                component: createFileForm({
                    fieldName: "Name:",
                    fileType: "soc",
                    fileExtension: "soc",
                }),
            },
        ],
    },
    {
        id: "others",
        name: "Others",
        types: [
            {
                id: "text",
                name: "Plain Text Document",
                icon: "text",
                component: createFileForm({
                    fieldName: "Name:",
                    fileType: "text",
                    fileExtension: "txt",
                }),
            },
        ],
    },
];

class NewFileDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCategory: "verilog",
            currentType: null,
        };
        this.setCategory = this.setCategory.bind(this);
        this.setType = this.setType.bind(this);
    }
    setCategory(currentCategory) {
        this.setState({ currentCategory, currentType: null });
    }
    setType(currentType) {
        this.setState({ currentType });
    }

    renderMainDialog() {
        const { targetNode } = this.props;
        if (!targetNode) {
            return null;
        }
        return (
            <React.Fragment>
                <div className="d-flex flex-row w-100" key="category-selection">
                    <Nav className="file-category-nav" tabs>
                        {_.map(fileCategories, (cat) => (
                            <NavItem key={cat.id}>
                                <NavLink
                                    className={
                                        this.state.currentCategory === cat.id
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() => {
                                        this.setCategory(cat.id);
                                    }}
                                >
                                    {cat.name}
                                </NavLink>
                            </NavItem>
                        ))}
                    </Nav>
                    <TabContent
                        className="w-100 file-dialog-tab-content"
                        activeTab={this.state.currentCategory}
                    >
                        {_.map(fileCategories, (cat) => (
                            <TabPane tabId={cat.id} key={`tab-pan-${cat.id}`}>
                                <Row>
                                    <Col sm="12">
                                        <Nav
                                            vertical
                                            className="file-type-nav"
                                            tabs
                                        >
                                            {_.map(cat.types || [], (type) => (
                                                <NavItem key={type.id}>
                                                    <NavLink
                                                        className={`file-dialog-nav-link ${
                                                            this.state
                                                                .currentType &&
                                                            this.state
                                                                .currentType
                                                                .id === type.id
                                                                ? "active"
                                                                : ""
                                                        }`}
                                                        onClick={() => {
                                                            this.setType(type);
                                                        }}
                                                        title={
                                                            type.tooltip
                                                                ? type.tooltip
                                                                : !(
                                                                      type.validParents ||
                                                                      defaultValidParents
                                                                  ).includes(
                                                                      targetNode.type
                                                                  )
                                                                ? `Cannot create this type under the selected folder.`
                                                                : ""
                                                        }
                                                        disabled={
                                                            !(
                                                                type.validParents ||
                                                                defaultValidParents
                                                            ).includes(
                                                                targetNode.type
                                                            ) || type.disabled
                                                        }
                                                    >
                                                        <span
                                                            className={`file-icon dialog-icon ${type.icon}`}
                                                        />
                                                        {type.name}
                                                    </NavLink>
                                                </NavItem>
                                            ))}
                                        </Nav>
                                    </Col>
                                </Row>
                            </TabPane>
                        ))}
                    </TabContent>
                </div>
                <div className="w-100 d-flex justify-content-end align-items-center mt-auto pt-2">
                    <Button
                        className="action-button cancel-button pull-right mr-2"
                        onClick={(e) => this.props.toggle()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="action-button pull-right"
                        onClick={(e) => this.props.onNext()}
                        disabled={this.state.currentType == null}
                    >
                        Next
                    </Button>
                </div>
            </React.Fragment>
        );
    }
    render() {
        const stdcells = this.props.stdcells.toJS();
        const boards = this.props.boards.toJS();
        return (
            <Modal
                isOpen={this.props.modal}
                toggle={this.props.toggle}
                backdrop="static"
                className={`dialog theme-wrapper workspace-dialog new-file-dialog theme-${this.props.theme}`}
                centered={true}
                onClosed={() => {
                    if (this.props.onClosed) {
                        this.props.onClosed();
                    }
                }}
            >
                <div className="close-dialog d-inline-flex justify-content-between align-items-center pt-1 mb-2 pb-1">
                    <div />
                    <div className="header d-flex justify-content-center align-items-center mt-0 mb-0">
                        {this.props.newFileStep
                            ? `New ${(this.state.currentType || {}).name}`
                            : "New File"}
                    </div>
                    <Button
                        className="close-button mr-2"
                        onClick={this.props.toggle}
                    >
                        <i className="fa fa-times fa-lg" />
                    </Button>
                </div>
                <ModalBody className="modal-form d-flex flex-column">
                    {(() => {
                        if (this.props.newFileStep) {
                            if (!this.state.currentType.component) {
                                return null;
                            }
                            const NextComponent =
                                this.state.currentType.component;
                            return (
                                <NextComponent
                                    toastError={this.props.toastError}
                                    onSubmit={this.props.onCreate}
                                    onCancel={this.props.toggle}
                                    targetNode={this.props.targetNode}
                                    stdcells={stdcells}
                                    boards={boards}
                                />
                            );
                        } else {
                            return this.renderMainDialog();
                        }
                    })()}
                </ModalBody>
            </Modal>
        );
    }
}

export default connect(mapStateToProps)(NewFileDialog);
