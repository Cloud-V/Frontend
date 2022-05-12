import React, { Component } from "react";

import { Alert, Container, Col, Card, CardBody } from "reactstrap";

import { connect } from "react-redux";

import { getProfile } from "store/actions/profile";
import { updateUser } from "store/actions/user";

import SquareSpinner from "partials/SquareSpinner";
import ProfileForm from "./ProfileForm";

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
        updateUser: (updates) => dispatch(updateUser(updates)),
    };
};

class ProfileEdit extends Component {
    async componentDidMount() {
        const ownerName = (this.ownerName = this.props.user
            .get("data")
            .get("username"));
        this.props.getProfile({
            ownerName,
        });
    }
    render() {
        const { profile, user } = this.props;
        const { ownerName } = this;
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
                                <h3>Edit Profile</h3>
                            </div>
                        </Col>
                    </div>
                    <div className="w-100 auth-box">
                        <Card className="w-100">
                            <CardBody className="profile-card w-100 d-flex flex-column justify-content-start align-items-center">
                                <ProfileForm
                                    profile={this.props.profile}
                                    status={user.get("status")}
                                    errorMessage={user.get("error").toString()}
                                    onSubmit={(e) => {
                                        console.log("E:", e);
                                        if (e.get("resetTutorials")) {
                                            e = e
                                                .remove("resetTutorials")
                                                .set("dashboardTour", false)
                                                .set("repositoryTour", false)
                                                .set("workspaceTour", false);
                                        }
                                        if (!e.has("personalURL")) {
                                            e = e.set("personalURL", "");
                                        }
                                        if (!e.has("displayName")) {
                                            e = e.set("displayName", "");
                                        }
                                        if (!e.has("about")) {
                                            e = e.set("about", "");
                                        }
                                        e = e
                                            .remove("username")
                                            .remove("email");
                                        const form = new FormData();
                                        e.forEach((val, k) =>
                                            form.append(k, val)
                                        );
                                        console.log(
                                            "gravatarEmail",
                                            form.get("gravatarEmail")
                                        );
                                        this.props
                                            .updateUser(form)
                                            .then((action) => {
                                                if (
                                                    action.error &&
                                                    action.error.length
                                                ) {
                                                    return;
                                                }
                                                this.props.getProfile({
                                                    ownerName,
                                                });
                                            })
                                            .catch((err) => {});
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
