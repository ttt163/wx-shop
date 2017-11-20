/**
 * Author：zhoushuanglong
 * Time：2017/8/16
 * Description：Description
 */
import { Login } from '../constants/index'
const login = (state = {'query': {'passportName': '', 'password': ''}, 'info': {'isLogin': false}, 'isShowLogin': false}, action) => {
    switch (action.type) {
        case Login.LOGIN:
            let _info = state.info
            return {...state, 'info': {..._info, ...action.actionData}}
        case Login.ADD_QUERY:
            let loginQuery = state.query
            return { ...state, 'query': {...loginQuery, ...action.query} }
        case Login.SHOW_LOGIN:
            return { ...state, 'isShowLogin': action.bool }
        default:
            return state
    }
}

export default login
