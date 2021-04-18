import React, { Component } from "react";

import { Field, reduxForm } from "redux-form/immutable";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";

const validate = values => {
	const errors = {};
	if (!values.get("fileName") || values.get("fileName").trim() === "") {
		errors.fileName = "Field is required";
	}
	return errors;
};

class RenderField extends Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
	}
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
								ref={this.ref}
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
							ref={this.ref}
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
}

class NewFileForm extends Component {
	constructor(props) {
		super(props);
		props.initialize({
			fileName: props.defaultFileName || ""
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
					name="fileName"
					type="text"
					component={RenderField}
					label={this.props.fileNameField || "Name: "}
				/>

				<div className="w-100 d-flex justify-content-end align-items-center mt-2">
					<Button
						className="action-button cancel-button pull-right mr-2"
						onClick={this.props.onCancel || (() => null)}
						disabled={submitting}
					>
						Cancel
					</Button>
					{this.props.withBack && (
						<Button
							className="action-button pull-right mr-2"
							onClick={this.props.onBack || (() => null)}
							disabled={submitting}
						>
							Back
						</Button>
					)}
					<Button
						className="action-button pull-right"
						disabled={submitting}
					>
						Create
					</Button>
				</div>
			</Form>
		);
	}
}

export default reduxForm({
	form: "NewFileForm", // a unique identifier for this form
	validate
})(NewFileForm);
