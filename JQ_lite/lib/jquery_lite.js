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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let DOMNodeCollection = __webpack_require__ (1);

window.$l = (arg) => {
  if (typeof(arg) === "string") {
    let nodeList =  document.querySelectorAll(arg);
    return new DOMNodeCollection(nodeList);
  } else {
    return new DOMNodeCollection([arg]);
  }
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {

  constructor (htmlElements) {
    this.$htmlElements = htmlElements;
  }

  html (arg) {
    if (!arg) {
      return this.$htmlElements[0].innerHTML;
    } else {
      this.$htmlElements.forEach(function (node) {
        node.innerHTML = arg;
      });
    }
  }

  empty () {
    this.$htmlElements.forEach(function (node) {
      node.innerHTML = "";
    });
  }

  append (arg) {
    if (typeof(arg) === "string") {
      this.$htmlElements.forEach(function (node) {
        node.innerHTML += arg;
      });
    } else if (arg instanceof HTMLElement) {
      this.$htmlElements.forEach(function (node) {
        node.innerHTML += arg.outerHTML;
      });
    } else {
      let self = this;
      arg.$htmlElements.forEach(function (ele) {
        self.$htmlElements.forEach(function (node) {
          node.innerHTML += ele.outerHTML;
        });
      });
    }
  }

  children () {
    let arr = [];
    this.$htmlElements.forEach(function (node) {
      node.children.forEach(function (child) {
        arr.push(child);
      });
    });
    return new DOMNodeCollection(arr);
  }

  parent () {
    let parArr = [];
    this.$htmlElements.forEach(function (node) {
      parArr.push(node.parent);
    });
    return new DOMNodeCollection(parArr);
  }

  find (arg) {
    let findArr = [];
    for (var i = 0; i < this.$htmlElements.length; i++) {
      if (arg === arg.slice(1)) {
        findArr = findArr.concat(this.$htmlElements[i].children.$htmlElements);
      }
    }
    return new DOMNodeCollection(findArr);
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);