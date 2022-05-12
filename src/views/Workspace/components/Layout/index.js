import React, { Component } from "react";

import { connect } from "react-redux";
import mapDispatchToProps from "./mapDispatchToProps";
import mapStateToProps from "./mapStateToProps";

import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DEFAULT_HEIGHT = 1;

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowHeight: DEFAULT_HEIGHT,
        };
        this.refreshRowHeight = this.refreshRowHeight.bind(this);
    }
    componentDidMount() {
        // (function () {
        // 	var throttle = function (type, name, obj) {
        // 		obj = obj || window;
        // 		var running = false;
        // 		var func = function () {
        // 			if (running) {
        // 				return;
        // 			}
        // 			running = true;
        // 			requestAnimationFrame(function () {
        // 				obj.dispatchEvent(new CustomEvent(name));
        // 				running = false;
        // 			});
        // 		};
        // 		obj.addEventListener(type, func);
        // 	};
        // 	throttle("resize", "optimizedResize");
        // })();
        //
        // window.addEventListener("optimizedResize", e => {
        // 	this.refreshRowHeight();
        // });
        // this.refreshRowHeight();
    }
    refreshRowHeight() {}
    render() {
        const panesHeight = window.innerHeight - 50 * this.state.rowHeight;
        const fullHeight = panesHeight / this.state.rowHeight;
        const halfHeight = fullHeight / 2;
        const layouts = {
            lg: [
                {
                    i: "menu",
                    x: 0,
                    y: 0,
                    w: 12,
                    h: 49,
                    static: true,
                },
                {
                    i: "file-tree",
                    x: 0,
                    y: 1,
                    w: 2,
                    h: fullHeight,
                    maxH: fullHeight,
                    minH: fullHeight,
                    isDraggable: false,
                },
                {
                    i: "editors",
                    x: 6,
                    y: 1,
                    w: 10,
                    h: halfHeight,
                    maxH: fullHeight,
                },
                {
                    i: "logs",
                    x: 6,
                    y: halfHeight,
                    w: 10,
                    h: halfHeight,
                    maxH: fullHeight,
                },
            ],
        };
        const breakpoints = {
            lg: 1200,
            md: 996,
            sm: 768,
            xxs: 0,
        };
        const cols = {
            lg: 12,
            md: 12,
            sm: 12,
            xxs: 12,
        };
        layouts.md = layouts.sm = layouts.xxs = layouts.lg;
        return (
            <ResponsiveGridLayout
                autoSize={false}
                className="layout"
                layouts={layouts}
                breakpoints={breakpoints}
                compactType={"vertical"}
                margin={[0, 0]}
                rowHeight={this.state.rowHeight}
                cols={cols}
                preventCollision={false}
                compactType="vertical"
                draggableHandle=""
                draggableCancel=".files-tree-wrapper"
            >
                {this.props.children || []}
            </ResponsiveGridLayout>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
