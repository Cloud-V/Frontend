import React, { Component } from "react";
import "./FPGA.css";

class FPGAled extends Component {

  componentDidMount() {}

  render() {
    return (
      <div className="led-box">
        <div className={this.props.ledOn? `led-red` : 'led-red led-red-on'}></div>
      </div>
    );
  }
}

export default FPGAled;
