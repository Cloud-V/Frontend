import React, { Component } from "react";

import BaseDialog from "./BaseDialog";
import SimulationForm from "./Forms/SimulationForm";
import { adjustExtension } from "../../../../constants.js";

const levels = [
    {
        id: 0,
        title: "0: Dump everything",
    },
    {
        id: 1,
        title: "1: Dump top-level only",
    },
    {
        id: 2,
        title: "2: Dump first 2 levels",
    },
    {
        id: 3,
        title: "3: Dump first 3 levels",
    },
    {
        id: 4,
        title: "4: Dump first 4 levels",
    },
];

class SimulationDialog extends Component {
    render() {
        let testBenchName =
            (this.props.targetNode || {}).text || "simulation.v";
        let extIndex = testBenchName.lastIndexOf(".v");
        if (extIndex > -1) {
            testBenchName = testBenchName.substr(0, extIndex);
        }
        testBenchName = testBenchName + ".vcd";

        return (
            <BaseDialog
                {...this.props}
                toggle={() => {
                    this.props.toggle();
                }}
                title={"Simulation Options"}
                body={
                    <SimulationForm
                        defaultFileName={testBenchName}
                        levels={levels}
                        onSubmit={(fileData) =>
                            this.props.callback(
                                fileData
                                    .set(
                                        "fileName",
                                        adjustExtension(
                                            fileData.get("fileName"),
                                            ".vcd"
                                        )
                                    )
                                    .toJS()
                            )
                        }
                        onCancel={this.props.toggle}
                    />
                }
            />
        );
    }
}

export default SimulationDialog;
