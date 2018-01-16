/**
 * Author：zhoushuanglong
 * Time：2017/8/18
 * Description：goods list
 */
import {
    // GOODSDEL,
    // GOODSDWON,
    SELECTGOOD
    // GOODSSEARCH
} from '../constants/index'

const selectGood = (state = {}, action) => {
    switch (action.type) {
        case SELECTGOOD:
            return action.selectData

        default:
            return state
    }
}

export default selectGood
