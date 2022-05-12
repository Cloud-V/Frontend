import React, { Component } from "react";

import { Button } from "reactstrap";

import propTypes from "prop-types";

class FloatButton extends Component {
    render() {
        return (
            <Button
                onClick={this.props.onClick}
                className="fixed-button wobble top-right"
                title={this.props.title}
            >
                {this.props.text.length ? (
                    this.props.text
                ) : (
                    <i className="fa fa-plus fa-3x"></i>
                )}
            </Button>
        );
    }
}

FloatButton.propTypes = {
    text: propTypes.string,
    title: propTypes.string,
    onClick: propTypes.func,
};
FloatButton.defaultProps = {
    title: "",
    text: "",
};

export default FloatButton;
