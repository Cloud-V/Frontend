import React, {
	Component
} from 'react';

import {
	Modal,
	ModalBody,
	Button
} from 'reactstrap';

import {
	Redirect,
} from 'react-router-dom';

import RepositoryForm from 'partials/Repositories/RepositoryForm';

class NewRepositoryDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notified: false
		}
		this.notify = this.notify.bind(this);
	}
	notify() {
		if (!this.state.notified && this.props.modal && this.props.onOpenDialog) {
			this.setState({
				notified: true
			}, () => {
				// setTimeout(() => this.props.onOpenDialog(true), 300);
				setTimeout(() => this.props.onOpenDialog(true), 0);
			})
		}
	}
	render() {
		if (this.props.modal && this.props.status === 'success') {
			return <Redirect push to={`/${this.props.repository.get('data').get('ownerName')}/${this.props.repository.get('data').get('repoName')}`} />
		}
		return (
			<Modal isOpen={this.props.modal} onOpened={this.notify} toggle={this.props.toggle} className="dialog new-repo-dialog">
				<div className="close-dialog d-flex justify-content-end mr-2 mt-2">
					<Button className="bg-white border border-white" onClick={this.props.toggle}>
						<i className="fa fa-times fa-lg" />
					</Button>
				</div>
				<ModalBody className="modal-form">
					<div className="header d-flex justify-content-center align-items-center mb-5 mt-1">Create a new repository</div>
					<RepositoryForm status={this.props.status}
									errorMessage={this.props.error}
									onSubmit={e => {
								if (!e.has('privacy')) {
									e = e.set('privacy', '1');
								}
								if (!e.has('description')) {
									e = e.set('description', '');
								}
								if (typeof this.props.onFormSubmit === 'function') {
									this.props.onFormSubmit(e);
								}
					}} />
				</ModalBody>
			</Modal>
		);
	}
}


export default NewRepositoryDialog;