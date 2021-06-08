import React, {
	Component
} from 'react';
import {
	Redirect,
	Link
} from 'react-router-dom';
import {
	connect
} from "react-redux";
import {
	Button,
	Col,
	Row
} from 'reactstrap';
import Parallax from 'parallax-js';
import { GSignin, GHSignin } from 'partials/SocialButtons';

import Clouds from './Clouds';

const mapStateToProps = state => {
	return {
		user: state.get('user'),
	};
};

class LandingPage extends Component {
	componentDidMount() {
		const cloudsParllax = document.getElementById('clouds-parllax');
		if (cloudsParllax) {
			this.parallaxInstance = new Parallax(cloudsParllax, {
				relativeInput: true
			});
		}
	}
	render() {
		if (!this.props.user.get('data').isEmpty()) {
			return <Redirect push to={'/dashboard'} />
		}
		return (
			<React.Fragment>
				<div className="app flex-column center-all h-100 landing-page">
					<div className="landing-section cloudv-slogan text-center mt-md-0 mt-sm-5">
						<Col lg="12" md="12">
							The digital design platform anybody can use.
						</Col>
					</div>
					<div className="landing-section cloudv-slogan-subtext center-all-text">
						<Col lg="12" md="10">
							Cloud V is a research project that allows you to design and test your chips online <b>for free</b>.
						</Col>
					</div>
					<div className="landing-section cloudv-button cloudv-create-try d-flex justify-content-center w-100">
						{/*<Col xl="3" lg="4" md="5" sm="12" className="col-xxl-1-5 col-xs-12">
							<Button tag={Link} to={'/signup'} className="action-button w-100 mr-4 d-flex justify-content-center align-items-center">Create Account</Button>
		<				/Col>*/}
						<Col xl="3" lg="4" md="5" sm="12" className="col-xxl-1-5 col-xs-12">
							<Button tag={Link} to={'/try'} className="action-button w-100 action-button-outline d-flex justify-content-center align-items-center">Try Now</Button>
						</Col>
					</div>
					{/*
					<div className="landing-section cloudv-button">
						Have an account? <Link className="plain-link" to={'/login'}><b>Log in</b></Link>
					</div>
					*/}
					<div className="landing-section landing-section-bottom cloudv-auth-login d-flex flex-column align-items-center mt-5">
						<h5 className="mb-4">Log in</h5>
						<div className="d-flex landing-section-auth-buttons">
								<GHSignin />
							{/*
							
							<Col md="6" sm="12" className="mr-1">
							</Col>
							<Col md="6" sm="12" className="">
								<GSignin />
							</Col>
							*/}
						</div>
					</div>
					<div className="landing-section landing-section-bottom cloudv-landing-footer d-flex flex-column align-items-center">
						<Row className="landing-footer-text-wrap w-100 pt-2 center-all">
							<Col md="4" sm="4" className="text-center">
								<Link className="plain-link text-center no-decoration" to={'/privacy'}>Privacy Policy</Link>
							</Col>
							<Col md="4" sm="4" className="text-center">
								<Link className="plain-link text-center no-decoration" to={'/terms'}>Terms of Service</Link>
							</Col>
						</Row>
						<br />
						<br />
						<Row className="landing-footer-text-wrap w-100 pt-2 center-all">
							<p className="text-center">Sponsored by <a href="https://www.aucegypt.edu" className="plain-link  no-decoration">the American University in Cairo</a> and <a href="http://www.asrt.sci.eg/" className="plain-link no-decoration">the Academy of Scientific Research & Technology</a>.</p>
						</Row>
					</div>
				</div>
				<React.Fragment>
					<div data-relative-input="true" id="clouds-parllax">
						<Clouds dataDepth="0.2" innerClassName="" />
					</div>
				</React.Fragment>
			</React.Fragment>
		);
	}
}

export default connect(mapStateToProps)(LandingPage);