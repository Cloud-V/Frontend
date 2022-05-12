import React, { Component } from "react";

import { Alert, Card, CardBody, Col, Container, Row } from "reactstrap";

import { connect } from "react-redux";

import { getTools } from "store/actions/tools";

import SquareSpinner from "partials/SquareSpinner";
import Navbar from "partials/Navbar";
import Footer from "partials/Footer";

const mapStateToProps = (state) => {
    return {
        tools: state.get("tools"),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTools: () => dispatch(getTools()),
    };
};

class Tools extends Component {
    constructor(props) {
        super(props);
        this.location = props.location;
    }

    async componentDidMount() {
        this.props.getTools();
    }

    render() {
        const { tools } = this.props;

        if (tools.get("status") === "loading" || tools.get("status") === "") {
            return (
                <div className="app">
                    <Navbar location={this.location} />
                    <div className="h-100 flex-1 d-flex justify-content-center align-items-center">
                        <SquareSpinner />
                    </div>
                    <Footer />
                </div>
            );
        } else if (tools.get("status") === "error") {
            return (
                <div className="app">
                    <Navbar location={this.location} />
                    <div className="flex-1 w-100 d-flex">
                        <Alert className="h-10 flex-1" color="danger">
                            {tools.get("error")}
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
                    className="tools flex-1 w-100 h-100 pl-0 pr-0 d-flex flex-column justify-content-center align-items-center"
                    fluid
                >
                    <Row className="w-100">
                        <Col className="center-all" md="12">
                            <h1 className="mb-4 pb-0 mt-3 font-weight-bold text-center">
                                Our Stack
                            </h1>
                        </Col>
                    </Row>
                    <br />
                    <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                        <Row className="center-all w-100">
                            <Col
                                className="tools-section tools-section-hardware mb-4"
                                md="6"
                                lg="4"
                                sm="12"
                            >
                                <h2 className="mb-2">EDA Tools</h2>
                                {tools
                                    .get("data")
                                    .get("hardware")
                                    .toJS()
                                    .map((tool) => (
                                        <a
                                            className="plain-link primary no-decoration"
                                            href={tool.link}
                                            key={tool.id}
                                        >
                                            <Card className="mb-2">
                                                <CardBody className="pt-2 pb-2">
                                                    {tool.name}
                                                </CardBody>
                                            </Card>
                                        </a>
                                    ))}
                            </Col>
                        </Row>
                        <br />
                        <Row className="center-all">
                            <Col
                                className="tools-section tools-section-web"
                                md="6"
                                lg="8"
                                sm="12"
                            >
                                <h2 className="mb-2">Platform and IDE</h2>
                                <Row className="justify-content-center">
                                    {tools
                                        .get("data")
                                        .get("web")
                                        .toJS()
                                        .map((tool) => (
                                            <Col
                                                key={tool.id}
                                                className="mb-4"
                                                md="4"
                                                sm="12"
                                            >
                                                <a
                                                    className="plain-link primary no-decoration"
                                                    href={tool.link}
                                                >
                                                    <Card className="mb-2 h-100">
                                                        <CardBody className="pt-0 pb-0 d-flex justify-content-center align-items-center flex-column text-center">
                                                            <img
                                                                className="tool-img"
                                                                src={
                                                                    tool.avatar
                                                                }
                                                                alt={tool.name}
                                                            ></img>
                                                            {tool.name}
                                                        </CardBody>
                                                    </Card>
                                                </a>
                                            </Col>
                                        ))}
                                </Row>
                            </Col>
                        </Row>
                        <br />
                        <Row className="center-all">
                            <p>
                                IDE Icons adapted from{" "}
                                <a href="https://remixicon.com/">Remix Icon</a>
                            </p>
                        </Row>
                    </div>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
