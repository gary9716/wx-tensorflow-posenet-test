function Event(eventType) {
  this.type = eventType;
}
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["XMLHttpRequest"] = factory();
	else
		root["XMLHttpRequest"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

"use strict";

/**
 * Created by axetroy on 17-6-23.
 */
/// <reference path="./index.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var XMLHttpRequest_1 = __webpack_require__(1);
// http event
var EVENT_READY_STATE_CHANGE = 'readystatechange';
var EVENT_ERROR = 'error';
var EVENT_TIMEOUT = 'timeout';
var EVENT_ABORT = 'abort';
// http status code and text
var HTTP_CODE2TEXT = {
    100: 'Continue',
    101: 'Switching Protocol',
    102: 'Processing',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    207: 'Multi-Status',
    208: 'Multi-Status',
    226: 'IM Used',
    300: 'Multiple Choice',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    306: 'unused',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Requested Range Not Satisfiable',
    417: 'Expectation Failed',
    418: "I'm a teapot",
    421: 'Misdirected Request',
    422: 'Unprocessable Entity',
    423: 'Locked',
    424: 'Failed Dependency',
    426: 'Upgrade Required',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
    510: 'Not Extended',
    511: 'Network Authentication Required'
};
// forbiden header
var FORBIDDEN_HEADERS = [
    "Accept-Charset",
    "Accept-Encoding",
    "Access-Control-Request-Headers",
    "Access-Control-Request-Method",
    "Connection",
    "Content-Length",
    "Cookie",
    "Cookie2",
    "Date",
    "DNT",
    "Expect",
    "Host",
    "Keep-Alive",
    "Origin",
    "Referer",
    "TE",
    "Trailer",
    "Transfer-Encoding",
    "Upgrade",
    "Via"
]
    .map(function (v) { return v.toLowerCase(); })
    .map(function (v) { return v.trim(); });
function lowerCaseIfy(headers) {
    var output = {};
    for (var header in headers) {
        if (headers.hasOwnProperty(header)) {
            output[header.toLowerCase()] = headers[header];
        }
    }
    return output;
}
var XMLHttpRequest = /** @class */ (function (_super) {
    __extends(XMLHttpRequest, _super);
    function XMLHttpRequest() {
        var _this = _super.call(this) || this;
        _this.name = 'XMLHttpRequest';
        _this.__method = null;
        _this.__async = true;
        _this.__requestHeader = {};
        _this.__responseHeader = {};
        _this.__aborted = false;
        _this.__requestTask = null; // this is WeChat app's request task return, for abort the request
        _this.__readyState = _this.UNSENT;
        _this.__onreadystatechangeHandler = function (event) { };
        _this.__withCredentials = true; // default is true
        _this.__responseType = null;
        _this.__response = null;
        _this.__responseStatus = 0;
        _this.__timeout = 0;
        _this.__haveTimeout = false;
        _this.__requestDone = false;
        _this.addEventListener(EVENT_READY_STATE_CHANGE, function (ev) {
            _this.__onreadystatechangeHandler(ev);
        });
        _this.addEventListener(EVENT_TIMEOUT, function (ev) {
            _this.__ontimeoutHandler(ev);
        });
        _this.addEventListener(EVENT_ABORT, function (ev) {
            _this.__onabortHandler(ev);
        });
        _this.addEventListener(EVENT_ERROR, function (ev) {
            _this.__onerrorHandler(ev);
        });
        return _this;
    }
    Object.defineProperty(XMLHttpRequest.prototype, "readyState", {
        get: function () {
            return this.__readyState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XMLHttpRequest.prototype, "onreadystatechange", {
        get: function () {
            return this.__onreadystatechangeHandler;
        },
        set: function (callback) {
            this.__onreadystatechangeHandler = callback;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XMLHttpRequest.prototype, "withCredentials", {
        get: function () {
            return this.__withCredentials;
        },
        set: function (value) {
            this.__withCredentials = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XMLHttpRequest.prototype, "response", {
        get: function () {
            return this.__response;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XMLHttpRequest.prototype, "responseText", {
        get: function () {
            return typeof this.__response === 'object'
                ? JSON.stringify(this.__response)
                : this.__response;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XMLHttpRequest.prototype, "responseURL", {
        get: function () {
            return this.__url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XMLHttpRequest.prototype, "timeout", {
        get: function () {
            return this.__timeout;
        },
        set: function (millisecond) {
            this.__timeout = millisecond;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XMLHttpRequest.prototype, "status", {
        get: function () {
            return this.__responseStatus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XMLHttpRequest.prototype, "statusText", {
        get: function () {
            return HTTP_CODE2TEXT[this.status] || 'unknown';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XMLHttpRequest.prototype, "responseType", {
        get: function () {
            return this.__responseType;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * override mime type, not support yet
     * @param mimetype
     */
    XMLHttpRequest.prototype.overrideMimeType = function (mimetype) {
        if (this.readyState >= this.HEADERS_RECEIVED) {
            throw new Error("Can not apply 'overrideMimeType' after send data");
        }
    };
    /**
     * fake to open the server
     * @param method
     * @param url
     * @param async
     * @param user
     * @param password
     */
    XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
        if (async === void 0) { async = true; }
        if (user === void 0) { user = null; }
        if (password === void 0) { password = null; }
        // if open over 2 time, then close connection
        if (this.readyState >= this.OPENED) {
            this.abort();
            return;
        }
        this.__method = method;
        this.__url = url;
        this.__async = async;
        this.__user = user;
        this.__password = password;
        this.__readyState = this.OPENED;
        this.dispatchEvent(new Event(EVENT_READY_STATE_CHANGE));
    };
    /**
     * send data
     * @param data
     */
    XMLHttpRequest.prototype.send = function (data) {
        var _this = this;
        if (this.__readyState !== this.OPENED) {
            throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
        }
        // if the request have been aborted before send data
        if (this.__aborted === true) {
            return;
        }
        // can not resend
        if (this.__requestDone) {
            return;
        }
        var timer = null;
        if (this.timeout > 0) {
            timer = setTimeout(function () {
                if (_this.__aborted === true) {
                    return;
                }
                _this.__haveTimeout = true;
                if (_this.__requestTask) {
                    _this.__requestTask.abort();
                }
                _this.dispatchEvent(new Event(EVENT_TIMEOUT));
            }, this.timeout);
        }
        this.__requestTask = this.__requestTask = wx.request({
            url: this.__url,
            method: this.__method,
            header: this.__requestHeader,
            data: data,
            dataType: 'json',
            success: function (res) {
                if (_this.__haveTimeout || _this.__aborted)
                    return;
                timer && clearTimeout(timer);
                _this.__requestDone = true;
                _this.__requestTask = null;
                _this.__responseStatus = res.statusCode;
                _this.__responseHeader = lowerCaseIfy(res.header);
                _this.__response = res.data === void 0 ? null : res.data;
                if (_this.__responseStatus >= 400) {
                    _this.dispatchEvent(new Event(EVENT_ERROR));
                }
            },
            fail: function (res) {
                if (_this.__haveTimeout || _this.__aborted)
                    return;
                timer && clearTimeout(timer);
                _this.__requestDone = true;
                _this.__requestTask = null;
                _this.__responseStatus = res.statusCode;
                _this.__responseHeader = lowerCaseIfy(res.header);
                _this.__response = res.data === void 0 ? null : res.data;
                _this.dispatchEvent(new Event(EVENT_ERROR));
            },
            complete: function () {
                if (_this.__haveTimeout || _this.__aborted)
                    return;
                _this.__readyState = _this.HEADERS_RECEIVED;
                _this.dispatchEvent(new Event(EVENT_READY_STATE_CHANGE));
                _this.__readyState = _this.LOADING;
                _this.dispatchEvent(new Event(EVENT_READY_STATE_CHANGE));
                _this.__readyState = _this.DONE;
                _this.dispatchEvent(new Event(EVENT_READY_STATE_CHANGE));
            }
        });
    };
    /**
     * abort the request after send
     */
    XMLHttpRequest.prototype.abort = function () {
        // if the request have been aborted or have finish the quest
        // do nothing and return void
        if (this.__aborted || this.__requestDone) {
            return;
        }
        if (this.__requestTask) {
            this.__requestTask.abort();
        }
        this.__aborted = true;
        this.dispatchEvent(new Event(EVENT_ABORT));
    };
    /**
     * set request header
     * @param header
     * @param value
     */
    XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
        // not call .open() yet
        if (this.readyState < this.OPENED) {
            throw new Error("Failed to execute 'setRequestHeader' on 'XMLHttpRequest': The object's state must be OPENED.");
        }
        if (FORBIDDEN_HEADERS.findIndex(function (v) { return v.trim() === header; }) >= 0) {
            throw new Error("Invalid header " + header);
        }
        this.__requestHeader[header] = value + '';
    };
    /**
     * get response header
     * @param header
     * @returns {null}
     */
    XMLHttpRequest.prototype.getResponseHeader = function (header) {
        var val = this.__responseHeader[header.toLowerCase()];
        return val !== undefined ? val : null;
    };
    /**
     * get all response header string
     * @returns {string}
     */
    XMLHttpRequest.prototype.getAllResponseHeaders = function () {
        var headers = [];
        var headersObject = lowerCaseIfy(this.__responseHeader);
        for (var header in headersObject) {
            if (headersObject.hasOwnProperty(header)) {
                var value = headersObject[header];
                headers.push(header.toLowerCase() + ": " + value);
            }
        }
        return headers.join('\n');
    };
    return XMLHttpRequest;
}(XMLHttpRequest_1.default));
exports.default = XMLHttpRequest;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var XMLHttpRequestEventTarget_1 = __webpack_require__(2);
var UNSENT = 0;
var OPENED = 1;
var HEADERS_RECEIVED = 2;
var LOADING = 3;
var DONE = 4;
var XMLHttpRequest = /** @class */ (function (_super) {
    __extends(XMLHttpRequest, _super);
    function XMLHttpRequest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DONE = DONE;
        _this.LOADING = LOADING;
        _this.HEADERS_RECEIVED = HEADERS_RECEIVED;
        _this.OPENED = OPENED;
        _this.UNSENT = UNSENT;
        return _this;
    }
    return XMLHttpRequest;
}(XMLHttpRequestEventTarget_1.default));
exports.default = XMLHttpRequest;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EventTarget_1 = __webpack_require__(3);
var XMLHttpRequestEventTarget = /** @class */ (function (_super) {
    __extends(XMLHttpRequestEventTarget, _super);
    function XMLHttpRequestEventTarget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.__onabortHandler = function (event) { };
        _this.__onerrorHandler = function (event) { };
        _this.__ontimeoutHandler = function (event) { };
        return _this;
    }
    Object.defineProperty(XMLHttpRequestEventTarget.prototype, "onabort", {
        get: function () {
            return this.__onabortHandler || null;
        },
        set: function (func) {
            this.__onabortHandler = func;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XMLHttpRequestEventTarget.prototype, "onerror", {
        get: function () {
            return this.__onerrorHandler || null;
        },
        set: function (func) {
            this.__onerrorHandler = func;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XMLHttpRequestEventTarget.prototype, "ontimeout", {
        get: function () {
            return this.__ontimeoutHandler || null;
        },
        set: function (func) {
            this.__ontimeoutHandler = func;
        },
        enumerable: true,
        configurable: true
    });
    return XMLHttpRequestEventTarget;
}(EventTarget_1.default));
exports.default = XMLHttpRequestEventTarget;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _EventTarget = /** @class */ (function () {
    function _EventTarget() {
        this.__listeners = {};
    }
    _EventTarget.prototype.addEventListener = function (type, callback) {
        if (!(type in this.__listeners)) {
            this.__listeners[type] = [];
        }
        this.__listeners[type].push(callback);
    };
    _EventTarget.prototype.removeEventListener = function (type, callback) {
        if (!(type in this.__listeners)) {
            return;
        }
        var stack = this.__listeners[type];
        for (var i = 0, l = stack.length; i < l; i++) {
            if (stack[i] === callback) {
                stack.splice(i, 1);
                return this.removeEventListener(type, callback);
            }
        }
    };
    _EventTarget.prototype.dispatchEvent = function (event) {
        if (!(event.type in this.__listeners)) {
            return;
        }
        var stack = this.__listeners[event.type];
        Object.defineProperty(event, 'target', {
            value: this
        });
        Object.defineProperty(event, 'srcElement', {
            value: this
        });
        Object.defineProperty(event, 'currentTarget', {
            value: this
        });
        for (var i = 0, l = stack.length; i < l; i++) {
            stack[i].call(this, event);
        }
    };
    return _EventTarget;
}());
exports.default = _EventTarget;


/***/ })
/******/ ]);
});