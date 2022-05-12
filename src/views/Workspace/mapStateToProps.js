export default (state) => {
    return {
        repository: state.get("repository"),
        files: state.get("files"),
        library: state.get("library"),
        user: state.get("user"),
    };
};
