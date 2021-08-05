import React, { Component } from "react";
import "./FPGA.css";

import Navbar from "partials/Navbar";
import FPGAbuttons from "./FPGAbuttons";
import FPGAswitch from "./FPGAswitch";
import FPGAled from "./FPGAled";

class FPGA extends Component {
  constructor(props) {
    super(props);
    this.location = props.location;
  }

  render() {
    let ledNumbers=10;
    let ledArray = (Array(ledNumbers)).fill(false);
    console.log(ledArray);

    const onTopFPGAbuttonClick = () => {
      console.log("Top Button Clicked");
    };

    const onBottomFPGAbuttonClick = () => {
      console.log("Bottom Button Clicked");
    };

    const onLeftFPGAbuttonClick = () => {
      console.log("Left Button Clicked");
    };

    const onRightFPGAbuttonClick = () => {
      console.log("Right Button Clicked");
    };

    const onMiddleFPGAbuttonClick = () => {
      console.log("Middle Button Clicked");
    };

    const switchChecked = (e, i) => {
      if (e.target.checked) {
        console.log(`Switch number ${i + 1} is checked`);
      } else if (!e.target.checked) {
        console.log(`Switch number ${i + 1} is unchecked`);
      }
    };

    return (
      <div>
        <Navbar location={this.location} />
        <div className="fpga">
          <div className="fpga_interior">
            <div className="fpga_interior_left">
              <div className="fpga_display">8.8.:8.8.</div>
              <div className="fpga_buttons">
                <FPGAbuttons
                  onTopFPGAbuttonClick={onTopFPGAbuttonClick}
                  onBottomFPGAbuttonClick={onBottomFPGAbuttonClick}
                  onLeftFPGAbuttonClick={onLeftFPGAbuttonClick}
                  onRightFPGAbuttonClick={onRightFPGAbuttonClick}
                  onMiddleFPGAbuttonClick={onMiddleFPGAbuttonClick}
                />
              </div>
            </div>

            <div className="fpga_interior_left">
              <div className="leds rowDirection">
                {[...Array(10)].map((object, i) => (
                  <FPGAled id={i} ledOn={ledArray[i]} />
                ))} 
              </div>

              <div className="switch">
                {[...Array(10)].map((object, i) => (
                  <FPGAswitch switchChecked={switchChecked} id={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FPGA;
