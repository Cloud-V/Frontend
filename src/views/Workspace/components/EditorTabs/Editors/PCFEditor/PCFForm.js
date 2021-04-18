import React, { Component } from "react";

import { Field, reduxForm } from "redux-form/immutable";
import { Alert, Form, Label, Input } from "reactstrap";

import _ from "lodash";

const validate = (values) => {
	return {}
};

class PCFForm extends Component {
	constructor(props) {
		super(props);
		props.initialize({
			assignedPins: (this.props.defaultData || {}).assignedPins || {}
		});
		this.state = {
			usedPins: {}
		};
	}
	render() {
		const {
			handleSubmit,
			// submitting,
			//	status,
			board,
			pins,
			errorMessage
		} = this.props;

		const reservedPins = _.invert(
			(this.props.defaultData || {}).assignedPins || {}
		);
		return (
			<Form
				className="workspace-form w-75"
				onSubmit={handleSubmit}
				onChange={this.props.onChange}
			>
				{errorMessage && <Alert color="danger">{errorMessage}</Alert>}
				<Label>
					Assign Pins (Board {board.model} - {board.id})
				</Label>
				<br />
				{pins.map((pin, ind) => {
					return (
						<Field
							name={`assignedPins[${pin}]`}
							label={pin}
							type="select"
							key={`field_${ind}_${pin}`}
							onChange={e => {
								const usedPins = _.clone(this.state.usedPins);
								if (e.target.value === "unassigned") {
									delete usedPins[pin];
								} else {
									usedPins[pin] = e.target.value;
								}
								this.setState({ usedPins });
							}}
							component={function({
								label,
								input,
								meta: { touched, error }
							}) {
								return (
									<React.Fragment>
										<Label>{label}</Label>
										<Input
											{...input}
											type="select"
											name={`assignedPins[${pin}]`}
										>
											{["unassigned"]
												.concat(board.pins)
												.map((target, ind) => (
													<React.Fragment
														key={`${ind}_${target}`}
													>
														{(!reservedPins[
															target
														] ||
															reservedPins[
																target
															] === pin) && (
															<option
																value={target}
															>
																{target}
															</option>
														)}
													</React.Fragment>
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
					);
				})}

				<div className="w-100 d-flex justify-content-end align-items-center mt-2">
					{/*<Button
						className="action-button pull-right"
						disabled={submitting}
					>
						Save
                    </Button>*/}
				</div>
			</Form>
		);
	}
}

export default reduxForm({
	form: "PCFForm", // a unique identifier for this form
	validate
})(PCFForm);
