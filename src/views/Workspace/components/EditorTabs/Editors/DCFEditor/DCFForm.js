import React, { Component } from "react";

import { Field, reduxForm } from "redux-form/immutable";
import { Alert, Form, FormGroup, Label, Input } from "reactstrap";

const validate = (values) => {
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
            disabled,
            description,
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
                            {description ? " " + description : ""}
                        </Label>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Label>
                            {label}
                            {description ? " " + description : ""}
                        </Label>
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
const normalizeInteger = (value) => parseInt(value, 10) || 0;

class DCFForm extends Component {
    constructor(props) {
        super(props);
        props.initialize(this.props.defaultData || {});
    }
    render() {
        const {
            handleSubmit,
            // submitting,
            //	status,
            errorMessage,
        } = this.props;

        const targets = [
            {
                id: "BUFFx2",
                title: "BUFFx2",
            },
            {
                id: "BUFFx3",
                title: "BUFFx3",
            },
        ];

        return (
            <Form
                className="workspace-form w-75"
                onSubmit={handleSubmit}
                onChange={this.props.onChange}
            >
                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                <Label>
                    Standard Cell Library: {this.props.defaultData.stdcell}
                </Label>
                <br />
                <Field
                    name="clock"
                    type="number"
                    component={RenderField}
                    label={"Clock Period"}
                    description={"ps (Between 1000 and 10000)"}
                    normalize={normalizeInteger}
                />
                <Field
                    name="outputLoad"
                    type="number"
                    component={RenderField}
                    label={"Clock Period"}
                    description={"fF (Between 20 and 100)"}
                    normalize={normalizeInteger}
                />
                <Field
                    name="inputDrivingCell"
                    label="Input Driving Cell:"
                    type="select"
                    component={function ({
                        label,
                        input,
                        meta: { touched, error },
                    }) {
                        return (
                            <React.Fragment>
                                <Label>{label}</Label>
                                <Input {...input} type="select" name="target">
                                    {targets.map((target, ind) => (
                                        <option
                                            key={`${ind}_${target.id}`}
                                            value={target.id}
                                        >
                                            {target.title}
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
                <Field
                    name="maxTransition"
                    type="number"
                    component={RenderField}
                    label={"Max Transition"}
                    description={"ps (Between 100 and 200)"}
                    normalize={normalizeInteger}
                />
                <Field
                    name="maxFanout"
                    type="number"
                    component={RenderField}
                    label={"Max Fan-Out"}
                    description={"(Between 1 and 10)"}
                    normalize={normalizeInteger}
                />

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
    form: "DCFForm", // a unique identifier for this form
    validate,
})(DCFForm);
