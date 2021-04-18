import React, {
	Component
} from 'react';

import { Link } from 'react-router-dom';
import logo from 'assets/img/brand/logo.svg';

class ComingSoon extends Component {
	render() {
		return (<div className="app h-100 coming-soon d-flex justify-content-center align-items-center flex-column">
			<div className="logo-wrapper text-center mb-4">
				<Link to={'/'}>
					<img src={logo} alt="Cloud V" className="w-70 logo" />
				</Link>
			</div>
			<h1 className="pt-3">Coming Soon</h1>
			<h3 className="text-muted text-center">The page you requested is currently under development.
			<br/>Check back again for updates.</h3>
			<h4><Link to={'/'}>Home</Link></h4>
		</div>);
	}
}

export default ComingSoon;