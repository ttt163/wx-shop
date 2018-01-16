/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：index actions
 */
import { ADD_ALERT_DATA, ADD_OTHER_DATA } from '../constants/index'

export const showAlert = (sendData) => {
    return (dispatch) => {
        dispatch(addAlertData(sendData))
        /* setTimeout(() => {
            dispatch(addAlertData({'isShow': false}))
        }, !sendData.time ? 1000 : sendData.time) */
    }
}
export const addAlertData = (data) => {
    return {type: ADD_ALERT_DATA, data}
}
export const addOtherData = (data) => {
    return {type: ADD_OTHER_DATA, data}
}
