import React, { Component } from "react";

import { List, Map } from "immutable";

import { Alert, Container, Row } from "reactstrap";

import _ from "lodash";
import ReactGA from "react-ga";

import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";

import Repository from "./Repository";
import FloatButton from "partials/FloatButton";
import SquareSpinner from "partials/SquareSpinner";
import Pagination from "partials/Pagination";
import NewRepositoryDialog from "./NewRepositoryDialog";
import CloneDialog from "partials/CloneDialog";

import { Pagination as PaginationData } from "../../constants.js";

class Repositories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            cloneModal: false,
        };
        this.toggle = this.toggle.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.toggleClone = this.toggleClone.bind(this);
        this.openCloneDialog = this.openCloneDialog.bind(this);
        this.onClone = this.onClone.bind(this);
    }
    onClone(repository) {
        this.props
            .setRepository(repository)
            .then((action) => {
                ReactGA.modalview(
                    `/${repository.get("ownerName")}/${repository.get(
                        "repoName"
                    )}/clone`
                );
                this.openCloneDialog();
            })
            .catch(console.error);
    }
    openDialog() {
        ReactGA.modalview("/dashboard/new");
        this.setState({
            modal: true,
        });
        if (this.props.onOpenDialog) {
            this.props.onOpenDialog(true);
        }
    }
    toggle() {
        if (this.props.status === "loading") {
            return;
        }
        this.setState((prevState) => {
            return {
                modal: !prevState.modal,
            };
        });
    }
    openCloneDialog() {
        this.setState({
            cloneModal: true,
        });
    }
    toggleClone() {
        if (this.props.status === "loading") {
            return;
        }
        this.setState((prevState) => ({
            cloneModal: !prevState.cloneModal,
        }));
    }
    render() {
        if (this.props.repositories.get("status") === "loading") {
            return <SquareSpinner />;
        } else if (this.props.repositories.get("status") === "error") {
            return (
                <Alert color="danger">
                    {this.props.repositories.get("error")}
                </Alert>
            );
        }
        const pagination = this.props.repositories.get("pagination").toJS();
        return (
            <React.Fragment>
                <Container
                    className="h-100 repositories d-flex flex-column"
                    fluid
                >
                    <Row className="">
                        {_.chunk(
                            this.props.repositories.get("data").toArray(),
                            3
                        ).map((repos, index) => (
                            <React.Fragment key={index}>
                                {repos.map((repo) => (
                                    <Repository
                                        key={repo.get_id()}
                                        onClone={this.onClone}
                                        onDownload={
                                            this.props.onRepositoryDownload
                                        }
                                        repository={repo}
                                    />
                                ))}
                            </React.Fragment>
                        ))}
                    </Row>
                    {this.props.enablePagination ? (
                        <Pagination
                            className={`${
                                this.props.repositories.get("data").size
                                    ? ""
                                    : "d-none"
                            }`}
                            size={Math.ceil(
                                pagination.count / PaginationData.ReposPerPage
                            )}
                            handlePageClick={this.props.handlePageClick}
                            page={this.props.page}
                            pageLink={this.props.pageLink || "dashboard"}
                            refreshPage={this.props.refreshPage}
                        />
                    ) : null}
                </Container>
                <CloneDialog
                    modal={this.state.cloneModal}
                    toggle={this.toggleClone}
                    status={this.props.status}
                    error={this.props.error}
                    repository={this.props.repository}
                    onFormSubmit={this.props.onRepositoryClone}
                />
                {this.props.hasCreateButton ? (
                    <NewRepositoryDialog
                        modal={this.state.modal}
                        toggle={this.toggle}
                        status={this.props.status}
                        error={this.props.error}
                        repository={this.props.repository}
                        onFormSubmit={this.props.onRepositorySubmit}
                        onOpenDialog={this.props.onOpenDialog}
                    />
                ) : null}
                {this.props.hasCreateButton ? (
                    <FloatButton
                        onClick={this.openDialog}
                        title="Create Repository"
                    />
                ) : null}
            </React.Fragment>
        );
    }
}

Repositories.propTypes = {
    repositories: ImmutablePropTypes.map,
    // .mapOf(
    // 	PropTypes.any, // validation for values
    // 	ImmutablePropTypes.mapContains({ // validation for keys
    // 		data: ImmutablePropTypes.list,
    // 		status: PropTypes.string,
    // 		error: PropTypes.string
    // 	})
    // ),
    hasCreateButton: PropTypes.bool,
    enablePagination: PropTypes.bool,
};

Repositories.defaultProps = {
    repositories: Map({
        data: List([]),
        status: "loading",
        error: "",
    }),
    hasCreateButton: false,
    enablePagination: false,
};

export default Repositories;
