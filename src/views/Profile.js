import React, {
	Component
} from 'react';

import { Link } from 'react-router-dom';
import {
	Page404
} from 'pages';
import {
	Alert,
	Button,
	Container,
	Col,
	Card,
	CardBody
} from 'reactstrap';

import {
	connect
} from "react-redux";


import {
	getProfile
} from 'store/actions/profile';

import SquareSpinner from 'partials/SquareSpinner';
// import {
// 	URLs
// } from '../constants.js';

const md5 = require('md5');

const mapStateToProps = state => {
	return {
		profile: state.get('profile'),
		user: state.get('user')
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getProfile: ({
			ownerName
		}) => dispatch(getProfile({
			ownerName
		}))
	};
};

const getGravatarURL = email => {
	let parsedEmail = email.toLowerCase().split(' ').join('');
	return `https://www.gravatar.com/avatar/${md5(parsedEmail)}?s=200`;

}


class Profile extends Component {
	constructor(props) {

		super(props);
		this.ownerName = this.props.match.params.ownerName;
		this.isMe = this.props.user.get('data').get('username') === this.ownerName;
	}
	async componentDidMount() {
		const {
			ownerName
		} = this;
		this.props.getProfile({
			ownerName
		});
	}
	render() {
		const {
			profile
		} = this.props;
		if (profile.get('status') === 'action-loading' || profile.get('status') === '') {
			return <SquareSpinner />
		} else if (profile.get('status') === 'action-error') {
			if (profile.get('statusCode') === 404) {
				return <Page404 />;
			}
			return <Alert color="danger">{profile.get('error').toString()}</Alert>
		}
		const profileId = profile.get('data').get('_id');
		if (!profileId) {
			return <Page404 />;
		}

		const profileData = profile.get('data').toJS();
		const displayName = profileData.displayName || (profileData.username.length ? ('@' + profileData.username) : '');
		const about = profileData.about;

		console.log("Profile Data:", profileData)
		const avatarURL = getGravatarURL(profileData.gravatarEmail ? profileData.gravatarEmail : profileData.email);

		return (
			<Container className="h-100 d-flex justify-content-center align-items-center" fluid>
				<Col md="3" className="d-flex justify-content-center align-items-center flex-column">
					<div className="w-100 auth-box">
						<Card className="w-100">
							<CardBody className="profile-card w-100 d-flex flex-column justify-content-start align-items-center position-relative">
								{this.isMe && <div className="w-100 d-flex justify-content-end edit-profile-wrapper">
									<Button title="Edit Profile" tag={Link} to={'/edit'} className="icon-btn mr-0 edit-profile-btn">
										<i className="fa fa-pencil"></i>
									</Button>
								</div>}
								<div className="profile-avatar-wrapper d-flex justify-content-center align-items-center mb-3 mt-3">
									<img alt={displayName} src={avatarURL} className="profile-avatar" />
								</div>
								<div className="profile-name mb-3">{displayName}</div>
								<div className="profile-about-title w-100 d-flex justify-content-start mb-3">About {displayName}:</div>
								<div className="profile-about w-100 d-flex justify-content-start mb-3">{about.length ? about : <i>No about section provided.</i>}</div>
								<Link to={`repositories/${this.ownerName}`} className="profile-repositories-link plain-link black d-flex w-100 justify-content-start">Repositories</Link>
							</CardBody>
						</Card>
					</div>
				</Col>
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);