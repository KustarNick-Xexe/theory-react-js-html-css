//store - это объект, который хранит состояние всего приложения
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

//функции доступные для работы с store
dispatch(action) //отправляет action в store для обновления состояния
getState() //возвращает текущее состояние приложения из store.
subscribe(listener) //добавляет функцию-подписчик, которая 
//будет вызвана при каждом обновлении состояния приложения.
replaceReducer(nextReducer) //заменяет текущий reducer в store на другой.

//как сбросить состояние в store
//можно сбросить, отправив action с типом "RESET_STATE" 
//или другим типом, который описывает сброс состояния

function resetReducer(state, action) {
    switch (action.type) {
      case 'RESET_STATE':
        return initialState;
      default:
        return state;
    }
}