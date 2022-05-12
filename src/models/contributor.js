import ImmutableModel from "./immutableModel";
import User from "./user";

const Contributor = ImmutableModel.createClass("Contributor", {
    schema: {
        _id: "",
        accessLevel: "0",
        createdAt: new Date(),
        updatedAt: new Date(),
        user: new User(),
        role: "NoAccess",
    },
});

export default Contributor;
