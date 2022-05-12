export default {
    run: false,
    steps: [
        {
            target: ".rc-tabs",
            content: "Here you can manage your repositories!",
            placement: "center",
            disableBeacon: true,
            showProgress: true,
        },
        {
            target: ".rc-tabs-tab:first-child",
            content: "This tab contains repositories you own.",
            placement: "bottom",
            disableBeacon: true,
        },
        {
            target: ".rc-tabs-tab:nth-child(2)",
            content: "This tab contains repositories that are shared with you.",
            placement: "bottom",
            disableBeacon: true,
        },
        {
            target: ".rc-tabs-tab:last-child",
            content: "This tab contains repositories that you are watching.",
            placement: "bottom",
            disableBeacon: true,
        },
        {
            target: ".fixed-button",
            content: "Click here to create a new repository!",
            placement: "bottom",
            disableBeacon: true,
            spotlightClicks: true,
        },
    ],
    writerSteps: [
        {
            target: ".repository-details-action-btn:first-child",
            content:
                "This button will direct you to the workspace to start working!",
            placement: "bottom",
            disableBeacon: true,
        },
    ],
};
