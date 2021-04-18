import React, {
	Component
} from 'react';
import {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';

import {
	connect
} from "react-redux";

import PropTypes from 'prop-types';

import {
	push
} from 'connected-react-router/immutable';

import {
	AppAside,
	AppHeader,
	AppHeaderDropdown,
	AppNavbarBrand,
	AppAsideToggler
} from '@coreui/react';

import queryString from 'query-string';

import logo from 'assets/img/brand/logo.svg'
import sygnet from 'assets/img/brand/sygnet.svg'

import SearchBox from 'partials/SearchBox';
import {
	setQuery
} from 'store/actions/search';

import {
	URLs
} from '../constants.js';

const propTypes = {
	children: PropTypes.node
};

const mapStateToProps = state => {
	return {
		user: state.get('user'),
	};
};
const mapDispatchToProps = dispatch => {
	return {
		setQuery: (query) => dispatch(setQuery(query)),
		search: (query) => {
			dispatch(push(`/${URLs.Search}?q=${encodeURIComponent(query)}`))
		}
	};
};

const defaultProps = {};

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			q: (queryString.parse(props.location.search).q || '').trim()
		};
	}
	render() {
		const {
			user
		} = this.props;
		const isLogged = !!(!user.get('data').isEmpty() && user.get('data').get('username').length);
		const signupComplete = user.get('data').get('authComplete');
		const profileData = user.get('data').toJS();
		const displayName = !isLogged ? '' : (profileData.displayName || (profileData.username.length ? ('@' + profileData.username) : ''));
		const avatarURL = `${URLs.Avatar}/${profileData.username}.png`;
		return (
			<React.Fragment>
				<AppHeader className="d-flex dashboard-header">
					<div className="d-flex align-items-center justify-content-start">
							<AppNavbarBrand
								full={{
									src: logo,
									width: 200,
									alt: 'Cloud V'
								}}
								minimized={{
									src: sygnet,
									width: 80,
									alt: 'Cloud V'
								}}
								tag={Link}
								to={'/'}
							/>
					</div>
					<div className="d-flex d-sm-down-none justify-content-center search-and-links">
						<SearchBox onSearch={({q}) => {
								if (q && q.length) {
									this.setState({q}, () => {
										this.props.setQuery(q).then(_ => this.props.search(q));
									})
								}
							}}
							defaultValue={this.state.q}
						/>
						<Nav navbar>
							<NavItem className="px-3 ml-2 d-flex flex-row">
								<NavLink href="/blog">Blog</NavLink>
							</NavItem>
						</Nav>
					</div>
					<div className="d-flex d-sm-down-none justify-content-end">
						<Nav navbar>
							{isLogged? <AppHeaderDropdown direction="down">
								<DropdownToggle nav>
									<img src={avatarURL} className="img-avatar" alt={displayName}/>
									<span className="header-greeting mr-4 d-lg-down-none">{signupComplete && <React.Fragment>{' '}Hi, {displayName}</React.Fragment>}</span>
								</DropdownToggle>
								<DropdownMenu right style={{
										right: 'auto'
									}}>
									<DropdownItem header to={`/${profileData.username}`} className="text-center">
										<strong>Profile</strong>
									</DropdownItem>
									<DropdownItem tag={Link} to="/edit">
										<i className="fa fa-user"></i>
										Edit Profile
									</DropdownItem>
									<DropdownItem tag={Link} to="/logout">
										<i className="fa fa-lock"></i>
										Logout
									</DropdownItem>
								</DropdownMenu>
							</AppHeaderDropdown>
							: <NavItem className="action-color pr-2">
								<NavLink href="/login">
									Log in
								</NavLink>
							</NavItem>
						}
						</Nav>
					</div>
					<AppAsideToggler className="d-md-none" mobile />
				</AppHeader>
				<AppAside className="cloudv-aside dashboard-aside d-md-none" fixed hidden>
					<Nav className="">
						<NavItem className="w-100">
							<NavLink href="#"><SearchBox className="pb-1 pt-1" onSearch={({q}) => {
									if (q && q.length) {
										this.setState({q}, () => {
											this.props.setQuery(q).then(_ => this.props.search(q));
										})
									}
								}}
								defaultValue={this.state.q}
								placeholder="Search"
							/></NavLink>
							<NavLink className="" href="/blog">Blog</NavLink>
							<NavLink className="" href="/explore">Discover</NavLink>
							{!isLogged && <NavLink className="action-color" href="/login">Log in</NavLink>}
							{isLogged && <NavLink className="" href="/edit">Edit Profile</NavLink>}
							{isLogged && <NavLink className="action-color" href="/logout">Logout</NavLink>}
						</NavItem>
					</Nav>
				</AppAside>
			</React.Fragment>
		);
	}
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);