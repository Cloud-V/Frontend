import React, { Component } from "react";

import { Field, reduxForm } from "redux-form/immutable";
import { Alert, Button, Form, /*FormGroup,*/ Label, Input } from "reactstrap";

const validate = values => {
	const errors = {};
	if (
		!values.get("fontSize") ||
		(typeof values.get("fontSize") === "string" &&
			isNaN(parseInt(values.get("fontSize"), 10)))
	) {
		errors.fontSize = "Font size is required.";
	}
	return errors;
};

/*class RenderField extends Component {
	render() {
		const {
			input,
			label,
			type,
			meta: { touched, error },
			placeholder,
			autoComplete,
			disabled
		} = this.props;

		const isCheckbox = type === "checkbox";

		return (
			<FormGroup check={isCheckbox}>
				{isCheckbox ? (
					<React.Fragment>
						<Label check>
							<Input
								{...input}
								disabled={disabled || false}
								type={type}
								autoComplete={autoComplete || ""}
								placeholder={placeholder || ""}
							/>
							{label}
						</Label>
					</React.Fragment>
				) : (
					<React.Fragment>
						<Label>{label}</Label>
						<Input
							{...input}
							disabled={disabled || false}
							type={type}
							autoComplete={autoComplete || ""}
							placeholder={placeholder || ""}
						/>
					</React.Fragment>
				)}
				{touched && error && (
					<div className="form-field-error">{error}</div>
				)}
			</FormGroup>
		);
	}
}*/

function range(size, startAt = 0) {
	return [...Array(size).keys()].map(i => i + startAt);
}

function renderOptions(options) {
	return function({ label, input, disabled, meta: { touched, error } }) {
		return (
			<React.Fragment>
				<Label>{label}</Label>
				<Input
					{...input}
					disabled={disabled}
					type="select"
					name="level"
				>
					{(options || []).map((option, ind) => (
						<option key={`${option.id}`} value={option.id}>
							{option.title}
						</option>
					))}
				</Input>
				{touched && error && (
					<div className="form-field-error">{error}</div>
				)}
			</React.Fragment>
		);
	};
}

class WorkspaceForm extends Component {
	constructor(props) {
		super(props);
		props.initialize({
			// level: props.levels[0].id,
			// simulationTime: 1000,
			fontSize: props.defaultFontsize
		});
	}
	render() {
		const {
			handleSubmit,
			submitting,
			//	status,
			errorMessage
		} = this.props;


		return (
			<Form className="workspace-form" onSubmit={handleSubmit}>
				{errorMessage && <Alert color="danger">{errorMessage}</Alert>}
				<Field
					name="fontSize"
					type="text"
					component={renderOptions(
						range(20, 8).map(i => ({ id: i, title: i + "" }))
					)}
					label={"Font Size: "}
				/>
				<div className="w-100 d-flex justify-content-end align-items-center mt-2">
					<Button
						className="action-button cancel-button pull-right mr-2"
						onClick={this.props.onCancel || (() => null)}
						disabled={submitting}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						className="action-button pull-right"
						disabled={submitting}
					>
						Save
					</Button>
				</div>
			</Form>
		);
	}
}

export default reduxForm({
	form: "WorkspaceForm", // a unique identifier for this form
	validate
})(WorkspaceForm);
