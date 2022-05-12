import React, { Component } from "react";
import { connect } from "react-redux";

import BaseDialog from "./BaseDialog";
import SynthesisForm from "./Forms/SynthesisForm";

import { generateFilesTree } from "views/Workspace/components/FileTree/utils.js";
import { adjustExtension } from "../../../../constants.js";

import { writeableFolders } from "views/Workspace/components/FileTree/utils";

const mapStateToProps = (state) => {
    return {
        repository: state.get("repository"),
        files: state.get("files"),
        library: state.get("library"),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const strategies = [
    {
        id: "S1",
        title: "S1",
    },
    {
        id: "S2",
        title: "S2",
    },
    {
        id: "S3",
        title: "S3",
    },
];

const execTypes = [
    { id: "sync", title: "Synchronous (suitable for short jobs)" },
    { id: "async", title: "Asynchronous (suitable for long jobs)" },
];

class SynthesisDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: [],
        };
    }
    render() {
        let netlistName = (this.props.topModule || "netlist") + ".v";
        const { files, library } = this.props;
        const dcfTree = generateFilesTree(
            files
                .get("data")
                .toJS()
                .filter((file) =>
                    ["dcf"].concat(writeableFolders).includes(file.type)
                )
        );
        return (
            <BaseDialog
                {...this.props}
                toggle={() => {
                    this.props.toggle();
                }}
                title={"Synthesize"}
                body={
                    <SynthesisForm
                        defaultFileName={netlistName}
                        dcfTree={dcfTree}
                        strategies={strategies}
                        execTypes={execTypes}
                        stdcells={library
                            .get("data")
                            .get("stdcells")
                            .toJS()
                            .map((cell) => ({ id: cell.id, title: cell.text }))}
                        onSubmit={(fileData) =>
                            this.props.callback(
                                fileData

                                    .set(
                                        "dcf",
                                        fileData.get("dcf")
                                            ? fileData.get("dcf").id
                                            : fileData.get("dcf")
                                    )

                                    .set(
                                        "fileName",
                                        adjustExtension(
                                            fileData.get("fileName"),
                                            ".v"
                                        )
                                    )
                                    .toJS()
                            )
                        }
                        onCancel={this.props.toggle}
                    />
                }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SynthesisDialog);
