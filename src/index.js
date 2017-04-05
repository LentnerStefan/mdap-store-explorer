import React from 'react';
import CoreStore from 'focus-core/store/CoreStore'
import StoreLine from './components/store-line';
import StoreConfig from './components/config';

import './styles/mdap-dev-tools.scss';


export default React.createClass({
    displayName: 'mdap-store-explorer',

    getInitialState() {
        return {
            isExpanded: false,
            storeArray: [],
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
        if (charCode === 77 && e.ctrlKey) {
            this.toggleVisibility();
        }
    },

    toggleVisibility() {
        this.setState({
            cssDisplay: this.state.cssDisplay === 'inline' ? 'none' : 'inline'
        })

    },


    refresh() {
        //Récupère les stores de type coreStore & listStore
        let stores=this.getStores();
        // fait le getData/getDatalist/getCritiera, sur tous les stores
        stores = this.getDataFromStores(stores);
        // trie les stores alphabetiquement, et les filtre si nécessaire
        this.sortAndFilterStores(stores);
    },
    getDataFromStores(stores) {
        let storeArray = [];
        for (let i = 0; i < stores.length; i++) {
            switch (Object.getPrototypeOf(stores[i]).constructor.name) {
                case 'CoreStore':
                    for (let property in stores[i].definition) {
                        if (stores[i].definition.hasOwnProperty(property)) {
                            let getMethodName = 'get' + property[0].toUpperCase() + property.slice(1);
                            if (stores[i][getMethodName]() !== undefined) {
                                let storeObject = {};
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
                        let listStoreObject = {};
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
    sortAndFilterStores(stores) {
        stores = _.sortBy(stores, (o) => {
            return o.name;
        });
        if (this.state.filterTextValue.length > 0) {
            let filteredStoreArray = _.filter(stores, (o) => {
                return o.name.toUpperCase().includes(x.target.value.toUpperCase())
            });
            this.setState({
                storeArray: stores,
                filteredStoreArray: filteredStoreArray
            });
        }
        else {
            this.setState({
                storeArray: stores,
                filteredStoreArray: stores
            });
        }
    },

    getStores() {
        let allStores = CoreStore.prototype._instances;
        let stores = [];
        for (let i = 0; i < allStores.length; i++) {
            switch (Object.getPrototypeOf(allStores[i]).constructor.name) {
                case 'CoreStore':
                case 'ListStore':
                    stores.push(allStores[i]);
                    break;
                default:
                    break;
            }
        }
        return stores
    },
    
    getClassName() {
        return this.state.isExpanded ? 'mdap-store-explorer-expanded' : 'mdap-store-explorer';
    },
    handleCollapse() {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    },
    getIconClassName() {
        return this.state.isExpanded ? 'mdap-store-button-expand' : 'mdap-store-button-collapse';
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
            }, this.refresh)
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
    getConfig() {
        // WIP, non utilisé pour l'instant.
        return this.refs['mdap-config'].getOptionsValues();
    },

    render() {
        return (
            <div className={this.getClassName()} style={{ display: this.state.cssDisplay }}>
                {this.state.isExpanded && <br />}
                {this.state.isExpanded && <div onClick={this.refresh} className="reloadDouble" />}
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
                    <b>{'Mdap store explorer'}</b>
                </div>
                }
                {this.state.searchBarExpanded &&
                    <form className="searchInputContainer" onSubmit={(e) => { e.preventDefault() }}>
                        <input className="searchInput" type="text" value={this.state.filterTextValue} name="storeNameFilter" onChange={this.handleFilterChange} placeholder='store...' autoComplete={'off'} />
                    </form>}
                <div className='mdap-store-explorer-content'>
                    <div style={{display: this.state.displayOptions===true?'inline':'none'}}>
                        <StoreConfig ref='mdap-config'/>
                    </div>
                    {this.displayCoreStoreList()}
                </div>
            </div>
        )
    }
})
