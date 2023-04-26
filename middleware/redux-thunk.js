//middleware - посредник между началом воздействия и
//редуктором. Redux Thunk - для асинхронных операций

//пример
const fetchData = (url) => { //эти аргументы для payload
    return async (dispatch, getState) => { //второй аргумент часто опускают
        try {
            const response = await fetch(url);
            const data = await response.json();
            //ниже можно использовать actionCreator
            dispatch({ type: "FETCH_DATA_SUCCESS", payload: data });
        } catch (error) {
            dispatch({ type: "FETCH_DATA_ERROR", payload: error.message });
        }
    };
};

//Подключаем к стору. Теперь штука сверху будет работать
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export const store = createStore(rootReducer, applyMiddleware(thunk) );
//или middleware: [thunk]

//несколько асинхронных операций - Promise.all
//этот метод принимает массив промисов и возвращает новый промис
//который разрешается, когда все промисы в массиве разрешаются
const [data1, data2] = await Promise.all([
    fetch("https://api.example.com/data1").then((res) => res.json()),
    fetch("https://api.example.com/data2").then((res) => res.json()),
  ]);
dispatch({ type: "FETCH_DATA_SUCCESS", payload: { data1, data2 } });


//c axios
const response = await axios.get(`https://api.example.com/data/${id}`);
const data = response.data;
dispatch({ type: "FETCH_DATA_SUCCESS", payload: data });

//задержка при единоразовой отправке
setTimeout(() => {
    dispatch(someAction());
}, 5000);

//задержка при отправки через каждыйе n миллисекунды
setInterval(() => {
    dispatch(someAction());
}, 2000);

//отмена операций - AbortController
const someThunk = () => async (dispatch, getState) => {
    const { cancelToken } = getState().someReducer;
    if (cancelToken) {
        cancelToken.abort();
    }

    const controller = new AbortController();
    dispatch(setCancelToken(controller));
    try {
        const response = await fetch(url, {
            signal: controller.signal,
        });
        const data = await response.json();
        dispatch(setData(data));
    } catch (error) {
    if (error.name === 'AbortError') {
        console.log('Request aborted');
    } else {
        console.error(error);
    }
    }
};
  
