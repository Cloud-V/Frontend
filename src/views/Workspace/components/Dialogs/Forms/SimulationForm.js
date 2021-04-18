import React, { Component } from "react";

import { Field, reduxForm } from "redux-form/immutable";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";

const validate = values => {
	const errors = {};
	if (!values.get("fileName") || values.get("fileName").trim() === "") {
		errors.fileName = "File name is required";
	}
	return errors;
};

class RenderField extends Component {
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
}

class SimulationForm extends Component {
	constructor(props) {
		super(props);
		props.initialize({
			level: props.levels[0].id,
			simulationTime: 1000,
			fileName: props.defaultFileName
		});
	}
	render() {
		const {
			handleSubmit,
			submitting,
			//	status,
			levels,
			errorMessage
		} = this.props;

		return (
			<Form className="workspace-form" onSubmit={handleSubmit}>
				{errorMessage && <Alert color="danger">{errorMessage}</Alert>}
				<Field
					name="fileName"
					type="text"
					component={RenderField}
					label={"VCD File Name: "}
				/>
				<Field
					name="simulationTime"
					type="number"
					component={RenderField}
					label={"Maximum Simulation Time: "}
				/>
				<Field
					name="level"
					label="Dump Level: "
					type="select"
					component={function({
						label,
						input,
						meta: { touched, error }
					}) {
						return (
							<React.Fragment>
								<Label>{label}</Label>
								<Input {...input} type="select" name="level">
									{levels.map((level, ind) => (
										<option
											key={`${level.id}`}
											value={level.id}
										>
											{level.title}
										</option>
									))}
								</Input>
								{touched && error && (
									<div className="form-field-error">
										{error}
									</div>
								)}
							</React.Fragment>
						);
					}}
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
						Simulate
					</Button>
				</div>
			</Form>
		);
	}
}

export default reduxForm({
	form: "SimulationForm", // a unique identifier for this form
	validate
})(SimulationForm);
