/**
 * Author：tantingting
 * Time：2017/8/25
 * Description：Description
 */
import { Order } from '../constants/index'
function order (state = {'list': []}, action) {
    switch (action.type) {
        case Order.ADD_DATA:
            return {...state, ...action.data}
        case Order.LIST_DATA:
            return {...state, 'list': action.data}
        default:
            return state
    }
}
export default order
