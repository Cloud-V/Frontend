import React, { Component } from "react";

import { Field, reduxForm } from "redux-form/immutable";
import { Link } from "react-router-dom";
import { Alert, Form, FormGroup, Label, Input, Button } from "reactstrap";

import Captcha from "../Captcha";

const validate = (values) => {
    const errors = {};
    if (!values.get("username")) {
        errors.username = "Username or e-mail is required";
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
            <FormGroup className={type === "hidden" ? "hidden-group" : ""}>
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

class ForgotPasswordForm extends Component {
    state = {
        token: "",
    };

    handleFormSubmit = (data) => {
        const username = data.get("username");
        const captcha_token = this.state.token;
        return this.props.onSubmit({
            username,
            captcha_token,
        });
    };

    render() {
        const { handleSubmit, submitting, status, errorMessage } = this.props;
        const resetRequestFailed = status === "action-error";
        const captcha_site = process.env.REACT_APP_CAPTCHA_SITE;

        return (
            <Form
                className="profile-form w-100 pl-4 pr-4 pt-0 pb-2"
                onSubmit={handleSubmit(this.handleFormSubmit)}
            >
                {resetRequestFailed && (
                    <Alert color="danger">{errorMessage}</Alert>
                )}
                <Field
                    name="username"
                    type="text"
                    component={RenderField}
                    authComplete="username"
                    label="Username or E-mail"
                />
                <Captcha
                    sitekey={captcha_site}
                    onVerify={(captcha_token) =>
                        this.setState({ token: captcha_token })
                    }
                    onExpire={(e) => this.setState({ token: "" })}
                />
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <Button
                        type="submit"
                        className="action-button w-75 mr-2 d-flex justify-content-center align-items-center"
                        disabled={submitting}
                    >
                        SEND RESET E-MAIL
                    </Button>
                    <Link to={"/"} disabled={submitting}>
                        Back
                    </Link>
                </div>
            </Form>
        );
    }
}

export default reduxForm({
    form: "forgotPasswordForm", // a unique identifier for this form
    validate,
})(ForgotPasswordForm);
