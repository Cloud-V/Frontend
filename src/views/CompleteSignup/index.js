import React, { Component } from "react";

import { Container, Col, Card, CardBody } from "reactstrap";

import { connect } from "react-redux";

import { Link, Redirect } from "react-router-dom";

import { completeSignup } from "store/actions/user";

import SquareSpinner from "partials/SquareSpinner";
import CompleteSignupForm from "./CompleteSignupForm";
import logo from "assets/img/brand/logo.svg";

const mapStateToProps = (state) => {
    return {
        user: state.get("user"),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        completeSignup: ({ username }) =>
            dispatch(
                completeSignup({
                    username,
                })
            ),
    };
};

class CompleteSignup extends Component {
    render() {
        const { user } = this.props;
        const isLogged =
            !user.get("data").isEmpty() &&
            user.get("data").get("username").length;
        const signupComplete = user.get("data").get("authComplete");
        if (user.get("status") === "action-loading") {
            return (
                <Container
                    className="app h-100 d-flex justify-content-center align-items-center"
                    fluid
                >
                    <SquareSpinner />
                </Container>
            );
        }
        if (!isLogged && user.get("status") !== "action-error") {
            return <Redirect to={"/login"} />;
        }
        if (signupComplete) {
            return <Redirect to={"/"} />;
        }
        return (
            <Container
                className="app h-100 d-flex justify-content-center align-items-center"
                fluid
            >
                <Col
                    md="3"
                    className="d-flex justify-content-center align-items-center flex-column"
                >
                    <div className="auth-section w-100 auth-logo">
                        <Col className="d-flex mr-0 mb-4 justify-content-center align-items-center flex-column">
                            <div className="logo-wrapper text-center">
                                <Link to={"/"}>
                                    <img
                                        src={logo}
                                        alt="Cloud V"
                                        className="w-70 logo"
                                    />
                                </Link>
                            </div>
                            <div className="w-100 text-center mt-4">
                                <h3>Complete Signup</h3>
                            </div>
                        </Col>
                    </div>
                    <div className="w-100 auth-box">
                        {user.get("status") === "action-success" ? (
                            <Redirect to={"/"} />
                        ) : (
                            <Card className="w-100">
                                <CardBody className="profile-card w-100 d-flex flex-column justify-content-start align-items-center">
                                    <CompleteSignupForm
                                        user={user}
                                        status={user.get("status")}
                                        errorMessage={user
                                            .get("error")
                                            .toString()}
                                        onSubmit={(e) => {
                                            const username = e.get("username");
                                            this.props.completeSignup({
                                                username,
                                            });
                                        }}
                                    />
                                </CardBody>
                            </Card>
                        )}
                    </div>
                </Col>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteSignup);
