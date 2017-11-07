import ListStore from 'focus-core/store/list';

import dispatcher from "focus-core/dispatcher";
import {
    buildListStore,
    addListStoreListener,
    removeListStoreListener
} from "../helpers/list-store-helper";

window.__DEV__ = true;

const updateListStore = (identifier, dataList,criteria=undefined) => {
    dispatcher.handleViewAction({
        data: {
            criteria,
            groupingKey: undefined,
            sortBy: undefined,
            sortAsc: undefined,
            dataList,
            totalCount: dataList.length
        },
        type: 'update',
        identifier
    });
};

const fakeData1 = { foo: "foo", bar: "bar" };
const fakeData2 = { fuu: "uss", roh: "dah" };
const fakeData3 = { loi: "nich", ba: "la" };
const fakeData4 = { pi: "nich", ho: "ba" };
const fakeList1=[fakeData1,fakeData2,fakeData3];
const fakeList2=[fakeData2,fakeData3];
const fakeCrit={fakeCrit:'fakeCrit'};

test("List : Build with value & ignore without", () => {
    // On teste ici que les list-store sont bien initialisé, et que les stores vides sont ignorés:
    let firstListStore = new ListStore({
        identifier: 'firstListStore'
    });
    let secondListStore = new ListStore({
        identifier: 'secondListStore'
    });
    updateListStore("firstListStore", fakeList1 );
    let listStoreArray = buildListStore(firstListStore);
    expect(listStoreArray.length).toBe(1);
    let emptyListStoreArray = buildListStore(secondListStore);
    expect(emptyListStoreArray.length).toBe(0);
});

test("List : getValue", () => {
    // On test ici que les valeurs lues dans les stores sont correctes
    let firstListStore = new ListStore({
        identifier: 'firstListStore'
    });
    updateListStore("firstListStore", fakeList1 );
    let secondListStore = new ListStore({
        identifier: 'secondListStore'
    });
    updateListStore("secondListStore", fakeList2, fakeCrit );

    let listStoreArray = buildListStore(firstListStore);
    
    listStoreArray.push(buildListStore(secondListStore)[0]);
    expect(listStoreArray[0].value).toEqual(fakeList1);
    expect(listStoreArray[1].value.criteria).toEqual(fakeCrit);
    expect(listStoreArray[1].value.data).toEqual(fakeList2);
    
});

test("List : Add/Remove Listeners", () => {
    // 
    let firstListStore = new ListStore({
        identifier: 'firstListStore'
    });
    updateListStore("firstListStore", fakeList1 );
    
    let listStoreArray = buildListStore(firstListStore);

    addListStoreListener(listStoreArray[0]);
    expect(listStoreArray[0].instance.listenerCount('dataList:change')).toEqual(1)
    removeListStoreListener(listStoreArray[0]);
    expect(listStoreArray[0].instance.listenerCount('dataList:change')).toEqual(0)
});

test("List : Listeners callback called ", done => {
    // Initialisation du Store-1
    let firstListStore = new ListStore({
        identifier: 'firstListStore'
    });
    updateListStore("firstListStore", fakeList1 );
    
    let listStoreArray = buildListStore(firstListStore);

    // On crée un faux contexte (react-like).
    let fakeContext={
        setState:(data)=>{
            // On surcharge le setState, le test se conclue si la callback est appellée            
            expect(data.storeArray[0].hasChanged).toBeTruthy;       
            expect(data.storeArray[0].value).toEqual(fakeList2);                 
            done();
        },
        state:{
            storeArray:listStoreArray
        }
    }
    // On rebuild les stores en fournissant le faux contexte ( les callbacks sont contextualisées )
    listStoreArray = buildListStore.call(fakeContext,firstListStore);
    // on ajoute le listner
    addListStoreListener(listStoreArray[0]);
    // On emet un event..
    updateListStore("firstListStore", fakeList2 );
    // Le setState surchargé fait office de verification ici.
});