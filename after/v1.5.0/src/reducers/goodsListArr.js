/**
 * Author：zhoushuanglong
 * Time：2017/8/18
 * Description：goods list
 */

import {
    // GOODSDEL,
    // GOODSDWON,
    GOODSLIST
    // GOODSSEARCH
} from '../constants/index'

const goodsListArr = (state = [], action) => {
    switch (action.type) {
        case GOODSLIST:
            let goodsList = []
            action.goodsData.map((d, i) => {
                goodsList.push(Object.assign({}, {key: i}, d))
            })
            return goodsList
        default:
            return state
    }
}

export default goodsListArr
