//redux persist - сохраняет и загружает данные из
//хранилища браузера или файловой системы

//типы хранилищ:
//локальное хранилище браузера (localStorage), 
//сессионное хранилище браузера (sessionStorage), 
//индексированное хранилище (IndexedDB), 
//файловую систему (Filesystem API)

import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//настроить конфигурацию хранилища
const persistConfig = {
  key: 'root', //ключ, под которым будет сохранено состояние
  storage, //тип хранилища
  whitelist: ['auth'],
  blacklist: ['loading'],
  serialize: (data) => JSON.stringify(data),
  deserialize: (data) => JSON.parse(data),
};

const store = createStore(rootReducer); // store
// через него сохраняем и выгружаем
const persistor = persistStore(store, persistConfig);


//whitelist - какие ключи должны быть сохранены
//blacklist - какие ключи не должны быть сохранены
//пример
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['token', 'username'] //они в редукторе
};

const loadingPersistConfig = {
  key: 'loading',
  storage: storage,
  blacklist: ['isLoading'] //он в редукторе
};

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

const loadingReducer = (state = { isLoading: false }, action) => {
  switch (action.type) {
    case 'LOADING_START':
      return {
        ...state,
        isLoading: true
      };
    case 'LOADING_END':
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedLoadingReducer = persistReducer(loadingPersistConfig, loadingReducer);

export default combineReducers({
  auth: persistedAuthReducer,
  loading: persistedLoadingReducer
});

//redux persist поддерживает возможность создания собственного хранилища
//с помощью интерфейса, описывающего методы getItem, setItem, removeItem 
//и getAllKeys. Это позволяет использовать любое хранилище, которое соответствует
//этому интерфейсу, например, IndexedDB или Firebase Realtime Database.
import { persistStore } from 'redux-persist';
import { openDB } from 'idb';

const myStorage = {
  async getItem(key) {
    const db = await openDB('myDatabase', 1);
    return db.get('myStore', key);
  },

  async setItem(key, value) {
    const db = await openDB('myDatabase', 1);
    return db.put('myStore', value, key);
  },

  async removeItem(key) {
    const db = await openDB('myDatabase', 1);
    return db.delete('myStore', key);
  },

  async getAllKeys() {
    const db = await openDB('myDatabase', 1);
    return db.getAllKeys('myStore');
  }
};

const persistConfig2 = {
  key: 'root',
  storage: myStorage,
};

const store2 = createStore(rootReducer);
const persistor2 = persistStore(store, persistConfig);
