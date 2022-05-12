import React, { Component } from "react";

import { Modal, ModalBody, Button } from "reactstrap";

import { Redirect } from "react-router-dom";

import RepositoryForm from "partials/Repositories/RepositoryForm";

class CloneDialog extends Component {
    render() {
        const pathname = `/${this.props.repository.toJS().data.ownerName}/${
            this.props.repository.toJS().data.repoName
        }`;
        if (
            this.props.status === "success" &&
            window.location.pathname !== pathname
        ) {
            return <Redirect push to={pathname} />;
        }
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
                        Clone{" "}
                        {this.props.versionMode
                            ? `Version “${this.props.version
                                  .get("data")
                                  .get("title")} ${this.props.version
                                  .get("data")
                                  .get("number")}”`
                            : `${this.props.repository
                                  .get("data")
                                  .get("ownerName")} / ${this.props.repository
                                  .get("data")
                                  .get("repoTitle")}`}
                    </div>
                    <RepositoryForm
                        status={this.props.status}
                        errorMessage={this.props.error}
                        cloneMode={true}
                        versionMode={this.props.versionMode}
                        repository={this.props.repository}
                        version={this.props.version}
                        onSubmit={(e) => {
                            if (!e.has("privacy")) {
                                e = e.set("privacy", "1");
                            }
                            if (!e.has("description")) {
                                e = e.set("description", "");
                            }
                            if (typeof this.props.onFormSubmit === "function") {
                                const result = this.props.versionMode
                                    ? this.props.version.get("data")
                                    : this.props.repository.get("data");
                                this.props
                                    .onFormSubmit(result, e)
                                    .catch((err) => {});
                            }
                        }}
                    />
                </ModalBody>
            </Modal>
        );
    }
}
CloneDialog.defaultProps = {
    versionMode: false,
};

export default CloneDialog;
