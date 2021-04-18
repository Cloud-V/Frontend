import React, {
	Component
} from 'react';

import {
	Alert,
	Container,
} from 'reactstrap';

import {
	connect
} from "react-redux";
import ReactMarkdown from 'react-markdown';

import {
	getTerms
} from 'store/actions/terms';

import SquareSpinner from 'partials/SquareSpinner';
import Navbar from 'partials/Navbar';
import Footer from 'partials/Footer';


const mapStateToProps = state => {
	return {
		terms: state.get('terms'),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getTerms: () => dispatch(getTerms())
	}
};



class Terms extends Component {
	constructor(props) {
		super(props);
		this.location = props.location;
	}

	async componentDidMount() {
		this.props.getTerms();
	}


	render() {
		const {
			terms,
		} = this.props;

		if (terms.get('status') === 'loading' || (terms.get('status') === '')) {
			return (<div className="app">
				<Navbar location={this.location}/>
				<div className="h-100 flex-1 d-flex justify-content-center align-items-center">
					<SquareSpinner />
				</div>
				<Footer />
			</div>);
		} else if (terms.get('status') === 'error') {
			return (<div className="app">
				<Navbar location={this.location}/>
				<div className="flex-1 w-100 d-flex">
					<Alert className="h-10 flex-1" color="danger">{terms.get('error')}</Alert>
				</div>
				<Footer />
			</div>);
		}

		return (
			<div className="app">
				<Navbar location={this.location}/>
				<Container className="terms flex-1 w-100 h-100 pl-0 pr-0 d-flex flex-column justify-content-center align-items-center" fluid>
					<div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
						<div className="terms-section terms-section-content w-75 mb-4 mt-4">
							<ReactMarkdown source={terms.get('data').get('terms')} />
						</div>
					</div>
				</Container>
				<Footer />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Terms);