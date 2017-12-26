/**
 * Author：tantingting
 * Time：2017/12/8
 * Description：Description
 */
import { ajaxGet } from '../public/index'
import { Redeem } from '../constants/index'
/*
* 获取兑换码数据
* */
export const getRedeembData = (sendData) => {
    return (dispatch) => {
        ajaxGet('/api_codelist', !sendData ? {} : sendData, function (data) {
            // console.log(data)
            if (data.code === 200) {
                let actionData = data.data
                dispatch(addRedeemList(actionData))
            }
        })
    }
}

export const addRedeemData = (data) => {
    return {type: Redeem.ADD_DATA, data}
}
export const addRedeemList = (data) => {
    return {type: Redeem.LIST_DATA, data}
}
