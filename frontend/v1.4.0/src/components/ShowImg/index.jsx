/**
 * Author：tantingting
 * Time：2017/12/1
 * Description：Description
 */
import React, { Component } from 'react'
import './index.scss'
// import Img from './img/img.jpg'

class ShowImg extends Component {
    render () {
        const { onClose, isShow, imgUrl } = this.props
        return <div className="img-modal" style={{'display': !isShow ? 'none' : 'block'}}>
            <div className="mask" onClick={() => onClose()}></div>
            <div className="content">
                <div>
                    <div className="close" onClick={() => onClose()}>
                        {/* <i onClick={() => onClose()} className="iconfont icon-close"></i>
                        <div className="line"></div> */}
                    </div>
                    <div className="img-box">
                        <img src={imgUrl}/>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default ShowImg
