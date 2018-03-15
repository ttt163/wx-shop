/**
 * Author：tantingting
 * Time：2018/3/1
 * Description：Description
 */
import {
    Permission
} from '../constants/index'

const permissionData = (state = {'depList': [], 'depObj': null}, action) => {
    switch (action.type) {
        case Permission.ADD_DEP_DATA:
            return {...state, 'depList': action.data}
        case Permission.ADD_DEP_OBJ:
            return {...state, 'depObj': action.depObj}

        default:
            return state
    }
}

export default permissionData
