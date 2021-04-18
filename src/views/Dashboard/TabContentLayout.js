import React, {
	Component
} from 'react';

import {
	Container
} from 'reactstrap';

import TabContent from 'modules/rc-tabs/lib/TabContent';

import { Link } from 'react-router-dom';

import {
	URLs
} from '../../constants.js';

export default class TabContentLayout extends Component {
	render() {
		const {
			profile,
			isMe
		} = this.props;

		const displayName = profile.displayName || (profile.username.length ? ('@' + profile.username) : '');
		const avatarURL = `${URLs.Avatar}/${profile.username}.png`;

		return (<Container className="repositories-dashboard">
			<div className="repositories-dashboard-header">
				<span className="repositories-dashboard-header-text">
					<Link to={`/${profile.username}`}><img src={avatarURL} className="img-avatar mr-3" alt={displayName}/> {displayName}'s </Link> {isMe? ` Dashboard`: ` Repositories`}
				</span>
			</div>
			<TabContent {...this.props}>
				{this.props.children}
			</TabContent>
		</Container>)
	}
};