export default (state) => {
    return {
        repository: state.get("repository"),
        user: state.get("user"),
    };
};
