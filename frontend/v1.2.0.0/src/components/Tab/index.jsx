/**
 * Author：tantingting
 * Time：2017/8/17
 * Description：Description CarouselIndex
 */

import React, { Component } from 'react'
import './index.scss'
// import $ from 'jquery'

class TabIndex extends Component {
    constructor (props) {
        super(props)
        this.state = {
            'currIndex': 0
        }
    }
    selectThisTap (index, id, name, status) {
        const {selectTap, setTapId} = this.props
        this.setState({'currIndex': index})
        let _top = parseInt($(`#tapList${id}`).offset().top)// 要滑到的元素到顶部的距离
        let _t = parseInt($('.index-tab-cont').offset().top)// 滑动内容到顶部的距离
        let _sTop = parseInt($('.index-tab-cont').scrollTop())// 滚动条已滚动的距离
        let _deff = _top - _t + _sTop
        $('.index-tab-cont').scrollTop(_deff)
        selectTap(id, name, status)
        setTapId(id)
    }
    /* componentDidMount () {
        let ulW = 0
        $('#tabUl li').each(function (i, d) {
            ulW += parseInt($(this).width())
        })
        $('#ul').width(ulW) ulist1
    } */

    render () {
        const { data, currTapId } = this.props
        return <div className="tab-main">
            <ul className="clearfix" id="tabUl">
                {!data ? '' : data.map((item, index) => (
                    <li key={index} className={currTapId === item.lk_column_id ? 'active' : ''} onClick={() => this.selectThisTap(index, item.lk_column_id, item.lk_column_name, item.status)}>
                        {/* <a href={`#tapList${item.lk_column_id}`}>{item.lk_column_name}</a> */}
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

export default TabIndex
