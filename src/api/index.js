import * as user from './modules/user'
import * as login from './modules/login'
import * as admin from './modules/admin'
import * as product from './modules/product'
import * as category from './modules/category'
import * as indexPage from './modules/indexPage'
import * as retail from './modules/retail'
import * as returnOrder from './modules/return'
import * as updatePwd from './modules/updatepwd'
import * as recommend from './modules/recommend'

export const api = {recommend, updatePwd, returnOrder,user, login, admin, product, category, indexPage, retail}