"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function buildListStore(ListStoreInstance) {
    var _this = this;

    var storeArray = [];
    if (ListStoreInstance.getDataList() !== undefined) {
        var listStoreObject = {};
        if (ListStoreInstance.getCriteria() !== undefined) {
            listStoreObject.value = {};

            listStoreObject.value.criteria = ListStoreInstance.getCriteria();
            listStoreObject.value.data = ListStoreInstance.getDataList();
        } else {
            listStoreObject.value = ListStoreInstance.getDataList();
        }
        listStoreObject.name = ListStoreInstance.config.identifier;
        listStoreObject.type = "ListStore";
        listStoreObject.instance = ListStoreInstance;
        listStoreObject.uniqId = _.uniqueId();
        listStoreObject.dataChangeMethod = function () {
            standardStoreChangeListener.call(_this, listStoreObject);
        };
        storeArray.push(listStoreObject);
    }
    return storeArray;
}
function addListStoreListener(ListStore) {
    ListStore.instance["addDataListChangeListener"](ListStore.dataChangeMethod);
    ListStore.isRecording = true;
}

function standardStoreChangeListener(ListStore) {
    var currentState = this.state.storeArray;
    var itemIndex = _.findIndex(currentState, function (o) {
        return o.name === ListStore.name;
    });
    var getMethodName = "getDataList";
    currentState[itemIndex].hasChanged = true;
    currentState[itemIndex].value = ListStore.instance[getMethodName]();
    this.setState({ storeArray: currentState });
}

function removeListStoreListener(ListStore) {
    ListStore.instance["removeDataListChangeListener"](ListStore.dataChangeMethod);
    ListStore.hasChanged = undefined;
    ListStore.isRecording = false;
}

exports.default = { buildListStore: buildListStore, addListStoreListener: addListStoreListener, removeListStoreListener: removeListStoreListener };
module.exports = exports["default"];