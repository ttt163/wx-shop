/**
 * Author：tantingting
 * Time：2017/12/22
 * Description：Description
 */
import React, { Component } from 'react'
import { Modal } from 'antd'
import './showImg.scss'
export default class ShowImg extends Component {
    render () {
        const {isShow, close, imgUrl} = this.props
        return (
            <Modal className="img-modal"
                visible={isShow}
                onCancel={() => close()}
                footer={null}
            >
                <div>
                    <img src={imgUrl} />
                </div>
            </Modal>
        )
    }
}
