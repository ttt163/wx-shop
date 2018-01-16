/**
 * Author：tantingting
 * Time：2018/1/3
 * Description：Description
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.scss'
import LoadingImg from './img/loading.gif'

class Loading extends Component {
    render () {
        const { isShow } = this.props
        return <div className={!isShow ? 'Loading hide' : 'Loading'}>
            <img src={LoadingImg} />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        isShow: state.other.LoadingShow
    }
}
export default connect(mapStateToProps)(Loading)
