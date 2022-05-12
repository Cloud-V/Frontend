import React, { Component } from "react";
import { connect } from "react-redux";

import BaseDialog from "./BaseDialog";
import CompileSoftwareForm from "./Forms/CompileSoftwareForm";
import { generateFilesTree } from "views/Workspace/components/FileTree/utils.js";
import { adjustExtension } from "../../../../constants.js";

const mapStateToProps = (state) => {
    return {
        repository: state.get("repository"),
        files: state.get("files"),
    };
};

const targets = [
    {
        id: "riscv",
        title: "Risc-V",
    },
    {
        id: "arm",
        title: "ARM",
    },
];

class CompileSoftwareDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkerTreeData: [],
            startupTreeData: [],
        };
        this.generateFileTrees = this.generateFileTrees.bind(this);
    }

    generateFileTrees() {
        const { files } = this.props;
        const linkerTreeData = generateFilesTree(
            files
                .get("data")
                .toJS()
                .filter((file) =>
                    [
                        "linker",
                        "folder",
                        "root",
                        "swFolder",
                        "buildFolder",
                    ].includes(file.type)
                )
        );
        const startupTreeData = generateFilesTree(
            files
                .get("data")
                .toJS()
                .filter((file) =>
                    [
                        "startup",
                        "folder",
                        "root",
                        "swFolder",
                        "buildFolder",
                    ].includes(file.type)
                )
        );

        this.setState({
            linkerTreeData,
            startupTreeData,
        });
    }

    componentDidUpdate(prevProps, nextProps) {
        const { files: prevFiles } = prevProps;
        const { files: nextFiles } = this.props;
        if (prevFiles && nextFiles) {
            if (prevFiles.get("data") !== nextFiles.get("data")) {
                this.generateFileTrees();
            }
        }
    }

    async componentDidMount() {
        this.generateFileTrees();
        return Promise.resolve();
    }
    render() {
        let defaultName = this.props.topModule || "";
        if (!defaultName.length) {
            defaultName = "sw";
        }
        defaultName = `${defaultName}.hex`;
        return (
            <BaseDialog
                {...this.props}
                toggle={() => {
                    this.props.toggle();
                }}
                title={"Compile Software Files"}
                className={""}
                body={
                    <div>
                        <CompileSoftwareForm
                            linkerTreeData={this.state.linkerTreeData}
                            startupTreeData={this.state.startupTreeData}
                            targets={targets}
                            onSubmit={(fileData) =>
                                this.props.callback(
                                    fileData
                                        .set(
                                            "fileName",
                                            adjustExtension(
                                                fileData.get("fileName"),
                                                ".hex"
                                            )
                                        )
                                        .set(
                                            "linker",
                                            fileData.get("linker").id
                                        )
                                        .set(
                                            "startup",
                                            fileData.get("startup").id
                                        )
                                        .toJS()
                                )
                            }
                            onCancel={this.props.toggle}
                            defaultName={defaultName}
                        />
                    </div>
                }
            />
        );
    }
}

export default connect(mapStateToProps, null)(CompileSoftwareDialog);
