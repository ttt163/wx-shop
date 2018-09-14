/**
 * Author：tantingting
 * Time：2017/8/25
 * Description：Description
 */
import { Other } from '../constants/index'

const other = (state = {'navArr': null, 'game': {}, 'spinInfo': {'isShow': false, 'text': '正在加载中'}}, action) => {
    switch (action.type) {
        case Other.ADD_DATA:
            return { ...state, ...action.data }
        case Other.ADD_GAME_DATA:
            let _game = state.game
            return { ...state, game: {..._game, ...action.data} }
        case Other.ADD_SPIN_DATA:
            let spinInfo = state.spinInfo
            return { ...state, spinInfo: {...spinInfo, ...action.data} }
        case Other.ADD_NAVARR_DATA:
            return { ...state, navArr: action.data }
        default:
            return state
    }
}

export default other
