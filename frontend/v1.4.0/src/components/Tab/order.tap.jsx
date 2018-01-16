/**
 * Author：tantingting
 * Time：2017/8/17
 * Description：Description CarouselIndex
 */

import React, { Component } from 'react'
import './index.scss'
// import $ from 'jquery'

class TabOrder extends Component {
    constructor () {
        super()
        this.state = {
            'currIndex': 0
        }
    }
    selectThisTap (index, id, name, status) {
        const {selectTap} = this.props
        this.setState({'currIndex': index})
        selectTap(id, name, status)
    }
    /* componentDidMount () {
        let ulW = 0
        $('#tabUl li').each(function (i, d) {
            ulW += parseInt($(this).width())
        })
        $('#ul').width(ulW) ulist1
    } */

    render () {
        const { data } = this.props
        return <div className="tab-main">
            <ul className="clearfix" id="tabUl">
                {!data ? '' : data.map((item, index) => (
                    <li key={index} className={this.state.currIndex === index ? 'active' : ''} onClick={() => this.selectThisTap(index, item.lk_column_id, item.lk_column_name, item.status)}>
                        <a href="javascript:void(0)">{item.lk_column_name}</a>
                    </li>
                ))}
                {/* <li className="active">
                    <a href="#ulist1">专题分类1</a>
                </li> */}
            </ul>
        </div>
    }
}

export default TabOrder
