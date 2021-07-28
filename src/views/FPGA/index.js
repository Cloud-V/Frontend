import React, { Component } from "react";
import "./FPGA.css";

import Navbar from "partials/Navbar";

class FPGA extends Component {
  constructor(props) {
    super(props);
    this.location = props.location;
  }
  render() {
    return (
      <div>
        <Navbar location={this.location} />
        <div className="fpga">
          <div className="fpga_interior">
            <div className="fpga_interior_left">
              <div className="fpga_display">8.8.:8.8. 8.8.:8.8.</div>
              <div className="fpga_buttons">
                <div className="fpga_button_exterior">
                  <button className="fpga_button"></button>
                </div>
                <div className="fpga_buttons_middle rowDirection">
                  <div className="fpga_button_exterior">
                    <button className="fpga_button"></button>
                  </div>
                  <div className="fpga_button_exterior">
                    <button className="fpga_button"></button>
                  </div>
                  <div className="fpga_button_exterior">
                    <button className="fpga_button"></button>
                  </div>
                </div>

                <div className="fpga_button_exterior">
                  <button className="fpga_button"></button>
                </div>
              </div>
            </div>

            <div className="fpga_interior_left">
            
              <div className="leds rowDirection">
                <div className="led-box">
                  <div className="led-red"></div>
                </div>
                <div className="led-box">
                  <div className="led-red"></div>
                </div>
                <div className="led-box">
                  <div className="led-red"></div>
                </div>
                <div className="led-box">
                  <div className="led-red"></div>
                </div>
                <div className="led-box">
                  <div className="led-red"></div>
                </div>
              </div>

              <div className="switch">
                <input id="toggle-btn" className="toggle" type="checkbox" />
                <label for="toggle-btn"></label>
                <input id="toggle-btn" className="toggle" type="checkbox" />
                <label for="toggle-btn"></label>
                <input id="toggle-btn" className="toggle" type="checkbox" />
                <label for="toggle-btn"></label>
                <input id="toggle-btn" className="toggle" type="checkbox" />
                <label for="toggle-btn"></label>
                <input id="toggle-btn" className="toggle" type="checkbox" />
                <label for="toggle-btn"></label>
                <input id="toggle-btn" className="toggle" type="checkbox" />
                <label for="toggle-btn"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FPGA;
