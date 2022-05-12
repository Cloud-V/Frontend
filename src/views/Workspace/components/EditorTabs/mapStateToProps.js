export default (state) => {
    return {
        repository: state.get("repository"),
        user: state.get("user"),
        workspace: state.get("workspace"),
        files: state.get("files"),
    };
};
