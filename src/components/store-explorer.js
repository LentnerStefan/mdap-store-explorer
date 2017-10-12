import React from "react";

import CoreStore from "focus-core/store/CoreStore";
import StoreLine from "./store-line";
import _ from "lodash";

import CoreStoreHelper from '../helpers/core-store-helper';
import ListStoreHelper from '../helpers/list-store-helper';

export default React.createClass({
    displayName: "store-explorer",

    propTypes: {
        filterTextValue: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            filterTextValue: ""
        };
    },
    getInitialState() {
        return {
            storeArray: []
        };
    },

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.isRecording === true &&
            this.props.isRecording === false
        ) {
            this.addListeners();
            // On commence l'enregistrement, on ajoute tout les listeners
        } else if (
            nextProps.isRecording === false &&
            this.props.isRecording === true
        ) {
            // On fini l'enregistrement, on supprime tout les listeners
            this.removeListeners();
        }
    },

    addListeners() {
        let newArray=this.state.storeArray
        for (let i = 0; i < this.state.storeArray.length; i++) {
            switch (this.state.storeArray[i].type) {
                case "ListStore":
                    ListStoreHelper.addListStoreListener.call(this,newArray[i]);
                    break;
                case "CoreStore":
                    CoreStoreHelper.addCoreStoreListener.call(this,newArray[i]);
                default:
                    break;
            }
        }
        this.setState({storeArray:newArray})        
    },
    removeListeners() {
        let newArray=this.state.storeArray
        for (let i = 0; i < this.state.storeArray.length; i++) {
            switch (this.state.storeArray[i].type) {
                case "ListStore":
                    ListStoreHelper.removeListStoreListener.call(this,newArray[i]);
                    break;
                case "CoreStore":
                    CoreStoreHelper.removeCoreStoreListener.call(this,newArray[i]);
                default:
                    break;
            }
        }
        this.setState({storeArray:newArray})
    },

    refresh() {
        let stores = CoreStore.prototype._instances;
        let storeArray = this.state.storeArray;
        // On construit les objets d'affichage
        for (let i = 0; i < stores.length; i++) {
            switch (Object.getPrototypeOf(stores[i]).constructor.name) {
                case "CoreStore":
                    let newStoreArray=CoreStoreHelper.buildCoreStoreArray.call(this,stores[i])
                    for (let i = 0; i < newStoreArray.length; i++) {
                        if(_.findIndex(storeArray,(store)=>{
                            return store.name===newStoreArray[i].name && store.definition===newStoreArray[i].definition
                        })<0){
                            storeArray.push(newStoreArray[i]);
                        }
                    }                        
                    break;
                case "ListStore":
                    let newListStoreArray=ListStoreHelper.buildListStore.call(this,stores[i]);
                    for (let i = 0; i < newListStoreArray.length; i++) {
                        if(_.findIndex(storeArray,(store)=>{
                            return store.name===newListStoreArray[i].name && store.definition===undefined && newListStoreArray[i].definition===undefined
                        })<0){
                            storeArray.push(newListStoreArray[i]);
                        }
                    }   
                    break;
                default:
                    break;
            }
        }
        // On trie par nom
        storeArray = _.sortBy(storeArray, o => {
            return o.name;
        });
        this.setState({
            storeArray: storeArray
        });
    },

    render() {
        let data=this.state.storeArray;
        if (this.props.filterTextValue.length > 0) {
            data = _.filter(data, o => {
                return o.name
                    .toUpperCase()
                    .includes(this.props.filterTextValue.toUpperCase());
            });
        }
        return (
            <div>
                {_.map(data, store => {
                    return (
                        <StoreLine
                            isRecording={store.isRecording}
                            store={store}
                            key={store.uniqId}
                        />
                    );
                })}
            </div>
        );
    }
});