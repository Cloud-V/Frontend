import React, { Component } from 'react';
import {
	Button,
	Card,
	CardBody,
	Col,
	Container,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Row
} from 'reactstrap';

class Register extends Component {
	render() {
		return (<div className="app flex-row align-items-center">
			<Container>
				<Row className="justify-content-center">
					<Col md="6">
						<Card className="mx-4">
							<CardBody className="p-4">
								<h1>Register</h1>
								<p className="text-muted">Create your account</p>
								<InputGroup className="mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="icon-user"></i>
										</InputGroupText>
									</InputGroupAddon>
									<Input type="text" placeholder="Username"/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>@</InputGroupText>
									</InputGroupAddon>
									<Input type="text" placeholder="Email"/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="icon-lock"></i>
										</InputGroupText>
									</InputGroupAddon>
									<Input type="password" placeholder="Password"/>
								</InputGroup>
								<InputGroup className="mb-4">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="icon-lock"></i>
										</InputGroupText>
									</InputGroupAddon>
									<Input type="password" placeholder="Repeat password"/>
								</InputGroup>
								<Button color="success" block="block">Create Account</Button>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>);
	}
}

export default Register;