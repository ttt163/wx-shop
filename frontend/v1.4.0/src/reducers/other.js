/**
 * Author：zhoushuanglong
 * Time：2017/8/16
 * Description：Description
 */
import { ADD_ALERT_DATA, ADD_OTHER_DATA } from '../constants/index'
const other = (state = {'alert': {'callBack': null}, 'title': '微信商城', 'isSendGameId': false, 'LoadingShow': true}, action) => {
    switch (action.type) {
        case ADD_ALERT_DATA:
            let _alert = state.alert
            return {...state, 'alert': {..._alert, ...action.data}}
        case ADD_OTHER_DATA:
            return {...state, ...action.data}
        default:
            return state
    }
}

export default other
