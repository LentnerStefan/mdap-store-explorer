import CoreStore from "focus-core/store/CoreStore";
import dispatcher from "focus-core/dispatcher";
import {
    buildCoreStoreArray,
    addCoreStoreListener,
    removeCoreStoreListener
} from "../helpers/core-store-helper";
import {
    buildListStore,
    addListStoreListener,
    removeListStoreListener
} from "../helpers/list-store-helper";

window.__DEV__ = true;

const updateCoreStore = (definition, storeData) => {
    let data = {};
    data[definition] = storeData;
    dispatcher.handleViewAction({
        data,
        status: {
            name: "loaded",
            isLoading: false
        },
        type: "update"
    });
};

const fakeData1 = { foo: "foo", bar: "bar" };
const fakeData2 = { fuu: "uss", roh: "dah" };

test("Core : Build with value & ignore without", () => {
    // On teste ici que le core-stores sont bien initialisé, et que les stores vides sont ignorés:
    let firstCoreStore = new CoreStore({
        definition: { firstNode: "firstNode" }
    });
    let secondCoreStore = new CoreStore({
        definition: { secondNode: "secondNode" }
    });
    updateCoreStore("firstNode", { ...fakeData1 });
    let coreStoreArray = buildCoreStoreArray(firstCoreStore);
    expect(coreStoreArray.length).toBe(1);
});

test("Core : getValue", () => {
    // On test ici que les valeurs lues dans les stores sont correctes
    let firstCoreStore = new CoreStore({
        definition: { firstNode: "firstNode" }
    });
    let data = { foo: "foo", bar: "bar" };
    updateCoreStore("firstNode", { ...fakeData1 });
    let coreStoreArray = buildCoreStoreArray(firstCoreStore);
    expect(coreStoreArray[0].value).toEqual(fakeData1);
});




test("Core : Add/Remove Listeners", () => {
    // 
    let firstCoreStore = new CoreStore({
        definition: { firstNode: "firstNode" }
    });
    let data = { foo: "foo", bar: "bar" };
    updateCoreStore("firstNode", { ...fakeData1 });
    let coreStoreArray = buildCoreStoreArray(firstCoreStore);
    addCoreStoreListener(coreStoreArray[0]);
    expect(coreStoreArray[0].instance.listenerCount('firstNode:change')).toEqual(1)
    removeCoreStoreListener(coreStoreArray[0]);
    expect(coreStoreArray[0].instance.listenerCount('firstNode:change')).toEqual(0)
});

test("Core : Listeners callback called ", done => {
    // Initialisation du Store-1
    let firstCoreStore = new CoreStore({
        definition: { firstNode: "firstNode" }
    });
    let data = { foo: "foo", bar: "bar" };
    updateCoreStore("firstNode", { ...fakeData1 });
    let coreStoreArray = buildCoreStoreArray(firstCoreStore);

    // On crée un faux contexte (react-like).
    let fakeContext={
        setState:(data)=>{
            // On surcharge le setState, le test se conclue si la callback est appellée            
            expect(data.storeArray[0].hasChanged).toBeTruthy;       
            expect(data.storeArray[0].value).toEqual(fakeData2);                 
            done();
        },
        state:{
            storeArray:coreStoreArray
        }
    }
    // On rebuild les stores en fournissant le faux contexte ( les callbacks sont contextualisées )
    coreStoreArray = buildCoreStoreArray.call(fakeContext,firstCoreStore);
    // on ajoute le listner
    addCoreStoreListener(coreStoreArray[0]);
    // On emet un event..
    updateCoreStore("firstNode", { ...fakeData2 });    
    // Le setState surchargé fait office de verification ici.
});