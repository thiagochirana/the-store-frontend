import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';

const persistConfig = {
  key: 'root',
  storage,
  // Se quiser persistir apenas alguns reducers específicos:
  // whitelist: ['counter'] // só vai persistir o counter
  // blacklist: ['auth'] // vai persistir tudo exceto auth
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCounterReducer = persistReducer(persistConfig, counterReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    counter: persistedCounterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);