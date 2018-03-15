/**
 * Author：zhoushuanglong
 * Time：2017/8/15
 * Description：breadcrumb
 */

import { BREADCRUMB } from '../constants/index'

const breadcrumbArr = (state = [], action) => {
    switch (action.type) {
        case BREADCRUMB:
            return action.arr
        default:
            return state
    }
}

export default breadcrumbArr
