import React, { Component } from "react";
import { connect } from "react-redux";

import _ from "lodash";

import NewTestbenchFirstForm from "views/Workspace/components/Dialogs/Forms/NewTestbenchFirstForm";
import NewTestbenchSecondForm from "views/Workspace/components/Dialogs/Forms/NewTestbenchSecondForm";
import NewFileForm from "views/Workspace/components/Dialogs/Forms/NewFileForm.js";

import { generateFilesTree } from "views/Workspace/components/FileTree/utils.js";

import { getRepositoryFiles, loadFile } from "store/actions/files";

const mapStateToProps = state => {
	return {
		repository: state.get("repository"),
		files: state.get("files")
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getRepositoryFiles: ({ ownerName, repoName }) =>
			dispatch(
				getRepositoryFiles({
					ownerName,
					repoName,
					filter: ""
				})
			),
		loadFile: ({ ownerName, repoName, node, topModule, topModuleEntry }) =>
			dispatch(
				loadFile({
					ownerName,
					repoName,
					node,
					topModule,
					topModuleEntry
				})
			)
	};
};

class TestbenchWizard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 0,
			firstFormData: null,
			treeData: [],
			modules: [],
			fileStatus: "loading",
			treeValue: "",
			moduleStatus: ""
		};
	}

	componentDidUpdate(prevProps, nextProps) {
		const { files: prevFiles } = prevProps;
		const { files: nextFiles } = this.props;
		if (prevFiles && nextFiles) {
			if (prevFiles.get("data") !== nextFiles.get("data")) {
				const treeData = generateFilesTree(
					nextFiles
						.get("data")
						.toJS()
						.filter(file =>
							[
								"verilog",
								"folder",
								"root",
								"buildFolder"
							].includes(file.type)
						)
				);

				this.setState({
					treeData
				});
			}
		}
	}

	async componentDidMount() {
		this.setState({ fileStatus: "" });
		const { files } = this.props;
		const treeData = generateFilesTree(
			files
				.get("data")
				.toJS()
				.filter(file =>
					["verilog", "folder", "root", "buildFolder"].includes(
						file.type
					)
				)
		);
		this.setState({
			treeData
		});
		return Promise.resolve();
	}

	render() {
		const { files, repository, toastError, onCancel } = this.props;
		const { step, treeData, fileStatus, moduleStatus } = this.state;

		const repoName = repository.get("data").get("repoName");
		const ownerName = repository.get("data").get("ownerName");
		const topModule = repository.get("data").get("topModule") || "";
		const topModuleEntry =
			repository.get("data").get("topModuleEntry") || "";

		let onSubmit = async (firstFormData) => {
			if (firstFormData.get("blank")) {
				return this.setState({
					step: 1,
					firstFormData
				});
			}
			await new Promise(r=> this.setState({
				moduleStatus: "loading"
			}, r));
			const nodeId = firstFormData.get("verilogFile").id;

			const node = files.get("data").find(el => el.get("id") === nodeId);
			
			let action = await this.props.loadFile({
				ownerName,
				repoName,
				node,
				topModule,
				topModuleEntry
			});

			if (
				action.error &&
				action.error.length
			) {
				onCancel();
				return toastError(action.error);
			}
			const modules = _.map(
				this.props.files
					.get("data")
					.filter(
						el =>
							el.get("parent") ===
							nodeId
					)
					.toJS(),
				"title"
			);
			this.setState({
				modules,
				step: 1,
				firstFormData
			});
		};

		if (step === 0) {
			return (
				<NewTestbenchFirstForm
					onSubmit={onSubmit}
					treeData={treeData}
					fileStatus={fileStatus}
					moduleStatus={moduleStatus}
					onCancel={this.props.onCancel || (() => null)}
				/>
			);
		} else {
			if (this.state.firstFormData.get("blank")) {
				return (
					<NewFileForm
						fileNameField={"Testbench File Name"}
						onSubmit={secondFormData => {
							return this.props.onSubmit(
								this.state.firstFormData
									.merge(secondFormData)
									.remove("verilogFile")
							);
						}}
						defaultFileName={"testbench_tb.v"}
						onCancel={this.props.onCancel}
						onBack={() =>
							this.setState({
								step: 0
							})
						}
						withBack={true}
					/>
				);
			}
			let defaultFileName = this.state.firstFormData.get("verilogFile")
				.title;
			let extIndex = defaultFileName.lastIndexOf(".v");
			if (extIndex !== -1) {
				defaultFileName = defaultFileName.substr(0, extIndex);
			}
			defaultFileName = `${defaultFileName}_tb.v`;
			return (
				<NewTestbenchSecondForm
					defaultFileName={defaultFileName}
					modules={this.state.modules}
					onSubmit={secondFormData => {
						const merged = this.state.firstFormData.merge(
							secondFormData
						);
						let formatted = merged
							.set("source", merged.get("verilogFile").id)
							.set("module", merged.get("target"))
							.remove("verilogFile");
						return this.props.onSubmit(formatted);
					}}
					onBack={() =>
						this.setState({
							step: 0
						})
					}
					onCancel={this.props.onCancel || (() => null)}
				/>
			);
		}
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TestbenchWizard);
