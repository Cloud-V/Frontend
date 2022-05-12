import React, { Component } from "react";

import { Modal, ModalBody, Button } from "reactstrap";

import ContributorForm from "./ContributorForm";

class ContributorDialog extends Component {
    render() {
        return (
            <Modal
                isOpen={this.props.modal}
                toggle={this.props.toggle}
                className="dialog new-repo-dialog"
            >
                <div className="close-dialog d-flex justify-content-end mr-2 mt-2">
                    <Button
                        className="bg-white border border-white"
                        onClick={this.props.toggle}
                    >
                        <i className="fa fa-times fa-lg" />
                    </Button>
                </div>
                <ModalBody className="modal-form">
                    <div className="header d-flex justify-content-center align-items-center mb-5 mt-1">
                        {this.props.editMode ? "Edit" : "Add"} contributor
                    </div>
                    <ContributorForm
                        contributor={this.props.contributor}
                        editMode={this.props.editMode}
                        onSubmit={async (e) => {
                            if (!e.has("accessLevel")) {
                                e = e.set("accessLevel", "1");
                            }
                            if (typeof this.props.onFormSubmit === "function") {
                                try {
                                    await this.props.onFormSubmit(e);
                                    this.props.closeDialog();
                                } catch (err) {
                                    this.setState({});
                                }
                            }
                        }}
                    />
                </ModalBody>
            </Modal>
        );
    }
}

export default ContributorDialog;
