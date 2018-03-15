/**
 * Author：tantingting
 * Time：2017/8/24
 * Description：Description
 */
import { Column } from '../constants/index'

const column = (state = {query: {}, list: [], type: 'add'}, action) => {
    switch (action.type) {
        case Column.ADD_DATA:
            return { ...state, ...action.data }
        case Column.ADD_QUERY:
            let _query = state.query
            return { ...state, 'query': {..._query, ...action.data} }
        case Column.GET_LIST:
            return { ...state, 'list': action.actionData }
        case Column.EDIT_LIST:
            let _list = state.list
            let _item = _list[action.index]
            _item = {..._item, ...action.data}
            _list[action.index] = _item
            return { ...state, 'list': _list }
        case Column.DEL_DATA:
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

export default column
