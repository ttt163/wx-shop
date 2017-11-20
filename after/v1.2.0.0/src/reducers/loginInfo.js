/**
 * Author：zhoushuanglong
 * Time：2017/7/31
 * Description：login info
 */

import { LOGIN } from '../constants/index'

const loginInfo = (state = {email: '', password: ''}, action) => {
    switch (action.type) {
        case LOGIN:
            return action.actionData
        default:
            return state
    }
}

export default loginInfo
