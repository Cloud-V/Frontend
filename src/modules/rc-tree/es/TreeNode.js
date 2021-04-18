/* eslint-disable */
import _defineProperty from "babel-runtime/helpers/defineProperty";
import _objectWithoutProperties from "babel-runtime/helpers/objectWithoutProperties";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";

import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Animate from "rc-animate";
import toArray from "rc-util/es/Children/toArray";
import { polyfill } from "react-lifecycles-compat";
import { nodeContextTypes } from "./contextTypes";
import {
	getNodeChildren,
	getDataAndAria,
	mapChildren,
	warnOnlyTreeNode
} from "./util";

const ICON_OPEN = "open";
const ICON_CLOSE = "close";
const defaultTitle = "---";

class TreeNode extends Component {
	constructor(props) {
		super(props)

		this.state = {
			dragNodeHighlight: false
		}

		this.getChildContext = this.getChildContext.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.componentDidUpdate = this.componentDidUpdate.bind(this);
		this.isSelectable = this.isSelectable.bind(this);
		this.render = this.render.bind(this);
		this.onSelectorClick = this.onSelectorClick.bind(this);
		this.onSelectorDoubleClick = this.onSelectorDoubleClick.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.onCheck = this.onCheck.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.onContextMenu = this.onContextMenu.bind(this);
		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnter = this.onDragEnter.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
		this.onDragLeave = this.onDragLeave.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.onExpand = this.onExpand.bind(this);
		this.setSelectHandle = this.setSelectHandle.bind(this);
		this.getNodeChildren = this.getNodeChildren.bind(this);
		this.getNodeState = this.getNodeState.bind(this);
		this.isLeaf = this.isLeaf.bind(this);
		this.isDisabled = this.isDisabled.bind(this);
		this.syncLoadData = this.syncLoadData.bind(this);
		this.renderSwitcher = this.renderSwitcher.bind(this);
		this.renderCheckbox = this.renderCheckbox.bind(this);
		this.renderIcon = this.renderIcon.bind(this);
		this.renderSelector = this.renderSelector.bind(this);
		this.renderChildren = this.renderChildren.bind(this);
	}

	getChildContext() {
		return Object.assign({}, this.context, {
			rcTreeNode: {
				// onUpCheckConduct: this.onUpCheckConduct,
			}
		});
	}

	componentDidMount() {
		this.syncLoadData(this.props);
	}
	
	componentDidUpdate() {
		this.syncLoadData(this.props);
	}

	isSelectable() {
		var selectable = this.props.selectable;
		var treeSelectable = this.context.rcTree.selectable;

		// Ignore when selectable is undefined or null

		if (typeof selectable === "boolean") {
			return selectable;
		}

		return treeSelectable;
	}

	render() {
		var loading = this.props.loading;

		let className = this.props.className,
			style = this.props.style,
			dragOver = this.props.dragOver,
			dragOverGapTop = this.props.dragOverGapTop,
			dragOverGapBottom = this.props.dragOverGapBottom,
			isLeaf = this.props.isLeaf,
			expanded = this.props.expanded,
			selected = this.props.selected,
			checked = this.props.checked,
			halfChecked = this.props.halfChecked,
			otherProps = _objectWithoutProperties(this.props, [
				"className",
				"style",
				"dragOver",
				"dragOverGapTop",
				"dragOverGapBottom",
				"isLeaf",
				"expanded",
				"selected",
				"checked",
				"halfChecked"
			]);

		let rcTreeContext = this.context.rcTree || {
			prefixCls: "",
			filterTreeNode: ()=>false,
			draggable: false
		};
		let prefixCls = rcTreeContext.prefixCls;
		let filterTreeNode = rcTreeContext.filterTreeNode;
		let draggable = rcTreeContext.draggable;

		var disabled = this.isDisabled();
		var dataOrAriaAttributeProps = getDataAndAria(otherProps);


		let classNamesObject = {};

		_defineProperty(
			classNamesObject,
			prefixCls + "-treenode-disabled",
			disabled
		);

		_defineProperty(
			classNamesObject,
			prefixCls +
				"-treenode-switcher-" +
				(expanded ? "open" : "close"),
			!isLeaf
		);

		_defineProperty(
			classNamesObject,
			prefixCls + "-treenode-checkbox-checked",
			checked
		);

		_defineProperty(
			classNamesObject,
			prefixCls +
				"-treenode-checkbox-indeterminate",
			halfChecked
		);

		_defineProperty(
			classNamesObject,
			prefixCls + "-treenode-selected",
			selected
		);

		_defineProperty(
			classNamesObject,
			prefixCls + "-treenode-loading",
			loading
		);

		_defineProperty(
			classNamesObject,
			"drag-over",
			!disabled && dragOver
		);

		_defineProperty(
			classNamesObject,
			"drag-over-gap-top",
			!disabled && dragOverGapTop
		);

		_defineProperty(
			classNamesObject,
			"drag-over-gap-bottom",
			!disabled && dragOverGapBottom
		);

		_defineProperty(
			classNamesObject,
			"filter-node",
			filterTreeNode && filterTreeNode(this)
		);

		return React.createElement(
			"li",
			Object.assign({
					className: classNames(
						className,
						classNamesObject
					),
					style: style,

					role: "treeitem",

					onDragEnter: draggable ?
						this.onDragEnter :
						undefined,
					onDragOver: draggable ?
						this.onDragOver :
						undefined,
					onDragLeave: draggable ?
						this.onDragLeave :
						undefined,
					onDrop: draggable ?
						this.onDrop :
						undefined,
					onDragEnd: draggable ?
						this.onDragEnd :
						undefined
				},
				dataOrAriaAttributeProps
			),
			this.renderSwitcher(),
			this.renderCheckbox(),
			this.renderSelector(),
			this.renderChildren()
		);
	}

	onSelectorClick(e) {
		// Click trigger before select/check operation
		var onNodeClick = this.context.rcTree.onNodeClick;

		onNodeClick(e, this);

		if (this.isSelectable()) {
			this.onSelect(e);
		} else {
			this.onCheck(e);
		}
	}

	onSelectorDoubleClick(e) {
		var onNodeDoubleClick = this.context.rcTree.onNodeDoubleClick;
		onNodeDoubleClick(e, this);
	}

	onSelect(e) {
		if (this.isDisabled()) return;

		var onNodeSelect = this.context.rcTree.onNodeSelect;

		e.preventDefault();
		onNodeSelect(e, this);
	}

	onCheck(e) {
		if (this.isDisabled()) return;

		let disableCheckbox = this.props.disableCheckbox,
			checked = this.props.checked;
		let checkable = this.context.rcTree.checkable,
			onNodeCheck = this.context.rcTree.onNodeCheck;

		if (!checkable || disableCheckbox) return;

		e.preventDefault();
		var targetChecked = !checked;
		onNodeCheck(e, this, targetChecked);
	}

	onMouseEnter(e) {
		var onNodeMouseEnter = this.context.rcTree.onNodeMouseEnter;

		onNodeMouseEnter(e, this);
	}

	onMouseLeave(e) {
		var onNodeMouseLeave = this.context.rcTree.onNodeMouseLeave;

		onNodeMouseLeave(e, this);
	}

	onContextMenu(e) {
		var onNodeContextMenu = this.context.rcTree.onNodeContextMenu;

		onNodeContextMenu(e, this);
	}

	onDragStart(e) {
		var onNodeDragStart = this.context.rcTree.onNodeDragStart;

		e.stopPropagation();
		this.setState({
			dragNodeHighlight: true
		});
		onNodeDragStart(e, this);

		try {
			// ie throw error
			// firefox-need-it
			e.dataTransfer.setData("text/plain", "");
		} catch (error) {
			// empty
		}
	}

	onDragEnter(e) {
		var onNodeDragEnter = this.context.rcTree.onNodeDragEnter;

		e.preventDefault();
		e.stopPropagation();
		onNodeDragEnter(e, this);
	}

	onDragOver(e) {
		var onNodeDragOver = this.context.rcTree.onNodeDragOver;

		e.preventDefault();
		e.stopPropagation();
		onNodeDragOver(e, this);
	}

	onDragLeave(e) {
		var onNodeDragLeave = this.context.rcTree.onNodeDragLeave;

		e.stopPropagation();
		onNodeDragLeave(e, this);
	}

	onDragEnd(e) {
		var onNodeDragEnd = this.context.rcTree.onNodeDragEnd;

		e.stopPropagation();
		this.setState({
			dragNodeHighlight: false
		});
		onNodeDragEnd(e, this);
	}

	onDrop(e) {
		var onNodeDrop = this.context.rcTree.onNodeDrop;

		e.preventDefault();
		e.stopPropagation();
		this.setState({
			dragNodeHighlight: false
		});
		onNodeDrop(e, this);
	}

	onExpand(e) {
		var onNodeExpand = this.context.rcTree.onNodeExpand;

		onNodeExpand(e, this);
	}

	setSelectHandle(node) {
		if (this == null || node == null) {
			return;
		}
		this.selectHandle = node;
	}

	getNodeChildren() {
		var children = this.props.children;

		var originList = toArray(children).filter(function(node) {
			return node;
		});
		var targetList = getNodeChildren(originList);

		if (originList.length !== targetList.length) {
			warnOnlyTreeNode();
		}

		return targetList;
	}

	getNodeState() {
		var expanded = this.props.expanded;

		if (this.isLeaf()) {
			return null;
		}

		return expanded ? ICON_OPEN : ICON_CLOSE;
	}

	isLeaf() {
		let isLeaf = this.props.isLeaf,
			loaded = this.props.loaded;
		var loadData = this.context.rcTree.loadData;

		var hasChildren = this.getNodeChildren().length !== 0;

		if (isLeaf === false) {
			return false;
		}

		return (
			isLeaf ||
			(!loadData && !hasChildren) ||
			(loadData && loaded && !hasChildren)
		);
	}

	isDisabled() {
		var disabled = this.props.disabled;
		var treeDisabled = this.context.rcTree.disabled;

		// Follow the logic of Selectable

		if (disabled === false) {
			return false;
		}

		return !!(treeDisabled || disabled);
	}

	syncLoadData(props) {
		var expanded = props.expanded,
			loading = props.loading,
			loaded = props.loaded;
		let loadData = this.context.rcTree.loadData,
			onNodeLoad = this.context.rcTree.onNodeLoad;

		if (loading) return;

		// read from state to avoid loadData at same time
		if (loadData && expanded && !this.isLeaf()) {
			// We needn't reload data when has children in sync logic
			// It's only needed in node expanded
			var hasChildren = this.getNodeChildren().length !== 0;
			if (!hasChildren && !loaded) {
				onNodeLoad(this);
			}
		}
	}

	renderSwitcher() {
		let expanded = this.props.expanded,
			switcherIconFromProps = this.props.switcherIcon;
		let prefixCls = this.context.rcTree.prefixCls,
			switcherIconFromCtx = this.context.rcTree.switcherIcon;

		var switcherIcon = switcherIconFromProps || switcherIconFromCtx;

		if (this.isLeaf()) {
			return React.createElement(
				"span",
				{
					className: classNames(
						prefixCls + "-switcher",
						prefixCls + "-switcher-noop"
					)
				},
				typeof switcherIcon === "function"
					? React.createElement(
							switcherIcon,
							Object.assign({}, this.props, {
								isLeaf: true
							})
					  )
					: switcherIcon
			);
		}

		var switcherCls = classNames(
			prefixCls + "-switcher",
			prefixCls + "-switcher_" + (expanded ? ICON_OPEN : ICON_CLOSE)
		);
		return React.createElement(
			"span",
			{
				onClick: this.onExpand,
				className: switcherCls
			},
			typeof switcherIcon === "function"
				? React.createElement(
						switcherIcon,
						Object.assign({}, this.props, {
							isLeaf: false
						})
				  )
				: switcherIcon
		);
	}

	renderCheckbox() {
		let checked = this.props.checked,
			halfChecked = this.props.halfChecked,
			disableCheckbox = this.props.disableCheckbox;
		let prefixCls = this.context.rcTree.prefixCls,
			checkable = this.context.rcTree.checkable;
		var disabled = this.isDisabled();
		if (
			!checkable ||
			(typeof this.props.checkable !== "undefined" &&
				this.props.checkable == false)
		)
			return null;

		// [Legacy] Custom element should be separate with `checkable` in future
		var $custom = typeof checkable !== "boolean" ? checkable : null;
		return React.createElement(
			"span",
			{
				className: classNames(
					prefixCls + "-checkbox",
					checked && prefixCls + "-checkbox-checked",
					!checked &&
						halfChecked &&
						prefixCls + "-checkbox-indeterminate",
					(disabled || disableCheckbox) &&
						prefixCls + "-checkbox-disabled"
				),
				onClick: this.onCheck
			},
			$custom
		);
	}

	renderIcon() {
		var loading = this.props.loading;
		var prefixCls = this.context.rcTree.prefixCls;

		return React.createElement("span", {
			className: classNames(
				prefixCls + "-iconEle",
				prefixCls + "-icon__" + (this.getNodeState() || "docu"),
				loading && prefixCls + "-icon_loading"
			)
		});
	}

	renderSelector() {
		var dragNodeHighlight = this.state.dragNodeHighlight;
		let title = this.props.title,
			selected = this.props.selected,
			icon = this.props.icon,
			loading = this.props.loading;
		let prefixCls = this.context.rcTree.prefixCls,
			showIcon = this.context.rcTree.showIcon,
			treeIcon = this.context.rcTree.icon,
			draggable = this.context.rcTree.draggable,
			loadData = this.context.rcTree.loadData;

		var disabled = this.isDisabled();

		var wrapClass = prefixCls + "-node-content-wrapper";

		// Icon - Still show loading icon when loading without showIcon
		var $icon = void 0;

		if (showIcon) {
			var currentIcon = icon || treeIcon;

			$icon = currentIcon
				? React.createElement(
						"span",
						{
							className: classNames(
								prefixCls + "-iconEle",
								prefixCls + "-icon__customize"
							)
						},
						typeof currentIcon === "function"
							? React.createElement(
									currentIcon,
									Object.assign({}, this.props)
							  )
							: currentIcon
				  )
				: this.renderIcon();
		} else if (loadData && loading) {
			$icon = this.renderIcon();
		}

		// Title
		var rename = this.props.rename || false;
		var renameTitle = this.props.renameTitle || "";
		var onRenameChange = this.props.onRenameChange || (() => null);
		var onNodeRename = this.props.onNodeRename || (() => null);
		var $title;
		var key = this.props.eventKey || this.props.id;
		if (!rename) {
			$title = React.createElement(
				"span",
				{
					className: prefixCls + "-title"
				},
				title
			);
		} else {
			$title = React.createElement("input", {
				className: prefixCls + "-title form-control tree-rename",
				type: "text",
				value: renameTitle,
				autoFocus: true,
				onBlur: evt => onNodeRename(key, evt.target.value, title),
				onKeyDown: evt => {
					if (evt.keyCode === 27) {
						onNodeRename(key, title, title);
					}
				},
				onKeyPress: evt => {
					if (evt.key === "Enter") {
						onNodeRename(key, evt.target.value, title);
					}
				},
				onChange: onRenameChange
			});
		}

		return React.createElement(
			"span",
			{
				ref: this.setSelectHandle,
				title: typeof title === "string" ? title : "",
				className: classNames(
					"" + wrapClass,
					wrapClass + "-" + (this.getNodeState() || "normal"),
					!disabled &&
						(selected || dragNodeHighlight) &&
						prefixCls + "-node-selected",
					!disabled && draggable && "draggable"
				),
				draggable: (!disabled && draggable) || undefined,
				"aria-grabbed": (!disabled && draggable) || undefined,

				onMouseEnter: this.onMouseEnter,
				onMouseLeave: this.onMouseLeave,
				onContextMenu: this.onContextMenu,
				onClick: this.onSelectorClick,
				onDoubleClick: this.onSelectorDoubleClick,
				onDragStart: draggable ? this.onDragStart : undefined
			},

			$icon,
			$title
		);
	}

	renderChildren() {
		let expanded = this.props.expanded,
			pos = this.props.pos;
		let prefixCls = this.context.rcTree.prefixCls,
			openTransitionName = this.context.rcTree.openTransitionName,
			openAnimation = this.context.rcTree.openAnimation,
			renderTreeNode = this.context.rcTree.renderTreeNode;

		var animProps = {}
		if (openTransitionName) {
			animProps.transitionName = openTransitionName;
		} else if (typeof openAnimation === "object") {
			animProps.animation = Object.assign({}, openAnimation);
		}

		// Children TreeNode
		var nodeList = this.getNodeChildren();

		if (nodeList.length === 0) {
			return null;
		}

		var $children = void 0;
		if (expanded) {
			$children = React.createElement(
				"ul",
				{
					className: classNames(
						prefixCls + "-child-tree",
						expanded && prefixCls + "-child-tree-open"
					),
					"data-expanded": expanded,
					role: "group"
				},
				mapChildren(nodeList, function(node, index) {
					return renderTreeNode(node, index, pos);
				})
			);
		}

		return React.createElement(
			Animate,
			Object.assign({}, animProps, {
				showProp: "data-expanded",
				component: ""
			}),
			$children
		);
	}
}

TreeNode.propTypes = {
	eventKey: PropTypes.string, // Pass by parent `cloneElement`
	prefixCls: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.object,
	root: PropTypes.object,
	onSelect: PropTypes.func,

	// By parent
	expanded: PropTypes.bool,
	selected: PropTypes.bool,
	checked: PropTypes.bool,
	loaded: PropTypes.bool,
	loading: PropTypes.bool,
	halfChecked: PropTypes.bool,
	children: PropTypes.node,
	title: PropTypes.node,
	pos: PropTypes.string,
	dragOver: PropTypes.bool,
	dragOverGapTop: PropTypes.bool,
	dragOverGapBottom: PropTypes.bool,

	// By user
	isLeaf: PropTypes.bool,
	selectable: PropTypes.bool,
	disabled: PropTypes.bool,
	disableCheckbox: PropTypes.bool,
	icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	switcherIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
}
TreeNode.contextTypes = nodeContextTypes;
TreeNode.childContextTypes = nodeContextTypes;
TreeNode.defaultProps = {
	title: defaultTitle
}

TreeNode.isTreeNode = 1;

polyfill(TreeNode);

export default TreeNode;
