export default {
    run: false,
    steps: [
        {
            target: ".rc-tabs",
            content: "Here is your respository view",
            placement: "center",
            disableBeacon: true,
            showProgress: true,
        },
        {
            target: ".rc-tabs-tab:first-child",
            content:
                "This tab contains an overview of your repository, stats, and actions.",
            placement: "bottom",
            disableBeacon: true,
        },
        {
            target: ".rc-tabs-tab:nth-child(2)",
            content: "This tab contains a preview of the repository file tree",
            placement: "bottom",
            disableBeacon: true,
        },
        {
            target: ".rc-tabs-tab:nth-child(3)",
            content:
                "This tab is to grant/revoke permissions on the repository to other users",
            placement: "bottom",
            disableBeacon: true,
        },
        {
            target: ".rc-tabs-tab:last-child",
            content:
                "This tab is to capture and manage repository versions (snapshots).",
            placement: "bottom",
            disableBeacon: true,
        },
    ],
};
