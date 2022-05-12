import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router/immutable";
import { Redirect } from "react-router-dom";

import glogo from "assets/g-logo.png";

const mapStateToProps = (state) => {
    return {
        user: state.get("user"),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        redirectToGoogle: ({ code }) =>
            dispatch(push(`/google?code=${encodeURIComponent(code)}`)),
    };
};

class GSignin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            redirect: false,
            code: "",
        };
    }
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/platform.js";
        script.async = true;
        script.onload = () => {
            window.gapi.load("auth2", () => {
                if (process.env.REACT_APP_GOOGLE_CLIENT_ID) {
                    const auth2 = window.gapi.auth2.init({
                        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                        cookiepolicy: "single_host_origin",
                    });
                    this.setState({
                        active: true,
                        redirect: false,
                        code: "",
                    });
                    auth2.attachClickHandler(
                        document.getElementById("gsignin"),
                        {},
                        (googleUser) => {
                            const code = googleUser.getAuthResponse().id_token;
                            this.setState({
                                active: true,
                                redirect: true,
                                code,
                            });
                        },
                        (err) => {
                            console.error(err);
                        }
                    );
                } else {
                    console.error(
                        "No Google app ID. Sign in with Google will be disabled."
                    );
                }
            });
        };
        document.head.appendChild(script);
    }
    render() {
        if (this.state.redirect) {
            return (
                <Redirect
                    to={`/google?code=${encodeURIComponent(this.state.code)}`}
                />
            );
        }
        return (
            <div
                id={this.props.id || "gsignin"}
                className={`customGPlusSignIn sm-signin btn w-100 text-center ${
                    this.state.active ? "social-enabled" : "social-disabled"
                }`}
            >
                <img src={glogo} alt="Google" className="icon"></img>
                <span className="name">Google</span>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GSignin);
