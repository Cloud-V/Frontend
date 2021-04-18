import React, { Component } from "react";

import BaseDialog from "./BaseDialog";
import SetRadixForm from "./Forms/SetRadixForm";

class SetRadixDialog extends Component {
	render() {
		return (
			<BaseDialog
				{...this.props}
				toggle={() => {
					this.props.toggle();
				}}
				title={this.props.title || "Set Radix"}
				className={""}
				body={
					<div>
						<SetRadixForm
							onSubmit={fileData =>
								this.props.callback(fileData.get("radix"))
							}
							onCancel={this.props.toggle}
							defaultRadix={this.props.defaultRadix}
						/>
					</div>
				}
			/>
		);
	}
}

export default SetRadixDialog;
