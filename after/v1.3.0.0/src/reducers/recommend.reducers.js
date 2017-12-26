/**
 * Author：tantingting
 * Time：2017/8/24
 * Description：Description
 */
import { Recommend } from '../constants/index'

const recommend = (state = {query: {}, list: [], type: 'add', goodsList: []}, action) => {
    switch (action.type) {
        case Recommend.ADD_DATA:
            return { ...state, ...action.data }
        case Recommend.ADD_QUERY:
            let _query = state.query
            return { ...state, 'query': {..._query, ...action.data} }
        case Recommend.GET_LIST:
            return { ...state, 'list': action.actionData }
        case Recommend.EDIT_LIST:
            let _list = state.list
            let _item = _list[action.index]
            _item = {..._item, ...action.data}
            _list[action.index] = _item
            return { ...state, 'list': _list }
        case Recommend.DEL_DATA:
            let dlist = state.list
            dlist = [
                ...dlist.slice(0, action.index),
                ...dlist.slice(action.index + 1)
            ]
            return { ...state, 'list': dlist }
        case Recommend.GET_GOODS_LIST:
            return { ...state, 'goodsList': action.actionData }
        default:
            return state
    }
}

export default recommend
