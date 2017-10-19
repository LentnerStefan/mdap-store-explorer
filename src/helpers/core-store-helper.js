function buildCoreStoreArray(CoreStoreInstance) {
    let storeArray = [];
    // On parcours toutes les définitions du coreStore. On crée une ligne pour chaque noeud.
    for (let property in CoreStoreInstance.definition) {
        if (CoreStoreInstance.definition.hasOwnProperty(property)) {
            let storeObject = buildCoreStore.call(this, CoreStoreInstance, property);
            if (Object.keys(storeObject).length > 0) {
                storeArray.push(storeObject);
            }
        }
    }
    return storeArray;
}

function buildCoreStore(CoreStoreInstance, definition) {
    let storeObject = {};
    let getMethodName =
        "get" + definition[0].toUpperCase() + definition.slice(1);
    // On ne s'interesse qu'aux stores contenant des données.
    if (CoreStoreInstance[getMethodName]() !== undefined) {
        storeObject.name = CoreStoreInstance.definition[definition];
        storeObject.value = CoreStoreInstance[getMethodName]();
        storeObject.type = "CoreStore";
        storeObject.instance = CoreStoreInstance;
        storeObject.definition = definition;
        storeObject.uniqId=_.uniqueId();
        storeObject.dataChangeMethod=() => {standardStoreChangeListener.call(this,storeObject)};   
    }
    return storeObject;
};

function addCoreStoreListener(CoreStore) {
    let addDataChangeMethodName =
        "add" +
        CoreStore.definition[0].toUpperCase() +
        CoreStore.definition.slice(1) +
        "ChangeListener";
    CoreStore.instance[addDataChangeMethodName](CoreStore.dataChangeMethod);
    CoreStore.isRecording=true;
}


function standardStoreChangeListener(CoreStore) {
    let currentState = this.state.storeArray;
    let itemIndex = _.findIndex(
        currentState,
        o =>
            o.name === CoreStore.name &&
            o.definition === CoreStore.definition
    );
    let getMethodName =
        "get" +
        CoreStore.definition[0].toUpperCase() +
        CoreStore.definition.slice(1);
    currentState[itemIndex].hasChanged = true;
    currentState[itemIndex].value = CoreStore.instance[getMethodName]();
    this.setState({ storeArray: currentState });
}

function removeCoreStoreListener(CoreStore) {
    let removeDataChangeMethodName =
        "remove" +
        CoreStore.definition[0].toUpperCase() +
        CoreStore.definition.slice(1) +
        "ChangeListener";
    CoreStore.instance[removeDataChangeMethodName](CoreStore.dataChangeMethod);
    CoreStore.hasChanged=undefined;
    CoreStore.isRecording=false;
    
}

export default {buildCoreStoreArray,addCoreStoreListener,removeCoreStoreListener}