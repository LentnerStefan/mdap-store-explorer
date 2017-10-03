'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CoreStore = require('focus-core/store/CoreStore');

var _CoreStore2 = _interopRequireDefault(_CoreStore);

var _storeLine = require('./components/store-line');

var _storeLine2 = _interopRequireDefault(_storeLine);

var _config = require('./components/config');

var _config2 = _interopRequireDefault(_config);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

require('./styles/mdap-dev-tools.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: 'mdap-store-explorer',

    getInitialState: function getInitialState() {
        return {
            isExpanded: false,
            storeArray: [],
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
        if (charCode === 77 && e.ctrlKey) {
            this.toggleVisibility();
        }
    },
    toggleVisibility: function toggleVisibility() {
        this.setState({
            cssDisplay: this.state.cssDisplay === 'inline' ? 'none' : 'inline'
        });
    },
    refresh: function refresh() {
        //Récupère les stores de type coreStore & listStore
        var stores = this.getStores();
        // fait le getData/getDatalist/getCritiera, sur tous les stores
        stores = this.getDataFromStores(stores);
        // trie les stores alphabetiquement, et les filtre si nécessaire
        this.sortAndFilterStores(stores);
    },
    getDataFromStores: function getDataFromStores(stores) {
        var storeArray = [];
        for (var i = 0; i < stores.length; i++) {
            switch (Object.getPrototypeOf(stores[i]).constructor.name) {
                case 'CoreStore':
                    for (var property in stores[i].definition) {
                        if (stores[i].definition.hasOwnProperty(property)) {
                            var getMethodName = 'get' + property[0].toUpperCase() + property.slice(1);
                            if (stores[i][getMethodName]() !== undefined) {
                                var storeObject = {};
                                storeObject.name = stores[i].definition[property];
                                storeObject.value = stores[i][getMethodName]();
                                storeObject.type = 'CoreStore';
                                if (stores[i].status.get(storeObject.name)) {
                                    storeObject.status = stores[i].status.get(storeObject.name).name;
                                }
                                storeArray.push(storeObject);
                            }
                        }
                    }
                    break;
                case 'ListStore':
                    if (stores[i].getDataList() !== undefined) {
                        var listStoreObject = {};
                        listStoreObject.value = {};
                        listStoreObject.value.criteria = stores[i].getCriteria();
                        listStoreObject.value.data = stores[i].getDataList();
                        listStoreObject.name = stores[i].config.identifier;
                        listStoreObject.type = 'ListStore';
                        storeArray.push(listStoreObject);
                    }
                    break;
                default:
                    break;
            }
        }
        return storeArray;
    },
    sortAndFilterStores: function sortAndFilterStores(stores) {
        stores = _lodash2.default.sortBy(stores, function (o) {
            return o.name;
        });
        if (this.state.filterTextValue.length > 0) {
            var filteredStoreArray = _lodash2.default.filter(stores, function (o) {
                return o.name.toUpperCase().includes(x.target.value.toUpperCase());
            });
            this.setState({
                storeArray: stores,
                filteredStoreArray: filteredStoreArray
            });
        } else {
            this.setState({
                storeArray: stores,
                filteredStoreArray: stores
            });
        }
    },
    getStores: function getStores() {
        var allStores = _CoreStore2.default.prototype._instances;
        var stores = [];
        for (var i = 0; i < allStores.length; i++) {
            switch (Object.getPrototypeOf(allStores[i]).constructor.name) {
                case 'CoreStore':
                case 'ListStore':
                    stores.push(allStores[i]);
                    break;
                default:
                    break;
            }
        }
        return stores;
    },
    getClassName: function getClassName() {
        return this.state.isExpanded ? 'mdap-store-explorer-expanded' : 'mdap-store-explorer';
    },
    handleCollapse: function handleCollapse() {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    },
    getIconClassName: function getIconClassName() {
        return this.state.isExpanded ? 'mdap-store-button-expand' : 'mdap-store-button-collapse';
    },
    displayCoreStoreList: function displayCoreStoreList() {
        return _lodash2.default.map(this.state.filteredStoreArray, function (store) {
            return _react2.default.createElement(_storeLine2.default, { store: store });
        });
    },
    handleFilterChange: function handleFilterChange(x) {
        var filteredStoreArray = _lodash2.default.filter(this.state.storeArray, function (o) {
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
            }, this.refresh);
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
    getConfig: function getConfig() {
        // WIP, non utilisé pour l'instant.
        return this.refs['mdap-config'].getOptionsValues();
    },
    render: function render() {
        return _react2.default.createElement(
            'div',
            { className: this.getClassName(), style: { display: this.state.cssDisplay } },
            this.state.isExpanded && _react2.default.createElement('br', null),
            this.state.isExpanded && _react2.default.createElement('div', { onClick: this.refresh, className: 'reloadDouble' }),
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
                    'Mdap store explorer'
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
                { className: 'mdap-store-explorer-content' },
                _react2.default.createElement(
                    'div',
                    { style: { display: this.state.displayOptions === true ? 'inline' : 'none' } },
                    _react2.default.createElement(_config2.default, { ref: 'mdap-config' })
                ),
                this.displayCoreStoreList()
            )
        );
    }
});
module.exports = exports['default'];