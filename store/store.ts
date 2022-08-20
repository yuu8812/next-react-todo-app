import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { counterSlice } from '../features/counter/counterSlice';
import { todoSlice } from '../features/submitter/submitTodoSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  counter: counterSlice.reducer,
  submitTodo: todoSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
