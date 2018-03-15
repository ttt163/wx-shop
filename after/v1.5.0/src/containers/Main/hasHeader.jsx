/**
 * Author：tantingting
 * Time：2017/9/5
 * Description：Description
 */
import React, { Component } from 'react'
// import { connect } from 'react-redux'
import MainHeader from './header'
import './hasHeader.scss'

export default class HasHeader extends Component {
    render () {
        // let tag = $.cookie('gameName') ? <Tag onClick={this.handleClick} color="#108ee9" className="game-id">欢迎来到<span className="name"> {$.cookie('gameName')} </span>  后台系统</Tag> : ''
        return <div className="has-header">
            <MainHeader />
            {this.props.children}
        </div>
    }
}

/* const mapStateToProps = (state) => {
    return {
        loginInfo: state.loginInfo
    }
}

export default connect(mapStateToProps)(HasHeader) */
