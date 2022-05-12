import React, { Component } from "react";

import { Alert, Container, Col, Card, CardBody } from "reactstrap";

import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

import { getProfile } from "store/actions/profile";
import { updatePassword } from "store/actions/user";

import SquareSpinner from "partials/SquareSpinner";
import ProfilePasswordForm from "./ProfilePasswordForm";

import { URLs } from "../../constants.js";

const mapStateToProps = (state) => {
    return {
        user: state.get("user"),
        profile: state.get("profile"),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: ({ ownerName }) =>
            dispatch(
                getProfile({
                    ownerName,
                })
            ),
        updatePassword: ({ currentPassword, password }) =>
            dispatch(
                updatePassword({
                    currentPassword,
                    password,
                })
            ),
    };
};

class ProfileEditPassword extends Component {
    async componentDidMount() {
        const ownerName = this.props.user.get("data").get("username");
        this.props.getProfile({
            ownerName,
        });
    }
    render() {
        const { profile, user } = this.props;
        if (
            profile.get("status") === "action-loading" ||
            profile.get("status") === ""
        ) {
            return <SquareSpinner />;
        } else if (profile.get("status") === "action-error") {
            return (
                <Alert color="danger">{profile.get("error").toString()}</Alert>
            );
        }
        if (user.get("status") === "action-loading") {
            return <SquareSpinner />;
        }
        if (user.get("status") === "action-success") {
            return <Redirect push to={`/${URLs.Edit}`} />;
        }
        return (
            <Container
                className="h-100 d-flex justify-content-center align-items-center"
                fluid
            >
                <Col
                    xl="4"
                    lg="5"
                    md="8"
                    className="d-flex justify-content-center align-items-center flex-column"
                >
                    <div className="auth-section w-100 auth-logo">
                        <Col className="d-flex mr-0 mb-4 justify-content-center align-items-center flex-column">
                            <div className="w-100 text-center mt-4">
                                <h3>Change Password</h3>
                            </div>
                        </Col>
                    </div>
                    <div className="w-100 auth-box">
                        <Card className="w-100">
                            <CardBody className="profile-card w-100 d-flex flex-column justify-content-start align-items-center">
                                <ProfilePasswordForm
                                    profile={this.props.profile}
                                    status={user.get("status")}
                                    errorMessage={user.get("error").toString()}
                                    onSubmit={(e) => {
                                        e = e.remove("username");
                                        this.props.updatePassword(e.toJS());
                                    }}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileEditPassword);
