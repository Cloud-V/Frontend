import React from "react";
import Loadable from "react-loadable";
import SquareSpinner from "./partials/SquareSpinner";

function Loading() {
    return (
        <div className="flex-1 h-100 mt-15 d-flex justify-content-center align-items-center">
            <SquareSpinner />
        </div>
    );
}

export const Login = Loadable({
    loader: () => import("./views/Login"),
    loading: Loading,
});
export const Signup = Loadable({
    loader: () => import("./views/Signup"),
    loading: Loading,
});
export const Logout = Loadable({
    loader: () => import("./views/Logout"),
    loading: Loading,
});
export const Register = Loadable({
    loader: () => import("./views/Register"),
    loading: Loading,
});
export const Page404 = Loadable({
    loader: () => import("./views/Page404"),
    loading: Loading,
});
export const Maintenance = Loadable({
    loader: () => import("./views/Maintenance"),
    loading: Loading,
});
export const Page500 = Loadable({
    loader: () => import("./views/Page500"),
    loading: Loading,
});
export const ComingSoon = Loadable({
    loader: () => import("./views/ComingSoon"),
    loading: Loading,
});
export const ForgotPassword = Loadable({
    loader: () => import("./views/ForgotPassword"),
    loading: Loading,
});
export const ResetPassword = Loadable({
    loader: () => import("./views/ResetPassword"),
    loading: Loading,
});
export const Search = Loadable({
    loader: () => import("./views/Search"),
    loading: Loading,
});
export const Explore = Loadable({
    loader: () => import("./views/Explore"),
    loading: Loading,
});
export const GitHub = Loadable({
    loader: () => import("./views/GitHub"),
    loading: Loading,
});
export const Google = Loadable({
    loader: () => import("./views/Google"),
    loading: Loading,
});
export const CompleteSignup = Loadable({
    loader: () => import("./views/CompleteSignup"),
    loading: Loading,
});
export const ContactUs = Loadable({
    loader: () => import("./views/ContactUs"),
    loading: Loading,
});
export const Tools = Loadable({
    loader: () => import("./views/Tools"),
    loading: Loading,
});
export const About = Loadable({
    loader: () => import("./views/About"),
    loading: Loading,
});
export const Privacy = Loadable({
    loader: () => import("./views/Privacy"),
    loading: Loading,
});
export const Terms = Loadable({
    loader: () => import("./views/Terms"),
    loading: Loading,
});
export const Try = Loadable({
    loader: () => import("./views/Try"),
    loading: Loading,
});
export const Workspace = Loadable({
    loader: () => import("./views/Workspace"),
    loading: Loading,
});
export const AdminStats = Loadable({
    loader: () => import("./views/AdminStats"),
    loading: Loading,
});
