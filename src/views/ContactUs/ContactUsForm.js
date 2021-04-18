import React, {
	Component
} from 'react';

import {
	Field,
	reduxForm
} from 'redux-form/immutable';
import { Link } from 'react-router-dom';
import {
	Alert,
	Form,
	FormGroup,
	Label,
	Input,
	Button
} from 'reactstrap';
import _ from 'lodash';
import {
	emailRegex,
} from '../../constants.js';


const validate = values => {
	const errors = {};
	if (!values.get('name') || !values.get('name').trim()) {
		errors.name = 'Name is required';
	}
	if (!values.get('email') || !values.get('email').trim()) {
		errors.email = 'E-mail is required';
	} else if (!emailRegex().test(values.get('email'))) {
		errors.email = 'Invalid e-mail address';
	}
	if (!values.get('type')) {
		errors.type = 'Type is required';
	}
	if (!values.get('subject') || !values.get('subject').trim()) {
		errors.subject = 'Subject is required';
	}
	if (!values.get('content') || !values.get('content').trim()) {
		errors.content = 'Content is required';
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
			<FormGroup className="switch-toggle w-75 alert alert-light" inline>
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


class ForgotPasswordForm extends Component {
	constructor(props) {
		super(props);
		this.props.initialize({
			type: '1'
		});
	}
	render() {
		const {
			handleSubmit,
			submitting,
			status,
			errorMessage
		} = this.props;
		const resetRequestFailed = status === 'action-error';
		return (
			<Form className="profile-form w-100 pl-4 pr-4 pt-0 pb-2" onSubmit={handleSubmit}>
				{resetRequestFailed && <Alert color="danger">{errorMessage}</Alert>}
				<Field
					name="name"
					type="text"
					component={RenderField}
					authComplete="name"
					label="Your name"
					/>
				<Field
					name="email"
					type="email"
					component={RenderField}
					authComplete="email"
					label="Your e-mail"
					/>
				<Field
					name="type"
					component={RenderOptionsField}
					options={[{
						name: 'Inquiry',
						value: '1',
						default: true
					}, {
						name: 'Bug',
						value: '0'
					}, {
						name: 'Other',
						value: '2'
					}]}
					label="Type"
				/>
				<Field
					name="subject"
					type="text"
					component={RenderField}
					authComplete="on"
					label="Subject"
					/>
				<Field
					name="content"
					type="textarea"
					component={RenderField}
					authComplete="on"
					label="Content"
					/>
				<div className="w-100 d-flex justify-content-between align-items-center">
					<Button type="submit" disabled={submitting || status === 'action-loading'} className="action-button w-50 mr-2 d-flex justify-content-center align-items-center">
						SEND
					</Button>
					<Link to={'/'} disabled={submitting || status === 'action-loading'}>Back</Link>
				</div>
			</Form>
		);
	};
}

export default reduxForm({
	form: 'contactUsForm',
	validate,
})(ForgotPasswordForm);