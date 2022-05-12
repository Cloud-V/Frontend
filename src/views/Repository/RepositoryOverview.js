import React, { Component } from "react";

import { Map } from "immutable";

import { Button, Col, Row } from "reactstrap";

import ImmutablePropTypes from "react-immutable-proptypes";

import Repository from "models/repository";
import CloneDialog from "partials/CloneDialog";

class RepositoryOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cloneModal: false,
        };
        this.openCloneDialog = this.openCloneDialog.bind(this);
        this.toggleClone = this.toggleClone.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
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
    closeDialog() {
        this.setState({
            cloneModal: false,
        });
    }
    render() {
        const description = this.props.repository.get("data").getDescription();
        const watches = this.props.repository.get("data").get("watches");
        const favs = this.props.repository.get("data").get("favorites");
        const isAdmin = this.props.isAdmin;
        const certified = this.props.repository.get("data").get("certified");
        const featured = this.props.repository.get("data").get("featured");

        return (
            <div className="repository-detials-overview">
                <CloneDialog
                    modal={this.state.cloneModal}
                    toggle={this.toggleClone}
                    status={this.props.status}
                    error={this.props.error}
                    repository={this.props.repository}
                    onFormSubmit={this.props.onRepositoryClone}
                />
                <div className="filler filler-h-1 filler-border-top hide-left hide-right w-100"></div>
                <div className="d-flex flex-column flex-md-row">
                    <div className="repository-detials-overview-actions col-lg-3 col-md-4 col-sm-12 ml-0 pl-0 pr-0">
                        <Row className="repository-detials-overview-actions-button-wrapper mr-0 ml-0 mb-sm-2">
                            <Col xl="12" lg="12" md="12" sm="12">
                                <Button
                                    className="d-flex justify-content-between align-items-center w-100"
                                    onClick={this.props.onRepositoryWatch}
                                >
                                    <Col
                                        md="6"
                                        className="pr-0 pl-0 d-flex justify-content-center"
                                    >
                                        <i className="mb-1 mt-1 icomoon icon-watch fa-2x mr-2"></i>
                                    </Col>
                                    <Col
                                        md="6"
                                        className="pr-0 pl-0 d-flex justify-content-start"
                                    >
                                        {this.props.repository.get("watched")
                                            ? "Un-watch"
                                            : "Watch"}
                                    </Col>
                                </Button>
                            </Col>
                            <Col xl="12" lg="12" md="12" sm="12">
                                <Button
                                    className="d-flex justify-content-between align-items-center w-100"
                                    onClick={this.props.onRepositoryFavorite}
                                >
                                    <Col
                                        md="6"
                                        className="pr-0 pl-0 d-flex justify-content-center"
                                    >
                                        <i className="mb-1 mt-1 icomoon icon-star fa-2x mr-2"></i>
                                    </Col>
                                    <Col
                                        md="6"
                                        className="pr-0 pl-0 d-flex justify-content-start"
                                    >
                                        {this.props.repository.get("favorited")
                                            ? "Un-Favorite"
                                            : "Favorite"}
                                    </Col>
                                </Button>
                            </Col>
                            <Col xl="12" lg="12" md="12" sm="12">
                                <Button
                                    className="d-flex justify-content-between align-items-center w-100"
                                    onClick={this.openCloneDialog}
                                >
                                    <Col
                                        md="6"
                                        className="pr-0 pl-0 d-flex justify-content-center"
                                    >
                                        <i className="mb-1 mt-1 icomoon icon-clone fa-2x fa-1-7 mr-2"></i>
                                    </Col>
                                    <Col
                                        md="6"
                                        className="pr-0 pl-0 d-flex justify-content-start"
                                    >
                                        Clone
                                    </Col>
                                </Button>
                            </Col>
                            <Col xl="12" lg="12" md="12" sm="12">
                                <Button
                                    className="d-flex justify-content-between align-items-center w-100"
                                    onClick={this.props.onRepositoryDownload}
                                >
                                    <Col
                                        md="6"
                                        className="pr-0 pl-0 d-flex justify-content-center"
                                    >
                                        <i className="mb-1 mt-1 icomoon icon-download fa-lg mr-2"></i>
                                    </Col>
                                    <Col
                                        md="6"
                                        className="pr-0 pl-0 d-flex justify-content-start"
                                    >
                                        Download
                                    </Col>
                                </Button>
                            </Col>
                        </Row>
                        <div className="filler hide-left h-100"></div>
                    </div>
                    <div className="repository-detials-overview-details col-lg-9 col-md-8 col-sm-12 d-flex flex-row pl-0 pr-0">
                        <div className="filler filler-vertical h-100"></div>
                        <div className="repository-detials-overview-details-content w-100 p-4  d-flex flex-column align-items-start">
                            <div
                                className={`repository-detials-overview-details-content-description mb-auto ${
                                    description.length ? "" : "font-italic"
                                }`}
                            >
                                {description.length
                                    ? description
                                    : "No description provided."}
                            </div>
                            <div className="d-flex justify-content-between w-100">
                                <div className="repository-detials-overview-details-content-stats">
                                    <div className="repository-detials-overview-details-content-stats-row mb-1">
                                        <i className="mb-1 mt-1 icomoon icon-star fa-lg md-size mr-2"></i>
                                        {favs} favorite{favs === 1 ? "" : "s"}
                                    </div>
                                    <div className="repository-detials-overview-details-content-stats-row">
                                        <i className="mb-1 mt-1 icomoon icon-watches mr-2"></i>
                                        {watches} watcher
                                        {watches === 1 ? "" : "s"}
                                    </div>
                                </div>
                                <div className="repository-detials-overview-details-content-certified">
                                    {certified && (
                                        <React.Fragment>
                                            <i className="mb-1 mt-1 icomoon icon-certified fa-lg mr-2">
                                                <span className="path1"></span>
                                                <span className="path2"></span>
                                            </i>
                                            Certified Repository
                                        </React.Fragment>
                                    )}
                                    {isAdmin && (
                                        <div className="repository-admin-btns mt-1">
                                            <Button
                                                outline
                                                className="action-button mr-2"
                                                onClick={
                                                    this.props
                                                        .onRepositoryFeature
                                                }
                                            >
                                                <i className="fa fa-star mr-2"></i>
                                                {featured
                                                    ? "Un-feature"
                                                    : "Feature"}
                                            </Button>
                                            <Button
                                                outline
                                                className="action-button"
                                                onClick={
                                                    this.props
                                                        .onRepositoryCertify
                                                }
                                            >
                                                <i className="fa fa-check mr-2"></i>
                                                {certified
                                                    ? "Un-certify"
                                                    : "Certify"}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RepositoryOverview.propTypes = {
    repository: ImmutablePropTypes.map,
};

RepositoryOverview.defaultProps = {
    repository: Map({
        data: new Repository({}),
        status: "loading",
        error: "",
        statusCode: 0,
    }),
};

export default RepositoryOverview;
