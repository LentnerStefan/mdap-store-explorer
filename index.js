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

    // getConfig(){
    //     return this.refs['mdap-config'].getOptionsValues();
    // },

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
                this.state.displayOptions ? _react2.default.createElement(_config2.default, { ref: 'mdap-config' }) : this.displayCoreStoreList()
            )
        );
    }
});
module.exports = exports['default'];