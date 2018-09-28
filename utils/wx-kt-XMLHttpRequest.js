class Event {
  constructor(t) {
    this.type = t;
  }
}

class EventTarget {
  constructor() {
    this.listeners = {};
  }

  addEventListener (type, callback) {
    if (!(type in this.listeners)) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
  };

  removeEventListener (type, callback) {
    if (!(type in this.listeners)) {
      return;
    }
    var stack = this.listeners[type];
    for (var i = 0, l = stack.length; i < l; i++) {
      if (stack[i] === callback) {
        stack.splice(i, 1);
        return;
      }
    }
  };

  dispatchEvent (event) {
    if (!(event.type in this.listeners)) {
      return true;
    }
    var stack = this.listeners[event.type];
    event.target = this;
    for (var i = 0, l = stack.length; i < l; i++) {
      stack[i].call(this, event);
    }
    return !event.defaultPrevented;
  };
}

class XMLHttpRequestEventTarget extends EventTarget {
  
  static EVENT_ABORT = "onabort";
  static EVENT_ERROR = "onerror";
  static EVENT_LOAD_END = "onloadend";
  static EVENT_LOAD_START = "onloadstart";
  static EVENT_PROGRESS = "onprogress";
  static EVENT_TIMEOUT = "ontimeout";
  static EVENT_LOAD = "onload";

  constructor() {
    super();
    
    this.onabort = () => {
      
    }

    this.onerror = () => {

    }

    this.onload = () => {

    }

    this.onloadstart = () => {

    }

    this.onloadend = () => {

    }

    this.onprogress = () => {

    }

    this.ontimeout = () => {

    }

    this.addEventListener(XMLHttpRequestEventTarget.EVENT_ABORT, this.triggerEvent);
    this.addEventListener(XMLHttpRequestEventTarget.EVENT_ERROR, this.triggerEvent);
    this.addEventListener(XMLHttpRequestEventTarget.EVENT_LOAD_END, this.triggerEvent);
    this.addEventListener(XMLHttpRequestEventTarget.EVENT_LOAD_START, this.triggerEvent);
    this.addEventListener(XMLHttpRequestEventTarget.EVENT_LOAD, this.triggerEvent);
    this.addEventListener(XMLHttpRequestEventTarget.EVENT_TIMEOUT, this.triggerEvent);
    this.addEventListener(XMLHttpRequestEventTarget.EVENT_PROGRESS, this.triggerEvent);

  }

  triggerEvent(event) {
    if (typeof this[event.type] === 'function') {
      this[event.type]();
    }
  }

}

class XMLHttpRequest extends XMLHttpRequestEventTarget {

  //Constants
  static UNSENT = 0;
  static OPENED = 1;
  static HEADERS_RECEIVED = 2;
  static LOADING = 3;
  static DONE = 4;

  static EVENT_READY_STATE_CHANGE = "onreadystatechange";

  constructor() {
    super();    

    //variable
    this.readystate = XMLHttpRequest.UNSENT;
    this.timeout = 0;
    this.upload = new XMLHttpRequestEventTarget();
    this.withCredentials = false;

    this.status = 0;
    this.statusText = "";
    this.response = null; //based on responseType
    this.responseType = "json"; //"arraybuffer", "blob", "document" , "json" , "text"
    this.responseText = null;
    this.responseURL = null;
    this.responseXML = null;

    this.timer = null;

    this._reqHeader = {};
    this._resHeader = {};
    this._aborted = false;
    this._reqDone = false;

    this.onreadystatechange = () => {

    }

    this.addEventListener(XMLHttpRequest.EVENT_READY_STATE_CHANGE, this.triggerEvent);
  }

  /**
    UNSENT
      XMLHttpRequest 客戶端物件已被建立，但 open() 方法尚未被呼叫。
    OPENED
      open() 方法已被呼叫。於此狀態時，可以使用 setRequestHeader() 方法設定請求標頭（request headers），並可呼叫 send() 方法來發送請求。
    HEADERS_RECEIVED
      send() 方法已被呼叫，並且已接收到回應標頭（response header）。
    LOADING
      正在接收回應內容（response's body）。如 responseType 屬性為 "text" 或空字串，則 responseText 屬性將會在載入的過程中擁有已載入部分之回應（response）內容中的文字。
    DONE
      請求操作已完成。這意味著資料傳輸可能已成功完成或是已失敗。
   */
  
  //status:
  /**
   * Outputs the following:
   *
   * UNSENT 0
   * OPENED 0
   * LOADING 200
   * DONE 200
   */

  lowerCaseIfy(headers) {
    var output = {};
    for (var header in headers) {
      if (headers.hasOwnProperty(header)) {
        output[header.toLowerCase()] = headers[header];
      }
    }
    return output;
  }

  abort() {
    this.status = 0;
    this.readystate = XMLHttpRequest.UNSENT;
    this._aborted = true;
    this.dispatchEvent(new Event(XMLHttpRequest.EVENT_READY_STATE_CHANGE));
  }

  getAllResponseHeaders() {
    let headers = [];
    let headersObject = this.lowerCaseIfy(this._resHeader);
    for (let header in headersObject) {
      if (headersObject.hasOwnProperty(header)) {
        let value = headersObject[header];
        headers.push(header.toLowerCase() + ": " + value);
      }
    }
    return headers.join('\n');
  }

  getResponseHeader(header) {
    let val = this._resHeader[header.toLowerCase()];
    return val !== undefined ? val : null;
  }

  open(method, url, isAsync, user, password) {
    if (method !== "GET" && method !== "POST" && method !== "PUT" && method !== "DELETE") {
      return;
    }

    if (this.readyState >= XMLHttpRequest.OPENED) {
      this.abort();
      return;
    }

    this.readyState = XMLHttpRequest.OPENED;
    this._method = method;
    this._url = url;
    this._isAsync = isAsync;
    this._user = user;
    this._password = password;

    this._reqHeader = {};
    this._resHeader = {};

    this._aborted = false;
    this._reqDone = false;
    this._reqTask = null;

    this.dispatchEvent(new Event(XMLHttpRequest.EVENT_READY_STATE_CHANGE));
  }

  send(body) {
    let _this = this;
    if (this.readyState !== XMLHttpRequest.OPENED) {
      throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
    }
    // if the request have been aborted before send data
    if (this._aborted) {
      return;
    }
    // can not resend
    if (this._reqDone) {
      return;
    }
    this.timer = null;
    if (this.timeout > 0) {
      this.timer = setTimeout(function () {
        if (_this._aborted) {
          return;
        }
        _this._haveTimeout = true;
        if (_this._reqTask && _this._reqTask.abort) {
          _this._reqTask.abort();
        }
        _this.dispatchEvent(new Event(XMLHttpRequestEventTarget.EVENT_TIMEOUT));
      }, this.timeout);
    }

    var dataType = 'json';
    if (_this._reqHeader["Content-Type"]) {
      var info = _this._reqHeader["Content-Type"].split("/");
      if(info.length > 1) dataType = info[1];
    }
    this._reqTask = wx.request({
      url: _this._url,
      method: _this._method,
      header: _this._reqHeader,
      data: body,
      dataType: dataType,
      success: function (res) {
        if (_this._haveTimeout || _this._aborted)
          return;
        _this.status = res.statusCode;
        _this._resHeader = _this.lowerCaseIfy(res.header);
        _this.response = res.data === void 0 ? null : res.data;
        if(typeof res.data === "string")
          _this.responseText = res.data;
        else if(typeof res.data === "object")
          _this.responseText = JSON.stringify(res.data);
        else
          _this.responseText = "";

        if (_this.status >= 400) {
          _this.dispatchEvent(new Event(XMLHttpRequestEventTarget.EVENT_ERROR));
        }
      },
      fail: function (res) {
        if (_this._haveTimeout || _this._aborted)
          return;
        _this.status = res.statusCode;
        _this._resHeader = _this.lowerCaseIfy(res.header);
        _this.response = res.data === void 0 ? null : res.data;
        _this.dispatchEvent(new Event(XMLHttpRequestEventTarget.EVENT_ERROR));
      },
      complete: function () {
        _this.timer && clearTimeout(_this.timer);
        _this._reqDone = true;
        _this._reqTask = null;
        if (_this._haveTimeout || _this._aborted)
          return;
        _this.readyState = XMLHttpRequest.HEADERS_RECEIVED;
        _this.dispatchEvent(new Event(XMLHttpRequest.EVENT_READY_STATE_CHANGE));
        _this.readyState = XMLHttpRequest.LOADING;
        _this.dispatchEvent(new Event(XMLHttpRequest.EVENT_READY_STATE_CHANGE));
        _this.readyState = XMLHttpRequest.DONE;
        _this.dispatchEvent(new Event(XMLHttpRequest.EVENT_READY_STATE_CHANGE));
      }
    });
  }

  setRequestHeader(header, value) {
    // not call .open() yet
    if (this.readyState < XMLHttpRequest.OPENED) {
      throw new Error("Failed to execute 'setRequestHeader' on 'XMLHttpRequest': The object's state must be OPENED.");
    }
    this._reqHeader[header] = value + '';
  };

  overrideMimeType = function (mimetype) {
    if (this.readyState >= XMLHttpRequest.HEADERS_RECEIVED) {
      throw new Error("Can not apply 'overrideMimeType' after send data");
    }
    this._reqHeader["Content-Type"] = mimetype + '';
  };
}

module.exports = XMLHttpRequest;