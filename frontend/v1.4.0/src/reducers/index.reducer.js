/**
 * Author：zhoushuanglong
 * Time：2017/8/16
 * Description：Description
 */
import { Index } from '../constants/index'
/* const indexInfo = (state = {'isShowUser': false}, action) => {
    switch (action.type) {
        case Index.ADD_DATA:
            var _data = action.data
            return {...state, ..._data}
        default:
            return state
    }
} */
function indexInfo (state = {'isShowUser': false, 'tapData': [], 'listData': [], 'serverData': [], 'roleData': [], 'carpicList': []}, action) {
    switch (action.type) {
        case Index.ADD_DATA:
            return {...state, ...action.data}
        case Index.TAP_DATA:
            return {...state, 'tapData': action.actionData}
        case Index.LIST_DATA:
            return {...state, 'listData': action.actionData}
        default:
            return state
    }
}
export default indexInfo
