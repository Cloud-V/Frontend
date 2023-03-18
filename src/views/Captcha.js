import HCaptcha from "@hcaptcha/react-hcaptcha";

import React, { Component } from "react";

class MockCaptcha extends Component {
    render() {
        return <br />;
    }
}

const Captcha = process.env.REACT_APP_CAPTCHA_SITE ? HCaptcha : MockCaptcha;

export default Captcha;
