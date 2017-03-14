'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _input = require('focus-components/components/input');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: 'store-explorer-config',

    getInitialState: function getInitialState() {
        return {
            listenerCount: {
                value: false,
                label: 'Listener Count',
                opt: 'listenerCount'
            },
            appStores: {
                value: false,
                label: 'Show App Stores',
                opt: 'appStores'
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
            'li',
            null,
            this.displayOptions()
        );
    }
});
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNyZWF0ZUNsYXNzIiwiZGlzcGxheU5hbWUiLCJnZXRJbml0aWFsU3RhdGUiLCJsaXN0ZW5lckNvdW50IiwidmFsdWUiLCJsYWJlbCIsIm9wdCIsImFwcFN0b3JlcyIsImhhbmRsZUZpZWxkQ2hhbmdlIiwib3B0aW9uIiwic3RhdGUiLCJzZXRTdGF0ZSIsImdldE9wdGlvbnNWYWx1ZXMiLCJkaXNwbGF5T3B0aW9ucyIsIl8iLCJtYXAiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztrQkFJZSxnQkFBTUEsV0FBTixDQUFrQjtBQUM3QkMsaUJBQWEsdUJBRGdCOztBQUc3QkMsbUJBSDZCLDZCQUdYO0FBQ2QsZUFBTztBQUNIQywyQkFBZTtBQUNYQyx1QkFBTyxLQURJO0FBRVhDLHVCQUFPLGdCQUZJO0FBR1hDLHFCQUFJO0FBSE8sYUFEWjtBQU1IQyx1QkFBVztBQUNQSCx1QkFBTyxLQURBO0FBRVBDLHVCQUFPLGlCQUZBO0FBR1BDLHFCQUFJO0FBSEc7QUFOUixTQUFQO0FBWUgsS0FoQjRCO0FBaUI3QkUscUJBakI2Qiw2QkFpQlhDLE1BakJXLEVBaUJIO0FBQ3RCQSxlQUFPTCxLQUFQLEdBQWUsQ0FBQ0ssT0FBT0wsS0FBdkI7QUFDQSxZQUFJTSxRQUFNLEtBQUtBLEtBQWY7QUFDQUEsY0FBTUQsT0FBT0gsR0FBYixJQUFrQkcsTUFBbEI7QUFDQSxhQUFLRSxRQUFMLENBQWNELEtBQWQ7QUFDSCxLQXRCNEI7QUF3QjdCRSxvQkF4QjZCLDhCQXdCVjtBQUNmLGVBQU8sS0FBS0YsS0FBWjtBQUNILEtBMUI0QjtBQTRCN0JHLGtCQTVCNkIsNEJBNEJaO0FBQUE7O0FBQ2IsZUFBT0MsRUFBRUMsR0FBRixDQUFNLEtBQUtMLEtBQVgsRUFBa0IsVUFBQ0QsTUFBRCxFQUFZO0FBQ2pDLG1CQUNJO0FBQUE7QUFBQSxrQkFBSSxXQUFVLDRCQUFkO0FBQ0ksaUVBQVUsT0FBT0EsT0FBT0wsS0FBeEIsRUFBK0IsVUFBVSxvQkFBSTtBQUFDLDhCQUFLSSxpQkFBTCxDQUF1QkMsTUFBdkI7QUFBK0IscUJBQTdFLEdBREo7QUFFS0EsdUJBQU9KO0FBRlosYUFESjtBQU1ILFNBUE0sQ0FBUDtBQVFILEtBckM0QjtBQXNDN0JXLFVBdEM2QixvQkFzQ3BCO0FBQ0wsZUFDSTtBQUFBO0FBQUE7QUFDSyxpQkFBS0gsY0FBTDtBQURMLFNBREo7QUFLSDtBQTVDNEIsQ0FBbEIsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGxvZGFzaCBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBDaGVja2JveCB9IGZyb20gJ2ZvY3VzLWNvbXBvbmVudHMvY29tcG9uZW50cy9pbnB1dCc7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIGRpc3BsYXlOYW1lOiAnc3RvcmUtZXhwbG9yZXItY29uZmlnJyxcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGlzdGVuZXJDb3VudDoge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdMaXN0ZW5lciBDb3VudCcsXHJcbiAgICAgICAgICAgICAgICBvcHQ6J2xpc3RlbmVyQ291bnQnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFwcFN0b3Jlczoge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTaG93IEFwcCBTdG9yZXMnLFxyXG4gICAgICAgICAgICAgICAgb3B0OidhcHBTdG9yZXMnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlRmllbGRDaGFuZ2Uob3B0aW9uKSB7XHJcbiAgICAgICAgb3B0aW9uLnZhbHVlID0gIW9wdGlvbi52YWx1ZTtcclxuICAgICAgICBsZXQgc3RhdGU9dGhpcy5zdGF0ZTtcclxuICAgICAgICBzdGF0ZVtvcHRpb24ub3B0XT1vcHRpb247XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldE9wdGlvbnNWYWx1ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIGRpc3BsYXlPcHRpb25zKCkge1xyXG4gICAgICAgIHJldHVybiBfLm1hcCh0aGlzLnN0YXRlLCAob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPSdzdG9yZS1leHBsb3Jlci1jb25maWctbGluZSc+XHJcbiAgICAgICAgICAgICAgICAgICAgPENoZWNrYm94IHZhbHVlPXtvcHRpb24udmFsdWV9IG9uQ2hhbmdlPXsoKT0+e3RoaXMuaGFuZGxlRmllbGRDaGFuZ2Uob3B0aW9uKX19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAge29wdGlvbi5sYWJlbH1cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGxpID5cclxuICAgICAgICAgICAgICAgIHt0aGlzLmRpc3BsYXlPcHRpb25zKCl9XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59KVxyXG4iXX0=