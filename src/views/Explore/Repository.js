import React, { Component } from "react";

import {
    Button,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardText,
    CardFooter,
} from "reactstrap";

import Truncate from "react-truncate";

import { Link } from "react-router-dom";

class Repository extends Component {
    render() {
        const repo = this.props.repository;
        return (
            <Col sm="12" md="6" lg="6" xl="4">
                <Card className="search-repository mr-xl-4 mr-lg-1 mb-lg-5">
                    <CardHeader className="d-flex flex-column align-items-start justify-content-center">
                        <div className="repository-header mb-2 w-100">
                            <Link
                                to={`/${repo.getOwnerName()}/${repo.getRepoName()}`}
                            >
                                {repo.getRepoTitle()}
                            </Link>
                        </div>
                        <div className="repository-subheader">
                            <Link to={`/${repo.getOwnerName()}`}>
                                {repo.getOwnerName()}
                            </Link>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            {!repo.getDescription().length ? (
                                <span className="font-italic">
                                    No description provided.
                                </span>
                            ) : (
                                <Truncate
                                    lines={3}
                                    ellipsis={
                                        <span>
                                            ..
                                            <Link
                                                to={`/${repo.getOwnerName()}/${repo.getRepoName()}`}
                                            >
                                                Read more
                                            </Link>
                                        </span>
                                    }
                                >
                                    {repo.getDescription()}
                                </Truncate>
                            )}
                        </CardText>
                    </CardBody>
                    <CardFooter>
                        <Row className="d-flex ml-0 mr-0 w-100 h-100 pl-2 pb-2">
                            <Button
                                title="Favorites"
                                onClick={(e) => null}
                                className={`d-flex flex-row justify-content-center align-items-center h-100 repository-button ${
                                    repo.get("favorited") ? "favorited" : ""
                                }`}
                            >
                                <i className="mb-1 mt-1 mr-1 icomoon icon-star"></i>
                                <span className="favorites ml-1">
                                    {repo.get("favorites") || 0}
                                </span>
                            </Button>
                            <Button
                                title="Watches"
                                onClick={(e) => null}
                                className={`d-flex flex-row justify-content-center align-items-center h-100 repository-button ${
                                    repo.get("watched") ? "favorited" : ""
                                }`}
                            >
                                <i className="mb-1 mt-1 mr-1 icomoon icon-watch"></i>
                                <span className="favorites ml-1">
                                    {repo.get("watches") || 0}
                                </span>
                            </Button>
                        </Row>
                    </CardFooter>
                </Card>
            </Col>
        );
    }
}

export default Repository;
