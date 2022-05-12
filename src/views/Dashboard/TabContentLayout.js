import React, { Component } from "react";

import { Container } from "reactstrap";

import TabContent from "modules/rc-tabs/lib/TabContent";

import { Link } from "react-router-dom";

import { URLs } from "../../constants.js";
const md5 = require("md5");

const getGravatarURL = (email) => {
    let parsedEmail = email.toLowerCase().split(" ").join("");
    return `https://www.gravatar.com/avatar/${md5(parsedEmail)}?s=200`;
};

export default class TabContentLayout extends Component {
    render() {
        const { profile, isMe } = this.props;

        const displayName =
            profile.displayName ||
            (profile.username.length ? "@" + profile.username : "");
        // const avatarURL = `${URLs.Avatar}/${profile.username}.png`;
        const avatarURL = getGravatarURL(
            profile.gravatarEmail ? profile.gravatarEmail : profile.email
        );

        return (
            <Container className="repositories-dashboard">
                <div className="repositories-dashboard-header">
                    <span className="repositories-dashboard-header-text">
                        <Link to={`/${profile.username}`}>
                            <img
                                src={avatarURL}
                                className="img-avatar mr-3"
                                alt={displayName}
                            />{" "}
                            {displayName}'s{" "}
                        </Link>{" "}
                        {isMe ? ` Dashboard` : ` Repositories`}
                    </span>
                </div>
                <TabContent {...this.props}>{this.props.children}</TabContent>
            </Container>
        );
    }
}
