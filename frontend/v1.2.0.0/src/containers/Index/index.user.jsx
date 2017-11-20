/**
 * Author：tantingting
 * Time：2017/8/18
 * Description：Description
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {addIndexData} from '../../actions/index.action'
import {addLoginData} from '../../actions/login.action'
import Cookies from 'js-cookie'
class UserIndex extends Component {
    componentWillUnmount () {
        const {dispatch} = this.props
        dispatch(addIndexData({'isShowUser': false}))
    }
    render () {
        const {indexInfo, dispatch, loginQuery} = this.props
        return <div className="index-user" onClick={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); dispatch(addIndexData({'isShowUser': false})) }} style={{'display': !indexInfo.isShowUser ? 'none' : 'block'}}>
            <div className="mask"></div>
            <div className="user-main" >
                <div className="user-info">
                    <div className="img-block">
                    </div>
                    <h4>{loginQuery.passportName}</h4>
                </div>
                <div>
                    <Link onClick={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation() }} to={{pathname: `/order`}}>
                        <i className="iconfont icon-dingdanliebiao"></i>
                        <span>我的订单</span>
                    </Link>
                    <a onClick={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); dispatch(addIndexData({'isShowUser': false})); dispatch(addLoginData({'isLogin': false})); Cookies.remove('isLogin') }} href="javascript:void(0)">
                        <i className="iconfont icon-tuichu"></i>
                        <span>退出登录</span>
                    </a>
                </div>
            </div>
        </div>
    }
}
const mapStateToProps = (state) => {
    return {
        loginQuery: state.login.query,
        indexInfo: state.indexInfo
    }
}
export default connect(mapStateToProps)(UserIndex)
