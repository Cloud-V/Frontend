export const ActionNames = {
	CREATE_REPOSITORY: "CREATE_REPOSITORY",
	GET_REPOSITORY: "GET_REPOSITORY",
	CLONE_REPOSITORY: "CLONE_REPOSITORY",
	SET_REPOSITORY: "SET_REPOSITORY",
	SET_REPOSITORY_SETTINGS: "SET_REPOSITORY_SETTINGS",
	DOWNLOAD_REPOSITORY: "DOWNLOAD_REPOSITORY",
	WATCH_REPOSITORY: "WATCH_REPOSITORY",
	FAVORITE_REPOSITORY: "FAVORITE_REPOSITORY",
	UPDATE_REPOSITORY: "UPDATE_REPOSITORY",
	REMOVE_REPOSITORY: "REMOVE_REPOSITORY",
	FEATURE_REPOSITORY: "FEATURE_REPOSITORY",
	CERTIFY_REPOSITORY: "CERTIFY_REPOSITORY",

	TRY: "TRY",

	GET_USER_REPOSITORIES: " GET_USER_REPOSITORIES",
	GET_WATCHING_REPOSITORIES: "GET_WATCHING_REPOSITORIES",
	GET_SHARED_REPOSITORIES: "GET_SHARED_REPOSITORIES",

	GET_REPOSITORY_FILES: "GET_REPOSITORY_FILES",

	GET_REPOSITORY_CONTRIBUTORS: "GET_REPOSITORY_CONTRIBUTORS",
	SET_CONTRIBUTOR: "SET_CONTRIBUTOR",
	ADD_REPOSITORY_CONTRIBUTOR: "ADD_REPOSITORY_CONTRIBUTOR",
	REMOVE_REPOSITORY_CONTRIBUTOR: "REMOVE_REPOSITORY_CONTRIBUTOR",

	GET_REPOSITORY_VERSIONS: "GET_REPOSITORY_VERSIONS",
	SET_VERSION: "SET_VERSION",
	DOWNLOAD_VERSION: "DOWNLOAD_VERSION",
	ADD_REPOSITORY_VERSION: "ADD_REPOSITORY_VERSION",
	REMOVE_REPOSITORY_VERSION: "REMOVE_REPOSITORY_VERSION",
	CLONE_REPOSITORY_VERSION: "CLONE_REPOSITORY_VERSION",

	GET_PROFILE: "GET_PROFILE",
	UPDATE_USER: "UPDATE_USER",
	UPDATE_PASSWORD: "UPDATE_PASSWORD",
	FORGOT_PASSWORD: "FORGOT_PASSWORD",
	RESET_PASSWORD: "RESET_PASSWORD",
	INIT_FORGOT_PASSWORD: "INIT_FORGOT_PASSWORD",

	SET_QUERY: "SET_QUERY",
	SEARCH: "SEARCH",

	MESSAGE: "MESSAGE",
	MESSAGE_STATUS: "MESSAGE_STATUS",
	MESSAGE_SYNCED: "MESSAGE_SYNCED",
	MESSAGE_RECEIVED: "MESSAGE_RECEIVED",

	EXPLORE: "EXPLORE",

	GITHUB: "GITHUB",
	GOOGLE: "GOOGLE",
	USERNAME: "USERNAME",

	ABOUT: "ABOUT",
	CONTACT_US: "CONTACT_US",
	INIT_CONTACT_US: "INIT_CONTACT_US",
	TOOLS: "TOOLS",
	TERMS: "TERMS",
	PRIVACY: "PRIVACY",

	MARK_TOUR_DASHBOARD: "MARK_TOUR_DASHBOARD",
	MARK_TOUR_REPOSITORY: "MARK_TOUR_REPOSITORY",
	MARK_TOUR_WORKSPACE: "MARK_TOUR_WORKSPACE",

	ADMIN_STATS: "ADMIN_STATS",

	LOGIN: "LOGIN",
	LOGOUT: "LOGOUT",
	SIGNUP: "SIGNUP",
	COMPLETE_SIGNUP: "COMPLETE_SIGNUP",

	CLOSE_EDITOR_TAB: "CLOSE_EDITOR_TAB",
	SELECT_EDITOR_TAB: "SELECT_EDITOR_TAB",
	LOAD_FILE: "LOAD_FILE",
	OPEN_EDITOR_TAB: "OPEN_EDITOR_TAB",
	UPDATE_EDITOR_TAB: "UPDATE_EDITOR_TAB",
	SAVE_EDITOR_TAB: "SAVE_EDITOR_TAB",
	GET_STDCELLS: "GET_STDCELLS",
	GET_BOARDS: "GET_BOARDS",
	PARSE_VERILOG_MODULES: "PARSE_VERILOG_MODULES",

	UPDATE_FILES: "UPDATE_FILES",

	CREATE_FILE: "CREATE_FILE",
	COPY_FILES: "COPY_FILES",
	MOVE_FILES: "MOVE_FILES",
	RENAME_FILE: "RENAME_FILE",
	DELETE_FILES: "DELETE_FILES",
	DUPLICATE_FILES: "DUPLICATE_FILES",
	SET_TOP_MODULE: "SET_TOP_MODULE",
	DOWNLOAD_FILE: "DOWNLOAD_FILE",
	CONVERT_INTO_TESTBENCH: "CONVERT_INTO_TESTBENCH",
	CONVERT_INTO_VERILOG_MODULE: "CONVERT_INTO_VERILOG_MODULE",
	INCLUDE_EXCLUDE_IN_BUILD: "INCLUDE_EXCLUDE_IN_BUILD",
	SYNTHESIZE: "SYNTHESIZE",
	SIMULATE: "SIMULATE",
	VALIDATE: "VALIDATE",
	GENERATE_BITSTREAM: "GENERATE_BITSTREAM",
	COMPILE_SOFTWARE: "COMPILE_SOFTWARE",
	GET_WORKSPACE_SETTINGS: "GET_WORKSPACE_SETTINGS",
	UPDATE_WORKSPACE_SETTINGS: "UPDATE_WORKSPACE_SETTINGS",

	WORKSPACE_SET_LOGS: "WORKSPACE_SET_LOGS",
	WORKSPACE_ADD_LOGS: "WORKSPACE_ADD_LOGS",
	WORKSPACE_SET_LOG_TAB: "WORKSPACE_SET_LOG_TAB"
};

const Port = process.env.REACT_APP_PORT || 3000;
const Host = process.env.REACT_APP_HOST || "localhost";
const DefaultURL = `${process.env.REACT_APP_PROTOCOL ||
	"http"}://${Host}:${Port}`;
const AvatarURL = `${DefaultURL}/avatar`;
const DashboardURL = `/dashboard`;
const AdminURL = `/admin`;
const DashboardWatchingURL = `${DashboardURL}/watching`;
const DashboardSharedURL = `${DashboardURL}/shared`;
const RepositoriesURL = "repositories";
const SharedURL = "shared";
const WatchingURL = "watching";
const LoginURL = "/login";
const LogoutURL = "/logout";
const SignupURL = "/signup";
const AuthURL = "/auth";
const ForgotURL = `${AuthURL}/forgot`;
const ResetURL = `${AuthURL}/reset`;
const NewRepoURL = `${DashboardURL}/new`;
const FilesURL = "files";
const CloneURL = "clone";
const ContributorsURL = "contributors";
const AuthorizeURL = "authorize";
const DeauthorizeURL = "deauthorize";
const VersionsURL = "versions";
const FavoriteURL = "favorite";
const WatchURL = "watch";
const UpdateURL = "update";
const RemoveURL = "delete";
const NewVersionURL = `${VersionsURL}/new`;
const DeleteVersionURL = `${VersionsURL}/delete`;
const CloneVersionURL = `${VersionsURL}/clone`;
const FeatureURL = "feature";
const CertifyURL = "certify";
const EditURL = "edit";
const EditPasswordURL = `${EditURL}/password`;
const SearchURL = "search";
const ExploreURL = "explore";
const AboutURL = "about";
const ContactURL = "contact";
const ToolsURL = "tools";
const TermsURL = "terms";
const PrivacyURL = "privacy";
const GitHubAuthURL = process.env.REACT_APP_GITHUB_CLIENT_ID ?
	`https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`:
	process.env.REACT_APP_GITHUB_CLIENT_ID
	;
const GitHubCallbackURL = "auth/github/callback";
const GoogleCallbackURL = "auth/google/callback";
const CompleteSignupURL = "auth/complete";
const CommunicationURL = `${DefaultURL}/port`;
const WorkspaceURL = `ws`;
const WorkspaceSettingsURL = `${WorkspaceURL}/settings`;
const WorkspaceSafariURL = `ws-safari`;
const GetFileURL = `get`;
const AjaxURL = `ajax`;
const StdcellURL = `stdcell`;
const BoardsURL = `boards`;
const CompileURL = `compile`;
const DownloadURL = `download`;
const TryURL = `try`;

export const URLs = {
	Port,
	Host,
	Default: DefaultURL,
	Dashboard: DashboardURL,
	Admin: AdminURL,
	DashboardShared: DashboardSharedURL,
	DashboardWatching: DashboardWatchingURL,
	Repositories: RepositoriesURL,
	Shared: SharedURL,
	Watching: WatchingURL,
	Login: LoginURL,
	Logout: LogoutURL,
	Signup: SignupURL,
	NewRepo: NewRepoURL,
	Files: FilesURL,
	Contributors: ContributorsURL,
	Versions: VersionsURL,
	Authorize: AuthorizeURL,
	Deauthorize: DeauthorizeURL,
	NewVersion: NewVersionURL,
	DeleteVersion: DeleteVersionURL,
	Clone: CloneURL,
	CloneVersion: CloneVersionURL,
	Favorite: FavoriteURL,
	Watch: WatchURL,
	Update: UpdateURL,
	Remove: RemoveURL,
	Feature: FeatureURL,
	Certify: CertifyURL,
	Avatar: AvatarURL,
	Edit: EditURL,
	EditPassword: EditPasswordURL,
	Forgot: ForgotURL,
	Reset: ResetURL,
	Auth: AuthURL,
	Search: SearchURL,
	Explore: ExploreURL,
	About: AboutURL,
	Contact: ContactURL,
	Tools: ToolsURL,
	Terms: TermsURL,
	Privacy: PrivacyURL,
	GitHubAuth: GitHubAuthURL,
	GitHubCallback: GitHubCallbackURL,
	GoogleCallback: GoogleCallbackURL,
	CompleteSignup: CompleteSignupURL,
	Communication: CommunicationURL,
	Workspace: WorkspaceURL,
	WorkspaceSettings: WorkspaceSettingsURL,
	WorkspaceSafari: WorkspaceSafariURL,
	GetFile: GetFileURL,
	Ajax: AjaxURL,
	Stdcell: StdcellURL,
	Boards: BoardsURL,
	Compile: CompileURL,
	Download: DownloadURL,
	Try: TryURL
};
export const StorageKeys = {
	User: "USER",
	TrialUser: "TRIAL_USER",
	TrialRepository: "TRIAL_REPO"
};

export const Pagination = {
	ReposPerPage: 9,
	UsersPerPage: 12
};

export const emailRegex = () =>
	// eslint-disable-next-line
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const usernameRegex = () => /^\w+$/gm;
export const passwordRegex = () => ({
	test: password =>
		password.length >= 8 && /\w/.test(password) && /\d/.test(password)
});

export const urlB64ToUint8Array = base64String => {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding)
		// eslint-disable-next-line
		.replace(/\-/g, "+")
		.replace(/_/g, "/");

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
};

export const removeExtension = (name, extension) => {
	if (name.substr(-1 * extension.length) === extension) {
		name = name.substr(0, name.length - extension.length);
	}
	return name;
};
export const adjustExtension = (name, extension) => {
	return `${removeExtension(name, extension)}${extension}`;
};
