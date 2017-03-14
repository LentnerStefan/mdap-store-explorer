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

var _storeLine = require('./components/store-line');

var _storeLine2 = _interopRequireDefault(_storeLine);

var _config = require('./components/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: 'customDevTools',

    getInitialState: function getInitialState() {
        return {
            isExpanded: false,
            storeArray: [],
            showContact: false,
            filterTextValue: '',
            searchBarExpanded: false,
            cssDisplay: 'none',
            displayOptions: false
        };
    },
    componentDidMount: function componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    },
    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    },
    handleKeyDown: function handleKeyDown(e) {
        // Ignore regular keys when focused on a field
        // and no modifiers are active.
        if (!e.ctrlKey && !e.metaKey && !e.altKey && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable)) {
            return;
        }
        var charCode = e.keyCode || e.which;
        var char = String.fromCharCode(charCode);
        if (charCode === 77 && e.ctrlKey) {
            this.toggleVisibility();
        }
    },
    toggleVisibility: function toggleVisibility() {
        this.setState({
            cssDisplay: this.state.cssDisplay === 'inline' ? 'none' : 'inline'
        });
    },
    processAllStores: function processAllStores() {
        var allStores = _CoreStore2.default.prototype._instances;
        var metierStoreArray = [];
        var otherArray = [];
        for (var i = 0; i < allStores.length; i++) {
            switch (Object.getPrototypeOf(allStores[i]).constructor.name) {
                case 'CoreStore':
                case 'ListStore':
                    metierStoreArray.push(allStores[i]);
                    break;
                default:
                    otherArray.push(allStores[i]);
                    break;
            }
        }
        this.processMetierStoreArray(metierStoreArray);
    },
    processMetierStoreArray: function processMetierStoreArray(metierStoreArray) {
        var storeArray = [];
        for (var i = 0; i < metierStoreArray.length; i++) {
            switch (Object.getPrototypeOf(metierStoreArray[i]).constructor.name) {
                case 'CoreStore':
                    for (var property in metierStoreArray[i].definition) {
                        if (metierStoreArray[i].definition.hasOwnProperty(property)) {
                            var getMethodName = 'get' + property[0].toUpperCase() + property.slice(1);
                            if (metierStoreArray[i][getMethodName]() !== undefined) {
                                var storeObject = {};
                                storeObject.name = metierStoreArray[i].definition[property];
                                storeObject.value = metierStoreArray[i][getMethodName]();
                                storeObject.type = 'CoreStore';
                                if (metierStoreArray[i].status.get(storeObject.name)) {
                                    storeObject.status = metierStoreArray[i].status.get(storeObject.name).name;
                                }
                                storeArray.push(storeObject);
                            }
                        }
                    }
                    break;
                case 'ListStore':
                    if (metierStoreArray[i].getDataList() !== undefined) {
                        var listStoreObject = {};
                        listStoreObject.value = {};
                        listStoreObject.value.criteria = metierStoreArray[i].getCriteria();
                        listStoreObject.value.data = metierStoreArray[i].getDataList();
                        listStoreObject.name = metierStoreArray[i].config.identifier;
                        listStoreObject.type = 'ListStore';
                        storeArray.push(listStoreObject);
                    }
                    break;
                default:
                    break;
            }
        }
        storeArray = _.sortBy(storeArray, function (o) {
            return o.name;
        });
        if (this.state.filterTextValue.length > 0) {
            var filteredStoreArray = _.filter(storeArray, function (o) {
                return o.name.toUpperCase().includes(x.target.value.toUpperCase());
            });
            this.setState({
                storeArray: storeArray,
                filteredStoreArray: filteredStoreArray
            });
        } else {
            this.setState({
                storeArray: storeArray,
                filteredStoreArray: storeArray
            });
        }
    },
    getClassName: function getClassName() {
        return this.state.isExpanded ? 'customDevTools-expanded' : 'customDevTools';
    },
    handleCollapse: function handleCollapse() {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    },
    getIconClassName: function getIconClassName() {
        return this.state.isExpanded ? 'customDevTools-button-expand' : 'customDevTools-button-collapse';
    },
    displayCoreStoreList: function displayCoreStoreList() {
        return _.map(this.state.filteredStoreArray, function (store) {
            return _react2.default.createElement(_storeLine2.default, { store: store });
        });
    },
    handleFilterChange: function handleFilterChange(x) {
        var filteredStoreArray = _.filter(this.state.storeArray, function (o) {
            return o.name.toUpperCase().includes(x.target.value.toUpperCase());
        });
        this.setState({
            filterTextValue: x.target.value,
            filteredStoreArray: filteredStoreArray
        });
    },
    toggleSearchBar: function toggleSearchBar() {
        if (this.state.searchBarExpanded) {
            this.setState({
                searchBarExpanded: !this.state.searchBarExpanded,
                filterTextValue: ''
            }, this.processAllStores);
        } else {
            this.setState({
                searchBarExpanded: true
            });
        }
    },
    toggleOptions: function toggleOptions() {
        this.setState({
            displayOptions: !this.state.displayOptions
        });
    },
    render: function render() {
        return _react2.default.createElement(
            'div',
            { className: this.getClassName(), style: { display: this.state.cssDisplay } },
            this.state.isExpanded && _react2.default.createElement('br', null),
            this.state.isExpanded && _react2.default.createElement('div', { onClick: this.processAllStores, className: 'reloadDouble' }),
            _react2.default.createElement(
                'div',
                { className: 'submit cursor-pointer mb20 button-minimize-container' },
                this.state.isExpanded && _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('div', { onClick: this.toggleOptions, className: 'icon-gear' }),
                    _react2.default.createElement('div', { onClick: this.toggleSearchBar, className: 'searchButton' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'collapse-button-container', onClick: this.handleCollapse },
                    _react2.default.createElement('div', { className: this.getIconClassName() })
                )
            ),
            !this.state.isExpanded && _react2.default.createElement(
                'div',
                { className: 'devToolTitle' },
                _react2.default.createElement(
                    'b',
                    null,
                    'CustomDevTools'
                )
            ),
            this.state.searchBarExpanded && _react2.default.createElement(
                'form',
                { className: 'searchInputContainer', onSubmit: function onSubmit(e) {
                        e.preventDefault();
                    } },
                _react2.default.createElement('input', { className: 'searchInput', type: 'text', value: this.state.filterTextValue, name: 'storeNameFilter', onChange: this.handleFilterChange, placeholder: 'store...', autoComplete: 'off' })
            ),
            _react2.default.createElement(
                'div',
                { className: 'customDevToolsContent' },
                this.state.displayOptions ? _react2.default.createElement(_config2.default, null) : this.displayCoreStoreList()
            )
        );
    }
});
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNyZWF0ZUNsYXNzIiwiZGlzcGxheU5hbWUiLCJnZXRJbml0aWFsU3RhdGUiLCJpc0V4cGFuZGVkIiwic3RvcmVBcnJheSIsInNob3dDb250YWN0IiwiZmlsdGVyVGV4dFZhbHVlIiwic2VhcmNoQmFyRXhwYW5kZWQiLCJjc3NEaXNwbGF5IiwiZGlzcGxheU9wdGlvbnMiLCJjb21wb25lbnREaWRNb3VudCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVLZXlEb3duIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZSIsImN0cmxLZXkiLCJtZXRhS2V5IiwiYWx0S2V5IiwidGFyZ2V0IiwidGFnTmFtZSIsImlzQ29udGVudEVkaXRhYmxlIiwiY2hhckNvZGUiLCJrZXlDb2RlIiwid2hpY2giLCJjaGFyIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwidG9nZ2xlVmlzaWJpbGl0eSIsInNldFN0YXRlIiwic3RhdGUiLCJwcm9jZXNzQWxsU3RvcmVzIiwiYWxsU3RvcmVzIiwicHJvdG90eXBlIiwiX2luc3RhbmNlcyIsIm1ldGllclN0b3JlQXJyYXkiLCJvdGhlckFycmF5IiwiaSIsImxlbmd0aCIsIk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwiY29uc3RydWN0b3IiLCJuYW1lIiwicHVzaCIsInByb2Nlc3NNZXRpZXJTdG9yZUFycmF5IiwicHJvcGVydHkiLCJkZWZpbml0aW9uIiwiaGFzT3duUHJvcGVydHkiLCJnZXRNZXRob2ROYW1lIiwidG9VcHBlckNhc2UiLCJzbGljZSIsInVuZGVmaW5lZCIsInN0b3JlT2JqZWN0IiwidmFsdWUiLCJ0eXBlIiwic3RhdHVzIiwiZ2V0IiwiZ2V0RGF0YUxpc3QiLCJsaXN0U3RvcmVPYmplY3QiLCJjcml0ZXJpYSIsImdldENyaXRlcmlhIiwiZGF0YSIsImNvbmZpZyIsImlkZW50aWZpZXIiLCJfIiwic29ydEJ5IiwibyIsImZpbHRlcmVkU3RvcmVBcnJheSIsImZpbHRlciIsImluY2x1ZGVzIiwieCIsImdldENsYXNzTmFtZSIsImhhbmRsZUNvbGxhcHNlIiwiZ2V0SWNvbkNsYXNzTmFtZSIsImRpc3BsYXlDb3JlU3RvcmVMaXN0IiwibWFwIiwic3RvcmUiLCJoYW5kbGVGaWx0ZXJDaGFuZ2UiLCJ0b2dnbGVTZWFyY2hCYXIiLCJ0b2dnbGVPcHRpb25zIiwicmVuZGVyIiwiZGlzcGxheSIsInByZXZlbnREZWZhdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWUsZ0JBQU1BLFdBQU4sQ0FBa0I7QUFDN0JDLGlCQUFhLGdCQURnQjs7QUFHN0JDLG1CQUg2Qiw2QkFHWDtBQUNkLGVBQU87QUFDSEMsd0JBQVksS0FEVDtBQUVIQyx3QkFBWSxFQUZUO0FBR0hDLHlCQUFhLEtBSFY7QUFJSEMsNkJBQWlCLEVBSmQ7QUFLSEMsK0JBQW1CLEtBTGhCO0FBTUhDLHdCQUFZLE1BTlQ7QUFPSEMsNEJBQWdCO0FBUGIsU0FBUDtBQVNILEtBYjRCO0FBZTdCQyxxQkFmNkIsK0JBZVQ7QUFDaEJDLGVBQU9DLGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DLEtBQUtDLGFBQXhDO0FBQ0gsS0FqQjRCO0FBbUI3QkMsd0JBbkI2QixrQ0FtQk47QUFDbkJILGVBQU9JLG1CQUFQLENBQTJCLFNBQTNCLEVBQXNDLEtBQUtGLGFBQTNDO0FBQ0gsS0FyQjRCO0FBc0I3QkEsaUJBdEI2Qix5QkFzQmZHLENBdEJlLEVBc0JaO0FBQ2I7QUFDQTtBQUNBLFlBQ0ksQ0FBQ0EsRUFBRUMsT0FBSCxJQUFjLENBQUNELEVBQUVFLE9BQWpCLElBQTRCLENBQUNGLEVBQUVHLE1BRC9CLEtBR0lILEVBQUVJLE1BQUYsQ0FBU0MsT0FBVCxLQUFxQixPQUFyQixJQUNBTCxFQUFFSSxNQUFGLENBQVNDLE9BQVQsS0FBcUIsUUFEckIsSUFFQUwsRUFBRUksTUFBRixDQUFTQyxPQUFULEtBQXFCLFVBRnJC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QWYvQjtBQW1CSyxpQkFBSzRCLEtBQUwsQ0FBV3hCLGlCQUFYLElBQ0c7QUFBQTtBQUFBLGtCQUFNLFdBQVUsc0JBQWhCLEVBQXVDLFVBQVUsa0JBQUNTLENBQUQsRUFBTztBQUFFQSwwQkFBRW1FLGNBQUY7QUFBb0IscUJBQTlFO0FBQ0kseURBQU8sV0FBVSxhQUFqQixFQUErQixNQUFLLE1BQXBDLEVBQTJDLE9BQU8sS0FBS3BELEtBQUwsQ0FBV3pCLGVBQTdELEVBQThFLE1BQUssaUJBQW5GLEVBQXFHLFVBQVUsS0FBS3dFLGtCQUFwSCxFQUF3SSxhQUFZLFVBQXBKLEVBQStKLGNBQWMsS0FBN0s7QUFESixhQXBCUjtBQXVCSTtBQUFBO0FBQUEsa0JBQUssV0FBVSx1QkFBZjtBQUNLLHFCQUFLL0MsS0FBTCxDQUFXdEIsY0FBWCxHQUNHLHFEQURILEdBR0csS0FBS2tFLG9CQUFMO0FBSlI7QUF2QkosU0FESjtBQWdDSDtBQXpNNEIsQ0FBbEIsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IENvcmVTdG9yZSBmcm9tICdmb2N1cy1jb3JlL3N0b3JlL0NvcmVTdG9yZSdcclxuaW1wb3J0IGxvZGFzaCBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgU3RvcmVMaW5lIGZyb20gJy4vY29tcG9uZW50cy9zdG9yZS1saW5lJztcclxuaW1wb3J0IFN0b3JlQ29uZmlnIGZyb20gJy4vY29tcG9uZW50cy9jb25maWcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZGlzcGxheU5hbWU6ICdjdXN0b21EZXZUb29scycsXHJcblxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlzRXhwYW5kZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdG9yZUFycmF5OiBbXSxcclxuICAgICAgICAgICAgc2hvd0NvbnRhY3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICBmaWx0ZXJUZXh0VmFsdWU6ICcnLFxyXG4gICAgICAgICAgICBzZWFyY2hCYXJFeHBhbmRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNzc0Rpc3BsYXk6ICdub25lJyxcclxuICAgICAgICAgICAgZGlzcGxheU9wdGlvbnM6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bik7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlEb3duKTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGVLZXlEb3duKGUpIHtcclxuICAgICAgICAvLyBJZ25vcmUgcmVndWxhciBrZXlzIHdoZW4gZm9jdXNlZCBvbiBhIGZpZWxkXHJcbiAgICAgICAgLy8gYW5kIG5vIG1vZGlmaWVycyBhcmUgYWN0aXZlLlxyXG4gICAgICAgIGlmICgoXHJcbiAgICAgICAgICAgICFlLmN0cmxLZXkgJiYgIWUubWV0YUtleSAmJiAhZS5hbHRLZXlcclxuICAgICAgICApICYmIChcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnRhZ05hbWUgPT09ICdJTlBVVCcgfHxcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnRhZ05hbWUgPT09ICdTRUxFQ1QnIHx8XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC50YWdOYW1lID09PSAnVEVYVEFSRUEnIHx8XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5pc0NvbnRlbnRFZGl0YWJsZVxyXG4gICAgICAgICAgICApKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY2hhckNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcclxuICAgICAgICBjb25zdCBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyQ29kZSk7XHJcbiAgICAgICAgaWYgKGNoYXJDb2RlID09PSA3NyAmJiBlLmN0cmxLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVWaXNpYmlsaXR5KCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdG9nZ2xlVmlzaWJpbGl0eSgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgY3NzRGlzcGxheTogdGhpcy5zdGF0ZS5jc3NEaXNwbGF5ID09PSAnaW5saW5lJyA/ICdub25lJyA6ICdpbmxpbmUnXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHByb2Nlc3NBbGxTdG9yZXMoKSB7XHJcbiAgICAgICAgbGV0IGFsbFN0b3JlcyA9IENvcmVTdG9yZS5wcm90b3R5cGUuX2luc3RhbmNlcztcclxuICAgICAgICBsZXQgbWV0aWVyU3RvcmVBcnJheSA9IFtdO1xyXG4gICAgICAgIGxldCBvdGhlckFycmF5ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxTdG9yZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc3dpdGNoIChPYmplY3QuZ2V0UHJvdG90eXBlT2YoYWxsU3RvcmVzW2ldKS5jb25zdHJ1Y3Rvci5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdDb3JlU3RvcmUnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnTGlzdFN0b3JlJzpcclxuICAgICAgICAgICAgICAgICAgICBtZXRpZXJTdG9yZUFycmF5LnB1c2goYWxsU3RvcmVzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJBcnJheS5wdXNoKGFsbFN0b3Jlc1tpXSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByb2Nlc3NNZXRpZXJTdG9yZUFycmF5KG1ldGllclN0b3JlQXJyYXkpO1xyXG4gICAgfSxcclxuICAgIHByb2Nlc3NNZXRpZXJTdG9yZUFycmF5KG1ldGllclN0b3JlQXJyYXkpIHtcclxuICAgICAgICBsZXQgc3RvcmVBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWV0aWVyU3RvcmVBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKE9iamVjdC5nZXRQcm90b3R5cGVPZihtZXRpZXJTdG9yZUFycmF5W2ldKS5jb25zdHJ1Y3Rvci5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdDb3JlU3RvcmUnOlxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHByb3BlcnR5IGluIG1ldGllclN0b3JlQXJyYXlbaV0uZGVmaW5pdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0aWVyU3RvcmVBcnJheVtpXS5kZWZpbml0aW9uLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdldE1ldGhvZE5hbWUgPSAnZ2V0JyArIHByb3BlcnR5WzBdLnRvVXBwZXJDYXNlKCkgKyBwcm9wZXJ0eS5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRpZXJTdG9yZUFycmF5W2ldW2dldE1ldGhvZE5hbWVdKCkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdG9yZU9iamVjdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlT2JqZWN0Lm5hbWUgPSBtZXRpZXJTdG9yZUFycmF5W2ldLmRlZmluaXRpb25bcHJvcGVydHldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlT2JqZWN0LnZhbHVlID0gbWV0aWVyU3RvcmVBcnJheVtpXVtnZXRNZXRob2ROYW1lXSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlT2JqZWN0LnR5cGUgPSAnQ29yZVN0b3JlJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0aWVyU3RvcmVBcnJheVtpXS5zdGF0dXMuZ2V0KHN0b3JlT2JqZWN0Lm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlT2JqZWN0LnN0YXR1cyA9IG1ldGllclN0b3JlQXJyYXlbaV0uc3RhdHVzLmdldChzdG9yZU9iamVjdC5uYW1lKS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yZUFycmF5LnB1c2goc3RvcmVPYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnTGlzdFN0b3JlJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWV0aWVyU3RvcmVBcnJheVtpXS5nZXREYXRhTGlzdCgpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3RTdG9yZU9iamVjdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0U3RvcmVPYmplY3QudmFsdWUgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdFN0b3JlT2JqZWN0LnZhbHVlLmNyaXRlcmlhID0gbWV0aWVyU3RvcmVBcnJheVtpXS5nZXRDcml0ZXJpYSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0U3RvcmVPYmplY3QudmFsdWUuZGF0YSA9IG1ldGllclN0b3JlQXJyYXlbaV0uZ2V0RGF0YUxpc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdFN0b3JlT2JqZWN0Lm5hbWUgPSBtZXRpZXJTdG9yZUFycmF5W2ldLmNvbmZpZy5pZGVudGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0U3RvcmVPYmplY3QudHlwZSA9ICdMaXN0U3RvcmUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yZUFycmF5LnB1c2gobGlzdFN0b3JlT2JqZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0b3JlQXJyYXkgPSBfLnNvcnRCeShzdG9yZUFycmF5LCAobykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gby5uYW1lO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbHRlclRleHRWYWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZFN0b3JlQXJyYXkgPSBfLmZpbHRlcihzdG9yZUFycmF5LCAobykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG8ubmFtZS50b1VwcGVyQ2FzZSgpLmluY2x1ZGVzKHgudGFyZ2V0LnZhbHVlLnRvVXBwZXJDYXNlKCkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHN0b3JlQXJyYXk6IHN0b3JlQXJyYXksXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZFN0b3JlQXJyYXk6IGZpbHRlcmVkU3RvcmVBcnJheVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgc3RvcmVBcnJheTogc3RvcmVBcnJheSxcclxuICAgICAgICAgICAgICAgIGZpbHRlcmVkU3RvcmVBcnJheTogc3RvcmVBcnJheVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmlzRXhwYW5kZWQgPyAnY3VzdG9tRGV2VG9vbHMtZXhwYW5kZWQnIDogJ2N1c3RvbURldlRvb2xzJztcclxuICAgIH0sXHJcbiAgICBoYW5kbGVDb2xsYXBzZSgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNFeHBhbmRlZDogIXRoaXMuc3RhdGUuaXNFeHBhbmRlZFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0SWNvbkNsYXNzTmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pc0V4cGFuZGVkID8gJ2N1c3RvbURldlRvb2xzLWJ1dHRvbi1leHBhbmQnIDogJ2N1c3RvbURldlRvb2xzLWJ1dHRvbi1jb2xsYXBzZSc7XHJcbiAgICB9LFxyXG4gICAgZGlzcGxheUNvcmVTdG9yZUxpc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIF8ubWFwKHRoaXMuc3RhdGUuZmlsdGVyZWRTdG9yZUFycmF5LCAoc3RvcmUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxTdG9yZUxpbmUgc3RvcmU9e3N0b3JlfSAvPlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlRmlsdGVyQ2hhbmdlKHgpIHtcclxuICAgICAgICBsZXQgZmlsdGVyZWRTdG9yZUFycmF5ID0gXy5maWx0ZXIodGhpcy5zdGF0ZS5zdG9yZUFycmF5LCAobykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gby5uYW1lLnRvVXBwZXJDYXNlKCkuaW5jbHVkZXMoeC50YXJnZXQudmFsdWUudG9VcHBlckNhc2UoKSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBmaWx0ZXJUZXh0VmFsdWU6IHgudGFyZ2V0LnZhbHVlLFxyXG4gICAgICAgICAgICBmaWx0ZXJlZFN0b3JlQXJyYXk6IGZpbHRlcmVkU3RvcmVBcnJheVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgdG9nZ2xlU2VhcmNoQmFyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlYXJjaEJhckV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoQmFyRXhwYW5kZWQ6ICF0aGlzLnN0YXRlLnNlYXJjaEJhckV4cGFuZGVkLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyVGV4dFZhbHVlOiAnJ1xyXG4gICAgICAgICAgICB9LCB0aGlzLnByb2Nlc3NBbGxTdG9yZXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaEJhckV4cGFuZGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRvZ2dsZU9wdGlvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGRpc3BsYXlPcHRpb25zOiAhdGhpcy5zdGF0ZS5kaXNwbGF5T3B0aW9uc1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWUoKX0gc3R5bGU9e3sgZGlzcGxheTogdGhpcy5zdGF0ZS5jc3NEaXNwbGF5IH19PlxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuaXNFeHBhbmRlZCAmJiA8YnIgLz59XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5pc0V4cGFuZGVkICYmIDxkaXYgb25DbGljaz17dGhpcy5wcm9jZXNzQWxsU3RvcmVzfSBjbGFzc05hbWU9XCJyZWxvYWREb3VibGVcIiAvPn1cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdWJtaXQgY3Vyc29yLXBvaW50ZXIgbWIyMCBidXR0b24tbWluaW1pemUtY29udGFpbmVyJz5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5pc0V4cGFuZGVkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMudG9nZ2xlT3B0aW9uc30gY2xhc3NOYW1lPVwiaWNvbi1nZWFyXCIgLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMudG9nZ2xlU2VhcmNoQmFyfSBjbGFzc05hbWU9XCJzZWFyY2hCdXR0b25cIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbGxhcHNlLWJ1dHRvbi1jb250YWluZXInIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ29sbGFwc2V9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRJY29uQ2xhc3NOYW1lKCl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHshdGhpcy5zdGF0ZS5pc0V4cGFuZGVkICYmIDxkaXYgY2xhc3NOYW1lPSdkZXZUb29sVGl0bGUnPlxyXG4gICAgICAgICAgICAgICAgICAgIDxiPnsnQ3VzdG9tRGV2VG9vbHMnfTwvYj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2VhcmNoQmFyRXhwYW5kZWQgJiZcclxuICAgICAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzZWFyY2hJbnB1dENvbnRhaW5lclwiIG9uU3VibWl0PXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCkgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJzZWFyY2hJbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUuZmlsdGVyVGV4dFZhbHVlfSBuYW1lPVwic3RvcmVOYW1lRmlsdGVyXCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRmlsdGVyQ2hhbmdlfSBwbGFjZWhvbGRlcj0nc3RvcmUuLi4nIGF1dG9Db21wbGV0ZT17J29mZid9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPn1cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjdXN0b21EZXZUb29sc0NvbnRlbnQnPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmRpc3BsYXlPcHRpb25zID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0b3JlQ29uZmlnLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlDb3JlU3RvcmVMaXN0KCl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59KVxyXG4iXX0=