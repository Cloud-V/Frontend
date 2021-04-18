import _ from "lodash";

export const RULER_HEIGHT = 14;
export const GRID_SECTIONS = 11;
export const SIGNAL_NAMES_BOX_WIDTH = 280;
export const SIGNAL_NAME_WIDTH = 150;
export const SIGNAL_BOX_HEIGHT = 20;
export const SIGNAL_BOX_WIDTH = 160;
export const SIGNAL_BOX_PADDING = 8;
export const SIGNAL_HEIGHT = 20;
export const SIGNAL_BUS_SLOPE = 3;
export const HOVER_BOX_HEIGHT = 20;

export const SignalType = {
	Wire: 0,
	Bus: 1
};

export const Radix = {
	Binary: 0,
	Decimal: 1,
	Hexadecimal: 2
};

export const DEFAULT_COLOR = {
	CANVAS_BACKGROUND: "black",
	CURSOR: "rgb(64, 186, 255)",
	GRID_TEXT: "gray",
	SIGNAL: "rgb(8, 255, 40)",
	SIGNAL_NAME_RECT: "gray",
	SIGNAL_HIGHLIGHT: "rgb(97, 255, 0)",
	SIGNAL_DC: "red",
	SIGNAL_IMPED: "blue",
	SIGNAL_DRAGGED: "rgb(197, 255, 145)",
	GRID_LINE: "gray",
	SIGNAL_NAME: "white",
	SIGNAL_VALUE: "white",
	SIGNAL_CURRENT_VALUE: "white",
	CURRENT_VALUE_LINE: "white"
};

export const DEFAULT_OPACITY = {
	CURSOR: 1.0,
	SIGNAL_NAME_RECT: 0.2,
	SIGNAL_HIGHLIGHT: 0.17,
	SIGNAL_DRAGGED: 0.3
};

export const checkBus = signal => {
	// eslint-disable-next-line
	const matches = /[\s\S]+\[(\d+)\:(\d+)\]\s*/.exec(
		signal.name || signal.signal.name
	);
	if (matches == null) {
		if (signal.type === "real") {
			return { start: 0, end: 1 };
		}
		return false;
	} else {
		return {
			start: matches[1],
			end: matches[2]
		};
	}
};
export const pointDistance = (x1, y1, x2, y2) => {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

export const getPointsCentroid = points => {
	const xMean = parseInt(_.meanBy(points, "x"), 10);
	const yMean = parseInt(_.meanBy(points, "y"), 10);
	return { x: xMean, y: yMean };
};
