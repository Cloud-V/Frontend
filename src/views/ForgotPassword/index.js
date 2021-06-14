import React, {
	Component
} from 'react';

import {
	Alert,
	Container,
	Col,
	Card,
	CardBody
} from 'reactstrap';

import {
	connect
} from "react-redux";

import {
	Link,
	Redirect
} from 'react-router-dom';

import {
	forgotPassword,
	initForgotPassword
} from 'store/actions/reset';

import SquareSpinner from 'partials/SquareSpinner';
import ForgotPasswordForm from './ForgotPasswordForm';
import Navbar from 'partials/Navbar';
import Footer from 'partials/Footer';


const mapStateToProps = state => {
	return {
		user: state.get('user'),
		reset: state.get('reset'),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		forgotPassword: ({
			username,
			captcha_token
		}) => dispatch(forgotPassword({
			username,
			captcha_token
		})),
		initForgotPassword: () => dispatch(initForgotPassword())
	};
};



class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.location = props.location;
	}
	componentDidMount() {
		this.props.initForgotPassword()
	}






	render() {
		const {
			reset,
			user
		} = this.props;
		const isLogged = (!user.get('data').isEmpty() && user.get('data').get('username').length);
		if (isLogged) {
			return <Redirect to={'/'} />
		}
		if (reset.get('status') === 'action-loading') {
			return (<div className="app">
				<Navbar location={this.location} />
				<Container className="h-100 d-flex flex-1 justify-content-center align-items-center" fluid>
					<SquareSpinner />
				</Container>
				<Footer />
			</div>);
		}
		return (
			<div className="app">
				<Navbar location={this.location} />
				<Container className="h-100 d-flex flex-1 justify-content-center align-items-center" fluid>
					<Col xl="4" lg="5" md="8" className="d-flex justify-content-center align-items-center flex-column">
						<div className="auth-section w-100 auth-logo">
							<Col className="d-flex mr-0 mb-4 justify-content-center align-items-center flex-column">
								<div className="w-100 text-center">
									<h3>Forgot Password</h3>
								</div>
							</Col>
						</div>
						<div className="w-100 auth-box">
							{
								(reset.get('status') === 'action-success') ?
									(<Alert color="success">
										Check your email for a password reset link.
										<br />If it doesn’t show up within a few minutes, please check your spam folder.
										<br /><Link to={'/login'}>Login Page</Link>
									</Alert>)
									: (<Card className="w-100">
										<CardBody className="profile-card w-100 d-flex flex-column justify-content-start align-items-center">
											<ForgotPasswordForm
												reset={reset}
												status={reset.get('status')}
												errorMessage={reset.get('error').toString()}
												onSubmit={e => {
													const { username, captcha_token } = e
													console.log(username, captcha_token)
													this.props.forgotPassword({
														username,
														captcha_token
													})
												}} />

										</CardBody>
									</Card>)
							}
						</div>
					</Col>
				</Container>
				<Footer />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);