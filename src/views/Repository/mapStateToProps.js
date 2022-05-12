export default (state) => {
    return {
        repository: state.get("repository"),
        files: state.get("files"),
        contributors: state.get("contributors"),
        contributor: state.get("contributor"),
        versions: state.get("versions"),
        version: state.get("version"),
        user: state.get("user"),
    };
};
