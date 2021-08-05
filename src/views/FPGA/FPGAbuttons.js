import React, { Component } from "react";
import "./FPGA.css";

class FPGAbuttons extends Component {

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <div className="fpga_button_exterior">
          <button className="fpga_button" onClick={this.props.onTopFPGAbuttonClick} ></button>
        </div>
        <div className="fpga_buttons_middle rowDirection">
          <div className="fpga_button_exterior">
            <button className="fpga_button" onClick={this.props.onLeftFPGAbuttonClick} ></button>
          </div>
          <div className="fpga_button_exterior">
            <button className="fpga_button" onClick={this.props.onMiddleFPGAbuttonClick}></button>
          </div>
          <div className="fpga_button_exterior">
            <button className="fpga_button" onClick={this.props.onRightFPGAbuttonClick}></button>
          </div>
        </div>

        <div className="fpga_button_exterior">
          <button className="fpga_button" onClick={this.props.onBottomFPGAbuttonClick}></button>
        </div>
      </React.Fragment>
    );
  }
}

export default FPGAbuttons;
