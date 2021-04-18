import React, { Component } from "react";

import BaseDialog from "./BaseDialog";
import AddSignalForm from "./Forms/AddSignalForm";

class AddSignalDialog extends Component {
	constructor(props) {
		super(props);
		this.generateTreeData = this.generateTreeData.bind(this);
	}

	generateTreeData() {
		const { signals } = this.props;
		const childrenMap = {};
		const nodeMap = {};
		let parentLevels = [];
		signals.forEach(signal => {
			const nameParts = signal.id.split(".");

			const parentName = nameParts
				.slice(0, nameParts.length - 1)
				.join(".");
			parentLevels[nameParts.length - 1] =
				parentLevels[nameParts.length - 1] || [];
			if (!parentLevels[nameParts.length - 1].includes(parentName))
				parentLevels[nameParts.length - 1].push(parentName);
			childrenMap[parentName] = childrenMap[parentName] || [];
			childrenMap[parentName].push(signal);
		});
		const nodes = [];
		parentLevels = parentLevels.filter(level => level);
		parentLevels.forEach((levelSignals, level) =>
			levelSignals.forEach(moduleName => {
				if (nodeMap[moduleName]) {
					return;
				}
				const nameParts = moduleName.split(".");
				const node = {
					id: moduleName,
					key: moduleName,
					value: moduleName,
					title: moduleName.split(".")[
						moduleName.split(".").length - 1
					],
					children: [],
					isLeaf: false,
					selectable: false,
					checkable: false
				};
				nodeMap[moduleName] = node;
				if (level === 0) {
					nodes.push(node);
				} else {
					const parentName = nameParts
						.slice(0, nameParts.length - 1)
						.join(".");
					childrenMap[parentName] = childrenMap[parentName] || [];
					childrenMap[parentName].push(node);
				}
			})
		);
		signals.forEach(
			signal =>
				(nodeMap[signal.id] = {
					id: signal.id,
					key: signal.id,
					value: signal.id,
					title: signal.id.split(".")[
						signal.id.split(".").length - 1
					],
					// children: []
					isLeaf: true
				})
		);
		const add = (parentNode, node) => {
			parentNode.children.push(node);
			const children = childrenMap[node.id] || [];
			children.forEach(child => {
				add(node, nodeMap[child.id]);
			});
		};
		nodes.forEach(parentNode => {
			const children = childrenMap[parentNode.id] || [];
			children.forEach(child => {
				add(parentNode, nodeMap[child.id]);
			});
		});
		return nodes;
	}
	render() {
		const treeData = this.generateTreeData();
		return (
			<BaseDialog
				{...this.props}
				toggle={() => {
					this.props.toggle();
				}}
				title={this.props.title || "Add Signals"}
				className={""}
				body={
					<div>
						<AddSignalForm
							treeData={treeData}
							onSubmit={data =>
								this.props.callback(
									(data.get("signal") ?? []).map(
										signal => signal.value
									)
								)
							}
							onCancel={this.props.toggle}
						/>
					</div>
				}
			/>
		);
	}
}

export default AddSignalDialog;
