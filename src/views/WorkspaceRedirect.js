import React, { Component } from "react";

import { Alert } from "reactstrap";

import { Page404 } from "pages";

import Status from "store/utils/status";
import Storage from "storage";

import { connect } from "react-redux";

import { getRepository } from "store/actions/repository";

import SquareSpinner from "partials/SquareSpinner";

import { URLs, StorageKeys } from "../constants.js";

import BrowserDetection from "react-browser-detection";

const mapStateToProps = (state) => {
    return {
        repository: state.get("repository"),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        repositoryGet: ({ ownerName, repoName }) =>
            dispatch(
                getRepository({
                    ownerName,
                    repoName,
                })
            ),
    };
};

class WorkspaceRedirect extends Component {
    constructor(props) {
        super(props);
        this.location = props.location;
        this.state = {
            repoName: this.props.match.params.repoName,
            ownerName: this.props.match.params.ownerName,
        };
    }
    async componentDidMount() {
        const { ownerName, repoName } = this.state;
        await this.props.repositoryGet({
            ownerName,
            repoName,
        });
    }

    render() {
        const { repository } = this.props;
        if (repository.get("statusCode") === 404) {
            return <Page404 />;
        } else if (repository.get("status") === "error") {
            return (
                <Alert color="danger">
                    {repository.get("error").toString()}
                </Alert>
            );
        } else if (
            repository.get("status") === Status.Loading ||
            repository.get("data").get("_id") === ""
        ) {
            return <SquareSpinner />;
        }
        const browserHandler = {
            safari: () => (
                <React.Fragment>
                    <SquareSpinner />
                    {(() => {
                        var form = document.createElement("form");
                        form.style.display = "none";
                        var token = document.createElement("input");
                        token.name = "token";
                        token.value = JSON.parse(
                            Storage.get(StorageKeys.User)
                        ).token;
                        form.method = "POST";
                        form.action = `${URLs.Default}/${repository
                            .get("data")
                            .get("ownerName")}/${repository
                            .get("data")
                            .get("repoName")}/${URLs.WorkspaceSafari}`;
                        form.appendChild(token);
                        document.body.appendChild(form);
                        form.submit();
                        return null;
                    })()}
                </React.Fragment>
            ),
            default: (browser) => (
                <React.Fragment>
                    <SquareSpinner />
                    {(() => {
                        window.location.replace(
                            `${URLs.Default}/${repository
                                .get("data")
                                .get("ownerName")}/${repository
                                .get("data")
                                .get("repoName")}/${URLs.Workspace}`
                        );
                        return null;
                    })()}
                </React.Fragment>
            ),
        };
        return (
            <React.Fragment>
                <BrowserDetection>{browserHandler}</BrowserDetection>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceRedirect);
