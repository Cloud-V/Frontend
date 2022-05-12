import React, { Component } from "react";
import _ from "lodash";
import { Rect, Text, Line } from "react-konva";
import {
    RULER_HEIGHT,
    SIGNAL_BOX_HEIGHT,
    SIGNAL_BOX_WIDTH,
    SIGNAL_BOX_PADDING,
    SIGNAL_HEIGHT,
    SIGNAL_BUS_SLOPE,
    DEFAULT_COLOR,
    DEFAULT_OPACITY,
    checkBus,
    pointDistance,
    getPointsCentroid,
} from "./utils";

export default class Signal extends Component {
    constructor(props) {
        super(props);
        this.getValues = this.getValues.bind(this);
        this.lineRef = React.createRef();
        this.textRef = React.createRef();
    }
    componentDidMount() {
        this.props.refresh();
    }

    getValues() {
        const {
            signal: { signal },
            renderFrom,
            renderTo,
        } = this.props;
        const { wave } = signal;
        if (!wave.length) {
            return [];
        }
        const values = [];
        const _normalize = (
            value,
            startRange = renderFrom,
            endRange = renderTo
        ) => {
            return value >= startRange && value <= endRange;
        };
        let waveIndex = 0;
        let valueAdded = false;
        while (waveIndex < wave.length) {
            const waveValue = wave[waveIndex];
            const valueStart = Number.parseInt(waveValue[0], 10);
            const valueEnd =
                waveIndex === wave.length - 1
                    ? renderTo
                    : Number.parseInt(wave[waveIndex + 1][0], 10);
            const newValue = {
                start: 0,
                end: 0,
                value: waveValue[1],
            };

            if (_normalize(valueStart) && _normalize(valueEnd)) {
                newValue.start = valueStart;
                newValue.end = valueEnd;
            } else if (_normalize(valueStart) && valueEnd > renderTo) {
                newValue.start = valueStart;
                newValue.end = renderTo;
            } else if (_normalize(valueEnd) && valueStart < renderFrom) {
                newValue.start = renderFrom;
                newValue.end = valueEnd;
            } else {
                waveIndex++;
                continue;
            }

            values.push(newValue);
            valueAdded = true;
            waveIndex++;
        }
        if (!valueAdded) {
            return [
                {
                    start: renderFrom,
                    end: renderTo,
                    value: wave[wave.length - 1][1],
                },
            ];
        }

        return values;
    }
    renderValue(
        valueObject,
        {
            signalColor = DEFAULT_COLOR.SIGNAL,
            initialValue = "0",
            width = 8,
        } = {}
    ) {
        const { signal, index, timeToPosition, getFormattedValue } = this.props;
        const isBus = checkBus(signal);
        const ypos =
            SIGNAL_BOX_PADDING +
            RULER_HEIGHT +
            index * (SIGNAL_BOX_HEIGHT + SIGNAL_BOX_PADDING);
        let originY = ypos;

        if (
            initialValue === "0" ||
            initialValue === "x" ||
            initialValue === "z"
        ) {
            originY += SIGNAL_HEIGHT;
        }

        if (isBus) {
            originY = ypos + SIGNAL_HEIGHT / 2.0;
        }
        const { value } = valueObject;
        const isLast = valueObject.last;
        let polyPoints = [];
        // eslint-disable-next-line
        let lastPoint = [];
        let color = signalColor;
        if (!isBus) {
            if (
                initialValue === "0" ||
                initialValue === "x" ||
                initialValue === "z"
            ) {
                if (value === "1") {
                    polyPoints.push({
                        x: timeToPosition(valueObject.start),
                        y: originY,
                    });
                    polyPoints.push({
                        x: timeToPosition(valueObject.start),
                        y: originY - SIGNAL_HEIGHT,
                    });
                    polyPoints.push({
                        x: timeToPosition(valueObject.end),
                        y: originY - SIGNAL_HEIGHT,
                    });

                    lastPoint = [
                        polyPoints[polyPoints.length - 1].x,
                        polyPoints[polyPoints.length - 1].y,
                    ];
                } else if (value === "0") {
                    polyPoints.push({
                        x: timeToPosition(valueObject.start),
                        y: originY,
                    });
                    polyPoints.push({
                        x: timeToPosition(valueObject.end),
                        y: originY,
                    });

                    lastPoint = [
                        polyPoints[polyPoints.length - 1].x,
                        polyPoints[polyPoints.length - 1].y,
                    ];
                } else if (value === "x") {
                    polyPoints.push({
                        x: timeToPosition(valueObject.start),
                        y: originY,
                    });
                    polyPoints.push({
                        x: timeToPosition(valueObject.end),
                        y: originY,
                    });

                    lastPoint = [
                        polyPoints[polyPoints.length - 1].x,
                        polyPoints[polyPoints.length - 1].y,
                    ];
                    color = DEFAULT_COLOR.SIGNAL_DC;
                } else if (value.toLowerCase() === "z") {
                    polyPoints.push({
                        x: timeToPosition(valueObject.start),
                        y: originY,
                    });
                    polyPoints.push({
                        x: timeToPosition(valueObject.end),
                        y: originY,
                    });

                    lastPoint = [
                        polyPoints[polyPoints.length - 1].x,
                        polyPoints[polyPoints.length - 1].y,
                    ];
                    color = DEFAULT_COLOR.SIGNAL_IMPED;
                }
            } else if (initialValue === "1") {
                if (value === "1") {
                    polyPoints.push({
                        x: timeToPosition(valueObject.start),
                        y: originY,
                    });

                    polyPoints.push({
                        x: timeToPosition(valueObject.end),
                        y: originY,
                    });

                    lastPoint = [
                        polyPoints[polyPoints.length - 1].x,
                        polyPoints[polyPoints.length - 1].y,
                    ];
                } else if (value === "0") {
                    polyPoints.push({
                        x: timeToPosition(valueObject.start),
                        y: originY,
                    });
                    polyPoints.push({
                        x: timeToPosition(valueObject.start),
                        y: originY + SIGNAL_HEIGHT,
                    });
                    polyPoints.push({
                        x: timeToPosition(valueObject.end),
                        y: originY + SIGNAL_HEIGHT,
                    });

                    lastPoint = [
                        polyPoints[polyPoints.length - 1].x,
                        polyPoints[polyPoints.length - 1].y,
                    ];
                } else if (value === "x" || value.toLowerCase() === "z") {
                    polyPoints.push({
                        x: timeToPosition(valueObject.start),
                        y: originY,
                    });
                    polyPoints.push({
                        x: timeToPosition(valueObject.start),
                        y: originY + SIGNAL_HEIGHT,
                    });
                    polyPoints.push({
                        x: timeToPosition(valueObject.end),
                        y: originY + SIGNAL_HEIGHT,
                    });

                    lastPoint = [
                        polyPoints[polyPoints.length - 1].x,
                        polyPoints[polyPoints.length - 1].y,
                    ];
                }
            }
        } else {
            polyPoints.push({
                x: timeToPosition(valueObject.start) + SIGNAL_BUS_SLOPE,
                y: originY + SIGNAL_HEIGHT / 2.0,
            });
            polyPoints.push({
                x: timeToPosition(valueObject.start),
                y: originY,
            });
            polyPoints.push({
                x: timeToPosition(valueObject.start) + SIGNAL_BUS_SLOPE,
                y: originY - SIGNAL_HEIGHT / 2.0,
            });
            polyPoints.push({
                x: timeToPosition(valueObject.end) - SIGNAL_BUS_SLOPE,
                y: originY - SIGNAL_HEIGHT / 2.0,
            });
            if (!isLast) {
                polyPoints.push({
                    x: timeToPosition(valueObject.end),
                    y: originY,
                });
            } else {
                polyPoints.push({
                    x: timeToPosition(valueObject.end) + SIGNAL_BUS_SLOPE + 2,
                    y: originY - SIGNAL_HEIGHT / 2.0,
                });
                polyPoints.push({
                    x: timeToPosition(valueObject.end) + SIGNAL_BUS_SLOPE + 2,
                    y: originY + SIGNAL_HEIGHT / 2.0,
                });
            }

            polyPoints.push({
                x: timeToPosition(valueObject.end) - SIGNAL_BUS_SLOPE,
                y: originY + SIGNAL_HEIGHT / 2.0,
            });
            polyPoints.push({
                x: timeToPosition(valueObject.start) + SIGNAL_BUS_SLOPE,
                y: originY + SIGNAL_HEIGHT / 2.0,
            });

            lastPoint = [
                polyPoints[polyPoints.length - 1].x,
                polyPoints[polyPoints.length - 1].y,
            ];
            // eslint-disable-next-line
            const polyWidth = pointDistance(
                polyPoints[2].x,
                polyPoints[2].y,
                polyPoints[3].x,
                polyPoints[3].y
            );
        }

        const centre = getPointsCentroid(polyPoints);
        let rectWidth = SIGNAL_BOX_WIDTH;
        if (polyPoints.length > 4) {
            rectWidth = polyPoints[5].x - polyPoints[0].x;
        }

        return (
            <React.Fragment>
                <Line
                    ref={this.lineRef}
                    points={_.flatten(
                        polyPoints.map((point) => [point.x, point.y])
                    )}
                    attrs={{
                        signalName: signal.signal.originalName,
                        signal,
                        signalIndex: index,
                    }}
                    closed={isBus}
                    fill={DEFAULT_COLOR.CANVAS_BACKGROUND}
                    stroke={color}
                    strokeWidth={1}
                />
                {isBus && (
                    <Text
                        ref={this.textRef}
                        fontFamily="monospace"
                        attrs={{
                            signalName: signal.signal.originalName,
                            signal,
                            signalIndex: index,
                        }}
                        x={centre.x - rectWidth / 2.3}
                        y={centre.y - SIGNAL_BOX_HEIGHT / 3.0}
                        text={getFormattedValue(value, width, signal)}
                        width={rectWidth}
                        height={SIGNAL_BOX_HEIGHT}
                        align={"center"}
                        fontSize={11}
                        ellipsis={true}
                        wrap={"none"}
                        fill={signalColor}
                    />
                )}
            </React.Fragment>
        );
    }

    renderHighlightRectangle() {
        const { index, getWidth, highlight, signal } = this.props;
        const width = getWidth();
        if (width == null) {
            return null;
        }
        const attrs = {
            signalName: signal.signal.originalName,
            signal,
            signalIndex: index,
        };
        return (
            <Rect
                width={width}
                x={0}
                y={
                    SIGNAL_BOX_PADDING +
                    RULER_HEIGHT +
                    index * (SIGNAL_BOX_HEIGHT + SIGNAL_BOX_PADDING) -
                    1
                }
                attrs={attrs}
                height={SIGNAL_BOX_HEIGHT + 2}
                fill={DEFAULT_COLOR.SIGNAL_HIGHLIGHT}
                opacity={highlight ? DEFAULT_OPACITY.SIGNAL_HIGHLIGHT : 0}
            />
        );
    }

    render() {
        const { signal } = this.props;
        const ranges = this.getValues();
        return (
            <React.Fragment>
                {ranges.map((range, index) => {
                    return (
                        <React.Fragment key={index}>
                            {this.renderValue(
                                range,
                                Object.assign(
                                    {},
                                    {
                                        last: index === ranges.length - 1,
                                        width: signal.width,
                                        initialValue:
                                            ranges[
                                                index === 0 ? index : index - 1
                                            ].value,
                                    }
                                )
                            )}
                        </React.Fragment>
                    );
                })}
                {this.renderHighlightRectangle()}
            </React.Fragment>
        );
    }
}
