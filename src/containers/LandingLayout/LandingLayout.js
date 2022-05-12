import React, { Component } from "react";

import { Container, Nav, NavLink, NavItem } from "reactstrap";
import { connect } from "react-redux";
import { AppHeader, AppAside } from "@coreui/react";

import LandingPage from "views/LandingPage";

import LandingHeader from "./LandingHeader";

const mapStateToProps = (state) => {
    return {
        user: state.get("user"),
    };
};

class LandingLayout extends Component {
    render() {
        return (
            <div className="app">
                <AppHeader className="landing-header">
                    <LandingHeader />
                </AppHeader>
                <AppAside className="cloudv-aside d-md-none" fixed hidden>
                    <Nav className="">
                        <NavItem className="w-100">
                            <NavLink className="" href="/blog">
                                Blog
                            </NavLink>
                            {/* <NavLink className="" href="/explore">Discover</NavLink> */}
                            <NavLink className="" href="/login">
                                Log in
                            </NavLink>
                        </NavItem>
                    </Nav>
                </AppAside>
                <div className="app-body mt-0">
                    <main className="main">
                        <Container
                            fluid
                            className="p-0 position-relative no-flow"
                        >
                            <LandingPage />
                        </Container>
                    </main>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(LandingLayout);
