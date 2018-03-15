/**
 * Author：tantingting
 * Time：2017/8/25
 * Description：Description
 */
import { Order } from '../constants/index'

const order = (state = {query: {}, list: [], type: 'all', orderInfo: {}}, action) => {
    switch (action.type) {
        case Order.ADD_DATA:
            return { ...state, ...action.data }
        case Order.ADD_QUERY:
            let _query = state.query
            return { ...state, 'query': {..._query, ...action.data} }
        case Order.GET_LIST:
            return { ...state, 'list': action.actionData }
        default:
            return state
    }
}

export default order
