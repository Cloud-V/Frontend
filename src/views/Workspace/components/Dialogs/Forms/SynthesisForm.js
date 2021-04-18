import React, { Component } from "react";

import { Field, reduxForm } from "redux-form/immutable";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";

import TreeSelect, { SHOW_CHILD } from "rc-tree-select";

const validate = values => {
	const errors = {};
	if (values.get("constraints")) {
		if (!values.get("dcf")) {
			errors.dcf = "Constraints file is required";
		}
	}
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
						<Label check className="mb-1 mt-1">
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

class RenderTreeField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			title: ""
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(value, title, extras) {
		if (extras) {
			const { triggerNode } = extras;
			if (triggerNode) {
				const { type } = triggerNode.props;
				if (type === "dcf") {
					this.setState({ id: value, title: title });
				}
			}
		}
	}

	render() {
		const {
			input,
			label,
			meta: { touched, error },
			treeData,
			disabled
		} = this.props;

		return (
			<FormGroup>
				<Label>{label}</Label>
				<br />
				<FormGroup inline>
					<TreeSelect
						treeData={treeData}
						treeCheckable={false}
						showCheckedStrategy={SHOW_CHILD}
						searchPlaceholder={"Search.."}
						style={{ minWidth: 300 }}
						multiple={false}
						treeCheckStrictly={true}
						treeIcon={true}
						maxTagCount={1}
						value={this.state.id}
						onChange={(value, title, extras) => {
							title = title[0];
							this.onChange(value, title, extras);
							input.onChange({
								id: value,
								title: title
							});
						}}
						disabled={disabled}
						filterTreeNode={(query, node) =>
							new RegExp(query, "i").test(node.props.title)
						}
						treeDefaultExpandAll={true}
						getPopupContainer={triggerNode =>
							triggerNode.parentNode
						}
						defaultExpandedKeys={[
							...(Array.isArray(this.state.treeData) &&
							this.state.treeData.length
								? [this.state.treeData[0].key]
								: [])
						]}
					/>
				</FormGroup>
				{touched && error && (
					<div className="form-field-error">{error}</div>
				)}
			</FormGroup>
		);
	}
}

class SynthesisForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			constraints: false,
			explore: false
		};
		this.props.initialize({
			fileName: props.defaultFileName || "",
			constraints: false,
			stdcell: (props.stdcells || [])[0].id,
			dcf: "",
			explore: false,
			strategy: (props.strategies || [])[0].id,
			sizing: false,
			buffering: false,
			timing: false,
			schematic: false,
			synthType: (props.execTypes || [])[0].id
		});
	}
	render() {
		const {
			handleSubmit,
			submitting,
			//	status,
			dcfTree,
			errorMessage,
			strategies,
			stdcells,
			execTypes
		} = this.props;

		return (
			<Form className="workspace-form" onSubmit={handleSubmit}>
				{errorMessage && <Alert color="danger">{errorMessage}</Alert>}
				<Field
					name="fileName"
					type="text"
					component={RenderField}
					label={"Netlist File Name: "}
				/>
				<Field
					name="stdcell"
					label="Standard Cell Library: "
					type="select"
					component={renderOptions(stdcells)}
				/>
				<br />
				<Field
					name="constraints"
					type="checkbox"
					component={RenderField}
					label={"Use Constraints File"}
					onChange={evt =>
						this.setState({ [evt.target.name]: evt.target.checked })
					}
				/>
				<Field
					name="dcf"
					type="tree"
					disabled={!this.state.constraints}
					component={RenderTreeField}
					treeData={dcfTree}
					label="Constraints File:"
				/>
				<Field
					name="explore"
					type="checkbox"
					component={RenderField}
					label={"Explore"}
					onChange={evt =>
						this.setState({ [evt.target.name]: evt.target.checked })
					}
				/>
				<Field
					name="strategy"
					label="Synthesis Strategy: "
					type="select"
					disabled={this.state.explore}
					component={renderOptions(strategies)}
				/>

				<br />
				<Field
					name="sizing"
					type="checkbox"
					component={RenderField}
					label={"Sizing"}
				/>
				<Field
					name="buffering"
					type="checkbox"
					component={RenderField}
					label={"Buffering"}
				/>
				<Field
					name="timing"
					type="checkbox"
					component={RenderField}
					disabled={this.state.explore}
					label={"Timing"}
				/>
				<Field
					name="schematic"
					type="checkbox"
					component={RenderField}
					disabled={this.state.explore}
					label={"Schematic"}
				/>
				<br />
				<Field
					name="synthType"
					label="Synthesis Execution Type: "
					type="select"
					component={renderOptions(execTypes)}
				/>
				<div className="w-100 d-flex justify-content-end align-items-center mt-3">
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
						Synthesize
					</Button>
				</div>
			</Form>
		);
	}
}

export default reduxForm({
	form: "SynthesisForm", // a unique identifier for this form
	validate
})(SynthesisForm);
