"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactJsonTree = require("react-json-tree");

var _reactJsonTree2 = _interopRequireDefault(_reactJsonTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: "mdap-store-line",

    getInitialState: function getInitialState() {
        return {
            isExpanded: false
        };
    },
    handleCollapse: function handleCollapse() {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    },
    getClassName: function getClassName() {
        return this.state.isExpanded ? "mdap-store-line-expanded" : "mdap-store-line-collapsed";
    },
    getIconClassName: function getIconClassName() {
        return this.state.isExpanded ? "mdap-store-button-line-expanded" : "mdap-store-button-line-collapsed";
    },
    getRecordingIcon: function getRecordingIcon() {
        if (this.props.isRecording) {
            if (this.props.store.hasChanged) {
                return _react2.default.createElement(
                    "div",
                    { className: "circle-loader load-complete" },
                    _react2.default.createElement("div", { className: "checkmark draw" })
                );
            }
            return _react2.default.createElement("div", { className: "circle-loader" });
        }
        return null;
    },
    render: function render() {
        var _props$store = this.props.store,
            name = _props$store.name,
            type = _props$store.type,
            value = _props$store.value;

        return _react2.default.createElement(
            "li",
            { className: this.getClassName() },
            _react2.default.createElement(
                "div",
                null,
                name + " - ",
                _react2.default.createElement(
                    "i",
                    null,
                    type
                ),
                this.getRecordingIcon()
            ),
            _react2.default.createElement("div", {
                style: { cursor: "pointer" },
                className: this.getIconClassName(),
                onClick: this.handleCollapse
            }),
            _react2.default.createElement(
                "div",
                { className: "mdap-store-line-values" },
                _react2.default.createElement(_reactJsonTree2.default, { data: value })
            )
        );
    }
});
module.exports = exports["default"];