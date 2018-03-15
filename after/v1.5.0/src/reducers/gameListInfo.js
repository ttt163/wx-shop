/**
 * Author：zhoushuanglong
 * Time：2017/8/10
 * Description：game list reducer
 */

import { GAMELIST } from '../constants/index'

const gameListInfo = (state = [], action) => {
    switch (action.type) {
        case GAMELIST:
            return action.actionData
        default:
            return state
    }
}

export default gameListInfo
