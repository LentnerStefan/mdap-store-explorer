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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNyZWF0ZUNsYXNzIiwiZGlzcGxheU5hbWUiLCJnZXRJbml0aWFsU3RhdGUiLCJpc0V4cGFuZGVkIiwiaGFuZGxlQ29sbGFwc2UiLCJzZXRTdGF0ZSIsInN0YXRlIiwiZ2V0Q2xhc3NOYW1lIiwiZ2V0SWNvbkNsYXNzTmFtZSIsImdldFN0b3JlU3RhdHVzSWNvbiIsInByb3BzIiwic3RvcmUiLCJzdGF0dXMiLCJyZW5kZXIiLCJzdG9yZU5hbWUiLCJuYW1lIiwic3RvcmVUeXBlIiwidHlwZSIsInN0b3JlVmFsdWUiLCJ2YWx1ZSIsInN0b3JlU3RhdHVzIiwiY3Vyc29yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O2tCQUdlLGdCQUFNQSxXQUFOLENBQWtCO0FBQzdCQyxpQkFBYSwyQkFEZ0I7O0FBRzdCQyxtQkFINkIsNkJBR1g7QUFDZCxlQUFPO0FBQ0hDLHdCQUFZO0FBRFQsU0FBUDtBQUdILEtBUDRCO0FBUzdCQyxrQkFUNkIsNEJBU1o7QUFDYixhQUFLQyxRQUFMLENBQWM7QUFDVkYsd0JBQVksQ0FBQyxLQUFLRyxLQUFMLENBQVdIO0FBRGQsU0FBZDtBQUdILEtBYjRCO0FBZTdCSSxnQkFmNkIsMEJBZWQ7QUFDWCxlQUFPLEtBQUtELEtBQUwsQ0FBV0gsVUFBWCxHQUF3Qiw4QkFBeEIsR0FBeUQsK0JBQWhFO0FBQ0gsS0FqQjRCO0FBbUI3Qkssb0JBbkI2Qiw4QkFtQlY7QUFDZixlQUFPLEtBQUtGLEtBQUwsQ0FBV0gsVUFBWCxHQUF3QixxQ0FBeEIsR0FBZ0Usc0NBQXZFO0FBQ0gsS0FyQjRCO0FBc0I3Qk0sc0JBdEI2QixnQ0FzQlI7QUFDakIsZ0JBQVEsS0FBS0MsS0FBTCxDQUFXQyxLQUFYLENBQWlCQyxNQUF6QjtBQUNJLGlCQUFLLFFBQUw7QUFDSSx1QkFBTyxHQUFQO0FBQ0osaUJBQUssT0FBTDtBQUNJLHVCQUFPLEdBQVA7QUFDSixpQkFBSyxTQUFMO0FBQ0ksdUJBQU8sR0FBUDtBQUNKLGlCQUFLLFNBQUw7QUFDSSx1QkFBTyxHQUFQO0FBQ0o7QUFDSSx1QkFBTyxHQUFQO0FBVlI7QUFZSCxLQW5DNEI7QUFxQzdCQyxVQXJDNkIsb0JBcUNwQjtBQUNMLFlBQUlDLFlBQVksS0FBS0osS0FBTCxDQUFXQyxLQUFYLENBQWlCSSxJQUFqQztBQUNBLFlBQUlDLFlBQVksS0FBS04sS0FBTCxDQUFXQyxLQUFYLENBQWlCTSxJQUFqQztBQUNBLFlBQUlDLGFBQWEsS0FBS1IsS0FBTCxDQUFXQyxLQUFYLENBQWlCUSxLQUFsQztBQUNBLFlBQUlDLGNBQWMsS0FBS1YsS0FBTCxDQUFXQyxLQUFYLENBQWlCQyxNQUFuQztBQUNBLGVBQ0k7QUFBQTtBQUFBLGNBQUksV0FBVyxLQUFLTCxZQUFMLEVBQWYsRUFBb0MsS0FBS08sU0FBekM7QUFDSTtBQUFBO0FBQUE7QUFDS0EsNEJBQVksS0FEakI7QUFFSTtBQUFBO0FBQUE7QUFBSUU7QUFBSixpQkFGSjtBQUdLSSwrQkFDRztBQUFBO0FBQUEsc0JBQUssV0FBVSxhQUFmO0FBQ0k7QUFBQTtBQUFBLDBCQUFNLFdBQVUsaUJBQWhCO0FBQWtDO0FBQUE7QUFBQTtBQUFJLGlDQUFLWCxrQkFBTDtBQUFKO0FBQWxDLHFCQURKO0FBRUk7QUFBQTtBQUFBLDBCQUFNLFdBQVUsb0JBQWhCO0FBQXFDO0FBQUE7QUFBQTtBQUFJVztBQUFKO0FBQXJDO0FBRko7QUFKUixhQURKO0FBV0ksbURBQUssT0FBTyxFQUFFQyxRQUFRLFNBQVYsRUFBWixFQUFtQyxXQUFXLEtBQUtiLGdCQUFMLEVBQTlDLEVBQXVFLFNBQVMsS0FBS0osY0FBckYsR0FYSjtBQVlJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLDRCQUFmO0FBQ0kseUVBQVUsTUFBTWMsVUFBaEI7QUFESjtBQVpKLFNBREo7QUFrQkg7QUE1RDRCLENBQWxCLEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBDb3JlU3RvcmUgZnJvbSAnZm9jdXMtY29yZS9zdG9yZS9Db3JlU3RvcmUnXHJcbmltcG9ydCBsb2Rhc2ggZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IEpTT05UcmVlIGZyb20gJ3JlYWN0LWpzb24tdHJlZSc7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZGlzcGxheU5hbWU6ICdjdXN0b21EZXZUb29scy1zdG9yZS1saW5lJyxcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaXNFeHBhbmRlZDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUNvbGxhcHNlKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBpc0V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5pc0V4cGFuZGVkXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmlzRXhwYW5kZWQgPyAnY3VzdG9tRGV2VG9vbHMtbGluZS1leHBhbmRlZCcgOiAnY3VzdG9tRGV2VG9vbHMtbGluZS1jb2xsYXBzZWQnO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRJY29uQ2xhc3NOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmlzRXhwYW5kZWQgPyAnY3VzdG9tRGV2VG9vbHMtYnV0dG9uLWxpbmUtZXhwYW5kZWQnIDogJ2N1c3RvbURldlRvb2xzLWJ1dHRvbi1saW5lLWNvbGxhcHNlZCc7XHJcbiAgICB9LFxyXG4gICAgZ2V0U3RvcmVTdGF0dXNJY29uKCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5zdG9yZS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgY2FzZSAnbG9hZGVkJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnTCc7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NhdmVkJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnUyc7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZWQnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdEJztcclxuICAgICAgICAgICAgY2FzZSAndXBkYXRlZCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1UnO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdDJztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgc3RvcmVOYW1lID0gdGhpcy5wcm9wcy5zdG9yZS5uYW1lO1xyXG4gICAgICAgIGxldCBzdG9yZVR5cGUgPSB0aGlzLnByb3BzLnN0b3JlLnR5cGU7XHJcbiAgICAgICAgbGV0IHN0b3JlVmFsdWUgPSB0aGlzLnByb3BzLnN0b3JlLnZhbHVlO1xyXG4gICAgICAgIGxldCBzdG9yZVN0YXR1cyA9IHRoaXMucHJvcHMuc3RvcmUuc3RhdHVzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lKCl9IGtleT17c3RvcmVOYW1lfT5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge3N0b3JlTmFtZSArICcgLSAnfVxyXG4gICAgICAgICAgICAgICAgICAgIDxpPntzdG9yZVR5cGV9PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgIHtzdG9yZVN0YXR1cyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc3RvcmVTdGF0dXMnID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nc3RvcmVTdGF0dXNJY29uJz48Yj57dGhpcy5nZXRTdG9yZVN0YXR1c0ljb24oKX08L2I+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdzdG9yZVN0YXR1c0Rpc3BsYXknPjxiPntzdG9yZVN0YXR1c308L2I+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgY3Vyc29yOiAncG9pbnRlcicgfX0gY2xhc3NOYW1lPXt0aGlzLmdldEljb25DbGFzc05hbWUoKX0gb25DbGljaz17dGhpcy5oYW5kbGVDb2xsYXBzZX0gLz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjdXN0b21EZXZUb29scy1saW5lLXZhbHVlcyc+XHJcbiAgICAgICAgICAgICAgICAgICAgPEpTT05UcmVlIGRhdGE9e3N0b3JlVmFsdWV9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0pXHJcbiJdfQ==