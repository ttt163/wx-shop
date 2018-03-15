/**
 * Author：tantingting
 * Time：2017/12/27
 * Description：Description
 */
import { Goods } from '../constants/index'

const goodsData = (state = {list: [], onSale: [], offSale: []}, action) => {
    switch (action.type) {
        case Goods.ADD_DATA:
            return { ...state, ...action.data }
        case Goods.GET_LIST:
            return { ...state, 'list': action.data }
        case Goods.EDIT_LIST:
            let _list = state.list
            let _status = action.status
            console.log(_status)
            if (parseInt(_status) === 1) {
                _list = state.onSale
            } else if (parseInt(_status) === 2) {
                _list = state.offSale
            }
            let _item = _list[action.index]
            _list = [
                ..._list.slice(0, action.index),
                {..._item, ...action.data},
                ..._list.slice(action.index + 1)
            ]
            if (parseInt(_status) === 1) {
                return { ...state, 'onSale': _list }
            } else if (parseInt(_status) === 2) {
                return { ...state, 'offSale': _list }
            }
            return { ...state, 'list': _list }
        default:
            return state
    }
}

export default goodsData
