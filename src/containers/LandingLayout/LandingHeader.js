import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import PropTypes from "prop-types";

import { AppNavbarBrand, AppAsideToggler } from "@coreui/react";

import logo from "assets/img/brand/white/logo.svg";
import sygnet from "assets/img/brand/white/sygnet.png";

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DashboardHeader extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="center-all logo-section">
                    <AppNavbarBrand
                        full={{
                            src: logo,
                            width: 200,
                            alt: "Cloud V",
                        }}
                        minimized={{
                            src: sygnet,
                            width: 80,
                            alt: "Cloud V",
                        }}
                        to={"/"}
                    />
                </div>
                <div className="ml-auto d-sm-down-none">
                    <Nav navbar className="">
                        <NavItem className="px-3 ml-2 d-flex flex-row justify-content-center">
                            <NavLink className="pr-lg-5 pr-md-1" href="/blog">
                                Blog
                            </NavLink>
                            {/* <NavLink className="pr-lg-5 pr-md-1 ml-4" href="/explore">Discover</NavLink> */}
                            <NavLink
                                className="pr-lg-5 pr-md-1 ml-4"
                                href="/login"
                            >
                                Log in
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <AppAsideToggler className="d-md-none" mobile />
            </React.Fragment>
        );
    }
}

DashboardHeader.propTypes = propTypes;
DashboardHeader.defaultProps = defaultProps;

export default DashboardHeader;
