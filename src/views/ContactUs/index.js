import React, {
	Component
} from 'react';

import {
	Container,
	Col
} from 'reactstrap';

import {
	connect
} from "react-redux";

import {
	contactUs,
	initContactUs
} from 'store/actions/contact';

import Navbar from 'partials/Navbar';
import Footer from 'partials/Footer';
import SquareSpinner from 'partials/SquareSpinner';

const mapStateToProps = state => {
	return {
		user: state.get('user'),
		contact: state.get('contact')
	};
};

const mapDispatchToProps = dispatch => {
	return {
		contactUs: ({
			name,
			email,
			type,
			subject,
			content
		}) => dispatch(contactUs({
			name,
			email,
			type,
			subject,
			content
		})),
		initContactUs: () => dispatch(initContactUs())
	};
};



class ContactUs extends Component {
	constructor(props) {
		super(props);
		this.location = props.location;
	}
	componentDidMount() {
		this.props.initContactUs();
	}
	render() {
		const {
			contact
		} = this.props;
		if (contact.get('status') === 'action-loading') {
			return (<div className="app">
				<Navbar location={this.location}/>
				<div className="h-100 d-flex flex-1 justify-content-center align-items-center">
					<SquareSpinner />
				</div>
				<Footer />
			</div>);
		}
		return (
			<div className="app">
				<Navbar location={this.location}/>
				<Container className="flex-1 h-100 d-flex justify-content-center align-items-center" fluid>
					<Col xl="4" lg="5" md="8" className="d-flex justify-content-center align-items-center flex-column">
						<div className="auth-section w-100 auth-logo">
							<Col className="d-flex mr-0 mb-4 justify-content-center align-items-center flex-column">
									<div className="w-100 text-center mt-4">
										<h3>Contact Us</h3>
									</div>
							</Col>
						</div>
						<div className="w-100 auth-box">
							<p>For support, contact us at <a href="mailto:cloudv@cloudv.io">cloudv@cloudv.io</a>.</p>
							<p>For bug reports and feature requests, try opening an issue on <a target="_blank" rel="noopener noreferrer" href="https://github.com/Cloud-V/Issues/issues/new">our GitHub page</a>.</p>
							<p>For other inquiries, contact principal investigator Mohamed Shalan at <a href="mailto:mshalan@aucegypt.edu">mshalan@aucegypt.edu</a>.</p>
						</div>
					</Col>
				</Container>
				<Footer />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);