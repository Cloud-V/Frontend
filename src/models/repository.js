import ImmutableModel from "./immutableModel";
import { Map } from "immutable";

const Repository = ImmutableModel.createClass("Repository", {
    schema: {
        settings: Map({
            theme: 0,
            fontSize: 15,
        }),
        description: "",
        primary: true,
        featured: false,
        certified: false,
        favorites: 0,
        watches: 0,
        favorited: false,
        watched: false,
        isTrial: false,
        ownerName: "",
        topModule: "",
        privacy: 0,
        accessLevel: 0,
        allowReviews: 0,
        external: false,
        deleted: false,
        _id: "",
        updatedAt: new Date(),
        createdAt: new Date(),
        owner: "",
        repoName: "",
        repoTitle: "",
        created: new Date(),
        __v: 0,
        buildDir: "",
        ipCoresDir: "",
        swDir: "",
        swHexDir: "",
        topModuleEntry: "",
    },
});

export default Repository;
