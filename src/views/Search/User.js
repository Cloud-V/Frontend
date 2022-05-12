import React, { Component } from "react";

import { Col, Card, CardBody } from "reactstrap";

import { Link } from "react-router-dom";

import { URLs } from "../../constants.js";

class User extends Component {
    render() {
        const { user } = this.props;
        const userData = user.toJS();
        const username = userData.username;
        const displayName =
            userData.displayName ||
            (userData.username.length ? "@" + userData.username : "");
        const avatarURL = `${URLs.Avatar}/${userData.username}.png`;
        return (
            <Col sm="12" md="6" lg="4">
                <Card className="search-user">
                    <CardBody className="d-flex">
                        <div className="d-flex mt-2 mr-4 h-100 justify-content-center align-items-center">
                            <Link to={`/${username}`}>
                                <img
                                    src={avatarURL}
                                    className="img-avatar"
                                    alt={displayName}
                                ></img>
                            </Link>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="user-header mb-2">
                                <Link to={`/${username}`}>{displayName}</Link>
                            </div>
                            <div className="user-subheader">
                                <Link to={`/${username}`}>@{username}</Link>
                            </div>
                            <div className="user-repositories">
                                <Link
                                    className="profile-repositories-link plain-link black"
                                    to={`/${URLs.Repositories}/${username}`}
                                >
                                    Repositories
                                </Link>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default User;
