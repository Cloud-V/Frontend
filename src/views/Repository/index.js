import React, { Component } from "react";

import { Alert } from "reactstrap";

import Tabs, { TabPane } from "modules/rc-tabs";

import ReactGA from "react-ga";

import { Page404 } from "pages";
import ScrollableInkTabBar from "modules/rc-tabs/lib/ScrollableInkTabBar";

import SquareSpinner from "partials/SquareSpinner";
import RepositoryOverview from "./RepositoryOverview";
import Contributors from "./Contributors";
// import Versions from "./Versions";
import RepositorySettingsDialog from "partials/RepositorySettingsDialog";
import ConfirmationDialog from "partials/ConfirmationDialog";
import Status from "store/utils/status.js";

import { connect } from "react-redux";
import Joyride from "react-joyride";
import joyrideConfig from "./joyride";

import mapDispatchToProps from "./mapDispatchToProps";
import mapStateToProps from "./mapStateToProps";
import TabContentLayout from "./TabContentLayout";

class Repository extends Component {
	constructor(props) {
		super(props);
		this.onTabChange = this.onTabChange.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);
		this.refreshPage = this.refreshPage.bind(this);

		this.state = {
			repoName: this.props.match.params.repoName,
			ownerName: this.props.match.params.ownerName,
			settingsModal: false,
			destroyModal: false,
			publishModal: false,
			destroyError: "",
			filesPage: 0,
			contributorsPage: 0,
			versionsPage: 0,
			...joyrideConfig
		};

		this.onContributorSubmit = this.onContributorSubmit.bind(this);
		this.onContributorRemove = this.onContributorRemove.bind(this);
		this.onVersionSubmit = this.onVersionSubmit.bind(this);
		this.onVersionRemove = this.onVersionRemove.bind(this);
		this.onVersionClone = this.onVersionClone.bind(this);
		this.onVersionDownload = this.onVersionDownload.bind(this);
		this.onRepositoryDownload = this.onRepositoryDownload.bind(this);
		this.onRepositoryClone = this.onRepositoryClone.bind(this);
		this.onRepositoryWatch = this.onRepositoryWatch.bind(this);
		this.onRepositoryFavorite = this.onRepositoryFavorite.bind(this);
		this.onRepositoryUpdate = this.onRepositoryUpdate.bind(this);
		this.onRepositoryDelete = this.onRepositoryDelete.bind(this);
		this.onRepositoryCertify = this.onRepositoryCertify.bind(this);
		this.onRepositoryFeature = this.onRepositoryFeature.bind(this);
		this.openSettings = this.openSettings.bind(this);
		this.toggleSettings = this.toggleSettings.bind(this);
		this.openPublish = this.openPublish.bind(this);
		this.togglePublish = this.togglePublish.bind(this);
		this.openDestroy = this.openDestroy.bind(this);
		this.toggleDestroy = this.toggleDestroy.bind(this);
		this.openWorkspace = this.openWorkspace.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.closeDestroyDialog = this.closeDestroyDialog.bind(this);
		this.tourHandler = this.tourHandler.bind(this);
	}
	openWorkspace() {}
	openPublish() {
		this.setState({
			publishModal: true
		});
	}
	togglePublish() {
		if (
			this.props.repository.get("status") === Status.Loading ||
			this.props.repository.get("status") === Status.ActionLoading
		) {
			return;
		}
		this.setState(prevState => ({
			publishModal: !prevState.publishModal
		}));
	}
	openDestroy() {
		const { repository } = this.props;
		ReactGA.modalview(
			`/${repository.get("data").get("ownerName")}/${repository
				.get("data")
				.get("repoName")}/delete`
		);
		this.setState({
			destroyModal: true
		});
	}
	toggleDestroy() {
		if (
			this.props.repository.get("status") === Status.Loading ||
			this.props.repository.get("status") === Status.ActionLoading
		) {
			return;
		}
		this.setState(prevState => ({
			destroyModal: !prevState.destroyModal
		}));
	}
	openSettings() {
		const { repository } = this.props;
		ReactGA.modalview(
			`/${repository.get("data").get("ownerName")}/${repository
				.get("data")
				.get("repoName")}/settings`
		);
		this.setState({
			settingsModal: true
		});
	}
	toggleSettings() {
		if (
			this.props.repository.get("status") === Status.Loading ||
			this.props.repository.get("status") === Status.ActionLoading
		) {
			return;
		}
		this.setState(prevState => ({
			settingsModal: !prevState.settingsModal
		}));
	}
	closeDialog() {
		this.setState({
			settingsModal: false,
			publishModal: false,
			destroyModal: false
		});
	}
	closeDestroyDialog() {
		this.setState({
			destroyModal: false
		});
	}
	onRepositoryUpdate(updatedRepo) {
		const { ownerName, repoName } = this.state;
		const repoJS = updatedRepo.toJS();
		return this.props
			.repositoryUpdate(
				{
					ownerName,
					repoName
				},
				updatedRepo.toJS()
			)
			.then(action => {
				if (action.error && action.error.length) {
					return;
				}
				this.setState({
					repoName: repoJS.repoTitle.trim().toLowerCase()
				});
				this.closeDialog();
			});
	}
	onRepositoryDelete() {
		const { ownerName, repoName } = this.state;
		return this.props.repositoryRemove({
			ownerName,
			repoName
		});
	}
	onRepositoryDownload() {
		return this.props.repositoryDownload(
			this.props.repository.get("data").toJS()
		);
	}
	onRepositoryClone(repo, target) {
		return this.props.repositoryClone(
			this.props.repository.get("data").toJS(),
			target.toJS()
		);
	}
	onRepositoryWatch() {
		return this.props.repositoryWatch(
			this.props.repository.get("data").toJS()
		);
	}
	onRepositoryFavorite() {
		return this.props.repositoryFavorite(
			this.props.repository.get("data").toJS()
		);
	}
	onRepositoryCertify() {
		return this.props.repositoryCertify(
			this.props.repository.get("data").toJS()
		);
	}
	onRepositoryFeature() {
		return this.props.repositoryFeature(
			this.props.repository.get("data").toJS()
		);
	}
	onVersionDownload(version) {
		const { ownerName, repoName } = this.state;
		return this.props.downloadVersion(
			{
				ownerName,
				repoName
			},
			version
		);
	}
	onVersionSubmit(version) {
		const { ownerName, repoName } = this.state;
		return new Promise((resolve, reject) => {
			this.props
				.repositoryVersionsAdd(
					{
						ownerName,
						repoName
					},
					version
				)
				.then(action => {
					if (action.error && action.error.length) {
						return reject();
					}
					resolve();
					this.props.repositoryVersionsGet({
						ownerName,
						repoName
					});
				})
				.catch(reject);
		});
	}
	onVersionClone(version, target) {
		const { ownerName, repoName } = this.state;
		return new Promise((resolve, reject) => {
			this.props
				.repositoryVersionsClone(
					{
						ownerName,
						repoName
					},
					version.toJS(),
					target.toJS()
				)
				.then(action => {
					if (action.error && action.error.length) {
						return reject();
					}
					resolve();
				})
				.catch(reject);
		});
	}
	onVersionRemove(version) {
		const { ownerName, repoName } = this.state;
		return new Promise((resolve, reject) => {
			this.props
				.repositoryVersionsRemove(
					{
						ownerName,
						repoName
					},
					version.toJS()
				)
				.then(action => {
					if (action.error && action.error.length) {
						return reject();
					}
					resolve();
					this.props.repositoryVersionsGet({
						ownerName,
						repoName
					});
				});
		});
	}
	onContributorRemove(contr) {
		const username = contr.get("user").get("username");
		const { ownerName, repoName } = this.state;
		return new Promise((resolve, reject) => {
			this.props
				.repositoryContributorsRemove(
					{
						ownerName,
						repoName
					},
					{
						username
					}
				)
				.then(action => {
					if (action.error && action.error.length) {
						return reject(action.error);
					}
					resolve();
					this.props.repositoryContributorsGet({
						ownerName,
						repoName
					});
				})
				.catch(reject);
		});
	}
	onContributorSubmit(contr) {
		const username = contr.get("username");
		const accessLevel = contr.get("accessLevel");
		const { ownerName, repoName } = this.state;
		return new Promise((resolve, reject) => {
			this.props
				.repositoryContributorsAdd(
					{
						ownerName,
						repoName
					},
					{
						username,
						accessLevel
					}
				)
				.then(action => {
					if (action.error && action.error.length) {
						return reject();
					}
					resolve();
					this.props.repositoryContributorsGet({
						ownerName,
						repoName
					});
				})
				.catch(reject);
		});
	}
	handlePageClick(tab, selectedPage, offset) {}
	refreshPage(tab, page) {}
	onTabChange() {}

	async componentDidMount() {
		const { ownerName, repoName } = this.state;
		const { user } = this.props;
		await this.props.repositoryGet({
			ownerName,
			repoName
		});
		if (this.props.repository.get("status") !== "error") {
			await Promise.all([
				this.props.repositoryFilesGet({
					ownerName,
					repoName
				}),
				this.props.repositoryContributorsGet({
					ownerName,
					repoName
				}),
				this.props.repositoryVersionsGet({
					ownerName,
					repoName
				})
			]);
			const isWriter = this.props.repository.get("isWriter");
			let steps = this.state.steps.concat(
				isWriter ? this.state.writerSteps : []
			).filter(step=> typeof step === 'object');
			console.log(steps);
			if (user.get("data").get("repositoryTour") === false) {
				// this.setState({
				// 	steps: steps,
				// 	run: true
				// });
			}
		}
	}
	tourHandler(data) {
		const { action, index, status } = data;
		if (action === "close") {
			Promise.resolve(1).then(() => {
				this.setState({
					run: false
				});
			});
		}
		if (
			["close", "skip", "stop"].indexOf(action) !== -1 ||
			(action === "next" && index === 5 && status === "finished")
		) {
			this.props.markRepositoryDone();
		}
	}
	render() {
		if (this.props.repository.get("statusCode") === 404) {
			return <Page404 />;
		} else if (this.props.repository.get("status") === "error") {
			return (
				<Alert color="danger">
					{this.props.repository.get("error").toString()}
				</Alert>
			);
		} else if (this.props.repository.get("status") === Status.Loading) {
			return <SquareSpinner />;
		}
		const isOwner = this.props.repository.get("isOwner");
		const isWriter = this.props.repository.get("isWriter");
		const isAdmin = this.props.user.get("data").get("admin");
		const { steps, run } = this.state;
		return (
			<div className="h-100">
				<ConfirmationDialog
					modal={this.state.destroyModal}
					disabled={
						this.props.repository.get("status") === "action-loading"
					}
					loading={
						this.props.repository.get("status") === "action-loading"
					}
					toggle={this.toggleDestroy}
					closeDialog={this.closeDestroyDialog}
					repository={this.props.repository}
					error={this.state.destroyError}
					onResponse={confirmed => {
						if (confirmed) {
							this.onRepositoryDelete()
								.then(action => {
									if (action.error && action.error.length) {
										this.setState({
											destroyError: action.error
										});
										return this.closeDestroyDialog();
									}
									this.closeDialog();
								})
								.catch(err => {});
						}
					}}
					title={`Destroy Repository!`}
					message={
						<React.Fragment>
							Are you sure you want to destroy the repository{" "}
							<span className="danger-section">
								“
								{this.props.repository
									.get("data")
									.get("ownerName")}{" "}
								/{" "}
								{this.props.repository
									.get("data")
									.get("repoTitle")}
								”
							</span>
							?
							<br />
							<br />
							THIS ACTION CANNOT BE UNDONE.
						</React.Fragment>
					}
				/>
				<RepositorySettingsDialog
					modal={this.state.settingsModal}
					toggle={this.toggleSettings}
					status={this.props.repository.get("status")}
					error={this.props.repository.get("error")}
					repository={this.props.repository}
					onFormSubmit={this.onRepositoryUpdate}
					repoName={this.state.repoName}
					ownerName={this.state.ownerName}
					onRepositoryDelete={this.openDestroy}
				/>
				<Joyride
					steps={steps}
					run={
						run &&
						this.props.user.get("data").get("repositoryTour") ===
							false
					}
					callback={this.tourHandler}
					continuous={true}
					disableBeacon={true}
					disableCloseOnEsc={true}
					disableScrolling={true}
					showSkipButton={true}
					spotlightClicks={false}
					disableOverlayClose={true}
					locale={{ last: "Got It!" }}
					styles={{
						options: {
							primaryColor: "#287E96"
						}
					}}
					debug={true}
				/>
				<Tabs
					prefixCls="dashboard-tabs"
					defaultActiveKey="overview"
					onChange={this.onTabChange}
					renderTabBar={() => <ScrollableInkTabBar />}
					renderTabContent={() => (
						<TabContentLayout
							repository={this.props.repository}
							openSettings={this.openSettings}
							openPublish={this.openPublish}
							openWorkspace={this.openWorkspace}
							isWriter={isWriter}
							isOwner={isOwner}
						/>
					)}
				>
					<TabPane className="h-100" tab="Overview" key="overview">
						<RepositoryOverview
							isWriter={isWriter}
							isOwner={isOwner}
							repository={this.props.repository}
							status={this.props.repository.get("status")}
							error={this.props.repository.get("error")}
							onRepositoryDownload={this.onRepositoryDownload}
							onRepositoryClone={this.onRepositoryClone}
							onRepositoryFavorite={this.onRepositoryFavorite}
							onRepositoryWatch={this.onRepositoryWatch}
							onRepositoryCertify={this.onRepositoryCertify}
							onRepositoryFeature={this.onRepositoryFeature}
							isAdmin={isAdmin}
						/>
					</TabPane>
					<TabPane
						className="h-100"
						tab="Contributors"
						key="contributors"
					>
						<Contributors
							contributor={this.props.contributor}
							repository={this.props.repository}
							contributors={this.props.contributors}
							setContributor={this.props.setContributor}
							onContributorSubmit={this.onContributorSubmit}
							onContributorRemove={this.onContributorRemove}
							isWriter={isWriter}
							isOwner={isOwner}
							isAdmin={isAdmin}
						/>
					</TabPane>
					{/* <TabPane className="h-100" tab="Versions" key="versions">
						<Versions
							version={this.props.version}
							versions={this.props.versions}
							repository={this.props.repository}
							setVersion={this.props.setVersion}
							onVersionSubmit={this.onVersionSubmit}
							onVersionRemove={this.onVersionRemove}
							onVersionClone={this.onVersionClone}
							onVersionDownload={this.onVersionDownload}
							isWriter={isWriter}
							isOwner={isOwner}
							isAdmin={isAdmin}
						/>
					</TabPane> */} 
				</Tabs>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Repository);
