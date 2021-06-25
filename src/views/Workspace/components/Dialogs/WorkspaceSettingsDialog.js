import React, { Component } from "react";

import { connect } from "react-redux";

import BaseDialog from "./BaseDialog";
import WorkspaceForm from "./Forms/WorkspaceForm";

const mapStateToProps = state => {
	return {
		repository: state.get("repository")
	};
};

class WorkspaceSettingsDialog extends Component {
	render() {
		// const settings = this.props.repository
		// 	.get("data")
		// 	.get("settings");
		const currentFontSize = this.props.repository
		.get("data")
		.get("settings").get("fontSize");
	
		return (
			<BaseDialog
				{...this.props}
				toggle={() => {
					this.props.toggle();
				}}
				title={"Workspace Settings"}
				body={
					<WorkspaceForm
						onSubmit={wsData => this.props.callback(wsData.toJS())}
						onCancel={this.props.toggle}
						defaultFontsize={currentFontSize}
					/>
				}
			/>
		);
	}
}

export default connect(
	mapStateToProps,
	null
)(WorkspaceSettingsDialog);
