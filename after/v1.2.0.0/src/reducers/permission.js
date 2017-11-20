/**
 * Author：zhoushuanglong
 * Time：2017/8/18
 * Description：goods list
 */
import {
    PERMISSION_LIST
} from '../constants/index'

const permissionList = (state = [], action) => {
    switch (action.type) {
        case PERMISSION_LIST:
            let permissionList = []
            action.permissionList.map((d, i) => {
                permissionList.push(Object.assign({}, {key: i}, d))
            })
            return permissionList

        default:
            return state
    }
}

export default permissionList
