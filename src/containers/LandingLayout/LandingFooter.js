import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { AppFooter } from "@coreui/react";

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class LandingFooter extends Component {
    render() {
        return (
            <AppFooter className="landing-footer">
                <span>
                    <a href="https://cloudv.io">Cloud V</a> &copy; 2018
                </span>
                <div className="ml-auto">
                    <Link className="mr-4" to="/tools">
                        Tools
                    </Link>
                    <Link className="mr-4" to="/privacy">
                        Privacy Policy
                    </Link>
                    <Link className="mr-4" to="/terms">
                        Terms of Service
                    </Link>
                    <Link className="mr-4" to="/about">
                        About Us
                    </Link>
                    <Link className="mr-2" to="/contact">
                        Contact Us
                    </Link>
                </div>
            </AppFooter>
        );
    }
}

LandingFooter.propTypes = propTypes;
LandingFooter.defaultProps = defaultProps;

export default LandingFooter;
