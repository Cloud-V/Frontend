import React, {
	Component
} from 'react';
import { Link } from 'react-router-dom';
import {
	Container,
	Row
} from 'reactstrap';
import logo from 'assets/img/brand/logo.svg';


class Page404 extends Component {
	render() {
		return (<div className="app page-status d-flex justify-content-center align-items-center flex-column">
			<div className="logo-wrapper text-center mb-4">
				<Link to={'/'}>
					<img src={logo} alt="Cloud V" className="w-70 logo" />
				</Link>
			</div>
			<Container>
				<Row className="justify-content-center">
						<h1 className="float-left display-3 mr-4">404</h1>
						<div>
							<h4 className="pt-3">Oops! You're lost.</h4>
							<p className="text-muted float-left">The page you are looking for was not found.</p>
						</div>
						{/*<InputGroup className="input-prepend">
							<InputGroupAddon addonType="prepend">
								<InputGroupText>
									<i className="fa fa-search"></i>
								</InputGroupText>
							</InputGroupAddon>
							<Input size="16" type="text" placeholder="What are you looking for?"/>
							<InputGroupAddon addonType="append">
								<Button color="info">Search</Button>
							</InputGroupAddon>
						</InputGroup> */}
				</Row>
			</Container>
		</div>);
	}
}

export default Page404;