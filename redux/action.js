//action - воздействие (действие) явлется объектом
//хранит в себе type - название воздействия
//и payload - полезные данные, данные для обновления состояния

//type - строка, payload - любой тип данных
const action = { type: 'КАКОЕ_ВОЗДЕЙСТВИЕ', payload: { id, text }}

//action нужен чтобы вызвать конкретный редуктор и передать ему 
//нужные аргументы(payload). Редуктор обрабатывает каждое воздействие 
//и возвращает новое состояние хранилища.

//два способа создания типов action
const ACTION_TYPE = {
    SET_ITEM: 'SET_ITEM',
};

const GET_ITEM = 'GET_ITEM';
  
//actionCreator - функция, которая создает экземляр конркетного тип 
//action и в качестве аргумента принимает данные для payload
const setItem = (info) => ({
    type: ACTION_TYPE.SET_ITEM,
    payload: info
});

const getItem = (info) => ({
    type: GET_ITEM,
    payload: info
});

//как связан с редуктором?
//редуктор обрабатывает конкретный участок store (если их несколько)
//редуктор принимает action, чтобы понять какое воздействие надо
//применить

//как передать данные в action
//передать через payload при вызове actionCreator

//отправить данные для обработки в редукторы
//dispatch - это рассылка, отправляет каждому редуктору action
//и только конкретный сможет его обработать (из-за типа)
const dispatch = useDispatch();
dispatch(action);

//как связать с actionCreator?
dispatch(setItem('значения'))

//как actionCreator может получить актульные данные из store
const updateItem = (info) => (dispatch, getState) => {
    const { state } = getState(); //нужный кусок
    //какая-то обработка
    dispatch({
        type: 'UPDATE_ITEM',
        payload: {
            info,
        },
    });
};

//достаем нужный кусок состояния внутри компонента
const { someData } = useSelector( state => state.someData)

//какие способы отслеживания действий доступны в Redux?
//Логгирование и Redux DevTools

//как управлять действиями с помощью маршрутизации (routing)?
//необходимо создать специальный редуктор

// Middleware для обработки действия
const urlMiddleware = store => next => action => {
    if (action.type === 'CHANGE_URL') {
      const url = action.payload.url;
      // Вызываем нужные действия, связанные с URL
      if (url === '/about') {
        store.dispatch(fetchAboutData());
      } else if (url === '/contact') {
        store.dispatch(fetchContactData());
      }
    }
    return next(action);
};

//можно ли отменить или повторить действие в Redux?
//для этого необходимо реализовать паттерн Command 
//можно использовать библиотеку Redux Undo

//может ли действие запускать другие действия?
//да - это action chaining. Может быть полезно, 
//если несколько действий зависят друг от друга
//Например, одно действие может загружать данные из API, 
//а затем запускать другое действие для сохранения этих 
//данных в хранилище. Для реализации цепочки действий используется 
//middleware, такой как redux-thunk, который позволяет действиям 
//возвращать функции вместо объектов действий
//Эти функции могут содержать логику, которая запускает другие действия

// Загрузка данных из API и сохранение их в хранилище
export const loadData = () => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_DATA' });
      return fetch('https://api.example.com/data')
        .then(response => response.json())
        .then(data => {
          dispatch({ type: 'DATA_LOADED', payload: data });
          dispatch({ type: 'DISPLAY_DATA' });
        })
        .catch(error => {
          dispatch({ type: 'ERROR', payload: error });
        });
    };
};
  

