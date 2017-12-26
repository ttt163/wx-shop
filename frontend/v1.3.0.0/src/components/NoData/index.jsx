/**
 * Author：tantingting
 * Time：2017/12/1
 * Description：Description
 */
import React, { Component } from 'react'
import './index.scss'

export default class NoData extends Component {
    render () {
        const { text } = this.props
        return <div className="no-data">
            <div>
                <i className="iconfont icon-kong"></i>
            </div>
            <h4>{text}</h4>
        </div>
    }
}
