import React, {
	Component
} from 'react';

import {
	List,
	Map
} from 'immutable';

import ReactGA from 'react-ga';

import { Link } from 'react-router-dom';
import {
	Alert,
	Button,
	Table
} from 'reactstrap';
import moment from 'moment';

import _ from 'lodash';

import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import SquareSpinner from 'partials/SquareSpinner';
import VersionDialog from './VersionDialog';
import ConfirmationDialog from 'partials/ConfirmationDialog';
import CloneDialog from 'partials/CloneDialog';


class Versions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			removeModal: false,
			cloneModal: false,
			createModal: false,
			removeTitle: '',
			removeMessage: '',
			removeError: '',
		};
		this.toggleRemove = this.toggleRemove.bind(this);
		this.toggleClone = this.toggleClone.bind(this);
		this.toggleCreate = this.toggleCreate.bind(this);
		this.openCreateDialog = this.openCreateDialog.bind(this);
		this.promptClone = this.promptClone.bind(this);
		this.promptRemove = this.promptRemove.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.renderRows = this.renderRows.bind(this);
	}
	promptClone(version) {
		this.props.setVersion(version).then(action => {
			const {
				repository
			} = this.props;
			ReactGA.modalview(`/${repository.get('data').get('ownerName')}/${repository.get('data').get('repoName')}/versions/clone/${version._id}`);
			this.setState({
				cloneModal: true
			});
		});
	}
	promptRemove(version) {
		this.props.setVersion(version).then(action => {
			const {
				repository
			} = this.props;
			ReactGA.modalview(`/${repository.get('data').get('ownerName')}/${repository.get('data').get('repoName')}/versions/delete/${version._id}`);

			this.setState({
				removeModal: true,
				removeTitle: `Remove version “${version.title} ${version.number}”`,
				removeMessage: `Are you sure you want to remove the version “${version.title} ${version.number}”?`,
				removeError: ''
			});
		});
	}
	openCreateDialog() {
		this.props.setVersion(null).then(action => {
			const {
				repository
			} = this.props;
			ReactGA.modalview(`/${repository.get('data').get('ownerName')}/${repository.get('data').get('repoName')}/versions/new`);

			this.setState({
				createModal: true
			});
		});
	}
	closeDialog() {
		this.setState({
			removeModal: false,
			cloneModal: false,
			createModal: false
		});
	}

	toggleRemove() {
		if (this.props.status === 'loading') {
			return;
		}
		this.setState(prevState => ({
			removeModal: !prevState.removeModal
		}));
	}
	toggleClone() {
		if (this.props.status === 'loading') {
			return;
		}
		this.setState(prevState => ({
			cloneModal: !prevState.cloneModal
		}));
	}
	toggleCreate() {
		if (this.props.status === 'loading') {
			return;
		}
		this.setState(prevState => ({
			createModal: !prevState.createModal
		}));
	}
	renderRows() {
		const {
			isWriter
		} = this.props;
		return _.map(this.props.versions.get('data').toJS(), (version, ind) => {
			return (<tr key={version._id}>
				<td className="col-lg-2 col-md-3 col-sm-4">{version.title}</td>
				<td className="col-lg-2 col-md-3 col-sm-4">{version.number}</td>
				<td className="col-lg-2 col-md-3 col-sm-4">
					<Link className="nav-link user-link" to="#">@{version.user.username}</Link>
				</td>
				<td className="col-lg-2 col-md-3 col-sm-4">{moment(version.createdAt).format('DD / MM / YYYY')}</td>
				<td className="col-lg-4 col-md-5 col-sm-6">
					<Button className="repository-details-action" onClick={e => this.props.onVersionDownload(version)}>
						<i className="icomoon icon-download fa-lg"/>
						<span>Download</span>
					</Button>
					<Button className="repository-details-action" onClick={e => this.promptClone(version)}>
						<i className="icomoon icon-clone fa-lg"/>
						<span>Clone</span>
					</Button>
					<Button disabled={!isWriter} className="repository-details-action" onClick={e => this.promptRemove(version)}>
						<i className="icomoon icon-delete fa-lg"/>
						<span>Delete</span>
					</Button>
				</td>
			</tr>)
		});
	}
	render() {
		const {
			isWriter
		} = this.props;

		if (this.props.versions.get('status') === 'loading') {
			return <SquareSpinner />
		} else if (this.props.versions.get('status') === 'error') {
			return (<Alert color="danger">
				{this.props.versions.get('error')}
			</Alert>);
		}

		return (<React.Fragment>
			<VersionDialog
						modal={this.state.createModal}
						toggle={this.toggleCreate}
						closeDialog={this.closeDialog}
						version={this.props.version}
						editMode={this.state.editMode}
						defaultTitle={this.props.repository.get('data').get('repoName')}
						onFormSubmit={this.props.onVersionSubmit}/>
			<CloneDialog
						modal={this.state.cloneModal}
						toggle={this.toggleClone}
						status={this.props.repository.get('status')}
						error={this.props.repository.get('error')}
						repository={this.props.repository}
						version={this.props.version}
						versionMode={true}
						onFormSubmit={this.props.onVersionClone}/>
			<ConfirmationDialog
						modal={this.state.removeModal}
						toggle={this.toggleRemove}
						disabled={this.props.version.get('status') === 'loading'}
						loading={this.props.version.get('status') === 'loading'}
						closeDialog={this.closeDialog}
						version={this.props.version}
						error={this.state.removeError}
						onResponse={(confirmed) => {
							if (confirmed) {
								this.props.onVersionRemove(this.props.version.get('data')).then((action) => {
									this.closeDialog()
								}).catch(err => {
									this.setState({
										removeError: err
									})
								})
							}
						}}
						title={this.state.removeTitle}
						message={this.state.removeMessage}/>
			<Table className="repository-table mb-0" responsive>
				<thead>
					<tr>
						<th className="col-lg-2 col-md-3 col-sm-4">Title</th>
						<th className="col-lg-2 col-md-3 col-sm-4">Number</th>
						<th className="col-lg-2 col-md-3 col-sm-4">Created By</th>
						<th className="col-lg-2 col-md-3 col-sm-4">Date Created</th>
						<th className="repository-details-action-header col-lg-4 col-md-5 col-sm-6">Possible Actions</th>
					</tr>
				</thead>
				<tbody>
				{this.renderRows()}
				</tbody>
			</Table>
			{isWriter && <div className="action-button-wrapper pt-2">
				<Button className="action-button mt-5" onClick={this.openCreateDialog}>New Version</Button>
			</div>}
		</React.Fragment>);
	}
}

Versions.propTypes = {
	versions: ImmutablePropTypes.map,
	enablePagination: PropTypes.bool
};

Versions.defaultProps = {
	files: Map({
		data: List([]),
		status: 'loading',
		error: '',
		statusCode: 0
	}),
	enablePagination: false
};

export default Versions;