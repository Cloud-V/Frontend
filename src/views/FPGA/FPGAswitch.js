import React, { Component } from "react";
import "./FPGA.css";

class FPGAswitch extends Component {

  componentDidMount() {}

  render() {
    

    return (
      <React.Fragment>
        <input
          id={`toggle-btn ${this.props.id}`}
          className="toggle"
          type="checkbox"
          onChange={ (e)=>this.props.switchChecked(e,this.props.id) }
        />
        <label for={`toggle-btn ${this.props.id}`}></label>
      </React.Fragment>
    );
  }
}

export default FPGAswitch;
