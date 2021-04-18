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
import queryString from 'query-string';

import {
	Redirect,
	Link
} from 'react-router-dom';

import {
	resetPassword
} from 'store/actions/user';

import SquareSpinner from 'partials/SquareSpinner';
import Navbar from 'partials/Navbar';
import Footer from 'partials/Footer';

import ResetPasswordForm from './ResetPasswordForm';



const mapStateToProps = state => {
	return {
		user: state.get('user')
	};
};

const mapDispatchToProps = dispatch => {
	return {
		resetPassword: ({
			username,
			resetToken,
			password
		}) => dispatch(resetPassword({
			username,
			resetToken,
			password
		}))
	};
};



class ResetPassword extends Component {
	constructor(props) {
		super(props);
		const urlParams = queryString.parse(props.location.search);
		const {
			username,
			resetToken
		} = urlParams;
		if (!urlParams.username || !urlParams.resetToken) {
			this.state = {
				status: 'invalid'
			}
		} else {
			this.state = {
				username,
				resetToken,
				status: ''
			};
		}
		this.location = props.location;
	}
	render() {
		const {
			user
		} = this.props;
		const isLogged = (!user.get('data').isEmpty() && user.get('data').get('username').length);
		if (isLogged || user.get('status') === 'action-success') {
			return <Redirect to={'/'} />
		}
		if (user.get('status') === 'action-loading') {
			return (<div className="app">
					<Navbar location={this.location} />
					<Container className="h-100 d-flex flex-1 justify-content-center align-items-center" fluid>
						<SquareSpinner />
					</Container>
					<Footer />
				</div>);
		}
		return (<div className="app">
				<Navbar location={this.props.location} />
				<Container className="h-100 d-flex flex-1 justify-content-center align-items-center" fluid>
					<Col xl="4" lg="5" md="8" className="d-flex justify-content-center align-items-center flex-column">
						<div className="auth-section w-100 auth-logo">
							<Col className="d-flex mr-0 mb-4 justify-content-center align-items-center flex-column">
									<div className="w-100 text-center mt-4">
										<h3>Reset Password</h3>
									</div>
							</Col>
						</div>
						<div className="w-100 auth-box">
							{this.state.status === 'invalid'?
							<Alert color="danger">Invalid reset token provided. <Link className="plain-link black" to={'/'}>Back</Link></Alert>
							: <Card className="w-100">
								<CardBody className="profile-card w-100 d-flex flex-column justify-content-start align-items-center">
									<ResetPasswordForm
										resetToken={this.state.resetToken}
										username={this.state.username}
										user={user}
										status={user.get('status')}
										errorMessage={user.get('error').toString()}
										onSubmit={e => {
											this.props.resetPassword(e.toJS())
										}} />

								</CardBody>
							</Card>
							}
						</div>
					</Col>
				</Container>
				<Footer />
			</div>);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);