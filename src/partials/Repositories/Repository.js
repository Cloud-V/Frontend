import React, { Component } from "react";

import {
	Button,
	Row,
	Col,
	Card,
	CardHeader,
	CardBody,
	CardText,
	CardFooter
} from "reactstrap";

import Truncate from "react-truncate";

import PropTypes from "prop-types";

import { Link } from 'react-router-dom';

class Repository extends Component {
	render() {
		const { hideName } = this.props;
		const repo = this.props.repository;
		return (
			<Col sm="12" md="6" lg="6" xl="4">
				<Card className="repository">
					<CardHeader>
						<Row className="d-flex align-items-start justify-content-between mr-0">
							<Col
								lg="10"
								md="10"
								sm="12"
								className="repository-header"
							>
								{!hideName && (
									<React.Fragment>
										<Link to={`/${repo.getOwnerName()}`}>
											{repo.getOwnerName()}
										</Link>
										&nbsp;/&nbsp;
									</React.Fragment>
								)}
								<Link
									to={`/${repo.getOwnerName()}/${repo.getRepoName()}`}
								>
									{repo.getRepoTitle()}
								</Link>
							</Col>

							<Col className="privacy" lg="2" md="2" sm="12">
								{repo.get("privacy") === 0
									? "Private"
									: "Public"}
							</Col>
						</Row>
					</CardHeader>
					<CardBody>
						<CardText>
							{!repo.getDescription().length ? (
								<span className="font-italic">
									No description provided.
								</span>
							) : (
								<Truncate
									lines={3}
									ellipsis={
										<span>
											..
											<Link
												to={`/${repo.getOwnerName()}/${repo.getRepoName()}`}
											>
												Read more
											</Link>
										</span>
									}
								>
									{repo.getDescription()}
								</Truncate>
							)}
						</CardText>
					</CardBody>
					<CardFooter>
						<Row className="mx-0">
							{this.props.canView ? (
								<Col
									lg="3"
									md="6"
									sm="6"
									xs="6"
									className="px-0"
								>
									<Button
										tag={Link}
										to={`/${repo.getOwnerName()}/${repo.getRepoName()}`}
										className="center-all flex-column w-100 px-1 repository-button"
									>
										<i className="mb-1 mt-1 icomoon icon-view fa-lg" />
										View
									</Button>
								</Col>
							) : null}
							{this.props.canDownload ? (
								<Col
									lg="3"
									md="6"
									sm="6"
									xs="6"
									className="px-0"
								>
									<Button
										onClick={e =>
											this.props.onDownload(repo.toJS())
										}
										className="center-all flex-column w-100 px-1 repository-button"
									>
										<i className="mb-1 mt-1 icomoon icon-download fa-lg" />
										Download
									</Button>
								</Col>
							) : null}
							{this.props.canWS ? (
								<Col
									lg="3"
									md="6"
									sm="6"
									xs="6"
									className="px-0"
								>
									<Link
										target="_blank"
										to={`/${repo.getOwnerName()}/${repo.getRepoName()}/ws`}
										className={`btn center-all flex-column w-100 px-1 repository-button ${
											repo.toJS().accessLevel > 1
												? ""
												: "disabled"
										}`}
									>
										<i className="mb-1 mt-1 icomoon icon-workspace fa-lg" />
										Workspace
									</Link>
								</Col>
							) : null}
							{this.props.canClone ? (
								<Col
									lg="3"
									md="6"
									sm="6"
									xs="6"
									className="px-0"
								>
									<Button
										onClick={e => this.props.onClone(repo)}
										className="center-all flex-column w-100 px-1 repository-button"
									>
										<i className="mb-1 mt-1 icomoon icon-clone fa-lg" />
										Clone
									</Button>
								</Col>
							) : null}
						</Row>
					</CardFooter>
				</Card>
			</Col>
		);
	}
}

Repository.propTypes = {
	canView: PropTypes.bool,
	canClone: PropTypes.bool,
	canDownload: PropTypes.bool,
	canWS: PropTypes.bool
};
Repository.defaultProps = {
	canView: true,
	canClone: true,
	canDownload: true,
	canWS: true
};

export default Repository;
