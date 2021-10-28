import React, {
	Component
} from 'react';

import {
	Field,
	reduxForm
} from 'redux-form/immutable';
import {
	Form,
	FormGroup,
	Label,
	Input,
	Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PasswordMask from 'modules/react-password-mask';
import Captcha from "../Captcha";


const validate = values => {
	const errors = {};
	if (!values.get('username')) {
		errors.username = 'Username is required';
	}
	if (!values.get('password')) {
		errors.password = 'Password is required';
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
			autoComplete,
			tabIndex
		} = this.props;

		return (<FormGroup>
			<Label>{label}</Label>
			<Input {...input} type={type} tabIndex={tabIndex} autoComplete={autoComplete || ''} placeholder={placeholder || ''} />
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
			autoComplete,
			tabIndex
		} = this.props;

		return (<FormGroup>
			<Label className="w-100">{label} <div className="forgot-password pull-right"><Link tabIndex={4} to="/forgot">Forgot Password?</Link></div></Label>
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
				tabIndex={tabIndex}
				showHidTabIndex={10}
			/>
			{touched && error && <div className="form-field-error">{error}</div>}
		</FormGroup>);
	}
}

class LoginFrom extends Component {
	state = {
		token: ""
	}

	handleFormSubmit = (data) => {
		const username = data.get('username');
		const password = data.get('password');
		const captcha_token = this.state.token
		return this.props.onSubmit({
			username,
			password,
			captcha_token
		});
	}

	onChange(event) {
		console.log(event);
	}

	render() {
		const {
			handleSubmit,
			submitting
		} = this.props;
		const captcha_site = process.env.REACT_APP_CAPTCHA_SITE

		return (
			<Form className="auth-form" onSubmit={handleSubmit(this.handleFormSubmit)}>
				<Field
					name="username"
					type="text"
					component={RenderField}
					label="Username"
					autoComplete="username"
					tabIndex={1}
					onChange={this.onChange}
				/>
				<Field
					name="password"
					type="password"
					component={PasswordField}
					label="Password"
					autoComplete="current-password"
					tabIndex={2}
				/>
				<Captcha
					sitekey={captcha_site}
					onVerify={captcha_token => this.setState({ token: captcha_token })}
					onExpire={e => this.setState({ token: '' })}
				/>
				<div className="w-100 d-flex justify-content-between align-items-center">
					<Button tabIndex={3} type="submit" className="action-button" disabled={submitting}>Log in</Button>
					<div className="pull-right">
						New User?{' '}<Link tabIndex={5} to={'/signup'}>Sign up</Link>
					</div>
				</div>
			</Form>
		);
	};
}

export default reduxForm({
	form: 'loginFrom', // a unique identifier for this form
	validate,
})(LoginFrom);