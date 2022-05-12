import React, { Component } from "react";
import { URLs } from "../../constants.js";

import ghlogo from "assets/gh-logo.png";

export default class GHSignin extends Component {
    render() {
        return (
            <a href={URLs.GitHubAuth}>
                <div
                    id={this.props.id || "ghsignin"}
                    className={`sm-signin btn w-100 text-center social-enabled`}
                >
                    <img src={ghlogo} alt="GitHub" className="icon"></img>
                    <span className="name">GitHub</span>
                </div>
            </a>
        );
    }
}
