import React, { Component } from "react";

import BaseDialog from "./BaseDialog";
import NewFileForm from "./Forms/NewFileForm";
import { adjustExtension } from "../../../../constants.js";

class NewEntryDialog extends Component {
    render() {
        return (
            <BaseDialog
                {...this.props}
                toggle={() => {
                    this.props.toggle();
                }}
                title={this.props.title}
                body={
                    <div>
                        <NewFileForm
                            fileNameField={this.props.fieldName || "Folder"}
                            onSubmit={(fileData) =>
                                this.props.callback(
                                    fileData
                                        .set(
                                            "fileName",
                                            adjustExtension(
                                                fileData.get("fileName"),
                                                this.props.extension || ""
                                            )
                                        )
                                        .set("type", this.props.type)
                                        .set("parent", this.props.targetNode.id)
                                        .toJS()
                                )
                            }
                            defaultFileName={this.props.defaultFileName || ""}
                            onCancel={this.props.toggle}
                        />
                    </div>
                }
            />
        );
    }
}

export default NewEntryDialog;
