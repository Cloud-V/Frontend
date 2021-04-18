import React, { Component } from "react";

import { Field, reduxForm } from "redux-form/immutable";
import { Alert, Button, Form, Label, FormGroup } from "reactstrap";
import TreeSelect, { SHOW_CHILD } from "rc-tree-select";

const validate = values => {
	const errors = {};
	return errors;
};

class RenderTreeField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			values: []
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(values, title, extras) {
		// if (extras) {
		// 	const { triggerNode } = extras;
		// 	if (triggerNode) {
		// 		// const { type } = triggerNode.props;
		// 		// if (type === "verilog") {
		// 		this.setState({ id: value, title: title });
		// 		// }
		// 	}
		// }
		this.setState({
			values
		});
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
						treeCheckable={true}
						showCheckedStrategy={SHOW_CHILD}
						searchPlaceholder={"Search.."}
						style={{ minWidth: 300, display: "block" }}
						dropdownStyle={{ maxHeight: 200, overflow: "auto" }}
						multiple={false}
						treeCheckStrictly={true}
						treeIcon={false}
						maxTagCount={2}
						value={this.state.values}
						onChange={(values, title, extras) => {
							if (
								!extras ||
								!extras.triggerNode ||
								(typeof extras.triggerNode.props.checkable !==
									"undefined" &&
									// eslint-disable-next-line
									extras.triggerNode.props.checkable == false)
							) {
								return;
							}
							this.onChange(values, title, extras);
							input.onChange(values);
						}}
						disabled={disabled}
						filterTreeNode={(query, node) =>
							new RegExp(query, "i").test(node.props.title)
						}
						treeDefaultExpandAll={false}
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

class AddSignalForm extends Component {
	render() {
		const {
			handleSubmit,
			submitting,
			//	status,
			treeData,
			errorMessage
		} = this.props;

		return (
			<Form className="workspace-form pb-0" onSubmit={handleSubmit}>
				{errorMessage && <Alert color="danger">{errorMessage}</Alert>}
				<Field
					name="signal"
					label="Signal(s):"
					type="tree"
					treeData={treeData}
					component={RenderTreeField}
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
						type="submit"
					>
						Add
					</Button>
				</div>
			</Form>
		);
	}
}

export default reduxForm({
	form: "AddSignalForm", // a unique identifier for this form
	validate
})(AddSignalForm);
