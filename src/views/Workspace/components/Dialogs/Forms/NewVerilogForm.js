import React, { Component } from "react";

import { Field, reduxForm } from "redux-form/immutable";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";
/*import { Link } from 'react-router-dom';

import _ from 'lodash';
import SquareSpinner from 'partials/SquareSpinner';
*/
const validate = (values) => {
    const errors = {};
    if (!values.get("moduleName") || values.get("moduleName").trim() === "") {
        errors.moduleName = "Module name is required";
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
            disabled,
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

class NewVerilogForm extends Component {
    constructor(props) {
        super(props);
        props.initialize({
            sequential: false,
        });
    }
    render() {
        const {
            handleSubmit,
            submitting,
            //	status,
            errorMessage,
        } = this.props;
        /*if (status === 'loading') {
			return <SquareSpinner />
		}*/
        return (
            <Form className="workspace-form" onSubmit={handleSubmit}>
                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                <Field
                    name="fileName"
                    type="text"
                    component={RenderField}
                    label="Module name"
                />
                <Field
                    name="sequential"
                    type="checkbox"
                    component={RenderField}
                    label="Sequential"
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
                        Create
                    </Button>
                </div>
            </Form>
        );
    }
}

export default reduxForm({
    form: "newVerilogForm", // a unique identifier for this form
    validate,
})(NewVerilogForm);
