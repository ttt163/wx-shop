/**
 * Author：zhoushuanglong
 * Time：2017/8/21
 * Description：column list
 */

import {
    COLUMNLIST
} from '../constants/index'

const columnListArr = (state = [], action) => {
    switch (action.type) {
        case COLUMNLIST:
            let columnList = []
            action.columnData.map((d, i) => {
                columnList.push(Object.assign({}, {key: i}, d))
            })
            return columnList
        default:
            return state
    }
}

export default columnListArr
