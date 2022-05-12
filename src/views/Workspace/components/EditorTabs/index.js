import React, { Component } from "react";

import { Button } from "reactstrap";
import { connect } from "react-redux";
import Tabs, { TabPane } from "rc-tabs";
import mapDispatchToProps from "./mapDispatchToProps";
import mapStateToProps from "./mapStateToProps";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";

import CodeEditor from "./Editors/CodeEditor";
import WaveformViewer from "./Editors/WaveformViewer/WaveformViewer";
import DCFEditor from "./Editors/DCFEditor/DCFEditor";
import PCFEditor from "./Editors/PCFEditor/PCFEditor";
import { fileTypes } from "views/Workspace/components/FileTree/utils";

function getNewTabButton(clickHandler) {
    return (
        <Button
            className="workspace-tabbar-btn w-100 h-100"
            onClick={clickHandler}
        >
            <i className="fa fa-plus" />
        </Button>
    );
}
class EditorTabs extends Component {
    constructor(props) {
        super(props);
        this.editorRefs = {};
        this.refreshEditors = this.refreshEditors.bind(this);
        this.getTitleNode = this.getTitleNode.bind(this);
    }
    refreshEditors() {
        const activeTab =
            (this.props.files.get("data").find((el) => el.active) || {}).id ||
            "";
        const ref = this.editorRefs[activeTab];

        if (ref) {
            const { editorRef } = ref;
            if (editorRef && editorRef.current) {
                const { editor } = editorRef.current;
                if (editor && editor.resize) {
                    editor.resize();
                }
            }
            if (ref.refresh) {
                ref.refresh();
            }
        }
    }

    getTitleNode(tab) {
        const nodeType = tab.type;
        const iconClassName =
            tab.status === "loading"
                ? "loading"
                : (
                      fileTypes[nodeType] || {
                          icon: "blank",
                      }
                  ).icon || "blank";

        return (
            <div className="tab-title-wrapper">
                <span className={`tab-icon ml-2 file-icon ${iconClassName}`} />
                <span>{tab.title + (tab.dirty ? " *" : "")}</span>
                <Button
                    className="workspace-tab-close-btn ml-auto"
                    onClick={(e) => this.props.closeFile(tab, e)}
                >
                    <i className="fa fa-times" />
                </Button>
            </div>
        );
    }
    render() {
        const immTabs = this.props.files.get("data").filter((el) => !el.closed);
        const tabs = immTabs.toJS();
        const activeTab =
            (this.props.files.get("data").find((el) => el.active) || {}).id ||
            "";
        return (
            <div className="workspace-tabs editors-tabs">
                <Tabs
                    prefixCls="workspace-tabs"
                    defaultActiveKey={activeTab}
                    activeKey={activeTab}
                    onChange={(key) => {
                        this.props
                            .selectEditorTab({
                                node: immTabs
                                    .find(({ id }) => id === key)
                                    .toJS(),
                            })
                            .then((action) => this.refreshEditors());
                        if (this.props.onTabChange) {
                            this.props.onTabChange({ id: key });
                        }
                    }}
                    renderTabBar={() => <ScrollableInkTabBar />}
                    renderTabContent={() => <TabContent animated={false} />}
                >
                    {tabs.map((tab) => {
                        const fileTypeData = fileTypes[tab.type] || {};
                        const editorType = fileTypeData.editor || "";
                        return (
                            <TabPane tab={this.getTitleNode(tab)} key={tab.id}>
                                {editorType === "ace" ? (
                                    <CodeEditor
                                        editorId={`editor-${tab.id}`}
                                        onChange={(content) => {
                                            this.props.updateEditorTab({
                                                node: tab,
                                                updates: {
                                                    dirty: true,
                                                    content,
                                                },
                                            });
                                        }}
                                        onSaveEditorTab={(content) =>
                                            this.props.onSave(tab)
                                        }
                                        tab={tab}
                                        onEditorFocus={(e) => {
                                            if (this.props.onEditorFocus)
                                                this.props.onEditorFocus(
                                                    tab,
                                                    e
                                                );
                                            if (this.props.onTabChange) {
                                                this.props.onTabChange({
                                                    id: tab.id,
                                                });
                                            }
                                        }}
                                        onEditorBlur={(e) =>
                                            this.props.onEditorBlur
                                                ? this.props.onEditorBlur(
                                                      tab,
                                                      e
                                                  )
                                                : null
                                        }
                                        typeData={fileTypeData}
                                        ref={(el) =>
                                            (this.editorRefs[tab.id] = el)
                                        }
                                        content={tab.content}
                                        readonly={tab.readonly || false}
                                        mode={tab.type}
                                        repository={this.props.repository}
                                    />
                                ) : editorType === "waveform" ? (
                                    <WaveformViewer
                                        ref={(el) =>
                                            (this.editorRefs[tab.id] = el)
                                        }
                                        editorId={`editor-${tab.id}`}
                                        onChange={(content, dirty) => {
                                            this.props.updateEditorTab({
                                                node: tab,
                                                updates: {
                                                    dirty,
                                                    content,
                                                },
                                            });
                                        }}
                                        onSaveEditorTab={(content) =>
                                            this.props.onSave(tab)
                                        }
                                        tab={tab}
                                        theme={this.props.theme}
                                        onEditorFocus={(e) => {
                                            if (this.props.onEditorFocus)
                                                this.props.onEditorFocus(
                                                    tab,
                                                    e
                                                );
                                            if (this.props.onTabChange) {
                                                this.props.onTabChange({
                                                    id: tab.id,
                                                });
                                            }
                                        }}
                                        onEditorBlur={(e) =>
                                            this.props.onEditorBlur
                                                ? this.props.onEditorBlur(
                                                      tab,
                                                      e
                                                  )
                                                : null
                                        }
                                        typeData={fileTypeData}
                                        content={tab.content}
                                        readonly={tab.readonly || false}
                                    />
                                ) : editorType === "dcf" ? (
                                    <DCFEditor
                                        ref={(el) =>
                                            (this.editorRefs[tab.id] = el)
                                        }
                                        editorId={`editor-${tab.id}`}
                                        onChange={(content, dirty) => {
                                            this.props.updateEditorTab({
                                                node: tab,
                                                updates: {
                                                    dirty,
                                                    content,
                                                },
                                            });
                                        }}
                                        onSaveEditorTab={(content) =>
                                            this.props.onSave(tab)
                                        }
                                        tab={tab}
                                        theme={this.props.theme}
                                        onEditorFocus={(e) => {
                                            if (this.props.onEditorFocus)
                                                this.props.onEditorFocus(
                                                    tab,
                                                    e
                                                );
                                            if (this.props.onTabChange) {
                                                this.props.onTabChange({
                                                    id: tab.id,
                                                });
                                            }
                                        }}
                                        onEditorBlur={(e) =>
                                            this.props.onEditorBlur
                                                ? this.props.onEditorBlur(
                                                      tab,
                                                      e
                                                  )
                                                : null
                                        }
                                        typeData={fileTypeData}
                                        content={tab.content}
                                        readonly={tab.readonly || false}
                                    />
                                ) : editorType === "pcf" ? (
                                    <PCFEditor
                                        ref={(el) =>
                                            (this.editorRefs[tab.id] = el)
                                        }
                                        editorId={`editor-${tab.id}`}
                                        onChange={(content, dirty) => {
                                            this.props.updateEditorTab({
                                                node: tab,
                                                updates: {
                                                    dirty,
                                                    content,
                                                },
                                            });
                                        }}
                                        onSaveEditorTab={(content) =>
                                            this.props.onSave(tab)
                                        }
                                        tab={tab}
                                        theme={this.props.theme}
                                        onEditorFocus={(e) => {
                                            if (this.props.onEditorFocus)
                                                this.props.onEditorFocus(
                                                    tab,
                                                    e
                                                );
                                            if (this.props.onTabChange) {
                                                this.props.onTabChange({
                                                    id: tab.id,
                                                });
                                            }
                                        }}
                                        onEditorBlur={(e) =>
                                            this.props.onEditorBlur
                                                ? this.props.onEditorBlur(
                                                      tab,
                                                      e
                                                  )
                                                : null
                                        }
                                        typeData={fileTypeData}
                                        content={tab.content}
                                        readonly={tab.readonly || false}
                                    />
                                ) : null}
                            </TabPane>
                        );
                    })}
                    <TabPane
                        tab={getNewTabButton(this.props.onNewFile)}
                        key="new"
                        disabled
                    />
                </Tabs>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
    withRef: true,
})(EditorTabs);
