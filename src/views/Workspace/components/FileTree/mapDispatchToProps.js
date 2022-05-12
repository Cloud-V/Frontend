import {
    getRepositoryFiles,
    closeEditorTab,
    selectEditorTab,
    openEditorTab,
    parseVerilogModules,
    updateFiles,
} from "store/actions/files";

export default (dispatch) => {
    return {
        getRepositoryFiles: ({ ownerName, repoName }) =>
            dispatch(
                getRepositoryFiles({
                    ownerName,
                    repoName,
                    filter: "",
                })
            ),
        selectEditorTab: ({ node }) =>
            dispatch(
                selectEditorTab({
                    node,
                })
            ),
        closeEditorTab: ({ node }) =>
            dispatch(
                closeEditorTab({
                    node,
                })
            ),
        parseVerilogModules: ({ node, topModule, topModuleEntry }) =>
            dispatch(
                parseVerilogModules({
                    node,
                    topModule,
                    topModuleEntry,
                })
            ),
        updateFiles: ({ nodes, upsert }) =>
            dispatch(updateFiles({ nodes, upsert })),
        openEditorTab: ({ ownerName, repoName, node }) =>
            dispatch(
                openEditorTab({
                    ownerName,
                    repoName,
                    node,
                })
            ),
    };
};
