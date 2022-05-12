import React, { Component } from "react";
import { Col } from "reactstrap";
import PropTypes from "prop-types";
import { AppFooter } from "@coreui/react";
import { Link } from "react-router-dom";

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class Footer extends Component {
    render() {
        return (
            <AppFooter className="d-flex justify-content-between">
                <Col md="auto" className="footer-copyright">
                    <span>
                        &copy; 2014-{new Date().getFullYear()}{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://aucegypt.edu"
                        >
                            The American University in Cairo
                        </a>{" "}
                        and the Cloud V Project. All rights reserved.
                    </span>
                </Col>
                <Col md="auto" className="footer-links">
                    <Col md="auto" sm="12">
                        <Link className="" to="/tools">
                            Tools
                        </Link>
                    </Col>
                    <Col md="auto" sm="12">
                        <Link className="" to="/privacy">
                            Privacy Policy
                        </Link>
                    </Col>
                    <Col md="auto" sm="12">
                        <Link className="" to="/terms">
                            Terms of Service
                        </Link>
                    </Col>
                    <Col md="auto" sm="12">
                        <Link className="" to="/about">
                            About Us
                        </Link>
                    </Col>
                    <Col md="auto" sm="12">
                        <Link className="mr-2" to="/contact">
                            Contact Us
                        </Link>
                    </Col>
                </Col>
            </AppFooter>
        );
    }
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
