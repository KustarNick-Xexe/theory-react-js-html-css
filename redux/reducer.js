//reducer - это функции, которые принимают текущее состояние (state) 
//и действие (action) и возвращают новое состояние

//принципы в основе reducer
//неизменяемость - меняем state не напрямую, а возвращая новый
//однородность - должен всегда возвращать новый объект 
//чистота - не должен взаимодействовать с внешними источниками данных
//и должны возвращать новый объект состояния на основе своих входных параметров

//создание
const counterReducer = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1 //action.payload
      case 'DECREMENT':
        return state - 1 //action.payload
      default:
        return state
    }
}

//при работе со списком и дополнительной логикой
switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.payload.id,
          text: action.payload.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
        return state.map(todo =>
            todo.id === action.payload.id
                ? { ...todo, completed: !todo.completed }
                : todo
        )
    default:
        return state
}

//состояние по умолчанию
const initialState = {};
const someReducer = (state = initialState, action) => { };

//объединение нескольких
const rootReducer = combineReducers({
    reducer: reducer,
    anotherReducer: anotherReducer
});