import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { AdacaAPI } from './apiServiceReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    [AdacaAPI.reducerPath]: AdacaAPI.reducer,
    user: userReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [AdacaAPI.reducerPath, 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat(AdacaAPI.middleware),
});

const persistor = persistStore(store);

export { store, persistor };
