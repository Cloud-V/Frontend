import { URLs } from "./constants.js";
import * as Pages from "./pages.js";
import routes from "./routes.js";
import { DashboardLayout, LandingLayout } from "./containers";
import { history } from "./store";

import _ from "lodash";
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router/immutable";
import { connect } from "react-redux";
import ReactGA from "react-ga";

import CookieConsent from "react-cookie-consent";

const mapStateToProps = state => {
	return {
		user: state.get("user"),
		message: state.get("message")
	};
};

class App extends Component {
	componentDidMount() {
		ReactGA.initialize(
			process.env.REACT_APP_GA_TRACKING_ID || 'UA-000000-01', {
			testMode: process.env.NODE_ENV !== "production"
		});
		history.listen((location, action) => {
			ReactGA.set({
				page: location.pathname
			});
			ReactGA.pageview(location.pathname);
		});
	}
	render() {
		const isLogged =
			!this.props.user.get("data").isEmpty() &&
			this.props.user.get("data").get("username").length;
		const signupComplete = this.props.user.get("data").get("authComplete");
		
		return (
			<React.Fragment>
				<CookieConsent
					location="bottom"
					expires={process.env.NODE_ENV === "production" ? 100 : 0}
					buttonText="Acknowledge"
					cookieName="cookieConsent"
				>
					Cloud V uses cookies to enhance your experience. Your data is used as outlined in the <a href="/privacy">Privacy Policy</a>.
				</CookieConsent>
				<ConnectedRouter history={history}>
					<Switch>
						<Route
							exact
							path={"/signup"}
							name="Signup to Cloud V"
							component={Pages.Signup}
						/>
						<Route
							exact
							path={"/login"}
							name="Login to Cloud V"
							component={Pages.Login}
						/>
						<Route
							exact
							path={"/logout"}
							name="Logout"
							component={Pages.Logout}
						/>
						<Route
							exact
							path={"/register"}
							name="Register Page"
							component={Pages.Register}
						/>
						<Route
							path={"/privacy"}
							exact={true}
							name={"Cloud V Privacy Policy"}
							component={Pages.Privacy}
						/>
						<Route
							path={"/terms"}
							exact={true}
							name={"Cloud V Terms and Conditions"}
							component={Pages.Terms}
						/>
						<Route
							path={"/contact"}
							exact={true}
							name={"Cloud V Cotact Us"}
							component={Pages.ContactUs}
						/>
						<Route
							path={"/complete"}
							exact={true}
							name={"Complete Signup"}
							component={Pages.CompleteSignup}
						/>
						<Route
							path={"/google"}
							exact={true}
							name={"Google Authentication"}
							component={Pages.Google}
						/>
						<Route
							path={"/github"}
							exact={true}
							name={"GitHub Authentication"}
							component={Pages.GitHub}
						/>
						<Route
							path={"/search"}
							exact={true}
							name={"Search V"}
							component={Pages.Search}
						/>
						<Route
							path={"/try"}
							exact={true}
							name={"Try Cloud V"}
							component={Pages.Try}
						/>
						<Route
							path={"/forgot"}
							exact={true}
							name={"Forgot Password"}
							component={Pages.ForgotPassword}
						/>
						<Route
							path={"/reset"}
							exact={true}
							name={"Reset Password"}
							component={Pages.ResetPassword}
						/>
						<Route
							path={"/explore"}
							exact={true}
							name={"Explore Cloud V"}
							component={Pages.Explore}
						/>
						<Route
							path={"/blog"}
							exact={true}
							name={"Cloud V Blog"}
							component={() => { 
								window.location.href = `https://blog.cloudv.io`; 
								return null;
						   	}}
						/>
						<Route
							path={"/about"}
							exact={true}
							name={"About"}
							component={() => { 
								window.location.href = `https://blog.cloudv.io/about/index.html`; 
								return null;
						   	}}
						/>
						<Route
							path={"/fpga"}
							exact={true}
							name={"About"}
							component={Pages.FPGA}
						/>
						<Route
							path={"/tools"}
							exact={true}
							name={"Cloud V Tools"}
							component={Pages.Tools}
						/>
						<Route
							path={"/admin"}
							exact={true}
							name={"Cloud V Tools"}
							component={Pages.AdminStats}
						/>
						<Route
							path={"/:ownerName/:repoName/ws"}
							exact={true}
							name={"Cloud V Workspace"}
							component={Pages.Workspace}
						/>
						<Route
							exact
							path="/404"
							name="Page 404"
							component={Pages.Page404}
						/>
						<Route
							exact
							path="/500"
							name="Page 500"
							component={Pages.Page500}
						/>
						{(() => {
							if (isLogged) {
								if (!signupComplete) {
									return _.map(
										_.filter(
											routes,
											route => route.path !== "/"
										),
										(route, idx) => (
											<Route
												exact
												key={idx}
												path={route.path}
												name={route.name}
												render={props => (
													<Redirect
														to={"/complete"}
													/>
												)}
											/>
										)
									);
								}
								return null;
							}
							return _.map(
								_.filter(routes, route => route.path !== "/"),
								(route, idx) => (
									<Route
										exact
										key={idx}
										path={route.path}
										name={route.name}
										render={props => (
											<Redirect to={"/login"} />
										)}
									/>
								)
							);
						})()}
						<Route
							exact={!isLogged}
							path="/"
							name={isLogged ? "Dashboard" : "Home"}
							render={props =>
								isLogged && signupComplete ? (
									<DashboardLayout {...props} />
								) : (
									<LandingLayout {...props} />
								)
							}
						/>
						<Route component={Pages.Page404} />
					</Switch>
				</ConnectedRouter>
				<div className="d-none">
					<iframe title="communicationIframe" src={URLs.Communication} frameBorder="1" width="0" height="0">
                    </iframe>
				</div>
			</React.Fragment>
		);
	}
}

export default connect(mapStateToProps)(App);
