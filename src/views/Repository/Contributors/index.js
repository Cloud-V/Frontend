import React, { Component } from "react";

import { List, Map } from "immutable";

import { Link } from "react-router-dom";
import { Alert, Button, Table } from "reactstrap";

import ReactGA from "react-ga";

import _ from "lodash";

import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";

import SquareSpinner from "partials/SquareSpinner";
import ContributorDialog from "./ContributorDialog";
import ConfirmationDialog from "partials/ConfirmationDialog";

class Contributors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            editMode: false,
            removeModal: false,
            removeTitle: "",
            removeMessage: "",
            removeError: "",
        };
        this.toggle = this.toggle.bind(this);
        this.toggleRemove = this.toggleRemove.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.renderRows = this.renderRows.bind(this);
        this.promptEdit = this.promptEdit.bind(this);
        this.promptRemove = this.promptRemove.bind(this);
    }
    promptEdit(contr) {
        this.props.setContributor(contr).then((action) => {
            const { repository } = this.props;
            ReactGA.modalview(
                `/${repository.get("data").get("ownerName")}/${repository
                    .get("data")
                    .get("repoName")}/authorization/edit`
            );

            this.setState({
                editMode: true,
                modal: true,
            });
        });
    }
    promptRemove(contr) {
        this.props.setContributor(contr).then((action) => {
            const { repository } = this.props;
            ReactGA.modalview(
                `/${repository.get("data").get("ownerName")}/${repository
                    .get("data")
                    .get("repoName")}/authorization/delete`
            );
            this.setState({
                removeModal: true,
                removeTitle: `Revoke ${contr.user.username}'s access`,
                removeMessage: `Are you sure you want to revoke the access of ${contr.user.username}?`,
                removeError: "",
            });
        });
    }
    openDialog() {
        this.props.setContributor(null).then((action) => {
            const { repository } = this.props;
            ReactGA.modalview(
                `/${repository.get("data").get("ownerName")}/${repository
                    .get("data")
                    .get("repoName")}/authorization/new`
            );
            this.setState({
                editMode: false,
                modal: true,
            });
        });
    }
    closeDialog() {
        this.setState({
            modal: false,
            removeModal: false,
        });
    }
    toggle() {
        if (this.props.status === "loading") {
            return;
        }
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    }
    toggleRemove() {
        if (this.props.status === "loading") {
            return;
        }
        this.setState((prevState) => ({
            removeModal: !prevState.removeModal,
        }));
    }
    renderRows() {
        const { isOwner } = this.props;
        return _.map(
            this.props.contributors.get("data").toJS(),
            (contr, ind) => {
                return (
                    <tr key={contr._id}>
                        <td className="col-4">
                            <Link
                                className="nav-link user-link"
                                to={`/${contr.user.username}`}
                            >
                                @{contr.user.username}
                            </Link>
                        </td>
                        <td className="col-4">{contr.role}</td>
                        <td className="col-4">
                            <Button
                                disabled={!isOwner || contr.role === "Owner"}
                                className="repository-details-action"
                                onClick={(e) => this.promptEdit(contr)}
                            >
                                <i className="icomoon icon-edit fa-2x" />
                                <span>Edit</span>
                            </Button>
                            <Button
                                disabled={!isOwner || contr.role === "Owner"}
                                className="repository-details-action"
                                onClick={(e) => this.promptRemove(contr)}
                            >
                                <i className="icomoon icon-delete fa-2x" />
                                <span>Delete</span>
                            </Button>
                        </td>
                    </tr>
                );
            }
        );
    }
    render() {
        const { isOwner } = this.props;
        if (this.props.contributors.get("status") === "loading") {
            return <SquareSpinner />;
        } else if (this.props.contributors.get("status") === "error") {
            return (
                <Alert color="danger">
                    {this.props.contributors.get("error")}
                </Alert>
            );
        }

        return (
            <React.Fragment>
                <ContributorDialog
                    modal={this.state.modal}
                    toggle={this.toggle}
                    closeDialog={this.closeDialog}
                    contributor={this.props.contributor}
                    editMode={this.state.editMode}
                    onFormSubmit={this.props.onContributorSubmit}
                />
                <ConfirmationDialog
                    modal={this.state.removeModal}
                    toggle={this.toggleRemove}
                    disabled={
                        this.props.contributor.get("status") === "loading"
                    }
                    loading={this.props.contributor.get("status") === "loading"}
                    closeDialog={this.closeDialog}
                    contributor={this.props.contributor}
                    error={this.state.removeError}
                    onResponse={(confirmed) => {
                        if (confirmed) {
                            this.props
                                .onContributorRemove(
                                    this.props.contributor.get("data")
                                )
                                .then((action) => {
                                    this.closeDialog();
                                })
                                .catch((err) => {
                                    this.setState({
                                        removeError: err,
                                    });
                                });
                        }
                    }}
                    title={this.state.removeTitle}
                    message={this.state.removeMessage}
                />
                <Table className="repository-table mb-0" responsive>
                    <thead>
                        <tr>
                            <th className="col-4">Username</th>
                            <th className="col-4">Assigned Role</th>
                            <th className="repository-details-action-header col-4">
                                Possible Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>{this.renderRows()}</tbody>
                </Table>
                {isOwner && (
                    <div className="action-button-wrapper pt-2">
                        <Button
                            className="action-button mt-5"
                            onClick={this.openDialog}
                        >
                            Add User
                        </Button>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

Contributors.propTypes = {
    contributors: ImmutablePropTypes.map,
    enablePagination: PropTypes.bool,
};

Contributors.defaultProps = {
    files: Map({
        data: List([]),
        status: "loading",
        error: "",
        statusCode: 0,
    }),
    enablePagination: false,
};

export default Contributors;
