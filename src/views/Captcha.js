import HCaptcha from "@hcaptcha/react-hcaptcha";

import React, { Component } from "react";

class MockCaptcha extends Component {
    render() {
        return <br />;
    }
}

const Captcha =
    process.env.REACT_APP_NOCAPTCHA === "1" ? MockCaptcha : HCaptcha;

export default Captcha;
