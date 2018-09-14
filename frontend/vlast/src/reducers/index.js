/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：root reducer
 */

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import other from './other'
import login from './login.reducer'
import indexInfo from './index.reducer'
import detailInfo from './detail.reducer'
import order from './order.reducer'
import redeemData from './redeem.reducer'

const reducers = Object.assign({
    other,
    indexInfo,
    login,
    detailInfo,
    order,
    redeemData,
    routing: routerReducer
})

const rootReducer = combineReducers(reducers)
export default rootReducer
