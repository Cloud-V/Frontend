import React, { Component } from "react";

import { Container, Button, Row, Col } from "reactstrap";

import TabContent from "modules/rc-tabs/lib/TabContent";

import { Link } from "react-router-dom";

import { URLs } from "../../constants.js";

export default class TabContentLayout extends Component {
    render() {
        const { isOwner, isWriter } = this.props;
        return (
            <Container className="repository-details">
                <Row className="repository-details-title d-flex justify-content-between flex-column flex-md-row">
                    <Col
                        xl="6"
                        lg="5"
                        md="5"
                        sm="12"
                        className="repository-details-title-text d-flex align-items-center justify-content-start flex-wrap"
                    >
                        {" "}
                        <Link
                            className="plain-link black no-decoration"
                            to={`/${URLs.Repositories}/${this.props.repository
                                .get("data")
                                .get("ownerName")}`}
                        >
                            {this.props.repository.get("data").get("ownerName")}
                        </Link>
                        &nbsp;/&nbsp;
                        <Link
                            className="plain-link black no-decoration"
                            to={`/${this.props.repository
                                .get("data")
                                .get("ownerName")}/${this.props.repository
                                .get("data")
                                .get("repoName")}`}
                        >
                            {this.props.repository.get("data").get("repoTitle")}
                        </Link>
                    </Col>
                    <Col
                        xl="6"
                        lg="7"
                        md="7"
                        sm="12"
                        className="repository-details-actions d-flex flex-column flex-md-row"
                    >
                        {/* {isWriter && (
							<Col
								xl="1"
								lg="1"
								md="1"
								sm="12"
								className="d-flex"
							>
								<Link
									title="Legacy Workspace"
									target="_blank"
									to={`/${this.props.repository
										.get("data")
										.get(
											"ownerName"
										)}/${this.props.repository
										.get("data")
										.get("repoName")}/ws-legacy	`}
									className="btn repository-details-action-btn beta-btn"
								>
									<i className="mb-1 mt-1 fas fa-tools mr-1 fa-lg" />
								</Link>
							</Col>
						)} */}
                        {isWriter && (
                            <Col xl="4" lg="4" md="4" sm="12">
                                <Link
                                    title="Workspace"
                                    target="_blank"
                                    to={`/${this.props.repository
                                        .get("data")
                                        .get(
                                            "ownerName"
                                        )}/${this.props.repository
                                        .get("data")
                                        .get("repoName")}/ws`}
                                    className="btn repository-details-action-btn"
                                >
                                    <i className="mb-1 mt-1 icomoon icon-workspace fa-lg" />
                                    Workspace
                                </Link>
                            </Col>
                        )}

                        {/* {isOwner && (
							<Col xl="4" lg="4" md="4" sm="12">
								<Button
									title="Publish"
									onClick={this.props.openPublish}
									className="repository-details-action-btn"
								>
									<i className="mb-1 mt-1 icomoon icon-publish fa-lg" />
									Publish
								</Button>
							</Col>
						)} */}
                        {isOwner && (
                            <Col xl="4" lg="4" md="4" sm="12">
                                <Button
                                    title="Settings"
                                    onClick={this.props.openSettings}
                                    className="repository-details-action-btn"
                                >
                                    <i className="mb-1 mt-1 icomoon icon-settings fa-lg" />
                                    Settings
                                </Button>
                            </Col>
                        )}
                    </Col>
                </Row>
                <TabContent {...this.props}>{this.props.children}</TabContent>
            </Container>
        );
    }
}
