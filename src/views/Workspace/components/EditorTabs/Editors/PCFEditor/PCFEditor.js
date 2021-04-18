import React, { Component } from "react";
import { Alert } from "reactstrap";
import PCFForm from "./PCFForm";
import { connect } from "react-redux";
import _ from "lodash";
import mapStateToProps from "./mapStateToProps";

class PCFEditor extends Component {
	constructor(props) {
		super(props);
		this.onSave = this.onSave.bind(this);
		this.editorRef = React.createRef();
	}

	onSave(e) {
		e.preventDefault();
		e.stopPropagation();
		this.props.onSaveEditorTab();
	}

	render() {
		let { content } = this.props;
		if (typeof content === "string") {
			try {
				content = JSON.parse(content);
			} catch (e) {
				console.error(e);
			}
		}

		content = content || {};
		const board = this.props.library
			.get("data")
			.get("boards")
			.find(el => el.id === content.boardId);
		if (!board) {
			return (
				<Alert color="danger">Board {content.boardId} not found.</Alert>
			);
		}
		return (
			<div
				className="pcf-editor"
				onKeyDown={e =>
					e.ctrlKey && (e.key === "s" || e.key === "S")
						? this.onSave(e)
						: null
				}
				onFocus={e =>
					this.props.onEditorFocus
						? this.props.onEditorFocus(e)
						: null
				}
				onBlur={e =>
					this.props.onEditorBlur ? this.props.onEditorBlur(e) : null
				}
				tabIndex="0"
			>
				<PCFForm
					tabIndex="0"
					defaultData={content}
					pins={content.pins}
					board={board}
					onChange={e => {
						if (e && e.toJS) {
							const eJS = e.toJS();
							const data = Object.assign({}, content, {
								assignedPins: _.pickBy(
									eJS.assignedPins.value,
									val => val && (
										(val || "").toLowerCase() !== "unassigned"
									)
								)
							});
							if (
								_.isEqual(
									data.assignedPins,
									this.props.content.assignedPins
								)
							) {
								return;
							}
							let eStr = JSON.stringify(data);
							if (this.props.content !== eStr) {
								this.props.onChange(eStr, true);
							}
						}
					}}
					onSubmit={fileData => console.log(fileData.toJS())}
				/>
			</div>
		);
	}
}

export default connect(mapStateToProps)(PCFEditor);
