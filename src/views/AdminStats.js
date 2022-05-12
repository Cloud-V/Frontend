import React, { Component } from "react";

import { Alert, Col, Container, Row, Table } from "reactstrap";

import { connect } from "react-redux";

import { getStats } from "store/actions/stats";
import { Page404 } from "pages";

import SquareSpinner from "partials/SquareSpinner";
import Navbar from "partials/Navbar";
import Footer from "partials/Footer";

const mapStateToProps = (state) => {
    return {
        stats: state.get("stats"),
        user: state.get("user"),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStats: () => dispatch(getStats()),
    };
};

class AdminStats extends Component {
    constructor(props) {
        super(props);
        this.location = props.location;
    }

    async componentDidMount() {
        console.log(this.props.user);
        this.props.getStats();
    }

    render() {
        const { stats, user } = this.props;
        if (!user || !user.get("data") || !user.get("data").get("admin")) {
            return <Page404 />;
        }
        if (stats.get("status") === "loading" || stats.get("status") === "") {
            return (
                <div className="app">
                    <Navbar location={this.location} />
                    <div className="h-100 flex-1 d-flex justify-content-center align-items-center">
                        <SquareSpinner />
                    </div>
                    <Footer />
                </div>
            );
        } else if (stats.get("status") === "error") {
            return (
                <div className="app">
                    <Navbar location={this.location} />
                    <div className="flex-1 w-100 d-flex">
                        <Alert className="h-10 flex-1" color="danger">
                            {stats.get("error")}
                        </Alert>
                    </div>
                    <Footer />
                </div>
            );
        }
        const statsJson = stats.get("data").toJS();

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
                                Admin Statistics
                            </h1>
                        </Col>
                    </Row>
                    <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                        <Row className="center-all w-100">
                            <Col
                                className="tools-section tools-section-hardware mb-4"
                                md="6"
                                lg="4"
                                sm="12"
                            >
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Statistic</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>No. of Users</td>
                                            <td>{statsJson.users}</td>
                                        </tr>
                                        <tr>
                                            <td>No. of Repositories</td>
                                            <td>{statsJson.repositories}</td>
                                        </tr>
                                        <tr>
                                            <td>No. of File Entries</td>
                                            <td>{statsJson.repoEntries}</td>
                                        </tr>
                                        <tr>
                                            <td>No. of Verilog Files</td>
                                            <td>{statsJson.verilogEntries}</td>
                                        </tr>
                                        <tr>
                                            <td>No. of Netlist Files</td>
                                            <td>{statsJson.netlistEntries}</td>
                                        </tr>
                                        <tr>
                                            <td>No. of Testbenches</td>
                                            <td>
                                                {statsJson.testbenchEntries}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>No. of Simulations</td>
                                            <td>
                                                {statsJson.simulationEntries}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </div>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminStats);
