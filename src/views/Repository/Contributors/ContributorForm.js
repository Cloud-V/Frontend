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
import { Link } from 'react-router-dom';
import _ from 'lodash';
import SquareSpinner from 'partials/SquareSpinner';

const validate = values => {
	const errors = {};
	if (!values.get('username')) {
		errors.username = 'Username is required';
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

class RenderOptionsField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: this.props.input.value || '1'
		}
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({
			selected: e.target.value
		});
	}

	render() {
		const {
			input,
			label,
			meta: {
				touched,
				error
			},
			options
		} = this.props;
		const defaultOnChange = input.onChange;
		return (<FormGroup>
			<Label>{label}</Label>
			<br/>
			<FormGroup className="switch-toggle alert alert-light" inline>
				{_.map(options, opt => (
					<React.Fragment key={opt.value}>
						<Input {...input} id={`${input.name}_${opt.value}`} type={'radio'} value={opt.value} className="switch-radio" onChange={(e) => {
							if (typeof defaultOnChange === 'function') {
								defaultOnChange(e);
							}
							this.onChange(e);
						}} checked={this.state.selected === opt.value} />
						<Label for={`${input.name}_${opt.value}`}>{opt.name}</Label>
					</React.Fragment>
					))}
				<Button role="button" tag={Link} to={'#'} className="switch-button"></Button>
			</FormGroup>
			{touched && error && <div className="form-field-error">{error}</div>}
		</FormGroup>);
	}
}


class ContributorForm extends Component {
	constructor(props) {
		super(props);
		if (props.editMode) {
			this.props.initialize({
				username: this.props.contributor.get('data').user.username,
				accessLevel: this.props.contributor.get('data').accessLevel.toString()
			});
		}
	}
	render() {
		const {
			handleSubmit,
			submitting,
		} = this.props;
		const status = this.props.contributor.get('status');
		const errorMessage = this.props.contributor.get('error');
		if (status === 'loading') {
			return <SquareSpinner />
		}
		return (
			<Form className="auth-form" onSubmit={handleSubmit}>
				{errorMessage && <Alert color="danger">{errorMessage}</Alert>}
				<Field
					name="username"
					type="text"
					component={RenderField}
					label="Username"
					disabled={this.props.editMode}
					autoComplete="uesrname"
				/>
				<Field
					name="accessLevel"
					component={RenderOptionsField}
					options={[{
						name: 'ReadOnly',
						value: '1',
						default: true
					}, {
						name: 'ReadWrite',
						value: '2'
					}]}
					label="Role"
				/>
				<div className="w-100 d-flex justify-content-between align-items-center">
					<Button type="submit" className="action-button" disabled={submitting}>{this.props.editMode? 'Save': 'Add'}</Button>
				</div>
			</Form>
		);
	};
}

export default reduxForm({
	form: 'contributorForm', // a unique identifier for this form
	validate,
})(ContributorForm);