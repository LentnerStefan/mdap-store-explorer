"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _storeExplorer = require("./components/store-explorer");

var _storeExplorer2 = _interopRequireDefault(_storeExplorer);

require("./styles/mdap-dev-tools.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Components
exports.default = _react2.default.createClass({
    displayName: "Mdap-store-explorer",

    getInitialState: function getInitialState() {
        return {
            isExpanded: false,
            isDisplayed: false,
            isRecording: false,
            filterTextValue: ""
        };
    },
    componentWillMount: function componentWillMount() {},
    componentDidMount: function componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
    },
    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
    },
    handleKeyDown: function handleKeyDown(e) {
        // Ignore regular keys when focused on a field
        // and no modifiers are active.
        if (!e.ctrlKey && !e.metaKey && !e.altKey && (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable)) {
            return;
        }
        var charCode = e.keyCode || e.which;
        if (charCode === 77 && e.ctrlKey) {
            this.setState({
                isDisplayed: !this.state.isDisplayed,
                isRecording: this.state.isDisplayed ? false : this.state.isRecording
            });
        }
    },
    handleCollapse: function handleCollapse() {
        this.setState({
            isExpanded: !this.state.isExpanded,
            isRecording: false
        });
    },
    getContainerClassName: function getContainerClassName() {
        return this.state.isExpanded ? "container-window expanded" : "container-window collapsed";
    },
    refresh: function refresh() {
        this.refs && this.refs.storeExplorer && this.refs.storeExplorer.refresh();
    },
    getRecordIconClassName: function getRecordIconClassName() {
        return this.state.isRecording ? "pulse-button recording" : "pulse-button";
    },
    render: function render() {
        var _this = this;

        return _react2.default.createElement(
            "div",
            {
                className: this.getContainerClassName(),
                style: { display: this.state.isDisplayed ? "inline" : "none" }
            },
            _react2.default.createElement(
                "div",
                { className: "header-bar" },
                _react2.default.createElement(
                    "div",
                    { className: "header-title" },
                    _react2.default.createElement(
                        "b",
                        null,
                        "Store explorer"
                    )
                ),
                _react2.default.createElement("div", { className: "refresh-icon", onClick: this.refresh }),
                _react2.default.createElement(
                    "div",
                    { className: "pulse-container" },
                    _react2.default.createElement("button", { className: this.getRecordIconClassName(), onClick: function onClick() {
                            _this.setState({ isRecording: !_this.state.isRecording }, _this.refresh);
                        } })
                ),
                _react2.default.createElement(
                    "form",
                    {
                        className: "search-input-container",
                        onSubmit: function onSubmit(e) {
                            e.preventDefault();
                        }
                    },
                    _react2.default.createElement("input", {
                        className: "search-input",
                        type: "text",
                        value: this.state.filterTextValue,
                        name: "storeNameFilter",
                        onChange: function onChange(e) {
                            _this.setState({
                                filterTextValue: e.target.value
                            });
                        },
                        placeholder: "store...",
                        autoComplete: "off"
                    })
                ),
                _react2.default.createElement(
                    "div",
                    {
                        className: "collapse-button-container",
                        onClick: this.handleCollapse
                    },
                    _react2.default.createElement("div", { className: "mdap-store-button" })
                )
            ),
            _react2.default.createElement(
                "div",
                { className: "store-explorer" },
                _react2.default.createElement(_storeExplorer2.default, {
                    ref: "storeExplorer",
                    filterTextValue: this.state.filterTextValue,
                    isRecording: this.state.isRecording
                })
            )
        );
    }
});

// Styles

module.exports = exports["default"];