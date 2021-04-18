import React, { Component } from "react";
import AceEditor from "react-ace";
import "brace/mode/verilog";
import "brace/mode/c_cpp";
import "brace/mode/assembly_x86";
import "brace/mode/json";
import "brace/mode/text";
import "brace/snippets/verilog";
import "brace/snippets/c_cpp";
import "brace/ext/language_tools";
import "brace/ext/searchbox";
import "brace/theme/chrome";

import {} from "reactstrap";

class CodeEditor extends Component {
	constructor(props) {
		super(props);
		this.editorRef = React.createRef();
	}

	componentDidMount() {
		if (this.editorRef.current) {
			const editor = this.editorRef.current.editor;
			editor.on("blur", e =>
				this.props.onEditorBlur ? this.props.onEditorBlur(e) : null
			);
			editor.on("focus", e =>
				this.props.onEditorFocus ? this.props.onEditorFocus(e) : null
			);
			editor.commands.addCommand({
				name: "saveOpenTab",
				bindKey: {
					win: "Ctrl-S",
					mac: "Command-S"
				},
				exec: ed => {
					this.props.onSaveEditorTab(ed.getValue());
				},
				readOnly: true
			});
		}
	}

	render() {
		const { content } = this.props;
		const fileType = this.props.tab.type;

		let mode;
		if (
			["verilog", "exverilog", "testbench", "netlist"].indexOf(
				fileType
			) !== -1
		) {
			mode = "verilog";
		} else if (["c", "h", "exC", "exH"].indexOf(fileType) !== -1) {
			mode = "c_cpp";
		} else if (["linker", "startup"].indexOf(fileType) !== -1) {
			mode = "assembly_x86";
		} else if (["ip", "exip"].indexOf(fileType) !== -1) {
			mode = "json";
		} else {
			mode = "text";
		}
		const settings = this.props.repository
			.get("data")
			.get("settings");
		const fontSize = settings.get("fontSize");
		return (
			<div className="editor">
				<AceEditor
					ref={this.editorRef}
					mode={mode}
					theme="chrome"
					fontSize={fontSize}
					value={content}
					width={"100%"}
					height={"calc(100% - 44px)"}
					onChange={this.props.onChange}
					name={
						this.props.editorId ||
						Math.random()
							.toString()
							.split(".")[1]
					}
					editorProps={{ $blockScrolling: true }}
					readOnly={
						this.props.tab.status !== "loaded" ||
						this.props.typeData.readonly
					}
					setOptions={{
						enableBasicAutocompletion: true,
						enableLiveAutocompletion: true,
						enableSnippets: true,
						showLineNumbers: true,
						tabSize: 2,
						showPrintMargin: false,
						wrapEnabled: true,
						copyWithEmptySelection: true,
						wrapBehavioursEnabled: true
					}}
				/>
			</div>
		);
	}
}

export default CodeEditor;
