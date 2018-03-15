/**
 * Author：zhoushuanglong
 * Time：2017/8/21
 * Description：column list
 */

import { axiosAjax } from '../public/index'

import {
    COLUMNLIST
} from '../constants/index'

export const columnListGet = () => {
    return (dispatch) => {
        axiosAjax('GET', '/api_column_list', {}, function (data) {
            const columnData = data.data === '' ? [] : data.data
            dispatch({
                type: COLUMNLIST,
                columnData
            })
        })
    }
}
