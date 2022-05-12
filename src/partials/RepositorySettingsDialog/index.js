import React, { Component } from "react";

import { Modal, ModalBody, Button } from "reactstrap";

import { Redirect } from "react-router-dom";

import RepositorySettingsForm from "./RepositorySettingsForm";
import Status from "store/utils/status.js";

class RepositorySettingsDialog extends Component {
    render() {
        if (
            this.props.modal &&
            (this.props.status === Status.Success ||
                this.props.status === Status.ActionSuccess)
        ) {
            const ownerName = this.props.repository
                .get("data")
                .get("ownerName");
            const repoName = this.props.repository.get("data").get("repoName");
            if (ownerName === "" || repoName === "") {
                return <Redirect to={`/`} />;
            }
            if (
                ownerName !== this.props.ownerName ||
                repoName !== this.props.repoName
            ) {
                return <Redirect push to={`/${ownerName}/${repoName}`} />;
            }
        }
        return (
            <Modal
                isOpen={this.props.modal}
                toggle={this.props.toggle}
                className="dialog repo-dialog"
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
                        Repository Settings
                    </div>
                    <RepositorySettingsForm
                        repository={this.props.repository}
                        status={this.props.status}
                        errorMessage={this.props.error}
                        onRepositoryDelete={this.props.onRepositoryDelete}
                        onCancel={this.props.toggle}
                        onSubmit={(e) => {
                            if (!e.has("privacy")) {
                                e = e.set("privacy", "1");
                            }
                            if (!e.has("description")) {
                                e = e.set("description", "");
                            }
                            if (typeof this.props.onFormSubmit === "function") {
                                this.props.onFormSubmit(e);
                            }
                        }}
                    />
                </ModalBody>
            </Modal>
        );
    }
}

export default RepositorySettingsDialog;
