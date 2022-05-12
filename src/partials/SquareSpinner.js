import React, { Component } from "react";

import { Container } from "reactstrap";

class SquareSpinner extends Component {
    render() {
        return (
            <Container
                className="h-100 w-100 d-flex justify-content-center align-items-center"
                fluid
            >
                <div className="sk-cube-grid">
                    <div className="sk-cube sk-cube1"></div>
                    <div className="sk-cube sk-cube2"></div>
                    <div className="sk-cube sk-cube3"></div>
                    <div className="sk-cube sk-cube4"></div>
                    <div className="sk-cube sk-cube5"></div>
                    <div className="sk-cube sk-cube6"></div>
                    <div className="sk-cube sk-cube7"></div>
                    <div className="sk-cube sk-cube8"></div>
                    <div className="sk-cube sk-cube9"></div>
                </div>
            </Container>
        );
    }
}

export default SquareSpinner;
