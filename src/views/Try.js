import React, { Component } from "react";

import { Alert } from "reactstrap";

import { Page404 } from "pages";

import Status from "store/utils/status";

import { connect } from "react-redux";

import { tryRepository, setRepository } from "store/actions/repository";

import SquareSpinner from "partials/SquareSpinner";

import { Redirect } from "react-router-dom";

import Storage from "storage";

import { StorageKeys } from "../constants.js";

const mapStateToProps = (state) => {
    return {
        repository: state.get("repository"),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        tryRepository: () => dispatch(tryRepository()),
        setRepository: (repository) => dispatch(setRepository(repository)),
    };
};

class Try extends Component {
    async componentDidMount() {
        try {
            const repository = JSON.parse(
                Storage.get(StorageKeys.TrialRepository)
            );
            if (repository) {
                return this.props.setRepository(repository);
            } else {
                return await this.props.tryRepository();
            }
        } catch (err) {}
        await this.props.tryRepository();
    }

    render() {
        const { repository } = this.props;
        console.log(repository.toJS());
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
            return (
                <div className="flex-1 h-100 mt-15 d-flex justify-content-center align-items-center">
                    <SquareSpinner />
                </div>
            );
        }
        return (
            <Redirect
                to={`/${repository.get("data").get("ownerName")}/${repository
                    .get("data")
                    .get("repoName")}/ws`}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Try);
