import React, { Component } from "react";

import { Field, reduxForm } from "redux-form/immutable";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import _ from "lodash";
import SquareSpinner from "partials/SquareSpinner";

const validate = (values) => {
    const errors = {};
    if (!values.get("repoTitle")) {
        errors.repoTitle = "Repository name is required";
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
        } = this.props;

        return (
            <FormGroup>
                <Label>{label}</Label>
                <Input
                    {...input}
                    type={type}
                    autoComplete={autoComplete || ""}
                    placeholder={placeholder || ""}
                />
                {touched && error && (
                    <div className="form-field-error">{error}</div>
                )}
            </FormGroup>
        );
    }
}

class RenderOptionsField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.input.value || "1",
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            selected: e.target.value,
        });
    }

    render() {
        const {
            input,
            label,
            meta: { touched, error },
            options,
        } = this.props;
        const defaultOnChange = input.onChange;
        return (
            <FormGroup>
                <Label>{label}</Label>
                <br />
                <FormGroup className="switch-toggle alert alert-light" inline>
                    {_.map(options, (opt) => (
                        <React.Fragment key={opt.value}>
                            <Input
                                {...input}
                                id={`${input.name}_${opt.value}`}
                                type={"radio"}
                                value={opt.value}
                                className="switch-radio"
                                onChange={(e) => {
                                    if (typeof defaultOnChange === "function") {
                                        defaultOnChange(e);
                                    }
                                    this.onChange(e);
                                }}
                                checked={this.state.selected === opt.value}
                            />
                            <Label for={`${input.name}_${opt.value}`}>
                                {opt.name}
                            </Label>
                        </React.Fragment>
                    ))}
                    <Button
                        role="button"
                        tag={Link}
                        to={"#"}
                        className="switch-button"
                    ></Button>
                </FormGroup>
                {touched && error && (
                    <div className="form-field-error">{error}</div>
                )}
            </FormGroup>
        );
    }
}

class RepositorySettingsForm extends Component {
    constructor(props) {
        super(props);
        const data = this.props.repository.get("data").toJS();
        this.props.initialize({
            repoTitle: data.repoTitle,
            description: data.description,
            privacy: data.privacy + "",
        });
    }
    render() {
        const { handleSubmit, submitting, status, errorMessage } = this.props;
        if (status === "loading" || status === "action-loading") {
            return <SquareSpinner />;
        }
        return (
            <Form className="auth-form pb-0" onSubmit={handleSubmit}>
                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                <Field
                    name="repoTitle"
                    type="text"
                    component={RenderField}
                    label="Repository name"
                />
                <Field
                    name="description"
                    type="textarea"
                    component={RenderField}
                    label="Description (optional)"
                    autoComplete="description"
                />
                <Field
                    name="privacy"
                    component={RenderOptionsField}
                    options={[
                        {
                            name: "Public",
                            value: "1",
                            default: true,
                        },
                        {
                            name: "Private",
                            value: "0",
                        },
                    ]}
                    label="Privacy"
                />
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <Button
                        type="submit"
                        className="action-button mr-2"
                        disabled={submitting}
                    >
                        Save
                    </Button>
                    <Button
                        className="action-button action-button-secondary mr-2"
                        onClick={this.props.onCancel}
                        disabled={submitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="action-button danger-button d-flex justify-content-center align-items-center"
                        onClick={this.props.onRepositoryDelete}
                        disabled={submitting}
                    >
                        <i className="fa fa-trash fa-lg mr-2"></i>Destroy!
                    </Button>
                </div>
            </Form>
        );
    }
}

export default reduxForm({
    form: "repositorySettingsFrom", // a unique identifier for this form
    validate,
})(RepositorySettingsForm);
