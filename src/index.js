import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";

import "@coreui/icons/css/coreui-icons.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "react-sortable-tree/style.css";
import "rc-menu/assets/index.css";
import "react-toastify/dist/ReactToastify.css";
import "flag-icon-css/css/flag-icon.min.css";
import "simple-line-icons/css/simple-line-icons.css";
import "rc-tree-select/assets/index.css";
import "normalize.css";

import "./scss/style.scss";

import App from "./App";

import store from "./store";
import { Provider } from "react-redux";

// I hate React. I hate with with a goat. I hate it on a boat. I h
const warn = console.warn;
console.warn = function (...warnings) {
    let finalWarnings = warnings.filter((w) => !w.includes("UNSAFE_"));
    if (finalWarnings.length === warnings.length) {
        warn(...finalWarnings);
    }
};

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// registerServiceWorker();
