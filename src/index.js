import React, { Component, PropTypes } from 'react';
import CoreStore from 'focus-core/store/CoreStore'
import lodash from 'lodash';
import StoreLine from './components/store-line';
import StoreConfig from './components/config';

import './styles/mdap-dev-tools.scss';

export default React.createClass({
    displayName: 'customDevTools',

    getInitialState() {
        return {
            isExpanded: false,
            storeArray: [],
            showContact: false,
            filterTextValue: '',
            searchBarExpanded: false,
            cssDisplay: 'none',
            displayOptions: false
        }
    },

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    },

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    },
    handleKeyDown(e) {
        // Ignore regular keys when focused on a field
        // and no modifiers are active.
        if ((
            !e.ctrlKey && !e.metaKey && !e.altKey
        ) && (
                e.target.tagName === 'INPUT' ||
                e.target.tagName === 'SELECT' ||
                e.target.tagName === 'TEXTAREA' ||
                e.target.isContentEditable
            )) {
            return;
        }
        const charCode = e.keyCode || e.which;
        const char = String.fromCharCode(charCode);
        if (charCode === 77 && e.ctrlKey) {
            this.toggleVisibility();

        }
    },

    toggleVisibility() {
        this.setState({
            cssDisplay: this.state.cssDisplay === 'inline' ? 'none' : 'inline'
        })

    },

    processAllStores() {
        let allStores = CoreStore.prototype._instances;
        let metierStoreArray = [];
        let otherArray = [];
        for (let i = 0; i < allStores.length; i++) {
            switch (Object.getPrototypeOf(allStores[i]).constructor.name) {
                case 'CoreStore':
                case 'ListStore':
                    metierStoreArray.push(allStores[i]);
                    break;
                default:
                    otherArray.push(allStores[i])
                    break;
            }
        }
        this.processMetierStoreArray(metierStoreArray);
    },
    processMetierStoreArray(metierStoreArray) {
        let storeArray = [];
        for (let i = 0; i < metierStoreArray.length; i++) {
            switch (Object.getPrototypeOf(metierStoreArray[i]).constructor.name) {
                case 'CoreStore':
                    for (let property in metierStoreArray[i].definition) {
                        if (metierStoreArray[i].definition.hasOwnProperty(property)) {
                            let getMethodName = 'get' + property[0].toUpperCase() + property.slice(1);
                            if (metierStoreArray[i][getMethodName]() !== undefined) {
                                let storeObject = {};
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
                        let listStoreObject = {};
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
        storeArray = _.sortBy(storeArray, (o) => {
            return o.name;
        });
        if (this.state.filterTextValue.length > 0) {
            let filteredStoreArray = _.filter(storeArray, (o) => {
                return o.name.toUpperCase().includes(x.target.value.toUpperCase())
            });
            this.setState({
                storeArray: storeArray,
                filteredStoreArray: filteredStoreArray
            });
        }
        else {
            this.setState({
                storeArray: storeArray,
                filteredStoreArray: storeArray
            });
        }
    },
    getClassName() {
        return this.state.isExpanded ? 'customDevTools-expanded' : 'customDevTools';
    },
    handleCollapse() {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    },
    getIconClassName() {
        return this.state.isExpanded ? 'customDevTools-button-expand' : 'customDevTools-button-collapse';
    },
    displayCoreStoreList() {
        return _.map(this.state.filteredStoreArray, (store) => {
            return (
                <StoreLine store={store} />
            )
        });
    },
    handleFilterChange(x) {
        let filteredStoreArray = _.filter(this.state.storeArray, (o) => {
            return o.name.toUpperCase().includes(x.target.value.toUpperCase())
        })
        this.setState({
            filterTextValue: x.target.value,
            filteredStoreArray: filteredStoreArray
        })
    },
    toggleSearchBar() {
        if (this.state.searchBarExpanded) {
            this.setState({
                searchBarExpanded: !this.state.searchBarExpanded,
                filterTextValue: ''
            }, this.processAllStores)
        }
        else {
            this.setState({
                searchBarExpanded: true
            })
        }
    },
    toggleOptions() {
        this.setState({
            displayOptions: !this.state.displayOptions
        })
    },
    // getConfig(){
    //     return this.refs['mdap-config'].getOptionsValues();
    // },

    render() {
        return (
            <div className={this.getClassName()} style={{ display: this.state.cssDisplay }}>
                {this.state.isExpanded && <br />}
                {this.state.isExpanded && <div onClick={this.processAllStores} className="reloadDouble" />}
                <div className='submit cursor-pointer mb20 button-minimize-container'>
                    {this.state.isExpanded &&
                        <div>
                            <div onClick={this.toggleOptions} className="icon-gear" />

                            <div onClick={this.toggleSearchBar} className="searchButton" />
                        </div>
                    }
                    <div className='collapse-button-container' onClick={this.handleCollapse}>
                        <div className={this.getIconClassName()} />
                    </div>
                </div>
                {!this.state.isExpanded && <div className='devToolTitle'>
                    <b>{'CustomDevTools'}</b>
                </div>
                }
                {this.state.searchBarExpanded &&
                    <form className="searchInputContainer" onSubmit={(e) => { e.preventDefault() }}>
                        <input className="searchInput" type="text" value={this.state.filterTextValue} name="storeNameFilter" onChange={this.handleFilterChange} placeholder='store...' autoComplete={'off'} />
                    </form>}
                <div className='customDevToolsContent'>
                    {this.state.displayOptions ?
                        <StoreConfig ref='mdap-config'/>
                        :
                        this.displayCoreStoreList()}
                </div>
            </div>
        )
    }
})
