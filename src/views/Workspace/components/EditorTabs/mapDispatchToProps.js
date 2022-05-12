import {
    updateEditorTab,
    saveEditorTab,
    selectEditorTab,
} from "store/actions/files";

export default (dispatch) => {
    return {
        saveEditorTab: ({ ownerName, repoName, node, content }) =>
            dispatch(
                saveEditorTab({
                    ownerName,
                    repoName,
                    node,
                    content,
                })
            ),
        updateEditorTab: ({ node, updates }) =>
            dispatch(
                updateEditorTab({
                    node,
                    updates,
                })
            ),
        selectEditorTab: ({ node }) =>
            dispatch(
                selectEditorTab({
                    node,
                })
            ),
    };
};
