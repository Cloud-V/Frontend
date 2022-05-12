import React, { Component } from "react";
import { connect } from "react-redux";

import BaseDialog from "./BaseDialog";
import BitstreamForm from "./Forms/BitstreamForm";
import { generateFilesTree } from "views/Workspace/components/FileTree/utils.js";
import { adjustExtension } from "../../../../constants.js";

const mapStateToProps = (state) => {
    return {
        repository: state.get("repository"),
        files: state.get("files"),
    };
};

class BitstreamDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: [],
        };
    }

    componentDidUpdate(prevProps, nextProps) {
        const { files: prevFiles } = prevProps;
        const { files: nextFiles } = this.props;
        if (prevFiles && nextFiles) {
            if (prevFiles.get("data") !== nextFiles.get("data")) {
                const treeData = generateFilesTree(
                    nextFiles
                        .get("data")
                        .toJS()
                        .filter((file) =>
                            ["pcf", "folder", "root", "buildFolder"].includes(
                                file.type
                            )
                        )
                );

                this.setState({
                    treeData,
                });
            }
        }
    }

    async componentDidMount() {
        const { files } = this.props;
        const treeData = generateFilesTree(
            files
                .get("data")
                .toJS()
                .filter((file) =>
                    ["pcf", "folder", "root", "buildFolder"].includes(file.type)
                )
        );

        this.setState({
            treeData,
        });
        return Promise.resolve();
    }
    render() {
        let defaultName = this.props.topModule || "";
        if (!defaultName.length) {
            defaultName = "top";
        }
        defaultName = `${defaultName}.bin`;
        return (
            <BaseDialog
                {...this.props}
                toggle={() => {
                    this.props.toggle();
                }}
                title={"Generate Bitstream"}
                className={""}
                body={
                    <div>
                        <BitstreamForm
                            treeData={this.state.treeData}
                            onSubmit={(fileData) =>
                                this.props.callback(
                                    fileData
                                        .set("action", "bitstream")
                                        .set(
                                            "fileName",
                                            adjustExtension(
                                                fileData.get("fileName"),
                                                ".bin"
                                            )
                                        )
                                        .set("pcf", fileData.get("pcf").id)
                                        .toJS()
                                )
                            }
                            targets={[]}
                            onCancel={this.props.toggle}
                            defaultName={defaultName}
                        />
                    </div>
                }
            />
        );
    }
}

export default connect(mapStateToProps, null)(BitstreamDialog);
