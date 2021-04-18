import React, { Component } from "react";
import {} from "reactstrap";
import DCFForm from "./DCFForm";
import { connect } from "react-redux";

import mapStateToProps from "./mapStateToProps";

class DCFEditor extends Component {
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
		return (
			<div
				className="dcf-editor"
				onKeyDown={e =>
					e.ctrlKey && (e.key === "s" || e.key === "S")
						? this.onSave(e)
						: null
				}
				tabIndex="0"
				onFocus={e =>
					this.props.onEditorFocus
						? this.props.onEditorFocus(e)
						: null
				}
				onBlur={e =>
					this.props.onEditorBlur ? this.props.onEditorBlur(e) : null
				}
			>
				<DCFForm
					tabIndex="0"
					defaultData={content}
					onChange={e => {
						if (e && e.toJS) {
							let eStr = JSON.stringify(e.toJS());
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

export default connect(mapStateToProps)(DCFEditor);
