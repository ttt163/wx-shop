/**
 * Author：tantingting
 * Time：2017/8/23
 * Description：Description
 */
import { Detail } from '../constants/index'
function detailInfo (state = {'query': {'num': 1}, 'serverData': [], 'roleData': [], 'info': {}}, action) {
    switch (action.type) {
        case Detail.ADD_DATA:
            return {...state, ...action.data}
        case Detail.ADD_QUERY:
            let _query = state.query
            return {...state, 'query': {..._query, ...action.data}}
        case Detail.ADD_INFO:
            let info = state.info
            return {...state, 'info': {...info, ...action.data}}
        case Detail.WEB_SERVER_DATA:
            return {...state, 'serverData': action.actionData}
        case Detail.WEB_ROLE_DATA:
            return {...state, 'roleData': action.actionData}
        default:
            return state
    }
}
export default detailInfo
