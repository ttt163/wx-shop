/**
 * Author：tantingting
 * Time：2018/3/1
 * Description：Description
 */
import React, {Component} from 'react'
import {Modal, Checkbox} from 'antd'
import {connect} from 'react-redux'
import {NavIdConfig, NavKey} from '../../public/config'
import {permissionConfig} from '../../actions/permission'

class UserConfig extends Component {
    constructor (props) {
        super(props)
        this.state = {
            currGame: null, // 当前项目 {'gameId': 174, 'gameName': '芈月'}
            choseGame: null, // 选择游戏项目{'174': '芈月'}
            navData: null // 选择功能项 {174: ['3','4']}
        }
    }

    componentWillReceiveProps (props) {
        if (!this.state.currGame && props.gameList.length > 0) {
            this.setState({
                currGame: {
                    gameId: props.gameList[0].lk_game_id,
                    gameName: props.gameList[0].lk_game_name
                }
            })
        }
        // 编辑下，默认数据
        if (!(!props.data || !props.data.email)) {
            let _data = props.data
            let choseGame = null
            let navData = null
            if (!_data.lk_game_id) {
                choseGame = null
                navData = null
                this.setState({
                    choseGame: choseGame,
                    navData: navData
                })
            } else {
                let gameIds = _data.lk_game_id.split(',')
                let gameNames = _data.game.split(',')
                gameIds.map((item, index) => {
                    choseGame = {
                        ...choseGame,
                        [item]: gameNames[index]
                    }
                    navData = !_data.power_id ? {...navData, [item]: Object.keys(NavIdConfig)} : JSON.parse(_data.power_id)
                    // navData = !_data.power_id ? {...navData, [item]: Object.keys(NavIdConfig)} : null
                })
                this.setState({
                    choseGame: choseGame,
                    navData: navData
                })
            }
        } else {
            this.setState({
                choseGame: null,
                navData: null
            })
        }
    }

    // 切换游戏项目
    changeGame (item) {
        this.setState({
            currGame: {
                gameId: item.lk_game_id,
                gameName: item.lk_game_name
            }
        })
    }

    // 选择选中游戏项目
    checkGame (e, item) {
        let chk = e.target.checked
        let choseGame = Object.assign({}, this.state.choseGame)
        let navData = Object.assign({}, this.state.navData)
        if (!chk) {
            // 取消
            delete choseGame[item.lk_game_id]
            // 全取消功能列表
            delete navData[item.lk_game_id]
        } else {
            // 选中
            choseGame = {
                ...choseGame,
                [item.lk_game_id]: item.lk_game_name
            }
            navData = {
                ...navData,
                [item.lk_game_id]: Object.keys(NavIdConfig)
            }
            // 全选功能列表
        }
        this.setState({
            'choseGame': choseGame,
            'navData': navData
        })
    }

    // 选择功能列表
    checkNav (e, item) {
        let choseGame = Object.assign({}, this.state.choseGame)
        let navData = Object.assign({}, this.state.navData)
        let currGame = Object.assign({}, this.state.currGame)
        let currNav = !navData[currGame.gameId] ? [] : navData[currGame.gameId]
        if (!navData || !currNav || !currNav.length) {
            // 未选择游戏
            choseGame = {
                ...choseGame,
                [currGame.gameId]: currGame.gameName
            }
            currNav.push(item)
        } else {
            let index = currNav.indexOf(item)
            let chk = e.target.checked
            if (chk) {
                // 选中
                currNav.push(item)
            } else {
                // 取消
                currNav = [
                    ...currNav.slice(0, index),
                    ...currNav.slice(index + 1)
                ]
            }
        }
        navData = {
            ...navData,
            [currGame.gameId]: currNav
        }
        if (currNav.length < 1) {
            delete choseGame[currGame.gameId]
            delete navData[currGame.gameId]
        }
        this.setState({
            'choseGame': choseGame,
            'navData': navData
        })
    }

    editConfig () {
        const {dispatch, data, close} = this.props
        let sendData = {'email': data.email, 'lk_game_id': '', 'game': '', 'power_id': null}
        let choseGame = Object.assign({}, this.state.choseGame)
        let gameId = []
        let gameName = []
        Object.keys(choseGame).map((item) => {
            gameId.push(item)
            gameName.push(choseGame[item])
        })
        sendData = {
            ...sendData,
            'lk_game_id': gameId.join(','),
            'game': gameName.join(','),
            'power_id': Object.assign({}, this.state.navData)
        }
        // console.log(sendData)
        dispatch(permissionConfig(sendData, () => {
            close()
            // 修改cookie导航
        }))
    }

    render () {
        const {visible, close, gameList} = this.props
        const {choseGame, currGame, navData} = this.state
        return (
            <Modal
                width={650}
                className="common c-modal"
                title="配置项目权限"
                visible={visible}
                onOk={() => this.editConfig()}
                onCancel={() => {
                    close(); this.setState({currGame: null})
                }}
                okText="确认"
                cancelText="取消"
            >
                <div className="c-body clearfix">
                    <div className="c-left">
                        {
                            gameList.map((item, index) => (
                                <div key={index} className={!currGame || parseInt(currGame.gameId) !== parseInt(item.lk_game_id) ? 'item' : 'item chk'} onClick={(e) => { this.changeGame(item) }}>
                                    <Checkbox onChange={(e) => this.checkGame(e, item)} checked={!(!choseGame || !choseGame[item.lk_game_id])}/>
                                    <label>{item.lk_game_name}</label>
                                </div>
                            ))
                        }
                    </div>
                    <div className="c-right">
                        {
                            Object.keys(NavIdConfig).map((item, index) => (
                                <div key={index} className="item">
                                    <Checkbox onChange={(e) => { this.checkNav(e, item) }} checked={!(!navData || !currGame || !navData[currGame.gameId] || navData[currGame.gameId].indexOf(item) === -1)}>{NavIdConfig[item].indexOf('-') === -1 ? NavKey[NavIdConfig[item]] : (
                                        `${NavKey[NavIdConfig[item].split('-')[0]]}-${NavKey[NavIdConfig[item]]}`
                                    )}</Checkbox>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        gameList: state.gameListInfo
    }
}
export default connect(mapStateToProps)(UserConfig)
