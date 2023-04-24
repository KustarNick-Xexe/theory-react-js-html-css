//cоздание базового store
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer
});

//включение devtools
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store2 = configureStore({
  reducer: rootReducer,
  devTools: true
});

//добавление middleware
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import loggerMiddleware from './middleware/logger';

const store3 = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), loggerMiddleware]
});

//использование slice
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';

const store4 = configureStore({
  reducer: {
    counter: counterReducer,
  },
});