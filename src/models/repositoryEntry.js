import ImmutableModel from "./immutableModel";

const RepositoryEntry = ImmutableModel.createClass("RepositoryEntry", {
    schema: {
        id: "",
        parent: "",
        text: "",
        title: "",
        type: "",
        closed: true,
        status: "",
        content: "",
        active: false,
        dirty: false,
        updatedAt: new Date(),
        createdAt: new Date(),
    },
});

export default RepositoryEntry;
