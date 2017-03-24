'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CoreStore = require('focus-core/store/CoreStore');

var _CoreStore2 = _interopRequireDefault(_CoreStore);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactJsonTree = require('react-json-tree');

var _reactJsonTree2 = _interopRequireDefault(_reactJsonTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: 'customDevTools-store-line',

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
        return this.state.isExpanded ? 'customDevTools-line-expanded' : 'customDevTools-line-collapsed';
    },
    getIconClassName: function getIconClassName() {
        return this.state.isExpanded ? 'customDevTools-button-line-expanded' : 'customDevTools-button-line-collapsed';
    },
    getStoreStatusIcon: function getStoreStatusIcon() {
        switch (this.props.store.status) {
            case 'loaded':
                return 'L';
            case 'saved':
                return 'S';
            case 'deleted':
                return 'D';
            case 'updated':
                return 'U';
            default:
                return 'C';
        }
    },
    render: function render() {
        var storeName = this.props.store.name;
        var storeType = this.props.store.type;
        var storeValue = this.props.store.value;
        var storeStatus = this.props.store.status;
        return _react2.default.createElement(
            'li',
            { className: this.getClassName(), key: storeName },
            _react2.default.createElement(
                'div',
                null,
                storeName + ' - ',
                _react2.default.createElement(
                    'i',
                    null,
                    storeType
                ),
                storeStatus && _react2.default.createElement(
                    'div',
                    { className: 'storeStatus' },
                    _react2.default.createElement(
                        'span',
                        { className: 'storeStatusIcon' },
                        _react2.default.createElement(
                            'b',
                            null,
                            this.getStoreStatusIcon()
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'storeStatusDisplay' },
                        _react2.default.createElement(
                            'b',
                            null,
                            storeStatus
                        )
                    )
                )
            ),
            _react2.default.createElement('div', { style: { cursor: 'pointer' }, className: this.getIconClassName(), onClick: this.handleCollapse }),
            _react2.default.createElement(
                'div',
                { className: 'customDevTools-line-values' },
                _react2.default.createElement(_reactJsonTree2.default, { data: storeValue })
            )
        );
    }
});
module.exports = exports['default'];