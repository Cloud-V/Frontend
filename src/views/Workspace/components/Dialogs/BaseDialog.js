import React, { Component } from "react";

import { Modal, ModalBody, Button } from "reactstrap";

class BaseDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Modal
                isOpen={this.props.modal}
                toggle={this.props.toggle}
                centered={true}
                backdrop={"static"}
                className={`dialog theme-wrapper workspace-dialog theme-${
                    this.props.theme
                } center-dialog ${this.props.className || ""}`}
                onClosed={() => {
                    if (this.props.onClosed) {
                        this.props.onClosed();
                    }
                }}
            >
                <div className="close-dialog d-inline-flex justify-content-between align-items-center pt-1 mb-2 pb-1">
                    <div />
                    <div className="header d-flex justify-content-center align-items-center mt-0 mb-0">
                        {this.props.title}
                    </div>
                    <Button
                        className="close-button mr-2"
                        onClick={this.props.toggle}
                    >
                        <i className="fa fa-times fa-lg" />
                    </Button>
                </div>
                <ModalBody className="modal-form">{this.props.body}</ModalBody>
            </Modal>
        );
    }
}

export default BaseDialog;
