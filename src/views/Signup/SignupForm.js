import React, { Component } from "react";

import { Field, reduxForm } from "redux-form/immutable";
import { Link } from "react-router-dom";

import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import PasswordMask from "modules/react-password-mask";

import { emailRegex, usernameRegex, passwordRegex } from "../../constants.js";

const validate = (values) => {
    const errors = {};
    if (!values.get("username")) {
        errors.username = "Username is required";
    } else if (!usernameRegex().test(values.get("username"))) {
        errors.username =
            "The username can only contain letters, numbers and underscores";
    }
    if (!values.get("email")) {
        errors.email = "E-mail is required";
    } else if (!emailRegex().test(values.get("email"))) {
        errors.email = "Invalid e-mail address";
    }
    if (!values.get("password")) {
        errors.password = "Password is required";
    } else if (!passwordRegex().test(values.get("password"))) {
        errors.password =
            "Password should have at least 8 characters and contain at least one letter and one numeral.";
    }
    if (!values.get("confirmPassword")) {
        errors.confirmPassword = "Confirm password is required";
    } else if (values.get("password") !== values.get("confirmPassword")) {
        errors.confirmPassword =
            "Your password and confirmation password do no match";
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
class PasswordField extends Component {
    render() {
        const {
            input,
            label,
            meta: { touched, error },
            placeholder,
            autoComplete,
        } = this.props;

        return (
            <FormGroup>
                <Label className="w-100">{label}</Label>
                <PasswordMask
                    {...input}
                    id={input.name}
                    className="pwd-mask"
                    inputClassName="form-control"
                    autoComplete={autoComplete || ""}
                    useVendorStyles={false}
                    placeholder={placeholder || ""}
                    showButtonContent={
                        <i className="fa fa-eye toggle-pwd-badge"></i>
                    }
                    hideButtonContent={
                        <i className="fa fa-eye-slash toggle-pwd-badge"></i>
                    }
                />
                {touched && error && (
                    <div className="form-field-error">{error}</div>
                )}
            </FormGroup>
        );
    }
}

class LoginFrom extends Component {
    handleFormSubmit = (data) => {
        const username = data.get("username");
        const password = data.get("password");
        const email = data.get("email");
        return this.props.onSubmit({
            username,
            password,
            email,
        });
    };

    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <Form
                className="auth-form pt-2 pb-2"
                onSubmit={handleSubmit(this.handleFormSubmit)}
            >
                <Field
                    name="email"
                    type="email"
                    component={RenderField}
                    label="E-mail"
                    autoComplete="email"
                />
                <Field
                    name="username"
                    type="text"
                    component={RenderField}
                    label="Username"
                    autoComplete="username"
                />
                <Field
                    name="password"
                    type="password"
                    component={PasswordField}
                    label="Password"
                    autoComplete="new-password"
                />
                <Field
                    name="confirmPassword"
                    type="password"
                    component={PasswordField}
                    label="Confirm Password"
                    autoComplete="new-password"
                />

                <div className="w-100 d-flex justify-content-between align-items-center">
                    <Button
                        type="submit"
                        className="action-button w-50 d-flex justify-content-center align-items-center mr-1"
                        disabled={submitting}
                    >
                        REGISTER
                    </Button>
                    <div className="pull-right">
                        Have an account?{" "}
                        <Link className="plain-link black ml-1" to={"/login"}>
                            <b>Log in</b>
                        </Link>
                    </div>
                </div>
            </Form>
        );
    }
}

export default reduxForm({
    form: "loginFrom", // a unique identifier for this form
    validate,
})(LoginFrom);
