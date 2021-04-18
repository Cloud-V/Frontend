import React, { Component } from "react";
import _ from "lodash";
import { Form, FormGroup, Input, Label as InputLabel } from "reactstrap";
import { Stage, Layer, Rect, Text, Line, Label, Tag } from "react-konva";
import Menu, { MenuItem } from "rc-menu";
import SetRadixDialog from "views/Workspace/components/Dialogs/SetRadixDialog.js";
import {
	RULER_HEIGHT,
	GRID_SECTIONS,
	SIGNAL_NAMES_BOX_WIDTH,
	SIGNAL_BOX_HEIGHT,
	SIGNAL_BOX_WIDTH,
	SIGNAL_BOX_PADDING,
	SignalType,
	Radix,
	DEFAULT_COLOR,
	DEFAULT_OPACITY,
	HOVER_BOX_HEIGHT,
	checkBus
} from "./utils";
import Signal from "./Signal";
import AddSignalDialog from "../../../Dialogs/AddSignalDialog";
import PromptDialog from "../../../Dialogs/PromptDialog";

const bases = [
	{
		id: "hexadecimal",
		title: "Hexadecimal"
	},
	{
		id: "decimal",
		title: "Decimal"
	},
	{
		id: "binary",
		title: "Binary"
	}
];
class WaveformViewer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			renderedSignals: [],
			hiddenSignals: [],
			removedSignals: [],
			includedSignals: [],
			excludedSignals: [],
			signalCurrentValues: [],
			initialized: false,
			timeScaleUnit: "ns",
			timeScale: 1,
			radix: Radix.Hexadecimal,
			renderFrom: 0,
			renderTo: 1000,
			endTime: 1000,
			isDragging: false,
			draggedSignal: null,
			draggedOriginalX: null,
			draggedOriginalY: null,
			draggedMouseX: null,
			draggedMouseY: null,
			dragRectangle: null,
			dragRectangleOriginalHeight: null,
			highlighted: null,
			highlightedIndex: null,
			cursorVisible: false,
			highlightIndex: -1,
			currentTime: 0,
			currentExactTime: 0,
			cursorValueVisible: false,
			cursorValueText: "",
			currentWidth: 0,
			currentHeight: 0,
			radixDialog: false,
			addSignalDialog: false,
			promptDialog: false,
			promptTitle: "Remove Signal",
			promptBody: "Remove Signal",
			promptCallback: () => null,
			lastWidth: 0,
			lastHeight: 0,
			hoverBoxX: 0,
			hoverBoxY: 0,
			hoverBoxValue: "123",
			hoverBoxVisible: false
		};
		this.parseSignals = this.parseSignals.bind(this);
		this.initializeCanvas = this.initializeCanvas.bind(this);
		this.getCanvasId = this.getCanvasId.bind(this);
		this.onCanvasMouseDown = this.onCanvasMouseDown.bind(this);
		this.onCanvasMouseMove = this.onCanvasMouseMove.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onCanvasMouseUp = this.onCanvasMouseUp.bind(this);
		this.onToolbarClicked = this.onToolbarClicked.bind(this);
		this.setCursorTime = this.setCursorTime.bind(this);
		this.timeToPosition = this.timeToPosition.bind(this);
		this.positionToTime = this.positionToTime.bind(this);
		this.renderCanvas = this.renderCanvas.bind(this);
		this.renderHoverBox = this.renderHoverBox.bind(this);
		this.renderSignals = this.renderSignals.bind(this);
		this.renderSignalNames = this.renderSignalNames.bind(this);
		this.renderGrid = this.renderGrid.bind(this);
		this.renderCursor = this.renderCursor.bind(this);
		this.renderToolbar = this.renderToolbar.bind(this);
		this.resetDiagram = this.resetDiagram.bind(this);
		this.getFormattedValue = this.getFormattedValue.bind(this);
		this.getRenderDistance = this.getRenderDistance.bind(this);
		this.getRenderDistanceFactor = this.getRenderDistanceFactor.bind(this);
		this.getOriginalEndtime = this.getOriginalEndtime.bind(this);
		this.zoomIn = this.zoomIn.bind(this);
		this.zoomOut = this.zoomOut.bind(this);
		this.zoomAll = this.zoomAll.bind(this);
		this.moveLeft = this.moveLeft.bind(this);
		this.moveRight = this.moveRight.bind(this);
		this.signalUp = this.signalUp.bind(this);
		this.signalDown = this.signalDown.bind(this);
		this.moveToFirst = this.moveToFirst.bind(this);
		this.getId = this.getId.bind(this);
		this.renderRadixDialog = this.renderRadixDialog.bind(this);
		this.toggleRadixDialog = this.toggleRadixDialog.bind(this);
		this.getWidth = this.getWidth.bind(this);
		this.getHeight = this.getHeight.bind(this);
		this.refresh = this.refresh.bind(this);
		this.openAddSignalDialog = this.openAddSignalDialog.bind(this);
		this.openRemoveSignalDialog = this.openRemoveSignalDialog.bind(this);
		this.renderAddSignalDialog = this.renderAddSignalDialog.bind(this);
		this.toggleAddSignalDialog = this.toggleAddSignalDialog.bind(this);
		this.openPromptDialog = this.openPromptDialog.bind(this);
		this.renderPromptDialog = this.renderPromptDialog.bind(this);
		this.togglePromptDialog = this.togglePromptDialog.bind(this);
		this.addSignals = this.addSignals.bind(this);
		this.removeSignal = this.removeSignal.bind(this);

		this.editorRef = React.createRef();
		this.canvasRef = React.createRef();
		this.hoverBoxRef = [];
	}

	refresh() {
		this.setState({});
	}

	getId() {
		return this.props.tab.id;
	}

	toggleRadixDialog() {
		this.setState(prevState => ({ radixDialog: !prevState.radixDialog }));
	}

	getCanvasId() {
		return `waveform-canvas-${this.getId()}`;
	}
	timeToPosition(time, from, round = true) {
		if (from == null) {
			from = this.state.renderFrom;
		}

		if (round) {
			return Math.round(
				SIGNAL_NAMES_BOX_WIDTH +
					time * this.getRenderDistanceFactor() -
					Math.round(from * this.getRenderDistanceFactor())
			);
		} else {
			return (
				SIGNAL_NAMES_BOX_WIDTH +
				time * this.getRenderDistanceFactor() -
				from * this.getRenderDistanceFactor()
			);
		}
	}

	positionToTime(pos, from, round = true) {
		if (from == null) {
			from = this.state.renderFrom;
		}

		if (round) {
			return (
				Math.round(
					(pos - SIGNAL_NAMES_BOX_WIDTH) /
						this.getRenderDistanceFactor()
				) + Math.round(from)
			);
		} else {
			return (
				(pos - SIGNAL_NAMES_BOX_WIDTH) /
					this.getRenderDistanceFactor() +
				from
			);
		}
	}
	signalUp() {
		const { highlightIndex } = this.state;
		if (highlightIndex === -1 || highlightIndex === 0) {
			return;
		}
		const renderedSignals = _.clone(this.state.renderedSignals);
		[
			renderedSignals[highlightIndex],
			renderedSignals[highlightIndex - 1]
		] = [
			renderedSignals[highlightIndex - 1],
			renderedSignals[highlightIndex]
		];
		this.setState({ renderedSignals, highlightIndex: highlightIndex - 1 });
	}
	signalDown() {
		const { highlightIndex } = this.state;
		if (
			highlightIndex === -1 ||
			highlightIndex === this.state.renderedSignals.length - 1
		) {
			return;
		}
		const renderedSignals = _.clone(this.state.renderedSignals);
		[
			renderedSignals[highlightIndex],
			renderedSignals[highlightIndex + 1]
		] = [
			renderedSignals[highlightIndex + 1],
			renderedSignals[highlightIndex]
		];
		this.setState({ renderedSignals, highlightIndex: highlightIndex + 1 });
	}

	onCanvasMouseDown(options) {
		if (options.target) {
			/*const pointer = this.canvas.getPointer(options.e);
			let statusUpdate = {}
			if (options.target.signal) {
				if (this.state.highlighted) {
					this.state.highlighted.fill = undefined;
					this.state.highlighted.opacity = 0;
				}
				this.state.highlighted = options.target;
				this.state.highlightedIndex = this.state.renderedSignals.indexOf(
					options.target.signal
				);
				options.target.fill = DEFAULT_COLOR.SIGNAL_HIGHLIGHT;
				options.target.opacity = DEFAULT_OPACITY.SIGNAL_HIGHLIGHT;
			} else {
				if (this.state.highlighted) {
					this.state.highlighted.fill = undefined;
					this.state.highlighted.opacity = 0;
				}
				this.state.highlighted = undefined;
				this.state.highlightedIndex = undefined;
			}

			if (options.target.signal) {
				this.state.draggedSignal = options.target;
				this.state.draggedOriginalX = options.target.left;
				this.state.draggedOriginalY = options.target.top;
				this.state.draggedMouseX = pointer.x;
				this.state.draggedMouseY = pointer.y;
			}
			this.state.isDragging = true;
			return this.canvas.renderAll();*/
		}
	}
	onCanvasMouseMove(options) {
		if (this.state.isDragging) {
			/*const pointer = this.canvas.getPointer(options.e);
			if (this.state.draggedSignal != null) {
				this.state.draggedSignal.setTop(
					pointer.y - this.state.draggedMouseY + this.state.draggedOriginalY
				);
				this.state.draggedSignal.opacity =
					DEFAULT_OPACITY.SIGNAL_DRAGGED;
			}
			if (
				this.state.dragRectangle != null &&
				options.target !== this.state.dragRectangle
			) {
				this.state.dragRectangle.setHeight(
					this.state.dragRectangleOriginalHeight
				);
				this.state.dragRectangleOriginalHeight = undefined;
				this.state.dragRectangle.fill = undefined;
				this.state.dragRectangle.opacity = 0;
				this.state.dragRectangle = undefined;
			}

			if (
				options.target &&
				options.target.signal &&
				options.target !== this.state.draggedSignal &&
				options.target !== this.state.dragRectangle
			) {
				this.state.dragRectangle = options.target;
				this.state.dragRectangle.fill = DEFAULT_COLOR.SIGNAL_DRAGGED;
				this.state.dragRectangle.opacity =
					DEFAULT_OPACITY.SIGNAL_DRAGGED;
				this.state.dragRectangleOriginalHeight = this.state.dragRectangle.height;
				this.state.dragRectangle.setHeight(
					this.state.dragRectangle.height / 2.0
				);
			}
			return this.state.canvas.renderAll();*/
		}
	}
	onCanvasMouseUp(options) {
		/*if (this.state.isDragging) {
			const validTarget =
				options.target &&
				options.target.signal &&
				this.state.draggedSignal !== options.target;
			if (this.state.draggedSignal != null) {
				if (this.state.draggedOriginalX != null) {
					if (validTarget) {
						//Swap Signals
						const sourceIndex = this.renderedSignals.indexOf(
							this.state.draggedSignal.signal
						);
						const targetIndex = this.renderedSignals.indexOf(
							options.target.signal
						);
						this.renderedSignals.splice(
							targetIndex,
							0,
							this.renderedSignals.splice(sourceIndex, 1)[0]
						);
						this.state.draggedSignal.set({
							left: this.state.draggedOriginalX,
							top: this.state.draggedOriginalY
						});
						if (this.state.dragRectangle != null) {
							this.state.dragRectangle.setHeight(
								this.state.dragRectangleOriginalHeight
							);
							this.state.dragRectangle.fill = undefined;
							this.state.dragRectangleOriginalHeight = undefined;
							this.state.dragRectangle.opacity = 0;
							this.state.dragRectangle = undefined;
						}
						this.highlightedIndex = targetIndex;
						this.redraw();
						if (this.state.onChangeListener) {
							this.state.onChangeListener({
								type: "sort"
							});
						}
					} else {
						this.state.draggedSignal.set({
							left: this.state.draggedOriginalX,
							top: this.state.draggedOriginalY
						});
					}
				}
			}
		}

		if (this.state.dragRectangle != null) {
			this.state.dragRectangle.setHeight(
				this.state.dragRectangleOriginalHeight
			);
			this.state.dragRectangleOriginalHeight = undefined;
			this.state.dragRectangle.fill = undefined;
			this.state.dragRectangle.opacity = 0;
			this.state.dragRectangle = undefined;
		}
		this.state.isDragging = false;
		this.state.draggedSignal = undefined;
		this.state.draggedOriginalX = undefined;
		this.state.draggedOriginalY = undefined;
		this.state.draggedMouseX = undefined;
		this.state.draggedMouseY = undefined;

		const pointer = this.state.canvas.getPointer(options.e);
		if (pointer.x > SIGNAL_NAMES_BOX_WIDTH) {
			this.setCursorTime(this.positionToTime(pointer.x, null, false));
		}

		return this.state.canvas.renderAll();*/
	}
	setCursorTime(exactTime) {
		if (exactTime == null) {
			return;
		}
		const time = exactTime.toFixed(2);

		this.setState({
			currentTime: time,
			currentExactTime: exactTime
		});
	}
	componentDidUpdate(prevProps, prevState) {
		if (
			prevState.radix !== this.state.radix ||
			prevState.currentTime !== this.state.currentTime
		) {
			this.refreshCurrentValues();
		}
	}
	refreshCurrentValues() {
		let renderedSignals = _.clone(this.state.renderedSignals);
		const { currentTime } = this.state;
		this.setState({
			renderedSignals: renderedSignals.map(signal => {
				const {
					signal: { wave }
				} = signal;
				let currentValue = "x";
				for (let i = 0; i < wave.length; i++) {
					if (currentTime >= parseInt(wave[i][0], 10)) {
						if (
							i === wave.length - 1 ||
							currentTime <= Number.parseInt(wave[i + 1][0], 10)
						) {
							currentValue = this.getFormattedValue(
								wave[i][1],
								signal.width,
								signal
							);
							break;
						}
					}
				}
				signal.currentValue = currentValue;
				return signal;
			})
		});
	}
	getFormattedValue(value, length = 8, signal) {
		value =
			value.toLowerCase() === "x" || value.toLowerCase() === "z"
				? value
				: parseInt(value, 2).toString();
		if (signal && signal.type === "real") {
			return `r${value}`;
		}
		if (this.state.radix === Radix.Decimal) {
			if (value === "x") {
				return `${value.padStart(length, "x")}`;
			} else if (value.toLowerCase() === "z") {
				return `${value.padStart(length, "z")}`;
			} else {
				return `${value.toString(2)}`;
			}
		} else if (this.state.radix === Radix.Hexadecimal) {
			if (value === "x") {
				return `0x${value.padStart(length, "x")}`;
			} else if (value.toLowerCase() === "z") {
				return `0x${value.padStart(length, "z")}`;
			} else {
				return `0x${parseInt(value, 10).toString(16)}`;
			}
		} else if (this.state.radix === Radix.Binary) {
			if (value === "x") {
				return `0b${value.padStart(length, "x")}`;
			} else if (value.toLowerCase() === "z") {
				return `0b${value.padStart(length, "z")}`;
			} else {
				return `0b${parseInt(value, 10)
					.toString(2)
					.padStart(length, "0")}`;
			}
		}
	}

	onChange(e) {}
	onSave(e) {}
	getRenderDistance() {
		return Math.abs(this.state.renderTo - this.state.renderFrom);
	}
	getRenderDistanceFactor() {
		const width = this.getWidth();
		if (width == null) {
			return null;
		}
		return (width - SIGNAL_NAMES_BOX_WIDTH) / this.getRenderDistance();
	}
	renderGrid() {
		const width = this.getWidth();
		const height = this.getHeight();
		if (width == null) {
			return null;
		}

		const renderDistance = this.getRenderDistance();
		const lineStep = Math.ceil(renderDistance / (GRID_SECTIONS - 1));
		let i = this.state.renderFrom + lineStep;
		while (i <= this.state.renderTo) {
			i += lineStep;
		}
		const currentTarget = i - lineStep;

		i = this.state.renderFrom + lineStep;
		const shapes = [];
		let key = 0;
		while (i <= currentTarget) {
			const linePos = this.timeToPosition(i);
			const lineCords = [linePos, RULER_HEIGHT, linePos, height];
			shapes.push(
				<Line
					points={lineCords}
					key={key + "-line"}
					stroke={DEFAULT_COLOR.GRID_LINE}
					strokeWidth={1}
				/>
			);
			shapes.push(
				<Text
					fontFamily="monospace"
					x={linePos - 10}
					y={0}
					key={key + "-text"}
					text={i + this.state.timeScaleUnit}
					fontSize={11}
					fill={DEFAULT_COLOR.GRID_TEXT}
				/>
			);
			i += lineStep;
			key++;
		}
		return (
			<React.Fragment>
				<Line
					points={[
						SIGNAL_BOX_WIDTH + 10,
						0,
						SIGNAL_BOX_WIDTH + 10,
						height
					]}
					stroke={DEFAULT_COLOR.CURRENT_VALUE_LINE}
					strokeWidth={1}
				/>
				<Line
					points={[
						SIGNAL_NAMES_BOX_WIDTH,
						0,
						SIGNAL_NAMES_BOX_WIDTH,
						height
					]}
					stroke={DEFAULT_COLOR.CURRENT_VALUE_LINE}
					strokeWidth={1}
				/>
				<Rect
					width={SIGNAL_NAMES_BOX_WIDTH}
					height={height}
					fill={DEFAULT_COLOR.SIGNAL_NAME_RECT}
					opacity={DEFAULT_OPACITY.SIGNAL_NAME_RECT}
				/>
				{shapes}
			</React.Fragment>
		);
	}

	openAddSignalDialog() {
		this.setState({ addSignalDialog: true });
	}

	openRemoveSignalDialog() {
		const { highlightIndex } = this.state;
		if (highlightIndex === -1) {
			return;
		}
		const signal = this.state.renderedSignals[highlightIndex];
		if (!signal) {
			return;
		}
		this.openPromptDialog({
			callback: answer =>
				answer === "yes"
					? this.removeSignal(signal, highlightIndex)
					: null,
			title: `Remove ${signal.id}`,
			body: `Are you sure you want to remove the signal ${signal.id}?`
		});
	}

	addSignals(signalIds) {
		if (!signalIds || !signalIds.length) {
			return;
		}
		this.setState(prevState => {
			const { removedSignals } = prevState;
			const signalMap = {};
			removedSignals.forEach(
				(signal, index) => (signalMap[signal.id] = index)
			);
			const toAddIndices = _.map(signalIds, id => signalMap[id]);
			const signals = _.map(toAddIndices, index => removedSignals[index]);
			return {
				renderedSignals: prevState.renderedSignals.concat(signals),
				removedSignals: prevState.removedSignals.filter(
					(s, index) => !toAddIndices.includes(index)
				)
			};
		});
	}

	removeSignal(signal, index) {
		this.setState(prevState => ({
			renderedSignals: [
				...prevState.renderedSignals.slice(0, index),
				...prevState.renderedSignals.slice(index + 1)
			],
			removedSignals: [...prevState.removedSignals, signal],
			highlightIndex: -1
		}));
	}

	openPromptDialog({ callback, title, body }) {
		this.setState({
			promptDialog: true,
			promptTitle: title,
			promptBody: body,
			promptCallback: callback
		});
	}

	renderAddSignalDialog() {
		return (
			<AddSignalDialog
				modal={this.state.addSignalDialog}
				toggle={this.toggleAddSignalDialog}
				callback={signals => {
					this.toggleAddSignalDialog();
					this.addSignals(signals);
				}}
				theme={this.props.theme}
				signals={this.state.removedSignals}
			/>
		);
	}
	renderPromptDialog() {
		return (
			<PromptDialog
				modal={this.state.promptDialog}
				toggle={this.togglePromptDialog}
				title={this.state.promptTitle}
				body={this.state.promptBody}
				callback={this.state.promptCallback}
				theme={this.props.theme}
			/>
		);
	}

	toggleAddSignalDialog() {
		this.setState(prevState => ({
			addSignalDialog: !prevState.addSignalDialog
		}));
	}
	togglePromptDialog() {
		this.setState(prevState => ({
			promptDialog: !prevState.promptDialog
		}));
	}

	onToolbarClicked({ key }) {
		if (key === "add") {
			return this.openAddSignalDialog();
		} else if (key === "remove") {
			return this.openRemoveSignalDialog();
		} else if (key === "zoomin") {
			return this.zoomIn();
		} else if (key === "zoomout") {
			return this.zoomOut();
		} else if (key === "zoomall") {
			return this.zoomAll();
		} else if (key === "goright") {
			return this.moveRight();
		} else if (key === "goleft") {
			return this.moveLeft();
		} else if (key === "gotofirst") {
			return this.moveToFirst();
		} else if (key === "setradix") {
			return this.toggleRadixDialog();
		} else if (key === "signalup") {
			return this.signalUp();
		} else if (key === "signaldown") {
			return this.signalDown();
		}
	}
	getOriginalEndtime() {
		return this.props.content.endtime;
	}
	zoomIn() {
		const factor = Math.floor(this.getRenderDistance() / 4.0);
		let newFrom = this.state.renderFrom + factor;
		let newTo = this.state.renderTo - factor;
		if (this.state.cursorVisible) {
			const cursorTime = Math.round(this.state.currentExactTime);
			if (cursorTime - factor < this.state.renderFrom) {
				newFrom = this.state.renderFrom;
				newTo = this.state.renderTo - 2 * factor;
			} else if (cursorTime + factor > this.state.renderTo) {
				newFrom = this.state.renderFrom + 2 * factor;
				newTo = this.state.renderTo;
			} else {
				newFrom = cursorTime - factor;
				newTo = cursorTime + factor;
			}
		}

		if (newFrom > newTo || newTo < 0 || newFrom >= newTo) {
			return;
		}
		const newDistance = newTo - newFrom;
		const scaleFactor = newDistance / this.props.content.endtime;

		if (factor) {
			this.setState({
				renderFrom: newFrom,
				renderTo: newTo,
				scaleFactor
			});
		}
	}
	zoomOut() {
		const zoomDistance = 2 * this.getRenderDistance();
		let newFrom = undefined;
		let newTo = undefined;
		if (zoomDistance > this.getOriginalEndtime()) {
			newFrom = 0;
			newTo = this.ceilFive(this.getOriginalEndtime());
		} else {
			const factor = Math.floor(this.getRenderDistance() / 2.0);
			newFrom = this.state.renderFrom - factor;
			newTo = this.state.renderTo + factor;
			if (newTo > this.ceilFive(this.getOriginalEndtime())) {
				newTo = this.ceilFive(this.getOriginalEndtime());
				newFrom = newTo - zoomDistance;
			}
			if (newFrom < 0) {
				newFrom = 0;
			}
		}

		const newDistance = newTo - newFrom;
		const scaleFactor = newDistance / this.getOriginalEndtime();

		this.setState({
			renderFrom: newFrom,
			renderTo: newTo,
			scaleFactor
		});
	}
	zoomAll() {
		if (
			this.state.renderFrom === 0 &&
			this.state.renderTo === this.ceilFive(this.getOriginalEndtime())
		) {
			return;
		}
		return this.setState({
			renderFrom: 0,
			renderTo: this.ceilFive(this.getOriginalEndtime()),
			scaleFactor: 1.0
		});
	}
	moveLeft() {
		if (this.state.renderFrom === 0) {
			return;
		}
		const factor = Math.ceil(this.getRenderDistance() / 8.0);
		let newFrom = this.state.renderFrom - factor;
		if (newFrom < 0) {
			newFrom = 0;
		}
		let newTo = newFrom + this.getRenderDistance();
		if (newTo > this.ceilFive(this.getOriginalEndtime)) {
			newTo = this.ceilFive(this.getOriginalEndtime);
		}
		return this.setState({
			renderFrom: newFrom,
			renderTo: newTo
		});
	}
	moveRight() {
		if (this.state.renderTo === this.ceilFive(this.getOriginalEndtime)) {
			return;
		}
		const factor = Math.ceil(this.getRenderDistance() / 8.0);
		let newTo = this.state.renderTo + factor;
		if (newTo > this.ceilFive(this.getOriginalEndtime)) {
			newTo = this.ceilFive(this.getOriginalEndtime);
		}
		let newFrom = newTo - this.getRenderDistance();
		if (newFrom < 0) {
			newFrom = 0;
		}

		return this.setState({
			renderFrom: newFrom,
			renderTo: newTo
		});
	}
	moveToFirst() {
		if (this.state.renderFrom === 0) {
			return;
		}
		this.setState({
			renderFrom: 0,
			renderTo: this.getRenderDistance()
		});
	}
	renderToolbar() {
		// const { highlightIndex } = this.state;
		return (
			<div className="waveform-toolbar">
				<Menu
					className="menubar-core"
					onClick={this.onToolbarClicked}
					mode="horizontal"
					openAnimation="slide-up"
					getPopupContainer={() =>
						document.querySelector("#root .workspace")
					}
				>
					<MenuItem
						key="add"
						title={"Add Signal"}
						className={"menubar-item menubar-action-item"}
					>
						<i className="fas fa-plus-circle" />
					</MenuItem>
					<MenuItem
						key="remove"
						title={"Remove Signal"}
						className={"menubar-item menubar-action-item"}
					>
						<i className="fas fa-minus-circle" />
					</MenuItem>
					<MenuItem
						key="zoomin"
						title={"Zoom In"}
						className={"menubar-item menubar-action-item"}
					>
						<i className="fas fa-search-plus" />
					</MenuItem>
					<MenuItem
						key="zoomout"
						title={"Zoom Out"}
						className={"menubar-item menubar-action-item"}
					>
						<i className="fas fa-search-minus" />
					</MenuItem>
					<MenuItem
						key="zoomall"
						title={"Zoom All"}
						className={"menubar-item menubar-action-item"}
					>
						<i className="fas fa-expand-arrows-alt" />
					</MenuItem>
					<MenuItem
						key="gotofirst"
						title={"Go to First"}
						className={"menubar-item menubar-action-item"}
					>
						<i className="fas fa-angle-double-left" />
					</MenuItem>
					<MenuItem
						key="goleft"
						title={"Go Left"}
						className={"menubar-item menubar-action-item"}
					>
						<i className="fas fa-angle-left" />
					</MenuItem>
					<MenuItem
						key="goright"
						title={"Go Right"}
						className={"menubar-item menubar-action-item"}
					>
						<i className="fas fa-angle-right" />
					</MenuItem>
					<MenuItem
						key="signalup"
						title={"Move Signal Up"}
						className={"menubar-item menubar-action-item"}
					>
						<i className="far fa-arrow-alt-circle-up" />
					</MenuItem>
					<MenuItem
						key="signaldown"
						title={"Move Signal Down"}
						className={"menubar-item menubar-action-item"}
					>
						<i className="far fa-arrow-alt-circle-down" />
					</MenuItem>

					<MenuItem
						key="reset"
						title={"Reset Diagram"}
						className={"menubar-item menubar-action-item"}
					>
						<i className="fas fa-sync" />
					</MenuItem>
					<MenuItem
						key="setradix"
						title={"Set Radix"}
						disabled={true}
						className={
							"menubar-item menubar-action-item menubar-select"
						}
					>
						<Form inline>
							<FormGroup>
								<InputLabel for="set-radix" />
								<Input
									type="select"
									name="set-radix"
									id="set-radix"
									onChange={({ target: { value: radix } }) =>
										this.setState({
											radix:
												radix === "decimal"
													? Radix.Decimal
													: radix === "binary"
													? Radix.Binary
													: Radix.Hexadecimal,
											radixDialog: false
										})
									}
								>
									{bases.map(base => (
										<option key={base.id} value={base.id}>
											{base.title}
										</option>
									))}
								</Input>
							</FormGroup>
						</Form>
					</MenuItem>
					<MenuItem
						key="values"
						disabled={true}
						className={
							"pull-right menubar-item menubar-action-item menubar-cursor-value"
						}
					>
						{`Time: ${this.state.currentTime}${
							this.state.timeScaleUnit
						}`}
					</MenuItem>
				</Menu>
			</div>
		);
	}

	initializeCanvas() {}

	ceilInt(value, divis) {
		value = Math.round(value);
		while (value % divis) {
			value++;
		}
		return value;
	}

	floorInt(value, divis) {
		value = Math.round(value);
		while (value % divis) {
			value--;
		}
		return value;
	}

	roundInt(value, divis) {
		value = Math.round(value);
		if (!(value % divis)) {
			return value;
		}
		let ceilValue = value;
		let floorValue = value;
		while (ceilValue % divis && floorValue % divis) {
			ceilValue++;
			floorValue--;
		}
		if (ceilValue % divis) {
			return floorValue;
		} else {
			return ceilValue;
		}
	}

	ceilFive(value) {
		return this.ceilInt(value, 5);
	}

	floorFive(value) {
		return this.floorInt(value, 5);
	}

	roundFive(value) {
		return this.roundInt(value, 5);
	}

	componentDidMount() {
		this.resetDiagram();
		this.initializeCanvas();
		window.addEventListener("resize", this.refresh);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.refresh);
	}

	resetDiagram() {
		const content = _.clone(this.props.content);
		const { signal, scale, endtime: endTime } = content;

		let statusUpdates = {};
		const timeScaleMatches = /^(\d+)(\w+)$/.exec(scale);
		if (timeScaleMatches) {
			let timeScaleUnit = timeScaleMatches[2];
			let timeScale = parseInt(timeScaleMatches[1], 10);
			if (timeScaleUnit === "ns") {
				timeScale *= 1000;
			}
			statusUpdates.timeScaleUnit = timeScaleUnit;
			statusUpdates.timeScale = timeScale;
		}
		const ceiledEndTime = this.ceilFive(endTime);
		statusUpdates.endTime = ceiledEndTime;
		statusUpdates.renderTo =
			endTime > 100
				? this.floorInt(ceiledEndTime, 100)
				: this.roundInt(ceiledEndTime / 2.0, 10);
		signal
			.sort((firstSignal, secondSignal) => {
				if (firstSignal.name < secondSignal.name) {
					return -1;
				} else if (firstSignal.name > secondSignal.name) {
					return 1;
				} else {
					return 0;
				}
			})
			.forEach(signal => (signal.originalName = signal.name));

		this.setState(statusUpdates);

		this.parseSignals();

		this.props.onChange(content, this.props.tab.dirty);
	}

	parseSignals() {
		const { content } = this.props;
		const { signal: signals } = content;

		const renderedSignals = [];
		const removedSignals = [];
		const includedSignals = [];
		const excludedSignals = [];
		for (let signal of signals) {
			if (typeof signal.name !== "string" || signal.name.trim() === "") {
				continue;
			}
			const levels = signal.name.split(".");
			const depth = levels.length;
			const signalId = signal.name;
			if (depth > 1) {
				levels.splice(0, 1);
			}
			signal.name = levels.join(".");
			const busSignal = checkBus(signal);
			if (depth === 2) {
				if (!includedSignals.includes(signalId)) {
					renderedSignals.push({
						id: signalId,
						signal,
						text: null,
						ypos: null,
						currentValue: "0",
						type: busSignal ? SignalType.Bus : SignalType.Wire,
						width: busSignal
							? Math.abs(busSignal.start - busSignal.end) + 1
							: 1
					});
					includedSignals.push(signalId);
				}
			} else if (depth > 2) {
				if (!excludedSignals.includes(signalId)) {
					removedSignals.push({
						id: signalId,
						signal,
						text: null,
						ypos: null,
						currentValue: "0",
						type: busSignal ? SignalType.Bus : SignalType.Wire,
						width: busSignal
							? Math.abs(busSignal.start - busSignal.end) + 1
							: 1
					});
					excludedSignals.push(signalId);
				}
			}
		}
		this.setState({
			renderedSignals,
			removedSignals,
			includedSignals,
			excludedSignals
		});
	}

	renderSignalNames() {
		const signallPos = SIGNAL_BOX_PADDING + RULER_HEIGHT;
		const heightStep = SIGNAL_BOX_HEIGHT + SIGNAL_BOX_PADDING;
		return (
			<React.Fragment>
				{this.state.renderedSignals.map((signal, index) => {
					return (
						<React.Fragment key={index}>
							<Text
								fontFamily="monospace"
								x={10}
								y={signallPos + index * heightStep + 4}
								text={signal.signal.name}
								fontSize={12}
								width={SIGNAL_BOX_WIDTH}
								height={SIGNAL_BOX_HEIGHT}
								fill={DEFAULT_COLOR.SIGNAL_NAME}
							/>
							<Text
								fontFamily="monospace"
								x={SIGNAL_BOX_WIDTH + 12}
								y={signallPos + index * heightStep + 4}
								text={signal.currentValue || "0"}
								fontSize={11}
								width={SIGNAL_BOX_WIDTH / 1.6}
								height={SIGNAL_BOX_HEIGHT}
								fill={DEFAULT_COLOR.SIGNAL_CURRENT_VALUE}
								ellipsis={true}
								wrap={"none"}
							/>
							<Rect
								x={SIGNAL_BOX_WIDTH + 12}
								y={signallPos + index * heightStep + 4 - 5}
								width={SIGNAL_NAMES_BOX_WIDTH / 2.6}
								height={SIGNAL_BOX_HEIGHT}
								opacity={0.0}
								fill={"blue"}
								ref={ref => (this.hoverBoxRef[index] = ref)}
								onMouseMove={evt => {
									const pos = this.canvasRef.current.getPointerPosition();
									this.setState({
										hoverBoxX: pos.x,
										hoverBoxY: pos.y,
										hoverBoxVisible: true,
										hoverBoxValue:
											signal.currentValue || "0"
									});
								}}
								onMouseOut={evt => {
									this.setState({
										hoverBoxVisible: false
									});
								}}
							/>
						</React.Fragment>
					);
				})}
			</React.Fragment>
		);
	}

	renderSignals() {
		/*const { content } = this.props;
		const { signal: signals } = content;
		const signalNames = signals.map(signal => signal.name);
		const layoutNames = this.state.renderedSignals.concat(
			this.state.removedSignals
		);*/
		return (
			<React.Fragment>
				{this.renderSignalNames()}
				{this.state.renderedSignals.map((signal, index) => (
					<Signal
						key={signal.signal.name}
						signal={signal}
						renderFrom={this.state.renderFrom}
						renderTo={this.state.renderTo}
						value={this.state.signalCurrentValues[index] || 0}
						index={index}
						refresh={() => this.setState({})}
						getFormattedValue={this.getFormattedValue}
						timeToPosition={this.timeToPosition}
						getWidth={this.getWidth}
						getHeight={this.getHeight}
						highlight={this.state.highlightIndex === index}
					/>
				))}
			</React.Fragment>
		);
	}

	getWidth() {
		if (!this.editorRef.current) {
			return null;
		}
		const width = this.editorRef.current.parentNode.clientWidth;
		if (width === 0) {
			return this.state.lastWidth;
		}
		if (this.state.lastWidth !== width) {
			this.setState({ lastWidth: width });
		}
		return width;
	}

	getHeight() {
		if (!this.editorRef.current) {
			return null;
		}
		const height = this.editorRef.current.parentNode.clientHeight;
		if (height === 0) {
			return this.state.lastWidth;
		}
		if (this.state.lastHeight !== height) {
			this.setState({ lastHeight: height });
		}
		return height;
	}

	onClick(event) {
		const { evt, target } = event;
		this.setState({ cursorVisible: true });
		this.setCursorTime(this.positionToTime(evt.layerX, null, false));
		const signal = target.getAttr("signal");
		const signalIndex = target.getAttr("signalIndex");
		if (signal) {
			if (this.state.highlightIndex !== signalIndex) {
				this.setState({ highlightIndex: signalIndex });
			} else {
				this.setState({ highlightIndex: -1 });
			}
		}
	}

	renderCursor() {
		const height = this.getHeight();

		if (height == null) {
			return null;
		}
		if (
			this.state.currentTime < this.state.renderFrom ||
			this.state.currentTime > this.state.renderTo
		) {
			return null;
		}
		const pos = this.timeToPosition(
			this.state.currentExactTime,
			null,
			false
		);
		return (
			<Line
				points={[pos, 0, pos, height]}
				stroke={DEFAULT_COLOR.CURSOR}
				strokeWidth={1}
				opacity={this.state.cursorVisible ? 1 : 0}
			/>
		);
	}

	renderCanvas() {
		const height = this.getHeight();
		const width = this.getWidth();
		if (height == null) {
			return null;
		}
		this.hoverBoxRef = this.hoverBoxRef.filter(ref=> ref !== null);
		this.hoverBoxRef.forEach(box => {
			box.setZIndex(box.parent.children.length - 1);
		});

		return (
			<Stage
				width={width}
				height={height}
				style={{
					backgroundColor: DEFAULT_COLOR.CANVAS_BACKGROUND,
					height,
					width
				}}
				onClick={this.onClick}
				ref={this.canvasRef}
				className="canvas-wrapper"
			>
				<Layer>
					{this.renderGrid()}
					{this.renderSignals()}
					{this.renderCursor()}
					{this.renderHoverBox()}
				</Layer>
			</Stage>
		);
	}
	renderRadixDialog() {
		return (
			<SetRadixDialog
				modal={this.state.radixDialog}
				toggle={this.toggleRadixDialog}
				callback={radix =>
					this.setState({
						radix:
							radix === "decimal"
								? Radix.Decimal
								: radix === "binary"
								? Radix.Binary
								: Radix.Hexadecimal,
						radixDialog: false
					})
				}
				defaultRadix={
					this.state.radix === Radix.Decimal
						? "decimal"
						: this.state.radix === Radix.Binary
						? "binary"
						: "hexadecimal"
				}
				theme={this.props.theme}
			/>
		);
	}
	renderHoverBox() {
		return (
			<Label
				x={this.state.hoverBoxX}
				y={this.state.hoverBoxY + HOVER_BOX_HEIGHT / 5}
				opacity={this.state.hoverBoxVisible ? 1 : 0}
			>
				<Tag
					fill={"black"}
					pointerDirection={"left"}
					pointerWidth={10}
					pointerHeight={10}
					lineJoin={"round"}
					stroke={"#333"}
				/>
				<Text
					fill={"white"}
					text={this.state.hoverBoxValue}
					padding={5}
				/>
			</Label>
		);
	}
	render() {
		return (
			<div ref={this.editorRef} className="waveform-viewer">
				{this.renderToolbar()}
				{this.renderPromptDialog()}
				{this.renderAddSignalDialog()}
				{this.renderCanvas()}
			</div>
		);
	}
}

export default WaveformViewer;
