import React, { Component } from "react";

import { Field, reduxForm } from "redux-form/immutable";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";
/*import { Link } from 'react-router-dom';

import _ from 'lodash';
import SquareSpinner from 'partials/SquareSpinner';
*/
import TreeSelect, { SHOW_CHILD } from "rc-tree-select";

const validate = (values) => {
    const errors = {};
    if (!values.get("pcf") || values.get("pcf").id.trim() === "") {
        errors.pcf = "Constraints file is required";
    }
    if (!values.get("fileName")) {
        errors.fileName = "Field is required";
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

class RenderTreeField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            title: "",
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(value, title, extras) {
        if (extras) {
            const { triggerNode } = extras;
            if (triggerNode) {
                const { type } = triggerNode.props;
                if (type === "pcf") {
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
            disabled,
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
                                title: title,
                            });
                        }}
                        disabled={disabled}
                        filterTreeNode={(query, node) =>
                            new RegExp(query, "i").test(node.props.title)
                        }
                        treeDefaultExpandAll={true}
                        getPopupContainer={(triggerNode) =>
                            triggerNode.parentNode
                        }
                        defaultExpandedKeys={[
                            ...(Array.isArray(this.state.treeData) &&
                            this.state.treeData.length
                                ? [this.state.treeData[0].key]
                                : []),
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

class BitstreamForm extends Component {
    constructor(props) {
        super(props);
        props.initialize({ fileName: props.defaultName || "" });
    }
    render() {
        const {
            handleSubmit,
            submitting,
            //	status,
            errorMessage,
            treeData,
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
                    label={this.props.fileNameField || "Bitstream file name: "}
                />
                <Field
                    name="pcf"
                    type="tree"
                    component={RenderTreeField}
                    treeData={treeData}
                    label="Constraints File:"
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
                        Generate
                    </Button>
                </div>
            </Form>
        );
    }
}

export default reduxForm({
    form: "BitstreamForm", // a unique identifier for this form
    validate,
})(BitstreamForm);
