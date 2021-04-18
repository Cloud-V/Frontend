import React, {
	Component
} from 'react';

import {
	Field,
	reduxForm
} from 'redux-form/immutable';
import {
	Alert,
	Button,
	Form,
	FormGroup,
	Label,
	Input
} from 'reactstrap';
import {
	// Link
} from 'react-router-dom';
import SquareSpinner from 'partials/SquareSpinner';

const validate = values => {
	const errors = {};
	if (!values.get('title')) {
		errors.title = 'Version title is required';
	}
	if (!values.get('number')) {
		errors.number = 'Version number is required';
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
		return (<FormGroup>
			<Label>{label}</Label>
			<Input {...input}
					type={type}
					autoComplete={autoComplete || ''}
					placeholder={placeholder || ''}
					disabled={!!this.props.disabled}
			/>
			{touched && error && <div className="form-field-error">{error}</div>}
		</FormGroup>);
	}
}

class VersionForm extends Component {
	constructor(props) {
		super(props);
		this.props.initialize({
			title: props.defaultTitle || '',
			number: props.defaultNumber || ''
		});
	}
	render() {
		const {
			handleSubmit,
			submitting,
		} = this.props;
		const status = this.props.version.get('status');
		const errorMessage = this.props.version.get('error');
		if (status === 'loading') {
			return <SquareSpinner />
		}
		return (
			<Form className="auth-form" onSubmit={handleSubmit}>
				{errorMessage && <Alert color="danger">{errorMessage}</Alert>}
				<Field
					name="title"
					type="text"
					component={RenderField}
					label="Version Title"
					autoComplete="name"
				/>
				<Field
					name="number"
					type="text"
					component={RenderField}
					label="Version Number"
					autoComplete="number"
				/>
				<Field
					name="description O"
					type="textarea"
					component={RenderField}
					label="Version Description (optional)"
					autoComplete="description"
				/>
				<div className="w-100 d-flex justify-content-between align-items-center">
					<Button type="submit" className="action-button" disabled={submitting}>Create</Button>
				</div>
			</Form>
		);
	};
}

export default reduxForm({
	form: 'versionForm', // a unique identifier for this form
	validate,
})(VersionForm);