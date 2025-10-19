import { configureStore,combineReducers} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage/session';
import { persistReducer,persistStore} from 'redux-persist';
// import persistStore from 'redux-persist/es/persistStore';
import authReducer from "../features/auth/authSlice";
import brandReducer from '../features/brand/brandSlice';
import supplierReducer from '../features/supplier/supplierSlice';
import orderReducer from '../features/order/orderSlice';



const rootReducer=combineReducers({
  auth:authReducer,
  brand: brandReducer,
  supplier: supplierReducer,
  order: orderReducer
})

const persistConfig={
  key:"root",
  storage,
  version:1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({serializableCheck:false})

})
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch