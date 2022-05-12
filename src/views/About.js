import React, { Component } from "react";

import { Alert, Card, CardBody, Col, Container, Row } from "reactstrap";

import { connect } from "react-redux";

import { getAbout } from "store/actions/about";

import SquareSpinner from "partials/SquareSpinner";
import Navbar from "partials/Navbar";
import Footer from "partials/Footer";

const mapStateToProps = (state) => {
    return {
        about: state.get("about"),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAbout: () => dispatch(getAbout()),
    };
};

class Tools extends Component {
    constructor(props) {
        super(props);
        this.location = props.location;
    }

    async componentDidMount() {
        this.props.getAbout();
    }

    render() {
        const { about } = this.props;

        if (about.get("status") === "loading" || about.get("status") === "") {
            return (
                <div className="app">
                    <Navbar location={this.location} />
                    <div className="h-100 d-flex flex-1 justify-content-center align-items-center">
                        <SquareSpinner />
                    </div>
                    <Footer />
                </div>
            );
        } else if (about.get("status") === "error") {
            return (
                <div className="app">
                    <Navbar location={this.location} />
                    <div className="flex-1 w-100 d-flex">
                        <Alert className="h-10 flex-1" color="danger">
                            {about.get("error")}
                        </Alert>
                    </div>
                    <Footer />
                </div>
            );
        }

        return (
            <div className="app">
                <Navbar location={this.location} />
                <Container
                    className="about flex-1 w-100 h-100 pl-0 pr-0 d-flex flex-column justify-content-center align-items-center"
                    fluid
                >
                    <h1 className="mb-4 pb-0 mt-3 font-weight-bold">
                        About Cloud V
                    </h1>
                    <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                        <div className="about-section about-section-content w-75 mb-4">
                            {about
                                .get("data")
                                .get("content")
                                .split(/\n+/)
                                .map((content, idx) => (
                                    <p key={idx}>{content}</p>
                                ))}
                        </div>
                        <div className="about-section about-section-team w-75 mb-4">
                            <h2 className="mb-3">Cloud V Team</h2>
                            <Row className="justify-content-center">
                                {about
                                    .get("data")
                                    .get("team")
                                    .toJS()
                                    .map((member) => (
                                        <Col
                                            key={member.id}
                                            className="mb-4"
                                            lg="4"
                                            md="6"
                                            sm="12"
                                        >
                                            <a
                                                className="plain-link primary no-decoration"
                                                href={member.link || "#"}
                                            >
                                                <Card className="mb-2 h-100">
                                                    <CardBody className="pt-0 pb-0 d-flex justify-content-center align-items-center flex-column text-center">
                                                        <div className="pt-0 pb-0 d-flex flex-row justify-content-center align-items-center text-center">
                                                            <img
                                                                className="member-avatar"
                                                                src={
                                                                    member.avatar ||
                                                                    "/assets/img/avatars/noavatar.png"
                                                                }
                                                                alt={
                                                                    member.name
                                                                }
                                                            />
                                                            <div className="member-data">
                                                                <h3 className="font-weight-bold">
                                                                    {
                                                                        member.name
                                                                    }
                                                                </h3>
                                                                <h4 className="">
                                                                    {
                                                                        member.title
                                                                    }
                                                                </h4>
                                                                <h5 className="">
                                                                    {
                                                                        member.role
                                                                    }
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </a>
                                        </Col>
                                    ))}
                            </Row>
                        </div>
                    </div>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
