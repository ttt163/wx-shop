/**
 * Author：zhoushuanglong
 * Time：2017/8/15
 * Description：navigation
 */

import { NAVIGATION } from '../constants/index'

const navigationArr = (state = ['', ''], action) => {
    switch (action.type) {
        case NAVIGATION:
            return [action.selectkey, action.openkey]
        default:
            return state
    }
}

export default navigationArr
