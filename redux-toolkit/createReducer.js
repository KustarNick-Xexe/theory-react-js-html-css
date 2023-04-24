//в createReducer в builder.addCase если мы меняем состояние напрямую,
//то ничего менять не нужно, иначе нужен return. Это допустим когда
//используем методы массива, возвращающие новый массив
const todosReducer = createReducer([], (builder) => {
    builder
        .addCase('ADD_TODO', (state, action) => {
            // "мутируем" массив, вызывая push()
            state.push(action.payload);
        })
        .addCase('TOGGLE_TODO', (state, action) => {
            const todo = state[action.payload.index];
            // "мутируем" объект, перезаписывая его поле `completed`
            todo.completed = !todo.completed;
        })
        .addCase('REMOVE_TODO', (state, action) => {
            // мы по-прежнему можем использовать иммутабельную логику 
            //обновления состояния
            return state.filter(
            (todo, i) => i !== action.payload.index
            );
        });
});

//обработать неизвестные экшены можно так
builder.addDefaultCase((state, action) => {
      console.log('Unknown action', action);
    });

//упрощаем 
//case 'UPDATE_VALUE':
return {
    ...state,
    first: {
      ...state.first,
      second: {
        ...state.first.second,
        [action.someId]: {
          ...state.first.second[action.someId],
          fourth: action.someValue
        }
      }
    }
}
//до

const updateValue = (state, action) => {
    const { someId, someValue } = action.payload
    state.first.second[someId].fourth = someValue
}
