import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import { connect } from "react-redux";

import routes from "routes";
import DashboardFooter from "partials/Footer";
import DashboardHeader from "partials/Navbar";
import { Page404 } from "pages";
const mapStateToProps = (state) => {
    return {
        user: state.get("user"),
    };
};
class DashboardLayout extends Component {
    constructor(props) {
        super(props);
        this.location = props.location;
    }
    render() {
        const { user } = this.props;
        const isLogged =
            !user.get("data").isEmpty() &&
            user.get("data").get("username").length;
        const signupComplete = user.get("data").get("authComplete");

        return (
            <div className="app">
                <DashboardHeader location={this.location} />
                <div className="app-body">
                    <main className="main">
                        <Switch>
                            {routes.map((route, idx) => {
                                const validateLogin = () => {
                                    if (route.requireLogin) {
                                        if (!isLogged) {
                                            return (
                                                <Redirect push to={"/login"} />
                                            );
                                        } else if (!signupComplete) {
                                            return (
                                                <Redirect
                                                    push
                                                    to={"/complete"}
                                                />
                                            );
                                        }
                                    }
                                    return null;
                                };
                                return route.component ? (
                                    route.container === "default" ? (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={(props) => (
                                                <React.Fragment>
                                                    {validateLogin()}
                                                    <Container>
                                                        <route.component
                                                            {...props}
                                                        />
                                                    </Container>
                                                </React.Fragment>
                                            )}
                                        />
                                    ) : route.container === "fluid" ? (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={(props) => (
                                                <React.Fragment>
                                                    {validateLogin()}
                                                    <Container fluid>
                                                        <route.component
                                                            {...props}
                                                        />
                                                    </Container>
                                                </React.Fragment>
                                            )}
                                        />
                                    ) : (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={(props) => (
                                                <React.Fragment>
                                                    {validateLogin()}
                                                    <route.component
                                                        {...props}
                                                    />
                                                </React.Fragment>
                                            )}
                                        />
                                    )
                                ) : null;
                            })}
                            <Route component={Page404} />
                        </Switch>
                    </main>
                </div>
                <DashboardFooter />
            </div>
        );
    }
}
export default connect(mapStateToProps)(DashboardLayout);
