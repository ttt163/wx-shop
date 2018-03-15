/**
 * Author：zhoushuanglong
 * Time：2017/7/26
 * Description：enter
 */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import $ from 'jquery'
import {URL, fomartToNavKey, axiosAjax} from '../../public/index'

import './index.scss'
import menuData from '../../public/menuData'
import { gameList, navigation, breadcrumb } from '../../actions/index'

class Enter extends Component {
    componentDidMount () {
        this.props.actions.gameList()
    }

    goGoodsListPage = (gameId, gameName, gameIcon) => {
        const {navData} = this.props
        $.cookie('gameId', gameId)
        $.cookie('gameName', gameName)
        $.cookie('gameIcon', gameIcon)
        axiosAjax('get', '/record_cookie', {'lk_game_id': gameId}, (res) => {
            if (res.code === 200) {
                if (parseInt($.cookie('role')) !== 1) {
                    let navKeyArr = navData[gameId]
                    let navArr = fomartToNavKey(navKeyArr)
                    // let navArr = ['goods-list', 'config', 'config-game', 'config-recommend', 'config-column', 'order', 'config-testUser', 'order', 'data', 'redeem']
                    $.cookie('shopNav', navArr.join(','))
                    if (navArr.join(',').indexOf(navArr[0]) === -1) {
                        hashHistory.push(`/${navArr[0]}`)
                    } else {
                        hashHistory.push(`/${navArr[1]}`)
                    }
                } else {
                    hashHistory.push('/goods-list')
                }
            }
        })
    }

    render () {
        const This = this
        return <div className="game-wrap"><div>{this.props.gameListInfo.map(function (d, i) {
            return <a
                className="game-item"
                key={d.lk_game_id}
                onClick={() => {
                    This.goGoodsListPage(d.lk_game_id, d.lk_game_name, d.lk_game_file)
                    This.props.actions.breadcrumb([menuData[0].text, !menuData[0].children ? menuData[0].text : menuData[0].children[0].text])
                    This.props.actions.navigation(!menuData[0].children ? menuData[0].key : menuData[0].children[0].key, !menuData[0].children ? '' : menuData[0].key)
                } }><div className="mask"></div><img src={`${URL}${d.lk_game_file}`}/><span>{d.lk_game_name}</span></a>
        })}</div></div>
    }
}

const mapStateToProps = (state) => {
    return {
        gameListInfo: state.gameListInfo,
        navData: state.other.navArr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({gameList, navigation, breadcrumb}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Enter)
