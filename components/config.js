'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('focus-components/components/input');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: 'store-explorer-config',

    getInitialState: function getInitialState() {
        return {
            wip: {
                value: false,
                label: 'WIP',
                opt: 'wip'
            }
        };
    },
    handleFieldChange: function handleFieldChange(option) {
        option.value = !option.value;
        var state = this.state;
        state[option.opt] = option;
        this.setState(state);
    },
    getOptionsValues: function getOptionsValues() {
        return this.state;
    },
    displayOptions: function displayOptions() {
        var _this = this;

        return _.map(this.state, function (option) {
            return _react2.default.createElement(
                'ul',
                { className: 'store-explorer-config-line' },
                _react2.default.createElement(_input.Checkbox, { value: option.value, onChange: function onChange() {
                        _this.handleFieldChange(option);
                    } }),
                option.label
            );
        });
    },
    render: function render() {
        return _react2.default.createElement(
            'div',
            { className: 'store-explorer-config' },
            _react2.default.createElement(
                'li',
                null,
                this.displayOptions()
            )
        );
    }
});
module.exports = exports['default'];