"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _CoreStore = require("focus-core/store/CoreStore");

var _CoreStore2 = _interopRequireDefault(_CoreStore);

var _storeLine = require("./store-line");

var _storeLine2 = _interopRequireDefault(_storeLine);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _coreStoreHelper = require("../helpers/core-store-helper");

var _coreStoreHelper2 = _interopRequireDefault(_coreStoreHelper);

var _listStoreHelper = require("../helpers/list-store-helper");

var _listStoreHelper2 = _interopRequireDefault(_listStoreHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: "store-explorer",

    propTypes: {
        filterTextValue: _react2.default.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            filterTextValue: ""
        };
    },
    getInitialState: function getInitialState() {
        return {
            storeArray: []
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.isRecording === true && this.props.isRecording === false) {
            this.addListeners();
            // On commence l'enregistrement, on ajoute tout les listeners
        } else if (nextProps.isRecording === false && this.props.isRecording === true) {
            // On fini l'enregistrement, on supprime tout les listeners
            this.removeListeners();
        }
    },
    addListeners: function addListeners() {
        var newArray = this.state.storeArray;
        for (var i = 0; i < this.state.storeArray.length; i++) {
            switch (this.state.storeArray[i].type) {
                case "ListStore":
                    _listStoreHelper2.default.addListStoreListener.call(this, newArray[i]);
                    break;
                case "CoreStore":
                    _coreStoreHelper2.default.addCoreStoreListener.call(this, newArray[i]);
                default:
                    break;
            }
        }
        this.setState({ storeArray: newArray });
    },
    removeListeners: function removeListeners() {
        var newArray = this.state.storeArray;
        for (var i = 0; i < this.state.storeArray.length; i++) {
            switch (this.state.storeArray[i].type) {
                case "ListStore":
                    _listStoreHelper2.default.removeListStoreListener.call(this, newArray[i]);
                    break;
                case "CoreStore":
                    _coreStoreHelper2.default.removeCoreStoreListener.call(this, newArray[i]);
                default:
                    break;
            }
        }
        this.setState({ storeArray: newArray });
    },
    refresh: function refresh() {
        var _this = this;

        var stores = _CoreStore2.default.prototype._instances;
        var storeArray = this.state.storeArray;
        // On construit les objets d'affichage
        for (var i = 0; i < stores.length; i++) {
            (function () {
                switch (Object.getPrototypeOf(stores[i]).constructor.name) {
                    case "CoreStore":
                        var newStoreArray = _coreStoreHelper2.default.buildCoreStoreArray.call(_this, stores[i]);

                        var _loop = function _loop(_i) {
                            if (_lodash2.default.findIndex(storeArray, function (store) {
                                return store.name === newStoreArray[_i].name && store.definition === newStoreArray[_i].definition;
                            }) < 0) {
                                storeArray.push(newStoreArray[_i]);
                            }
                        };

                        for (var _i = 0; _i < newStoreArray.length; _i++) {
                            _loop(_i);
                        }
                        break;
                    case "ListStore":
                        var newListStoreArray = _listStoreHelper2.default.buildListStore.call(_this, stores[i]);

                        var _loop2 = function _loop2(_i2) {
                            if (_lodash2.default.findIndex(storeArray, function (store) {
                                return store.name === newListStoreArray[_i2].name && store.definition === undefined && newListStoreArray[_i2].definition === undefined;
                            }) < 0) {
                                storeArray.push(newListStoreArray[_i2]);
                            }
                        };

                        for (var _i2 = 0; _i2 < newListStoreArray.length; _i2++) {
                            _loop2(_i2);
                        }
                        break;
                    default:
                        break;
                }
            })();
        }
        // On trie par nom
        storeArray = _lodash2.default.sortBy(storeArray, function (o) {
            return o.name;
        });
        this.setState({
            storeArray: storeArray
        });
    },
    render: function render() {
        var _this2 = this;

        var data = this.state.storeArray;
        if (this.props.filterTextValue.length > 0) {
            data = _lodash2.default.filter(data, function (o) {
                return o.name.toUpperCase().includes(_this2.props.filterTextValue.toUpperCase());
            });
        }
        return _react2.default.createElement(
            "div",
            null,
            _lodash2.default.map(data, function (store) {
                return _react2.default.createElement(_storeLine2.default, {
                    isRecording: store.isRecording,
                    store: store,
                    key: store.uniqId
                });
            })
        );
    }
});
module.exports = exports["default"];