/**
 * Author：tantingting
 * Time：2017/8/17
 * Description：Description CarouselIndex
 */

import React, {Component} from 'react'
import './index.scss'
import img1 from './img/img_1.png'
// import Swiper from 'swiper'
import { hashHistory } from 'react-router'
import {URL} from '../../public/index'
class CarouselIndex extends Component {
    constructor () {
        super()
        this.state = {
            'list': []
        }
    }
    componentWillMount () {
        // this.setState({'list': this.props.carpicList})
        /* ajaxGet('/web_carpic_list', {}, (res) => {
            console.log(res)
            if (res.code === 200) {
                this.setState({'list': res.data})
                let bannerSwiper = new Swiper('.swiper-container', {
                    autoplay: 5000
                })
                bannerSwiper.stopAutoplay()
            } else {
                this.setState({'list': []})
            }
        }) */
    }
    getDetail (id) {
        hashHistory.push({pathname: `/detail`, query: {'lk_goods_id': id}})
        /* ajaxGet('/web_carpic_list', {'lk_goods_id': id}, (res) => {
            // console.log(res)
            if (res.code === 200) {
                this.props.setInfo(res.data[0])
                // hashHistory.push({pathname: `/detail`, query: {...res.data[0]}})
                // this.setState({'list': res.data})
            } else {
                // this.setState({'list': []})
            }
        }) */
    }
    render () {
        return <div className="carousel-main swiper-container">
            <ul className="swiper-wrapper">
                {!this.props.carpicList.length ? '' : this.props.carpicList.map((item, index) => (
                    <li key={index} className="swiper-slide">
                        <a href="javascript:void(0)" onClick={() => this.getDetail(item.lk_goods_id)}>
                            <img src={!item.lk_recom_file ? img1 : `${URL}${item.lk_recom_file}`}/>
                            {/* <span>微信商城新品上线</span> */}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    }
}

export default CarouselIndex
