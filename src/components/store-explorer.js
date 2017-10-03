import React from "react";

import CoreStore from "focus-core/store/CoreStore";
import StoreLine from "./store-line";
import _ from "lodash";

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
    getDataFromStores() {},
    refresh() {
        let stores = CoreStore.prototype._instances;
        let storeArray = [];
        for (let i = 0; i < stores.length; i++) {
            switch (Object.getPrototypeOf(stores[i]).constructor.name) {
                case "CoreStore":
                    for (let property in stores[i].definition) {
                        if (stores[i].definition.hasOwnProperty(property)) {
                            let getMethodName =
                                "get" +
                                property[0].toUpperCase() +
                                property.slice(1);
                            if (stores[i][getMethodName]() !== undefined) {
                                let storeObject = {};
                                storeObject.name =
                                    stores[i].definition[property];
                                storeObject.value = stores[i][getMethodName]();
                                storeObject.type = "CoreStore";
                                if (stores[i].status.get(storeObject.name)) {
                                    storeObject.status = stores[i].status.get(
                                        storeObject.name
                                    ).name;
                                }
                                storeArray.push(storeObject);
                            }
                        }
                    }
                    break;
                case "ListStore":
                    if (stores[i].getDataList() !== undefined) {
                        let listStoreObject = {};
                        if (stores[i].getCriteria() !== undefined) {
                            listStoreObject.value = {};

                            listStoreObject.value.criteria = stores[
                                i
                            ].getCriteria();
                            listStoreObject.value.data = stores[
                                i
                            ].getDataList();
                        } else {
                            listStoreObject.value = stores[i].getDataList();
                        }
                        listStoreObject.name = stores[i].config.identifier;
                        listStoreObject.type = "ListStore";
                        storeArray.push(listStoreObject);
                    }
                    break;
                default:
                    break;
            }
        }
        storeArray = _.sortBy(storeArray, o => {
            return o.name;
        });
        if (this.props.filterTextValue.length > 0) {
            storeArray = _.filter(storeArray, o => {
                return o.name
                    .toUpperCase()
                    .includes(this.props.filterTextValue.toUpperCase());
            });
        }
        this.setState({
            storeArray: storeArray
        });
    },

    render() {
        return (
            <div>
                {_.map(this.state.storeArray, store => {
                    return <StoreLine store={store} />;
                })}
            </div>
        );
    }
});
