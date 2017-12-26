/**
 * Author：tantingting
 * Time：2017/12/1
 * Description：Description
 */
import React, { Component } from 'react'
import './index.scss'

class Tip extends Component {
    componentWillReceiveProps (nextProps) {
        const { onClose } = this.props
        if (nextProps.isShow !== this.props.isShow) {
            if (nextProps.isShow === true) {
                setTimeout(() => {
                    onClose()
                }, 800)
            }
        }
    }
    render () {
        const { isShow, text } = this.props
        return <div className={!isShow ? 'tip-modal' : 'tip-modal show'} style={{'display': !isShow ? 'none' : 'block'}}>{text}</div>
    }
}

export default Tip
