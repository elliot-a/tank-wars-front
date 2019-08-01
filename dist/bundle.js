/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	__webpack_require__.p = "./dist/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Comms.js":
/*!**********************!*\
  !*** ./src/Comms.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io-client */ \"./node_modules/socket.io-client/lib/index.js\");\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_0__);\n\nvar playerNumber = 0;\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  init: function init(callback) {\n    this.socket = socket_io_client__WEBPACK_IMPORTED_MODULE_0___default()('https://tank-wars-elliot.herokuapp.com/'); //this.socket = io('http://localhost:3000/');\n\n    this.socket.emit('player added');\n    this.socket.on('playerNumber', function (player) {\n      playerNumber = player;\n      callback(playerNumber);\n    });\n  },\n  killAll: function killAll() {\n    this.socket.close();\n  },\n  listen: function listen(func, event) {\n    this.socket.on(event, function (msg) {\n      console.log(msg);\n      func(msg);\n    });\n  },\n  sendData: function sendData(data, event) {\n    this.socket.emit(event, data);\n  }\n});\n\n//# sourceURL=webpack:///./src/Comms.js?");

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  type: phaser__WEBPACK_IMPORTED_MODULE_0___default.a.AUTO,\n  parent: 'content',\n  width: 800,\n  height: 500,\n  localStorageName: 'phasergame'\n});\n\n//# sourceURL=webpack:///./src/config.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scenes_Boot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/Boot */ \"./src/scenes/Boot.js\");\n/* harmony import */ var _scenes_Splash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/Splash */ \"./src/scenes/Splash.js\");\n/* harmony import */ var _scenes_Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/Game */ \"./src/scenes/Game.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ \"./src/config.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\nvar gameConfig = Object.assign(_config__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n  scene: [_scenes_Boot__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _scenes_Splash__WEBPACK_IMPORTED_MODULE_2__[\"default\"], _scenes_Game__WEBPACK_IMPORTED_MODULE_3__[\"default\"]]\n});\n\nvar Game =\n/*#__PURE__*/\nfunction (_Phaser$Game) {\n  _inherits(Game, _Phaser$Game);\n\n  function Game() {\n    _classCallCheck(this, Game);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Game).call(this, gameConfig));\n  }\n\n  return Game;\n}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Game);\n\nwindow.game = new Game();\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/scenes/Boot.js":
/*!****************************!*\
  !*** ./src/scenes/Boot.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var webfontloader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webfontloader */ \"./node_modules/webfontloader/webfontloader.js\");\n/* harmony import */ var webfontloader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webfontloader__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Phaser$Scene) {\n  _inherits(_default, _Phaser$Scene);\n\n  function _default() {\n    _classCallCheck(this, _default);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, {\n      key: 'BootScene'\n    }));\n  }\n\n  _createClass(_default, [{\n    key: \"preload\",\n    value: function preload() {\n      this.fontsReady = false;\n      this.fontsLoaded = this.fontsLoaded.bind(this);\n      this.add.text(100, 100, 'loading fonts...');\n      this.load.image('loaderBg', './assets/images/loader-bg.png');\n      this.load.image('loaderBar', './assets/images/loader-bar.png');\n      webfontloader__WEBPACK_IMPORTED_MODULE_1___default.a.load({\n        google: {\n          families: ['Bangers']\n        },\n        active: this.fontsLoaded\n      });\n    }\n  }, {\n    key: \"update\",\n    value: function update() {\n      if (this.fontsReady) {\n        console.log('launch splash scene');\n        this.scene.start('SplashScene');\n      }\n    }\n  }, {\n    key: \"fontsLoaded\",\n    value: function fontsLoaded() {\n      this.fontsReady = true;\n    }\n  }]);\n\n  return _default;\n}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene);\n\n\n\n//# sourceURL=webpack:///./src/scenes/Boot.js?");

/***/ }),

/***/ "./src/scenes/Game.js":
/*!****************************!*\
  !*** ./src/scenes/Game.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Comms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Comms */ \"./src/Comms.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n/* globals __DEV__ */\n\n\nvar playerPositions = {\n  player1: {\n    tank: {\n      x: 100,\n      y: 275\n    },\n    cannon: {\n      x: 115,\n      // +15\n      y: 255 //-20\n\n    }\n  },\n  player2: {\n    tank: {\n      x: 730,\n      y: 325\n    },\n    cannon: {\n      x: 715,\n      y: 305\n    }\n  }\n};\n\nvar _default =\n/*#__PURE__*/\nfunction (_Phaser$Scene) {\n  _inherits(_default, _Phaser$Scene);\n\n  function _default() {\n    _classCallCheck(this, _default);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, {\n      key: 'GameScene',\n      active: false,\n      physics: {\n        default: 'matter',\n        matter: {// /debug: true\n        }\n      }\n    }));\n  }\n\n  _createClass(_default, [{\n    key: \"init\",\n    value: function init() {}\n  }, {\n    key: \"preload\",\n    value: function preload() {\n      this.load.image(\"background\", \"../assets/images/background_03.png\");\n      this.load.image('tank1', 'assets/images/tank.png');\n      this.load.image('tank2', 'assets/images/tank2.png');\n      this.load.image('charge', 'assets/images/charge-bg.png');\n      this.load.image('cannon1', 'assets/images/cannon1.png');\n      this.load.image('cannon2', 'assets/images/cannon2.png');\n      this.load.image('ground4', 'assets/images/ground4.png');\n      this.load.image('rocks_01', 'assets/images/rocks_01.png');\n      this.load.image('rocks_02', 'assets/images/rocks_02.png');\n      this.load.image('rocks_03', 'assets/images/rocks_03.png');\n      this.load.image('tree_02', 'assets/images/tree_02.png');\n      this.load.image('tree_03', 'assets/images/tree_03.png');\n      this.load.image('bullet', 'assets/images/weapon_03_rocket.png');\n      this.load.image('restart', '../assets/images/restart.png');\n      this.load.image('victory', 'assets/images/victory.png');\n      this.load.image('defeat', 'assets/images/defeat.png');\n      this.load.image('waiting', 'assets/images/defeat.png');\n      this.load.image('currentTankIndicator', 'assets/images/current_tank.png');\n      this.load.spritesheet('boom', 'assets/images/explosion.png', {\n        frameWidth: 140,\n        frameHeight: 140\n      });\n      this.load.spritesheet('waterTiles', 'assets/images/water_tiles.png', {\n        frameWidth: 256,\n        frameHeight: 256\n      }); // Load body shapes from JSON file generated using PhysicsEditor\n\n      this.load.json('shapes', 'assets/game-assets.json');\n    }\n  }, {\n    key: \"create\",\n    value: function create() {\n      var _this = this;\n\n      this.playerNum = 1;\n      this.otherPlayer = 2;\n      _Comms__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init(function (playerNumber) {\n        _this.playerNum = playerNumber;\n        _this.otherPlayer = _this.playerNum === 1 ? 2 : 1;\n\n        _this.addPlayer(playerNumber);\n\n        _this['player' + playerNumber + 'Indicator'] = _this.add.image(playerPositions['player' + playerNumber].tank.x, playerPositions['player' + playerNumber].tank.y - 100, 'currentTankIndicator').setScale(0.5);\n      });\n      _Comms__WEBPACK_IMPORTED_MODULE_1__[\"default\"].listen(function () {\n        _this.addPlayer(_this.otherPlayer);\n      }, 'playersReady');\n      _Comms__WEBPACK_IMPORTED_MODULE_1__[\"default\"].listen(function () {\n        _this.removePlayer(_this.otherPlayer);\n      }, 'playerGone');\n      _Comms__WEBPACK_IMPORTED_MODULE_1__[\"default\"].listen(function (fireObject) {\n        _this.fireBullet(fireObject);\n      }, 'fire');\n      this.add.image(0, 0, 'background').setOrigin(0, 0); //this.matter.world.setBounds(0, 0, 800, 500);\n\n      this.shapes = this.cache.json.get('shapes');\n      var ground1 = this.matter.add.sprite(0, 0, 'ground4', null, {\n        shape: this.shapes.ground4\n      });\n      ground1.setPosition(0 + ground1.centerOfMass.x, 200 + ground1.centerOfMass.y);\n      var tree_02 = this.matter.add.sprite(0, 0, 'tree_02', null, {\n        shape: this.shapes.tree_02\n      });\n      tree_02.setPosition(255, 210);\n      tree_02.setScale(0.20);\n      var tree_03 = this.matter.add.sprite(0, 0, 'tree_02', null, {\n        shape: this.shapes.tree_02\n      });\n      tree_03.setPosition(460, 200);\n      tree_03.setScale(0.25);\n      var rocks_01 = this.matter.add.sprite(0, 0, 'rocks_01', null, {\n        shape: this.shapes.rocks_01\n      });\n      rocks_01.setPosition(283, 243);\n      rocks_01.setScale(0.2);\n      var rocks_02 = this.matter.add.sprite(0, 0, 'rocks_02', null, {\n        shape: this.shapes.rocks_02\n      });\n      rocks_02.setPosition(555, 290);\n      rocks_02.setScale(0.2);\n      var rocks_03 = this.matter.add.sprite(0, 0, 'rocks_03', null, {\n        shape: this.shapes.rocks_03\n      });\n      rocks_03.setPosition(783, 345);\n      rocks_03.setScale(0.2);\n      this.showWater();\n      this.input.keyboard.on('keydown-SPACE', function (event) {\n        _this.startCharge();\n      });\n      this.input.keyboard.on('keyup-SPACE', function (event) {\n        _this.fireWeapon();\n      });\n      this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {\n        if (bodyB.gameObject && bodyB.gameObject.name === \"bullet\") {\n          if (bodyA.gameObject && bodyA.gameObject.name === 'tank' + _this.playerNum) {\n            if (bodyB.gameObject.firer === _this.playerNum) {\n              return;\n            }\n\n            _this.showExplosion(bodyB.gameObject.x, bodyB.gameObject.y, true);\n\n            bodyB.gameObject.destroy();\n\n            _this.youLose();\n\n            return;\n          }\n\n          if (bodyA.gameObject && bodyA.gameObject.name === 'tank' + _this.otherPlayer) {\n            if (bodyB.gameObject.firer === _this.otherPlayer) {\n              return;\n            }\n\n            _this.showExplosion(bodyB.gameObject.x, bodyB.gameObject.y, true);\n\n            bodyB.gameObject.destroy();\n\n            _this.youWin();\n\n            return;\n          }\n\n          _this.showExplosion(bodyB.gameObject.x, bodyB.gameObject.y);\n\n          bodyB.gameObject.destroy();\n        }\n      }, this);\n    }\n  }, {\n    key: \"addPlayer\",\n    value: function addPlayer(playerNumber) {\n      if (this['player' + playerNumber]) {\n        this.removePlayer(playerNumber);\n      }\n\n      var positions = playerPositions['player' + playerNumber];\n      this['player' + playerNumber + 'Cannon'] = this.add.image(positions.cannon.x, positions.cannon.y, 'cannon' + playerNumber);\n      var originVal = playerNumber - 1;\n      this['player' + playerNumber + 'Cannon'].setOrigin(originVal, 0.5);\n      this['player' + playerNumber + 'Cannon'].flipX = playerNumber === 2;\n      this['player' + playerNumber] = this.matter.add.sprite(positions.tank.x, positions.tank.y, 'tank' + playerNumber, null, {\n        shape: this.shapes['tank' + playerNumber]\n      });\n      this['player' + playerNumber].name = 'tank' + playerNumber;\n    }\n  }, {\n    key: \"showRestart\",\n    value: function showRestart() {\n      var _this2 = this;\n\n      _Comms__WEBPACK_IMPORTED_MODULE_1__[\"default\"].killAll();\n      var reStartButton = this.add.image(400, 250, 'restart');\n      reStartButton.setInteractive();\n      reStartButton.on('pointerdown', function () {\n        _this2.scene.restart();\n      });\n    }\n  }, {\n    key: \"youWin\",\n    value: function youWin() {\n      var victory = this.add.image(400, 100, 'victory');\n      victory.setScale(0.5);\n      this.removePlayer(1);\n      this.removePlayer(2);\n      this.input.keyboard.off('keydown-SPACE');\n      this.showRestart();\n    }\n  }, {\n    key: \"youLose\",\n    value: function youLose() {\n      var defeat = this.add.image(400, 100, 'defeat');\n      defeat.setScale(0.75);\n      this.removePlayer(1);\n      this.removePlayer(2);\n      this.input.keyboard.off('keydown-SPACE');\n      this.showRestart();\n    }\n  }, {\n    key: \"showWater\",\n    value: function showWater() {\n      var config = {\n        key: 'water',\n        frames: this.anims.generateFrameNumbers('waterTiles', {\n          start: 0,\n          end: 20\n        }),\n        frameRate: 20,\n        repeat: -1\n      };\n      this.anims.create(config);\n      var i;\n\n      for (i = 0; i < 10; i++) {\n        var xPos = i * 127;\n        var waterAni = this.add.sprite(xPos, 450, 'waterTiles');\n        waterAni.setScale(0.5);\n        waterAni.anims.play('water');\n        waterAni.setDepth(1);\n      }\n    }\n  }, {\n    key: \"showExplosion\",\n    value: function showExplosion(x, y, large) {\n      var config = {\n        key: 'explode',\n        frames: this.anims.generateFrameNumbers('boom', {\n          start: 0,\n          end: 8,\n          first: 8\n        }),\n        frameRate: 20\n      };\n      this.anims.create(config);\n      var boom = this.add.sprite(x, y, 'boom');\n      boom.anims.play('explode');\n      boom.setDepth(1);\n\n      if (!large) {\n        boom.setScale(0.4);\n      }\n\n      setTimeout(function () {\n        boom.destroy();\n      }, 600);\n    }\n  }, {\n    key: \"removePlayer\",\n    value: function removePlayer(playerNumber) {\n      this['player' + playerNumber + 'Cannon'].destroy();\n      this['player' + playerNumber + 'Cannon'] = null;\n      this['player' + playerNumber].destroy();\n      this['player' + playerNumber] = null;\n\n      if (this.playerNum === playerNumber) {\n        this['player' + playerNumber + 'Indicator'].destroy();\n        this['player' + playerNumber + 'Indicator'] = null;\n      }\n    }\n  }, {\n    key: \"fireWeapon\",\n    value: function fireWeapon() {\n      if (!this['player' + this.playerNum + 'Charge']) {\n        return;\n      }\n\n      var chargeValue = (this['player' + this.playerNum + 'ChargeAmount'].width - 4) * 1.3; // 0-100\n\n      var angleValue = this['player' + this.playerNum + 'Cannon'].angle;\n      angleValue = this.playerNum === 1 ? angleValue : angleValue - 180;\n      this['player' + this.playerNum + 'Charge'].destroy();\n      this['player' + this.playerNum + 'Charge'] = null;\n      this['player' + this.playerNum + 'ChargeAmount'].destroy();\n      this['player' + this.playerNum + 'ChargeAmount'] = null;\n      this['player' + this.playerNum + 'Cannon'].charging = false;\n      this['player' + this.playerNum + 'Cannon'].uncharging = false;\n      var fireObject = {\n        x: this['player' + this.playerNum + 'Cannon'].x,\n        y: this['player' + this.playerNum + 'Cannon'].y,\n        angle: angleValue,\n        charge: chargeValue,\n        player: this.playerNum\n      };\n      _Comms__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sendData(fireObject, 'fire');\n    }\n  }, {\n    key: \"fireBullet\",\n    value: function fireBullet(fireObject) {\n      var x = fireObject.x;\n      var y = fireObject.y;\n      var angle = fireObject.angle;\n      var charge = fireObject.charge;\n      var player = fireObject.player;\n      var bullet = this.matter.add.sprite(x, y, 'bullet', null, {\n        shape: this.shapes.rocket\n      });\n      bullet.setScale(0.2);\n      bullet.label = 'bullet';\n      bullet.name = 'bullet';\n      bullet.firer = player;\n      bullet.setFriction(1, 0.02, 1);\n      var originVal = player === 1 ? 0 : 1; //bullet.setOrigin(originVal, 0.5);\n\n      setTimeout(function () {\n        bullet.destroy();\n      }, 2000);\n      bullet.setAngle(angle);\n      var angularVelocity = 0.07;\n      angularVelocity = player === 1 ? angularVelocity : -angularVelocity; //bullet.setAngularVelocity(angularVelocity);\n\n      bullet.setMass(130);\n      bullet.thrust(charge / 8);\n    }\n  }, {\n    key: \"startCharge\",\n    value: function startCharge() {\n      if (this['player' + this.playerNum + 'Charge']) {\n        return;\n      }\n\n      this['player' + this.playerNum + 'Cannon'].charging = true;\n      this['player' + this.playerNum + 'Cannon'].charge = 0;\n      this['player' + this.playerNum + 'Charge'] = this.add.image(playerPositions['player' + this.playerNum].tank.x, playerPositions['player' + this.playerNum].tank.y - 90, 'charge');\n      this['player' + this.playerNum + 'ChargeAmount'] = this.add.rectangle(this['player' + this.playerNum + 'Charge'].x - 39, this['player' + this.playerNum + 'Charge'].y - 1, 3, 3, 0xff0000).setOrigin(0, 0);\n    }\n  }, {\n    key: \"update\",\n    value: function update(time, delta) {\n      var chargeSpeed = 2.5;\n      var rotateSpeed = 1.5;\n\n      if (this.player1Cannon) {\n        if (this.player1Cannon.cannonFlipped) {\n          this.player1Cannon.angle -= rotateSpeed;\n\n          if (this.player1Cannon.angle < -70) {\n            this.player1Cannon.cannonFlipped = false;\n          }\n        } else {\n          this.player1Cannon.angle += rotateSpeed;\n\n          if (this.player1Cannon.angle > 10) {\n            this.player1Cannon.cannonFlipped = true;\n          }\n        }\n\n        if (this.player1Cannon.charging) {\n          this.player1ChargeAmount.width += chargeSpeed;\n\n          if (this.player1ChargeAmount.width > 78) {\n            this.player1Cannon.charging = false;\n            this.player1Cannon.uncharging = true;\n          }\n        }\n\n        if (this.player1Cannon.uncharging) {\n          this.player1ChargeAmount.width -= chargeSpeed;\n\n          if (this.player1ChargeAmount.width < 5) {\n            this.player1Cannon.charging = true;\n            this.player1Cannon.uncharging = false;\n          }\n        }\n      }\n\n      if (this.player2Cannon) {\n        if (this.player2Cannon.cannonFlipped) {\n          this.player2Cannon.angle -= rotateSpeed;\n\n          if (this.player2Cannon.angle < -10) {\n            this.player2Cannon.cannonFlipped = false;\n          }\n        } else {\n          this.player2Cannon.angle += rotateSpeed;\n\n          if (this.player2Cannon.angle > 70) {\n            this.player2Cannon.cannonFlipped = true;\n          }\n        }\n\n        if (this.player2Cannon.charging) {\n          this.player2ChargeAmount.width += chargeSpeed;\n\n          if (this.player2ChargeAmount.width > 78) {\n            this.player2Cannon.charging = false;\n            this.player2Cannon.uncharging = true;\n          }\n        }\n\n        if (this.player2Cannon.uncharging) {\n          this.player2ChargeAmount.width -= chargeSpeed;\n\n          if (this.player2ChargeAmount.width < 5) {\n            this.player2Cannon.charging = true;\n            this.player2Cannon.uncharging = false;\n          }\n        }\n      }\n    }\n  }]);\n\n  return _default;\n}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene);\n\n\n\n//# sourceURL=webpack:///./src/scenes/Game.js?");

/***/ }),

/***/ "./src/scenes/Splash.js":
/*!******************************!*\
  !*** ./src/scenes/Splash.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Phaser$Scene) {\n  _inherits(_default, _Phaser$Scene);\n\n  function _default() {\n    _classCallCheck(this, _default);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, {\n      key: 'SplashScene'\n    }));\n  }\n\n  _createClass(_default, [{\n    key: \"preload\",\n    value: function preload() {\n      this.load.image(\"splash\", \"../assets/images/start.png\");\n      this.load.image(\"startBtn\", \"../assets/images/startBtn.png\");\n    }\n  }, {\n    key: \"create\",\n    value: function create() {\n      var _this = this;\n\n      console.log('Splash');\n      this.add.image(0, 0, 'splash').setOrigin(0, 0);\n      var startButton = this.add.image(400, 400, 'startBtn');\n      startButton.setInteractive();\n      startButton.on('pointerdown', function () {\n        console.log('pointerover');\n\n        _this.scene.start('GameScene');\n      });\n    }\n  }, {\n    key: \"update\",\n    value: function update() {}\n  }]);\n\n  return _default;\n}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene);\n\n\n\n//# sourceURL=webpack:///./src/scenes/Splash.js?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /Users/elliotagro/Code/tank-wars/front-end/src/main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js?");

/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///ws_(ignored)?");

/***/ })

/******/ });