import _ from "lodash";
export const folderTypes = [
    "root",
    "folder",
    "exfolder",
    "buildFolder",
    "swFolder",
    "swHexFolder",
];
export const fileTypes = {
    "#": {
        icon: "folder",
        readable: false,
        readonly: false,
        removable: false,
        editor: null,
        folder: true,
        allowedChildren: [],
        extension: "",
    },
    "root": {
        icon: "folder",
        readable: false,
        readonly: false,
        removable: false,
        editor: null,
        folder: true,
        allowedChildren: [],
        extension: "",
    },
    "folder": {
        icon: "folder",
        readable: false,
        readonly: false,
        removable: true,
        editor: null,
        folder: true,
        editable: false,
        extension: "",
    },
    "buildFolder": {
        icon: "folder",
        readable: false,
        readonly: true,
        removable: false,
        editor: null,
        folder: true,
        allowedChildren: [],
        extension: "",
    },
    "swFolder": {
        icon: "folder",
        readable: false,
        readonly: false,
        removable: false,
        editor: null,
        folder: true,
        allowedChildren: [],
        extension: "",
    },
    "swHexFolder": {
        icon: "folder",
        readable: false,
        readonly: true,
        removable: false,
        editor: null,
        folder: true,
        allowedChildren: [],
        extension: "",
    },
    "exfolder": {
        icon: "verilog-excluded",
        readable: false,
        readonly: false,
        removable: true,
        editor: null,
        folder: true,
        allowedChildren: [],
        extension: "",
    },
    "verilog": {
        icon: "verilog",
        readable: true,
        readonly: false,
        removable: true,
        editor: "ace",
        folder: false,
        allowedChildren: ["module", "topmodule"],
        extension: ".v",
    },
    "exverilog": {
        icon: "verilog-excluded",
        readable: true,
        readonly: false,
        removable: true,
        editor: "ace",
        folder: true,
        allowedChildren: ["module", "topmodule"],
        extension: ".v",
    },
    "ip": {
        icon: "ip",
        readable: true,
        readonly: true,
        removable: true,
        editor: "ace",
        folder: false,
        allowedChildren: [],
        extension: ".ip",
    },
    "exip": {
        icon: "ip-excluded",
        readable: true,
        readonly: true,
        removable: true,
        editor: "ace",
        folder: false,
        allowedChildren: [],
        extension: ".ip",
    },
    "testbench": {
        icon: "testbench",
        readable: true,
        readonly: false,
        removable: true,
        editor: "ace",
        folder: false,
        allowedChildren: ["module", "topmodule"],
        extension: ".v",
    },
    "netlist": {
        icon: "netlist",
        readable: true,
        readonly: true,
        removable: true,
        editor: "ace",
        folder: false,
        allowedChildren: [],
        extension: ".v",
    },
    "p_netlist": {
        icon: "preparing",
        readable: false,
        readonly: false,
        removable: true,
        editor: null,
        folder: false,
        allowedChildren: [],
        extension: ".v",
    },
    "f_netlist": {
        icon: "verilog-excluded",
        readable: false,
        readonly: false,
        removable: true,
        editor: null,
        folder: false,
        allowedChildren: [],
        extension: ".v",
    },
    "srpt": {
        icon: "text",
        readable: true,
        readonly: true,
        removable: true,
        editor: "ace",
        folder: false,
        allowedChildren: [],
        extension: ".srpt",
    },
    "p_srpt": {
        icon: "preparing",
        readable: false,
        readonly: false,
        removable: true,
        editor: null,
        folder: false,
        allowedChildren: [],
        extension: ".txt",
    },
    "f_srpt": {
        icon: "verilog-excluded",
        readable: false,
        readonly: false,
        removable: true,
        editor: null,
        folder: false,
        allowedChildren: [],
        extension: ".txt",
    },
    "text": {
        icon: "text",
        readable: true,
        readonly: false,
        removable: true,
        editor: "ace",
        folder: false,
        allowedChildren: [],
        extension: ".txt",
    },
    "vcd": {
        icon: "vcd",
        readable: true,
        readonly: false,
        removable: true,
        editor: "waveform",
        folder: false,
        allowedChildren: [],
        extension: ".vcd",
    },
    "fsm": {
        icon: "fsm",
        readable: true,
        readonly: false,
        removable: true,
        editor: "fsm",
        folder: false,
        allowedChildren: [],
        extension: ".fsm",
    },
    "soc": {
        icon: "soc",
        readable: true,
        readonly: false,
        removable: true,
        editor: "soc",
        folder: false,
        allowedChildren: [],
        extension: ".soc",
    },
    "c": {
        icon: "c",
        readable: true,
        readonly: false,
        removable: true,
        editor: "ace",
        folder: false,
        allowedChildren: [],
        extension: ".c",
    },
    "h": {
        icon: "h",
        readable: true,
        readonly: false,
        removable: true,
        editor: "ace",
        folder: false,
        allowedChildren: [],
        extension: ".h",
    },
    "exC": {
        icon: "c-excluded",
        readable: true,
        readonly: false,
        removable: true,
        editor: "ace",
        folder: false,
        allowedChildren: [],
        extension: ".c",
    },
    "exH": {
        icon: "h-excluded",
        readable: true,
        readonly: false,
        removable: true,
        editor: "ace",
        folder: false,
        allowedChildren: [],
        extension: ".h",
    },
    "linker": {
        icon: "linker",
        readable: true,
        readonly: false,
        removable: true,
        editor: "ace",
        folder: false,
        allowedChildren: [],
        extension: ".ld",
    },
    "startup": {
        icon: "startup",
        readable: true,
        readonly: false,
        removable: true,
        editor: "ace",
        folder: false,
        allowedChildren: [],
        extension: ".s",
    },
    "obj": {
        icon: "blank",
        readable: false,
        readonly: false,
        removable: true,
        editor: null,
        folder: false,
        allowedChildren: [],
        extension: ".obj",
    },
    "hex": {
        icon: "blank",
        readable: true,
        readonly: true,
        removable: true,
        editor: "ace",
        folder: false,
        allowedChildren: [],
        extension: ".hex",
    },
    "system": {
        icon: "blank",
        readable: true,
        readonly: false,
        removable: true,
        editor: "system",
        folder: false,
        allowedChildren: [],
        extension: ".sys",
    },
    "sta": {
        icon: "blank",
        readable: true,
        readonly: true,
        removable: true,
        editor: "sta",
        folder: false,
        allowedChildren: [],
        extension: ".sta",
    },
    "bin": {
        icon: "binary",
        readable: false,
        readonly: true,
        removable: true,
        editor: "download",
        folder: false,
        allowedChildren: [],
        extension: ".bin",
    },
    "pcf": {
        icon: "pcf",
        readable: true,
        readonly: false,
        removable: true,
        editor: "ace",
        folder: false,
        allowedChildren: [],
        extension: ".pcf",
    },
    "dcf": {
        icon: "dcf",
        readable: true,
        readonly: false,
        removable: true,
        editor: "dcf",
        folder: false,
        allowedChildren: [],
        extension: ".dcf",
    },
    "module": {
        icon: "module",
        readable: false,
        readonly: true,
        removable: false,
        editor: null,
        folder: false,
        allowedChildren: [],
        extension: "",
    },
    "topmodule": {
        icon: "topmodule",
        readable: false,
        readonly: true,
        removable: false,
        editor: null,
        folder: false,
        allowedChildren: [],
        extension: "",
    },
};

export const writeableFolders = ["root", "folder", "exfolder", "swFolder"];

export const readonlyFolders = ["buildFolder", "swHexFolder"];

export const allFolderTypes = writeableFolders.concat(readonlyFolders);

export const generateFilesTree = (files) => {
    const fileMap = {};
    const childrenMap = {};
    let root;
    _.each(files, (file) => {
        fileMap[file.id] = _.clone(file);
        childrenMap[file.id] = [];
        if (file.type === "root") {
            root = _.clone(file);
        }
    });
    _.each(files, (file) => {
        if (file.parent !== "#") {
            childrenMap[file.parent].push(file.id);
        }
    });

    const addNode = (node) => {
        const rootNode = {
            id: node.id,
            key: node.id,
            value: node.id,
            title: node.text,
            type: node.type,
            children: [],
            isLeaf:
                !allFolderTypes.includes(node.type) &&
                !(
                    ["verilog", "exverilog", "testbench"].includes(node.type) &&
                    childrenMap[node.id].length
                ),
        };
        const childrenIds = childrenMap[node.id];
        _.each(childrenIds, (childId) => {
            const file = fileMap[childId];
            const child = addNode(file);
            child.parent = node.id;
            rootNode.children.push(child);
        });
        rootNode.children.sort((first, second) =>
            first.title.localeCompare(second.title)
        );
        if (
            folderTypes
                .concat(["verilog", "exverilog", "testbench"])
                .indexOf(node.type) === -1
        ) {
            delete rootNode.children;
        }
        return rootNode;
    };
    if (root) {
        const rootNode = addNode(root);
        rootNode.expanded = true;
        return [rootNode];
    }
    return [];
};

export const getRelativePath = (file, files) => {
    let filePath = file.title;
    const fileMap = {};
    files.forEach((f) => {
        fileMap[f.id] = f;
    });
    let parent = fileMap[file.parent];
    while (parent) {
        if (parent.type !== "root") {
            filePath = parent.title + "/" + filePath;
        }
        file = parent;
        parent = fileMap[file.parent];
    }
    return filePath;
};
