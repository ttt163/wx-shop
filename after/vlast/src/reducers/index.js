/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：root reducer
 */

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import loginInfo from './loginInfo'
import gameListInfo from './gameListInfo'
import navigationArr from './navigationArr'
import breadcrumbArr from './breadcrumbArr'
import goodsListArr from './goodsListArr'
import columnListArr from './columnListArr'
import column from './column.reducers'
import recommend from './recommend.reducers'
import order from './order.reducers'
import other from './other.reducers.js'
import selectGood from './selectGoodGet'
import permissionList from './permission'
import testUserData from './testUser.reducers'
import goodsData from './goods.reducers'
import permissionData from './permission.reducers'
const reducers = Object.assign({
    loginInfo,
    gameListInfo,
    navigationArr,
    breadcrumbArr,
    goodsListArr,
    columnListArr,
    column,
    recommend,
    order,
    selectGood,
    other,
    permissionList,
    testUserData,
    goodsData,
    permissionData,
    routing: routerReducer
})

const rootReducer = combineReducers(reducers)
export default rootReducer
