import React, {
	Component
} from 'react';

import {
	Alert,
	Modal,
	ModalBody,
	Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import SquareSpinner from 'partials/SquareSpinner';


class ConfirmationDialog extends Component {
	render() {
		return (
			<Modal isOpen={this.props.modal} toggle={(e) => (!this.props.loading && !this.props.disabled)? this.props.toggle(): null} className="dialog new-repo-dialog">
				<div className="close-dialog d-flex justify-content-end mr-2 mt-2">
					<Button className="bg-white border border-white" onClick={(e) => (!this.props.loading && !this.props.disabled)? this.props.toggle(): null}>
						<i className="fa fa-times fa-lg" />
					</Button>
				</div>
				<ModalBody>
					{(() => {
						if (this.props.loading) {
							return <SquareSpinner />;
						}
						return (<React.Fragment>
							<div className="header d-flex justify-content-center align-items-center mb-5 mt-1 text-center">
							{this.props.title}</div>
							{(() => {
								if (this.props.error) {
									return <Alert color="danger">{this.props.error}</Alert>
								}
							})()}
							<div className="modal-message">
							{this.props.message}
							</div>
							<div className="w-100 d-flex justify-content-center">
							<Button type="submit" className="action-button mr-2" onClick={(e) => {
								this.props.onResponse(true)
							}}>{this.props.confirmation}</Button>
							<Button type="submit" className="action-button action-button-secondary" onClick={(e) => {
								if (this.props.disabled || this.props.loading) {
									return;
								}
								this.props.onResponse(false);
								this.props.closeDialog();
							}}>{this.props.cancellation}</Button>
							</div>
						</React.Fragment>)
					})()}
				</ModalBody>
			</Modal>
		);
	}
}

ConfirmationDialog.propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]).isRequired,
	message: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]).isRequired,
	confirmation: PropTypes.string.isRequired,
	cancellation: PropTypes.string.isRequired,
	onResponse: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	loading: PropTypes.bool
};
ConfirmationDialog.defaultProps = {
	confirmation: 'Yes',
	cancellation: 'No',
	error: '',
	disabled: false,
	loading: false
}

export default ConfirmationDialog;