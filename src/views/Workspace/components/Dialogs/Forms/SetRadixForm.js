import React, { Component } from "react";

import { Field, reduxForm } from "redux-form/immutable";
import { Alert, Button, Form, Label, Input } from "reactstrap";

const validate = (values) => {
    const errors = {};
    if (!values.get("fileName") || values.get("fileName").trim() === "") {
        errors.fileName = "File name is required";
    }
    return errors;
};

const bases = [
    {
        id: "hexadecimal",
        title: "Hexadecimal",
    },
    {
        id: "decimal",
        title: "Decimal",
    },
    {
        id: "binary",
        title: "Binary",
    },
];

class SetRadixForm extends Component {
    constructor(props) {
        super(props);
        props.initialize({ radix: props.defaultRadix || bases[0].id });
    }
    render() {
        const {
            handleSubmit,
            submitting,
            //	status,
            errorMessage,
        } = this.props;

        return (
            <Form className="workspace-form pb-0" onSubmit={handleSubmit}>
                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                <Field
                    name="radix"
                    label="Radix:"
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
                                    {bases.map((target, ind) => (
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
                        Save
                    </Button>
                </div>
            </Form>
        );
    }
}

export default reduxForm({
    form: "SetRadixForm", // a unique identifier for this form
    validate,
})(SetRadixForm);
