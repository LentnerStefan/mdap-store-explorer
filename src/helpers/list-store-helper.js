function buildListStore(ListStoreInstance) {
    let storeArray = [];
    if (ListStoreInstance.getDataList() !== undefined) {
        let listStoreObject = {};
        if (ListStoreInstance.getCriteria() !== undefined) {
            listStoreObject.value = {};

            listStoreObject.value.criteria = ListStoreInstance.getCriteria();
            listStoreObject.value.data = ListStoreInstance.getDataList();
        } else {
            listStoreObject.value = ListStoreInstance.getDataList();
        }
        listStoreObject.name = ListStoreInstance.config.identifier;
        listStoreObject.type = "ListStore";
        listStoreObject.instance=ListStoreInstance;
        listStoreObject.uniqId=_.uniqueId();
        listStoreObject.dataChangeMethod=() => {standardStoreChangeListener.call(this,listStoreObject)};   
        storeArray.push(listStoreObject);
    }
    return storeArray;
}
function addListStoreListener(ListStore) {
    ListStore.instance["addDataListChangeListener"](ListStore.dataChangeMethod);
    ListStore.isRecording=true;    
}

function standardStoreChangeListener(ListStore) {
    let currentState = this.state.storeArray;
    let itemIndex = _.findIndex(
        currentState,
        o =>
            o.name === ListStore.name
    );
    let getMethodName = "getDataList";
    currentState[itemIndex].hasChanged = true;
    currentState[itemIndex].value = ListStore.instance[getMethodName]();
    this.setState({ storeArray: currentState });
}

function removeListStoreListener(ListStore) {
    ListStore.instance["removeDataListChangeListener"](ListStore.dataChangeMethod);
    ListStore.hasChanged=undefined;
    ListStore.isRecording=false;
}

export default {buildListStore,addListStoreListener,removeListStoreListener}