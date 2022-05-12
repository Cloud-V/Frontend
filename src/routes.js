import React from "react";
import Loadable from "react-loadable";
import SquareSpinner from "./partials/SquareSpinner";

function Loading() {
    return <SquareSpinner />;
}

const Dashboard = Loadable({
    loader: () => import("./views/Dashboard"),
    loading: Loading,
});

const Repository = Loadable({
    loader: () => import("./views/Repository"),
    loading: Loading,
});
const Profile = Loadable({
    loader: () => import("./views/Profile"),
    loading: Loading,
});
const ProfileEdit = Loadable({
    loader: () => import("./views/ProfileEdit"),
    loading: Loading,
});
const ProfileEditPassword = Loadable({
    loader: () => import("./views/ProfileEditPassword"),
    loading: Loading,
});
// eslint-disable-next-line
const Workspace = Loadable({
    loader: () => import("./views/Workspace"),
    loading: Loading,
});
// eslint-disable-next-line
const WorkspaceRedirect = Loadable({
    loader: () => import("./views/WorkspaceRedirect"),
    loading: Loading,
});

const ComingSoon = Loadable({
    loader: () => import("./views/ComingSoon"),
    loading: Loading,
});

const routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        requireLogin: true,
        exact: true,
    },
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        requireLogin: true,
        exact: true,
    },
    {
        path: "/repositories/:ownerName",
        name: "User's Repositories",
        component: Dashboard,
        requireLogin: true,
        exact: true,
    },
    {
        path: "/edit",
        name: "Edit Profile",
        component: ProfileEdit,
        requireLogin: true,
        exact: true,
    },
    {
        path: "/edit/password",
        name: "Change Password",
        component: ProfileEditPassword,
        requireLogin: true,
        exact: true,
    },
    {
        path: "/:ownerName/:repoName/publish",
        name: "Publish Repository",
        component: ComingSoon,
        requireLogin: true,
        exact: true,
    },
    // {
    // 	path: "/:ownerName/:repoName/ws-legacy",
    // 	name: "WorkspaceRedirect",
    // 	component: WorkspaceRedirect,
    // 	requireLogin: true,
    // 	exact: true
    // },
    // {
    // 	path: '/:ownerName/:repoName/ws-ide',
    // 	name: 'Workspace',
    // 	component: Workspace,
    // 	requireLogin: true,
    // 	exact: true
    // },
    {
        path: "/:ownerName/:repoName",
        name: "Repository",
        component: Repository,
        requireLogin: true,
        exact: true,
    },
    {
        path: "/:ownerName",
        name: "Profile",
        component: Profile,
        requireLogin: true,
        exact: true,
    },
];

export default routes;
