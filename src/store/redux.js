import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productslice from './products/productSlice';
import userSlice from './user/userSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer, persistStore, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';


const commonConfig = {
  storage
};

const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token', 'current', 'currentCart'],
  key: 'shop/user',
};

const productConfig = {
  ...commonConfig,
  whitelist: ['DealDaily'],
  key: 'shop/deal',

};

export const store = configureStore({
  reducer: {
    app: appSlice,
    products: persistReducer(productConfig, productslice),
    user: persistReducer(userConfig, userSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE,],
      },
    }),
});

export const persistor = persistStore(store);
