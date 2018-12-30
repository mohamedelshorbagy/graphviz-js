// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"src/vizualization/line.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Line =
/*#__PURE__*/
function () {
  function Line(context, x1, y1, x2, y2) {
    _classCallCheck(this, Line);

    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.context = context;
  }

  _createClass(Line, [{
    key: "draw",
    value: function draw() {
      this.context.beginPath();
      this.context.moveTo(this.x1, this.y1);
      this.context.lineTo(this.x2, this.y2);
      this.context.closePath();
      this.context.stroke();
    }
  }]);

  return Line;
}();

exports.default = Line;
},{}],"src/graph/graph.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _line = _interopRequireDefault(require("../vizualization/line"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Graph =
/*#__PURE__*/
function () {
  /**
   * @param {boolean} isDirected
   */
  function Graph() {
    var isDirected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, Graph);

    this.vertices = {};
    this.edges = {};
    this.isDirected = isDirected;
  }
  /**
   * @param {GraphVertex} newVertex
   * @returns {Graph}
   */


  _createClass(Graph, [{
    key: "addVertex",
    value: function addVertex(newVertex) {
      this.vertices[newVertex.getKey()] = newVertex;
      return this;
    }
    /**
     * @param {string} vertexKey
     * @returns GraphVertex
     */

  }, {
    key: "getVertexByKey",
    value: function getVertexByKey(vertexKey) {
      return this.vertices[vertexKey];
    }
    /**
     * @param {GraphVertex} vertex
     * @returns {GraphVertex[]}
     */

  }, {
    key: "getNeighbors",
    value: function getNeighbors(vertex) {
      return vertex.getNeighbors();
    }
    /**
     * @return {GraphVertex[]}
     */

  }, {
    key: "getAllVertices",
    value: function getAllVertices() {
      return Object.values(this.vertices);
    }
    /**
     * @return {GraphEdge[]}
     */

  }, {
    key: "getAllEdges",
    value: function getAllEdges() {
      return Object.values(this.edges);
    }
    /**
     * @param {GraphEdge} edge
     * @returns {Graph}
     */

  }, {
    key: "addEdge",
    value: function addEdge(edge) {
      // Try to find and end start vertices.
      var startVertex = this.getVertexByKey(edge.startVertex.getKey());
      var endVertex = this.getVertexByKey(edge.endVertex.getKey()); // Insert start vertex if it wasn't inserted.

      if (!startVertex) {
        this.addVertex(edge.startVertex);
        startVertex = this.getVertexByKey(edge.startVertex.getKey());
      } // Insert end vertex if it wasn't inserted.


      if (!endVertex) {
        this.addVertex(edge.endVertex);
        endVertex = this.getVertexByKey(edge.endVertex.getKey());
      } // Check if edge has been already added.


      if (this.edges[edge.getKey()]) {
        throw new Error('Edge has already been added before');
      } else {
        this.edges[edge.getKey()] = edge;
      } // Add edge to the vertices.


      if (this.isDirected) {
        // If graph IS directed then add the edge only to start vertex.
        startVertex.addEdge(edge);
      } else {
        // If graph ISN'T directed then add the edge to both vertices.
        startVertex.addEdge(edge);
        endVertex.addEdge(edge);
      }

      var line = new _line.default(startVertex.shape.ctx, startVertex.shape.edges.right.x, startVertex.shape.edges.right.y, endVertex.shape.edges.left.x, endVertex.shape.edges.right.y);
      line.draw();
      return this;
    }
    /**
     * @param {GraphEdge} edge
     */

  }, {
    key: "deleteEdge",
    value: function deleteEdge(edge) {
      // Delete edge from the list of edges.
      if (this.edges[edge.getKey()]) {
        delete this.edges[edge.getKey()];
      } else {
        throw new Error('Edge not found in graph');
      } // Try to find and end start vertices and delete edge from them.


      var startVertex = this.getVertexByKey(edge.startVertex.getKey());
      var endVertex = this.getVertexByKey(edge.endVertex.getKey());
      startVertex.deleteEdge(edge);
      endVertex.deleteEdge(edge);
    }
    /**
     * @param {GraphVertex} startVertex
     * @param {GraphVertex} endVertex
     * @return {(GraphEdge|null)}
     */

  }, {
    key: "findEdge",
    value: function findEdge(startVertex, endVertex) {
      var vertex = this.getVertexByKey(startVertex.getKey());

      if (!vertex) {
        return null;
      }

      return vertex.findEdge(endVertex);
    }
    /**
     * @return {number}
     */

  }, {
    key: "getWeight",
    value: function getWeight() {
      return this.getAllEdges().reduce(function (weight, graphEdge) {
        return weight + graphEdge.weight;
      }, 0);
    }
    /**
     * Reverse all the edges in directed graph.
     * @return {Graph}
     */

  }, {
    key: "reverse",
    value: function reverse() {
      var _this = this;

      /** @param {GraphEdge} edge */
      this.getAllEdges().forEach(function (edge) {
        // Delete straight edge from graph and from vertices.
        _this.deleteEdge(edge); // Reverse the edge.


        edge.reverse(); // Add reversed edge back to the graph and its vertices.

        _this.addEdge(edge);
      });
      return this;
    }
    /**
     * @return {object}
     */

  }, {
    key: "getVerticesIndices",
    value: function getVerticesIndices() {
      var verticesIndices = {};
      this.getAllVertices().forEach(function (vertex, index) {
        verticesIndices[vertex.getKey()] = index;
      });
      return verticesIndices;
    }
    /**
     * @return {*[][]}
     */

  }, {
    key: "getAdjacencyMatrix",
    value: function getAdjacencyMatrix() {
      var _this2 = this;

      var vertices = this.getAllVertices();
      var verticesIndices = this.getVerticesIndices(); // Init matrix with infinities meaning that there is no ways of
      // getting from one vertex to another yet.

      var adjacencyMatrix = Array(vertices.length).fill(null).map(function () {
        return Array(vertices.length).fill(Infinity);
      }); // Fill the columns.

      vertices.forEach(function (vertex, vertexIndex) {
        vertex.getNeighbors().forEach(function (neighbor) {
          var neighborIndex = verticesIndices[neighbor.getKey()];
          adjacencyMatrix[vertexIndex][neighborIndex] = _this2.findEdge(vertex, neighbor).weight;
        });
      });
      return adjacencyMatrix;
    }
    /**
     * @return {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      return Object.keys(this.vertices).toString();
    }
  }]);

  return Graph;
}();

exports.default = Graph;
},{"../vizualization/line":"src/vizualization/line.js"}],"src/linked-list/node.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LinkedListNode =
/*#__PURE__*/
function () {
  function LinkedListNode(value) {
    var next = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, LinkedListNode);

    this.value = value;
    this.next = next;
  }

  _createClass(LinkedListNode, [{
    key: "toString",
    value: function toString(callback) {
      return callback ? callback(this.value) : "".concat(this.value);
    }
  }]);

  return LinkedListNode;
}();

exports.default = LinkedListNode;
},{}],"src/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Comparator = exports.utils = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var utils = {
  guid: function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  },
  randomId: function randomId() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  }
};
exports.utils = utils;

var Comparator =
/*#__PURE__*/
function () {
  /**
   * @param {function(a: *, b: *)} [compareFunction] - It may be custom compare function that, let's
   * say may compare custom objects together.
   */
  function Comparator(compareFunction) {
    _classCallCheck(this, Comparator);

    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }
  /**
   * Default comparison function. It just assumes that "a" and "b" are strings or numbers.
   * @param {(string|number)} a
   * @param {(string|number)} b
   * @returns {number}
   */


  _createClass(Comparator, [{
    key: "equal",

    /**
     * Checks if two variables are equal.
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    value: function equal(a, b) {
      return this.compare(a, b) === 0;
    }
    /**
     * Checks if variable "a" is less than "b".
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */

  }, {
    key: "lessThan",
    value: function lessThan(a, b) {
      return this.compare(a, b) < 0;
    }
    /**
     * Checks if variable "a" is greater than "b".
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */

  }, {
    key: "greaterThan",
    value: function greaterThan(a, b) {
      return this.compare(a, b) > 0;
    }
    /**
     * Checks if variable "a" is less than or equal to "b".
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */

  }, {
    key: "lessThanOrEqual",
    value: function lessThanOrEqual(a, b) {
      return this.lessThan(a, b) || this.equal(a, b);
    }
    /**
     * Checks if variable "a" is greater than or equal to "b".
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */

  }, {
    key: "greaterThanOrEqual",
    value: function greaterThanOrEqual(a, b) {
      return this.greaterThan(a, b) || this.equal(a, b);
    }
    /**
     * Reverses the comparison order.
     */

  }, {
    key: "reverse",
    value: function reverse() {
      var compareOriginal = this.compare;

      this.compare = function (a, b) {
        return compareOriginal(b, a);
      };
    }
  }], [{
    key: "defaultCompareFunction",
    value: function defaultCompareFunction(a, b) {
      if (a === b) {
        return 0;
      }

      return a < b ? -1 : 1;
    }
  }]);

  return Comparator;
}();

exports.Comparator = Comparator;
},{}],"src/linked-list/linkedlist.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _node = _interopRequireDefault(require("./node"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LinkedList =
/*#__PURE__*/
function () {
  /**
   * @param {Function} [comparatorFunction]
   */
  function LinkedList(comparatorFunction) {
    _classCallCheck(this, LinkedList);

    /** @var LinkedListNode */
    this.head = null;
    /** @var LinkedListNode */

    this.tail = null;
    this.compare = new _utils.Comparator(comparatorFunction);
  }
  /**
   * @param {*} value
   * @return {LinkedList}
   */


  _createClass(LinkedList, [{
    key: "prepend",
    value: function prepend(value) {
      // Make new node to be a head.
      var newNode = new _node.default(value, this.head);
      this.head = newNode; // If there is no tail yet let's make new node a tail.

      if (!this.tail) {
        this.tail = newNode;
      }

      return this;
    }
    /**
     * @param {*} value
     * @return {LinkedList}
     */

  }, {
    key: "append",
    value: function append(value) {
      var newNode = new _node.default(value); // If there is no head yet let's make new node a head.

      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
        return this;
      } // Attach new node to the end of linked list.


      this.tail.next = newNode;
      this.tail = newNode;
      return this;
    }
    /**
     * @param {*} value
     * @return {LinkedListNode}
     */

  }, {
    key: "delete",
    value: function _delete(value) {
      if (!this.head) {
        return null;
      }

      var deletedNode = null; // If the head must be deleted then make next node that is differ
      // from the head to be a new head.

      while (this.head && this.compare.equal(this.head.value, value)) {
        deletedNode = this.head;
        this.head = this.head.next;
      }

      var currentNode = this.head;

      if (currentNode !== null) {
        // If next node must be deleted then make next node to be a next next one.
        while (currentNode.next) {
          if (this.compare.equal(currentNode.next.value, value)) {
            deletedNode = currentNode.next;
            currentNode.next = currentNode.next.next;
          } else {
            currentNode = currentNode.next;
          }
        }
      } // Check if tail must be deleted.


      if (this.compare.equal(this.tail.value, value)) {
        this.tail = currentNode;
      }

      return deletedNode;
    }
    /**
     * @param {Object} findParams
     * @param {*} findParams.value
     * @param {function} [findParams.callback]
     * @return {LinkedListNode}
     */

  }, {
    key: "find",
    value: function find(_ref) {
      var _ref$value = _ref.value,
          value = _ref$value === void 0 ? undefined : _ref$value,
          _ref$callback = _ref.callback,
          callback = _ref$callback === void 0 ? undefined : _ref$callback;

      if (!this.head) {
        return null;
      }

      var currentNode = this.head;

      while (currentNode) {
        // If callback is specified then try to find node by callback.
        if (callback && callback(currentNode.value)) {
          return currentNode;
        } // If value is specified then try to compare by value..


        if (value !== undefined && this.compare.equal(currentNode.value, value)) {
          return currentNode;
        }

        currentNode = currentNode.next;
      }

      return null;
    }
    /**
     * @return {LinkedListNode}
     */

  }, {
    key: "deleteTail",
    value: function deleteTail() {
      var deletedTail = this.tail;

      if (this.head === this.tail) {
        // There is only one node in linked list.
        this.head = null;
        this.tail = null;
        return deletedTail;
      } // If there are many nodes in linked list...
      // Rewind to the last node and delete "next" link for the node before the last one.


      var currentNode = this.head;

      while (currentNode.next) {
        if (!currentNode.next.next) {
          currentNode.next = null;
        } else {
          currentNode = currentNode.next;
        }
      }

      this.tail = currentNode;
      return deletedTail;
    }
    /**
     * @return {LinkedListNode}
     */

  }, {
    key: "deleteHead",
    value: function deleteHead() {
      if (!this.head) {
        return null;
      }

      var deletedHead = this.head;

      if (this.head.next) {
        this.head = this.head.next;
      } else {
        this.head = null;
        this.tail = null;
      }

      return deletedHead;
    }
    /**
     * @param {*[]} values - Array of values that need to be converted to linked list.
     * @return {LinkedList}
     */

  }, {
    key: "fromArray",
    value: function fromArray(values) {
      var _this = this;

      values.forEach(function (value) {
        return _this.append(value);
      });
      return this;
    }
    /**
     * @return {LinkedListNode[]}
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var nodes = [];
      var currentNode = this.head;

      while (currentNode) {
        nodes.push(currentNode);
        currentNode = currentNode.next;
      }

      return nodes;
    }
    /**
     * @param {function} [callback]
     * @return {string}
     */

  }, {
    key: "toString",
    value: function toString(callback) {
      return this.toArray().map(function (node) {
        return node.toString(callback);
      }).toString();
    }
    /**
     * Reverse a linked list.
     * @returns {LinkedList}
     */

  }, {
    key: "reverse",
    value: function reverse() {
      var currNode = this.head;
      var prevNode = null;
      var nextNode = null;

      while (currNode) {
        // Store next node.
        nextNode = currNode.next; // Change next node of the current node so it would link to previous node.

        currNode.next = prevNode; // Move prevNode and currNode nodes one step forward.

        prevNode = currNode;
        currNode = nextNode;
      } // Reset head and tail.


      this.tail = this.head;
      this.head = prevNode;
      return this;
    }
  }]);

  return LinkedList;
}();

exports.default = LinkedList;
},{"./node":"src/linked-list/node.js","../utils":"src/utils.js"}],"src/vizualization/square.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Square =
/*#__PURE__*/
function () {
  function Square(context, x, y, l) {
    var text = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

    _classCallCheck(this, Square);

    this.x = x;
    this.y = y;
    this.l = l; // width, height of Square

    this.ctx = context;
    this.center = {
      x: x + l / 2,
      y: y + l / 2
    };
    this.edges = {
      top: {
        x: this.center.x,
        y: this.center.y - l / 2
      },
      left: {
        x: this.center.x - l / 2,
        y: this.center.y
      },
      right: {
        x: this.center.x + l / 2,
        y: this.center.y
      },
      bottom: {
        x: this.center.x,
        y: this.center.y + l / 2
      }
    };
    this.text = text;
  }

  _createClass(Square, [{
    key: "draw",
    value: function draw() {
      var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(42,220,113)';
      var strokeCol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#000";
      // Draw Square
      this.ctx.beginPath();
      this.ctx.rect(this.x, this.y, this.l, this.l);
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = strokeCol;
      this.ctx.stroke();
      this.ctx.closePath(); // Draw Text inside Shape

      this.ctx.beginPath();
      this.ctx.font = '15px Arial';
      this.ctx.fillStyle = "black";
      this.ctx.textAlign = 'center';
      this.ctx.textBaseLine = 'middle';
      this.ctx.fillText(this.text, this.center.x, this.center.y);
      this.ctx.fill();
    }
  }]);

  return Square;
}();

exports.default = Square;
},{}],"src/vizualization/circle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Circle =
/*#__PURE__*/
function () {
  function Circle(context, cx, cy, r, text) {
    _classCallCheck(this, Circle);

    this.x = cx;
    this.y = cy;
    this.r = r;
    this.context = context;
    this.center = {
      x: this.x,
      y: this.y
    };
    this.edges = {
      top: {
        x: cx,
        y: cy - r
      },
      left: {
        x: cx - r,
        y: cy
      },
      right: {
        x: cx + r,
        y: cy
      },
      bottom: {
        x: cx,
        y: cy + r
      }
    };
    this.text = text || '';
  }

  _createClass(Circle, [{
    key: "draw",
    value: function draw() {
      var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(42,220,113)';
      var strokeCol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#333';
      // Draw Circle
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      this.context.closePath();
      this.context.lineWidth = 1;
      this.context.strokeStyle = strokeCol;
      this.context.stroke(); // Draw Text inside Circle

      this.context.beginPath();
      this.context.font = '15px Arial';
      this.context.fillStyle = "black";
      this.context.textAlign = 'center';
      this.context.fillText("Const (2)", this.x, this.y);
      this.context.fill();
    }
  }]);

  return Circle;
}();

exports.default = Circle;
},{}],"src/graph/graphVertex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _linkedlist = _interopRequireDefault(require("../linked-list/linkedlist"));

var _utils = require("../utils");

var _square = _interopRequireDefault(require("../vizualization/square"));

var _circle = _interopRequireDefault(require("../vizualization/circle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GraphVertex =
/*#__PURE__*/
function () {
  /**
   * @param {*} value
   */
  function GraphVertex(value, _ref) {
    var context = _ref.context,
        _ref$text = _ref.text,
        text = _ref$text === void 0 ? '' : _ref$text,
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? 'square' : _ref$type,
        x = _ref.x,
        y = _ref.y,
        l = _ref.l;

    _classCallCheck(this, GraphVertex);

    if (value === undefined) {
      throw new Error('Graph vertex must have a value');
    }
    /**
     * @param {GraphEdge} edgeA
     * @param {GraphEdge} edgeB
     */


    var edgeComparator = function edgeComparator(edgeA, edgeB) {
      if (edgeA.getKey() === edgeB.getKey()) {
        return 0;
      }

      return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
    }; // Normally you would store string value like vertex name.
    // But generally it may be any object as well


    this.value = value;
    this.edges = new _linkedlist.default(edgeComparator);
    this.text = text || 'node';
    this.id = _utils.utils.guid();
    this.type = type; // square , circle

    if (this.type === 'square') {
      this.shape = new _square.default(context, x, y, l, this.text);
    } else {
      this.shape = new _circle.default(context, x, y, l / 2, this.text);
    }
  }
  /**
   * @param {GraphEdge} edge
   * @returns {GraphVertex}
   */


  _createClass(GraphVertex, [{
    key: "addEdge",
    value: function addEdge(edge) {
      this.edges.append(edge);
      return this;
    }
    /**
     * 
     * @param {string} text
     * @return {string} 
     */

  }, {
    key: "addText",
    value: function addText(text) {
      this.text = text;
    }
    /**
     * @param {GraphEdge} edge
     */

  }, {
    key: "deleteEdge",
    value: function deleteEdge(edge) {
      this.edges.delete(edge);
    }
    /**
     * @returns {GraphVertex[]}
     */

  }, {
    key: "getNeighbors",
    value: function getNeighbors() {
      var _this = this;

      var edges = this.edges.toArray();
      /** @param {LinkedListNode} node */

      var neighborsConverter = function neighborsConverter(node) {
        return node.value.startVertex === _this ? node.value.endVertex : node.value.startVertex;
      }; // Return either start or end vertex.
      // For undirected graphs it is possible that current vertex will be the end one.


      return edges.map(neighborsConverter);
    }
    /**
     * @return {GraphEdge[]}
     */

  }, {
    key: "getEdges",
    value: function getEdges() {
      return this.edges.toArray().map(function (linkedListNode) {
        return linkedListNode.value;
      });
    }
    /**
     * @return {number}
     */

  }, {
    key: "getDegree",
    value: function getDegree() {
      return this.edges.toArray().length;
    }
    /**
     * @param {GraphEdge} requiredEdge
     * @returns {boolean}
     */

  }, {
    key: "hasEdge",
    value: function hasEdge(requiredEdge) {
      var edgeNode = this.edges.find({
        callback: function callback(edge) {
          return edge === requiredEdge;
        }
      });
      return !!edgeNode;
    }
    /**
     * @param {GraphVertex} vertex
     * @returns {boolean}
     */

  }, {
    key: "hasNeighbor",
    value: function hasNeighbor(vertex) {
      var vertexNode = this.edges.find({
        callback: function callback(edge) {
          return edge.startVertex === vertex || edge.endVertex === vertex;
        }
      });
      return !!vertexNode;
    }
    /**
     * @param {GraphVertex} vertex
     * @returns {(GraphEdge|null)}
     */

  }, {
    key: "findEdge",
    value: function findEdge(vertex) {
      var edgeFinder = function edgeFinder(edge) {
        return edge.startVertex === vertex || edge.endVertex === vertex;
      };

      var edge = this.edges.find({
        callback: edgeFinder
      });
      return edge ? edge.value : null;
    }
    /**
     * @returns {string}
     */

  }, {
    key: "getKey",
    value: function getKey() {
      return this.value;
    }
    /**
     * @return {string}
     */

  }, {
    key: "getId",
    value: function getId() {
      return this.id;
    }
    /**
     * @return {string}
     */

  }, {
    key: "getType",
    value: function getType() {
      return this.type;
    }
    /**
     * @return {Square | Circle}
     */

  }, {
    key: "getShape",
    value: function getShape() {
      return this.shape;
    }
    /**
     * @return {GraphVertex}
     */

  }, {
    key: "deleteAllEdges",
    value: function deleteAllEdges() {
      var _this2 = this;

      this.getEdges().forEach(function (edge) {
        return _this2.deleteEdge(edge);
      });
      return this;
    }
    /**
     * @param {function} [callback]
     * @returns {string}
     */

  }, {
    key: "toString",
    value: function toString(callback) {
      return callback ? callback(this.value) : "".concat(this.value);
    }
  }]);

  return GraphVertex;
}();

exports.default = GraphVertex;
},{"../linked-list/linkedlist":"src/linked-list/linkedlist.js","../utils":"src/utils.js","../vizualization/square":"src/vizualization/square.js","../vizualization/circle":"src/vizualization/circle.js"}],"src/graph/graphEdge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GraphEdge =
/*#__PURE__*/
function () {
  /**
   * @param {GraphVertex} startVertex
   * @param {GraphVertex} endVertex
   * @param {number} [weight=1]
   */
  function GraphEdge(startVertex, endVertex, context) {
    var weight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, GraphEdge);

    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.weight = weight;
  }
  /**
   * @return {string}
   */


  _createClass(GraphEdge, [{
    key: "getKey",
    value: function getKey() {
      var startVertexKey = this.startVertex.getKey();
      var endVertexKey = this.endVertex.getKey();
      return "".concat(startVertexKey, "_").concat(endVertexKey);
    }
    /**
     * @return {GraphEdge}
     */

  }, {
    key: "reverse",
    value: function reverse() {
      var tmp = this.startVertex;
      this.startVertex = this.endVertex;
      this.endVertex = tmp;
      return this;
    }
  }, {
    key: "connect",
    value: function connect() {}
    /**
     * @return {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      return this.getKey();
    }
  }]);

  return GraphEdge;
}();

exports.default = GraphEdge;
},{}],"src/graphviz.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphViz = void 0;

var _graph = _interopRequireDefault(require("./graph/graph"));

var _graphVertex = _interopRequireDefault(require("./graph/graphVertex"));

var _graphEdge = _interopRequireDefault(require("./graph/graphEdge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GraphViz =
/*#__PURE__*/
function () {
  function GraphViz(context) {
    _classCallCheck(this, GraphViz);

    this.graph = new _graph.default();
    this.ctx = context;
    this.offsetInline = {
      x: 80,
      y: 80
    };
    this.offsetSpaced = {
      x: 100,
      y: 100
    };
    this.R = 40;
    this.L = this.R * 2;
    this.startPos = {
      x: 50,
      y: 50
    };
    this.prevNode = null;
    this.fNode = false;
  }

  _createClass(GraphViz, [{
    key: "addNode",
    value: function addNode(nodeName) {
      var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var inline_with = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'square';
      type = type || 'square';

      if (this.fNode) {
        // Not First Pos
        this.startPos = {
          x: this.startPos.x + this.offsetSpaced.x,
          y: this.startPos.y + this.offsetSpaced.y
        };
      }

      if (inline_with) {
        // Same Hotizontal Position
        var nodeInlined = this.graph.getVertexByKey(inline_with);
        /**
         * 1- Check Node Type -> (Circle , Square)
         * 2- Calculate position of new node respctive to nodeInlined
         */

        var newPos;

        if (type === 'square') {
          // Square Case
          newPos = {
            x: nodeInlined.shape.center.x + this.offsetInline.x + this.L,
            y: nodeInlined.shape.center.y - this.L / 2
          };
        } else {
          // Circle Case
          newPos = {
            x: nodeInlined.shape.center.x + this.offsetInline.x + this.R,
            y: nodeInlined.shape.center.y
          };
        }

        var _node = new _graphVertex.default(nodeName, _objectSpread(_defineProperty({
          type: type,
          context: this.ctx,
          text: text
        }, "type", type), newPos, {
          l: this.L
        }));

        this.graph.addVertex(_node);

        _node.shape.draw();

        this.prevNode = _node;
        this.startPos = _objectSpread({}, _node.shape.center);
        this.fNode = true;
        return nodeName;
      }

      var node = new _graphVertex.default(nodeName, _objectSpread(_defineProperty({
        type: type,
        context: this.ctx,
        text: text
      }, "type", type), this.startPos, {
        l: this.L
      }));
      this.graph.addVertex(node);
      node.shape.draw();
      this.startPos = _objectSpread({}, node.shape.center);
      this.prevNode = node;
      return nodeName;
    }
  }, {
    key: "addEdge",
    value: function addEdge(fNode, sNode) {
      var fNodeVertex = this.graph.getVertexByKey(fNode);
      var sNodeVertex = this.graph.getVertexByKey(sNode);
      var edge = new _graphEdge.default(fNodeVertex, sNodeVertex);
      this.graph.addEdge(edge);
    }
  }]);

  return GraphViz;
}();

exports.GraphViz = GraphViz;
},{"./graph/graph":"src/graph/graph.js","./graph/graphVertex":"src/graph/graphVertex.js","./graph/graphEdge":"src/graph/graphEdge.js"}],"src/main.js":[function(require,module,exports) {
"use strict";

var _graphviz = require("./graphviz");

var canvas = document.getElementById('graph');
var context = canvas.getContext('2d');
var gviz = new _graphviz.GraphViz(context);
var pr_node = gviz.addNode('A', 'Const (X)');
var sc_node = gviz.addNode('B', 'Const (Z)', pr_node);
var th_node = gviz.addNode('C', 'Cont (U)');
gviz.addEdge(pr_node, sc_node);
gviz.addEdge(sc_node, th_node); // gviz.addEdge(pr_node, th_node);
},{"./graphviz":"src/graphviz.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34273" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.map