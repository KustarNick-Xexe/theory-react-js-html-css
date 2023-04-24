//createSlice - функция, которая объединяет сразу
//action type, action creator, reducer

//создание
const someSlice = createSlice({
    name: '@@someSliceTag',
    initialStae: {},
    reducer: {
        setItem: (state, action) => { /* логика */ },
        getItem: (state, action) => { /* логика */ },
    }
}); //в этом случаи action будет без payload
//setItem - это action creator
//(state, action) => { /* логика */ } его редуктор
//action type сгенерируется сам по name и setItem

//чтобы был payload нужен prepare
const data = { updateItem: { 
    reducer: (state, action) => {},
    prepare: (value) => ({
        payload: {
            someField: value,
            anotherField: null,
        }
    })
    
}}

export const { setItem, getItem } = someSlice.actions;
export const store = createStore(someSlice.reducer);
