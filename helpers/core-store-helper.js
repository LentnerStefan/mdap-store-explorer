"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function buildCoreStoreArray(CoreStoreInstance) {
    var storeArray = [];
    // On parcours toutes les définitions du coreStore. On crée une ligne pour chaque noeud.
    for (var property in CoreStoreInstance.definition) {
        if (CoreStoreInstance.definition.hasOwnProperty(property)) {
            var storeObject = buildCoreStore.call(this, CoreStoreInstance, property);
            if (Object.keys(storeObject).length > 0) {
                storeArray.push(storeObject);
            }
        }
    }
    return storeArray;
}

function buildCoreStore(CoreStoreInstance, definition) {
    var _this = this;

    var storeObject = {};
    var getMethodName = "get" + definition[0].toUpperCase() + definition.slice(1);
    // On ne s'interesse qu'aux stores contenant des données.
    if (CoreStoreInstance[getMethodName]() !== undefined) {
        storeObject.name = CoreStoreInstance.definition[definition];
        storeObject.value = CoreStoreInstance[getMethodName]();
        storeObject.type = "CoreStore";
        storeObject.instance = CoreStoreInstance;
        storeObject.definition = definition;
        storeObject.uniqId = _.uniqueId();
        storeObject.dataChangeMethod = function () {
            standardStoreChangeListener.call(_this, storeObject);
        };
    }
    return storeObject;
};

function addCoreStoreListener(CoreStore) {
    var addDataChangeMethodName = "add" + CoreStore.definition[0].toUpperCase() + CoreStore.definition.slice(1) + "ChangeListener";
    CoreStore.instance[addDataChangeMethodName](CoreStore.dataChangeMethod);
    CoreStore.isRecording = true;
}

function standardStoreChangeListener(CoreStore) {
    var currentState = this.state.storeArray;
    var itemIndex = _.findIndex(currentState, function (o) {
        return o.name === CoreStore.name && o.definition === CoreStore.definition;
    });
    var getMethodName = "get" + CoreStore.definition[0].toUpperCase() + CoreStore.definition.slice(1);
    currentState[itemIndex].hasChanged = true;
    currentState[itemIndex].value = CoreStore.instance[getMethodName]();
    this.setState({ storeArray: currentState });
}

function removeCoreStoreListener(CoreStore) {
    var removeDataChangeMethodName = "remove" + CoreStore.definition[0].toUpperCase() + CoreStore.definition.slice(1) + "ChangeListener";
    CoreStore.instance[removeDataChangeMethodName](CoreStore.dataChangeMethod);
    CoreStore.hasChanged = undefined;
    CoreStore.isRecording = false;
}

exports.default = { buildCoreStoreArray: buildCoreStoreArray, addCoreStoreListener: addCoreStoreListener, removeCoreStoreListener: removeCoreStoreListener };
module.exports = exports["default"];