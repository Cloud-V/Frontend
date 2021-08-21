import React, { Component } from "react";

import { Field, reduxForm } from "redux-form/immutable";
import { Link } from "react-router-dom";
import { Alert, Form, FormGroup, Label, Input, Button } from "reactstrap";

import {
  emailRegex,
  usernameRegex,
  passwordRegex,
  URLs,
} from "../../constants.js";

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

class RenderAvatarField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: this.props.defaultAvatar,
    };
  }
  render() {
    const {
      input,
      meta: { touched, error },
      placeholder,
      autoComplete,
    } = this.props;
    const { name, onChange } = input;
    return (
      <FormGroup className="avatar-input">
        <input
          name={name}
          type={"file"}
          autoComplete={autoComplete || ""}
          accept="image/*"
          ref={(input) => (this.inputElement = input)}
          className="form-control-file"
          placeholder={placeholder || ""}
          onChange={(e) => {
            e.preventDefault();
            if (e.target.files.length) {
              const file = e.target.files[0];
              onChange(file);
              const reader = new FileReader();
              reader.onload = (e) => {
                this.setState({
                  avatar: e.target.result,
                });
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <img
          onClick={(e) => this.inputElement.click()}
          src={this.state.avatar}
          alt="Change Avatar"
        />
        <Button onClick={(e) => this.inputElement.click()}>
          Change Avatar
        </Button>
        {touched && error && <div className="form-field-error">{error}</div>}
      </FormGroup>
    );
  }
}
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
        {touched && error && <div className="form-field-error">{error}</div>}
      </FormGroup>
    );
  }
}

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    const profile = this.props.profile.get("data").toJS();
    const avatarURL = `${URLs.Avatar}/${profile.username}.png?refresh=${
      Math.random().toString().split(".")[1]
    }`;
    this.state = {
      avatar: avatarURL,
    };
    const { username, email, displayName, personalURL, about } = profile;

    this.props.initialize({
      username,
      email,
      displayName,
      personalURL,
      about,
    });
  }
  render() {
    const { handleSubmit, submitting, status, errorMessage } = this.props;
    const userUpdateFailed = status === "action-error";
    return (
      <Form
        className="profile-form w-100 pl-4 pr-4 pt-2 pb-2"
        onSubmit={handleSubmit}
      >
        {userUpdateFailed && <Alert color="danger">{errorMessage}</Alert>}
        <Field
          name="avatar"
          type="file"
          component={RenderAvatarField}
          label="Avatar:"
          defaultAvatar={this.state.avatar}
          autoComplete="avatar"
        />
        <Field
          name="username"
          type="text"
          disabled={true}
          component={RenderField}
          label="Username"
          autoComplete="on"
        />
        <Field
          name="email"
          type="email"
          disabled={true}
          component={RenderField}
          label="E-mail"
          autoComplete="email"
        />
        <Field
          name="displayName"
          type="text"
          component={RenderField}
          label="Display name:"
          autoComplete="name"
        />
        <Field
          name="personalURL"
          type="text"
          component={RenderField}
          label="Personal URL"
          autoComplete="url"
        />
        <Field
          name="about"
          type="textarea"
          component={RenderField}
          label="About"
          autoComplete="bio"
        />
        <Field
          name="resetTutorials"
          type="checkbox"
          component={RenderField}
          label="Reset Introductory Tours"
          autoComplete="on"
          disabled={true}
        />
        <Link to={"/edit/password"} disabled={submitting}>
          Change Password
        </Link>

        <div className="w-100 d-flex justify-content-between align-items-center">
          <Button
            type="submit"
			style={{marginTop:'10px'}} 
            className="action-button w-50 mr-2 d-flex justify-content-center align-items-center"
            disabled={submitting}
          >
            APPLY
          </Button>
        </div>
      </Form>
    );
  }
}

export default reduxForm({
  form: "profileForm", // a unique identifier for this form
  validate,
})(ProfileForm);
