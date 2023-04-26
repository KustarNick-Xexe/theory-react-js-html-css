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
