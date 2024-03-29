(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["rc-tree"] = factory(require("react"), require("react-dom"));
	else
		root["rc-tree"] = factory(root["React"], root["ReactDOM"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_64__) {
return (
  /******/ (function(modules) { // webpackBootstrap
  /******/ 	// The module cache
  /******/ 	var installedModules = {};
  /******/
  /******/ 	// The require function
  /******/ 	function __webpack_require__(moduleId) {
  /******/
  /******/ 		// Check if module is in cache
  /******/ 		if(installedModules[moduleId]) {
  /******/ 			return installedModules[moduleId].exports;
  /******/ 		}
  /******/ 		// Create a new module (and put it into the cache)
  /******/ 		var module = installedModules[moduleId] = {
  /******/ 			i: moduleId,
  /******/ 			l: false,
  /******/ 			exports: {}
  /******/ 		};
  /******/
  /******/ 		// Execute the module function
  /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  /******/
  /******/ 		// Flag the module as loaded
  /******/ 		module.l = true;
  /******/
  /******/ 		// Return the exports of the module
  /******/ 		return module.exports;
  /******/ 	}
  /******/
  /******/
  /******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	__webpack_require__.m = modules;
  /******/
  /******/ 	// expose the module cache
  /******/ 	__webpack_require__.c = installedModules;
  /******/
  /******/ 	// define getter function for harmony exports
  /******/ 	__webpack_require__.d = function(exports, name, getter) {
  /******/ 		if(!__webpack_require__.o(exports, name)) {
  /******/ 			Object.defineProperty(exports, name, {
  /******/ 				configurable: false,
  /******/ 				enumerable: true,
  /******/ 				get: getter
  /******/ 			});
  /******/ 		}
  /******/ 	};
  /******/
  /******/ 	// getDefaultExport function for compatibility with non-harmony modules
  /******/ 	__webpack_require__.n = function(module) {
  /******/ 		var getter = module && module.__esModule ?
  /******/ 			function getDefault() { return module['default']; } :
  /******/ 			function getModuleExports() { return module; };
  /******/ 		__webpack_require__.d(getter, 'a', getter);
  /******/ 		return getter;
  /******/ 	};
  /******/
  /******/ 	// Object.prototype.hasOwnProperty.call
  /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
  /******/
  /******/ 	// __webpack_public_path__
  /******/ 	__webpack_require__.p = "";
  /******/
  /******/ 	// Load entry module and return exports
  /******/ 	return __webpack_require__(__webpack_require__.s = 67);
  /******/ })
  /************************************************************************/
  /******/ ([
  /* 0 */
  /***/ (function(module, exports) {

  var core = module.exports = { version: '2.5.7' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


  /***/ }),
  /* 1 */
  /***/ (function(module, exports, __webpack_require__) {

  var store = __webpack_require__(35)('wks');
  var uid = __webpack_require__(26);
  var Symbol = __webpack_require__(2).Symbol;
  var USE_SYMBOL = typeof Symbol == 'function';

  var $exports = module.exports = function (name) {
    return store[name] || (store[name] =
      USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
  };

  $exports.store = store;


  /***/ }),
  /* 2 */
  /***/ (function(module, exports) {

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math
    ? window : typeof self != 'undefined' && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


  /***/ }),
  /* 3 */
  /***/ (function(module, exports, __webpack_require__) {

  var anObject = __webpack_require__(9);
  var IE8_DOM_DEFINE = __webpack_require__(46);
  var toPrimitive = __webpack_require__(30);
  var dP = Object.defineProperty;

  exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (IE8_DOM_DEFINE) try {
      return dP(O, P, Attributes);
    } catch (e) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };


  /***/ }),
  /* 4 */
  /***/ (function(module, exports, __webpack_require__) {

  var global = __webpack_require__(2);
  var core = __webpack_require__(0);
  var ctx = __webpack_require__(29);
  var hide = __webpack_require__(8);
  var has = __webpack_require__(6);
  var PROTOTYPE = 'prototype';

  var $export = function (type, name, source) {
    var IS_FORCED = type & $export.F;
    var IS_GLOBAL = type & $export.G;
    var IS_STATIC = type & $export.S;
    var IS_PROTO = type & $export.P;
    var IS_BIND = type & $export.B;
    var IS_WRAP = type & $export.W;
    var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
    var expProto = exports[PROTOTYPE];
    var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
    var key, own, out;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      if (own && has(exports, key)) continue;
      // export native or passed
      out = own ? target[key] : source[key];
      // prevent global pollution for namespaces
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
      // bind timers to global for call from export context
      : IS_BIND && own ? ctx(out, global)
      // wrap global constructors for prevent change them in library
      : IS_WRAP && target[key] == out ? (function (C) {
        var F = function (a, b, c) {
          if (this instanceof C) {
            switch (arguments.length) {
              case 0: return new C();
              case 1: return new C(a);
              case 2: return new C(a, b);
            } return new C(a, b, c);
          } return C.apply(this, arguments);
        };
        F[PROTOTYPE] = C[PROTOTYPE];
        return F;
      // make static versions for prototype methods
      })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
      // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
      if (IS_PROTO) {
        (exports.virtual || (exports.virtual = {}))[key] = out;
        // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
        if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
      }
    }
  };
  // type bitmap
  $export.F = 1;   // forced
  $export.G = 2;   // global
  $export.S = 4;   // static
  $export.P = 8;   // proto
  $export.B = 16;  // bind
  $export.W = 32;  // wrap
  $export.U = 64;  // safe
  $export.R = 128; // real proto method for `library`
  module.exports = $export;


  /***/ }),
  /* 5 */
  /***/ (function(module, exports, __webpack_require__) {

  // Thank's IE8 for his funny defineProperty
  module.exports = !__webpack_require__(15)(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });


  /***/ }),
  /* 6 */
  /***/ (function(module, exports) {

  var hasOwnProperty = {}.hasOwnProperty;
  module.exports = function (it, key) {
    return hasOwnProperty.call(it, key);
  };


  /***/ }),
  /* 7 */
  /***/ (function(module, exports) {

  module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

  /***/ }),
  /* 8 */
  /***/ (function(module, exports, __webpack_require__) {

  var dP = __webpack_require__(3);
  var createDesc = __webpack_require__(16);
  module.exports = __webpack_require__(5) ? function (object, key, value) {
    return dP.f(object, key, createDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };


  /***/ }),
  /* 9 */
  /***/ (function(module, exports, __webpack_require__) {

  var isObject = __webpack_require__(10);
  module.exports = function (it) {
    if (!isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };


  /***/ }),
  /* 10 */
  /***/ (function(module, exports) {

  module.exports = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };


  /***/ }),
  /* 11 */
  /***/ (function(module, exports, __webpack_require__) {

  // to indexed object, toObject with fallback for non-array-like ES3 strings
  var IObject = __webpack_require__(49);
  var defined = __webpack_require__(32);
  module.exports = function (it) {
    return IObject(defined(it));
  };


  /***/ }),
  /* 12 */
  /***/ (function(module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function(process) {/**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  if (process.env.NODE_ENV !== 'production') {
    var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
      Symbol.for &&
      Symbol.for('react.element')) ||
      0xeac7;

    var isValidElement = function(object) {
      return typeof object === 'object' &&
        object !== null &&
        object.$$typeof === REACT_ELEMENT_TYPE;
    };

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    module.exports = __webpack_require__(108)(isValidElement, throwOnDirectAccess);
  } else {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    module.exports = __webpack_require__(111)();
  }

  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

  /***/ }),
  /* 13 */
  /***/ (function(module, exports) {

  // shim for using process in browser
  var process = module.exports = {};

  // cached from whatever global is present so that test runners that stub it
  // don't break things.  But we need to wrap it in a try catch in case it is
  // wrapped in strict mode code which doesn't define any globals.  It's inside a
  // function because try/catches deoptimize in certain engines.

  var cachedSetTimeout;
  var cachedClearTimeout;

  function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
  }
  function defaultClearTimeout () {
      throw new Error('clearTimeout has not been defined');
  }
  (function () {
      try {
          if (typeof setTimeout === 'function') {
              cachedSetTimeout = setTimeout;
          } else {
              cachedSetTimeout = defaultSetTimout;
          }
      } catch (e) {
          cachedSetTimeout = defaultSetTimout;
      }
      try {
          if (typeof clearTimeout === 'function') {
              cachedClearTimeout = clearTimeout;
          } else {
              cachedClearTimeout = defaultClearTimeout;
          }
      } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
      }
  } ())
  function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
      } catch(e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
          } catch(e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
          }
      }


  }
  function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
      } catch (e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
          } catch (e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
          }
      }



  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;

  function cleanUpNextTick() {
      if (!draining || !currentQueue) {
          return;
      }
      draining = false;
      if (currentQueue.length) {
          queue = currentQueue.concat(queue);
      } else {
          queueIndex = -1;
      }
      if (queue.length) {
          drainQueue();
      }
  }

  function drainQueue() {
      if (draining) {
          return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;

      var len = queue.length;
      while(len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
              if (currentQueue) {
                  currentQueue[queueIndex].run();
              }
          }
          queueIndex = -1;
          len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
  }

  process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
          }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
      }
  };

  // v8 likes predictible objects
  function Item(fun, array) {
      this.fun = fun;
      this.array = array;
  }
  Item.prototype.run = function () {
      this.fun.apply(null, this.array);
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = ''; // empty string to avoid regexp issues
  process.versions = {};

  function noop() {}

  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.prependListener = noop;
  process.prependOnceListener = noop;

  process.listeners = function (name) { return [] }

  process.binding = function (name) {
      throw new Error('process.binding is not supported');
  };

  process.cwd = function () { return '/' };
  process.chdir = function (dir) {
      throw new Error('process.chdir is not supported');
  };
  process.umask = function() { return 0; };


  /***/ }),
  /* 14 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  exports.__esModule = true;

  var _assign = __webpack_require__(71);

  var _assign2 = _interopRequireDefault(_assign);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = _assign2.default || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /***/ }),
  /* 15 */
  /***/ (function(module, exports) {

  module.exports = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };


  /***/ }),
  /* 16 */
  /***/ (function(module, exports) {

  module.exports = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };


  /***/ }),
  /* 17 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  exports.__esModule = true;

  exports.default = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  /***/ }),
  /* 18 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  exports.__esModule = true;

  var _defineProperty = __webpack_require__(51);

  var _defineProperty2 = _interopRequireDefault(_defineProperty);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        (0, _defineProperty2.default)(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  /***/ }),
  /* 19 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  exports.__esModule = true;

  var _typeof2 = __webpack_require__(52);

  var _typeof3 = _interopRequireDefault(_typeof2);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
  };

  /***/ }),
  /* 20 */
  /***/ (function(module, exports) {

  module.exports = {};


  /***/ }),
  /* 21 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  exports.__esModule = true;

  var _setPrototypeOf = __webpack_require__(101);

  var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

  var _create = __webpack_require__(105);

  var _create2 = _interopRequireDefault(_create);

  var _typeof2 = __webpack_require__(52);

  var _typeof3 = _interopRequireDefault(_typeof2);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
    }

    subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
  };

  /***/ }),
  /* 22 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */ __webpack_exports__["a"] = toArray;
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


  function toArray(children) {
    var ret = [];
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.forEach(children, function (c) {
      ret.push(c);
    });
    return ret;
  }

  /***/ }),
  /* 23 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return polyfill; });
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  function componentWillMount() {
    // Call this.constructor.gDSFP to support sub-classes.
    var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
    if (state !== null && state !== undefined) {
      this.setState(state);
    }
  }

  function componentWillReceiveProps(nextProps) {
    // Call this.constructor.gDSFP to support sub-classes.
    // Use the setState() updater to ensure state isn't stale in certain edge cases.
    function updater(prevState) {
      var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
      return state !== null && state !== undefined ? state : null;
    }
    // Binding "this" is important for shallow renderer support.
    this.setState(updater.bind(this));
  }

  function componentWillUpdate(nextProps, nextState) {
    try {
      var prevProps = this.props;
      var prevState = this.state;
      this.props = nextProps;
      this.state = nextState;
      this.__reactInternalSnapshotFlag = true;
      this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
        prevProps,
        prevState
      );
    } finally {
      this.props = prevProps;
      this.state = prevState;
    }
  }

  // React may warn about cWM/cWRP/cWU methods being deprecated.
  // Add a flag to suppress these warnings for this special case.
  componentWillMount.__suppressDeprecationWarning = true;
  componentWillReceiveProps.__suppressDeprecationWarning = true;
  componentWillUpdate.__suppressDeprecationWarning = true;

  function polyfill(Component) {
    var prototype = Component.prototype;

    if (!prototype || !prototype.isReactComponent) {
      throw new Error('Can only polyfill class components');
    }

    if (
      typeof Component.getDerivedStateFromProps !== 'function' &&
      typeof prototype.getSnapshotBeforeUpdate !== 'function'
    ) {
      return Component;
    }

    // If new component APIs are defined, "unsafe" lifecycles won't be called.
    // Error if any of these lifecycles are present,
    // Because they would work differently between older and newer (16.3+) versions of React.
    var foundWillMountName = null;
    var foundWillReceivePropsName = null;
    var foundWillUpdateName = null;
    if (typeof prototype.UNSAFE_componentWillMount === 'function') {
      foundWillMountName = 'componentWillMount';
    } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
      foundWillMountName = 'UNSAFE_componentWillMount';
    }
    if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
      foundWillReceivePropsName = 'componentWillReceiveProps';
    } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
      foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
    }
    if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
      foundWillUpdateName = 'componentWillUpdate';
    } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
      foundWillUpdateName = 'UNSAFE_componentWillUpdate';
    }
    if (
      foundWillMountName !== null ||
      foundWillReceivePropsName !== null ||
      foundWillUpdateName !== null
    ) {
      var componentName = Component.displayName || Component.name;
      var newApiName =
        typeof Component.getDerivedStateFromProps === 'function'
          ? 'getDerivedStateFromProps()'
          : 'getSnapshotBeforeUpdate()';

      throw Error(
        'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' +
          componentName +
          ' uses ' +
          newApiName +
          ' but also contains the following legacy lifecycles:' +
          (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') +
          (foundWillReceivePropsName !== null
            ? '\n  ' + foundWillReceivePropsName
            : '') +
          (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') +
          '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' +
          'https://fb.me/react-async-component-lifecycle-hooks'
      );
    }

    // React <= 16.2 does not support static getDerivedStateFromProps.
    // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
    // Newer versions of React will ignore these lifecycles if gDSFP exists.
    if (typeof Component.getDerivedStateFromProps === 'function') {
      prototype.UNSAFE_componentWillMount = componentWillMount;
      prototype.UNSAFE_componentWillReceiveProps = componentWillReceiveProps;
    }

    // React <= 16.2 does not support getSnapshotBeforeUpdate.
    // As a workaround, use cWU to invoke the new lifecycle.
    // Newer versions of React will ignore that lifecycle if gSBU exists.
    if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
      if (typeof prototype.componentDidUpdate !== 'function') {
        throw new Error(
          'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'
        );
      }

      prototype.UNSAFE_componentWillUpdate = componentWillUpdate;

      var componentDidUpdate = prototype.componentDidUpdate;

      prototype.componentDidUpdate = function componentDidUpdatePolyfill(
        prevProps,
        prevState,
        maybeSnapshot
      ) {
        // 16.3+ will not execute our will-update method;
        // It will pass a snapshot value to did-update though.
        // Older versions will require our polyfilled will-update value.
        // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
        // Because for <= 15.x versions this might be a "prevContext" object.
        // We also can't just check "__reactInternalSnapshot",
        // Because get-snapshot might return a falsy value.
        // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
        var snapshot = this.__reactInternalSnapshotFlag
          ? this.__reactInternalSnapshot
          : maybeSnapshot;

        componentDidUpdate.call(this, prevProps, prevState, snapshot);
      };
    }

    return Component;
  }




  /***/ }),
  /* 24 */
  /***/ (function(module, exports, __webpack_require__) {

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
  var $keys = __webpack_require__(48);
  var enumBugKeys = __webpack_require__(36);

  module.exports = Object.keys || function keys(O) {
    return $keys(O, enumBugKeys);
  };


  /***/ }),
  /* 25 */
  /***/ (function(module, exports) {

  module.exports = true;


  /***/ }),
  /* 26 */
  /***/ (function(module, exports) {

  var id = 0;
  var px = Math.random();
  module.exports = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };


  /***/ }),
  /* 27 */
  /***/ (function(module, exports) {

  exports.f = {}.propertyIsEnumerable;


  /***/ }),
  /* 28 */
  /***/ (function(module, exports, __webpack_require__) {

  var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
    Copyright (c) 2017 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  */
  /* global define */

  (function () {
      'use strict';

      var hasOwn = {}.hasOwnProperty;

      function classNames () {
          var classes = [];

          for (var i = 0; i < arguments.length; i++) {
              var arg = arguments[i];
              if (!arg) continue;

              var argType = typeof arg;

              if (argType === 'string' || argType === 'number') {
                  classes.push(arg);
              } else if (Array.isArray(arg) && arg.length) {
                  var inner = classNames.apply(null, arg);
                  if (inner) {
                      classes.push(inner);
                  }
              } else if (argType === 'object') {
                  for (var key in arg) {
                      if (hasOwn.call(arg, key) && arg[key]) {
                          classes.push(key);
                      }
                  }
              }
          }

          return classes.join(' ');
      }

      if (typeof module !== 'undefined' && module.exports) {
          classNames.default = classNames;
          module.exports = classNames;
      } else if (true) {
          // register as 'classnames', consistent with npm package name
          !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
              return classNames;
          }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
                  __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
      } else {
          window.classNames = classNames;
      }
  }());


  /***/ }),
  /* 29 */
  /***/ (function(module, exports, __webpack_require__) {

  // optional / simple context binding
  var aFunction = __webpack_require__(74);
  module.exports = function (fn, that, length) {
    aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };


  /***/ }),
  /* 30 */
  /***/ (function(module, exports, __webpack_require__) {

  // 7.1.1 ToPrimitive(input [, PreferredType])
  var isObject = __webpack_require__(10);
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  module.exports = function (it, S) {
    if (!isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };


  /***/ }),
  /* 31 */
  /***/ (function(module, exports) {

  var toString = {}.toString;

  module.exports = function (it) {
    return toString.call(it).slice(8, -1);
  };


  /***/ }),
  /* 32 */
  /***/ (function(module, exports) {

  // 7.2.1 RequireObjectCoercible(argument)
  module.exports = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };


  /***/ }),
  /* 33 */
  /***/ (function(module, exports) {

  // 7.1.4 ToInteger
  var ceil = Math.ceil;
  var floor = Math.floor;
  module.exports = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };


  /***/ }),
  /* 34 */
  /***/ (function(module, exports, __webpack_require__) {

  var shared = __webpack_require__(35)('keys');
  var uid = __webpack_require__(26);
  module.exports = function (key) {
    return shared[key] || (shared[key] = uid(key));
  };


  /***/ }),
  /* 35 */
  /***/ (function(module, exports, __webpack_require__) {

  var core = __webpack_require__(0);
  var global = __webpack_require__(2);
  var SHARED = '__core-js_shared__';
  var store = global[SHARED] || (global[SHARED] = {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: core.version,
    mode: __webpack_require__(25) ? 'pure' : 'global',
    copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
  });


  /***/ }),
  /* 36 */
  /***/ (function(module, exports) {

  // IE 8- don't enum bug keys
  module.exports = (
    'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
  ).split(',');


  /***/ }),
  /* 37 */
  /***/ (function(module, exports) {

  exports.f = Object.getOwnPropertySymbols;


  /***/ }),
  /* 38 */
  /***/ (function(module, exports, __webpack_require__) {

  // 7.1.13 ToObject(argument)
  var defined = __webpack_require__(32);
  module.exports = function (it) {
    return Object(defined(it));
  };


  /***/ }),
  /* 39 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  exports.__esModule = true;

  var _defineProperty = __webpack_require__(51);

  var _defineProperty2 = _interopRequireDefault(_defineProperty);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = function (obj, key, value) {
    if (key in obj) {
      (0, _defineProperty2.default)(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  /***/ }),
  /* 40 */
  /***/ (function(module, exports, __webpack_require__) {

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  var anObject = __webpack_require__(9);
  var dPs = __webpack_require__(84);
  var enumBugKeys = __webpack_require__(36);
  var IE_PROTO = __webpack_require__(34)('IE_PROTO');
  var Empty = function () { /* empty */ };
  var PROTOTYPE = 'prototype';

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = __webpack_require__(47)('iframe');
    var i = enumBugKeys.length;
    var lt = '<';
    var gt = '>';
    var iframeDocument;
    iframe.style.display = 'none';
    __webpack_require__(85).appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
    return createDict();
  };

  module.exports = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE] = anObject(O);
      result = new Empty();
      Empty[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO] = O;
    } else result = createDict();
    return Properties === undefined ? result : dPs(result, Properties);
  };


  /***/ }),
  /* 41 */
  /***/ (function(module, exports, __webpack_require__) {

  var def = __webpack_require__(3).f;
  var has = __webpack_require__(6);
  var TAG = __webpack_require__(1)('toStringTag');

  module.exports = function (it, tag, stat) {
    if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
  };


  /***/ }),
  /* 42 */
  /***/ (function(module, exports, __webpack_require__) {

  exports.f = __webpack_require__(1);


  /***/ }),
  /* 43 */
  /***/ (function(module, exports, __webpack_require__) {

  var global = __webpack_require__(2);
  var core = __webpack_require__(0);
  var LIBRARY = __webpack_require__(25);
  var wksExt = __webpack_require__(42);
  var defineProperty = __webpack_require__(3).f;
  module.exports = function (name) {
    var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
    if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
  };


  /***/ }),
  /* 44 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */



  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  module.exports = ReactPropTypesSecret;


  /***/ }),
  /* 45 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* unused harmony export getStyleProperty */
  /* harmony export (immutable) */ __webpack_exports__["c"] = getStyleValue;
  /* unused harmony export getVendorPrefixes */
  /* unused harmony export getVendorPrefixedEventName */
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return animationEndName; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return transitionEndName; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return supportTransition; });
  /* harmony export (immutable) */ __webpack_exports__["e"] = mergeChildren;
  /* harmony export (immutable) */ __webpack_exports__["b"] = cloneProps;
  /* harmony export (immutable) */ __webpack_exports__["d"] = getTransitionName;
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_util_es_Children_toArray__ = __webpack_require__(22);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fbjs_lib_ExecutionEnvironment__ = __webpack_require__(129);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fbjs_lib_ExecutionEnvironment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fbjs_lib_ExecutionEnvironment__);



  // =================== Style ====================
  var stylePrefixes = ['-webkit-', '-moz-', '-o-', 'ms-', ''];

  function getStyleProperty(node, name) {
    // old ff need null, https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
    var style = window.getComputedStyle(node, null);
    var ret = '';
    for (var i = 0; i < stylePrefixes.length; i++) {
      ret = style.getPropertyValue(stylePrefixes[i] + name);
      if (ret) {
        break;
      }
    }
    return ret;
  }

  function getStyleValue(node, name) {
    return parseFloat(getStyleProperty(node, name));
  }

  // ================= Transition =================
  // Event wrapper. Copy from react source code
  function makePrefixMap(styleProp, eventName) {
    var prefixes = {};

    prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
    prefixes['Webkit' + styleProp] = 'webkit' + eventName;
    prefixes['Moz' + styleProp] = 'moz' + eventName;
    prefixes['ms' + styleProp] = 'MS' + eventName;
    prefixes['O' + styleProp] = 'o' + eventName.toLowerCase();

    return prefixes;
  }

  function getVendorPrefixes(domSupport, win) {
    var prefixes = {
      animationend: makePrefixMap('Animation', 'AnimationEnd'),
      transitionend: makePrefixMap('Transition', 'TransitionEnd')
    };

    if (domSupport) {
      if (!('AnimationEvent' in win)) {
        delete prefixes.animationend.animation;
      }

      if (!('TransitionEvent' in win)) {
        delete prefixes.transitionend.transition;
      }
    }

    return prefixes;
  }

  var vendorPrefixes = getVendorPrefixes(__WEBPACK_IMPORTED_MODULE_1_fbjs_lib_ExecutionEnvironment__["canUseDOM"], typeof window !== 'undefined' ? window : {});

  var style = {};

  if (__WEBPACK_IMPORTED_MODULE_1_fbjs_lib_ExecutionEnvironment__["canUseDOM"]) {
    style = document.createElement('div').style;
  }

  var prefixedEventNames = {};

  function getVendorPrefixedEventName(eventName) {
    if (prefixedEventNames[eventName]) {
      return prefixedEventNames[eventName];
    }

    var prefixMap = vendorPrefixes[eventName];

    if (prefixMap) {
      var stylePropList = Object.keys(prefixMap);
      var len = stylePropList.length;
      for (var i = 0; i < len; i += 1) {
        var styleProp = stylePropList[i];
        if (Object.prototype.hasOwnProperty.call(prefixMap, styleProp) && styleProp in style) {
          prefixedEventNames[eventName] = prefixMap[styleProp];
          return prefixedEventNames[eventName];
        }
      }
    }

    return '';
  }

  var animationEndName = getVendorPrefixedEventName('animationend');
  var transitionEndName = getVendorPrefixedEventName('transitionend');
  var supportTransition = !!(animationEndName && transitionEndName);

  // ==================== Node ====================
  /**
   * [Legacy] Find the same children in both prev & next list.
   * Insert not find one before the find one, otherwise in the end. For example:
   * - prev: [1,2,3]
   * - next: [2,4]
   * -> [1,2,4,3]
   */
  function mergeChildren(prev, next) {
    var prevList = Object(__WEBPACK_IMPORTED_MODULE_0_rc_util_es_Children_toArray__["a" /* default */])(prev);
    var nextList = Object(__WEBPACK_IMPORTED_MODULE_0_rc_util_es_Children_toArray__["a" /* default */])(next);

    // Skip if is single children
    if (prevList.length === 1 && nextList.length === 1 && prevList[0].key === nextList[0].key) {
      return nextList;
    }

    var mergeList = [];
    var nextChildrenMap = {};
    var missMatchChildrenList = [];

    // Fill matched prev node into next node map
    prevList.forEach(function (prevNode) {
      if (prevNode && nextList.some(function (_ref) {
        var key = _ref.key;
        return key === prevNode.key;
      })) {
        if (missMatchChildrenList.length) {
          nextChildrenMap[prevNode.key] = missMatchChildrenList;
          missMatchChildrenList = [];
        }
      } else {
        missMatchChildrenList.push(prevNode);
      }
    });

    // Insert prev node before the matched next node
    nextList.forEach(function (nextNode) {
      if (nextNode && nextChildrenMap[nextNode.key]) {
        mergeList = mergeList.concat(nextChildrenMap[nextNode.key]);
      }
      mergeList.push(nextNode);
    });

    mergeList = mergeList.concat(missMatchChildrenList);

    return mergeList;
  }

  function cloneProps(props, propList) {
    var newProps = {};
    propList.forEach(function (prop) {
      if (prop in props) {
        newProps[prop] = props[prop];
      }
    });

    return newProps;
  }

  function getTransitionName(transitionName, transitionType) {
    if (!transitionName) return null;

    if (typeof transitionName === 'object') {
      var type = transitionType.replace(/-\w/g, function (match) {
        return match[1].toUpperCase();
      });
      return transitionName[type];
    }

    return transitionName + '-' + transitionType;
  }

  /***/ }),
  /* 46 */
  /***/ (function(module, exports, __webpack_require__) {

  module.exports = !__webpack_require__(5) && !__webpack_require__(15)(function () {
    return Object.defineProperty(__webpack_require__(47)('div'), 'a', { get: function () { return 7; } }).a != 7;
  });


  /***/ }),
  /* 47 */
  /***/ (function(module, exports, __webpack_require__) {

  var isObject = __webpack_require__(10);
  var document = __webpack_require__(2).document;
  // typeof document.createElement is 'object' in old IE
  var is = isObject(document) && isObject(document.createElement);
  module.exports = function (it) {
    return is ? document.createElement(it) : {};
  };


  /***/ }),
  /* 48 */
  /***/ (function(module, exports, __webpack_require__) {

  var has = __webpack_require__(6);
  var toIObject = __webpack_require__(11);
  var arrayIndexOf = __webpack_require__(76)(false);
  var IE_PROTO = __webpack_require__(34)('IE_PROTO');

  module.exports = function (object, names) {
    var O = toIObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
    return result;
  };


  /***/ }),
  /* 49 */
  /***/ (function(module, exports, __webpack_require__) {

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var cof = __webpack_require__(31);
  // eslint-disable-next-line no-prototype-builtins
  module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
  };


  /***/ }),
  /* 50 */
  /***/ (function(module, exports, __webpack_require__) {

  // 7.1.15 ToLength
  var toInteger = __webpack_require__(33);
  var min = Math.min;
  module.exports = function (it) {
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };


  /***/ }),
  /* 51 */
  /***/ (function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(78), __esModule: true };

  /***/ }),
  /* 52 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  exports.__esModule = true;

  var _iterator = __webpack_require__(80);

  var _iterator2 = _interopRequireDefault(_iterator);

  var _symbol = __webpack_require__(91);

  var _symbol2 = _interopRequireDefault(_symbol);

  var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof(obj);
  } : function (obj) {
    return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
  };

  /***/ }),
  /* 53 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $at = __webpack_require__(82)(true);

  // 21.1.3.27 String.prototype[@@iterator]()
  __webpack_require__(54)(String, 'String', function (iterated) {
    this._t = String(iterated); // target
    this._i = 0;                // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var index = this._i;
    var point;
    if (index >= O.length) return { value: undefined, done: true };
    point = $at(O, index);
    this._i += point.length;
    return { value: point, done: false };
  });


  /***/ }),
  /* 54 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var LIBRARY = __webpack_require__(25);
  var $export = __webpack_require__(4);
  var redefine = __webpack_require__(55);
  var hide = __webpack_require__(8);
  var Iterators = __webpack_require__(20);
  var $iterCreate = __webpack_require__(83);
  var setToStringTag = __webpack_require__(41);
  var getPrototypeOf = __webpack_require__(86);
  var ITERATOR = __webpack_require__(1)('iterator');
  var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
  var FF_ITERATOR = '@@iterator';
  var KEYS = 'keys';
  var VALUES = 'values';

  var returnThis = function () { return this; };

  module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    $iterCreate(Constructor, NAME, next);
    var getMethod = function (kind) {
      if (!BUGGY && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS: return function keys() { return new Constructor(this, kind); };
        case VALUES: return function values() { return new Constructor(this, kind); };
      } return function entries() { return new Constructor(this, kind); };
    };
    var TAG = NAME + ' Iterator';
    var DEF_VALUES = DEFAULT == VALUES;
    var VALUES_BUG = false;
    var proto = Base.prototype;
    var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
    var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype;
    // Fix native
    if ($anyNative) {
      IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        setToStringTag(IteratorPrototype, TAG, true);
        // fix for some old engines
        if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
      }
    }
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native && $native.name !== VALUES) {
      VALUES_BUG = true;
      $default = function values() { return $native.call(this); };
    }
    // Define iterator
    if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      hide(proto, ITERATOR, $default);
    }
    // Plug for library
    Iterators[NAME] = $default;
    Iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries
      };
      if (FORCED) for (key in methods) {
        if (!(key in proto)) redefine(proto, key, methods[key]);
      } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };


  /***/ }),
  /* 55 */
  /***/ (function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__(8);


  /***/ }),
  /* 56 */
  /***/ (function(module, exports, __webpack_require__) {

  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
  var $keys = __webpack_require__(48);
  var hiddenKeys = __webpack_require__(36).concat('length', 'prototype');

  exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return $keys(O, hiddenKeys);
  };


  /***/ }),
  /* 57 */
  /***/ (function(module, exports, __webpack_require__) {

  var pIE = __webpack_require__(27);
  var createDesc = __webpack_require__(16);
  var toIObject = __webpack_require__(11);
  var toPrimitive = __webpack_require__(30);
  var has = __webpack_require__(6);
  var IE8_DOM_DEFINE = __webpack_require__(46);
  var gOPD = Object.getOwnPropertyDescriptor;

  exports.f = __webpack_require__(5) ? gOPD : function getOwnPropertyDescriptor(O, P) {
    O = toIObject(O);
    P = toPrimitive(P, true);
    if (IE8_DOM_DEFINE) try {
      return gOPD(O, P);
    } catch (e) { /* empty */ }
    if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
  };


  /***/ }),
  /* 58 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
  /* WEBPACK VAR INJECTION */(function(process) {/**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   */



  /**
   * Similar to invariant but only logs a warning if the condition is not met.
   * This can be used to log issues in development environments in critical
   * paths. Removing the logging code for production environments will keep the
   * same logic and follow the same code paths.
   */

  var warning = function() {};

  if (process.env.NODE_ENV !== 'production') {
    warning = function(condition, format, args) {
      var len = arguments.length;
      args = new Array(len > 2 ? len - 2 : 0);
      for (var key = 2; key < len; key++) {
        args[key - 2] = arguments[key];
      }
      if (format === undefined) {
        throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
          'message argument'
        );
      }

      if (format.length < 10 || (/^[s\W]*$/).test(format)) {
        throw new Error(
          'The warning format should be able to uniquely identify this ' +
          'warning. Please, use a more descriptive format than: ' + format
        );
      }

      if (!condition) {
        var argIndex = 0;
        var message = 'Warning: ' +
          format.replace(/%s/g, function() {
            return args[argIndex++];
          });
        if (typeof console !== 'undefined') {
          console.error(message);
        }
        try {
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch(x) {}
      }
    };
  }

  module.exports = warning;

  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

  /***/ }),
  /* 59 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return treeContextTypes; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return nodeContextTypes; });
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(14);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(12);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);

  /**
   * Webpack has bug for import loop, which is not the same behavior as ES module.
   * When util.js imports the TreeNode for tree generate will cause treeContextTypes be empty.
   */



  /**
   * Thought we still use `cloneElement` to pass `key`,
   * other props can pass with context for future refactor.
   */
  var treeContextTypes = {
    rcTree: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      root: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,

      prefixCls: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
      selectable: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
      showIcon: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
      icon: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func]),
      draggable: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
      checkable: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node]),
      checkStrictly: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
      disabled: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
      openTransitionName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
      openAnimation: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object]),

      loadData: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      filterTreeNode: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      renderTreeNode: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,

      isKeyChecked: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,

      onNodeClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      onNodeDoubleClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      onNodeExpand: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      onNodeSelect: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      onNodeCheck: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      onNodeMouseEnter: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      onNodeMouseLeave: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      onNodeContextMenu: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      onNodeDragStart: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      onNodeDragEnter: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      onNodeDragOver: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      onNodeDragLeave: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      onNodeDragEnd: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      onNodeDrop: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func

      // TODO: Remove this
      // onBatchNodeCheck: PropTypes.func,
      // onCheckConductFinished: PropTypes.func,

      // Tree will store the entities when the treeNode refresh.
      // User can pass the func to add more info to customize the additional info.
      // processTreeEntity: PropTypes.func,
    })
  };

  var nodeContextTypes = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, treeContextTypes, {
    rcTreeNode: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      onUpCheckConduct: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
    })
  });

  /***/ }),
  /* 60 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */ __webpack_exports__["p"] = warnOnlyTreeNode;
  /* harmony export (immutable) */ __webpack_exports__["b"] = arrDel;
  /* harmony export (immutable) */ __webpack_exports__["a"] = arrAdd;
  /* harmony export (immutable) */ __webpack_exports__["o"] = posToArr;
  /* harmony export (immutable) */ __webpack_exports__["l"] = getPosition;
  /* unused harmony export isTreeNode */
  /* harmony export (immutable) */ __webpack_exports__["k"] = getNodeChildren;
  /* unused harmony export isCheckDisabled */
  /* unused harmony export traverseTreeNodes */
  /* harmony export (immutable) */ __webpack_exports__["m"] = mapChildren;
  /* harmony export (immutable) */ __webpack_exports__["j"] = getDragNodesKeys;
  /* harmony export (immutable) */ __webpack_exports__["c"] = calcDropPosition;
  /* harmony export (immutable) */ __webpack_exports__["d"] = calcSelectedKeys;
  /* harmony export (immutable) */ __webpack_exports__["g"] = convertDataToTree;
  /* harmony export (immutable) */ __webpack_exports__["h"] = convertTreeToEntities;
  /* harmony export (immutable) */ __webpack_exports__["n"] = parseCheckedKeys;
  /* harmony export (immutable) */ __webpack_exports__["e"] = conductCheck;
  /* harmony export (immutable) */ __webpack_exports__["f"] = conductExpandParent;
  /* harmony export (immutable) */ __webpack_exports__["i"] = getDataAndAria;
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(61);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(7);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rc_util_es_Children_toArray__ = __webpack_require__(22);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_warning__ = __webpack_require__(58);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_warning__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__TreeNode__ = __webpack_require__(62);






  var DRAG_SIDE_RANGE = 0.25;
  var DRAG_MIN_GAP = 2;

  var onlyTreeNodeWarned = false;

  function warnOnlyTreeNode() {
    if (onlyTreeNodeWarned) return;

    onlyTreeNodeWarned = true;
    __WEBPACK_IMPORTED_MODULE_3_warning___default()(false, 'Tree only accept TreeNode as children.');
  }

  function arrDel(list, value) {
    var clone = list.slice();
    var index = clone.indexOf(value);
    if (index >= 0) {
      clone.splice(index, 1);
    }
    return clone;
  }

  function arrAdd(list, value) {
    var clone = list.slice();
    if (clone.indexOf(value) === -1) {
      clone.push(value);
    }
    return clone;
  }

  function posToArr(pos) {
    return pos.split('-');
  }

  function getPosition(level, index) {
    return level + '-' + index;
  }

  function isTreeNode(node) {
    return node && node.type && node.type.isTreeNode;
  }

  function getNodeChildren(children) {
    return Object(__WEBPACK_IMPORTED_MODULE_2_rc_util_es_Children_toArray__["a" /* default */])(children).filter(isTreeNode);
  }

  function isCheckDisabled(node) {
    var _ref = node.props || {},
        disabled = _ref.disabled,
        disableCheckbox = _ref.disableCheckbox;

    return !!(disabled || disableCheckbox);
  }

  function traverseTreeNodes(treeNodes, callback) {
    function processNode(node, index, parent) {
      var children = node ? node.props.children : treeNodes;
      var pos = node ? getPosition(parent.pos, index) : 0;

      // Filter children
      var childList = getNodeChildren(children);

      // Process node if is not root
      if (node) {
        var data = {
          node: node,
          index: index,
          pos: pos,
          key: node.key || pos,
          parentPos: parent.node ? parent.pos : null
        };

        callback(data);
      }

      // Process children node
      __WEBPACK_IMPORTED_MODULE_1_react__["Children"].forEach(childList, function (subNode, subIndex) {
        processNode(subNode, subIndex, { node: node, pos: pos });
      });
    }

    processNode(null);
  }

  /**
   * Use `rc-util` `toArray` to get the children list which keeps the key.
   * And return single node if children is only one(This can avoid `key` missing check).
   */
  function mapChildren(children, func) {
    var list = Object(__WEBPACK_IMPORTED_MODULE_2_rc_util_es_Children_toArray__["a" /* default */])(children).map(func);
    if (list.length === 1) {
      return list[0];
    }
    return list;
  }

  function getDragNodesKeys(treeNodes, node) {
    var _node$props = node.props,
        eventKey = _node$props.eventKey,
        pos = _node$props.pos;

    var dragNodesKeys = [];

    traverseTreeNodes(treeNodes, function (_ref2) {
      var key = _ref2.key;

      dragNodesKeys.push(key);
    });
    dragNodesKeys.push(eventKey || pos);
    return dragNodesKeys;
  }

  // Only used when drag, not affect SSR.
  function calcDropPosition(event, treeNode) {
    var clientY = event.clientY;

    var _treeNode$selectHandl = treeNode.selectHandle.getBoundingClientRect(),
        top = _treeNode$selectHandl.top,
        bottom = _treeNode$selectHandl.bottom,
        height = _treeNode$selectHandl.height;

    var des = Math.max(height * DRAG_SIDE_RANGE, DRAG_MIN_GAP);

    if (clientY <= top + des) {
      return -1;
    } else if (clientY >= bottom - des) {
      return 1;
    }

    return 0;
  }

  /**
   * Return selectedKeys according with multiple prop
   * @param selectedKeys
   * @param props
   * @returns [string]
   */
  function calcSelectedKeys(selectedKeys, props) {
    if (!selectedKeys) return undefined;

    var multiple = props.multiple;

    if (multiple) {
      return selectedKeys.slice();
    }

    if (selectedKeys.length) {
      return [selectedKeys[0]];
    }
    return selectedKeys;
  }

  /**
   * Since React internal will convert key to string,
   * we need do this to avoid `checkStrictly` use number match
   */
  function keyListToString(keyList) {
    if (!keyList) return keyList;
    return keyList.map(function (key) {
      return String(key);
    });
  }

  var internalProcessProps = function internalProcessProps(props) {
    return props;
  };
  function convertDataToTree(treeData, processer) {
    if (!treeData) return [];

    var _ref3 = processer || {},
        _ref3$processProps = _ref3.processProps,
        processProps = _ref3$processProps === undefined ? internalProcessProps : _ref3$processProps;

    var list = Array.isArray(treeData) ? treeData : [treeData];
    return list.map(function (_ref4) {
      var children = _ref4.children,
          props = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default()(_ref4, ['children']);

      var childrenNodes = convertDataToTree(children, processer);

      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4__TreeNode__["a" /* default */],
        processProps(props),
        childrenNodes
      );
    });
  }

  // TODO: ========================= NEW LOGIC =========================
  /**
   * Calculate treeNodes entities. `processTreeEntity` is used for `rc-tree-select`
   * @param treeNodes
   * @param processTreeEntity  User can customize the entity
   */
  function convertTreeToEntities(treeNodes) {
    var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        initWrapper = _ref5.initWrapper,
        processEntity = _ref5.processEntity,
        onProcessFinished = _ref5.onProcessFinished;

    var posEntities = {};
    var keyEntities = {};
    var wrapper = {
      posEntities: posEntities,
      keyEntities: keyEntities
    };

    if (initWrapper) {
      wrapper = initWrapper(wrapper) || wrapper;
    }

    traverseTreeNodes(treeNodes, function (item) {
      var node = item.node,
          index = item.index,
          pos = item.pos,
          key = item.key,
          parentPos = item.parentPos;

      var entity = { node: node, index: index, key: key, pos: pos };

      posEntities[pos] = entity;
      keyEntities[key] = entity;

      // Fill children
      entity.parent = posEntities[parentPos];
      if (entity.parent) {
        entity.parent.children = entity.parent.children || [];
        entity.parent.children.push(entity);
      }

      if (processEntity) {
        processEntity(entity, wrapper);
      }
    });

    if (onProcessFinished) {
      onProcessFinished(wrapper);
    }

    return wrapper;
  }

  /**
   * Parse `checkedKeys` to { checkedKeys, halfCheckedKeys } style
   */
  function parseCheckedKeys(keys) {
    if (!keys) {
      return null;
    }

    // Convert keys to object format
    var keyProps = void 0;
    if (Array.isArray(keys)) {
      // [Legacy] Follow the api doc
      keyProps = {
        checkedKeys: keys,
        halfCheckedKeys: undefined
      };
    } else if (typeof keys === 'object') {
      keyProps = {
        checkedKeys: keys.checked || undefined,
        halfCheckedKeys: keys.halfChecked || undefined
      };
    } else {
      __WEBPACK_IMPORTED_MODULE_3_warning___default()(false, '`checkedKeys` is not an array or an object');
      return null;
    }

    keyProps.checkedKeys = keyListToString(keyProps.checkedKeys);
    keyProps.halfCheckedKeys = keyListToString(keyProps.halfCheckedKeys);

    return keyProps;
  }

  /**
   * Conduct check state by the keyList. It will conduct up & from the provided key.
   * If the conduct path reach the disabled or already checked / unchecked node will stop conduct.
   * @param keyList       list of keys
   * @param isCheck       is check the node or not
   * @param keyEntities   parsed by `convertTreeToEntities` function in Tree
   * @param checkStatus   Can pass current checked status for process (usually for uncheck operation)
   * @returns {{checkedKeys: [], halfCheckedKeys: []}}
   */
  function conductCheck(keyList, isCheck, keyEntities) {
    var checkStatus = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var checkedKeys = {};
    var halfCheckedKeys = {}; // Record the key has some child checked (include child half checked)

    (checkStatus.checkedKeys || []).forEach(function (key) {
      checkedKeys[key] = true;
    });

    (checkStatus.halfCheckedKeys || []).forEach(function (key) {
      halfCheckedKeys[key] = true;
    });

    // Conduct up
    function conductUp(key) {
      if (checkedKeys[key] === isCheck) return;

      var entity = keyEntities[key];
      if (!entity) return;

      var children = entity.children,
          parent = entity.parent,
          node = entity.node;


      if (isCheckDisabled(node)) return;

      // Check child node checked status
      var everyChildChecked = true;
      var someChildChecked = false; // Child checked or half checked

      (children || []).filter(function (child) {
        return !isCheckDisabled(child.node);
      }).forEach(function (_ref6) {
        var childKey = _ref6.key;

        var childChecked = checkedKeys[childKey];
        var childHalfChecked = halfCheckedKeys[childKey];

        if (childChecked || childHalfChecked) someChildChecked = true;
        if (!childChecked) everyChildChecked = false;
      });

      // Update checked status
      if (isCheck) {
        checkedKeys[key] = everyChildChecked;
      } else {
        checkedKeys[key] = false;
      }
      halfCheckedKeys[key] = someChildChecked;

      if (parent) {
        conductUp(parent.key);
      }
    }

    // Conduct down
    function conductDown(key) {
      if (checkedKeys[key] === isCheck) return;

      var entity = keyEntities[key];
      if (!entity) return;

      var children = entity.children,
          node = entity.node;


      if (isCheckDisabled(node)) return;

      checkedKeys[key] = isCheck;

      (children || []).forEach(function (child) {
        conductDown(child.key);
      });
    }

    function conduct(key) {
      var entity = keyEntities[key];

      if (!entity) {
        __WEBPACK_IMPORTED_MODULE_3_warning___default()(false, '\'' + key + '\' does not exist in the tree.');
        return;
      }

      var children = entity.children,
          parent = entity.parent,
          node = entity.node;

      checkedKeys[key] = isCheck;

      if (isCheckDisabled(node)) return;

      // Conduct down
      (children || []).filter(function (child) {
        return !isCheckDisabled(child.node);
      }).forEach(function (child) {
        conductDown(child.key);
      });

      // Conduct up
      if (parent) {
        conductUp(parent.key);
      }
    }

    (keyList || []).forEach(function (key) {
      conduct(key);
    });

    var checkedKeyList = [];
    var halfCheckedKeyList = [];

    // Fill checked list
    Object.keys(checkedKeys).forEach(function (key) {
      if (checkedKeys[key]) {
        checkedKeyList.push(key);
      }
    });

    // Fill half checked list
    Object.keys(halfCheckedKeys).forEach(function (key) {
      if (!checkedKeys[key] && halfCheckedKeys[key]) {
        halfCheckedKeyList.push(key);
      }
    });

    return {
      checkedKeys: checkedKeyList,
      halfCheckedKeys: halfCheckedKeyList
    };
  }

  /**
   * If user use `autoExpandParent` we should get the list of parent node
   * @param keyList
   * @param keyEntities
   */
  function conductExpandParent(keyList, keyEntities) {
    var expandedKeys = {};

    function conductUp(key) {
      if (expandedKeys[key]) return;

      var entity = keyEntities[key];
      if (!entity) return;

      expandedKeys[key] = true;

      var parent = entity.parent,
          node = entity.node;


      if (isCheckDisabled(node)) return;

      if (parent) {
        conductUp(parent.key);
      }
    }

    (keyList || []).forEach(function (key) {
      conductUp(key);
    });

    return Object.keys(expandedKeys);
  }

  /**
   * Returns only the data- and aria- key/value pairs
   * @param {object} props 
   */
  function getDataAndAria(props) {
    return Object.keys(props).reduce(function (prev, key) {
      if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-') {
        prev[key] = props[key];
      }
      return prev;
    }, {});
  }

  /***/ }),
  /* 61 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  exports.__esModule = true;

  exports.default = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  /***/ }),
  /* 62 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(39);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(61);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__ = __webpack_require__(14);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(17);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(18);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(19);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(21);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(7);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types__ = __webpack_require__(12);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_prop_types__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_classnames__ = __webpack_require__(28);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_classnames__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rc_animate__ = __webpack_require__(112);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rc_util_es_Children_toArray__ = __webpack_require__(22);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_lifecycles_compat__ = __webpack_require__(23);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__contextTypes__ = __webpack_require__(59);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__util__ = __webpack_require__(60);
















  var ICON_OPEN = 'open';
  var ICON_CLOSE = 'close';

  var defaultTitle = '---';

  var TreeNode = function (_React$Component) {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(TreeNode, _React$Component);

    function TreeNode(props) {
      __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, TreeNode);

      var _this = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (TreeNode.__proto__ || Object.getPrototypeOf(TreeNode)).call(this, props));

      _initialiseProps.call(_this);

      _this.state = {
        dragNodeHighlight: false
      };
      return _this;
    }

    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(TreeNode, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, this.context, {
          rcTreeNode: {
            // onUpCheckConduct: this.onUpCheckConduct,
          }
        });
      }

      // Isomorphic needn't load data in server side

    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.syncLoadData(this.props);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        this.syncLoadData(this.props);
      }

      // Disabled item still can be switch


      // Drag usage

    }, {
      key: 'isSelectable',
      value: function isSelectable() {
        var selectable = this.props.selectable;
        var treeSelectable = this.context.rcTree.selectable;

        // Ignore when selectable is undefined or null

        if (typeof selectable === 'boolean') {
          return selectable;
        }

        return treeSelectable;
      }

      // Load data to avoid default expanded tree without data


      // Switcher


      // Checkbox


      // Icon + Title


      // Children list wrapped with `Animation`

    }, {
      key: 'render',
      value: function render() {
        var _classNames;

        var loading = this.props.loading;

        var _props = this.props,
            className = _props.className,
            style = _props.style,
            dragOver = _props.dragOver,
            dragOverGapTop = _props.dragOverGapTop,
            dragOverGapBottom = _props.dragOverGapBottom,
            isLeaf = _props.isLeaf,
            expanded = _props.expanded,
            selected = _props.selected,
            checked = _props.checked,
            halfChecked = _props.halfChecked,
            otherProps = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default()(_props, ['className', 'style', 'dragOver', 'dragOverGapTop', 'dragOverGapBottom', 'isLeaf', 'expanded', 'selected', 'checked', 'halfChecked']);

        var _context$rcTree = this.context.rcTree,
            prefixCls = _context$rcTree.prefixCls,
            filterTreeNode = _context$rcTree.filterTreeNode,
            draggable = _context$rcTree.draggable;

        var disabled = this.isDisabled();
        var dataOrAriaAttributeProps = Object(__WEBPACK_IMPORTED_MODULE_14__util__["i" /* getDataAndAria */])(otherProps);

        return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'li',
          __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({
            className: __WEBPACK_IMPORTED_MODULE_9_classnames___default()(className, (_classNames = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classNames, prefixCls + '-treenode-disabled', disabled), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classNames, prefixCls + '-treenode-switcher-' + (expanded ? 'open' : 'close'), !isLeaf), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classNames, prefixCls + '-treenode-checkbox-checked', checked), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classNames, prefixCls + '-treenode-checkbox-indeterminate', halfChecked), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classNames, prefixCls + '-treenode-selected', selected), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classNames, prefixCls + '-treenode-loading', loading), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classNames, 'drag-over', !disabled && dragOver), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classNames, 'drag-over-gap-top', !disabled && dragOverGapTop), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classNames, 'drag-over-gap-bottom', !disabled && dragOverGapBottom), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classNames, 'filter-node', filterTreeNode && filterTreeNode(this)), _classNames)),

            style: style,

            role: 'treeitem',

            onDragEnter: draggable ? this.onDragEnter : undefined,
            onDragOver: draggable ? this.onDragOver : undefined,
            onDragLeave: draggable ? this.onDragLeave : undefined,
            onDrop: draggable ? this.onDrop : undefined,
            onDragEnd: draggable ? this.onDragEnd : undefined
          }, dataOrAriaAttributeProps),
          this.renderSwitcher(),
          this.renderCheckbox(),
          this.renderSelector(),
          this.renderChildren()
        );
      }
    }]);

    return TreeNode;
  }(__WEBPACK_IMPORTED_MODULE_7_react___default.a.Component);

  TreeNode.propTypes = {
    eventKey: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.string, // Pass by parent `cloneElement`
    prefixCls: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.string,
    className: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.string,
    style: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.object,
    root: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.object,
    onSelect: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,

    // By parent
    expanded: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
    selected: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
    checked: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
    loaded: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
    loading: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
    halfChecked: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
    children: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.node,
    title: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.node,
    pos: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.string,
    dragOver: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
    dragOverGapTop: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
    dragOverGapBottom: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,

    // By user
    isLeaf: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
    selectable: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
    disabled: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
    disableCheckbox: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
    icon: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func]),
    switcherIcon: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func])
  };
  TreeNode.contextTypes = __WEBPACK_IMPORTED_MODULE_13__contextTypes__["a" /* nodeContextTypes */];
  TreeNode.childContextTypes = __WEBPACK_IMPORTED_MODULE_13__contextTypes__["a" /* nodeContextTypes */];
  TreeNode.defaultProps = {
    title: defaultTitle
  };

  var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.onSelectorClick = function (e) {
      // Click trigger before select/check operation
      var onNodeClick = _this2.context.rcTree.onNodeClick;

      onNodeClick(e, _this2);

      if (_this2.isSelectable()) {
        _this2.onSelect(e);
      } else {
        _this2.onCheck(e);
      }
    };

    this.onSelectorDoubleClick = function (e) {
      var onNodeDoubleClick = _this2.context.rcTree.onNodeDoubleClick;

      onNodeDoubleClick(e, _this2);
    };

    this.onSelect = function (e) {
      if (_this2.isDisabled()) return;

      var onNodeSelect = _this2.context.rcTree.onNodeSelect;

      e.preventDefault();
      onNodeSelect(e, _this2);
    };

    this.onCheck = function (e) {
      if (_this2.isDisabled()) return;

      var _props2 = _this2.props,
          disableCheckbox = _props2.disableCheckbox,
          checked = _props2.checked;
      var _context$rcTree2 = _this2.context.rcTree,
          checkable = _context$rcTree2.checkable,
          onNodeCheck = _context$rcTree2.onNodeCheck;


      if (!checkable || disableCheckbox) return;

      e.preventDefault();
      var targetChecked = !checked;
      onNodeCheck(e, _this2, targetChecked);
    };

    this.onMouseEnter = function (e) {
      var onNodeMouseEnter = _this2.context.rcTree.onNodeMouseEnter;

      onNodeMouseEnter(e, _this2);
    };

    this.onMouseLeave = function (e) {
      var onNodeMouseLeave = _this2.context.rcTree.onNodeMouseLeave;

      onNodeMouseLeave(e, _this2);
    };

    this.onContextMenu = function (e) {
      var onNodeContextMenu = _this2.context.rcTree.onNodeContextMenu;

      onNodeContextMenu(e, _this2);
    };

    this.onDragStart = function (e) {
      var onNodeDragStart = _this2.context.rcTree.onNodeDragStart;


      e.stopPropagation();
      _this2.setState({
        dragNodeHighlight: true
      });
      onNodeDragStart(e, _this2);

      try {
        // ie throw error
        // firefox-need-it
        e.dataTransfer.setData('text/plain', '');
      } catch (error) {
        // empty
      }
    };

    this.onDragEnter = function (e) {
      var onNodeDragEnter = _this2.context.rcTree.onNodeDragEnter;


      e.preventDefault();
      e.stopPropagation();
      onNodeDragEnter(e, _this2);
    };

    this.onDragOver = function (e) {
      var onNodeDragOver = _this2.context.rcTree.onNodeDragOver;


      e.preventDefault();
      e.stopPropagation();
      onNodeDragOver(e, _this2);
    };

    this.onDragLeave = function (e) {
      var onNodeDragLeave = _this2.context.rcTree.onNodeDragLeave;


      e.stopPropagation();
      onNodeDragLeave(e, _this2);
    };

    this.onDragEnd = function (e) {
      var onNodeDragEnd = _this2.context.rcTree.onNodeDragEnd;


      e.stopPropagation();
      _this2.setState({
        dragNodeHighlight: false
      });
      onNodeDragEnd(e, _this2);
    };

    this.onDrop = function (e) {
      var onNodeDrop = _this2.context.rcTree.onNodeDrop;


      e.preventDefault();
      e.stopPropagation();
      _this2.setState({
        dragNodeHighlight: false
      });
      onNodeDrop(e, _this2);
    };

    this.onExpand = function (e) {
      var onNodeExpand = _this2.context.rcTree.onNodeExpand;

      onNodeExpand(e, _this2);
    };

    this.setSelectHandle = function (node) {
      _this2.selectHandle = node;
    };

    this.getNodeChildren = function () {
      var children = _this2.props.children;

      var originList = Object(__WEBPACK_IMPORTED_MODULE_11_rc_util_es_Children_toArray__["a" /* default */])(children).filter(function (node) {
        return node;
      });
      var targetList = Object(__WEBPACK_IMPORTED_MODULE_14__util__["k" /* getNodeChildren */])(originList);

      if (originList.length !== targetList.length) {
        Object(__WEBPACK_IMPORTED_MODULE_14__util__["p" /* warnOnlyTreeNode */])();
      }

      return targetList;
    };

    this.getNodeState = function () {
      var expanded = _this2.props.expanded;


      if (_this2.isLeaf()) {
        return null;
      }

      return expanded ? ICON_OPEN : ICON_CLOSE;
    };

    this.isLeaf = function () {
      var _props3 = _this2.props,
          isLeaf = _props3.isLeaf,
          loaded = _props3.loaded;
      var loadData = _this2.context.rcTree.loadData;


      var hasChildren = _this2.getNodeChildren().length !== 0;

      if (isLeaf === false) {
        return false;
      }

      return isLeaf || !loadData && !hasChildren || loadData && loaded && !hasChildren;
    };

    this.isDisabled = function () {
      var disabled = _this2.props.disabled;
      var treeDisabled = _this2.context.rcTree.disabled;

      // Follow the logic of Selectable

      if (disabled === false) {
        return false;
      }

      return !!(treeDisabled || disabled);
    };

    this.syncLoadData = function (props) {
      var expanded = props.expanded,
          loading = props.loading,
          loaded = props.loaded;
      var _context$rcTree3 = _this2.context.rcTree,
          loadData = _context$rcTree3.loadData,
          onNodeLoad = _context$rcTree3.onNodeLoad;


      if (loading) return;

      // read from state to avoid loadData at same time
      if (loadData && expanded && !_this2.isLeaf()) {
        // We needn't reload data when has children in sync logic
        // It's only needed in node expanded
        var hasChildren = _this2.getNodeChildren().length !== 0;
        if (!hasChildren && !loaded) {
          onNodeLoad(_this2);
        }
      }
    };

    this.renderSwitcher = function () {
      var _props4 = _this2.props,
          expanded = _props4.expanded,
          switcherIconFromProps = _props4.switcherIcon;
      var _context$rcTree4 = _this2.context.rcTree,
          prefixCls = _context$rcTree4.prefixCls,
          switcherIconFromCtx = _context$rcTree4.switcherIcon;


      var switcherIcon = switcherIconFromProps || switcherIconFromCtx;

      if (_this2.isLeaf()) {
        return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'span',
          { className: __WEBPACK_IMPORTED_MODULE_9_classnames___default()(prefixCls + '-switcher', prefixCls + '-switcher-noop') },
          typeof switcherIcon === 'function' ? __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(switcherIcon, __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, _this2.props, { isLeaf: true })) : switcherIcon
        );
      }

      var switcherCls = __WEBPACK_IMPORTED_MODULE_9_classnames___default()(prefixCls + '-switcher', prefixCls + '-switcher_' + (expanded ? ICON_OPEN : ICON_CLOSE));
      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        'span',
        { onClick: _this2.onExpand, className: switcherCls },
        typeof switcherIcon === 'function' ? __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(switcherIcon, __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, _this2.props, { isLeaf: false })) : switcherIcon
      );
    };

    this.renderCheckbox = function () {
      var _props5 = _this2.props,
          checked = _props5.checked,
          halfChecked = _props5.halfChecked,
          disableCheckbox = _props5.disableCheckbox;
      var _context$rcTree5 = _this2.context.rcTree,
          prefixCls = _context$rcTree5.prefixCls,
          checkable = _context$rcTree5.checkable;
      var disabled = _this2.isDisabled();

      if (!checkable || _props5.checkable === false) return null;

      // [Legacy] Custom element should be separate with `checkable` in future
      var $custom = typeof checkable !== 'boolean' ? checkable : null;

      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        'span',
        {
          className: __WEBPACK_IMPORTED_MODULE_9_classnames___default()(prefixCls + '-checkbox', checked && prefixCls + '-checkbox-checked', !checked && halfChecked && prefixCls + '-checkbox-indeterminate', (disabled || disableCheckbox) && prefixCls + '-checkbox-disabled'),
          onClick: _this2.onCheck
        },
        $custom
      );
    };

    this.renderIcon = function () {
      var loading = _this2.props.loading;
      var prefixCls = _this2.context.rcTree.prefixCls;


      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('span', {
        className: __WEBPACK_IMPORTED_MODULE_9_classnames___default()(prefixCls + '-iconEle', prefixCls + '-icon__' + (_this2.getNodeState() || 'docu'), loading && prefixCls + '-icon_loading')
      });
    };

    this.renderSelector = function () {
      var dragNodeHighlight = _this2.state.dragNodeHighlight;
      var _props6 = _this2.props,
          title = _props6.title,
          selected = _props6.selected,
          icon = _props6.icon,
          loading = _props6.loading;
      var _context$rcTree6 = _this2.context.rcTree,
          prefixCls = _context$rcTree6.prefixCls,
          showIcon = _context$rcTree6.showIcon,
          treeIcon = _context$rcTree6.icon,
          draggable = _context$rcTree6.draggable,
          loadData = _context$rcTree6.loadData;

      var disabled = _this2.isDisabled();

      var wrapClass = prefixCls + '-node-content-wrapper';

      // Icon - Still show loading icon when loading without showIcon
      var $icon = void 0;

      if (showIcon) {
        var currentIcon = icon || treeIcon;

        $icon = currentIcon ? __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'span',
          {
            className: __WEBPACK_IMPORTED_MODULE_9_classnames___default()(prefixCls + '-iconEle', prefixCls + '-icon__customize')
          },
          typeof currentIcon === 'function' ? __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(currentIcon, __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, _this2.props)) : currentIcon
        ) : _this2.renderIcon();
      } else if (loadData && loading) {
        $icon = _this2.renderIcon();
      }

      // Title
      var $title = __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        'span',
        { className: prefixCls + '-title' },
        title
      );

      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        'span',
        {
          ref: _this2.setSelectHandle,
          title: typeof title === 'string' ? title : '',
          className: __WEBPACK_IMPORTED_MODULE_9_classnames___default()('' + wrapClass, wrapClass + '-' + (_this2.getNodeState() || 'normal'), !disabled && (selected || dragNodeHighlight) && prefixCls + '-node-selected', !disabled && draggable && 'draggable'),
          draggable: !disabled && draggable || undefined,
          'aria-grabbed': !disabled && draggable || undefined,

          onMouseEnter: _this2.onMouseEnter,
          onMouseLeave: _this2.onMouseLeave,
          onContextMenu: _this2.onContextMenu,
          onClick: _this2.onSelectorClick,
          onDoubleClick: _this2.onSelectorDoubleClick,
          onDragStart: draggable ? _this2.onDragStart : undefined
        },
        $icon,
        $title
      );
    };

    this.renderChildren = function () {
      var _props7 = _this2.props,
          expanded = _props7.expanded,
          pos = _props7.pos;
      var _context$rcTree7 = _this2.context.rcTree,
          prefixCls = _context$rcTree7.prefixCls,
          openTransitionName = _context$rcTree7.openTransitionName,
          openAnimation = _context$rcTree7.openAnimation,
          renderTreeNode = _context$rcTree7.renderTreeNode;


      var animProps = {};
      if (openTransitionName) {
        animProps.transitionName = openTransitionName;
      } else if (typeof openAnimation === 'object') {
        animProps.animation = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, openAnimation);
      }

      // Children TreeNode
      var nodeList = _this2.getNodeChildren();

      if (nodeList.length === 0) {
        return null;
      }

      var $children = void 0;
      if (expanded) {
        $children = __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'ul',
          {
            className: __WEBPACK_IMPORTED_MODULE_9_classnames___default()(prefixCls + '-child-tree', expanded && prefixCls + '-child-tree-open'),
            'data-expanded': expanded,
            role: 'group'
          },
          Object(__WEBPACK_IMPORTED_MODULE_14__util__["m" /* mapChildren */])(nodeList, function (node, index) {
            return renderTreeNode(node, index, pos);
          })
        );
      }

      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_10_rc_animate__["a" /* default */],
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, animProps, {
          showProp: 'data-expanded',
          component: ''
        }),
        $children
      );
    };
  };

  TreeNode.isTreeNode = 1;

  Object(__WEBPACK_IMPORTED_MODULE_12_react_lifecycles_compat__["a" /* polyfill */])(TreeNode);

  /* harmony default export */ __webpack_exports__["a"] = (TreeNode);

  /***/ }),
  /* 63 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* unused harmony export genAnimateChild */
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toArray__ = __webpack_require__(116);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toArray__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(17);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(18);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(19);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(21);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(7);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(64);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(12);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_lifecycles_compat__ = __webpack_require__(23);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_classnames__ = __webpack_require__(28);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_classnames__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_component_classes__ = __webpack_require__(126);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_component_classes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_component_classes__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_raf__ = __webpack_require__(66);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_raf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_raf__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__util__ = __webpack_require__(45);















  var clonePropList = ['appeared', 'show', 'exclusive', 'children', 'animation'];

  /**
   * AnimateChild only accept one child node.
   * `transitionSupport` is used for none transition test case.
   * Default we use browser transition event support check.
   */
  function genAnimateChild(transitionSupport) {
    var AnimateChild = function (_React$Component) {
      __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(AnimateChild, _React$Component);

      function AnimateChild() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, AnimateChild);

        // [Legacy] Since old code addListener on the element.
        // To avoid break the behaviour that component not handle animation/transition
        // also can handle the animate, let keep the logic.
        var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (AnimateChild.__proto__ || Object.getPrototypeOf(AnimateChild)).call(this));

        _this.state = {
          child: null,

          eventQueue: [],
          eventActive: false
        };

        _this.onDomUpdated = function () {
          var eventActive = _this.state.eventActive;
          var _this$props = _this.props,
              transitionName = _this$props.transitionName,
              animation = _this$props.animation,
              onChildLeaved = _this$props.onChildLeaved,
              animateKey = _this$props.animateKey;


          var $ele = _this.getDomElement();

          // Skip if dom element not ready
          if (!$ele) return;

          // [Legacy] Add animation/transition event by dom level
          if (transitionSupport && _this.$prevEle !== $ele) {
            _this.cleanDomEvent();

            _this.$prevEle = $ele;
            _this.$prevEle.addEventListener(__WEBPACK_IMPORTED_MODULE_12__util__["a" /* animationEndName */], _this.onMotionEnd);
            _this.$prevEle.addEventListener(__WEBPACK_IMPORTED_MODULE_12__util__["g" /* transitionEndName */], _this.onMotionEnd);
          }

          var currentEvent = _this.getCurrentEvent();
          if (currentEvent.empty) {
            // Additional process the leave event
            if (currentEvent.lastEventType === 'leave') {
              onChildLeaved(animateKey);
            }
            return;
          }

          var eventType = currentEvent.eventType,
              restQueue = currentEvent.restQueue;

          var nodeClasses = __WEBPACK_IMPORTED_MODULE_10_component_classes___default()($ele);

          // [Legacy] Since origin code use js to set `className`.
          // This caused that any component without support `className` can be forced set.
          // Let's keep the logic.
          function legacyAppendClass() {
            if (!transitionSupport) return;

            var basicClassName = Object(__WEBPACK_IMPORTED_MODULE_12__util__["d" /* getTransitionName */])(transitionName, '' + eventType);
            if (basicClassName) nodeClasses.add(basicClassName);

            if (eventActive) {
              var activeClassName = Object(__WEBPACK_IMPORTED_MODULE_12__util__["d" /* getTransitionName */])(transitionName, eventType + '-active');
              if (activeClassName) nodeClasses.add(activeClassName);
            }
          }

          if (_this.currentEvent && _this.currentEvent.type === eventType) {
            legacyAppendClass();
            return;
          }

          // Clear timeout for legacy check
          clearTimeout(_this.timeout);

          // Clean up last event environment
          if (_this.currentEvent && _this.currentEvent.animateObj && _this.currentEvent.animateObj.stop) {
            _this.currentEvent.animateObj.stop();
          }

          // Clean up last transition class
          if (_this.currentEvent) {
            var basicClassName = Object(__WEBPACK_IMPORTED_MODULE_12__util__["d" /* getTransitionName */])(transitionName, '' + _this.currentEvent.type);
            var activeClassName = Object(__WEBPACK_IMPORTED_MODULE_12__util__["d" /* getTransitionName */])(transitionName, _this.currentEvent.type + '-active');
            if (basicClassName) nodeClasses.remove(basicClassName);
            if (activeClassName) nodeClasses.remove(activeClassName);
          }

          // New event come
          _this.currentEvent = {
            type: eventType
          };

          var animationHandler = (animation || {})[eventType];
          // =============== Check if has customize animation ===============
          if (animationHandler) {
            _this.currentEvent.animateObj = animationHandler($ele, function () {
              _this.onMotionEnd({ target: $ele });
            });

            // Do next step if not animate object provided
            if (!_this.currentEvent || !_this.currentEvent.animateObj) {
              _this.nextEvent(restQueue);
            }

            // ==================== Use transition instead ====================
          } else if (transitionSupport) {
            legacyAppendClass();
            if (!eventActive) {
              // Trigger `eventActive` in next frame
              __WEBPACK_IMPORTED_MODULE_11_raf___default()(function () {
                if (_this.currentEvent && _this.currentEvent.type === eventType && !_this._destroy) {
                  _this.setState({ eventActive: true }, function () {
                    // [Legacy] Handle timeout if browser transition event not handle
                    var transitionDelay = Object(__WEBPACK_IMPORTED_MODULE_12__util__["c" /* getStyleValue */])($ele, 'transition-delay') || 0;
                    var transitionDuration = Object(__WEBPACK_IMPORTED_MODULE_12__util__["c" /* getStyleValue */])($ele, 'transition-duration') || 0;
                    var animationDelay = Object(__WEBPACK_IMPORTED_MODULE_12__util__["c" /* getStyleValue */])($ele, 'animation-delay') || 0;
                    var animationDuration = Object(__WEBPACK_IMPORTED_MODULE_12__util__["c" /* getStyleValue */])($ele, 'animation-duration') || 0;
                    var totalTime = Math.max(transitionDuration + transitionDelay, animationDuration + animationDelay);

                    if (totalTime >= 0) {
                      _this.timeout = setTimeout(function () {
                        _this.onMotionEnd({ target: $ele });
                      }, totalTime * 1000);
                    }
                  });
                }
              });
            }

            // ======================= Just next action =======================
          } else {
            _this.onMotionEnd({ target: $ele });
          }
        };

        _this.onMotionEnd = function (_ref) {
          var target = _ref.target;
          var _this$props2 = _this.props,
              transitionName = _this$props2.transitionName,
              onChildLeaved = _this$props2.onChildLeaved,
              animateKey = _this$props2.animateKey,
              onAppear = _this$props2.onAppear,
              onEnter = _this$props2.onEnter,
              onLeave = _this$props2.onLeave,
              onEnd = _this$props2.onEnd;

          var currentEvent = _this.getCurrentEvent();
          if (currentEvent.empty) return;

          // Clear timeout for legacy check
          clearTimeout(_this.timeout);

          var restQueue = currentEvent.restQueue;


          var $ele = _this.getDomElement();
          if (!_this.currentEvent || $ele !== target) return;

          if (_this.currentEvent.animateObj && _this.currentEvent.animateObj.stop) {
            _this.currentEvent.animateObj.stop();
          }

          // [Legacy] Same as above, we need call js to remove the class
          if (transitionSupport && _this.currentEvent) {
            var basicClassName = Object(__WEBPACK_IMPORTED_MODULE_12__util__["d" /* getTransitionName */])(transitionName, _this.currentEvent.type);
            var activeClassName = Object(__WEBPACK_IMPORTED_MODULE_12__util__["d" /* getTransitionName */])(transitionName, _this.currentEvent.type + '-active');

            var nodeClasses = __WEBPACK_IMPORTED_MODULE_10_component_classes___default()($ele);
            if (basicClassName) nodeClasses.remove(basicClassName);
            if (activeClassName) nodeClasses.remove(activeClassName);
          }

          // Additional process the leave event
          if (_this.currentEvent && _this.currentEvent.type === 'leave') {
            onChildLeaved(animateKey);
          }

          // [Legacy] Trigger on event when it's last event
          if (_this.currentEvent && !restQueue.length) {
            if (_this.currentEvent.type === 'appear' && onAppear) {
              onAppear(animateKey);
            } else if (_this.currentEvent.type === 'enter' && onEnter) {
              onEnter(animateKey);
            } else if (_this.currentEvent.type === 'leave' && onLeave) {
              onLeave(animateKey);
            }

            if (onEnd) {
              // OnEnd(key, isShow)
              onEnd(animateKey, _this.currentEvent.type !== 'leave');
            }
          }

          _this.currentEvent = null;

          // Next queue
          _this.nextEvent(restQueue);
        };

        _this.getDomElement = function () {
          if (_this._destroy) return null;
          return __WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.findDOMNode(_this);
        };

        _this.getCurrentEvent = function () {
          var _this$state$eventQueu = _this.state.eventQueue,
              eventQueue = _this$state$eventQueu === undefined ? [] : _this$state$eventQueu;
          var _this$props3 = _this.props,
              animation = _this$props3.animation,
              exclusive = _this$props3.exclusive,
              transitionAppear = _this$props3.transitionAppear,
              transitionEnter = _this$props3.transitionEnter,
              transitionLeave = _this$props3.transitionLeave;


          function hasEventHandler(eventType) {
            return eventType === 'appear' && (transitionAppear || animation.appear) || eventType === 'enter' && (transitionEnter || animation.enter) || eventType === 'leave' && (transitionLeave || animation.leave);
          }

          var event = null;
          // If is exclusive, only check the last event
          if (exclusive) {
            var eventType = eventQueue[eventQueue.length - 1];
            if (hasEventHandler(eventType)) {
              event = {
                eventType: eventType,
                restQueue: []
              };
            }
          } else {
            // Loop check the queue until find match
            var cloneQueue = eventQueue.slice();
            while (cloneQueue.length) {
              var _cloneQueue = cloneQueue,
                  _cloneQueue2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toArray___default()(_cloneQueue),
                  _eventType = _cloneQueue2[0],
                  restQueue = _cloneQueue2.slice(1);

              if (hasEventHandler(_eventType)) {
                event = {
                  eventType: _eventType,
                  restQueue: restQueue
                };
                break;
              }
              cloneQueue = restQueue;
            }
          }

          if (!event) {
            event = {
              empty: true,
              lastEventType: eventQueue[eventQueue.length - 1]
            };
          }

          return event;
        };

        _this.nextEvent = function (restQueue) {
          // Next queue
          if (!_this._destroy) {
            _this.setState({
              eventQueue: restQueue,
              eventActive: false
            });
          }
        };

        _this.cleanDomEvent = function () {
          if (_this.$prevEle && transitionSupport) {
            _this.$prevEle.removeEventListener(__WEBPACK_IMPORTED_MODULE_12__util__["a" /* animationEndName */], _this.onMotionEnd);
            _this.$prevEle.removeEventListener(__WEBPACK_IMPORTED_MODULE_12__util__["g" /* transitionEndName */], _this.onMotionEnd);
          }
        };

        _this.$prevEle = null;

        _this.currentEvent = null;
        _this.timeout = null;
        return _this;
      }

      __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(AnimateChild, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.onDomUpdated();
        }
      }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
          this.onDomUpdated();
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          clearTimeout(this.timeout);
          this._destroy = true;
          this.cleanDomEvent();
        }
      }, {
        key: 'render',
        value: function render() {
          var _state = this.state,
              child = _state.child,
              eventActive = _state.eventActive;
          var _props = this.props,
              showProp = _props.showProp,
              transitionName = _props.transitionName;

          var _ref2 = child.props || {},
              className = _ref2.className;

          var currentEvent = this.getCurrentEvent();

          // Class name
          var connectClassName = transitionSupport && this.currentEvent ? __WEBPACK_IMPORTED_MODULE_9_classnames___default()(className, Object(__WEBPACK_IMPORTED_MODULE_12__util__["d" /* getTransitionName */])(transitionName, this.currentEvent.type), eventActive && Object(__WEBPACK_IMPORTED_MODULE_12__util__["d" /* getTransitionName */])(transitionName, this.currentEvent.type + '-active')) : className;

          var show = true;

          // Keep show when is in transition or has customize animate
          if (transitionSupport && (!currentEvent.empty || this.currentEvent && this.currentEvent.animateObj)) {
            show = true;
          } else {
            show = child.props[showProp];
          }

          // Clone child
          var newChildProps = {
            className: connectClassName
          };

          if (showProp) {
            newChildProps[showProp] = show;
          }

          return __WEBPACK_IMPORTED_MODULE_5_react___default.a.cloneElement(child, newChildProps);
        }
      }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
          var _prevState$prevProps = prevState.prevProps,
              prevProps = _prevState$prevProps === undefined ? {} : _prevState$prevProps;
          var appeared = nextProps.appeared;


          var newState = {
            prevProps: Object(__WEBPACK_IMPORTED_MODULE_12__util__["b" /* cloneProps */])(nextProps, clonePropList)
          };

          function processState(propName, updater) {
            if (prevProps[propName] !== nextProps[propName]) {
              if (updater) {
                updater(nextProps[propName]);
              }
              return true;
            }
            return false;
          }

          function pushEvent(eventType) {
            var eventQueue = newState.eventQueue || prevState.eventQueue.slice();
            var matchIndex = eventQueue.indexOf(eventType);

            // Clean the rest event if eventType match
            if (matchIndex !== -1) {
              eventQueue = eventQueue.slice(0, matchIndex);
            }

            eventQueue.push(eventType);
            newState.eventQueue = eventQueue;
          }

          // Child update. Only set child.
          processState('children', function (child) {
            newState.child = child;
          });

          processState('appeared', function (isAppeared) {
            if (isAppeared) {
              pushEvent('appear');
            }
          });

          // Show update
          processState('show', function (show) {
            if (!appeared) {
              if (show) {
                pushEvent('enter');
              } else {
                pushEvent('leave');
              }
            }
          });

          return newState;
        }
      }]);

      return AnimateChild;
    }(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

    AnimateChild.propTypes = {
      transitionName: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object]),
      transitionAppear: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
      transitionEnter: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
      transitionLeave: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
      exclusive: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
      appeared: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
      showProp: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string,

      animateKey: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.any,
      animation: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object,
      onChildLeaved: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,

      onEnd: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
      onAppear: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
      onEnter: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
      onLeave: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func
    };


    Object(__WEBPACK_IMPORTED_MODULE_8_react_lifecycles_compat__["a" /* polyfill */])(AnimateChild);

    return AnimateChild;
  }

  /* harmony default export */ __webpack_exports__["a"] = (genAnimateChild(__WEBPACK_IMPORTED_MODULE_12__util__["f" /* supportTransition */]));

  /***/ }),
  /* 64 */
  /***/ (function(module, exports) {

  module.exports = __WEBPACK_EXTERNAL_MODULE_64__;

  /***/ }),
  /* 65 */
  /***/ (function(module, exports) {

  module.exports = function(arr, obj){
    if (arr.indexOf) return arr.indexOf(obj);
    for (var i = 0; i < arr.length; ++i) {
      if (arr[i] === obj) return i;
    }
    return -1;
  };

  /***/ }),
  /* 66 */
  /***/ (function(module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(128)
    , root = typeof window === 'undefined' ? global : window
    , vendors = ['moz', 'webkit']
    , suffix = 'AnimationFrame'
    , raf = root['request' + suffix]
    , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

  for(var i = 0; !raf && i < vendors.length; i++) {
    raf = root[vendors[i] + 'Request' + suffix]
    caf = root[vendors[i] + 'Cancel' + suffix]
        || root[vendors[i] + 'CancelRequest' + suffix]
  }

  // Some versions of FF have rAF but not cAF
  if(!raf || !caf) {
    var last = 0
      , id = 0
      , queue = []
      , frameDuration = 1000 / 60

    raf = function(callback) {
      if(queue.length === 0) {
        var _now = now()
          , next = Math.max(0, frameDuration - (_now - last))
        last = next + _now
        setTimeout(function() {
          var cp = queue.slice(0)
          // Clear queue here to prevent
          // callbacks from appending listeners
          // to the current frame's queue
          queue.length = 0
          for(var i = 0; i < cp.length; i++) {
            if(!cp[i].cancelled) {
              try{
                cp[i].callback(last)
              } catch(e) {
                setTimeout(function() { throw e }, 0)
              }
            }
          }
        }, Math.round(next))
      }
      queue.push({
        handle: ++id,
        callback: callback,
        cancelled: false
      })
      return id
    }

    caf = function(handle) {
      for(var i = 0; i < queue.length; i++) {
        if(queue[i].handle === handle) {
          queue[i].cancelled = true
        }
      }
    }
  }

  module.exports = function(fn) {
    // Wrap in a new function to prevent
    // `cancel` potentially being assigned
    // to the native rAF function
    return raf.call(root, fn)
  }
  module.exports.cancel = function() {
    caf.apply(root, arguments)
  }
  module.exports.polyfill = function(object) {
    if (!object) {
      object = root;
    }
    object.requestAnimationFrame = raf
    object.cancelAnimationFrame = caf
  }

  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(127)))

  /***/ }),
  /* 67 */
  /***/ (function(module, exports, __webpack_require__) {

  __webpack_require__(68);
  module.exports = __webpack_require__(69);


  /***/ }),
  /* 68 */
  /***/ (function(module, exports) {

  // removed by extract-text-webpack-plugin

  /***/ }),
  /* 69 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tree__ = __webpack_require__(70);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TreeNode__ = __webpack_require__(62);
  /* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TreeNode", function() { return __WEBPACK_IMPORTED_MODULE_1__TreeNode__["a"]; });



  __WEBPACK_IMPORTED_MODULE_0__Tree__["a" /* default */].TreeNode = __WEBPACK_IMPORTED_MODULE_1__TreeNode__["a" /* default */];


  /* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__Tree__["a" /* default */]);

  /***/ }),
  /* 70 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(14);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(39);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(17);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(18);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(19);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(21);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(7);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(12);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_classnames__ = __webpack_require__(28);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_classnames__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_warning__ = __webpack_require__(58);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_warning__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rc_util_es_Children_toArray__ = __webpack_require__(22);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_lifecycles_compat__ = __webpack_require__(23);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__contextTypes__ = __webpack_require__(59);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__util__ = __webpack_require__(60);
















  var Tree = function (_React$Component) {
    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Tree, _React$Component);

    function Tree() {
      var _ref;

      var _temp, _this, _ret;

      __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Tree);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref = Tree.__proto__ || Object.getPrototypeOf(Tree)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        // TODO: Remove this eslint
        posEntities: {}, // eslint-disable-line react/no-unused-state
        keyEntities: {},

        selectedKeys: [],
        checkedKeys: [],
        halfCheckedKeys: [],
        loadedKeys: [],
        loadingKeys: [],

        treeNode: []
      }, _this.onNodeDragStart = function (event, node) {
        var expandedKeys = _this.state.expandedKeys;
        var onDragStart = _this.props.onDragStart;
        var _node$props = node.props,
            eventKey = _node$props.eventKey,
            children = _node$props.children;


        _this.dragNode = node;

        _this.setState({
          dragNodesKeys: Object(__WEBPACK_IMPORTED_MODULE_13__util__["j" /* getDragNodesKeys */])(children, node),
          expandedKeys: Object(__WEBPACK_IMPORTED_MODULE_13__util__["b" /* arrDel */])(expandedKeys, eventKey)
        });

        if (onDragStart) {
          onDragStart({ event: event, node: node });
        }
      }, _this.onNodeDragEnter = function (event, node) {
        var expandedKeys = _this.state.expandedKeys;
        var onDragEnter = _this.props.onDragEnter;
        var _node$props2 = node.props,
            pos = _node$props2.pos,
            eventKey = _node$props2.eventKey;


        if (!_this.dragNode) return;

        var dropPosition = Object(__WEBPACK_IMPORTED_MODULE_13__util__["c" /* calcDropPosition */])(event, node);

        // Skip if drag node is self
        if (_this.dragNode.props.eventKey === eventKey && dropPosition === 0) {
          _this.setState({
            dragOverNodeKey: '',
            dropPosition: null
          });
          return;
        }

        // Ref: https://github.com/react-component/tree/issues/132
        // Add timeout to let onDragLevel fire before onDragEnter,
        // so that we can clean drag props for onDragLeave node.
        // Macro task for this:
        // https://html.spec.whatwg.org/multipage/webappapis.html#clean-up-after-running-script
        setTimeout(function () {
          // Update drag over node
          _this.setState({
            dragOverNodeKey: eventKey,
            dropPosition: dropPosition
          });

          // Side effect for delay drag
          if (!_this.delayedDragEnterLogic) {
            _this.delayedDragEnterLogic = {};
          }
          Object.keys(_this.delayedDragEnterLogic).forEach(function (key) {
            clearTimeout(_this.delayedDragEnterLogic[key]);
          });
          _this.delayedDragEnterLogic[pos] = setTimeout(function () {
            var newExpandedKeys = Object(__WEBPACK_IMPORTED_MODULE_13__util__["a" /* arrAdd */])(expandedKeys, eventKey);
            _this.setState({
              expandedKeys: newExpandedKeys
            });

            if (onDragEnter) {
              onDragEnter({ event: event, node: node, expandedKeys: newExpandedKeys });
            }
          }, 400);
        }, 0);
      }, _this.onNodeDragOver = function (event, node) {
        var onDragOver = _this.props.onDragOver;
        var eventKey = node.props.eventKey;

        // Update drag position

        if (_this.dragNode && eventKey === _this.state.dragOverNodeKey) {
          var dropPosition = Object(__WEBPACK_IMPORTED_MODULE_13__util__["c" /* calcDropPosition */])(event, node);

          if (dropPosition === _this.state.dropPosition) return;

          _this.setState({
            dropPosition: dropPosition
          });
        }

        if (onDragOver) {
          onDragOver({ event: event, node: node });
        }
      }, _this.onNodeDragLeave = function (event, node) {
        var onDragLeave = _this.props.onDragLeave;


        _this.setState({
          dragOverNodeKey: ''
        });

        if (onDragLeave) {
          onDragLeave({ event: event, node: node });
        }
      }, _this.onNodeDragEnd = function (event, node) {
        var onDragEnd = _this.props.onDragEnd;

        _this.setState({
          dragOverNodeKey: ''
        });
        if (onDragEnd) {
          onDragEnd({ event: event, node: node });
        }

        _this.dragNode = null;
      }, _this.onNodeDrop = function (event, node) {
        var _this$state = _this.state,
            _this$state$dragNodes = _this$state.dragNodesKeys,
            dragNodesKeys = _this$state$dragNodes === undefined ? [] : _this$state$dragNodes,
            dropPosition = _this$state.dropPosition;
        var onDrop = _this.props.onDrop;
        var _node$props3 = node.props,
            eventKey = _node$props3.eventKey,
            pos = _node$props3.pos;


        _this.setState({
          dragOverNodeKey: ''
        });

        if (dragNodesKeys.indexOf(eventKey) !== -1) {
          __WEBPACK_IMPORTED_MODULE_9_warning___default()(false, 'Can not drop to dragNode(include it\'s children node)');
          return;
        }

        var posArr = Object(__WEBPACK_IMPORTED_MODULE_13__util__["o" /* posToArr */])(pos);

        var dropResult = {
          event: event,
          node: node,
          dragNode: _this.dragNode,
          dragNodesKeys: dragNodesKeys.slice(),
          dropPosition: dropPosition + Number(posArr[posArr.length - 1])
        };

        if (dropPosition !== 0) {
          dropResult.dropToGap = true;
        }

        if (onDrop) {
          onDrop(dropResult);
        }

        _this.dragNode = null;
      }, _this.onNodeClick = function (e, treeNode) {
        var onClick = _this.props.onClick;

        if (onClick) {
          onClick(e, treeNode);
        }
      }, _this.onNodeDoubleClick = function (e, treeNode) {
        var onDoubleClick = _this.props.onDoubleClick;

        if (onDoubleClick) {
          onDoubleClick(e, treeNode);
        }
      }, _this.onNodeSelect = function (e, treeNode) {
        var selectedKeys = _this.state.selectedKeys;
        var keyEntities = _this.state.keyEntities;
        var _this$props = _this.props,
            onSelect = _this$props.onSelect,
            multiple = _this$props.multiple;
        var _treeNode$props = treeNode.props,
            selected = _treeNode$props.selected,
            eventKey = _treeNode$props.eventKey;

        var targetSelected = !selected;

        // Update selected keys
        if (!targetSelected) {
          selectedKeys = Object(__WEBPACK_IMPORTED_MODULE_13__util__["b" /* arrDel */])(selectedKeys, eventKey);
        } else if (!multiple) {
          selectedKeys = [eventKey];
        } else {
          selectedKeys = Object(__WEBPACK_IMPORTED_MODULE_13__util__["a" /* arrAdd */])(selectedKeys, eventKey);
        }

        // [Legacy] Not found related usage in doc or upper libs
        var selectedNodes = selectedKeys.map(function (key) {
          var entity = keyEntities[key];
          if (!entity) return null;

          return entity.node;
        }).filter(function (node) {
          return node;
        });

        _this.setUncontrolledState({ selectedKeys: selectedKeys });

        if (onSelect) {
          var eventObj = {
            event: 'select',
            selected: targetSelected,
            node: treeNode,
            selectedNodes: selectedNodes,
            nativeEvent: e.nativeEvent
          };
          onSelect(selectedKeys, eventObj);
        }
      }, _this.onNodeCheck = function (e, treeNode, checked) {
        var _this$state2 = _this.state,
            keyEntities = _this$state2.keyEntities,
            oriCheckedKeys = _this$state2.checkedKeys,
            oriHalfCheckedKeys = _this$state2.halfCheckedKeys;
        var _this$props2 = _this.props,
            checkStrictly = _this$props2.checkStrictly,
            onCheck = _this$props2.onCheck;
        var eventKey = treeNode.props.eventKey;

        // Prepare trigger arguments

        var checkedObj = void 0;
        var eventObj = {
          event: 'check',
          node: treeNode,
          checked: checked,
          nativeEvent: e.nativeEvent
        };

        if (checkStrictly) {
          var checkedKeys = checked ? Object(__WEBPACK_IMPORTED_MODULE_13__util__["a" /* arrAdd */])(oriCheckedKeys, eventKey) : Object(__WEBPACK_IMPORTED_MODULE_13__util__["b" /* arrDel */])(oriCheckedKeys, eventKey);
          var halfCheckedKeys = Object(__WEBPACK_IMPORTED_MODULE_13__util__["b" /* arrDel */])(oriHalfCheckedKeys, eventKey);
          checkedObj = { checked: checkedKeys, halfChecked: halfCheckedKeys };

          eventObj.checkedNodes = checkedKeys.map(function (key) {
            return keyEntities[key];
          }).filter(function (entity) {
            return entity;
          }).map(function (entity) {
            return entity.node;
          });

          _this.setUncontrolledState({ checkedKeys: checkedKeys });
        } else {
          var _conductCheck = Object(__WEBPACK_IMPORTED_MODULE_13__util__["e" /* conductCheck */])([eventKey], checked, keyEntities, {
            checkedKeys: oriCheckedKeys, halfCheckedKeys: oriHalfCheckedKeys
          }),
              _checkedKeys = _conductCheck.checkedKeys,
              _halfCheckedKeys = _conductCheck.halfCheckedKeys;

          checkedObj = _checkedKeys;

          // [Legacy] This is used for `rc-tree-select`
          eventObj.checkedNodes = [];
          eventObj.checkedNodesPositions = [];
          eventObj.halfCheckedKeys = _halfCheckedKeys;

          _checkedKeys.forEach(function (key) {
            var entity = keyEntities[key];
            if (!entity) return;

            var node = entity.node,
                pos = entity.pos;


            eventObj.checkedNodes.push(node);
            eventObj.checkedNodesPositions.push({ node: node, pos: pos });
          });

          _this.setUncontrolledState({
            checkedKeys: _checkedKeys,
            halfCheckedKeys: _halfCheckedKeys
          });
        }

        if (onCheck) {
          onCheck(checkedObj, eventObj);
        }
      }, _this.onNodeLoad = function (treeNode) {
        return new Promise(function (resolve) {
          // We need to get the latest state of loading/loaded keys
          _this.setState(function (_ref2) {
            var _ref2$loadedKeys = _ref2.loadedKeys,
                loadedKeys = _ref2$loadedKeys === undefined ? [] : _ref2$loadedKeys,
                _ref2$loadingKeys = _ref2.loadingKeys,
                loadingKeys = _ref2$loadingKeys === undefined ? [] : _ref2$loadingKeys;
            var _this$props3 = _this.props,
                loadData = _this$props3.loadData,
                onLoad = _this$props3.onLoad;
            var eventKey = treeNode.props.eventKey;


            if (!loadData || loadedKeys.indexOf(eventKey) !== -1 || loadingKeys.indexOf(eventKey) !== -1) {
              // react 15 will warn if return null
              return {};
            }

            // Process load data
            var promise = loadData(treeNode);
            promise.then(function () {
              var newLoadedKeys = Object(__WEBPACK_IMPORTED_MODULE_13__util__["a" /* arrAdd */])(_this.state.loadedKeys, eventKey);
              var newLoadingKeys = Object(__WEBPACK_IMPORTED_MODULE_13__util__["b" /* arrDel */])(_this.state.loadingKeys, eventKey);

              // onLoad should trigger before internal setState to avoid `loadData` trigger twice.
              // https://github.com/ant-design/ant-design/issues/12464
              if (onLoad) {
                var eventObj = {
                  event: 'load',
                  node: treeNode
                };
                onLoad(newLoadedKeys, eventObj);
              }

              _this.setUncontrolledState({
                loadedKeys: newLoadedKeys
              });
              _this.setState({
                loadingKeys: newLoadingKeys
              });

              resolve();
            });

            return {
              loadingKeys: Object(__WEBPACK_IMPORTED_MODULE_13__util__["a" /* arrAdd */])(loadingKeys, eventKey)
            };
          });
        });
      }, _this.onNodeExpand = function (e, treeNode) {
        var expandedKeys = _this.state.expandedKeys;
        var _this$props4 = _this.props,
            onExpand = _this$props4.onExpand,
            loadData = _this$props4.loadData;
        var _treeNode$props2 = treeNode.props,
            eventKey = _treeNode$props2.eventKey,
            expanded = _treeNode$props2.expanded;

        // Update selected keys

        var index = expandedKeys.indexOf(eventKey);
        var targetExpanded = !expanded;

        __WEBPACK_IMPORTED_MODULE_9_warning___default()(expanded && index !== -1 || !expanded && index === -1, 'Expand state not sync with index check');

        if (targetExpanded) {
          expandedKeys = Object(__WEBPACK_IMPORTED_MODULE_13__util__["a" /* arrAdd */])(expandedKeys, eventKey);
        } else {
          expandedKeys = Object(__WEBPACK_IMPORTED_MODULE_13__util__["b" /* arrDel */])(expandedKeys, eventKey);
        }

        _this.setUncontrolledState({ expandedKeys: expandedKeys });

        if (onExpand) {
          onExpand(expandedKeys, {
            node: treeNode,
            expanded: targetExpanded,
            nativeEvent: e.nativeEvent
          });
        }

        // Async Load data
        if (targetExpanded && loadData) {
          var loadPromise = _this.onNodeLoad(treeNode);
          return loadPromise ? loadPromise.then(function () {
            // [Legacy] Refresh logic
            _this.setUncontrolledState({ expandedKeys: expandedKeys });
          }) : null;
        }

        return null;
      }, _this.onNodeMouseEnter = function (event, node) {
        var onMouseEnter = _this.props.onMouseEnter;

        if (onMouseEnter) {
          onMouseEnter({ event: event, node: node });
        }
      }, _this.onNodeMouseLeave = function (event, node) {
        var onMouseLeave = _this.props.onMouseLeave;

        if (onMouseLeave) {
          onMouseLeave({ event: event, node: node });
        }
      }, _this.onNodeContextMenu = function (event, node) {
        var onRightClick = _this.props.onRightClick;

        if (onRightClick) {
          event.preventDefault();
          onRightClick({ event: event, node: node });
        }
      }, _this.setUncontrolledState = function (state) {
        var needSync = false;
        var newState = {};

        Object.keys(state).forEach(function (name) {
          if (name in _this.props) return;

          needSync = true;
          newState[name] = state[name];
        });

        if (needSync) {
          _this.setState(newState);
        }
      }, _this.isKeyChecked = function (key) {
        var _this$state$checkedKe = _this.state.checkedKeys,
            checkedKeys = _this$state$checkedKe === undefined ? [] : _this$state$checkedKe;

        return checkedKeys.indexOf(key) !== -1;
      }, _this.renderTreeNode = function (child, index) {
        var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var _this$state3 = _this.state,
            keyEntities = _this$state3.keyEntities,
            _this$state3$expanded = _this$state3.expandedKeys,
            expandedKeys = _this$state3$expanded === undefined ? [] : _this$state3$expanded,
            _this$state3$selected = _this$state3.selectedKeys,
            selectedKeys = _this$state3$selected === undefined ? [] : _this$state3$selected,
            _this$state3$halfChec = _this$state3.halfCheckedKeys,
            halfCheckedKeys = _this$state3$halfChec === undefined ? [] : _this$state3$halfChec,
            _this$state3$loadedKe = _this$state3.loadedKeys,
            loadedKeys = _this$state3$loadedKe === undefined ? [] : _this$state3$loadedKe,
            _this$state3$loadingK = _this$state3.loadingKeys,
            loadingKeys = _this$state3$loadingK === undefined ? [] : _this$state3$loadingK,
            dragOverNodeKey = _this$state3.dragOverNodeKey,
            dropPosition = _this$state3.dropPosition;

        var pos = Object(__WEBPACK_IMPORTED_MODULE_13__util__["l" /* getPosition */])(level, index);
        var key = child.key || pos;

        if (!keyEntities[key]) {
          Object(__WEBPACK_IMPORTED_MODULE_13__util__["p" /* warnOnlyTreeNode */])();
          return null;
        }

        return __WEBPACK_IMPORTED_MODULE_6_react___default.a.cloneElement(child, {
          key: key,
          eventKey: key,
          expanded: expandedKeys.indexOf(key) !== -1,
          selected: selectedKeys.indexOf(key) !== -1,
          loaded: loadedKeys.indexOf(key) !== -1,
          loading: loadingKeys.indexOf(key) !== -1,
          checked: _this.isKeyChecked(key),
          halfChecked: halfCheckedKeys.indexOf(key) !== -1,
          pos: pos,

          // [Legacy] Drag props
          dragOver: dragOverNodeKey === key && dropPosition === 0,
          dragOverGapTop: dragOverNodeKey === key && dropPosition === -1,
          dragOverGapBottom: dragOverNodeKey === key && dropPosition === 1
        });
      }, _temp), __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
    }

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Tree, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var _props = this.props,
            prefixCls = _props.prefixCls,
            selectable = _props.selectable,
            showIcon = _props.showIcon,
            icon = _props.icon,
            draggable = _props.draggable,
            checkable = _props.checkable,
            checkStrictly = _props.checkStrictly,
            disabled = _props.disabled,
            loadData = _props.loadData,
            filterTreeNode = _props.filterTreeNode,
            openTransitionName = _props.openTransitionName,
            openAnimation = _props.openAnimation,
            switcherIcon = _props.switcherIcon;


        return {
          rcTree: {
            // root: this,

            prefixCls: prefixCls,
            selectable: selectable,
            showIcon: showIcon,
            icon: icon,
            switcherIcon: switcherIcon,
            draggable: draggable,
            checkable: checkable,
            checkStrictly: checkStrictly,
            disabled: disabled,
            openTransitionName: openTransitionName,
            openAnimation: openAnimation,

            loadData: loadData,
            filterTreeNode: filterTreeNode,
            renderTreeNode: this.renderTreeNode,
            isKeyChecked: this.isKeyChecked,

            onNodeClick: this.onNodeClick,
            onNodeDoubleClick: this.onNodeDoubleClick,
            onNodeExpand: this.onNodeExpand,
            onNodeSelect: this.onNodeSelect,
            onNodeCheck: this.onNodeCheck,
            onNodeLoad: this.onNodeLoad,
            onNodeMouseEnter: this.onNodeMouseEnter,
            onNodeMouseLeave: this.onNodeMouseLeave,
            onNodeContextMenu: this.onNodeContextMenu,
            onNodeDragStart: this.onNodeDragStart,
            onNodeDragEnter: this.onNodeDragEnter,
            onNodeDragOver: this.onNodeDragOver,
            onNodeDragLeave: this.onNodeDragLeave,
            onNodeDragEnd: this.onNodeDragEnd,
            onNodeDrop: this.onNodeDrop
          }
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var treeNode = this.state.treeNode;
        var _props2 = this.props,
            prefixCls = _props2.prefixCls,
            className = _props2.className,
            focusable = _props2.focusable,
            showLine = _props2.showLine,
            _props2$tabIndex = _props2.tabIndex,
            tabIndex = _props2$tabIndex === undefined ? 0 : _props2$tabIndex;

        var domProps = Object(__WEBPACK_IMPORTED_MODULE_13__util__["i" /* getDataAndAria */])(this.props);

        if (focusable) {
          domProps.tabIndex = tabIndex;
          domProps.onKeyDown = this.onKeyDown;
        }

        return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'ul',
          __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, domProps, {
            className: __WEBPACK_IMPORTED_MODULE_8_classnames___default()(prefixCls, className, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()({}, prefixCls + '-show-line', showLine)),
            role: 'tree',
            unselectable: 'on'
          }),
          Object(__WEBPACK_IMPORTED_MODULE_13__util__["m" /* mapChildren */])(treeNode, function (node, index) {
            return _this2.renderTreeNode(node, index);
          })
        );
      }
    }], [{
      key: 'getDerivedStateFromProps',
      value: function getDerivedStateFromProps(props, prevState) {
        var prevProps = prevState.prevProps;

        var newState = {
          prevProps: props
        };

        function needSync(name) {
          return !prevProps && name in props || prevProps && prevProps[name] !== props[name];
        }

        // ================== Tree Node ==================
        var treeNode = null;

        // Check if `treeData` or `children` changed and save into the state.
        if (needSync('treeData')) {
          treeNode = Object(__WEBPACK_IMPORTED_MODULE_13__util__["g" /* convertDataToTree */])(props.treeData);
        } else if (needSync('children')) {
          treeNode = Object(__WEBPACK_IMPORTED_MODULE_10_rc_util_es_Children_toArray__["a" /* default */])(props.children);
        }

        // Tree support filter function which will break the tree structure in the vdm.
        // We cache the treeNodes in state so that we can return the treeNode in event trigger.
        if (treeNode) {
          newState.treeNode = treeNode;

          // Calculate the entities data for quick match
          var entitiesMap = Object(__WEBPACK_IMPORTED_MODULE_13__util__["h" /* convertTreeToEntities */])(treeNode);
          newState.posEntities = entitiesMap.posEntities;
          newState.keyEntities = entitiesMap.keyEntities;
        }

        var keyEntities = newState.keyEntities || prevState.keyEntities;

        // ================ expandedKeys =================
        if (needSync('expandedKeys') || prevProps && needSync('autoExpandParent')) {
          newState.expandedKeys = props.autoExpandParent || !prevProps && props.defaultExpandParent ? Object(__WEBPACK_IMPORTED_MODULE_13__util__["f" /* conductExpandParent */])(props.expandedKeys, keyEntities) : props.expandedKeys;
        } else if (!prevProps && props.defaultExpandAll) {
          newState.expandedKeys = Object.keys(keyEntities);
        } else if (!prevProps && props.defaultExpandedKeys) {
          newState.expandedKeys = props.autoExpandParent || props.defaultExpandParent ? Object(__WEBPACK_IMPORTED_MODULE_13__util__["f" /* conductExpandParent */])(props.defaultExpandedKeys, keyEntities) : props.defaultExpandedKeys;
        }

        // ================ selectedKeys =================
        if (props.selectable) {
          if (needSync('selectedKeys')) {
            newState.selectedKeys = Object(__WEBPACK_IMPORTED_MODULE_13__util__["d" /* calcSelectedKeys */])(props.selectedKeys, props);
          } else if (!prevProps && props.defaultSelectedKeys) {
            newState.selectedKeys = Object(__WEBPACK_IMPORTED_MODULE_13__util__["d" /* calcSelectedKeys */])(props.defaultSelectedKeys, props);
          }
        }

        // ================= checkedKeys =================
        if (props.checkable) {
          var checkedKeyEntity = void 0;

          if (needSync('checkedKeys')) {
            checkedKeyEntity = Object(__WEBPACK_IMPORTED_MODULE_13__util__["n" /* parseCheckedKeys */])(props.checkedKeys) || {};
          } else if (!prevProps && props.defaultCheckedKeys) {
            checkedKeyEntity = Object(__WEBPACK_IMPORTED_MODULE_13__util__["n" /* parseCheckedKeys */])(props.defaultCheckedKeys) || {};
          } else if (treeNode) {
            // If treeNode changed, we also need check it
            checkedKeyEntity = {
              checkedKeys: prevState.checkedKeys,
              halfCheckedKeys: prevState.halfCheckedKeys
            };
          }

          if (checkedKeyEntity) {
            var _checkedKeyEntity = checkedKeyEntity,
                _checkedKeyEntity$che = _checkedKeyEntity.checkedKeys,
                checkedKeys = _checkedKeyEntity$che === undefined ? [] : _checkedKeyEntity$che,
                _checkedKeyEntity$hal = _checkedKeyEntity.halfCheckedKeys,
                halfCheckedKeys = _checkedKeyEntity$hal === undefined ? [] : _checkedKeyEntity$hal;


            if (!props.checkStrictly) {
              var conductKeys = Object(__WEBPACK_IMPORTED_MODULE_13__util__["e" /* conductCheck */])(checkedKeys, true, keyEntities);
              checkedKeys = conductKeys.checkedKeys;
              halfCheckedKeys = conductKeys.halfCheckedKeys;
            }

            newState.checkedKeys = checkedKeys;
            newState.halfCheckedKeys = halfCheckedKeys;
          }
        }
        // ================= loadedKeys ==================
        if (needSync('loadedKeys')) {
          newState.loadedKeys = props.loadedKeys;
        }

        return newState;
      }

      /**
       * [Legacy] Select handler is less small than node,
       * so that this will trigger when drag enter node or select handler.
       * This is a little tricky if customize css without padding.
       * Better for use mouse move event to refresh drag state.
       * But let's just keep it to avoid event trigger logic change.
       */


      /**
       * Only update the value which is not in props
       */


      /**
       * [Legacy] Original logic use `key` as tracking clue.
       * We have to use `cloneElement` to pass `key`.
       */

    }]);

    return Tree;
  }(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

  Tree.propTypes = {
    prefixCls: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string,
    className: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string,
    tabIndex: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.number]),
    children: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.any,
    treeData: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.array, // Generate treeNode by children
    showLine: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
    showIcon: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
    icon: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func]),
    focusable: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
    selectable: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
    disabled: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
    multiple: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
    checkable: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool, __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.node]),
    checkStrictly: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
    draggable: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
    defaultExpandParent: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
    autoExpandParent: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
    defaultExpandAll: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
    defaultExpandedKeys: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string),
    expandedKeys: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string),
    defaultCheckedKeys: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string),
    checkedKeys: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.number])), __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object]),
    defaultSelectedKeys: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string),
    selectedKeys: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string),
    onClick: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
    onDoubleClick: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
    onExpand: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
    onCheck: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
    onSelect: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
    onLoad: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
    loadData: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
    loadedKeys: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string),
    onMouseEnter: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
    onMouseLeave: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
    onRightClick: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
    onDragStart: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
    onDragEnter: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
    onDragOver: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
    onDragLeave: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
    onDragEnd: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
    onDrop: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
    filterTreeNode: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
    openTransitionName: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string,
    openAnimation: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object]),
    switcherIcon: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func])
  };
  Tree.childContextTypes = __WEBPACK_IMPORTED_MODULE_12__contextTypes__["b" /* treeContextTypes */];
  Tree.defaultProps = {
    prefixCls: 'rc-tree',
    showLine: false,
    showIcon: true,
    selectable: true,
    multiple: false,
    checkable: false,
    disabled: false,
    checkStrictly: false,
    draggable: false,
    defaultExpandParent: true,
    autoExpandParent: false,
    defaultExpandAll: false,
    defaultExpandedKeys: [],
    defaultCheckedKeys: [],
    defaultSelectedKeys: []
  };


  Object(__WEBPACK_IMPORTED_MODULE_11_react_lifecycles_compat__["a" /* polyfill */])(Tree);

  /* harmony default export */ __webpack_exports__["a"] = (Tree);

  /***/ }),
  /* 71 */
  /***/ (function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(72), __esModule: true };

  /***/ }),
  /* 72 */
  /***/ (function(module, exports, __webpack_require__) {

  __webpack_require__(73);
  module.exports = __webpack_require__(0).Object.assign;


  /***/ }),
  /* 73 */
  /***/ (function(module, exports, __webpack_require__) {

  // 19.1.3.1 Object.assign(target, source)
  var $export = __webpack_require__(4);

  $export($export.S + $export.F, 'Object', { assign: __webpack_require__(75) });


  /***/ }),
  /* 74 */
  /***/ (function(module, exports) {

  module.exports = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };


  /***/ }),
  /* 75 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  // 19.1.2.1 Object.assign(target, source, ...)
  var getKeys = __webpack_require__(24);
  var gOPS = __webpack_require__(37);
  var pIE = __webpack_require__(27);
  var toObject = __webpack_require__(38);
  var IObject = __webpack_require__(49);
  var $assign = Object.assign;

  // should work with symbols and should have deterministic property order (V8 bug)
  module.exports = !$assign || __webpack_require__(15)(function () {
    var A = {};
    var B = {};
    // eslint-disable-next-line no-undef
    var S = Symbol();
    var K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function (k) { B[k] = k; });
    return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars
    var T = toObject(target);
    var aLen = arguments.length;
    var index = 1;
    var getSymbols = gOPS.f;
    var isEnum = pIE.f;
    while (aLen > index) {
      var S = IObject(arguments[index++]);
      var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    } return T;
  } : $assign;


  /***/ }),
  /* 76 */
  /***/ (function(module, exports, __webpack_require__) {

  // false -> Array#indexOf
  // true  -> Array#includes
  var toIObject = __webpack_require__(11);
  var toLength = __webpack_require__(50);
  var toAbsoluteIndex = __webpack_require__(77);
  module.exports = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };


  /***/ }),
  /* 77 */
  /***/ (function(module, exports, __webpack_require__) {

  var toInteger = __webpack_require__(33);
  var max = Math.max;
  var min = Math.min;
  module.exports = function (index, length) {
    index = toInteger(index);
    return index < 0 ? max(index + length, 0) : min(index, length);
  };


  /***/ }),
  /* 78 */
  /***/ (function(module, exports, __webpack_require__) {

  __webpack_require__(79);
  var $Object = __webpack_require__(0).Object;
  module.exports = function defineProperty(it, key, desc) {
    return $Object.defineProperty(it, key, desc);
  };


  /***/ }),
  /* 79 */
  /***/ (function(module, exports, __webpack_require__) {

  var $export = __webpack_require__(4);
  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
  $export($export.S + $export.F * !__webpack_require__(5), 'Object', { defineProperty: __webpack_require__(3).f });


  /***/ }),
  /* 80 */
  /***/ (function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(81), __esModule: true };

  /***/ }),
  /* 81 */
  /***/ (function(module, exports, __webpack_require__) {

  __webpack_require__(53);
  __webpack_require__(87);
  module.exports = __webpack_require__(42).f('iterator');


  /***/ }),
  /* 82 */
  /***/ (function(module, exports, __webpack_require__) {

  var toInteger = __webpack_require__(33);
  var defined = __webpack_require__(32);
  // true  -> String#at
  // false -> String#codePointAt
  module.exports = function (TO_STRING) {
    return function (that, pos) {
      var s = String(defined(that));
      var i = toInteger(pos);
      var l = s.length;
      var a, b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };


  /***/ }),
  /* 83 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var create = __webpack_require__(40);
  var descriptor = __webpack_require__(16);
  var setToStringTag = __webpack_require__(41);
  var IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  __webpack_require__(8)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

  module.exports = function (Constructor, NAME, next) {
    Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
    setToStringTag(Constructor, NAME + ' Iterator');
  };


  /***/ }),
  /* 84 */
  /***/ (function(module, exports, __webpack_require__) {

  var dP = __webpack_require__(3);
  var anObject = __webpack_require__(9);
  var getKeys = __webpack_require__(24);

  module.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = getKeys(Properties);
    var length = keys.length;
    var i = 0;
    var P;
    while (length > i) dP.f(O, P = keys[i++], Properties[P]);
    return O;
  };


  /***/ }),
  /* 85 */
  /***/ (function(module, exports, __webpack_require__) {

  var document = __webpack_require__(2).document;
  module.exports = document && document.documentElement;


  /***/ }),
  /* 86 */
  /***/ (function(module, exports, __webpack_require__) {

  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
  var has = __webpack_require__(6);
  var toObject = __webpack_require__(38);
  var IE_PROTO = __webpack_require__(34)('IE_PROTO');
  var ObjectProto = Object.prototype;

  module.exports = Object.getPrototypeOf || function (O) {
    O = toObject(O);
    if (has(O, IE_PROTO)) return O[IE_PROTO];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto : null;
  };


  /***/ }),
  /* 87 */
  /***/ (function(module, exports, __webpack_require__) {

  __webpack_require__(88);
  var global = __webpack_require__(2);
  var hide = __webpack_require__(8);
  var Iterators = __webpack_require__(20);
  var TO_STRING_TAG = __webpack_require__(1)('toStringTag');

  var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
    'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
    'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
    'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
    'TextTrackList,TouchList').split(',');

  for (var i = 0; i < DOMIterables.length; i++) {
    var NAME = DOMIterables[i];
    var Collection = global[NAME];
    var proto = Collection && Collection.prototype;
    if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = Iterators.Array;
  }


  /***/ }),
  /* 88 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var addToUnscopables = __webpack_require__(89);
  var step = __webpack_require__(90);
  var Iterators = __webpack_require__(20);
  var toIObject = __webpack_require__(11);

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  module.exports = __webpack_require__(54)(Array, 'Array', function (iterated, kind) {
    this._t = toIObject(iterated); // target
    this._i = 0;                   // next index
    this._k = kind;                // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var kind = this._k;
    var index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return step(1);
    }
    if (kind == 'keys') return step(0, index);
    if (kind == 'values') return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  Iterators.Arguments = Iterators.Array;

  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');


  /***/ }),
  /* 89 */
  /***/ (function(module, exports) {

  module.exports = function () { /* empty */ };


  /***/ }),
  /* 90 */
  /***/ (function(module, exports) {

  module.exports = function (done, value) {
    return { value: value, done: !!done };
  };


  /***/ }),
  /* 91 */
  /***/ (function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(92), __esModule: true };

  /***/ }),
  /* 92 */
  /***/ (function(module, exports, __webpack_require__) {

  __webpack_require__(93);
  __webpack_require__(98);
  __webpack_require__(99);
  __webpack_require__(100);
  module.exports = __webpack_require__(0).Symbol;


  /***/ }),
  /* 93 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  // ECMAScript 6 symbols shim
  var global = __webpack_require__(2);
  var has = __webpack_require__(6);
  var DESCRIPTORS = __webpack_require__(5);
  var $export = __webpack_require__(4);
  var redefine = __webpack_require__(55);
  var META = __webpack_require__(94).KEY;
  var $fails = __webpack_require__(15);
  var shared = __webpack_require__(35);
  var setToStringTag = __webpack_require__(41);
  var uid = __webpack_require__(26);
  var wks = __webpack_require__(1);
  var wksExt = __webpack_require__(42);
  var wksDefine = __webpack_require__(43);
  var enumKeys = __webpack_require__(95);
  var isArray = __webpack_require__(96);
  var anObject = __webpack_require__(9);
  var isObject = __webpack_require__(10);
  var toIObject = __webpack_require__(11);
  var toPrimitive = __webpack_require__(30);
  var createDesc = __webpack_require__(16);
  var _create = __webpack_require__(40);
  var gOPNExt = __webpack_require__(97);
  var $GOPD = __webpack_require__(57);
  var $DP = __webpack_require__(3);
  var $keys = __webpack_require__(24);
  var gOPD = $GOPD.f;
  var dP = $DP.f;
  var gOPN = gOPNExt.f;
  var $Symbol = global.Symbol;
  var $JSON = global.JSON;
  var _stringify = $JSON && $JSON.stringify;
  var PROTOTYPE = 'prototype';
  var HIDDEN = wks('_hidden');
  var TO_PRIMITIVE = wks('toPrimitive');
  var isEnum = {}.propertyIsEnumerable;
  var SymbolRegistry = shared('symbol-registry');
  var AllSymbols = shared('symbols');
  var OPSymbols = shared('op-symbols');
  var ObjectProto = Object[PROTOTYPE];
  var USE_NATIVE = typeof $Symbol == 'function';
  var QObject = global.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDesc = DESCRIPTORS && $fails(function () {
    return _create(dP({}, 'a', {
      get: function () { return dP(this, 'a', { value: 7 }).a; }
    })).a != 7;
  }) ? function (it, key, D) {
    var protoDesc = gOPD(ObjectProto, key);
    if (protoDesc) delete ObjectProto[key];
    dP(it, key, D);
    if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
  } : dP;

  var wrap = function (tag) {
    var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
    sym._k = tag;
    return sym;
  };

  var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    return it instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(it, key, D) {
    if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
    anObject(it);
    key = toPrimitive(key, true);
    anObject(D);
    if (has(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
        D = _create(D, { enumerable: createDesc(0, false) });
      } return setSymbolDesc(it, key, D);
    } return dP(it, key, D);
  };
  var $defineProperties = function defineProperties(it, P) {
    anObject(it);
    var keys = enumKeys(P = toIObject(P));
    var i = 0;
    var l = keys.length;
    var key;
    while (l > i) $defineProperty(it, key = keys[i++], P[key]);
    return it;
  };
  var $create = function create(it, P) {
    return P === undefined ? _create(it) : $defineProperties(_create(it), P);
  };
  var $propertyIsEnumerable = function propertyIsEnumerable(key) {
    var E = isEnum.call(this, key = toPrimitive(key, true));
    if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
    return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
  };
  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    it = toIObject(it);
    key = toPrimitive(key, true);
    if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
    var D = gOPD(it, key);
    if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
    return D;
  };
  var $getOwnPropertyNames = function getOwnPropertyNames(it) {
    var names = gOPN(toIObject(it));
    var result = [];
    var i = 0;
    var key;
    while (names.length > i) {
      if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
    } return result;
  };
  var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
    var IS_OP = it === ObjectProto;
    var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
    var result = [];
    var i = 0;
    var key;
    while (names.length > i) {
      if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
    } return result;
  };

  // 19.4.1.1 Symbol([description])
  if (!USE_NATIVE) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
      var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
      var $set = function (value) {
        if (this === ObjectProto) $set.call(OPSymbols, value);
        if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, createDesc(1, value));
      };
      if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
      return wrap(tag);
    };
    redefine($Symbol[PROTOTYPE], 'toString', function toString() {
      return this._k;
    });

    $GOPD.f = $getOwnPropertyDescriptor;
    $DP.f = $defineProperty;
    __webpack_require__(56).f = gOPNExt.f = $getOwnPropertyNames;
    __webpack_require__(27).f = $propertyIsEnumerable;
    __webpack_require__(37).f = $getOwnPropertySymbols;

    if (DESCRIPTORS && !__webpack_require__(25)) {
      redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
    }

    wksExt.f = function (name) {
      return wrap(wks(name));
    };
  }

  $export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

  for (var es6Symbols = (
    // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
  ).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

  for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

  $export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
    // 19.4.2.1 Symbol.for(key)
    'for': function (key) {
      return has(SymbolRegistry, key += '')
        ? SymbolRegistry[key]
        : SymbolRegistry[key] = $Symbol(key);
    },
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
      for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
    },
    useSetter: function () { setter = true; },
    useSimple: function () { setter = false; }
  });

  $export($export.S + $export.F * !USE_NATIVE, 'Object', {
    // 19.1.2.2 Object.create(O [, Properties])
    create: $create,
    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
    defineProperty: $defineProperty,
    // 19.1.2.3 Object.defineProperties(O, Properties)
    defineProperties: $defineProperties,
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: $getOwnPropertyNames,
    // 19.1.2.8 Object.getOwnPropertySymbols(O)
    getOwnPropertySymbols: $getOwnPropertySymbols
  });

  // 24.3.2 JSON.stringify(value [, replacer [, space]])
  $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
    var S = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    // WebKit converts symbol values to JSON as null
    // V8 throws on boxed symbols
    return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
  })), 'JSON', {
    stringify: function stringify(it) {
      var args = [it];
      var i = 1;
      var replacer, $replacer;
      while (arguments.length > i) args.push(arguments[i++]);
      $replacer = replacer = args[1];
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return _stringify.apply($JSON, args);
    }
  });

  // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
  $Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(8)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
  // 19.4.3.5 Symbol.prototype[@@toStringTag]
  setToStringTag($Symbol, 'Symbol');
  // 20.2.1.9 Math[@@toStringTag]
  setToStringTag(Math, 'Math', true);
  // 24.3.3 JSON[@@toStringTag]
  setToStringTag(global.JSON, 'JSON', true);


  /***/ }),
  /* 94 */
  /***/ (function(module, exports, __webpack_require__) {

  var META = __webpack_require__(26)('meta');
  var isObject = __webpack_require__(10);
  var has = __webpack_require__(6);
  var setDesc = __webpack_require__(3).f;
  var id = 0;
  var isExtensible = Object.isExtensible || function () {
    return true;
  };
  var FREEZE = !__webpack_require__(15)(function () {
    return isExtensible(Object.preventExtensions({}));
  });
  var setMeta = function (it) {
    setDesc(it, META, { value: {
      i: 'O' + ++id, // object ID
      w: {}          // weak collections IDs
    } });
  };
  var fastKey = function (it, create) {
    // return primitive with prefix
    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!has(it, META)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMeta(it);
    // return object ID
    } return it[META].i;
  };
  var getWeak = function (it, create) {
    if (!has(it, META)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMeta(it);
    // return hash weak collections IDs
    } return it[META].w;
  };
  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
    return it;
  };
  var meta = module.exports = {
    KEY: META,
    NEED: false,
    fastKey: fastKey,
    getWeak: getWeak,
    onFreeze: onFreeze
  };


  /***/ }),
  /* 95 */
  /***/ (function(module, exports, __webpack_require__) {

  // all enumerable object keys, includes symbols
  var getKeys = __webpack_require__(24);
  var gOPS = __webpack_require__(37);
  var pIE = __webpack_require__(27);
  module.exports = function (it) {
    var result = getKeys(it);
    var getSymbols = gOPS.f;
    if (getSymbols) {
      var symbols = getSymbols(it);
      var isEnum = pIE.f;
      var i = 0;
      var key;
      while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
    } return result;
  };


  /***/ }),
  /* 96 */
  /***/ (function(module, exports, __webpack_require__) {

  // 7.2.2 IsArray(argument)
  var cof = __webpack_require__(31);
  module.exports = Array.isArray || function isArray(arg) {
    return cof(arg) == 'Array';
  };


  /***/ }),
  /* 97 */
  /***/ (function(module, exports, __webpack_require__) {

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  var toIObject = __webpack_require__(11);
  var gOPN = __webpack_require__(56).f;
  var toString = {}.toString;

  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return gOPN(it);
    } catch (e) {
      return windowNames.slice();
    }
  };

  module.exports.f = function getOwnPropertyNames(it) {
    return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
  };


  /***/ }),
  /* 98 */
  /***/ (function(module, exports) {



  /***/ }),
  /* 99 */
  /***/ (function(module, exports, __webpack_require__) {

  __webpack_require__(43)('asyncIterator');


  /***/ }),
  /* 100 */
  /***/ (function(module, exports, __webpack_require__) {

  __webpack_require__(43)('observable');


  /***/ }),
  /* 101 */
  /***/ (function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(102), __esModule: true };

  /***/ }),
  /* 102 */
  /***/ (function(module, exports, __webpack_require__) {

  __webpack_require__(103);
  module.exports = __webpack_require__(0).Object.setPrototypeOf;


  /***/ }),
  /* 103 */
  /***/ (function(module, exports, __webpack_require__) {

  // 19.1.3.19 Object.setPrototypeOf(O, proto)
  var $export = __webpack_require__(4);
  $export($export.S, 'Object', { setPrototypeOf: __webpack_require__(104).set });


  /***/ }),
  /* 104 */
  /***/ (function(module, exports, __webpack_require__) {

  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */
  var isObject = __webpack_require__(10);
  var anObject = __webpack_require__(9);
  var check = function (O, proto) {
    anObject(O);
    if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
  };
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
      function (test, buggy, set) {
        try {
          set = __webpack_require__(29)(Function.call, __webpack_require__(57).f(Object.prototype, '__proto__').set, 2);
          set(test, []);
          buggy = !(test instanceof Array);
        } catch (e) { buggy = true; }
        return function setPrototypeOf(O, proto) {
          check(O, proto);
          if (buggy) O.__proto__ = proto;
          else set(O, proto);
          return O;
        };
      }({}, false) : undefined),
    check: check
  };


  /***/ }),
  /* 105 */
  /***/ (function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(106), __esModule: true };

  /***/ }),
  /* 106 */
  /***/ (function(module, exports, __webpack_require__) {

  __webpack_require__(107);
  var $Object = __webpack_require__(0).Object;
  module.exports = function create(P, D) {
    return $Object.create(P, D);
  };


  /***/ }),
  /* 107 */
  /***/ (function(module, exports, __webpack_require__) {

  var $export = __webpack_require__(4);
  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  $export($export.S, 'Object', { create: __webpack_require__(40) });


  /***/ }),
  /* 108 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
  /* WEBPACK VAR INJECTION */(function(process) {/**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */



  var assign = __webpack_require__(109);

  var ReactPropTypesSecret = __webpack_require__(44);
  var checkPropTypes = __webpack_require__(110);

  var printWarning = function() {};

  if (process.env.NODE_ENV !== 'production') {
    printWarning = function(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }

  function emptyFunctionThatReturnsNull() {
    return null;
  }

  module.exports = function(isValidElement, throwOnDirectAccess) {
    /* global Symbol */
    var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

    /**
     * Returns the iterator method function contained on the iterable object.
     *
     * Be sure to invoke the function with the iterable as context:
     *
     *     var iteratorFn = getIteratorFn(myIterable);
     *     if (iteratorFn) {
     *       var iterator = iteratorFn.call(myIterable);
     *       ...
     *     }
     *
     * @param {?object} maybeIterable
     * @return {?function}
     */
    function getIteratorFn(maybeIterable) {
      var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
      if (typeof iteratorFn === 'function') {
        return iteratorFn;
      }
    }

    /**
     * Collection of methods that allow declaration and validation of props that are
     * supplied to React components. Example usage:
     *
     *   var Props = require('ReactPropTypes');
     *   var MyArticle = React.createClass({
     *     propTypes: {
     *       // An optional string prop named "description".
     *       description: Props.string,
     *
     *       // A required enum prop named "category".
     *       category: Props.oneOf(['News','Photos']).isRequired,
     *
     *       // A prop named "dialog" that requires an instance of Dialog.
     *       dialog: Props.instanceOf(Dialog).isRequired
     *     },
     *     render: function() { ... }
     *   });
     *
     * A more formal specification of how these methods are used:
     *
     *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
     *   decl := ReactPropTypes.{type}(.isRequired)?
     *
     * Each and every declaration produces a function with the same signature. This
     * allows the creation of custom validation functions. For example:
     *
     *  var MyLink = React.createClass({
     *    propTypes: {
     *      // An optional string or URI prop named "href".
     *      href: function(props, propName, componentName) {
     *        var propValue = props[propName];
     *        if (propValue != null && typeof propValue !== 'string' &&
     *            !(propValue instanceof URI)) {
     *          return new Error(
     *            'Expected a string or an URI for ' + propName + ' in ' +
     *            componentName
     *          );
     *        }
     *      }
     *    },
     *    render: function() {...}
     *  });
     *
     * @internal
     */

    var ANONYMOUS = '<<anonymous>>';

    // Important!
    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
    var ReactPropTypes = {
      array: createPrimitiveTypeChecker('array'),
      bool: createPrimitiveTypeChecker('boolean'),
      func: createPrimitiveTypeChecker('function'),
      number: createPrimitiveTypeChecker('number'),
      object: createPrimitiveTypeChecker('object'),
      string: createPrimitiveTypeChecker('string'),
      symbol: createPrimitiveTypeChecker('symbol'),

      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker,
      exact: createStrictShapeTypeChecker,
    };

    /**
     * inlined Object.is polyfill to avoid requiring consumers ship their own
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    /*eslint-disable no-self-compare*/
    function is(x, y) {
      // SameValue algorithm
      if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
      }
    }
    /*eslint-enable no-self-compare*/

    /**
     * We use an Error-like object for backward compatibility as people may call
     * PropTypes directly and inspect their output. However, we don't use real
     * Errors anymore. We don't inspect their stack anyway, and creating them
     * is prohibitively expensive if they are created too often, such as what
     * happens in oneOfType() for any type before the one that matched.
     */
    function PropTypeError(message) {
      this.message = message;
      this.stack = '';
    }
    // Make `instanceof Error` still work for returned errors.
    PropTypeError.prototype = Error.prototype;

    function createChainableTypeChecker(validate) {
      if (process.env.NODE_ENV !== 'production') {
        var manualPropTypeCallCache = {};
        var manualPropTypeWarningCount = 0;
      }
      function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;

        if (secret !== ReactPropTypesSecret) {
          if (throwOnDirectAccess) {
            // New behavior only for users of `prop-types` package
            var err = new Error(
              'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
              'Use `PropTypes.checkPropTypes()` to call them. ' +
              'Read more at http://fb.me/use-check-prop-types'
            );
            err.name = 'Invariant Violation';
            throw err;
          } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
            // Old behavior for people using React.PropTypes
            var cacheKey = componentName + ':' + propName;
            if (
              !manualPropTypeCallCache[cacheKey] &&
              // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3
            ) {
              printWarning(
                'You are manually calling a React.PropTypes validation ' +
                'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
                'and will throw in the standalone `prop-types` package. ' +
                'You may be seeing this warning due to a third-party PropTypes ' +
                'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
              );
              manualPropTypeCallCache[cacheKey] = true;
              manualPropTypeWarningCount++;
            }
          }
        }
        if (props[propName] == null) {
          if (isRequired) {
            if (props[propName] === null) {
              return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
            }
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
          }
          return null;
        } else {
          return validate(props, propName, componentName, location, propFullName);
        }
      }

      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);

      return chainedCheckType;
    }

    function createPrimitiveTypeChecker(expectedType) {
      function validate(props, propName, componentName, location, propFullName, secret) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== expectedType) {
          // `propValue` being instance of, say, date/regexp, pass the 'object'
          // check, but we can offer a more precise error message here rather than
          // 'of type `object`'.
          var preciseType = getPreciseType(propValue);

          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }

    function createArrayOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
        }
        var propValue = props[propName];
        if (!Array.isArray(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
        }
        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createElementTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!isValidElement(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createInstanceTypeChecker(expectedClass) {
      function validate(props, propName, componentName, location, propFullName) {
        if (!(props[propName] instanceof expectedClass)) {
          var expectedClassName = expectedClass.name || ANONYMOUS;
          var actualClassName = getClassName(props[propName]);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues)) {
        process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
        return emptyFunctionThatReturnsNull;
      }

      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        for (var i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null;
          }
        }

        var valuesString = JSON.stringify(expectedValues);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
      }
      return createChainableTypeChecker(validate);
    }

    function createObjectOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
        }
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
        }
        for (var key in propValue) {
          if (propValue.hasOwnProperty(key)) {
            var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createUnionTypeChecker(arrayOfTypeCheckers) {
      if (!Array.isArray(arrayOfTypeCheckers)) {
        process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
        return emptyFunctionThatReturnsNull;
      }

      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (typeof checker !== 'function') {
          printWarning(
            'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
            'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
          );
          return emptyFunctionThatReturnsNull;
        }
      }

      function validate(props, propName, componentName, location, propFullName) {
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
            return null;
          }
        }

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
      }
      return createChainableTypeChecker(validate);
    }

    function createNodeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        if (!isNode(props[propName])) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        for (var key in shapeTypes) {
          var checker = shapeTypes[key];
          if (!checker) {
            continue;
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createStrictShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        // We need to check all keys in case some are required but missing from
        // props.
        var allKeys = assign({}, props[propName], shapeTypes);
        for (var key in allKeys) {
          var checker = shapeTypes[key];
          if (!checker) {
            return new PropTypeError(
              'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
              '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
              '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
            );
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error) {
            return error;
          }
        }
        return null;
      }

      return createChainableTypeChecker(validate);
    }

    function isNode(propValue) {
      switch (typeof propValue) {
        case 'number':
        case 'string':
        case 'undefined':
          return true;
        case 'boolean':
          return !propValue;
        case 'object':
          if (Array.isArray(propValue)) {
            return propValue.every(isNode);
          }
          if (propValue === null || isValidElement(propValue)) {
            return true;
          }

          var iteratorFn = getIteratorFn(propValue);
          if (iteratorFn) {
            var iterator = iteratorFn.call(propValue);
            var step;
            if (iteratorFn !== propValue.entries) {
              while (!(step = iterator.next()).done) {
                if (!isNode(step.value)) {
                  return false;
                }
              }
            } else {
              // Iterator will provide entry [k,v] tuples rather than values.
              while (!(step = iterator.next()).done) {
                var entry = step.value;
                if (entry) {
                  if (!isNode(entry[1])) {
                    return false;
                  }
                }
              }
            }
          } else {
            return false;
          }

          return true;
        default:
          return false;
      }
    }

    function isSymbol(propType, propValue) {
      // Native Symbol.
      if (propType === 'symbol') {
        return true;
      }

      // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
      if (propValue['@@toStringTag'] === 'Symbol') {
        return true;
      }

      // Fallback for non-spec compliant Symbols which are polyfilled.
      if (typeof Symbol === 'function' && propValue instanceof Symbol) {
        return true;
      }

      return false;
    }

    // Equivalent of `typeof` but with special handling for array and regexp.
    function getPropType(propValue) {
      var propType = typeof propValue;
      if (Array.isArray(propValue)) {
        return 'array';
      }
      if (propValue instanceof RegExp) {
        // Old webkits (at least until Android 4.0) return 'function' rather than
        // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
        // passes PropTypes.object.
        return 'object';
      }
      if (isSymbol(propType, propValue)) {
        return 'symbol';
      }
      return propType;
    }

    // This handles more types than `getPropType`. Only used for error messages.
    // See `createPrimitiveTypeChecker`.
    function getPreciseType(propValue) {
      if (typeof propValue === 'undefined' || propValue === null) {
        return '' + propValue;
      }
      var propType = getPropType(propValue);
      if (propType === 'object') {
        if (propValue instanceof Date) {
          return 'date';
        } else if (propValue instanceof RegExp) {
          return 'regexp';
        }
      }
      return propType;
    }

    // Returns a string that is postfixed to a warning about an invalid type.
    // For example, "undefined" or "of type array"
    function getPostfixForTypeWarning(value) {
      var type = getPreciseType(value);
      switch (type) {
        case 'array':
        case 'object':
          return 'an ' + type;
        case 'boolean':
        case 'date':
        case 'regexp':
          return 'a ' + type;
        default:
          return type;
      }
    }

    // Returns class name of the object, if any.
    function getClassName(propValue) {
      if (!propValue.constructor || !propValue.constructor.name) {
        return ANONYMOUS;
      }
      return propValue.constructor.name;
    }

    ReactPropTypes.checkPropTypes = checkPropTypes;
    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
  };

  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

  /***/ }),
  /* 109 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */


  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
      if (val === null || val === undefined) {
          throw new TypeError('Object.assign cannot be called with null or undefined');
      }

      return Object(val);
  }

  function shouldUseNative() {
      try {
          if (!Object.assign) {
              return false;
          }

          // Detect buggy property enumeration order in older V8 versions.

          // https://bugs.chromium.org/p/v8/issues/detail?id=4118
          var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
          test1[5] = 'de';
          if (Object.getOwnPropertyNames(test1)[0] === '5') {
              return false;
          }

          // https://bugs.chromium.org/p/v8/issues/detail?id=3056
          var test2 = {};
          for (var i = 0; i < 10; i++) {
              test2['_' + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
              return test2[n];
          });
          if (order2.join('') !== '0123456789') {
              return false;
          }

          // https://bugs.chromium.org/p/v8/issues/detail?id=3056
          var test3 = {};
          'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
              test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join('') !==
                  'abcdefghijklmnopqrst') {
              return false;
          }

          return true;
      } catch (err) {
          // We don't expect any of the above to throw, but better to be safe.
          return false;
      }
  }

  module.exports = shouldUseNative() ? Object.assign : function (target, source) {
      var from;
      var to = toObject(target);
      var symbols;

      for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);

          for (var key in from) {
              if (hasOwnProperty.call(from, key)) {
                  to[key] = from[key];
              }
          }

          if (getOwnPropertySymbols) {
              symbols = getOwnPropertySymbols(from);
              for (var i = 0; i < symbols.length; i++) {
                  if (propIsEnumerable.call(from, symbols[i])) {
                      to[symbols[i]] = from[symbols[i]];
                  }
              }
          }
      }

      return to;
  };


  /***/ }),
  /* 110 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
  /* WEBPACK VAR INJECTION */(function(process) {/**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */



  var printWarning = function() {};

  if (process.env.NODE_ENV !== 'production') {
    var ReactPropTypesSecret = __webpack_require__(44);
    var loggedTypeFailures = {};

    printWarning = function(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }

  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */
  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    if (process.env.NODE_ENV !== 'production') {
      for (var typeSpecName in typeSpecs) {
        if (typeSpecs.hasOwnProperty(typeSpecName)) {
          var error;
          // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.
          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              var err = Error(
                (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
                'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
              );
              err.name = 'Invariant Violation';
              throw err;
            }
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning(
              (componentName || 'React class') + ': type specification of ' +
              location + ' `' + typeSpecName + '` is invalid; the type checker ' +
              'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
              'You may have forgotten to pass an argument to the type checker ' +
              'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
              'shape all require an argument).'
            )

          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;

            var stack = getStack ? getStack() : '';

            printWarning(
              'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
            );
          }
        }
      }
    }
  }

  module.exports = checkPropTypes;

  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

  /***/ }),
  /* 111 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */



  var ReactPropTypesSecret = __webpack_require__(44);

  function emptyFunction() {}

  module.exports = function() {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret === ReactPropTypesSecret) {
        // It is still safe when called from React.
        return;
      }
      var err = new Error(
        'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
        'Use PropTypes.checkPropTypes() to call them. ' +
        'Read more at http://fb.me/use-check-prop-types'
      );
      err.name = 'Invariant Violation';
      throw err;
    };
    shim.isRequired = shim;
    function getShim() {
      return shim;
    };
    // Important!
    // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
    var ReactPropTypes = {
      array: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,

      any: shim,
      arrayOf: getShim,
      element: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim
    };

    ReactPropTypes.checkPropTypes = emptyFunction;
    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
  };


  /***/ }),
  /* 112 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Animate__ = __webpack_require__(113);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AnimateChild__ = __webpack_require__(63);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CSSMotion__ = __webpack_require__(130);
  /* unused harmony reexport AnimateChild */
  /* unused harmony reexport CSSMotion */






  /* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__Animate__["a" /* default */]);

  /***/ }),
  /* 113 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* unused harmony export genAnimate */
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(14);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(17);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(18);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(19);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(21);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(7);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(12);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_lifecycles_compat__ = __webpack_require__(23);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rc_util_es_Children_toArray__ = __webpack_require__(22);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_fbjs_lib_warning__ = __webpack_require__(114);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_fbjs_lib_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_fbjs_lib_warning__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__AnimateChild__ = __webpack_require__(63);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__util__ = __webpack_require__(45);














  var defaultKey = 'rc_animate_' + Date.now();
  var clonePropList = ['children'];

  /**
   * Default use `AnimateChild` as component.
   * Here can also pass customize `ChildComponent` for test usage.
   */
  function genAnimate(ChildComponent) {
    var Animate = function (_React$Component) {
      __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Animate, _React$Component);

      function Animate() {
        var _ref;

        var _temp, _this, _ret;

        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Animate);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref = Animate.__proto__ || Object.getPrototypeOf(Animate)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
          appeared: true,
          mergedChildren: []
        }, _this.onChildLeaved = function (key) {
          // Remove child which not exist anymore
          if (!_this.hasChild(key)) {
            var mergedChildren = _this.state.mergedChildren;

            _this.setState({
              mergedChildren: mergedChildren.filter(function (node) {
                return node.key !== key;
              })
            });
          }
        }, _this.hasChild = function (key) {
          var children = _this.props.children;


          return Object(__WEBPACK_IMPORTED_MODULE_8_rc_util_es_Children_toArray__["a" /* default */])(children).some(function (node) {
            return node && node.key === key;
          });
        }, _temp), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
      }
      // [Legacy] Not sure usage
      // commit: https://github.com/react-component/animate/commit/0a1cbfd647407498b10a8c6602a2dea80b42e324
      // eslint-disable-line

      __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Animate, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          // No need to re-render
          this.state.appeared = false;
        }
      }, {
        key: 'render',
        value: function render() {
          var _this2 = this;

          var _state = this.state,
              appeared = _state.appeared,
              mergedChildren = _state.mergedChildren;
          var _props = this.props,
              Component = _props.component,
              componentProps = _props.componentProps,
              className = _props.className,
              style = _props.style,
              showProp = _props.showProp;


          var $children = mergedChildren.map(function (node) {
            if (mergedChildren.length > 1 && !node.key) {
              __WEBPACK_IMPORTED_MODULE_9_fbjs_lib_warning___default()(false, 'must set key for <rc-animate> children');
              return null;
            }

            var show = true;

            if (!_this2.hasChild(node.key)) {
              show = false;
            } else if (showProp) {
              show = node.props[showProp];
            }

            var key = node.key || defaultKey;

            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              ChildComponent,
              __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, _this2.props, {
                appeared: appeared,
                show: show,
                className: node.props.className,
                style: node.props.style,
                key: key,

                animateKey: node.key // Keep trans origin key
                , onChildLeaved: _this2.onChildLeaved
              }),
              node
            );
          });

          // Wrap with component
          if (Component) {
            var passedProps = this.props;
            if (typeof Component === 'string') {
              passedProps = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
                className: className,
                style: style
              }, componentProps);
            }

            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              Component,
              passedProps,
              $children
            );
          }

          return $children[0] || null;
        }
      }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
          var _prevState$prevProps = prevState.prevProps,
              prevProps = _prevState$prevProps === undefined ? {} : _prevState$prevProps;

          var newState = {
            prevProps: Object(__WEBPACK_IMPORTED_MODULE_11__util__["b" /* cloneProps */])(nextProps, clonePropList)
          };
          var showProp = nextProps.showProp;


          function processState(propName, updater) {
            if (prevProps[propName] !== nextProps[propName]) {
              updater(nextProps[propName]);
              return true;
            }
            return false;
          }

          processState('children', function (children) {
            var currentChildren = Object(__WEBPACK_IMPORTED_MODULE_8_rc_util_es_Children_toArray__["a" /* default */])(children).filter(function (node) {
              return node;
            });
            var prevChildren = prevState.mergedChildren.filter(function (node) {
              // Remove prev child if not show anymore
              if (currentChildren.every(function (_ref2) {
                var key = _ref2.key;
                return key !== node.key;
              }) && showProp && !node.props[showProp]) {
                return false;
              }
              return true;
            });

            // Merge prev children to keep the animation
            newState.mergedChildren = Object(__WEBPACK_IMPORTED_MODULE_11__util__["e" /* mergeChildren */])(prevChildren, currentChildren);
          });

          return newState;
        }
      }]);

      return Animate;
    }(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

    Animate.isAnimate = true;
    Animate.propTypes = {
      component: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
      componentProps: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object,
      animation: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object,
      transitionName: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object]),
      transitionEnter: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
      transitionAppear: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
      exclusive: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
      transitionLeave: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
      onEnd: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
      onEnter: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
      onLeave: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
      onAppear: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
      showProp: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
      children: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.node,
      style: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object,
      className: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string
    };
    Animate.defaultProps = {
      animation: {},
      component: 'span',
      componentProps: {},
      transitionEnter: true,
      transitionLeave: true,
      transitionAppear: false
    };


    Object(__WEBPACK_IMPORTED_MODULE_7_react_lifecycles_compat__["a" /* polyfill */])(Animate);

    return Animate;
  }

  /* harmony default export */ __webpack_exports__["a"] = (genAnimate(__WEBPACK_IMPORTED_MODULE_10__AnimateChild__["a" /* default */]));

  /***/ }),
  /* 114 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
  /* WEBPACK VAR INJECTION */(function(process) {/**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */



  var emptyFunction = __webpack_require__(115);

  /**
   * Similar to invariant but only logs a warning if the condition is not met.
   * This can be used to log issues in development environments in critical
   * paths. Removing the logging code for production environments will keep the
   * same logic and follow the same code paths.
   */

  var warning = emptyFunction;

  if (process.env.NODE_ENV !== 'production') {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  }

  module.exports = warning;
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

  /***/ }),
  /* 115 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  function makeEmptyFunction(arg) {
    return function () {
      return arg;
    };
  }

  /**
   * This function accepts and discards inputs; it has no side effects. This is
   * primarily useful idiomatically for overridable function endpoints which
   * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
   */
  var emptyFunction = function emptyFunction() {};

  emptyFunction.thatReturns = makeEmptyFunction;
  emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
  emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
  emptyFunction.thatReturnsNull = makeEmptyFunction(null);
  emptyFunction.thatReturnsThis = function () {
    return this;
  };
  emptyFunction.thatReturnsArgument = function (arg) {
    return arg;
  };

  module.exports = emptyFunction;

  /***/ }),
  /* 116 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  exports.__esModule = true;

  var _from = __webpack_require__(117);

  var _from2 = _interopRequireDefault(_from);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = function (arr) {
    return Array.isArray(arr) ? arr : (0, _from2.default)(arr);
  };

  /***/ }),
  /* 117 */
  /***/ (function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(118), __esModule: true };

  /***/ }),
  /* 118 */
  /***/ (function(module, exports, __webpack_require__) {

  __webpack_require__(53);
  __webpack_require__(119);
  module.exports = __webpack_require__(0).Array.from;


  /***/ }),
  /* 119 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var ctx = __webpack_require__(29);
  var $export = __webpack_require__(4);
  var toObject = __webpack_require__(38);
  var call = __webpack_require__(120);
  var isArrayIter = __webpack_require__(121);
  var toLength = __webpack_require__(50);
  var createProperty = __webpack_require__(122);
  var getIterFn = __webpack_require__(123);

  $export($export.S + $export.F * !__webpack_require__(125)(function (iter) { Array.from(iter); }), 'Array', {
    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
    from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
      var O = toObject(arrayLike);
      var C = typeof this == 'function' ? this : Array;
      var aLen = arguments.length;
      var mapfn = aLen > 1 ? arguments[1] : undefined;
      var mapping = mapfn !== undefined;
      var index = 0;
      var iterFn = getIterFn(O);
      var length, result, step, iterator;
      if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
      // if object isn't iterable or it's array with default iterator - use simple case
      if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
        for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
          createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
        }
      } else {
        length = toLength(O.length);
        for (result = new C(length); length > index; index++) {
          createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
        }
      }
      result.length = index;
      return result;
    }
  });


  /***/ }),
  /* 120 */
  /***/ (function(module, exports, __webpack_require__) {

  // call something on iterator step with safe closing on error
  var anObject = __webpack_require__(9);
  module.exports = function (iterator, fn, value, entries) {
    try {
      return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined) anObject(ret.call(iterator));
      throw e;
    }
  };


  /***/ }),
  /* 121 */
  /***/ (function(module, exports, __webpack_require__) {

  // check on default Array iterator
  var Iterators = __webpack_require__(20);
  var ITERATOR = __webpack_require__(1)('iterator');
  var ArrayProto = Array.prototype;

  module.exports = function (it) {
    return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
  };


  /***/ }),
  /* 122 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";

  var $defineProperty = __webpack_require__(3);
  var createDesc = __webpack_require__(16);

  module.exports = function (object, index, value) {
    if (index in object) $defineProperty.f(object, index, createDesc(0, value));
    else object[index] = value;
  };


  /***/ }),
  /* 123 */
  /***/ (function(module, exports, __webpack_require__) {

  var classof = __webpack_require__(124);
  var ITERATOR = __webpack_require__(1)('iterator');
  var Iterators = __webpack_require__(20);
  module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR]
      || it['@@iterator']
      || Iterators[classof(it)];
  };


  /***/ }),
  /* 124 */
  /***/ (function(module, exports, __webpack_require__) {

  // getting tag from 19.1.3.6 Object.prototype.toString()
  var cof = __webpack_require__(31);
  var TAG = __webpack_require__(1)('toStringTag');
  // ES3 wrong here
  var ARG = cof(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (e) { /* empty */ }
  };

  module.exports = function (it) {
    var O, T, B;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
      // builtinTag case
      : ARG ? cof(O)
      // ES3 arguments fallback
      : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };


  /***/ }),
  /* 125 */
  /***/ (function(module, exports, __webpack_require__) {

  var ITERATOR = __webpack_require__(1)('iterator');
  var SAFE_CLOSING = false;

  try {
    var riter = [7][ITERATOR]();
    riter['return'] = function () { SAFE_CLOSING = true; };
    // eslint-disable-next-line no-throw-literal
    Array.from(riter, function () { throw 2; });
  } catch (e) { /* empty */ }

  module.exports = function (exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING) return false;
    var safe = false;
    try {
      var arr = [7];
      var iter = arr[ITERATOR]();
      iter.next = function () { return { done: safe = true }; };
      arr[ITERATOR] = function () { return iter; };
      exec(arr);
    } catch (e) { /* empty */ }
    return safe;
  };


  /***/ }),
  /* 126 */
  /***/ (function(module, exports, __webpack_require__) {

  /**
   * Module dependencies.
   */

  try {
    var index = __webpack_require__(65);
  } catch (err) {
    var index = __webpack_require__(65);
  }

  /**
   * Whitespace regexp.
   */

  var re = /\s+/;

  /**
   * toString reference.
   */

  var toString = Object.prototype.toString;

  /**
   * Wrap `el` in a `ClassList`.
   *
   * @param {Element} el
   * @return {ClassList}
   * @api public
   */

  module.exports = function(el){
    return new ClassList(el);
  };

  /**
   * Initialize a new ClassList for `el`.
   *
   * @param {Element} el
   * @api private
   */

  function ClassList(el) {
    if (!el || !el.nodeType) {
      throw new Error('A DOM element reference is required');
    }
    this.el = el;
    this.list = el.classList;
  }

  /**
   * Add class `name` if not already present.
   *
   * @param {String} name
   * @return {ClassList}
   * @api public
   */

  ClassList.prototype.add = function(name){
    // classList
    if (this.list) {
      this.list.add(name);
      return this;
    }

    // fallback
    var arr = this.array();
    var i = index(arr, name);
    if (!~i) arr.push(name);
    this.el.className = arr.join(' ');
    return this;
  };

  /**
   * Remove class `name` when present, or
   * pass a regular expression to remove
   * any which match.
   *
   * @param {String|RegExp} name
   * @return {ClassList}
   * @api public
   */

  ClassList.prototype.remove = function(name){
    if ('[object RegExp]' == toString.call(name)) {
      return this.removeMatching(name);
    }

    // classList
    if (this.list) {
      this.list.remove(name);
      return this;
    }

    // fallback
    var arr = this.array();
    var i = index(arr, name);
    if (~i) arr.splice(i, 1);
    this.el.className = arr.join(' ');
    return this;
  };

  /**
   * Remove all classes matching `re`.
   *
   * @param {RegExp} re
   * @return {ClassList}
   * @api private
   */

  ClassList.prototype.removeMatching = function(re){
    var arr = this.array();
    for (var i = 0; i < arr.length; i++) {
      if (re.test(arr[i])) {
        this.remove(arr[i]);
      }
    }
    return this;
  };

  /**
   * Toggle class `name`, can force state via `force`.
   *
   * For browsers that support classList, but do not support `force` yet,
   * the mistake will be detected and corrected.
   *
   * @param {String} name
   * @param {Boolean} force
   * @return {ClassList}
   * @api public
   */

  ClassList.prototype.toggle = function(name, force){
    // classList
    if (this.list) {
      if ("undefined" !== typeof force) {
        if (force !== this.list.toggle(name, force)) {
          this.list.toggle(name); // toggle again to correct
        }
      } else {
        this.list.toggle(name);
      }
      return this;
    }

    // fallback
    if ("undefined" !== typeof force) {
      if (!force) {
        this.remove(name);
      } else {
        this.add(name);
      }
    } else {
      if (this.has(name)) {
        this.remove(name);
      } else {
        this.add(name);
      }
    }

    return this;
  };

  /**
   * Return an array of classes.
   *
   * @return {Array}
   * @api public
   */

  ClassList.prototype.array = function(){
    var className = this.el.getAttribute('class') || '';
    var str = className.replace(/^\s+|\s+$/g, '');
    var arr = str.split(re);
    if ('' === arr[0]) arr.shift();
    return arr;
  };

  /**
   * Check if class `name` is present.
   *
   * @param {String} name
   * @return {ClassList}
   * @api public
   */

  ClassList.prototype.has =
  ClassList.prototype.contains = function(name){
    return this.list
      ? this.list.contains(name)
      : !! ~index(this.array(), name);
  };


  /***/ }),
  /* 127 */
  /***/ (function(module, exports) {

  var g;

  // This works in non-strict mode
  g = (function() {
      return this;
  })();

  try {
      // This works if eval is allowed (see CSP)
      g = g || Function("return this")() || (1,eval)("this");
  } catch(e) {
      // This works if the window reference is available
      if(typeof window === "object")
          g = window;
  }

  // g can still be undefined, but nothing to do about it...
  // We return undefined, instead of nothing here, so it's
  // easier to handle this case. if(!global) { ...}

  module.exports = g;


  /***/ }),
  /* 128 */
  /***/ (function(module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2
  (function() {
    var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

    if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
      module.exports = function() {
        return performance.now();
      };
    } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
      module.exports = function() {
        return (getNanoSeconds() - nodeLoadTime) / 1e6;
      };
      hrtime = process.hrtime;
      getNanoSeconds = function() {
        var hr;
        hr = hrtime();
        return hr[0] * 1e9 + hr[1];
      };
      moduleLoadTime = getNanoSeconds();
      upTime = process.uptime() * 1e9;
      nodeLoadTime = moduleLoadTime - upTime;
    } else if (Date.now) {
      module.exports = function() {
        return Date.now() - loadTime;
      };
      loadTime = Date.now();
    } else {
      module.exports = function() {
        return new Date().getTime() - loadTime;
      };
      loadTime = new Date().getTime();
    }

  }).call(this);

  //# sourceMappingURL=performance-now.js.map

  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

  /***/ }),
  /* 129 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */



  var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

  /**
   * Simple, lightweight module assisting with the detection and context of
   * Worker. Helps avoid circular dependencies and allows code to reason about
   * whether or not they are in a Worker, even if they never include the main
   * `ReactWorker` dependency.
   */
  var ExecutionEnvironment = {

    canUseDOM: canUseDOM,

    canUseWorkers: typeof Worker !== 'undefined',

    canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

    canUseViewport: canUseDOM && !!window.screen,

    isInWorker: !canUseDOM // For now, this is true - might change in the future.

  };

  module.exports = ExecutionEnvironment;

  /***/ }),
  /* 130 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* unused harmony export genCSSMotion */
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(39);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(14);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(17);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(18);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(19);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(21);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(7);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom__ = __webpack_require__(64);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_dom__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types__ = __webpack_require__(12);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_prop_types__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_lifecycles_compat__ = __webpack_require__(23);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_classnames__ = __webpack_require__(28);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_classnames__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_raf__ = __webpack_require__(66);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_raf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_raf__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__util__ = __webpack_require__(45);














  var STATUS_NONE = 'none';
  var STATUS_APPEAR = 'appear';
  var STATUS_ENTER = 'enter';
  var STATUS_LEAVE = 'leave';

  /**
   * `transitionSupport` is used for none transition test case.
   * Default we use browser transition event support check.
   */
  function genCSSMotion(transitionSupport) {
    var CSSMotion = function (_React$Component) {
      __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(CSSMotion, _React$Component);

      function CSSMotion() {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, CSSMotion);

        var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (CSSMotion.__proto__ || Object.getPrototypeOf(CSSMotion)).call(this));

        _this.onDomUpdate = function () {
          var _this$state = _this.state,
              status = _this$state.status,
              newStatus = _this$state.newStatus;
          var _this$props = _this.props,
              onAppearStart = _this$props.onAppearStart,
              onEnterStart = _this$props.onEnterStart,
              onLeaveStart = _this$props.onLeaveStart,
              onAppearActive = _this$props.onAppearActive,
              onEnterActive = _this$props.onEnterActive,
              onLeaveActive = _this$props.onLeaveActive,
              motionAppear = _this$props.motionAppear,
              motionEnter = _this$props.motionEnter,
              motionLeave = _this$props.motionLeave;


          if (!transitionSupport) {
            return;
          }

          // Event injection
          var $ele = __WEBPACK_IMPORTED_MODULE_7_react_dom___default.a.findDOMNode(_this);
          if (_this.$ele !== $ele) {
            _this.removeEventListener(_this.$ele);
            _this.addEventListener($ele);
            _this.$ele = $ele;
          }

          // Init status
          if (newStatus && status === STATUS_APPEAR && motionAppear) {
            _this.updateStatus(onAppearStart, null, null, function () {
              _this.updateActiveStatus(onAppearActive, STATUS_APPEAR);
            });
          } else if (newStatus && status === STATUS_ENTER && motionEnter) {
            _this.updateStatus(onEnterStart, null, null, function () {
              _this.updateActiveStatus(onEnterActive, STATUS_ENTER);
            });
          } else if (newStatus && status === STATUS_LEAVE && motionLeave) {
            _this.updateStatus(onLeaveStart, null, null, function () {
              _this.updateActiveStatus(onLeaveActive, STATUS_LEAVE);
            });
          }
        };

        _this.onMotionEnd = function (event) {
          var _this$state2 = _this.state,
              status = _this$state2.status,
              statusActive = _this$state2.statusActive;
          var _this$props2 = _this.props,
              onAppearEnd = _this$props2.onAppearEnd,
              onEnterEnd = _this$props2.onEnterEnd,
              onLeaveEnd = _this$props2.onLeaveEnd;

          if (status === STATUS_APPEAR && statusActive) {
            _this.updateStatus(onAppearEnd, { status: STATUS_NONE }, event);
          } else if (status === STATUS_ENTER && statusActive) {
            _this.updateStatus(onEnterEnd, { status: STATUS_NONE }, event);
          } else if (status === STATUS_LEAVE && statusActive) {
            _this.updateStatus(onLeaveEnd, { status: STATUS_NONE }, event);
          }
        };

        _this.addEventListener = function ($ele) {
          if (!$ele) return;

          $ele.addEventListener(__WEBPACK_IMPORTED_MODULE_12__util__["g" /* transitionEndName */], _this.onMotionEnd);
          $ele.addEventListener(__WEBPACK_IMPORTED_MODULE_12__util__["a" /* animationEndName */], _this.onMotionEnd);
        };

        _this.removeEventListener = function ($ele) {
          if (!$ele) return;

          $ele.removeEventListener(__WEBPACK_IMPORTED_MODULE_12__util__["g" /* transitionEndName */], _this.onMotionEnd);
          $ele.removeEventListener(__WEBPACK_IMPORTED_MODULE_12__util__["a" /* animationEndName */], _this.onMotionEnd);
        };

        _this.updateStatus = function (styleFunc, additionalState, event, callback) {
          var statusStyle = styleFunc ? styleFunc(__WEBPACK_IMPORTED_MODULE_7_react_dom___default.a.findDOMNode(_this), event) : null;

          if (statusStyle === false || _this._destroyed) return;

          var nextStep = void 0;
          if (callback) {
            nextStep = function nextStep() {
              _this.nextFrame(callback);
            };
          }

          _this.setState(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({
            statusStyle: typeof statusStyle === 'object' ? statusStyle : null,
            newStatus: false
          }, additionalState), nextStep); // Trigger before next frame & after `componentDidMount`
        };

        _this.updateActiveStatus = function (styleFunc, currentStatus) {
          // `setState` use `postMessage` to trigger at the end of frame.
          // Let's use requestAnimationFrame to update new state in next frame.
          _this.nextFrame(function () {
            var status = _this.state.status;

            if (status !== currentStatus) return;

            _this.updateStatus(styleFunc, { statusActive: true });
          });
        };

        _this.nextFrame = function (func) {
          _this.cancelNextFrame();
          _this.raf = __WEBPACK_IMPORTED_MODULE_11_raf___default()(func);
        };

        _this.cancelNextFrame = function () {
          if (_this.raf) {
            __WEBPACK_IMPORTED_MODULE_11_raf___default.a.cancel(_this.raf);
            _this.raf = null;
          }
        };

        _this.state = {
          status: STATUS_NONE,
          statusActive: false,
          newStatus: false,
          statusStyle: null
        };
        _this.$ele = null;
        _this.raf = null;
        return _this;
      }

      __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(CSSMotion, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.onDomUpdate();
        }
      }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
          this.onDomUpdate();
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this._destroyed = true;
          this.removeEventListener(this.$ele);
          this.cancelNextFrame();
        }
      }, {
        key: 'render',
        value: function render() {
          var _classNames;

          var _state = this.state,
              status = _state.status,
              statusActive = _state.statusActive,
              statusStyle = _state.statusStyle;
          var _props = this.props,
              children = _props.children,
              motionName = _props.motionName,
              visible = _props.visible;


          if (!children) return null;

          if (status === STATUS_NONE || !transitionSupport) {
            return visible ? children({}) : null;
          }

          return children({
            className: __WEBPACK_IMPORTED_MODULE_10_classnames___default()((_classNames = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classNames, Object(__WEBPACK_IMPORTED_MODULE_12__util__["d" /* getTransitionName */])(motionName, status), status !== STATUS_NONE), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classNames, Object(__WEBPACK_IMPORTED_MODULE_12__util__["d" /* getTransitionName */])(motionName, status + '-active'), status !== STATUS_NONE && statusActive), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classNames, motionName, typeof motionName === 'string'), _classNames)),
            style: statusStyle
          });
        }
      }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(props, _ref) {
          var prevProps = _ref.prevProps;

          if (!transitionSupport) return {};

          var visible = props.visible,
              motionAppear = props.motionAppear,
              motionEnter = props.motionEnter,
              motionLeave = props.motionLeave,
              motionLeaveImmediately = props.motionLeaveImmediately;

          var newState = {
            prevProps: props
          };

          // Appear
          if (!prevProps && visible && motionAppear) {
            newState.status = STATUS_APPEAR;
            newState.statusActive = false;
            newState.newStatus = true;
          }

          // Enter
          if (prevProps && !prevProps.visible && visible && motionEnter) {
            newState.status = STATUS_ENTER;
            newState.statusActive = false;
            newState.newStatus = true;
          }

          // Leave
          if (prevProps && prevProps.visible && !visible && motionLeave || !prevProps && motionLeaveImmediately && !visible && motionLeave) {
            newState.status = STATUS_LEAVE;
            newState.statusActive = false;
            newState.newStatus = true;
          }

          return newState;
        }
      }]);

      return CSSMotion;
    }(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

    CSSMotion.propTypes = {
      visible: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
      children: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
      motionName: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.object]),
      motionAppear: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
      motionEnter: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
      motionLeave: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
      motionLeaveImmediately: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool, // Trigger leave motion immediately
      onAppearStart: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
      onAppearActive: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
      onAppearEnd: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
      onEnterStart: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
      onEnterActive: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
      onEnterEnd: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
      onLeaveStart: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
      onLeaveActive: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
      onLeaveEnd: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func
    };
    CSSMotion.defaultProps = {
      visible: true,
      motionEnter: true,
      motionAppear: true,
      motionLeave: true
    };


    Object(__WEBPACK_IMPORTED_MODULE_9_react_lifecycles_compat__["a" /* polyfill */])(CSSMotion);

    return CSSMotion;
  }

  /* unused harmony default export */ var _unused_webpack_default_export = (genCSSMotion(__WEBPACK_IMPORTED_MODULE_12__util__["f" /* supportTransition */]));

  /***/ })
  /******/ ])["default"]
);
});
//# sourceMappingURL=rc-tree.js.map