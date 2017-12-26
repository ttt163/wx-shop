/**
 * Author：tantingting
 * Time：2017/8/25
 * Description：Description
 */
// import { axiosAjax } from '../public/index'

import {Other} from '../constants/index'

export const addOtherData = (data) => {
    return {type: Other.ADD_DATA, data}
}
export const addGameData = (data) => {
    return {type: Other.ADD_GAME_DATA, data}
}
export const addSpinData = (data) => {
    return {type: Other.ADD_SPIN_DATA, data}
}
