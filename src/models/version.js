import ImmutableModel from "./immutableModel";
import User from "./user";

const Version = ImmutableModel.createClass("Version", {
    schema: {
        _id: "",
        privacy: 1,
        repoPrivacy: 0,
        description: "",
        deleted: false,
        updatedAt: new Date(),
        createdAt: new Date(),
        created: new Date(),
        repoName: "",
        repoTitle: "",
        repoOwner: "",
        repo: "",
        number: "",
        title: "",
        user: new User(),
    },
});

export default Version;
