import React, {
	Component
} from 'react';

import {
	Container,
	Col,
	Card,
	CardBody
} from 'reactstrap';

import {
	connect
} from "react-redux";

import {
	Redirect
} from 'react-router-dom';

import {
	ToastContainer,
	Flip,
	toast
} from 'react-toastify';
import { GSignin, GHSignin } from 'partials/SocialButtons';
import Navbar from 'partials/Navbar';
import Footer from 'partials/Footer';

import SignupForm from './SignupForm';

import {
	signup
} from 'store/actions/user';

const mapStateToProps = state => {
	return {
		user: state.get('user'),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		signup: (data) => dispatch(signup(data)),
	};
};



class Signup extends Component {
	constructor(props) {
		super(props);
		this.signup = this.signup.bind(this);
		this.location = props.location;
	}
	componentDidMount() {

	}
	signup(data) {
		const username = data.get('username');
		const password = data.get('password');
		const email = data.get('email');
		return this.props.signup({
			username,
			password,
			email
		});
	}
	render() {
		const {
			user
		} = this.props;
		const isLogged = !!(!user.get('data').isEmpty() && user.get('data').get('username').length);
		if (isLogged) {
			return <Redirect to={'/dashboard'} />
		} else if (user.get('status') === 'error') {
			if (this.error !== user.get('error') || !toast.isActive(this.toastId)) {
				this.toastId = toast(user.get('error'), {
					type: toast.TYPE.ERROR,
					hideProgressBar: true,
					transition: Flip
				});
				this.error = user.get('error');
			}
		}
		return (
			<div className="app">
				<ToastContainer />
				<Navbar location={this.location} />
				<div className="app-body mb-4 justify-content-center align-items-center overflow-none">
					<Container className="h-100 d-flex flex-1 justify-content-center align-items-center" fluid>
						<Col xl="4" lg="5" md="8" className="auth d-flex justify-content-center align-items-center flex-column">
							<div className="auth-section w-100 auth-logo">
								<Col className="d-flex mr-0 mb-4 justify-content-center align-items-center flex-column">
										<div className="w-100 text-center mt-5">
											<h3>Create an account</h3>
										</div>
								</Col>
							</div>
							<div className="auth-section w-100 auth-box">
								<Card className="auth-card w-100">
									<CardBody>
										<SignupForm onSubmit={this.signup} />
									</CardBody>
								</Card>
							</div>
							<div className="landing-section landing-section-bottom cloudv-auth-login d-flex flex-column align-items-center">
								<h5 className="mb-4">Or log in using</h5>
								<div className="d-flex landing-section-auth-buttons">
									<Col md="6" sm="12" className="mr-1">
										<GHSignin />
									</Col>
									<Col md="6" sm="12" className="">
										<GSignin />
									</Col>
								</div>
							</div>
						</Col>
					</Container>
				</div>
				<Footer />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);