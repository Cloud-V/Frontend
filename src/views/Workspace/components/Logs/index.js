import React, { Component } from "react";

import { Badge } from "reactstrap";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import _ from "lodash";

import { connect } from "react-redux";
import { ContextMenu, MenuItem as ContextMenuItem } from "react-contextmenu";
import mapDispatchToProps from "./mapDispatchToProps";
import mapStateToProps from "./mapStateToProps";
import LogTab from "./LogTab";

const CONTEXT_KEY = "logs-context";

class Logs extends Component {
	render() {
		const { workspace } = this.props;
		const logs = workspace
			.get("data")
			.get("logs")
			.toJS();
		const activeKey = workspace.get("data").get("activeLogTab");
		const logCounter = el => (el.noCount ? "noCount" : "count");
		const consoleLogLength = _.countBy(logs.console, logCounter).count;
		const warningsLogLength = _.countBy(logs.warnings, logCounter).count;
		const errorsLogLength = _.countBy(logs.errors, logCounter).count;
		const { onOpenFile, gotoLine } = this.props;

		return (
			<div className="workspace-tabs logs-tabs">
				<Tabs
					prefixCls="workspace-tabs"
					defaultActiveKey="console"
					className="d-flex flex-column"
					onChange={id => this.props.setLogTab({ id })}
					activeKey={activeKey}
					renderTabBar={() => <ScrollableInkTabBar />}
					renderTabContent={() => <TabContent />}
				>
					<TabPane
						tab={
							<React.Fragment>
								Console{" "}
								{consoleLogLength ? (
									<Badge className="ml-1" color="light" pill>
										{consoleLogLength}
									</Badge>
								) : null}
							</React.Fragment>
						}
						key="console"
					>
						<LogTab
							id="console-tab"
							name="console"
							contextKey={CONTEXT_KEY}
							logs={logs.console}
							onOpenFile={onOpenFile}
							gotoLine={gotoLine}
						/>
					</TabPane>
					<TabPane
						tab={
							<React.Fragment>
								Warnings{" "}
								{warningsLogLength ? (
									<Badge className="ml-1" color="light" pill>
										{warningsLogLength}
									</Badge>
								) : null}
							</React.Fragment>
						}
						key="warnings"
					>
						<LogTab
							id="warnings-tab"
							name="warnings"
							contextKey={CONTEXT_KEY}
							logs={logs.warnings}
							onOpenFile={onOpenFile}
							gotoLine={gotoLine}
						/>
					</TabPane>
					<TabPane
						tab={
							<React.Fragment>
								Errors{" "}
								{errorsLogLength ? (
									<Badge className="ml-1" color="light" pill>
										{errorsLogLength}
									</Badge>
								) : null}
							</React.Fragment>
						}
						key="errors"
					>
						<LogTab
							id="errors-tab"
							name="errors"
							contextKey={CONTEXT_KEY}
							logs={logs.errors}
							onOpenFile={onOpenFile}
							gotoLine={gotoLine}
						/>
					</TabPane>
				</Tabs>
				<ContextMenu id={CONTEXT_KEY} className="logs-tabs-context">
					<ContextMenuItem
						data={{ actionId: "copy" }}
						onClick={(event, data, target) =>
							this.props.copyText(target.textContent)
						}
					>
						Copy
					</ContextMenuItem>
					<ContextMenuItem
						data={{ actionId: "copyall" }}
						onClick={(event, { name }) =>
							this.props.copyText(
								logs[name].map(el => el.message).join("\n")
							)
						}
					>
						Copy All
					</ContextMenuItem>
					<ContextMenuItem divider />
					<ContextMenuItem
						data={{ actionId: "clear" }}
						onClick={(e, { tab, name }) =>
							this.props.setLogs({
								...logs,
								...{
									[name]: logs[name]
										.slice(0, tab)
										.concat(logs[name].slice(tab + 1))
								}
							})
						}
					>
						Clear
					</ContextMenuItem>
					<ContextMenuItem
						data={{ actionId: "clearall" }}
						onClick={e => this.props.setLogs()}
					>
						Clear All
					</ContextMenuItem>
				</ContextMenu>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Logs);
