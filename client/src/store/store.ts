import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { serverAPI } from './api/api';
import globalReducer from './reducers/GlobalSlice';
import userReducer from './reducers/UserSlice';

const rootReducer = combineReducers({
    globalReducer,
    userReducer,
    [serverAPI.reducerPath]: serverAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serverAPI.middleware),
    });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
