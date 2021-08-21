import React, { Component } from "react";
import "./FPGA.css";

import Navbar from "partials/Navbar";
import FPGAbuttons from "./FPGAbuttons";
import FPGAswitch from "./FPGAswitch";
import FPGAled from "./FPGAled";
import data from "./fpgaData";

class FPGA extends Component {
  constructor(props) {
    super(props);
    this.location = props.location;
    let ledNumbers = 10;
    this.state = { ledArray: Array(ledNumbers).fill(false), FPGAdata: data['objects'] };
  }
  render() {
    console.log(this.state.FPGAdata);

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
      const newLedArray = [...this.state.ledArray];

      if (e.target.checked) {
        newLedArray[i] = true;
        this.setState({
          ledArray: newLedArray,
        });
      } else if (!e.target.checked) {
        newLedArray[i] = false;
        this.setState({ ledArray: newLedArray });
      }
    };

    return (
      <div>
        <Navbar location={this.location} />
        <div className="fpga">
          <div className="fpga_interior">
            <div className="fpga_interior_left">
             {this.state.FPGAdata[0].visible && <div className="fpga_display">8.8.:8.8.</div> }
             {this.state.FPGAdata[1].visible && <div className="fpga_buttons">
                <FPGAbuttons
                  onTopFPGAbuttonClick={onTopFPGAbuttonClick}
                  onBottomFPGAbuttonClick={onBottomFPGAbuttonClick}
                  onLeftFPGAbuttonClick={onLeftFPGAbuttonClick}
                  onRightFPGAbuttonClick={onRightFPGAbuttonClick}
                  onMiddleFPGAbuttonClick={onMiddleFPGAbuttonClick}
                />
              </div> }
            </div>

            <div className="fpga_interior_left">
            {this.state.FPGAdata[3].visible && <div className="leds rowDirection">
                {[...Array(10)].map((object, i) => (
                  <FPGAled id={i} ledOn={this.state.ledArray[i]} />
                ))} 
              </div>}

              {this.state.FPGAdata[2].visible && <div className="switch">
                {[...Array(10)].map((object, i) => (
                  <FPGAswitch switchChecked={switchChecked} id={i} />
                ))}
              </div> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FPGA;
