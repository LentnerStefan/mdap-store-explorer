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
    getDataFromStores: function getDataFromStores() {},
    refresh: function refresh() {
        var _this = this;

        var stores = _CoreStore2.default.prototype._instances;
        var storeArray = [];
        for (var i = 0; i < stores.length; i++) {
            switch (Object.getPrototypeOf(stores[i]).constructor.name) {
                case "CoreStore":
                    for (var property in stores[i].definition) {
                        if (stores[i].definition.hasOwnProperty(property)) {
                            var getMethodName = "get" + property[0].toUpperCase() + property.slice(1);
                            if (stores[i][getMethodName]() !== undefined) {
                                var storeObject = {};
                                storeObject.name = stores[i].definition[property];
                                storeObject.value = stores[i][getMethodName]();
                                storeObject.type = "CoreStore";
                                if (stores[i].status.get(storeObject.name)) {
                                    storeObject.status = stores[i].status.get(storeObject.name).name;
                                }
                                storeArray.push(storeObject);
                            }
                        }
                    }
                    break;
                case "ListStore":
                    if (stores[i].getDataList() !== undefined) {
                        var listStoreObject = {};
                        if (stores[i].getCriteria() !== undefined) {
                            listStoreObject.value = {};

                            listStoreObject.value.criteria = stores[i].getCriteria();
                            listStoreObject.value.data = stores[i].getDataList();
                        } else {
                            listStoreObject.value = stores[i].getDataList();
                        }
                        listStoreObject.name = stores[i].config.identifier;
                        listStoreObject.type = "ListStore";
                        storeArray.push(listStoreObject);
                    }
                    break;
                default:
                    break;
            }
        }
        storeArray = _lodash2.default.sortBy(storeArray, function (o) {
            return o.name;
        });
        if (this.props.filterTextValue.length > 0) {
            storeArray = _lodash2.default.filter(storeArray, function (o) {
                return o.name.toUpperCase().includes(_this.props.filterTextValue.toUpperCase());
            });
        }
        this.setState({
            storeArray: storeArray
        });
    },
    render: function render() {
        return _react2.default.createElement(
            "div",
            null,
            _lodash2.default.map(this.state.storeArray, function (store) {
                return _react2.default.createElement(_storeLine2.default, { store: store });
            })
        );
    }
});
module.exports = exports["default"];