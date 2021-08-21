import React, {
	Component
} from 'react';

import {
	Field,
	reduxForm
} from 'redux-form/immutable';
// import { Link } from 'react-router-dom';
import {
	Alert,
	Form,
	FormGroup,
	Label,
	Input,
	Button
} from 'reactstrap';
import PasswordMask from 'modules/react-password-mask';

import {
	passwordRegex
} from '../../constants.js';

const validate = values => {
	const errors = {};
	if (!values.get('currentPassword')) {
		errors.currentPassword = 'Current password is required';
	}
	if (!values.get('password')) {
		errors.password = 'New password is required';
	} else if (!passwordRegex().test(values.get('password'))) {
		errors.password = 'New password should have at least 8 characters and contain at least one letter and one numeral.';
	}
	if (!values.get('confirmPassword')) {
		errors.confirmPassword = 'Confirm password is required';
	} else if (values.get('password') !== values.get('confirmPassword')) {
		errors.confirmPassword = 'Your password and confirmation password do no match';
	}
	return errors;
};


class RenderField extends Component {
	render() {
		const {
			input,
			label,
			type,
			meta: {
				touched,
				error
			},
			placeholder,
			autoComplete
		} = this.props;

		return (<FormGroup className={type === 'hidden'? 'hidden-group': ''}>
			<Label>{label}</Label>
			<Input {...input} type={type} autoComplete={autoComplete || ''} placeholder={placeholder || ''} />
			{touched && error && <div className="form-field-error">{error}</div>}
		</FormGroup>);
	}
}

class PasswordField extends Component {
	render() {
		const {
			input,
			label,
			meta: {
				touched,
				error
			},
			placeholder,
			autoComplete
		} = this.props;

		return (<FormGroup>
			<Label className="w-100">{label}</Label>
			<PasswordMask
							{...input}
							id={input.name}
							className="pwd-mask"
							inputClassName="form-control"
							autoComplete={autoComplete || ''}
							useVendorStyles={false}
							placeholder={placeholder || ''}
							showButtonContent={<i className="fa fa-eye toggle-pwd-badge"></i>}
							hideButtonContent={<i className="fa fa-eye-slash toggle-pwd-badge"></i>}
							/>
			{touched && error && <div className="form-field-error">{error}</div>}
		</FormGroup>);
	}
}

class ProfilePasswordForm extends Component {
	constructor(props) {
		super(props);
		const profile = this.props.profile.get('data').toJS();
		const {
			username
		} = profile;
		this.props.initialize({
			username
		});
	}

	render() {
		const {
			handleSubmit,
			submitting,
			status,
			errorMessage
		} = this.props;
		const userUpdateFailed = status === 'action-error';
		return (
			<Form className="profile-form w-100 pl-4 pr-4 pt-0 pb-2" onSubmit={handleSubmit}>
				{userUpdateFailed && <Alert color="danger">{errorMessage}</Alert>}
				<Field
					name="username"
					type="hidden"
					component={RenderField}
					authComplete="username"
					/>
				<Field
					name="currentPassword"
					type="password"
					component={PasswordField}
					label="Current Password"
					autoComplete="current-password"
				/>
				<Field
					name="password"
					type="password"
					component={PasswordField}
					label="New Password"
					autoComplete="new-password"
				/>
				<Field
					name="confirmPassword"
					type="password"
					component={PasswordField}
					label="Confirm Password"
					autoComplete="new-password"
				/>
				<div className="w-100 d-flex justify-content-between align-items-center">
					<Button type="submit" className="action-button w-50 mr-2 d-flex justify-content-center align-items-center" disabled={submitting}>
						UPDATE PASSWORD
					</Button>
					{/* <Link to={'/edit'} disabled={submitting}>Back</Link>  */}
				</div>
			</Form>
		);
	};
}

export default reduxForm({
	form: 'profilePasswordForm', // a unique identifier for this form
	validate,
})(ProfilePasswordForm);