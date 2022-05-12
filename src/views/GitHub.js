import React, { Component } from "react";

import { Alert, Container } from "reactstrap";

import { connect } from "react-redux";

import queryString from "query-string";

import Navbar from "partials/Navbar";
import Footer from "partials/Footer";
import SquareSpinner from "partials/SquareSpinner";
import { push } from "connected-react-router/immutable";

import { sendGitHubCode } from "store/actions/user";

const mapStateToProps = (state) => {
    return {
        user: state.get("user"),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendGitHubCode: ({ code }) =>
            dispatch(
                sendGitHubCode({
                    code,
                })
            ),
        redirectToComplete: () => dispatch(push("/complete")),
        redirectToIndex: () => dispatch(push("/")),
    };
};

class GitHub extends Component {
    constructor(props) {
        super(props);
        this.location = props.location;
        this.code = queryString.parse(props.location.search).code;
        this.hasCode = !!this.code;
    }
    componentDidMount() {
        if (this.hasCode) {
            const { code } = this;
            this.props.sendGitHubCode({
                code,
            });
        }
        this.setState({});
    }

    render() {
        return (
            <div className="app">
                <Navbar location={this.location} />
                <Container
                    className="search-explore flex-1 w-100 h-100 pl-0 pr-0"
                    fluid
                >
                    {(() => {
                        const { user } = this.props;
                        const isLogged = !!(
                            !user.get("data").isEmpty() &&
                            user.get("data").get("username").length
                        );
                        const signupComplete = user
                            .get("data")
                            .get("authComplete");
                        if (isLogged) {
                            if (signupComplete) {
                                this.props.redirectToIndex();
                            } else {
                                this.props.redirectToComplete();
                            }
                            return null;
                        }
                        if (!this.hasCode) {
                            return (
                                <Alert color="danger">
                                    GitHub authentication failed.
                                </Alert>
                            );
                        }
                        if (
                            user.get("status") === "action-loading" ||
                            user.get("status") === ""
                        ) {
                            return (
                                <div className="flex-1 h-100 mt-15 d-flex justify-content-center align-items-center">
                                    <SquareSpinner />
                                </div>
                            );
                        } else if (user.get("status") === "action-error") {
                            return (
                                <Alert color="danger">
                                    {user.get("error").toString()}
                                </Alert>
                            );
                        }
                        return null;
                    })()}
                </Container>
                <Footer />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GitHub);
