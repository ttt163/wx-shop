/**
 * Author：tantingting
 * Time：2017/12/8
 * Description：Description
 */

import { Redeem } from '../constants/index'
const redeemData = (state = {list: []}, action) => {
    switch (action.type) {
        case Redeem.ADD_DATA:
            return {...state, ...action.data}
        case Redeem.LIST_DATA:
            return { ...state, 'list': action.data }
        default:
            return state
    }
}

export default redeemData
