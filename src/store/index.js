import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
// 导入持久化redux需要的工具函数
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
// 导入所有的slice对应的reducer和actions
import dashboardReducer, * as dashboardActions  from './slices/dashboard'
import loginReducer, * as loginActions from './slices/login'
import adminReducer, * as adminActions from './slices/admin'
import productReducer, * as productActions from './slices/product'
import categoryReducer, * as categoryActions from './slices/category'
import indexPageReducer, * as indexPageActions from './slices/indexPage'
import retailReducer, * as retailActions from './slices/retail'
import returnReducer, * as returnActions from './slices/returnOrder'
import updateReducer, * as updateActions from './slices/updatepwd'
import recommendReducer, * as recommendActions from './slices/recommend'

const persistConfig = { key: 'root', storage }
const reducer = combineReducers({
    dashboard: dashboardReducer,
    login: loginReducer,
    admin: adminReducer,
    product: productReducer,
    category: categoryReducer,
    indexPage: indexPageReducer,
    retail: retailReducer,
    returns: returnReducer,
    updatepwd: updateReducer,
    recommend: recommendReducer
})
const persistedReducer = persistReducer(persistConfig, reducer)
export const store = configureStore({
    devTools: true,
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
})
export const persistor = persistStore(store)
export {recommendActions, updateActions, retailActions,returnActions, dashboardActions, loginActions, indexPageActions, adminActions, productActions,categoryActions };