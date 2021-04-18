export default state => {
	return {
		repository: state.get("repository"),
		files: state.get("files"),
		user: state.get("user")
	};
};
