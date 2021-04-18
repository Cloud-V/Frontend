import React, {
	Component
} from 'react';

import {} from 'reactstrap';

import {
	connect
} from "react-redux";

import {
	Redirect
} from 'react-router-dom';

import {
	logout
} from 'store/actions/user';

import SquareSpinner from 'partials/SquareSpinner';


const mapStateToProps = state => {
	return {
		user: state.get('user'),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(logout())
	};
};



class Logout extends Component {
	componentDidMount() {
		this.props.logout();
		this.setState({})
	}

	render() {
		const {
			user
		} = this.props;
		const isLogged = !!(!user.get('data').isEmpty() && user.get('data').get('username').length);
		if (isLogged) {
			return (<div className="flex-1 h-100 mt-15 d-flex justify-content-center align-items-center">
				<SquareSpinner />
			</div>);
		}
		return <Redirect to={'/'} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);