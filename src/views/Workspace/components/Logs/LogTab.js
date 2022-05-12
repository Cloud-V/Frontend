import React, { Component } from "react";

import { Table } from "reactstrap";
import { connect } from "react-redux";

import { ContextMenuTrigger } from "react-contextmenu";

import _ from "lodash";

const mapStateToProps = (state) => {
    return {
        files: state.get("files"),
    };
};

class LogTab extends Component {
    constructor(props) {
        super(props);
        this.onLogDoubleClick = this.onLogDoubleClick.bind(this);
    }
    async onLogDoubleClick(log, e) {
        if (!log) {
            return;
        }
        if (!log.file || !log.file.length) {
            return;
        }
        const file = this.props.files
            .get("data")
            .find((el) => el.get("id") === log.file);
        if (!file) {
            return;
        }
        const success = await this.props.onOpenFile(file.toJS());
        if (!success) {
            return;
        }
        this.props.gotoLine(log);
    }
    render() {
        return (
            <div className="w-100 h-100">
                <Table borderless hover>
                    <tbody>
                        {_.map(this.props.logs || [], (log, index) => (
                            <ContextMenuTrigger
                                id={this.props.contextKey}
                                collect={(props) => ({
                                    tab: index,
                                    name: this.props.name,
                                    message: log.message,
                                })}
                                renderTag="tr"
                                key={index}
                            >
                                <td
                                    className="log-entry-column"
                                    onDoubleClick={(e) =>
                                        this.onLogDoubleClick(log, e)
                                    }
                                >
                                    {log.message}
                                </td>
                            </ContextMenuTrigger>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default connect(mapStateToProps)(LogTab);
