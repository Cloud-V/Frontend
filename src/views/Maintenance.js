import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row } from "reactstrap";
import logo from "assets/img/brand/logo.svg";

class Maintenance extends Component {
    render() {
        return (
            <div className="app page-status d-flex justify-content-center align-items-center flex-column">
                <div className="logo-wrapper text-center mb-4">
                    <Link to={"/"}>
                        <img src={logo} alt="Cloud V" className="w-70 logo" />
                    </Link>
                </div>
                <Container>
                    <Row className="justify-content-center">
                        <h1 className="float-left display-3 mr-4">
                            <span
                                role="img"
                                aria-label="Construction Site Emoji"
                            >
                                🚧
                            </span>
                        </h1>
                        <div>
                            <h4 className="pt-3">
                                Cloud V is currently undergoing maintenance.
                            </h4>
                            <p className="text-muted float-left">
                                Sorry about that. Please check back later.
                            </p>
                        </div>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Maintenance;
