window["StateMachine"] =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n//-----------------------------------------------------------------------------------------------\n\nvar mixin    = __webpack_require__(/*! ./util/mixin */ \"./src/util/mixin.js\"),\n    camelize = __webpack_require__(/*! ./util/camelize */ \"./src/util/camelize.js\"),\n    plugin   = __webpack_require__(/*! ./plugin */ \"./src/plugin.js\"),\n    Config   = __webpack_require__(/*! ./config */ \"./src/config.js\"),\n    JSM      = __webpack_require__(/*! ./jsm */ \"./src/jsm.js\");\n\n//-----------------------------------------------------------------------------------------------\n\nvar PublicMethods = {\n  is:                  function(state)       { return this._fsm.is(state)                                     },\n  can:                 function(transition)  { return this._fsm.can(transition)                               },\n  cannot:              function(transition)  { return this._fsm.cannot(transition)                            },\n  observe:             function()            { return this._fsm.observe(arguments)                            },\n  transitions:         function()            { return this._fsm.transitions()                                 },\n  allTransitions:      function()            { return this._fsm.allTransitions()                              },\n  allStates:           function()            { return this._fsm.allStates()                                   },\n  onInvalidTransition: function(t, from, to) { return this._fsm.onInvalidTransition(t, from, to)              },\n  onPendingTransition: function(t, from, to) { return this._fsm.onPendingTransition(t, from, to)              },\n}\n\nvar PublicProperties = {\n  state: {\n    configurable: false,\n    enumerable:   true,\n    get: function() {\n      return this._fsm.state;\n    },\n    set: function(state) {\n      throw Error('use transitions to change state')\n    }\n  }\n}\n\n//-----------------------------------------------------------------------------------------------\n\nfunction StateMachine(options) {\n  return apply(this || {}, options);\n}\n\nfunction factory() {\n  var cstor, options;\n  if (typeof arguments[0] === 'function') {\n    cstor   = arguments[0];\n    options = arguments[1] || {};\n  }\n  else {\n    cstor   = function() { this._fsm.apply(this, arguments) };\n    options = arguments[0] || {};\n  }\n  var config = new Config(options, StateMachine);\n  build(cstor.prototype, config);\n  cstor.prototype._fsm.config = config; // convenience access to shared config without needing an instance\n  return cstor;\n}\n\n//-------------------------------------------------------------------------------------------------\n\nfunction apply(instance, options) {\n  var config = new Config(options, StateMachine);\n  build(instance, config);\n  instance._fsm();\n  return instance;\n}\n\nfunction build(target, config) {\n  if ((typeof target !== 'object') || Array.isArray(target))\n    throw Error('StateMachine can only be applied to objects');\n  plugin.build(target, config);\n  Object.defineProperties(target, PublicProperties);\n  mixin(target, PublicMethods);\n  mixin(target, config.methods);\n  config.allTransitions().forEach(function(transition) {\n    target[camelize(transition)] = function() {\n      return this._fsm.fire(transition, [].slice.call(arguments))\n    }\n  });\n  target._fsm = function() {\n    this._fsm = new JSM(this, config);\n    this._fsm.init(arguments);\n  }\n}\n\n//-----------------------------------------------------------------------------------------------\n\nStateMachine.version  = '3.0.1';\nStateMachine.factory  = factory;\nStateMachine.apply    = apply;\nStateMachine.defaults = {\n  wildcard: '*',\n  init: {\n    name: 'init',\n    from: 'none'\n  }\n}\n\n//===============================================================================================\n\nmodule.exports = StateMachine;\n\n\n//# sourceURL=webpack://StateMachine/./src/app.js?");

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n//-------------------------------------------------------------------------------------------------\n\nvar mixin    = __webpack_require__(/*! ./util/mixin */ \"./src/util/mixin.js\"),\n    camelize = __webpack_require__(/*! ./util/camelize */ \"./src/util/camelize.js\");\n\n//-------------------------------------------------------------------------------------------------\n\nfunction Config(options, StateMachine) {\n\n  options = options || {};\n\n  this.options     = options; // preserving original options can be useful (e.g visualize plugin)\n  this.defaults    = StateMachine.defaults;\n  this.states      = [];\n  this.transitions = [];\n  this.map         = {};\n  this.lifecycle   = this.configureLifecycle();\n  this.init        = this.configureInitTransition(options.init);\n  this.data        = this.configureData(options.data);\n  this.methods     = this.configureMethods(options.methods);\n\n  this.map[this.defaults.wildcard] = {};\n\n  this.configureTransitions(options.transitions || []);\n\n  this.plugins = this.configurePlugins(options.plugins, StateMachine.plugin);\n\n}\n\n//-------------------------------------------------------------------------------------------------\n\nmixin(Config.prototype, {\n\n  addState: function(name) {\n    if (!this.map[name]) {\n      this.states.push(name);\n      this.addStateLifecycleNames(name);\n      this.map[name] = {};\n    }\n  },\n\n  addStateLifecycleNames: function(name) {\n    this.lifecycle.onEnter[name] = camelize.prepended('onEnter', name);\n    this.lifecycle.onLeave[name] = camelize.prepended('onLeave', name);\n    this.lifecycle.on[name]      = camelize.prepended('on',      name);\n  },\n\n  addTransition: function(name) {\n    if (this.transitions.indexOf(name) < 0) {\n      this.transitions.push(name);\n      this.addTransitionLifecycleNames(name);\n    }\n  },\n\n  addTransitionLifecycleNames: function(name) {\n    this.lifecycle.onBefore[name] = camelize.prepended('onBefore', name);\n    this.lifecycle.onAfter[name]  = camelize.prepended('onAfter',  name);\n    this.lifecycle.on[name]       = camelize.prepended('on',       name);\n  },\n\n  mapTransition: function(transition) {\n    var name = transition.name,\n        from = transition.from,\n        to   = transition.to;\n    this.addState(from);\n    if (typeof to !== 'function')\n      this.addState(to);\n    this.addTransition(name);\n    this.map[from][name] = transition;\n    return transition;\n  },\n\n  configureLifecycle: function() {\n    return {\n      onBefore: { transition: 'onBeforeTransition' },\n      onAfter:  { transition: 'onAfterTransition'  },\n      onEnter:  { state:      'onEnterState'       },\n      onLeave:  { state:      'onLeaveState'       },\n      on:       { transition: 'onTransition'       }\n    };\n  },\n\n  configureInitTransition: function(init) {\n    if (typeof init === 'string') {\n      return this.mapTransition(mixin({}, this.defaults.init, { to: init, active: true }));\n    }\n    else if (typeof init === 'object') {\n      return this.mapTransition(mixin({}, this.defaults.init, init, { active: true }));\n    }\n    else {\n      this.addState(this.defaults.init.from);\n      return this.defaults.init;\n    }\n  },\n\n  configureData: function(data) {\n    if (typeof data === 'function')\n      return data;\n    else if (typeof data === 'object')\n      return function() { return data; }\n    else\n      return function() { return {};  }\n  },\n\n  configureMethods: function(methods) {\n    return methods || {};\n  },\n\n  configurePlugins: function(plugins, builtin) {\n    plugins = plugins || [];\n    var n, max, plugin;\n    for(n = 0, max = plugins.length ; n < max ; n++) {\n      plugin = plugins[n];\n      if (typeof plugin === 'function')\n        plugins[n] = plugin = plugin()\n      if (plugin.configure)\n        plugin.configure(this);\n    }\n    return plugins\n  },\n\n  configureTransitions: function(transitions) {\n    var i, n, transition, from, to, wildcard = this.defaults.wildcard;\n    for(n = 0 ; n < transitions.length ; n++) {\n      transition = transitions[n];\n      from  = Array.isArray(transition.from) ? transition.from : [transition.from || wildcard]\n      to    = transition.to || wildcard;\n      for(i = 0 ; i < from.length ; i++) {\n        this.mapTransition({ name: transition.name, from: from[i], to: to });\n      }\n    }\n  },\n\n  transitionFor: function(state, transition) {\n    var wildcard = this.defaults.wildcard;\n    return this.map[state][transition] ||\n           this.map[wildcard][transition];\n  },\n\n  transitionsFor: function(state) {\n    var wildcard = this.defaults.wildcard;\n    return Object.keys(this.map[state]).concat(Object.keys(this.map[wildcard]));\n  },\n\n  allStates: function() {\n    return this.states;\n  },\n\n  allTransitions: function() {\n    return this.transitions;\n  }\n\n});\n\n//-------------------------------------------------------------------------------------------------\n\nmodule.exports = Config;\n\n//-------------------------------------------------------------------------------------------------\n\n\n//# sourceURL=webpack://StateMachine/./src/config.js?");

/***/ }),

/***/ "./src/jsm.js":
/*!********************!*\
  !*** ./src/jsm.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar mixin      = __webpack_require__(/*! ./util/mixin */ \"./src/util/mixin.js\"),\n    Exception  = __webpack_require__(/*! ./util/exception */ \"./src/util/exception.js\"),\n    plugin     = __webpack_require__(/*! ./plugin */ \"./src/plugin.js\"),\n    UNOBSERVED = [ null, [] ];\n\n//-------------------------------------------------------------------------------------------------\n\nfunction JSM(context, config) {\n  this.context   = context;\n  this.config    = config;\n  this.state     = config.init.from;\n  this.observers = [context];\n}\n\n//-------------------------------------------------------------------------------------------------\n\nmixin(JSM.prototype, {\n\n  init: function(args) {\n    mixin(this.context, this.config.data.apply(this.context, args));\n    plugin.hook(this, 'init');\n    if (this.config.init.active)\n      return this.fire(this.config.init.name, []);\n  },\n\n  is: function(state) {\n    return Array.isArray(state) ? (state.indexOf(this.state) >= 0) : (this.state === state);\n  },\n\n  isPending: function() {\n    return this.pending;\n  },\n\n  can: function(transition) {\n    return !this.isPending() && !!this.seek(transition);\n  },\n\n  cannot: function(transition) {\n    return !this.can(transition);\n  },\n\n  allStates: function() {\n    return this.config.allStates();\n  },\n\n  allTransitions: function() {\n    return this.config.allTransitions();\n  },\n\n  transitions: function() {\n    return this.config.transitionsFor(this.state);\n  },\n\n  seek: function(transition, args) {\n    var wildcard = this.config.defaults.wildcard,\n        entry    = this.config.transitionFor(this.state, transition),\n        to       = entry && entry.to;\n    if (typeof to === 'function')\n      return to.apply(this.context, args);\n    else if (to === wildcard)\n      return this.state\n    else\n      return to\n  },\n\n  fire: function(transition, args) {\n    return this.transit(transition, this.state, this.seek(transition, args), args);\n  },\n\n  transit: function(transition, from, to, args) {\n\n    var lifecycle = this.config.lifecycle,\n        changed   = this.config.options.observeUnchangedState || (from !== to);\n\n    if (!to)\n      return this.context.onInvalidTransition(transition, from, to);\n\n    if (this.isPending())\n      return this.context.onPendingTransition(transition, from, to);\n\n    this.config.addState(to);  // might need to add this state if it's unknown (e.g. conditional transition or goto)\n\n    this.beginTransit();\n\n    args.unshift({             // this context will be passed to each lifecycle event observer\n      transition: transition,\n      from:       from,\n      to:         to,\n      fsm:        this.context\n    });\n\n    return this.observeEvents([\n                this.observersForEvent(lifecycle.onBefore.transition),\n                this.observersForEvent(lifecycle.onBefore[transition]),\n      changed ? this.observersForEvent(lifecycle.onLeave.state) : UNOBSERVED,\n      changed ? this.observersForEvent(lifecycle.onLeave[from]) : UNOBSERVED,\n                this.observersForEvent(lifecycle.on.transition),\n      changed ? [ 'doTransit', [ this ] ]                       : UNOBSERVED,\n      changed ? this.observersForEvent(lifecycle.onEnter.state) : UNOBSERVED,\n      changed ? this.observersForEvent(lifecycle.onEnter[to])   : UNOBSERVED,\n      changed ? this.observersForEvent(lifecycle.on[to])        : UNOBSERVED,\n                this.observersForEvent(lifecycle.onAfter.transition),\n                this.observersForEvent(lifecycle.onAfter[transition]),\n                this.observersForEvent(lifecycle.on[transition])\n    ], args);\n  },\n\n  beginTransit: function()          { this.pending = true;                 },\n  endTransit:   function(result)    { this.pending = false; return result; },\n  failTransit:  function(result)    { this.pending = false; throw result;  },\n  doTransit:    function(lifecycle) { this.state = lifecycle.to;           },\n\n  observe: function(args) {\n    if (args.length === 2) {\n      var observer = {};\n      observer[args[0]] = args[1];\n      this.observers.push(observer);\n    }\n    else {\n      this.observers.push(args[0]);\n    }\n  },\n\n  observersForEvent: function(event) { // TODO: this could be cached\n    var n = 0, max = this.observers.length, observer, result = [];\n    for( ; n < max ; n++) {\n      observer = this.observers[n];\n      if (observer[event])\n        result.push(observer);\n    }\n    return [ event, result, true ]\n  },\n\n  observeEvents: function(events, args, previousEvent, previousResult) {\n    if (events.length === 0) {\n      return this.endTransit(previousResult === undefined ? true : previousResult);\n    }\n\n    var event     = events[0][0],\n        observers = events[0][1],\n        pluggable = events[0][2];\n\n    args[0].event = event;\n    if (event && pluggable && event !== previousEvent)\n      plugin.hook(this, 'lifecycle', args);\n\n    if (observers.length === 0) {\n      events.shift();\n      return this.observeEvents(events, args, event, previousResult);\n    }\n    else {\n      var observer = observers.shift(),\n          result = observer[event].apply(observer, args);\n      if (result && typeof result.then === 'function') {\n        return result.then(this.observeEvents.bind(this, events, args, event))\n                     .catch(this.failTransit.bind(this))\n      }\n      else if (result === false) {\n        return this.endTransit(false);\n      }\n      else {\n        return this.observeEvents(events, args, event, result);\n      }\n    }\n  },\n\n  onInvalidTransition: function(transition, from, to) {\n    throw new Exception(\"transition is invalid in current state\", transition, from, to, this.state);\n  },\n\n  onPendingTransition: function(transition, from, to) {\n    throw new Exception(\"transition is invalid while previous transition is still in progress\", transition, from, to, this.state);\n  }\n\n});\n\n//-------------------------------------------------------------------------------------------------\n\nmodule.exports = JSM;\n\n//-------------------------------------------------------------------------------------------------\n\n\n//# sourceURL=webpack://StateMachine/./src/jsm.js?");

/***/ }),

/***/ "./src/plugin.js":
/*!***********************!*\
  !*** ./src/plugin.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n//-------------------------------------------------------------------------------------------------\n\nvar mixin = __webpack_require__(/*! ./util/mixin */ \"./src/util/mixin.js\");\n\n//-------------------------------------------------------------------------------------------------\n\nmodule.exports = {\n\n  build: function(target, config) {\n    var n, max, plugin, plugins = config.plugins;\n    for(n = 0, max = plugins.length ; n < max ; n++) {\n      plugin = plugins[n];\n      if (plugin.methods)\n        mixin(target, plugin.methods);\n      if (plugin.properties)\n        Object.defineProperties(target, plugin.properties);\n    }\n  },\n\n  hook: function(fsm, name, additional) {\n    var n, max, method, plugin,\n        plugins = fsm.config.plugins,\n        args    = [fsm.context];\n\n    if (additional)\n      args = args.concat(additional)\n\n    for(n = 0, max = plugins.length ; n < max ; n++) {\n      plugin = plugins[n]\n      method = plugins[n][name]\n      if (method)\n        method.apply(plugin, args);\n    }\n  }\n\n}\n\n//-------------------------------------------------------------------------------------------------\n\n\n//# sourceURL=webpack://StateMachine/./src/plugin.js?");

/***/ }),

/***/ "./src/util/camelize.js":
/*!******************************!*\
  !*** ./src/util/camelize.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n//-------------------------------------------------------------------------------------------------\n\nfunction camelize(label) {\n\n  if (label.length === 0)\n    return label;\n\n  var n, result, word, words = label.split(/[_-]/);\n\n  // single word with first character already lowercase, return untouched\n  if ((words.length === 1) && (words[0][0].toLowerCase() === words[0][0]))\n    return label;\n\n  result = words[0].toLowerCase();\n  for(n = 1 ; n < words.length ; n++) {\n    result = result + words[n].charAt(0).toUpperCase() + words[n].substring(1).toLowerCase();\n  }\n\n  return result;\n}\n\n//-------------------------------------------------------------------------------------------------\n\ncamelize.prepended = function(prepend, label) {\n  label = camelize(label);\n  return prepend + label[0].toUpperCase() + label.substring(1);\n}\n\n//-------------------------------------------------------------------------------------------------\n\nmodule.exports = camelize;\n\n\n//# sourceURL=webpack://StateMachine/./src/util/camelize.js?");

/***/ }),

/***/ "./src/util/exception.js":
/*!*******************************!*\
  !*** ./src/util/exception.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function(message, transition, from, to, current) {\n  this.message    = message;\n  this.transition = transition;\n  this.from       = from;\n  this.to         = to;\n  this.current    = current;\n}\n\n\n//# sourceURL=webpack://StateMachine/./src/util/exception.js?");

/***/ }),

/***/ "./src/util/mixin.js":
/*!***************************!*\
  !*** ./src/util/mixin.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function(target, sources) {\n  var n, source, key;\n  for(n = 1 ; n < arguments.length ; n++) {\n    source = arguments[n];\n    for(key in source) {\n      if (source.hasOwnProperty(key))\n        target[key] = source[key];\n    }\n  }\n  return target;\n}\n\n\n//# sourceURL=webpack://StateMachine/./src/util/mixin.js?");

/***/ })

/******/ });