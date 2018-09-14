/**
 * Author：tantingting
 * Time：2017/8/24
 * Description：Description
 */
import { testUser } from '../constants/index'

const testUserData = (state = {query: {}, list: []}, action) => {
    switch (action.type) {
        case testUser.ADD_DATA:
            return { ...state, ...action.data }
        case testUser.ADD_QUERY:
            let _query = state.query
            return { ...state, 'query': {..._query, ...action.data} }
        case testUser.GET_LIST:
            // console.log(action)
            return { ...state, 'list': action.actionData }
        case testUser.EDIT_LIST:
            let _list = state.list
            let _item = _list[action.index]
            _item = {..._item, ...action.data}
            _list[action.index] = _item
            return { ...state, 'list': _list }
        case testUser.DEL_DATA:
            let dlist = state.list
            dlist = [
                ...dlist.slice(0, action.index),
                ...dlist.slice(action.index + 1)
            ]
            return { ...state, 'list': dlist }
        default:
            return state
    }
}

export default testUserData
